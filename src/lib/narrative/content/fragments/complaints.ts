/** Complaint acknowledgment fragments, keyed by primaryComplaint value */
export const complaints: Record<string, string> = {
	cant_fall_asleep:
		'You described lying there unable to fall asleep, and that tracks with what we are seeing here — your system is revving when it should be winding down.',

	wake_during_night:
		'The pattern of waking up during the night makes sense when you understand the mechanism — your body is cycling through lighter sleep stages without the stability to stay down.',

	wake_too_early:
		'Waking up too early and not being able to get back to sleep is one of the hallmark signs here — your cortisol is punching in before the alarm.',

	unrestorative:
		'The fact that you sleep through the night but wake up feeling unrested is telling — you are getting hours but not quality. Your sleep architecture is disrupted even if the clock says you slept.',

	excessive_sleepiness:
		'Being unbearably sleepy during the day despite sleeping is a signal that something structural is off — your body is not getting what it needs from the hours you are putting in.',

	parasomnias:
		'The unusual things happening during sleep — the movements, the acting out — point to something specific in how your brain is managing sleep stage transitions.',

	irregular_schedule:
		'The all-over-the-place schedule is both a symptom and a driver here — your internal clock has lost its anchor point.',

	multiple:
		'You flagged several issues at once, which is actually common — these things tend to cluster because they share underlying mechanisms.'
};
