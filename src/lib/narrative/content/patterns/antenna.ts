import type { PatternContent } from '../../types';

export const antenna: PatternContent = {
	whereYouAre: {
		primary: `Alright, let me explain what is happening, because this one is easy to misunderstand. People have probably been telling you the wrong things about it for years.

Your sensory threshold during sleep is set lower than average. Way lower. Think of the brain's filtering system like a bouncer at a nightclub. For most sleepers, that bouncer is strict: only loud, urgent signals get through to wake the conscious brain. Your bouncer lets everyone in. A car door closing outside, the refrigerator cycling on, your partner shifting position, a sliver of light from the hallway. Signals that other people's brains dismiss as irrelevant become full wake-up events for yours. {{complaint_acknowledgment}}

This is like a smoke detector {{severity_analogy}}

{{pillar_bridge}} {{modifier_insert}}

This is not about being a "light sleeper" in some vague personality-trait sense. There is actual neuroscience here. Your thalamus, the relay station that gates sensory information during sleep, is not fully closing the gate. During deeper sleep stages, most people's thalamic gating blocks external stimuli almost entirely. Yours stays partially open. So you cycle up to lighter sleep stages more often, and when you are in light sleep, smaller stimuli pull you all the way to wakefulness. The result is fragmented sleep architecture. You are getting sleep, but it is broken into too many short segments to be truly restorative. Your total sleep time might look reasonable on paper. The quality is shredded.

The frustrating part is that you know exactly what is waking you up, and it feels fixable from the outside. Just make it quieter, darker, colder. But the threshold keeps shifting. You fix the noise and then the light bothers you. You fix the light and then the temperature is wrong. The sensitivity is in your nervous system, not just in your environment.`,

		secondary: `There is also a sensory sensitivity piece at play. Your brain's filtering system during sleep is letting through stimuli that most sleepers never consciously register. Light, noise, temperature shifts, movement: things that should be screened out by the thalamus are reaching your conscious brain and fragmenting your sleep into shorter, less restorative segments. So even when other factors improve, environmental disruptions may continue to limit your sleep quality until you address the gating issue directly.`
	},

	feedingTheLoop: {
		primary: `Several things are keeping this sensitivity loop locked in, and some of them are surprisingly counterintuitive.

First, sensory load is cumulative across the day. Your filtering system is not just working at night. It is working all day long, processing more stimuli at higher resolution than most people's systems do. By evening, your sensory filter is fatigued. Think of it like a muscle that has been lifting all day. By the time you need it most, at sleep onset and during light sleep stages, it has the least capacity to do its job. A sound that might not have woken you at midnight wakes you easily at 4 AM, because the filter has been grinding for hours.

Second, hypervigilance about the sleep environment creates its own arousal. If you have been waking to noise for months, your brain starts listening for noise before you even fall asleep. You are scanning. That scanning is a form of attentional activation that keeps you in lighter sleep stages, which (ironically) makes you more vulnerable to the very stimuli you are bracing for. The anticipation of disruption becomes a disruption in itself.

{{habit_details}}

And because your sensory gate is already thin, every other sleep disruptor hits you harder. Caffeine that would cause a minor sleep-quality dip for someone else causes a major one for you, because it further raises arousal and thins the gate. Alcohol fragments sleep for everyone, but for you the fragmentation is amplified. These factors are not just additive. They are multiplicative when layered on top of low sensory thresholds.`,

		secondary: `The sensory sensitivity is amplifying everything else in your sleep profile. Disruptions that would be minor inconveniences for someone with robust thalamic gating become full-blown wake events for you. The other patterns in play are hitting harder than they would otherwise, because your arousal threshold is already so close to the surface.`
	},

	suggestions: {
		framing: `For your pattern, the environment is not a nice-to-have. It is the foundation. I know that sounds obvious, but hear me out. Most people can get away with a mediocre sleep environment because their brain compensates with strong sensory gating. Yours does not. So we need to engineer the environment to do what your thalamus is not doing on its own. That comes first. Everything else we layer on top is optimization, but without the environmental foundation, the optimization has nothing to land on.`
	},

	honestVersion: {
		primary: `Here is what I want you to hear clearly: this sensitivity is trait-based. It is how your nervous system is wired. We are not going to cure it, and anyone who promises to is selling you something. What we are going to do is build a system around it that lets you sleep well consistently despite the low threshold.

{{honest_chronicity}} The good news is that sensory sensitivity responds faster to environmental intervention than almost any other sleep pattern. When people with your profile get the environment right, truly right and not halfway, the improvement can be dramatic and almost immediate. We are talking days, not weeks. The challenge is that "truly right" requires more precision than most people expect. And it requires redundancy. Earplugs and a white noise machine. Blackout curtains and a sleep mask. Temperature control and appropriate bedding. Layered defenses, because on any given night one layer might fail.

I should be honest about something else. If your sleep environment includes a partner, a pet, or circumstances you cannot fully control, we need to have a realistic conversation about what is achievable versus what is ideal. Perfection is not the goal. Getting your sensory exposure below the wake threshold on most nights is the goal. That might mean some negotiations and some compromises that feel awkward to ask for. Ask for them anyway. Your sleep architecture depends on it.

Start with the environment engineering. Give it one full week of the layered approach. Then come back and tell me how the fragmentation has shifted. I expect you will notice fewer wake-ups within the first few nights.`,

		secondary: `The sensory sensitivity piece is one of the most mechanically straightforward patterns to address, but it requires more environmental precision than most people initially commit to. Half-measures will not clear the threshold. Go all in on the environment controls for one week, and you will likely see measurable improvement faster than with any other intervention.`
	}
};
