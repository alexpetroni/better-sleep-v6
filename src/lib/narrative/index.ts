import type { ScoringResult } from '../scoring/types';
import type { NarrativeResult } from './types';
import { buildNarrativeProfile } from './selector';
import { assembleNarrative } from './assembler';

export function generateNarrative(scoringResult: ScoringResult, locale = 'en'): NarrativeResult {
	const profile = buildNarrativeProfile(scoringResult);
	return assembleNarrative(profile, locale);
}

export type { NarrativeResult } from './types';
