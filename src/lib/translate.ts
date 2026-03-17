import en from './i18n/en.json';
import ro from './i18n/ro.json';
import { locale } from './stores/locale.svelte';

type NestedRecord = { [key: string]: string | NestedRecord };

const locales: Record<string, NestedRecord> = {
	en: en as NestedRecord,
	ro: ro as NestedRecord
};

function resolve(key: string, dict: NestedRecord): string {
	const parts = key.split('.');
	let current: string | NestedRecord = dict;

	for (let i = 0; i < parts.length; i++) {
		if (typeof current !== 'object' || current === null) return key;
		const record = current as NestedRecord;

		// Always try the flat (remaining) key first — handles "sleep_onset.immediate" as a single key
		const flatKey = parts.slice(i).join('.');
		if (flatKey in record) {
			const val = record[flatKey];
			if (typeof val === 'string') return val;
		}

		// Otherwise navigate one level deeper
		if (parts[i] in record) {
			current = record[parts[i]];
			continue;
		}

		return key;
	}

	return typeof current === 'string' ? current : key;
}

export function translate(key: string): string {
	const dict = locales[locale.value] ?? locales['en'];
	const result = resolve(key, dict);
	// Fall back to English if key not found in current locale
	if (result === key && locale.value !== 'en') {
		return resolve(key, locales['en']);
	}
	return result;
}
