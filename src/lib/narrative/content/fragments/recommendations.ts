/** Recommendation prose fragments, keyed by recommendation id */
export const recommendationProse: Record<string, string> = {
	// Tier 1 - Root cause
	get_sleep_study:
		'Get a sleep study done. Based on your answers, there are enough airway indicators that we need to rule out — or confirm — obstructive sleep apnea before anything else. If your airway is collapsing during sleep, no amount of behavioral change will fix the downstream effects. This is the single highest-impact step.',

	neuro_evaluation:
		'See a neurologist about the dream enactment behavior. Acting out dreams physically — punching, kicking, falling out of bed — is a specific condition called REM sleep behavior disorder, and it needs professional evaluation both for your safety and because it can be an early marker for other neurological conditions.',

	stimulus_control:
		'Break the bed-wakefulness association. This means: the bed is for sleep and intimacy only. If you are not asleep within 20 minutes, get up. Go to another room. Do something boring in dim light. Go back when you feel sleepy. Yes, this feels counterintuitive when you are exhausted. But right now your brain has learned that bed equals frustration and effort. You need to retrain that association, and the only way is to stop reinforcing the old one.',

	circadian_realignment:
		'Lock in a consistent wake time — the same time every day, weekends included, within a 30-minute window. This is the single most powerful circadian intervention. Your morning cortisol spike needs a predictable anchor. Within 20 minutes of waking, get outside. Direct daylight on your face for 10-15 minutes. Even overcast is fine — outdoor light is orders of magnitude brighter than indoor light. This resets your master clock more powerfully than any supplement.',

	nervous_system_regulation:
		'Start a daily nervous system regulation practice. This is not meditation in the traditional sense — it is about giving your autonomic nervous system explicit "safety signals." The simplest version: 5 minutes of physiological sighing (double inhale through the nose, long exhale through the mouth). Do this 2-3 times a day, including once in the hour before bed. You are teaching your brainstem that the threat is over.',

	cognitive_wind_down:
		'Create a structured worry-dump practice. Thirty minutes before your wind-down begins, sit down with paper and write out everything that is on your mind — tasks, worries, unfinished thoughts. Give each one a next step or a "not now" label. The goal is to externalize the mental load so your brain stops trying to hold it all in working memory when you lie down.',

	// Tier 2 - Remove amplifiers
	environment_light:
		'Fix the light situation in your bedroom. You need it dark — genuinely dark, not "pretty dark." Blackout curtains or a sleep mask. Cover any standby LEDs with tape. Your brain detects light through closed eyelids and uses it to calibrate sleep depth.',

	environment_sound:
		'Address the noise. A consistent sound source — a fan or white noise machine — is more effective than earplugs because it masks variable sounds rather than blocking them. The problem is not volume, it is variability. Your brain is wired to alert on changes in the sound environment.',

	environment_temp:
		'Get the temperature right. Aim for 65-68°F (18-20°C). Your core body temperature needs to drop to initiate sleep. If the room is too warm, your body cannot complete that thermal cascade. A cooler room with enough blankets to feel comfortable is the target.',

	caffeine_cutoff:
		'Move your caffeine cutoff to before noon. No exceptions. Caffeine has a half-life of 5-6 hours, which means a 2pm coffee is still at 25% strength at midnight. You do not need to quit caffeine — just protect the second half of your day.',

	alcohol_review:
		'If you are drinking in the evening, stop for two weeks and observe what happens to your sleep. Not permanently — just as a diagnostic. Alcohol sedates you into sleep but destroys the second half of your night. Most people who try this are surprised by how different their 3am-6am sleep becomes.',

	gerd_management:
		'Address the reflux before bed. Elevate the head of your bed slightly (a wedge pillow works), stop eating 3 hours before bed, and avoid trigger foods in the evening. When stomach acid rises while you are lying flat, it triggers micro-arousals even if you do not fully wake up.',

	mental_health_support:
		'Consider connecting with a therapist, specifically one trained in CBT-I (cognitive behavioral therapy for insomnia) or, if the mood and anxiety scores stay elevated, someone who can address both. This is not a weakness recommendation — it is a recognition that the emotional dimension is a primary driver here, and specialized support will accelerate everything else.',

	// Tier 3 - Optimize
	morning_light:
		'Get morning sunlight exposure within 30 minutes of waking. Ten to fifteen minutes of direct outdoor light. This is the strongest circadian signal your body can receive, and it sets the cascade for melatonin release 14-16 hours later.',

	consistent_schedule:
		'Tighten your sleep schedule. Same bedtime and wake time, 7 days a week, within a 30-minute window. Your body runs on prediction. Every time the schedule shifts, your internal clock needs 1-2 days to recalibrate.',

	wind_down_routine:
		'Build a 45-minute wind-down runway before sleep. Screens off, lights dimmed, and a repeatable sequence of calm activities — it does not matter much what they are, as long as they are boring and consistent. Your nervous system learns through repetition that this sequence means "start shutting down."',

	magnesium:
		'Add magnesium glycinate before bed, around 200-400mg. Most people are deficient, and this specific form helps with both muscle relaxation and calming the nervous system. It is gentle — nothing dramatic — but it supports the process.',

	ashwagandha:
		'Consider an adaptogen like ashwagandha (specifically the KSM-66 extract, 300mg twice daily). There is decent evidence it helps modulate the cortisol response over time. Not a magic pill, but a useful tool once the lifestyle pieces are in place.',

	stress_discharge:
		'Add a deliberate stress-discharge practice. Could be breathwork, could be a hard workout, could be 10 minutes of something meditative. The point is giving your nervous system a clear signal that the threat is over and it can stand down. Chronic stress keeps the system in "maybe there is a tiger" mode. You need to complete the stress cycle, not just manage it.'
};
