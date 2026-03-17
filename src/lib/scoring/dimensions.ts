import type { AssessmentResponses, DimensionAnalysis, DimensionScore, SeverityLevel } from './types';

function val(r: Record<string, unknown>, k: string): string {
	return (r[k] as string) ?? '';
}

function isAny(r: Record<string, unknown>, k: string, ...vs: string[]): boolean {
	return vs.includes(val(r, k));
}

function scoreDimension(score: number, max: number, findings: string[]): DimensionScore {
	const normalized = max > 0 ? Math.round((score / max) * 100) : 0;
	let severity: SeverityLevel;
	if (normalized >= 60) severity = 'major';
	else if (normalized >= 35) severity = 'moderate';
	else if (normalized >= 15) severity = 'minor';
	else severity = 'not_concern';
	return { score: normalized, severity, keyFindings: findings };
}

export function computeDimensions(r: AssessmentResponses): DimensionAnalysis {
	const s1 = r.step1 ?? {};
	const s2 = r.step2 ?? {};
	const s3 = r.step3 ?? {};
	const s4 = r.step4 ?? {};
	const s5 = r.step5 ?? {};
	const s6 = r.step6 ?? {};

	// Sleep Now
	let sleepNowScore = 0;
	const sleepNowFindings: string[] = [];
	const isi = ['isi_falling_asleep', 'isi_staying_asleep', 'isi_waking_early', 'isi_satisfaction', 'isi_noticeable', 'isi_worried', 'isi_interfere']
		.reduce((sum, k) => sum + (Number(s1[k]) || 0), 0);
	if (isi >= 22) { sleepNowScore += 4; sleepNowFindings.push('severe_insomnia'); }
	else if (isi >= 15) { sleepNowScore += 3; sleepNowFindings.push('moderate_insomnia'); }
	else if (isi >= 8) { sleepNowScore += 2; sleepNowFindings.push('subthreshold_insomnia'); }
	if (isAny(s1, 'sleep_hours', 'under_4', '4_5')) { sleepNowScore += 2; sleepNowFindings.push('severe_restriction'); }
	else if (isAny(s1, 'sleep_hours', '5_6')) { sleepNowScore += 1; sleepNowFindings.push('mild_restriction'); }
	if (isAny(s1, 'duration', 'over_year', 'always')) { sleepNowScore += 2; sleepNowFindings.push('chronic'); }
	if (isAny(s1, 'frequency', 'every_night', 'most_nights')) { sleepNowScore += 1; sleepNowFindings.push('frequent'); }

	// Environment
	let envScore = 0;
	const envFindings: string[] = [];
	if (isAny(s2, 'bedroom_darkness', 'noticeable_light', 'fairly_lit')) { envScore += 2; envFindings.push('light_exposure'); }
	if (isAny(s2, 'bedroom_sound', 'regular_noise', 'partner_snores', 'unpredictable')) { envScore += 2; envFindings.push('noise'); }
	if (isAny(s2, 'bedroom_temp', 'too_warm', 'too_cold', 'cant_control')) { envScore += 2; envFindings.push('temperature'); }
	if (isAny(s2, 'bedroom_comfort', 'stiff_sore', 'uncomfortable', 'old_mattress')) { envScore += 1; envFindings.push('mattress'); }
	if (isAny(s2, 'bedroom_air', 'stuffy', 'congested')) { envScore += 1; envFindings.push('air_quality'); }
	if (isAny(s2, 'bed_sharing', 'partner_disrupts')) { envScore += 2; envFindings.push('partner_disruption'); }
	if (isAny(s2, 'pets', 'pets_wake_me')) { envScore += 1; envFindings.push('pet_disruption'); }
	if (isAny(s2, 'evening_lighting', 'bright_overhead')) { envScore += 1; envFindings.push('evening_light'); }
	if (isAny(s2, 'bed_activities', 'work_in_bed', 'eat_in_bed', 'watch_in_bed', 'multiple')) { envScore += 2; envFindings.push('bed_association'); }

	// Biology
	let bioScore = 0;
	const bioFindings: string[] = [];
	if (isAny(s3, 'snoring', 'loud')) { bioScore += 2; bioFindings.push('loud_snoring'); }
	if (isAny(s3, 'witnessed_apnea', 'yes')) { bioScore += 3; bioFindings.push('witnessed_apnea'); }
	if (isAny(s3, 'choking', 'yes', 'sometimes')) { bioScore += 2; bioFindings.push('choking'); }
	if (isAny(s3, 'restless_legs', 'yes')) { bioScore += 2; bioFindings.push('restless_legs'); }
	if (isAny(s3, 'dream_acting', 'yes')) { bioScore += 3; bioFindings.push('dream_acting'); }
	if (isAny(s3, 'schedule_gap', 'large', 'huge')) { bioScore += 2; bioFindings.push('chronotype_mismatch'); }
	if (isAny(s3, 'cortisol_surge', 'yes')) { bioScore += 2; bioFindings.push('cortisol_surge'); }
	if (isAny(s3, 'afternoon_crash', 'yes')) { bioScore += 1; bioFindings.push('afternoon_crash'); }
	if (isAny(s3, 'perimenopause', 'yes')) { bioScore += 2; bioFindings.push('perimenopause'); }

	// Health History
	let healthScore = 0;
	const healthFindings: string[] = [];
	if (isAny(s4, 'caffeine_timing', 'afternoon', 'evening')) { healthScore += 2; healthFindings.push('late_caffeine'); }
	if (isAny(s4, 'alcohol_frequency', 'most_days', 'daily')) { healthScore += 2; healthFindings.push('frequent_alcohol'); }
	if (isAny(s4, 'alcohol_sleep_pattern', 'helps_fall_asleep_worse_later')) { healthScore += 2; healthFindings.push('alcohol_rebound'); }
	if (isAny(s4, 'nicotine_timing', 'close_to_bed')) { healthScore += 2; healthFindings.push('bedtime_nicotine'); }
	if (isAny(s4, 'gerd', 'yes')) { healthScore += 2; healthFindings.push('gerd'); }
	if (isAny(s4, 'pain_at_night', 'yes')) { healthScore += 2; healthFindings.push('nighttime_pain'); }
	if (isAny(s4, 'breathing_difficulty', 'yes')) { healthScore += 2; healthFindings.push('breathing_difficulty'); }
	if (isAny(s4, 'recent_bloodwork', 'iron_low', 'thyroid_issue')) { healthScore += 1; healthFindings.push('lab_abnormality'); }

	// Emotional
	let emotionalScore = 0;
	const emotionalFindings: string[] = [];
	const phq2 = (Number(s5.little_interest) || 0) + (Number(s5.feeling_down) || 0);
	const gad2 = (Number(s5.nervous_anxious) || 0) + (Number(s5.cant_stop_worrying) || 0);
	if (phq2 >= 3) { emotionalScore += 3; emotionalFindings.push('depression_screen_positive'); }
	if (gad2 >= 3) { emotionalScore += 3; emotionalFindings.push('anxiety_screen_positive'); }
	if (isAny(s5, 'bedtime_dread', 'yes')) { emotionalScore += 2; emotionalFindings.push('bedtime_dread'); }
	if (isAny(s5, 'racing_mind', 'yes')) { emotionalScore += 2; emotionalFindings.push('racing_mind'); }
	if (isAny(s5, 'easier_elsewhere', 'yes')) { emotionalScore += 2; emotionalFindings.push('conditioned_arousal'); }
	if (Number(s5.stress_level) >= 8) { emotionalScore += 2; emotionalFindings.push('high_stress'); }
	if (isAny(s5, 'nightmares', 'yes_frequent', 'yes_recurring')) { emotionalScore += 2; emotionalFindings.push('nightmares'); }

	// Safety
	let safetyDimScore = 0;
	const safetyFindings: string[] = [];
	if (isAny(s6, 'body_lets_go', 'no')) { safetyDimScore += 3; safetyFindings.push('body_wont_release'); }
	if (isAny(s6, 'home_safety', 'not_really', 'no')) { safetyDimScore += 3; safetyFindings.push('home_unsafe'); }
	if (isAny(s6, 'cohabitant_tension', 'yes')) { safetyDimScore += 2; safetyFindings.push('relational_tension'); }
	if (isAny(s6, 'financial_security', 'significant_stress', 'crisis')) { safetyDimScore += 2; safetyFindings.push('financial_crisis'); }
	if (isAny(s6, 'doomscrolling', 'yes')) { safetyDimScore += 1; safetyFindings.push('doomscrolling'); }
	if (isAny(s6, 'body_state', 'tired_wired', 'heart_elevated', 'muscles_tense', 'alert_scanning')) { safetyDimScore += 3; safetyFindings.push('autonomic_activation'); }
	if (isAny(s6, 'sleep_away_from_home', 'better')) { safetyDimScore += 2; safetyFindings.push('better_away'); }

	return {
		sleepNow: scoreDimension(sleepNowScore, 9, sleepNowFindings),
		environment: scoreDimension(envScore, 14, envFindings),
		biology: scoreDimension(bioScore, 19, bioFindings),
		healthHistory: scoreDimension(healthScore, 15, healthFindings),
		emotional: scoreDimension(emotionalScore, 16, emotionalFindings),
		safety: scoreDimension(safetyDimScore, 16, safetyFindings)
	};
}
