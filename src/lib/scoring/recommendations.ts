import type { PillarAnalysis, DimensionAnalysis, IdentifiedPattern, BiologicalModifier, RedFlag, Recommendation } from './types';

export function generateRecommendations(
	pillars: PillarAnalysis,
	dimensions: DimensionAnalysis,
	patterns: IdentifiedPattern[],
	modifiers: BiologicalModifier[],
	redFlags: RedFlag[]
): Recommendation[] {
	const recs: Recommendation[] = [];
	let priority = 0;

	// --- TIER 1: Root cause (highest impact single intervention) ---

	// If apnea red flag, sleep study is always #1
	if (redFlags.some((f) => f.id === 'sleep_apnea')) {
		recs.push({
			id: 'get_sleep_study',
			tier: 1,
			priority: priority++,
			actionKey: 'results.recs.sleep_study.action',
			rationaleKey: 'results.recs.sleep_study.rationale',
			timelineKey: 'results.recs.sleep_study.timeline',
			effortLevel: 'professional',
			relatedDimension: 'biology',
			relatedPillar: 'oxygen'
		});
	}

	// If RBD, neurological evaluation
	if (redFlags.some((f) => f.id === 'rbd')) {
		recs.push({
			id: 'neuro_evaluation',
			tier: 1,
			priority: priority++,
			actionKey: 'results.recs.neuro_eval.action',
			rationaleKey: 'results.recs.neuro_eval.rationale',
			timelineKey: 'results.recs.neuro_eval.timeline',
			effortLevel: 'professional',
			relatedDimension: 'biology',
			relatedPillar: 'safety'
		});
	}

	// Conditioned insomnia (perfectionist pattern dominant)
	const primaryPattern = patterns[0];
	if (primaryPattern?.id === 'perfectionist' && primaryPattern.confidence !== 'possible') {
		recs.push({
			id: 'stimulus_control',
			tier: 1,
			priority: priority++,
			actionKey: 'results.recs.stimulus_control.action',
			rationaleKey: 'results.recs.stimulus_control.rationale',
			timelineKey: 'results.recs.stimulus_control.timeline',
			effortLevel: 'significant',
			relatedDimension: 'emotional',
			relatedPillar: 'innerQuiet'
		});
	}

	// Rhythm is top pillar
	if (pillars.rhythm.severity === 'major' && !recs.some((r) => r.relatedPillar === 'rhythm')) {
		recs.push({
			id: 'circadian_realignment',
			tier: 1,
			priority: priority++,
			actionKey: 'results.recs.circadian.action',
			rationaleKey: 'results.recs.circadian.rationale',
			timelineKey: 'results.recs.circadian.timeline',
			effortLevel: 'moderate',
			relatedDimension: 'biology',
			relatedPillar: 'rhythm'
		});
	}

	// Safety/autonomic is dominant
	if (pillars.safety.severity === 'major' && !recs.some((r) => r.relatedPillar === 'safety')) {
		recs.push({
			id: 'nervous_system_regulation',
			tier: 1,
			priority: priority++,
			actionKey: 'results.recs.nervous_system.action',
			rationaleKey: 'results.recs.nervous_system.rationale',
			timelineKey: 'results.recs.nervous_system.timeline',
			effortLevel: 'significant',
			relatedDimension: 'safety',
			relatedPillar: 'safety'
		});
	}

	// Inner quiet dominant and no tier 1 yet
	if (pillars.innerQuiet.severity === 'major' && recs.filter((r) => r.tier === 1).length === 0) {
		recs.push({
			id: 'cognitive_wind_down',
			tier: 1,
			priority: priority++,
			actionKey: 'results.recs.cognitive_wind_down.action',
			rationaleKey: 'results.recs.cognitive_wind_down.rationale',
			timelineKey: 'results.recs.cognitive_wind_down.timeline',
			effortLevel: 'moderate',
			relatedDimension: 'emotional',
			relatedPillar: 'innerQuiet'
		});
	}

	// --- TIER 2: Remove amplifiers ---

	// Environment fixes (if moderate+)
	if (dimensions.environment.severity === 'major' || dimensions.environment.severity === 'moderate') {
		const envFindings = dimensions.environment.keyFindings;
		if (envFindings.includes('light_exposure')) {
			recs.push({
				id: 'block_light',
				tier: 2,
				priority: priority++,
				actionKey: 'results.recs.block_light.action',
				rationaleKey: 'results.recs.block_light.rationale',
				timelineKey: 'results.recs.block_light.timeline',
				effortLevel: 'quick_fix',
				relatedDimension: 'environment',
				relatedPillar: 'rhythm'
			});
		}
		if (envFindings.includes('temperature')) {
			recs.push({
				id: 'temperature',
				tier: 2,
				priority: priority++,
				actionKey: 'results.recs.temperature.action',
				rationaleKey: 'results.recs.temperature.rationale',
				timelineKey: 'results.recs.temperature.timeline',
				effortLevel: 'quick_fix',
				relatedDimension: 'environment',
				relatedPillar: 'rhythm'
			});
		}
		if (envFindings.includes('noise')) {
			recs.push({
				id: 'noise',
				tier: 2,
				priority: priority++,
				actionKey: 'results.recs.noise.action',
				rationaleKey: 'results.recs.noise.rationale',
				timelineKey: 'results.recs.noise.timeline',
				effortLevel: 'quick_fix',
				relatedDimension: 'environment',
				relatedPillar: 'safety'
			});
		}
		if (envFindings.includes('bed_association')) {
			recs.push({
				id: 'bed_association',
				tier: 2,
				priority: priority++,
				actionKey: 'results.recs.bed_association.action',
				rationaleKey: 'results.recs.bed_association.rationale',
				timelineKey: 'results.recs.bed_association.timeline',
				effortLevel: 'moderate',
				relatedDimension: 'environment',
				relatedPillar: 'innerQuiet'
			});
		}
	}

	// Substance timing
	if (dimensions.healthHistory.keyFindings.includes('late_caffeine')) {
		recs.push({
			id: 'caffeine_cutoff',
			tier: 2,
			priority: priority++,
			actionKey: 'results.recs.caffeine.action',
			rationaleKey: 'results.recs.caffeine.rationale',
			timelineKey: 'results.recs.caffeine.timeline',
			effortLevel: 'moderate',
			relatedDimension: 'healthHistory',
			relatedPillar: 'rhythm'
		});
	}

	if (dimensions.healthHistory.keyFindings.includes('alcohol_rebound') || dimensions.healthHistory.keyFindings.includes('frequent_alcohol')) {
		recs.push({
			id: 'alcohol_review',
			tier: 2,
			priority: priority++,
			actionKey: 'results.recs.alcohol.action',
			rationaleKey: 'results.recs.alcohol.rationale',
			timelineKey: 'results.recs.alcohol.timeline',
			effortLevel: 'moderate',
			relatedDimension: 'healthHistory',
			relatedPillar: 'rhythm'
		});
	}

	// GERD
	if (dimensions.healthHistory.keyFindings.includes('gerd')) {
		recs.push({
			id: 'gerd_management',
			tier: 2,
			priority: priority++,
			actionKey: 'results.recs.gerd.action',
			rationaleKey: 'results.recs.gerd.rationale',
			timelineKey: 'results.recs.gerd.timeline',
			effortLevel: 'moderate',
			relatedDimension: 'healthHistory',
			relatedPillar: 'oxygen'
		});
	}

	// Depression/anxiety referral
	if (redFlags.some((f) => f.id === 'depression' || f.id === 'anxiety')) {
		recs.push({
			id: 'mental_health_support',
			tier: 2,
			priority: priority++,
			actionKey: 'results.recs.mental_health.action',
			rationaleKey: 'results.recs.mental_health.rationale',
			timelineKey: 'results.recs.mental_health.timeline',
			effortLevel: 'professional',
			relatedDimension: 'emotional',
			relatedPillar: 'innerQuiet'
		});
	}

	// --- TIER 3: Optimize ---
	recs.push({
		id: 'light_exposure_morning',
		tier: 3,
		priority: priority++,
		actionKey: 'results.recs.morning_light.action',
		rationaleKey: 'results.recs.morning_light.rationale',
		timelineKey: 'results.recs.morning_light.timeline',
		effortLevel: 'quick_fix',
		relatedDimension: 'environment',
		relatedPillar: 'rhythm'
	});

	recs.push({
		id: 'consistent_schedule',
		tier: 3,
		priority: priority++,
		actionKey: 'results.recs.schedule.action',
		rationaleKey: 'results.recs.schedule.rationale',
		timelineKey: 'results.recs.schedule.timeline',
		effortLevel: 'moderate',
		relatedDimension: 'sleepNow',
		relatedPillar: 'rhythm'
	});

	recs.push({
		id: 'wind_down_routine',
		tier: 3,
		priority: priority++,
		actionKey: 'results.recs.wind_down.action',
		rationaleKey: 'results.recs.wind_down.rationale',
		timelineKey: 'results.recs.wind_down.timeline',
		effortLevel: 'moderate',
		relatedDimension: 'environment',
		relatedPillar: 'innerQuiet'
	});

	// --- TIER 4: Monitor ---
	for (const modifier of modifiers.filter((m) => m.active)) {
		recs.push({
			id: `monitor_${modifier.id}`,
			tier: 4,
			priority: priority++,
			actionKey: `results.recs.monitor_${modifier.id}.action`,
			rationaleKey: `results.recs.monitor_${modifier.id}.rationale`,
			timelineKey: `results.recs.monitor_${modifier.id}.timeline`,
			effortLevel: 'moderate',
			relatedDimension: 'biology',
			relatedPillar: 'rhythm'
		});
	}

	// Possible patterns worth watching
	for (const pattern of patterns.filter((p) => p.confidence === 'possible')) {
		recs.push({
			id: `watch_${pattern.id}`,
			tier: 4,
			priority: priority++,
			actionKey: `results.recs.watch_pattern.action`,
			rationaleKey: `results.recs.watch_pattern.rationale`,
			timelineKey: `results.recs.watch_pattern.timeline`,
			effortLevel: 'moderate',
			relatedDimension: 'sleepNow',
			relatedPillar: 'rhythm'
		});
	}

	return recs;
}
