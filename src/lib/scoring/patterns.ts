import type { AssessmentResponses, IdentifiedPattern } from './types';

function val(r: Record<string, unknown>, k: string): string {
	return (r[k] as string) ?? '';
}

function is(r: Record<string, unknown>, k: string, ...vs: string[]): boolean {
	return vs.includes(val(r, k));
}

interface PatternDef {
	id: string;
	nameKey: string;
	clinicalTerm: string;
	mechanismKey: string;
	maxScore: number;
	compute: (r: AssessmentResponses) => { score: number; triggers: string[] };
}

const patternDefs: PatternDef[] = [
	{
		id: 'sentinel',
		nameKey: 'results.patterns.sentinel',
		clinicalTerm: 'Hypervigilance / Autonomic hyperarousal',
		mechanismKey: 'results.patterns.sentinel.mechanism',
		maxScore: 15,
		compute(r) {
			let score = 0;
			const triggers: string[] = [];
			const s5 = r.step5 ?? {};
			const s6 = r.step6 ?? {};
			if (is(s6, 'body_lets_go', 'no')) { score += 3; triggers.push('body_tense'); }
			if (is(s6, 'body_state', 'alert_scanning', 'heart_elevated')) { score += 3; triggers.push('alert_state'); }
			if (is(s5, 'startle_response', 'yes')) { score += 3; triggers.push('startle'); }
			if (is(s5, 'safety_at_night', 'yes')) { score += 3; triggers.push('nighttime_unsafety'); }
			if (is(s6, 'lock_checking', 'multiple')) { score += 2; triggers.push('lock_checking'); }
			if (is(s6, 'home_safety', 'not_really', 'no')) { score += 1; triggers.push('unsafe_home'); }
			return { score, triggers };
		}
	},
	{
		id: 'manager',
		nameKey: 'results.patterns.manager',
		clinicalTerm: 'Cognitive hyperarousal (executive)',
		mechanismKey: 'results.patterns.manager.mechanism',
		maxScore: 12,
		compute(r) {
			let score = 0;
			const triggers: string[] = [];
			const s5 = r.step5 ?? {};
			if (is(s5, 'racing_mind', 'yes')) { score += 3; triggers.push('racing_mind'); }
			if (is(s5, 'main_stressor', 'work') || (Array.isArray(s5.main_stressor) && (s5.main_stressor as string[]).includes('work'))) { score += 2; triggers.push('work_stress'); }
			if (is(s5, 'coping_pattern', 'push_through')) { score += 2; triggers.push('push_through'); }
			if (Number(s5.stress_level) >= 7) { score += 2; triggers.push('high_stress'); }
			if (is(r.step6 ?? {}, 'work_email_check', 'yes')) { score += 2; triggers.push('work_email'); }
			if (is(r.step2 ?? {}, 'evening_content', 'work')) { score += 1; triggers.push('evening_work'); }
			return { score, triggers };
		}
	},
	{
		id: 'ruminator',
		nameKey: 'results.patterns.ruminator',
		clinicalTerm: 'Cognitive hyperarousal (ruminative)',
		mechanismKey: 'results.patterns.ruminator.mechanism',
		maxScore: 12,
		compute(r) {
			let score = 0;
			const triggers: string[] = [];
			const s5 = r.step5 ?? {};
			if (is(s5, 'racing_mind', 'yes')) { score += 2; triggers.push('racing_mind'); }
			if (is(s5, 'coping_pattern', 'replay_analyze')) { score += 3; triggers.push('replay_analyze'); }
			if (is(s5, 'bedtime_dread', 'yes')) { score += 2; triggers.push('bedtime_dread'); }
			const stressors = s5.main_stressor;
			if (Array.isArray(stressors) && (stressors.includes('relationship') || stressors.includes('grief'))) { score += 2; triggers.push('relational_grief'); }
			if (is(s5, 'feeling_down', '2', '3')) { score += 2; triggers.push('feeling_down'); }
			if (is(r.step1 ?? {}, 'main_struggle', 'cant_fall_asleep')) { score += 1; triggers.push('onset_insomnia'); }
			return { score, triggers };
		}
	},
	{
		id: 'volcano',
		nameKey: 'results.patterns.volcano',
		clinicalTerm: 'Suppressed affect / Somatic tension',
		mechanismKey: 'results.patterns.volcano.mechanism',
		maxScore: 10,
		compute(r) {
			let score = 0;
			const triggers: string[] = [];
			const s3 = r.step3 ?? {};
			const s5 = r.step5 ?? {};
			const s6 = r.step6 ?? {};
			if (is(s3, 'teeth_grinding', 'yes')) { score += 3; triggers.push('teeth_grinding'); }
			if (is(s6, 'body_state', 'muscles_tense')) { score += 2; triggers.push('muscle_tension'); }
			if (is(s5, 'coping_pattern', 'push_through')) { score += 2; triggers.push('suppress_emotions'); }
			if (is(s6, 'cohabitant_tension', 'yes')) { score += 2; triggers.push('relational_tension'); }
			if (is(s5, 'clock_watching', 'yes')) { score += 1; triggers.push('frustration'); }
			return { score, triggers };
		}
	},
	{
		id: 'savior',
		nameKey: 'results.patterns.savior',
		clinicalTerm: 'Caregiver burden / Self-neglect pattern',
		mechanismKey: 'results.patterns.savior.mechanism',
		maxScore: 10,
		compute(r) {
			let score = 0;
			const triggers: string[] = [];
			const s5 = r.step5 ?? {};
			const s6 = r.step6 ?? {};
			if (is(s6, 'caregiving_role', 'yes')) { score += 3; triggers.push('caregiving'); }
			const stressors = s5.main_stressor;
			if (Array.isArray(stressors) && stressors.includes('caregiving')) { score += 2; triggers.push('caregiving_stress'); }
			if (is(s5, 'little_interest', '2', '3')) { score += 2; triggers.push('depleted'); }
			if (is(r.step1 ?? {}, 'main_struggle', 'unrestorative')) { score += 2; triggers.push('unrestorative'); }
			if (is(s5, 'coping_pattern', 'push_through')) { score += 1; triggers.push('self_last'); }
			return { score, triggers };
		}
	},
	{
		id: 'perfectionist',
		nameKey: 'results.patterns.perfectionist',
		clinicalTerm: 'Sleep effort / Conditioned insomnia',
		mechanismKey: 'results.patterns.perfectionist.mechanism',
		maxScore: 14,
		compute(r) {
			let score = 0;
			const triggers: string[] = [];
			const s5 = r.step5 ?? {};
			if (is(s5, 'clock_watching', 'yes')) { score += 3; triggers.push('clock_watching'); }
			if (is(s5, 'trying_hard', 'yes')) { score += 3; triggers.push('trying_hard'); }
			if (is(s5, 'easier_elsewhere', 'yes')) { score += 3; triggers.push('easier_elsewhere'); }
			if (is(s5, 'bedtime_dread', 'yes')) { score += 2; triggers.push('bedtime_dread'); }
			if (is(r.step1 ?? {}, 'sleep_onset', '40_60', 'over_60')) { score += 2; triggers.push('long_onset'); }
			if (is(r.step1 ?? {}, 'duration', 'over_year', 'always')) { score += 1; triggers.push('chronic'); }
			return { score, triggers };
		}
	},
	{
		id: 'antenna',
		nameKey: 'results.patterns.antenna',
		clinicalTerm: 'Sensory sensitivity / Environmental reactivity',
		mechanismKey: 'results.patterns.antenna.mechanism',
		maxScore: 12,
		compute(r) {
			let score = 0;
			const triggers: string[] = [];
			const s2 = r.step2 ?? {};
			if (is(s2, 'bedroom_sound', 'unpredictable', 'regular_noise')) { score += 2; triggers.push('noise_sensitive'); }
			if (is(s2, 'bedroom_darkness', 'noticeable_light', 'fairly_lit')) { score += 2; triggers.push('light_sensitive'); }
			if (is(s2, 'bedroom_temp', 'too_warm', 'too_cold', 'changes')) { score += 2; triggers.push('temp_sensitive'); }
			if (is(s2, 'bed_sharing', 'partner_disrupts')) { score += 2; triggers.push('partner_disrupts'); }
			if (is(s2, 'pets', 'pets_wake_me')) { score += 1; triggers.push('pet_disrupts'); }
			if (is(r.step6 ?? {}, 'neighborhood_safety', 'not_safe')) { score += 2; triggers.push('external_noise'); }
			if (is(r.step1 ?? {}, 'main_struggle', 'wake_during_night')) { score += 1; triggers.push('maintenance_insomnia'); }
			return { score, triggers };
		}
	},
	{
		id: 'fugitive',
		nameKey: 'results.patterns.fugitive',
		clinicalTerm: 'Avoidance / Stimulus-seeking at bedtime',
		mechanismKey: 'results.patterns.fugitive.mechanism',
		maxScore: 12,
		compute(r) {
			let score = 0;
			const triggers: string[] = [];
			const s5 = r.step5 ?? {};
			const s6 = r.step6 ?? {};
			if (is(s5, 'avoidance_scrolling', 'yes')) { score += 3; triggers.push('avoidance_scrolling'); }
			if (is(s6, 'doomscrolling', 'yes')) { score += 2; triggers.push('doomscrolling'); }
			if (is(r.step2 ?? {}, 'evening_content', 'engaging', 'stressful')) { score += 2; triggers.push('stimulating_content'); }
			if (is(r.step2 ?? {}, 'evening_activities', 'phone') || (Array.isArray((r.step2 ?? {}).evening_activities) && ((r.step2 ?? {}).evening_activities as string[]).includes('phone'))) { score += 1; triggers.push('phone_before_bed'); }
			if (is(r.step4 ?? {}, 'cannabis_for_sleep', 'yes')) { score += 2; triggers.push('cannabis_sleep'); }
			if (is(r.step4 ?? {}, 'alcohol_sleep_pattern', 'helps_fall_asleep_worse_later')) { score += 2; triggers.push('alcohol_self_medicate'); }
			return { score, triggers };
		}
	},
	{
		id: 'exhausted',
		nameKey: 'results.patterns.exhausted',
		clinicalTerm: 'Allostatic overload / Functional exhaustion',
		mechanismKey: 'results.patterns.exhausted.mechanism',
		maxScore: 12,
		compute(r) {
			let score = 0;
			const triggers: string[] = [];
			const s1 = r.step1 ?? {};
			const s4 = r.step4 ?? {};
			if (is(s1, 'main_struggle', 'unrestorative')) { score += 3; triggers.push('unrestorative'); }
			if (is(s1, 'main_struggle', 'excessive_sleepiness')) { score += 2; triggers.push('excessive_sleepiness'); }
			if (is(s1, 'duration', 'over_year', 'always')) { score += 2; triggers.push('chronic'); }
			if (is(s4, 'fatigue_sensitivity', 'yes')) { score += 2; triggers.push('fatigue_sensitivity'); }
			// Multiple things tried, nothing helped
			const triedItems = ['tried_melatonin', 'tried_prescription', 'tried_routine', 'tried_exercise', 'tried_meditation'];
			const triedCount = triedItems.filter(k => is(s4, k, 'didnt_help', 'helped_then_stopped')).length;
			if (triedCount >= 3) { score += 3; triggers.push('nothing_works'); }
			else if (triedCount >= 2) { score += 1; }
			return { score, triggers };
		}
	}
];

export function computePatterns(r: AssessmentResponses): IdentifiedPattern[] {
	const results: IdentifiedPattern[] = [];

	for (const def of patternDefs) {
		const { score, triggers } = def.compute(r);
		const pct = score / def.maxScore;

		let confidence: IdentifiedPattern['confidence'];
		if (pct >= 0.7) confidence = 'strong';
		else if (pct >= 0.5) confidence = 'probable';
		else if (pct >= 0.3) confidence = 'possible';
		else continue; // below threshold

		results.push({
			id: def.id,
			nameKey: def.nameKey,
			clinicalTerm: def.clinicalTerm,
			confidence,
			score,
			maxScore: def.maxScore,
			triggeringAnswers: triggers,
			mechanismKey: def.mechanismKey
		});
	}

	// Sort by score descending
	results.sort((a, b) => (b.score / b.maxScore) - (a.score / a.maxScore));

	return results;
}
