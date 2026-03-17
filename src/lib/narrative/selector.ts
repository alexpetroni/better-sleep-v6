import type { ScoringResult, PillarScore } from '../scoring/types';
import type { NarrativeProfile, PhasedRecommendations } from './types';

export function buildNarrativeProfile(result: ScoringResult): NarrativeProfile {
	// Primary pattern = highest confidence pattern
	const primaryPattern = result.patterns[0];
	// Secondary = next strong/probable pattern (max 1)
	const secondaryPatterns = result.patterns
		.slice(1)
		.filter((p) => p.confidence === 'strong' || p.confidence === 'probable')
		.slice(0, 1);

	// Dominant pillar = highest score
	const pillarEntries: { id: string; score: PillarScore }[] = [
		{ id: 'rhythm', score: result.pillarAnalysis.rhythm },
		{ id: 'safety', score: result.pillarAnalysis.safety },
		{ id: 'innerQuiet', score: result.pillarAnalysis.innerQuiet },
		{ id: 'oxygen', score: result.pillarAnalysis.oxygen }
	];
	pillarEntries.sort((a, b) => b.score.score - a.score.score);
	const dominantPillar = pillarEntries[0];
	const contributingPillars = pillarEntries
		.slice(1)
		.filter((p) => p.score.severity !== 'not_concern');

	// Active modifiers
	const activeModifiers = result.modifiers.filter((m) => m.active);

	// Severity from ISI
	const isi = result.sleepProfile.isiScore;
	const severity: 'severe' | 'moderate' | 'mild' = isi >= 22 ? 'severe' : isi >= 15 ? 'moderate' : 'mild';

	// Chronicity from duration
	const duration = result.sleepProfile.duration ?? '';
	const chronicity: 'acute' | 'chronic' | 'lifelong' =
		duration === 'always' ? 'lifelong' :
		(duration === '6_12_months' || duration === 'over_year') ? 'chronic' :
		'acute';

	// Collect all triggering habits from patterns
	const triggeringHabits = [
		...new Set(
			[primaryPattern, ...secondaryPatterns]
				.flatMap((p) => p?.triggeringAnswers ?? [])
		)
	];

	// Phase recommendations
	const recommendations = phaseRecommendations(result.recommendations);

	return {
		primaryPattern,
		secondaryPatterns,
		dominantPillar,
		contributingPillars,
		activeModifiers,
		redFlags: result.redFlags,
		severity,
		chronicity,
		primaryComplaint: result.sleepProfile.primaryComplaint ?? 'multiple',
		triggeringHabits,
		recommendations
	};
}

function phaseRecommendations(recs: ScoringResult['recommendations']): PhasedRecommendations {
	const immediate = recs.filter(
		(r) => r.tier === 1 || (r.tier === 2 && r.effortLevel === 'quick_fix') ||
		r.effortLevel === 'professional'
	);
	const building = recs.filter(
		(r) => !immediate.includes(r) &&
		(r.tier === 2 || (r.tier === 3 && (r.effortLevel === 'quick_fix' || r.effortLevel === 'moderate')))
	);
	const sustaining = recs.filter(
		(r) => !immediate.includes(r) && !building.includes(r)
	);

	return { immediate, building, sustaining };
}
