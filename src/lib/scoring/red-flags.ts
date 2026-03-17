import type { AssessmentResponses, RedFlag, SleepProfile } from './types';

function val(r: Record<string, unknown>, k: string): string {
	return (r[k] as string) ?? '';
}

function is(r: Record<string, unknown>, k: string, ...vs: string[]): boolean {
	return vs.includes(val(r, k));
}

export function computeRedFlags(r: AssessmentResponses, profile: SleepProfile): RedFlag[] {
	const flags: RedFlag[] = [];
	const s3 = r.step3 ?? {};
	const s5 = r.step5 ?? {};

	// --- Sleep Apnea (STOP-BANG adapted) ---
	let stopBang = 0;
	const apneaTriggers: string[] = [];

	if (is(s3, 'snoring', 'loud')) { stopBang++; apneaTriggers.push('loud_snoring'); }
	if (is(s3, 'witnessed_apnea', 'yes')) { stopBang += 2; apneaTriggers.push('witnessed_apnea'); }
	if (is(s3, 'choking', 'yes', 'sometimes')) { stopBang++; apneaTriggers.push('choking'); }

	// BMI
	const height = Number(s3.height);
	const weight = Number(s3.weight);
	if (height > 0 && weight > 0) {
		const bmi = weight / ((height / 100) ** 2);
		if (bmi >= 30) { stopBang++; apneaTriggers.push('bmi_30_plus'); }
	}

	if (is(s3, 'neck_size', 'large')) { stopBang++; apneaTriggers.push('large_neck'); }
	if (is(s3, 'age_range', '46_55', '56_65', 'over_65')) { stopBang++; apneaTriggers.push('age_risk'); }
	if (is(s3, 'biological_sex', 'male')) { stopBang++; apneaTriggers.push('male'); }

	if (stopBang >= 3 || is(s3, 'witnessed_apnea', 'yes')) {
		flags.push({
			id: 'sleep_apnea',
			severity: 'urgent',
			messageKey: 'results.red_flags.sleep_apnea',
			specialistType: 'sleep_medicine',
			triggeringAnswers: apneaTriggers
		});
	}

	// --- RBD (dream enactment) ---
	if (is(s3, 'dream_acting', 'yes')) {
		flags.push({
			id: 'rbd',
			severity: 'urgent',
			messageKey: 'results.red_flags.rbd',
			specialistType: 'neurology',
			triggeringAnswers: ['dream_acting']
		});
	}

	// --- ISI severe ---
	if (profile.isiScore >= 15) {
		flags.push({
			id: 'severe_insomnia',
			severity: 'important',
			messageKey: 'results.red_flags.severe_insomnia',
			specialistType: 'sleep_medicine_or_psychologist',
			triggeringAnswers: ['isi_score_' + profile.isiScore]
		});
	}

	// --- Depression screen ---
	const phq2 = (Number(s5.little_interest) || 0) + (Number(s5.feeling_down) || 0);
	if (phq2 >= 3) {
		flags.push({
			id: 'depression',
			severity: 'important',
			messageKey: 'results.red_flags.depression',
			specialistType: 'psychologist_or_psychiatrist',
			triggeringAnswers: ['phq2_score_' + phq2]
		});
	}

	// --- Anxiety screen ---
	const gad2 = (Number(s5.nervous_anxious) || 0) + (Number(s5.cant_stop_worrying) || 0);
	if (gad2 >= 3) {
		flags.push({
			id: 'anxiety',
			severity: 'important',
			messageKey: 'results.red_flags.anxiety',
			specialistType: 'psychologist_or_psychiatrist',
			triggeringAnswers: ['gad2_score_' + gad2]
		});
	}

	// --- Excessive daytime sleepiness ---
	if (is(r.step1 ?? {}, 'main_struggle', 'excessive_sleepiness')) {
		flags.push({
			id: 'excessive_sleepiness',
			severity: 'important',
			messageKey: 'results.red_flags.excessive_sleepiness',
			specialistType: 'sleep_medicine',
			triggeringAnswers: ['excessive_sleepiness_complaint']
		});
	}

	// --- Sleepwalking ---
	if (is(s3, 'sleepwalking', 'yes')) {
		flags.push({
			id: 'parasomnia',
			severity: 'important',
			messageKey: 'results.red_flags.parasomnia',
			specialistType: 'sleep_medicine',
			triggeringAnswers: ['sleepwalking']
		});
	}

	return flags;
}
