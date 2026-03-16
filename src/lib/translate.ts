import en from './i18n/en.json';

type NestedRecord = { [key: string]: string | NestedRecord };

export function translate(key: string): string {
	const parts = key.split('.');
	let current: string | NestedRecord = en as NestedRecord;

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
