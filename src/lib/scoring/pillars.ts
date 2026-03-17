import type { AssessmentResponses, PillarAnalysis, PillarScore, SeverityLevel } from './types';

function val(responses: Record<string, unknown>, key: string): string {
	return (responses[key] as string) ?? '';
}

function isAny(responses: Record<string, unknown>, key: string, ...values: string[]): boolean {
	return values.includes(val(responses, key));
}

function includes(responses: Record<string, unknown>, key: string, value: string): boolean {
	const arr = responses[key];
	return Array.isArray(arr) && arr.includes(value);
}

function scorePillar(score: number, max: number): PillarScore & { normalized: number } {
	const normalized = max > 0 ? Math.round((score / max) * 100) : 0;
	let severity: SeverityLevel;
	if (normalized >= 60) severity = 'major';
	else if (normalized >= 35) severity = 'moderate';
	else if (normalized >= 15) severity = 'minor';
	else severity = 'not_concern';
	return { score: normalized, severity, contributors: [], normalized };
}

export function computePillars(r: AssessmentResponses): PillarAnalysis {
	const s1 = r.step1 ?? {};
	const s2 = r.step2 ?? {};
	const s3 = r.step3 ?? {};
	const s4 = r.step4 ?? {};
	const s5 = r.step5 ?? {};
	const s6 = r.step6 ?? {};

	// --- RHYTHM ---
	let rhythmScore = 0;
	const rhythmMax = 18;
	const rhythmContributors: string[] = [];

	// Irregular schedule
	if (isAny(s1, 'main_struggle', 'irregular_schedule')) { rhythmScore += 3; rhythmContributors.push('irregular_schedule'); }
	// Long sleep onset
	if (isAny(s1, 'sleep_onset', '40_60', 'over_60')) { rhythmScore += 2; rhythmContributors.push('long_onset'); }
	// Shift work
	if (isAny(s2, 'shift_work', 'yes_rotating', 'yes_nights', 'yes_early')) { rhythmScore += 3; rhythmContributors.push('shift_work'); }
	// Evening bright lighting
	if (isAny(s2, 'evening_lighting', 'bright_overhead')) { rhythmScore += 2; rhythmContributors.push('evening_light'); }
	// Screen use before bed
	if (isAny(s2, 'evening_content', 'engaging', 'news', 'work', 'stressful')) { rhythmScore += 2; rhythmContributors.push('evening_screens'); }
	// Chronotype mismatch (schedule gap)
	if (isAny(s3, 'schedule_gap', 'large', 'huge')) { rhythmScore += 3; rhythmContributors.push('chronotype_mismatch'); }
	// Vacation sleep much better
	if (isAny(s3, 'vacation_sleep', 'much_better')) { rhythmScore += 1; rhythmContributors.push('vacation_improvement'); }
	// Late caffeine
	if (isAny(s4, 'caffeine_timing', 'afternoon', 'evening')) { rhythmScore += 2; rhythmContributors.push('late_caffeine'); }

	const rhythm = scorePillar(rhythmScore, rhythmMax);
	rhythm.contributors = rhythmContributors;

	// --- SAFETY ---
	let safetyScore = 0;
	const safetyMax = 24;
	const safetyContributors: string[] = [];

	// Body can't let go
	if (isAny(s6, 'body_lets_go', 'no')) { safetyScore += 3; safetyContributors.push('body_tense'); }
	else if (isAny(s6, 'body_lets_go', 'partially')) { safetyScore += 1; }
	// Home safety
	if (isAny(s6, 'home_safety', 'not_really', 'no')) { safetyScore += 3; safetyContributors.push('home_unsafe'); }
	// Housing instability
	if (isAny(s6, 'housing_stability', 'uncertain')) { safetyScore += 2; safetyContributors.push('housing_unstable'); }
	// Cohabitant tension
	if (isAny(s6, 'cohabitant_tension', 'yes')) { safetyScore += 2; safetyContributors.push('relational_tension'); }
	// Financial stress in bed
	if (isAny(s6, 'financial_in_bed', 'yes')) { safetyScore += 2; safetyContributors.push('financial_stress'); }
	if (isAny(s6, 'financial_security', 'significant_stress', 'crisis')) { safetyScore += 2; safetyContributors.push('financial_crisis'); }
	// Nervous system state
	if (isAny(s6, 'body_state', 'tired_wired', 'heart_elevated', 'muscles_tense', 'alert_scanning')) { safetyScore += 3; safetyContributors.push('autonomic_activation'); }
	if (isAny(s6, 'body_state', 'numb_disconnected')) { safetyScore += 2; safetyContributors.push('dorsal_vagal'); }
	// Caregiving
	if (isAny(s6, 'caregiving_role', 'yes')) { safetyScore += 2; safetyContributors.push('caregiving'); }
	// Trauma indicators
	if (isAny(s5, 'safety_at_night', 'yes')) { safetyScore += 3; safetyContributors.push('nighttime_unsafety'); }
	if (isAny(s5, 'startle_response', 'yes')) { safetyScore += 2; safetyContributors.push('startle_response'); }

	const safety = scorePillar(safetyScore, safetyMax);
	safety.contributors = safetyContributors;

	// --- INNER QUIET ---
	let quietScore = 0;
	const quietMax = 21;
	const quietContributors: string[] = [];

	// Racing mind
	if (isAny(s5, 'racing_mind', 'yes')) { quietScore += 3; quietContributors.push('racing_mind'); }
	else if (isAny(s5, 'racing_mind', 'sometimes')) { quietScore += 1; }
	// Bedtime dread
	if (isAny(s5, 'bedtime_dread', 'yes')) { quietScore += 3; quietContributors.push('bedtime_dread'); }
	else if (isAny(s5, 'bedtime_dread', 'sometimes')) { quietScore += 1; }
	// Clock watching
	if (isAny(s5, 'clock_watching', 'yes')) { quietScore += 2; quietContributors.push('clock_watching'); }
	// Trying too hard
	if (isAny(s5, 'trying_hard', 'yes')) { quietScore += 2; quietContributors.push('paradoxical_effort'); }
	// Easier elsewhere
	if (isAny(s5, 'easier_elsewhere', 'yes')) { quietScore += 3; quietContributors.push('conditioned_arousal'); }
	// Avoidance scrolling
	if (isAny(s5, 'avoidance_scrolling', 'yes')) { quietScore += 2; quietContributors.push('avoidance_scrolling'); }
	// High stress
	const stressLevel = Number(s5.stress_level);
	if (stressLevel >= 8) { quietScore += 3; quietContributors.push('high_stress'); }
	else if (stressLevel >= 6) { quietScore += 2; quietContributors.push('moderate_stress'); }
	// GAD-2 elevated
	const gad = Number(s5.nervous_anxious ?? 0) + Number(s5.cant_stop_worrying ?? 0);
	if (gad >= 3) { quietScore += 3; quietContributors.push('anxiety_elevated'); }

	const innerQuiet = scorePillar(quietScore, quietMax);
	innerQuiet.contributors = quietContributors;

	// --- OXYGEN ---
	let oxygenScore = 0;
	const oxygenMax = 18;
	const oxygenContributors: string[] = [];

	// Snoring
	if (isAny(s3, 'snoring', 'loud')) { oxygenScore += 3; oxygenContributors.push('loud_snoring'); }
	else if (isAny(s3, 'snoring', 'light')) { oxygenScore += 1; }
	// Witnessed apnea
	if (isAny(s3, 'witnessed_apnea', 'yes')) { oxygenScore += 3; oxygenContributors.push('witnessed_apnea'); }
	// Choking/gasping
	if (isAny(s3, 'choking', 'yes')) { oxygenScore += 3; oxygenContributors.push('choking_gasping'); }
	else if (isAny(s3, 'choking', 'sometimes')) { oxygenScore += 1; }
	// Morning symptoms
	if (includes(s3, 'morning_symptoms', 'dry_mouth')) { oxygenScore += 1; oxygenContributors.push('dry_mouth'); }
	if (includes(s3, 'morning_symptoms', 'headache')) { oxygenScore += 2; oxygenContributors.push('morning_headache'); }
	// Mouth breathing
	if (isAny(s3, 'mouth_breathing', 'yes')) { oxygenScore += 2; oxygenContributors.push('mouth_breathing'); }
	// BMI (if height and weight provided)
	const height = Number(s3.height);
	const weight = Number(s3.weight);
	if (height > 0 && weight > 0) {
		const bmi = weight / ((height / 100) ** 2);
		if (bmi >= 35) { oxygenScore += 3; oxygenContributors.push('high_bmi'); }
		else if (bmi >= 30) { oxygenScore += 2; oxygenContributors.push('elevated_bmi'); }
		else if (bmi >= 25) { oxygenScore += 1; }
	}
	// Neck size / weight distribution
	if (isAny(s3, 'neck_size', 'large')) { oxygenScore += 2; oxygenContributors.push('large_neck'); }
	if (isAny(s3, 'weight_distribution', 'neck_midsection')) { oxygenScore += 1; oxygenContributors.push('central_adiposity'); }

	const oxygen = scorePillar(oxygenScore, oxygenMax);
	oxygen.contributors = oxygenContributors;

	return { rhythm, safety, innerQuiet, oxygen };
}
