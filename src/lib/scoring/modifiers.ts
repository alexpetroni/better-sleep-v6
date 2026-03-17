import type { AssessmentResponses, BiologicalModifier } from './types';

function val(r: Record<string, unknown>, k: string): string {
	return (r[k] as string) ?? '';
}

function is(r: Record<string, unknown>, k: string, ...vs: string[]): boolean {
	return vs.includes(val(r, k));
}

export function computeModifiers(r: AssessmentResponses): BiologicalModifier[] {
	const s3 = r.step3 ?? {};
	const s4 = r.step4 ?? {};

	const modifiers: BiologicalModifier[] = [];

	// Hormonal
	const hormonalTriggers: string[] = [];
	if (is(s3, 'perimenopause', 'yes', 'possibly')) hormonalTriggers.push('perimenopause');
	if (is(s3, 'cycle_sleep', 'yes')) hormonalTriggers.push('cycle_sleep');
	if (is(s3, 'pregnant', 'yes', 'recent_baby')) hormonalTriggers.push('pregnancy');
	if (is(s3, 'energy_changes', 'yes')) hormonalTriggers.push('energy_changes');
	modifiers.push({
		id: 'hormonal',
		active: hormonalTriggers.length >= 1,
		nameKey: 'results.modifiers.hormonal',
		triggeringAnswers: hormonalTriggers
	});

	// Metabolic instability
	const metabolicTriggers: string[] = [];
	if (is(s3, 'cortisol_surge', 'yes')) metabolicTriggers.push('cortisol_surge');
	if (is(s3, 'early_waking_pattern', 'yes_alert')) metabolicTriggers.push('early_waking_alert');
	if (is(s3, 'post_meal_drowsy', 'yes')) metabolicTriggers.push('post_meal_drowsy');
	if (is(s3, 'afternoon_crash', 'yes')) metabolicTriggers.push('afternoon_crash');
	if (is(s4, 'recent_bloodwork', 'sugar_issue')) metabolicTriggers.push('blood_sugar_issue');
	modifiers.push({
		id: 'metabolic',
		active: metabolicTriggers.length >= 2,
		nameKey: 'results.modifiers.metabolic',
		triggeringAnswers: metabolicTriggers
	});

	// Inflammation
	const inflammationTriggers: string[] = [];
	if (is(r.step1 ?? {}, 'main_struggle', 'unrestorative')) inflammationTriggers.push('unrestorative');
	if (is(s4, 'fatigue_sensitivity', 'yes')) inflammationTriggers.push('fatigue_sensitivity');
	if (is(s4, 'pain_at_night', 'yes')) inflammationTriggers.push('pain');
	if (is(s4, 'recent_bloodwork', 'iron_low')) inflammationTriggers.push('iron_low');
	modifiers.push({
		id: 'inflammation',
		active: inflammationTriggers.length >= 2,
		nameKey: 'results.modifiers.inflammation',
		triggeringAnswers: inflammationTriggers
	});

	// Nocturia
	const noctTriggers: string[] = [];
	if (is(s3, 'nocturia', 'twice', 'three_plus')) noctTriggers.push('frequent_urination');
	modifiers.push({
		id: 'nocturia',
		active: noctTriggers.length >= 1,
		nameKey: 'results.modifiers.nocturia',
		triggeringAnswers: noctTriggers
	});

	// Pain
	const painTriggers: string[] = [];
	if (is(s4, 'pain_at_night', 'yes')) painTriggers.push('pain_at_night');
	if (is(s4, 'gerd', 'yes')) painTriggers.push('gerd');
	if (is(s4, 'neuropathy', 'yes')) painTriggers.push('neuropathy');
	modifiers.push({
		id: 'pain',
		active: painTriggers.length >= 1,
		nameKey: 'results.modifiers.pain',
		triggeringAnswers: painTriggers
	});

	// Thyroid
	const thyroidTriggers: string[] = [];
	if (is(s3, 'cold_sluggish', 'yes')) thyroidTriggers.push('hypothyroid_symptoms');
	if (is(s3, 'warm_wired', 'yes')) thyroidTriggers.push('hyperthyroid_symptoms');
	if (is(s4, 'recent_bloodwork', 'thyroid_issue')) thyroidTriggers.push('thyroid_labs');
	modifiers.push({
		id: 'thyroid',
		active: thyroidTriggers.length >= 1,
		nameKey: 'results.modifiers.thyroid',
		triggeringAnswers: thyroidTriggers
	});

	return modifiers;
}
