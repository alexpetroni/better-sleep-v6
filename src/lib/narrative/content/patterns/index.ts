import type { PatternContent } from '../../types';
import { sentinel } from './sentinel';
import { perfectionist } from './perfectionist';
import { manager } from './manager';
import { ruminator } from './ruminator';
import { volcano } from './volcano';
import { savior } from './savior';
import { antenna } from './antenna';
import { fugitive } from './fugitive';
import { exhausted } from './exhausted';

const patternContentMap: Record<string, PatternContent> = {
	sentinel,
	perfectionist,
	manager,
	ruminator,
	volcano,
	savior,
	antenna,
	fugitive,
	exhausted
};

const fallback: PatternContent = {
	whereYouAre: {
		primary: 'Your sleep pattern indicates something specific is going on that we can address. {{complaint_acknowledgment}} {{pillar_bridge}} {{modifier_insert}}',
		secondary: ''
	},
	feedingTheLoop: {
		primary: '{{habit_details}}',
		secondary: ''
	},
	suggestions: {
		framing: 'Let us layer these changes in order of impact. Do not try to do everything at once.'
	},
	honestVersion: {
		primary: '{{honest_chronicity}} The changes below are proven to work, but they need consistency. Give it two weeks before you judge whether anything is shifting.',
		secondary: ''
	}
};

export function loadPatternContent(patternId: string): PatternContent {
	return patternContentMap[patternId] ?? fallback;
}
