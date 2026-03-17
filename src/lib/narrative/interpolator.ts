/**
 * Replace {{key}} placeholders in a skeleton with fragment values.
 * Missing keys are removed cleanly (with surrounding whitespace normalization).
 */
export function interpolate(skeleton: string, fragments: Record<string, string>): string {
	let result = skeleton.replace(/\{\{(\w+)\}\}/g, (_match, key: string) => {
		return fragments[key] ?? '';
	});

	// Clean up double spaces, double newlines, and leading/trailing whitespace on lines
	result = result.replace(/  +/g, ' ');
	result = result.replace(/\n{3,}/g, '\n\n');
	result = result.replace(/^ +$/gm, '');

	return result.trim();
}
