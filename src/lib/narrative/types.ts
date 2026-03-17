import type { IdentifiedPattern, BiologicalModifier, RedFlag, Recommendation, PillarScore } from '../scoring/types';

export interface NarrativeProfile {
	primaryPattern: IdentifiedPattern;
	secondaryPatterns: IdentifiedPattern[];
	dominantPillar: { id: string; score: PillarScore };
	contributingPillars: { id: string; score: PillarScore }[];
	activeModifiers: BiologicalModifier[];
	redFlags: RedFlag[];
	severity: 'severe' | 'moderate' | 'mild';
	chronicity: 'acute' | 'chronic' | 'lifelong';
	primaryComplaint: string;
	triggeringHabits: string[];
	recommendations: PhasedRecommendations;
}

export interface PhasedRecommendations {
	immediate: Recommendation[];
	building: Recommendation[];
	sustaining: Recommendation[];
}

export interface PatternContent {
	whereYouAre: { primary: string; secondary: string };
	feedingTheLoop: { primary: string; secondary: string };
	suggestions: { framing: string };
	honestVersion: { primary: string; secondary: string };
}

export interface NarrativeResult {
	sections: {
		whereYouAre: string;
		feedingTheLoop: string;
		suggestions: string;
		honestVersion: string;
	};
	metadata: {
		primaryPattern: string;
		secondaryPatterns: string[];
		isiSeverity: string;
		redFlags: string[];
	};
}
