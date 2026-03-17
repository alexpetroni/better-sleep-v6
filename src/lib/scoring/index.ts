import type { AssessmentResponses, ScoringResult } from './types';
import { computeSleepProfile } from './sleep-profile';
import { computePillars } from './pillars';
import { computeDimensions } from './dimensions';
import { computePatterns } from './patterns';
import { computeModifiers } from './modifiers';
import { computeRedFlags } from './red-flags';
import { generateRecommendations } from './recommendations';

/** Remap v6 step IDs (step-1..step-6) to v4 format (step1..step6) */
function adaptResponses(raw: Record<string, Record<string, unknown>>): AssessmentResponses {
	return {
		step1: raw['step-1'] ?? {},
		step2: raw['step-2'] ?? {},
		step3: raw['step-3'] ?? {},
		step4: raw['step-4'] ?? {},
		step5: raw['step-5'] ?? {},
		step6: raw['step-6'] ?? {}
	};
}

export function scoreAssessment(raw: Record<string, Record<string, unknown>>): ScoringResult {
	const responses = adaptResponses(raw);
	const sleepProfile = computeSleepProfile(responses);
	const pillarAnalysis = computePillars(responses);
	const dimensionAnalysis = computeDimensions(responses);
	const patterns = computePatterns(responses);
	const modifiers = computeModifiers(responses);
	const redFlags = computeRedFlags(responses, sleepProfile);
	const recommendations = generateRecommendations(
		pillarAnalysis,
		dimensionAnalysis,
		patterns,
		modifiers,
		redFlags
	);

	return {
		sleepProfile,
		pillarAnalysis,
		dimensionAnalysis,
		patterns,
		modifiers,
		redFlags,
		recommendations
	};
}

export type { ScoringResult, AssessmentResponses } from './types';
