export interface AssessmentResponses {
	step1: Record<string, unknown>;
	step2: Record<string, unknown>;
	step3: Record<string, unknown>;
	step4: Record<string, unknown>;
	step5: Record<string, unknown>;
	step6: Record<string, unknown>;
}

export interface ScoringResult {
	sleepProfile: SleepProfile;
	pillarAnalysis: PillarAnalysis;
	dimensionAnalysis: DimensionAnalysis;
	patterns: IdentifiedPattern[];
	modifiers: BiologicalModifier[];
	redFlags: RedFlag[];
	recommendations: Recommendation[];
}

export interface SleepProfile {
	bedtimeWork: string | null;
	bedtimeFree: string | null;
	waketimeWork: string | null;
	waketimeFree: string | null;
	sleepWindow: number | null;
	estimatedSleep: string | null;
	sleepEfficiency: number | null;
	isiScore: number;
	isiSeverity: 'none' | 'subthreshold' | 'moderate' | 'severe';
	chronotype: 'early' | 'intermediate' | 'late' | 'unknown';
	socialJetLag: number | null;
	estimatedSleepDebt: number | null;
	primaryComplaint: string | null;
	duration: string | null;
	frequency: string | null;
}

export interface PillarAnalysis {
	rhythm: PillarScore;
	safety: PillarScore;
	innerQuiet: PillarScore;
	oxygen: PillarScore;
}

export interface PillarScore {
	score: number;
	severity: SeverityLevel;
	contributors: string[];
}

export type SeverityLevel = 'major' | 'moderate' | 'minor' | 'not_concern';

export interface DimensionAnalysis {
	sleepNow: DimensionScore;
	environment: DimensionScore;
	biology: DimensionScore;
	healthHistory: DimensionScore;
	emotional: DimensionScore;
	safety: DimensionScore;
}

export interface DimensionScore {
	score: number;
	severity: SeverityLevel;
	keyFindings: string[];
}

export interface IdentifiedPattern {
	id: string;
	nameKey: string;
	clinicalTerm: string;
	confidence: 'strong' | 'probable' | 'possible';
	score: number;
	maxScore: number;
	triggeringAnswers: string[];
	mechanismKey: string;
}

export interface BiologicalModifier {
	id: string;
	active: boolean;
	nameKey: string;
	triggeringAnswers: string[];
}

export interface RedFlag {
	id: string;
	severity: 'urgent' | 'important';
	messageKey: string;
	specialistType: string;
	triggeringAnswers: string[];
}

export interface Recommendation {
	id: string;
	tier: 1 | 2 | 3 | 4;
	priority: number;
	actionKey: string;
	rationaleKey: string;
	timelineKey: string;
	effortLevel: 'quick_fix' | 'moderate' | 'significant' | 'professional';
	relatedDimension: string;
	relatedPillar: string;
}
