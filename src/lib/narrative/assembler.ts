import type { NarrativeProfile, NarrativeResult, PatternContent } from './types';
import type { Recommendation } from '../scoring/types';
import { interpolate } from './interpolator';
import { loadPatternContent } from './content/patterns/index';
import { complaints } from './content/fragments/complaints';
import { severity } from './content/fragments/severity';
import { pillarBridges } from './content/fragments/pillar-bridges';
import { modifierInserts } from './content/fragments/modifier-inserts';
import { habits } from './content/fragments/habits';
import { recommendationProse } from './content/fragments/recommendations';
import { redFlagWarnings } from './content/fragments/red-flags';
import { honestFragments } from './content/fragments/honest';
import { transitions } from './content/transitions';

/** Build the fragment lookup for template interpolation */
function buildFragments(profile: NarrativeProfile): Record<string, string> {
	const frags: Record<string, string> = {};

	// Complaint acknowledgment
	frags['complaint_acknowledgment'] = complaints[profile.primaryComplaint] ?? '';

	// Severity analogy
	const isiSev = profile.severity === 'severe' ? 'severe' :
		profile.severity === 'moderate' ? 'moderate' :
		'subthreshold';
	frags['severity_analogy'] = severity[isiSev] ?? severity['subthreshold'] ?? '';

	// Pillar bridge (dominant)
	const pillarKey = `${profile.dominantPillar.id}_${profile.dominantPillar.score.severity}`;
	frags['pillar_bridge'] = pillarBridges[pillarKey] ?? '';

	// Modifier insert (first active modifier)
	const firstMod = profile.activeModifiers[0];
	frags['modifier_insert'] = firstMod ? (modifierInserts[firstMod.id] ?? '') : '';

	// Habit details — collect relevant habit paragraphs from triggering answers
	const habitParagraphs = buildHabitParagraphs(profile);
	frags['habit_details'] = habitParagraphs;

	// Honest chronicity+severity
	const honestKey = `${profile.chronicity}_${profile.severity}`;
	frags['honest_chronicity'] = honestFragments[honestKey] ?? honestFragments['chronic_moderate'] ?? '';

	return frags;
}

/** Map triggering answers to habit prose fragments */
function buildHabitParagraphs(profile: NarrativeProfile): string {
	const triggers = profile.triggeringHabits;
	const paragraphs: string[] = [];

	// Map trigger IDs to habit fragment keys
	const triggerToHabit: Record<string, string> = {
		evening_screens: 'screen_use',
		screen_use: 'screen_use',
		work_email: 'work_email',
		evening_work: 'evening_work_content',
		doomscrolling: 'doomscrolling',
		late_caffeine: 'late_caffeine',
		alcohol_before_bed: 'alcohol_before_bed',
		high_sugar: 'high_sugar',
		irregular_schedule: 'irregular_schedule',
		bright_evening_light: 'bright_evening_light',
		bed_association: 'bed_association',
		noise_disruption: 'noise_disruption',
		partner_disruption: 'partner_disrupts',
		temperature_issue: 'temperature_issue',
		mouth_breathing: 'mouth_breathing_night',
		shift_work: 'shift_work_pattern'
	};

	const used = new Set<string>();
	for (const trigger of triggers) {
		const habitKey = triggerToHabit[trigger] ?? trigger;
		if (habits[habitKey] && !used.has(habitKey)) {
			paragraphs.push(habits[habitKey]);
			used.add(habitKey);
		}
	}

	// Also check pillar contributors for habit matches
	for (const pillar of [profile.dominantPillar, ...profile.contributingPillars]) {
		for (const contrib of pillar.score.contributors) {
			const habitKey = triggerToHabit[contrib] ?? contrib;
			if (habits[habitKey] && !used.has(habitKey)) {
				paragraphs.push(habits[habitKey]);
				used.add(habitKey);
			}
		}
	}

	return paragraphs.slice(0, 3).join('\n\n'); // Cap at 3 to keep focused
}

/** Assemble the suggestions section from phased recommendations */
function buildSuggestionsSection(
	framingParagraph: string,
	profile: NarrativeProfile
): string {
	const sections: string[] = [];
	sections.push(framingParagraph);

	// Red flags first (urgent)
	if (profile.redFlags.length > 0) {
		const warnings = profile.redFlags
			.map((rf) => redFlagWarnings[rf.id])
			.filter(Boolean);
		if (warnings.length > 0) {
			sections.push(warnings.join('\n\n'));
		}
	}

	// Phase 1: Weeks 1-2
	if (profile.recommendations.immediate.length > 0) {
		sections.push('First two weeks: the non-negotiables');
		sections.push(formatRecommendations(profile.recommendations.immediate));
	}

	// Phase 2: Weeks 3-4
	if (profile.recommendations.building.length > 0) {
		sections.push('Weeks three and four: building on the base');
		sections.push(formatRecommendations(profile.recommendations.building));
	}

	// Phase 3: Month 2+
	if (profile.recommendations.sustaining.length > 0) {
		sections.push('Month two onward: fine-tuning');
		sections.push(formatRecommendations(profile.recommendations.sustaining));
	}

	return sections.join('\n\n');
}

function formatRecommendations(recs: Recommendation[]): string {
	return recs
		.map((r) => recommendationProse[r.id] ?? '')
		.filter(Boolean)
		.join('\n\n');
}

/** Get transition phrase for a pattern pair */
function getTransition(primaryId: string, secondaryId: string): string {
	const key = `${primaryId}->${secondaryId}`;
	return transitions[key] ?? transitions['generic'] ?? '';
}

/** Main assembly function */
export function assembleNarrative(profile: NarrativeProfile): NarrativeResult {
	const primaryContent = loadPatternContent(profile.primaryPattern.id);
	const fragments = buildFragments(profile);

	// Section 1: Where you are
	let whereYouAre = interpolate(primaryContent.whereYouAre.primary, fragments);
	for (const secondary of profile.secondaryPatterns) {
		const secondaryContent = loadPatternContent(secondary.id);
		const transition = getTransition(profile.primaryPattern.id, secondary.id);
		whereYouAre += `\n\n${transition} ${secondaryContent.whereYouAre.secondary}`;
	}

	// Section 2: Feeding the loop
	let feedingTheLoop = interpolate(primaryContent.feedingTheLoop.primary, fragments);
	for (const secondary of profile.secondaryPatterns) {
		const secondaryContent = loadPatternContent(secondary.id);
		feedingTheLoop += `\n\n${secondaryContent.feedingTheLoop.secondary}`;
	}

	// Section 3: Suggestions (phased recommendations)
	const framingInterpolated = interpolate(primaryContent.suggestions.framing, fragments);
	const suggestions = buildSuggestionsSection(framingInterpolated, profile);

	// Section 4: Honest version
	let honestVersion = interpolate(primaryContent.honestVersion.primary, fragments);
	for (const secondary of profile.secondaryPatterns) {
		const secondaryContent = loadPatternContent(secondary.id);
		honestVersion += `\n\n${secondaryContent.honestVersion.secondary}`;
	}

	return {
		sections: {
			whereYouAre,
			feedingTheLoop,
			suggestions,
			honestVersion
		},
		metadata: {
			primaryPattern: profile.primaryPattern.id,
			secondaryPatterns: profile.secondaryPatterns.map((p) => p.id),
			isiSeverity: profile.severity,
			redFlags: profile.redFlags.map((rf) => rf.id)
		}
	};
}
