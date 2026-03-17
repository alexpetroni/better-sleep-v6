import { complaints as complaints_en } from './complaints';
import { severity as severity_en } from './severity';
import { pillarBridges as pillarBridges_en } from './pillar-bridges';
import { modifierInserts as modifierInserts_en } from './modifier-inserts';
import { habits as habits_en } from './habits';
import { recommendationProse as recommendationProse_en } from './recommendations';
import { redFlagWarnings as redFlagWarnings_en } from './red-flags';
import { honestFragments as honestFragments_en } from './honest';

import { complaints as complaints_ro } from '../../content-ro/fragments/complaints';
import { severity as severity_ro } from '../../content-ro/fragments/severity';
import { pillarBridges as pillarBridges_ro } from '../../content-ro/fragments/pillar-bridges';
import { modifierInserts as modifierInserts_ro } from '../../content-ro/fragments/modifier-inserts';
import { habits as habits_ro } from '../../content-ro/fragments/habits';
import { recommendationProse as recommendationProse_ro } from '../../content-ro/fragments/recommendations';
import { redFlagWarnings as redFlagWarnings_ro } from '../../content-ro/fragments/red-flags';
import { honestFragments as honestFragments_ro } from '../../content-ro/fragments/honest';

export interface FragmentSet {
	complaints: Record<string, string>;
	severity: Record<string, string>;
	pillarBridges: Record<string, string>;
	modifierInserts: Record<string, string>;
	habits: Record<string, string>;
	recommendationProse: Record<string, string>;
	redFlagWarnings: Record<string, string>;
	honestFragments: Record<string, string>;
}

const en: FragmentSet = {
	complaints: complaints_en,
	severity: severity_en,
	pillarBridges: pillarBridges_en,
	modifierInserts: modifierInserts_en,
	habits: habits_en,
	recommendationProse: recommendationProse_en,
	redFlagWarnings: redFlagWarnings_en,
	honestFragments: honestFragments_en
};

const ro: FragmentSet = {
	complaints: complaints_ro,
	severity: severity_ro,
	pillarBridges: pillarBridges_ro,
	modifierInserts: modifierInserts_ro,
	habits: habits_ro,
	recommendationProse: recommendationProse_ro,
	redFlagWarnings: redFlagWarnings_ro,
	honestFragments: honestFragments_ro
};

const localeMap: Record<string, FragmentSet> = { en, ro };

export function loadFragments(locale = 'en'): FragmentSet {
	return localeMap[locale] ?? localeMap['en'];
}
