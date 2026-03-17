/** Pillar bridge fragments, keyed by "pillarId_severity" */
export const pillarBridges: Record<string, string> = {
	// Rhythm
	rhythm_major:
		'Your circadian rhythm is significantly off track, which means your internal clock is fighting against your schedule instead of supporting it. This is one of the biggest levers we can pull.',
	rhythm_moderate:
		'There is also a circadian component here — your internal clock is somewhat misaligned with your actual schedule, which compounds everything else.',
	rhythm_minor:
		'Your circadian rhythm is mostly intact, which is a good foundation to work from.',

	// Safety
	safety_major:
		'The safety dimension is lighting up across the board. Your nervous system is not letting go, and that is driving much of what you experience at night. This is not about willpower — it is about your brainstem running a protection program.',
	safety_moderate:
		'There is a nervous system activation piece here too — your body is holding more tension and alertness than it should be at bedtime.',
	safety_minor:
		'Your sense of safety is mostly solid, which means we can focus on the other drivers.',

	// Inner Quiet
	innerQuiet_major:
		'The mental noise is a major factor. Your mind is not just active at night — it is running a loop that actually intensifies when you try to shut it down. That is a specific mechanism, not a character flaw.',
	innerQuiet_moderate:
		'There is a cognitive activation piece in play — your mind gets busy when it should be quieting down, and that is adding friction to the process.',
	innerQuiet_minor:
		'Your mental wind-down is mostly functional, which is one less thing we need to address.',

	// Oxygen
	oxygen_major:
		'There are significant airway and breathing indicators here that need attention. This could be the single biggest factor undermining your sleep quality, because no amount of good habits can compensate if your airway is compromised.',
	oxygen_moderate:
		'The breathing indicators suggest some airway involvement — not necessarily obstructive sleep apnea, but enough that your oxygen supply during sleep may be compromised.',
	oxygen_minor:
		'Your breathing and airway picture looks mostly clear, which is reassuring.'
};
