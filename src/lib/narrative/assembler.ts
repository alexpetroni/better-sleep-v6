import type { NarrativeProfile, NarrativeResult } from './types';
import type { FragmentSet } from './content/fragments/index';
import type { Recommendation } from '../scoring/types';
import { interpolate } from './interpolator';
import { loadPatternContent } from './content/patterns/index';
import { loadFragments } from './content/fragments/index';
import { loadTransitions } from './content/transitions-loader';

const PHASE_HEADINGS: Record<string, { immediate: string; building: string; sustaining: string }> = {
	en: {
		immediate: 'First two weeks: the non-negotiables',
		building: 'Weeks three and four: building on the base',
		sustaining: 'Month two onward: fine-tuning'
	},
	ro: {
		immediate: 'Primele două săptămâni: esențialul',
		building: 'Săptămânile trei și patru: consolidare',
		sustaining: 'Luna a doua înainte: reglaj fin'
	}
};

/** Build the fragment lookup for template interpolation */
function buildFragments(profile: NarrativeProfile, frag: FragmentSet): Record<string, string> {
	const frags: Record<string, string> = {};

	frags['complaint_acknowledgment'] = frag.complaints[profile.primaryComplaint] ?? '';

	const isiSev = profile.severity === 'severe' ? 'severe' :
		profile.severity === 'moderate' ? 'moderate' : 'subthreshold';
	frags['severity_analogy'] = frag.severity[isiSev] ?? frag.severity['subthreshold'] ?? '';

	const pillarKey = `${profile.dominantPillar.id}_${profile.dominantPillar.score.severity}`;
	frags['pillar_bridge'] = frag.pillarBridges[pillarKey] ?? '';

	const firstMod = profile.activeModifiers[0];
	frags['modifier_insert'] = firstMod ? (frag.modifierInserts[firstMod.id] ?? '') : '';

	frags['habit_details'] = buildHabitParagraphs(profile, frag);

	const honestKey = `${profile.chronicity}_${profile.severity}`;
	frags['honest_chronicity'] = frag.honestFragments[honestKey] ?? frag.honestFragments['chronic_moderate'] ?? '';

	return frags;
}

/** Map triggering answers to habit prose fragments */
function buildHabitParagraphs(profile: NarrativeProfile, frag: FragmentSet): string {
	const triggers = profile.triggeringHabits;
	const paragraphs: string[] = [];

	const triggerToHabit: Record<string, string> = {
		evening_screens: 'screen_use', screen_use: 'screen_use',
		work_email: 'work_email', evening_work: 'evening_work_content',
		doomscrolling: 'doomscrolling', late_caffeine: 'late_caffeine',
		alcohol_before_bed: 'alcohol_before_bed', high_sugar: 'high_sugar',
		irregular_schedule: 'irregular_schedule', bright_evening_light: 'bright_evening_light',
		bed_association: 'bed_association', noise_disruption: 'noise_disruption',
		partner_disruption: 'partner_disrupts', temperature_issue: 'temperature_issue',
		mouth_breathing: 'mouth_breathing_night', shift_work: 'shift_work_pattern'
	};

	const used = new Set<string>();
	for (const trigger of triggers) {
		const habitKey = triggerToHabit[trigger] ?? trigger;
		if (frag.habits[habitKey] && !used.has(habitKey)) {
			paragraphs.push(frag.habits[habitKey]);
			used.add(habitKey);
		}
	}

	for (const pillar of [profile.dominantPillar, ...profile.contributingPillars]) {
		for (const contrib of pillar.score.contributors) {
			const habitKey = triggerToHabit[contrib] ?? contrib;
			if (frag.habits[habitKey] && !used.has(habitKey)) {
				paragraphs.push(frag.habits[habitKey]);
				used.add(habitKey);
			}
		}
	}

	return paragraphs.slice(0, 3).join('\n\n');
}

/** Assemble the suggestions section from phased recommendations */
function buildSuggestionsSection(
	framingParagraph: string,
	profile: NarrativeProfile,
	frag: FragmentSet,
	locale: string
): string {
	const sections: string[] = [];
	sections.push(framingParagraph);

	if (profile.redFlags.length > 0) {
		const warnings = profile.redFlags
			.map((rf) => frag.redFlagWarnings[rf.id])
			.filter(Boolean);
		if (warnings.length > 0) sections.push(warnings.join('\n\n'));
	}

	const headings = PHASE_HEADINGS[locale] ?? PHASE_HEADINGS['en'];

	if (profile.recommendations.immediate.length > 0) {
		sections.push(headings.immediate);
		sections.push(formatRecommendations(profile.recommendations.immediate, frag));
	}

	if (profile.recommendations.building.length > 0) {
		sections.push(headings.building);
		sections.push(formatRecommendations(profile.recommendations.building, frag));
	}

	if (profile.recommendations.sustaining.length > 0) {
		sections.push(headings.sustaining);
		sections.push(formatRecommendations(profile.recommendations.sustaining, frag));
	}

	return sections.join('\n\n');
}

function formatRecommendations(recs: Recommendation[], frag: FragmentSet): string {
	return recs
		.map((r) => frag.recommendationProse[r.id] ?? '')
		.filter(Boolean)
		.join('\n\n');
}

/** Main assembly function */
export function assembleNarrative(profile: NarrativeProfile, locale = 'en'): NarrativeResult {
	const primaryContent = loadPatternContent(profile.primaryPattern.id, locale);
	const frag = loadFragments(locale);
	const trans = loadTransitions(locale);
	const fragments = buildFragments(profile, frag);

	// Section 1: Where you are
	let whereYouAre = interpolate(primaryContent.whereYouAre.primary, fragments);
	for (const secondary of profile.secondaryPatterns) {
		const secondaryContent = loadPatternContent(secondary.id, locale);
		const key = `${profile.primaryPattern.id}->${secondary.id}`;
		const transition = trans[key] ?? trans['generic'] ?? '';
		whereYouAre += `\n\n${transition} ${secondaryContent.whereYouAre.secondary}`;
	}

	// Section 2: Feeding the loop
	let feedingTheLoop = interpolate(primaryContent.feedingTheLoop.primary, fragments);
	for (const secondary of profile.secondaryPatterns) {
		const secondaryContent = loadPatternContent(secondary.id, locale);
		feedingTheLoop += `\n\n${secondaryContent.feedingTheLoop.secondary}`;
	}

	// Section 3: Suggestions
	const framingInterpolated = interpolate(primaryContent.suggestions.framing, fragments);
	const suggestions = buildSuggestionsSection(framingInterpolated, profile, frag, locale);

	// Section 4: Honest version
	let honestVersion = interpolate(primaryContent.honestVersion.primary, fragments);
	for (const secondary of profile.secondaryPatterns) {
		const secondaryContent = loadPatternContent(secondary.id, locale);
		honestVersion += `\n\n${secondaryContent.honestVersion.secondary}`;
	}

	return {
		sections: { whereYouAre, feedingTheLoop, suggestions, honestVersion },
		metadata: {
			primaryPattern: profile.primaryPattern.id,
			secondaryPatterns: profile.secondaryPatterns.map((p) => p.id),
			isiSeverity: profile.severity,
			redFlags: profile.redFlags.map((rf) => rf.id)
		}
	};
}
