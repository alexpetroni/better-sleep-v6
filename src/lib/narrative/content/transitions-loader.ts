import { transitions as transitions_en } from './transitions';
import { transitions as transitions_ro } from '../content-ro/transitions';

const localeMap: Record<string, Record<string, string>> = {
	en: transitions_en,
	ro: transitions_ro
};

export function loadTransitions(locale = 'en'): Record<string, string> {
	return localeMap[locale] ?? localeMap['en'];
}
