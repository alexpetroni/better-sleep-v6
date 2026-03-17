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

import { sentinel as sentinel_ro } from '../../content-ro/patterns/sentinel';
import { perfectionist as perfectionist_ro } from '../../content-ro/patterns/perfectionist';
import { manager as manager_ro } from '../../content-ro/patterns/manager';
import { ruminator as ruminator_ro } from '../../content-ro/patterns/ruminator';
import { volcano as volcano_ro } from '../../content-ro/patterns/volcano';
import { savior as savior_ro } from '../../content-ro/patterns/savior';
import { antenna as antenna_ro } from '../../content-ro/patterns/antenna';
import { fugitive as fugitive_ro } from '../../content-ro/patterns/fugitive';
import { exhausted as exhausted_ro } from '../../content-ro/patterns/exhausted';

const en: Record<string, PatternContent> = {
	sentinel, perfectionist, manager, ruminator, volcano, savior, antenna, fugitive, exhausted
};

const ro: Record<string, PatternContent> = {
	sentinel: sentinel_ro, perfectionist: perfectionist_ro, manager: manager_ro,
	ruminator: ruminator_ro, volcano: volcano_ro, savior: savior_ro,
	antenna: antenna_ro, fugitive: fugitive_ro, exhausted: exhausted_ro
};

const localeMap: Record<string, Record<string, PatternContent>> = { en, ro };

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

export function loadPatternContent(patternId: string, locale = 'en'): PatternContent {
	const map = localeMap[locale] ?? localeMap['en'];
	return map[patternId] ?? localeMap['en'][patternId] ?? fallback;
}
