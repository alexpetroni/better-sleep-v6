/** Red flag warning fragments, keyed by red flag id */
export const redFlagWarnings: Record<string, string> = {
	sleep_apnea:
		'Before anything else: your answers raise enough flags for possible obstructive sleep apnea that I would want a sleep study done. This is not a "maybe get around to it" situation — if your airway is collapsing during sleep, everything else we do is building on a compromised foundation. A sleep study is the definitive test, and modern home-based versions make it straightforward.',

	rbd:
		'The dream enactment you described — physically acting out dreams, moving, falling out of bed — needs neurological evaluation. This is a specific condition called REM sleep behavior disorder, and while it is manageable, it needs professional assessment both for your immediate safety and because it can be associated with other conditions that benefit from early monitoring.',

	severe_insomnia:
		'Your insomnia severity scores are in the clinical range. I want to be clear that this is treatable — CBT-I (cognitive behavioral therapy for insomnia) has the strongest evidence base of any insomnia intervention, stronger even than medication, and with lasting results. I would strongly encourage connecting with a sleep specialist or psychologist trained in CBT-I.',

	depression:
		'Your mood screening scores suggest depression may be a significant factor. Sleep and mood are deeply bidirectional — poor sleep worsens mood, and depression disrupts sleep architecture. Addressing both simultaneously produces better outcomes than tackling either alone. A mental health professional can help determine whether treatment for depression should run in parallel with the sleep interventions.',

	anxiety:
		'Your anxiety screening scores are elevated, and this is almost certainly feeding into the sleep difficulty. Anxiety activates the same sympathetic nervous system pathways that prevent sleep onset. The interventions below will help, but if the anxiety persists, working with a therapist — particularly one familiar with both anxiety and sleep — would be the highest-value addition.',

	eds:
		'Excessive daytime sleepiness despite adequate sleep time is a flag that should be evaluated by a sleep specialist. It could indicate a sleep disorder that prevents restorative sleep even when you are getting enough hours — things like upper airway resistance, periodic limb movements, or in rarer cases, central hypersomnias.',

	parasomnia:
		'The sleepwalking or complex sleep behaviors you described should be discussed with a sleep specialist. These events carry physical safety risks, and there are specific strategies and sometimes medications that can help manage them.'
};
