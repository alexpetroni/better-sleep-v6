import type { AssessmentResponses, SleepProfile } from './types';

function timeToMinutes(time: string | null | undefined): number | null {
	if (!time || typeof time !== 'string') return null;
	const [h, m] = time.split(':').map(Number);
	if (isNaN(h) || isNaN(m)) return null;
	return h * 60 + m;
}

function sleepWindowMinutes(bedtime: string | null | undefined, waketime: string | null | undefined): number | null {
	const bed = timeToMinutes(bedtime as string);
	const wake = timeToMinutes(waketime as string);
	if (bed === null || wake === null) return null;
	let diff = wake - bed;
	if (diff <= 0) diff += 1440; // crosses midnight
	return diff;
}

const SLEEP_HOURS_MAP: Record<string, number> = {
	under_4: 3.5,
	'4_5': 4.5,
	'5_6': 5.5,
	'6_7': 6.5,
	'7_8': 7.5,
	over_8: 8.5
};

function computeISI(s1: Record<string, unknown>): { score: number; severity: SleepProfile['isiSeverity'] } {
	const items = [
		'isi_falling_asleep', 'isi_staying_asleep', 'isi_waking_early',
		'isi_satisfaction', 'isi_noticeable', 'isi_worried', 'isi_interfere'
	];
	let score = 0;
	for (const item of items) {
		const val = Number(s1[item]);
		if (!isNaN(val)) score += val;
	}
	let severity: SleepProfile['isiSeverity'];
	if (score <= 7) severity = 'none';
	else if (score <= 14) severity = 'subthreshold';
	else if (score <= 21) severity = 'moderate';
	else severity = 'severe';
	return { score, severity };
}

function computeChronotype(s3: Record<string, unknown>): SleepProfile['chronotype'] {
	const naturalSleep = timeToMinutes(s3.natural_sleep_time as string);
	const peak = s3.peak_alertness as string;

	if (naturalSleep !== null) {
		// Before 10pm = early, 10pm-midnight = intermediate, after midnight = late
		if (naturalSleep < 22 * 60) return 'early';
		if (naturalSleep < 24 * 60) return 'intermediate';
		return 'late';
	}

	if (peak === 'early_morning') return 'early';
	if (peak === 'late_morning' || peak === 'afternoon') return 'intermediate';
	if (peak === 'evening' || peak === 'night') return 'late';

	return 'unknown';
}

function computeSocialJetLag(s1: Record<string, unknown>): number | null {
	const workBed = timeToMinutes(s1.bedtime_work as string);
	const workWake = timeToMinutes(s1.waketime_work as string);
	const freeBed = timeToMinutes(s1.bedtime_free as string);
	const freeWake = timeToMinutes(s1.waketime_free as string);

	if (workBed === null || workWake === null || freeBed === null || freeWake === null) return null;

	// Midpoint of sleep
	let workMid = workBed + (workWake > workBed ? workWake - workBed : workWake + 1440 - workBed) / 2;
	let freeMid = freeBed + (freeWake > freeBed ? freeWake - freeBed : freeWake + 1440 - freeBed) / 2;
	if (workMid >= 1440) workMid -= 1440;
	if (freeMid >= 1440) freeMid -= 1440;

	let diff = Math.abs(freeMid - workMid);
	if (diff > 720) diff = 1440 - diff;

	return Math.round(diff); // minutes
}

export function computeSleepProfile(responses: AssessmentResponses): SleepProfile {
	const s1 = responses.step1 ?? {};
	const s3 = responses.step3 ?? {};

	const { score: isiScore, severity: isiSeverity } = computeISI(s1);

	const sleepWindow = sleepWindowMinutes(s1.bedtime_work as string, s1.waketime_work as string);
	const estimatedSleep = s1.sleep_hours as string | null;
	const sleepHoursNum = estimatedSleep ? SLEEP_HOURS_MAP[estimatedSleep] : null;

	let sleepEfficiency: number | null = null;
	if (sleepWindow && sleepHoursNum) {
		sleepEfficiency = Math.round((sleepHoursNum * 60 / sleepWindow) * 100);
		if (sleepEfficiency > 100) sleepEfficiency = 100;
	}

	const socialJetLag = computeSocialJetLag(s1);

	let estimatedSleepDebt: number | null = null;
	if (sleepHoursNum && sleepHoursNum < 7.5) {
		estimatedSleepDebt = Math.round((7.5 - sleepHoursNum) * 5 * 10) / 10; // hours per work week
	}

	return {
		bedtimeWork: (s1.bedtime_work as string) ?? null,
		bedtimeFree: (s1.bedtime_free as string) ?? null,
		waketimeWork: (s1.waketime_work as string) ?? null,
		waketimeFree: (s1.waketime_free as string) ?? null,
		sleepWindow,
		estimatedSleep,
		sleepEfficiency,
		isiScore,
		isiSeverity,
		chronotype: computeChronotype(s3),
		socialJetLag,
		estimatedSleepDebt,
		primaryComplaint: (s1.main_struggle as string) ?? null,
		duration: (s1.duration as string) ?? null,
		frequency: (s1.frequency as string) ?? null
	};
}
