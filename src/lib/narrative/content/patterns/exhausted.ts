import type { PatternContent } from '../../types';

export const exhausted: PatternContent = {
	whereYouAre: {
		primary: `Alright, I need to be straight with you about this one. What is happening in your body is different from the other sleep patterns, and the usual advice is not just unhelpful, it can actually make things worse.

Your system is in what we call allostatic overload. In plain language: your body has a stress-response system designed to ramp up when you need it and ramp down when you do not. Cortisol rises in the morning to get you going, drops in the evening to let you sleep, and cycles in a clean rhythm across the day. Yours does not do that anymore. After running at high output for too long (months, probably years) the system has lost its rhythm. Think of it like a rechargeable battery that has been drained and recharged so many times without ever getting a full charge that it no longer holds capacity. The battery is not broken. It is depleted at a level that a single good night of sleep cannot fix. {{complaint_acknowledgment}}

This is like a smoke detector {{severity_analogy}}

{{pillar_bridge}} {{modifier_insert}}

The hallmark of this pattern is that sleep stops being restorative. You can sleep seven or eight hours and wake up feeling like you got three. That is not in your head. When cortisol rhythms flatten, when your morning cortisol is too low and your evening cortisol is too high, sleep architecture degrades. You spend less time in the deep, restorative stages. Your growth hormone release is blunted. Your immune repair cycles are shortened. You are getting quantity but not quality, and your body knows the difference even when the clock says you slept enough.

The other signature of this pattern: nothing seems to work anymore. Melatonin helped for a week, then stopped. The sleep hygiene changes made no difference. Exercise does not tire you out the way it used to, or worse, it wires you up. You have probably tried five or ten things that work for other people and concluded that you are somehow uniquely broken. You are not broken. You are depleted. Depleted systems do not respond to optimization. They respond to restoration.`,

		secondary: `There is also a depletion layer here. Your system has been running under sustained load for long enough that its recovery capacity is diminished. Sleep that should be restorative is not fully restoring you, because the stress-response system has lost its normal rhythm. Even as other patterns improve, you may still feel unrested until the deeper energy reserves start to rebuild.`
	},

	feedingTheLoop: {
		primary: `The things keeping this depletion cycle locked in place are tricky, because most of them look like solutions from the outside.

Pushing through is the big one. Your system is sending you signals to rest: the afternoon crashes, the brain fog, the heavy limbs. And you are overriding them with caffeine, willpower, or sheer obligation. Every time you override a rest signal, your body dips further into its reserves. It is like overdrafting a bank account. The bank lets you do it, but the fees compound. You are paying compound interest on energy debt.

Exercise is another one that cuts both ways. For a healthy system, exercise is a net positive for sleep. For a depleted system, intense exercise is another stressor, another withdrawal from an already empty account. If you are doing high-intensity workouts and feeling worse afterward instead of better, that is your body telling you the dose is too high for your current capacity. Exercise is not bad. Your system just cannot afford the recovery cost right now.

Stimulants (caffeine, energy drinks, pre-workout) are keeping the illusion going. They mask the signals that would otherwise force you to rest. They also raise your baseline cortisol, which further flattens the rhythm you need for restorative sleep. You are borrowing alertness from tomorrow to function today.

{{habit_details}}

The deepest part of this loop is psychological. You have likely built your identity, your work, and your relationships around being the person who powers through. The idea of deliberately doing less, of resting before you have earned it, of scaling back when things need doing: that feels like failure. And that belief is the engine that keeps the depletion running.`,

		secondary: `The exhaustion is compounding everything else. When your system is running on empty, every other sleep disruptor hits harder, every recovery takes longer, and the interventions that should help barely register. It is like trying to fill a bathtub with a thimble while the drain is open.`
	},

	suggestions: {
		framing: `I need you to hear this clearly: your body does not need more optimization right now. It needs less demand. The instinct that got you here, the drive to push harder and do more and find the right hack, is the very thing keeping you stuck. The prescription for this pattern is counterintuitive and uncomfortable: strategic, deliberate rest. Not as a reward for productivity. As a medical intervention.`
	},

	honestVersion: {
		primary: `Here is the honest truth about where you are. Allostatic overload did not happen in a month, and it will not resolve in a month. This is a recovery measured in months, not weeks. I know that is not what you want to hear. I know you want the thing that fixes this quickly, because you have things to do and people depending on you and a life that does not have room for a slow rebuild. But the slow rebuild is the only thing that works. There is no supplement, no sleep hack, no protocol that shortcuts this.

{{honest_chronicity}} The first thing that will change is not your sleep. It is your energy during the day. You will notice the afternoon crashes become less severe. You can think a little more clearly by mid-morning. The heavy feeling lifts a little sooner after waking. That is the cortisol rhythm starting to re-establish itself. Sleep quality follows, usually by 2-4 weeks. Deep sleep increases first, then sleep continuity improves, then morning restedness returns. It is a cascade, and it starts slow.

The hardest part of this protocol is the doing-less part. You will feel like you should be doing more. You will feel guilty about the rest days. You will look at the gentle recommendations below and think "this cannot possibly be enough to fix something this broken." It is enough. Your body knows how to heal when you stop asking it to perform while it is healing.

Give this eight weeks before you judge it. Not two, not four. Eight. And in those eight weeks, the metric is not sleep scores or hours. The metric is: do I feel slightly more human than I did last month? That is the signal. Everything else follows from there.`,

		secondary: `The depletion piece is the slowest to resolve, because you are not fixing a single broken mechanism. You are rebuilding systemic capacity that was drained over a long period. But each week of genuine recovery compounds. The body wants to heal. It just needs you to stop withdrawing from an empty account long enough for the balance to start climbing.`
	}
};
