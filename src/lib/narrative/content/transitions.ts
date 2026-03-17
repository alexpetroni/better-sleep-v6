/**
 * Transition phrases for connecting primary pattern narrative to secondary pattern.
 * Keyed by "primary->secondary" pattern pair, with a generic fallback.
 */
export const transitions: Record<string, string> = {
	// Common pairs
	'sentinel->ruminator':
		'And there is another layer here. The vigilance is not just physical. Your mind is running its own version of the same protection loop.',
	'sentinel->manager':
		'On top of the physical vigilance, your executive brain is also staying activated, running through tasks and responsibilities even as your body tries to rest.',
	'sentinel->perfectionist':
		'The hypervigilance has also created a secondary problem. Your bed has become associated with effort and wakefulness, not rest.',
	'ruminator->sentinel':
		'Underneath the mental loop, there is a physical dimension too. Your body is holding tension that mirrors the cognitive activity.',
	'ruminator->perfectionist':
		'The rumination has created a secondary pattern: you have started to associate your bed with the mental loop itself. The harder you try to stop thinking, the more your brain fires up.',
	'manager->perfectionist':
		'The executive overdrive has spilled into your sleep relationship itself. You are now managing your sleep the same way you manage everything else, and that effort is making it worse.',
	'manager->ruminator':
		'The work-brain does not just shut off cleanly. It shifts from planning mode into replay mode, going over the day or rehearsing tomorrow.',
	'perfectionist->ruminator':
		'The sleep frustration has opened the door to a broader rumination pattern. Your mind now has a ready-made topic (your sleep itself) to chew on every night.',
	'perfectionist->sentinel':
		'The repeated experience of lying awake has started to trigger a physical vigilance response. Your body now tenses up in anticipation of another bad night.',
	'exhausted->sentinel':
		'When the body is this depleted, the nervous system often compensates by running hotter. More alert, more reactive. It does not have the reserves to handle actual threats calmly, so it stays on edge.',
	'exhausted->savior':
		'The exhaustion and the caregiving are deeply intertwined. You have been running on fumes for others while your own tank has been empty.',
	'fugitive->perfectionist':
		'The avoidance pattern has created a secondary problem. Now you associate bed with the experience of trying and failing to sleep, which makes the avoidance even more tempting.',
	'fugitive->ruminator':
		'The scrolling and avoidance are partially driven by what waits in the silence. When you put the screen down, the thoughts rush in.',
	'savior->exhausted':
		'The caregiving demands have pushed your body into genuine physiological exhaustion. This is not just feeling tired. Your system is running out of adaptive capacity.',
	'antenna->sentinel':
		'The sensory sensitivity is interacting with a broader vigilance pattern. Your system is scanning the environment for disruption, which keeps arousal high.',
	'volcano->sentinel':
		'The physical tension you are holding is part of a broader pattern. Your nervous system is running a suppression program that keeps the body activated even when the mind feels calm.',

	// Generic fallback
	generic:
		'There is another layer here worth naming, because it is amplifying the primary pattern.'
};
