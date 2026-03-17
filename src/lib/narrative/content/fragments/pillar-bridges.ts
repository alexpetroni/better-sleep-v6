/** Pillar bridge fragments, keyed by "pillarId_severity" */
export const pillarBridges: Record<string, string> = {
	// Rhythm
	rhythm_major:
		'Your circadian rhythm is significantly off track. Your internal clock is fighting against your schedule instead of supporting it, and this is one of the biggest levers we can pull.',
	rhythm_moderate:
		'There is a circadian component here too. Your internal clock is somewhat misaligned with your actual schedule, and that compounds everything else.',
	rhythm_minor:
		'Your circadian rhythm is mostly intact, which gives us a good foundation to work from.',

	// Safety
	safety_major:
		'The safety dimension is lighting up across the board. Your nervous system is not letting go, and that is driving much of what you experience at night. This is not about willpower. Your brainstem is running a protection program.',
	safety_moderate:
		'There is a nervous system activation piece here too. Your body is holding more tension and alertness than it should be at bedtime.',
	safety_minor:
		'Your sense of safety is mostly solid, so we can focus on the other drivers.',

	// Inner Quiet
	innerQuiet_major:
		'The mental noise is a major factor. Your mind is not just active at night, it is running a loop that actually intensifies when you try to shut it down. That is a specific mechanism, not a character flaw.',
	innerQuiet_moderate:
		'There is a cognitive activation piece in play. Your mind gets busy when it should be quieting down, and that adds friction to the whole process.',
	innerQuiet_minor:
		'Your mental wind-down is mostly functional. One less thing we need to address.',

	// Oxygen
	oxygen_major:
		'There are significant airway and breathing indicators here that need attention. This could be the single biggest factor undermining your sleep quality, because no amount of good habits can compensate if your airway is compromised.',
	oxygen_moderate:
		'The breathing indicators suggest some airway involvement. Not necessarily obstructive sleep apnea, but enough that your oxygen supply during sleep may be taking a hit.',
	oxygen_minor:
		'Your breathing and airway picture looks mostly clear, which is reassuring.'
};
