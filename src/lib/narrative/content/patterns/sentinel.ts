import type { PatternContent } from '../../types';

export const sentinel: PatternContent = {
	whereYouAre: {
		primary: `Alright, let me walk you through what is going on, because once you see the mechanics of this, the fixes make a lot more sense.

Your nervous system is stuck in protection mode. Think of your autonomic nervous system as having two gears: one for action and vigilance, one for rest and repair. Yours is locked in the first gear. Not because something is wrong with you — but because your brainstem, the ancient part of your brain that runs threat detection, has decided the environment is not safe enough to power down. {{complaint_acknowledgment}}

This is like a smoke detector {{severity_analogy}}

{{pillar_bridge}} {{modifier_insert}}

The result is a body that is tired but will not let go. Exhausted during the day, then oddly alert at bedtime. Shallow sleep, frequent wakings, and mornings that feel like you never actually rested. Your muscles hold tension, your hearing stays sharp, your startle reflex is hair-trigger. This is not insomnia in the traditional sense — this is your body doing exactly what it thinks it should be doing to keep you safe.`,

		secondary: `There is also a vigilance piece running underneath — your nervous system is holding more tension and alertness than it should be at night. Your body is not fully letting go when you lie down, which means even when the primary issue improves, the depth and restfulness of your sleep may still be limited until the safety system recalibrates.`
	},

	feedingTheLoop: {
		primary: `A few things are keeping this protection loop locked in place.

{{habit_details}}

And because your nervous system is already in guard mode, each of these amplifiers hits harder than it would for someone whose baseline is calm. A noise that would be a minor annoyance for a relaxed sleeper becomes a full arousal event for a system that is scanning for threats. That is why addressing the root — the nervous system state — matters more than optimizing the details.`,

		secondary: `The hypervigilance is amplifying everything else — stressors that might be manageable for someone whose nervous system is calibrated to safety become sleep-wrecking events when your brainstem is already on alert.`
	},

	suggestions: {
		framing: `The order here matters more than usual for you, because your nervous system needs to learn safety before it can accept optimization. Throwing supplements or sleep hygiene tips at a body in protection mode is like putting premium fuel in a car with the parking brake on. We need to release the brake first.`
	},

	honestVersion: {
		primary: `Here is what I want you to know: this pattern runs deep, and it did not develop overnight. {{honest_chronicity}} The nervous system regulation work — the breathing, the body-based practices — will feel underwhelming at first. You might think "this cannot possibly be enough." It is. The brainstem does not respond to rational arguments or willpower. It responds to repeated physiological signals of safety. That takes time and repetition.

The first thing you will notice is not better sleep — it is that your body starts to let go a little during the day. Less jaw clenching, less startle, less baseline tension. The sleep improvement follows that, usually by 1-2 weeks. Do not try to force it. The forcing is literally the thing that keeps the pattern alive.

Come back to me in two weeks and tell me how the daytime tension is shifting. We will adjust from there.`,

		secondary: `The vigilance piece may take longer to shift than the other patterns, because it is driven by the oldest, most stubborn part of your brain. Be patient with it — it is trying to protect you, and it needs time to learn that the protection is no longer needed.`
	}
};
