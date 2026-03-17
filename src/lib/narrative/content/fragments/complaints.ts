/** Complaint acknowledgment fragments, keyed by primaryComplaint value */
export const complaints: Record<string, string> = {
	cant_fall_asleep:
		'You described lying there unable to fall asleep, and that lines up with what we are seeing in your results. Your system is revving when it should be winding down.',

	wake_during_night:
		'Waking up repeatedly during the night makes sense once you understand the mechanism. Your body is cycling through lighter sleep stages without enough stability to stay down.',

	wake_too_early:
		'Waking up too early and not being able to get back to sleep is one of the hallmark signs here. Your cortisol is punching in before the alarm does.',

	unrestorative:
		'You sleep through the night but wake up feeling unrested, and that is actually very telling. You are getting the hours but not the quality. Your sleep architecture is disrupted even though the clock says you slept.',

	excessive_sleepiness:
		'Being unbearably sleepy during the day despite sleeping is a signal that something structural is off. Your body is not getting what it needs from the hours you are putting in.',

	parasomnias:
		'The unusual things happening during sleep, the movements, the acting out, those point to something specific in how your brain is managing sleep stage transitions.',

	irregular_schedule:
		'The all-over-the-place schedule is both a symptom and a driver here. Your internal clock has lost its anchor point.',

	multiple:
		'You flagged several issues at once, which is actually common. I see this a lot. These things tend to cluster because they share underlying mechanisms.'
};
