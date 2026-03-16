import type { StepConfig, QuestionOption } from 'formcomp';

const NOT_SURE: QuestionOption = { value: 'unsure', label: 'common.not_sure' };

const TRIED_OPTIONS: QuestionOption[] = [
	{ value: 'helped', label: 'assessment.step4.previous_attempts.helped' },
	{ value: 'didnt_help', label: 'assessment.step4.previous_attempts.didnt_help' },
	{ value: 'helped_then_stopped', label: 'assessment.step4.previous_attempts.helped_then_stopped' },
	{ value: 'never_tried', label: 'assessment.step4.previous_attempts.never_tried' }
];

export const step4: StepConfig = {
	id: 'step-4',
	label: 'assessment.steps.4',
	groups: [
		{
			id: 'medications',
			label: 'assessment.step4.medications',
			questions: [
				{
					id: 'medication_text',
					type: 'textarea',
					label: 'assessment.step4.medication_text',
					placeholder: 'assessment.step4.medication_text.placeholder'
				},
				{
					id: 'medication_categories',
					type: 'multi-select',
					label: 'assessment.step4.medication_categories',
					options: [
						{ value: 'depression_anxiety', label: 'assessment.step4.medication_categories.depression_anxiety' },
						{ value: 'sleep_aids', label: 'assessment.step4.medication_categories.sleep_aids' },
						{ value: 'blood_pressure', label: 'assessment.step4.medication_categories.blood_pressure' },
						{ value: 'steroids', label: 'assessment.step4.medication_categories.steroids' },
						{ value: 'adhd', label: 'assessment.step4.medication_categories.adhd' },
						{ value: 'thyroid', label: 'assessment.step4.medication_categories.thyroid' },
						{ value: 'pain', label: 'assessment.step4.medication_categories.pain' },
						{ value: 'allergy', label: 'assessment.step4.medication_categories.allergy' },
						{ value: 'reflux', label: 'assessment.step4.medication_categories.reflux' },
						{ value: 'cholesterol', label: 'assessment.step4.medication_categories.cholesterol' },
						{ value: 'hormonal', label: 'assessment.step4.medication_categories.hormonal' },
						{ value: 'sleep_supplements', label: 'assessment.step4.medication_categories.sleep_supplements' },
						{ value: 'none', label: 'assessment.step4.medication_categories.none', exclusive: true }
					]
				}
			]
		},
		{
			id: 'caffeine_type',
			label: 'assessment.step4.caffeine_type',
			questions: [
				{
					id: 'caffeine_type',
					type: 'multi-select',
					label: 'assessment.step4.caffeine_type',
					options: [
						{ value: 'coffee', label: 'assessment.step4.caffeine_type.coffee' },
						{ value: 'tea', label: 'assessment.step4.caffeine_type.tea' },
						{ value: 'energy_drinks', label: 'assessment.step4.caffeine_type.energy_drinks' },
						{ value: 'cola', label: 'assessment.step4.caffeine_type.cola' },
						{ value: 'none', label: 'assessment.step4.caffeine_type.none', exclusive: true }
					]
				}
			]
		},
		{
			id: 'caffeine_amount',
			label: 'assessment.step4.caffeine_amount',
			questions: [
				{
					id: 'caffeine_amount',
					type: 'single-select',
					label: 'assessment.step4.caffeine_amount',
					options: [
						{ value: 'one', label: 'assessment.step4.caffeine_amount.one' },
						{ value: 'two_three', label: 'assessment.step4.caffeine_amount.two_three' },
						{ value: 'four_plus', label: 'assessment.step4.caffeine_amount.four_plus' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'caffeine_timing',
			label: 'assessment.step4.caffeine_timing',
			questions: [
				{
					id: 'caffeine_timing',
					type: 'single-select',
					label: 'assessment.step4.caffeine_timing',
					options: [
						{ value: 'morning_only', label: 'assessment.step4.caffeine_timing.morning_only' },
						{ value: 'before_noon', label: 'assessment.step4.caffeine_timing.before_noon' },
						{ value: 'afternoon', label: 'assessment.step4.caffeine_timing.afternoon' },
						{ value: 'evening', label: 'assessment.step4.caffeine_timing.evening' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'alcohol_frequency',
			label: 'assessment.step4.alcohol_frequency',
			questions: [
				{
					id: 'alcohol_frequency',
					type: 'single-select',
					label: 'assessment.step4.alcohol_frequency',
					options: [
						{ value: 'never', label: 'assessment.step4.alcohol_frequency.never' },
						{ value: 'rarely', label: 'assessment.step4.alcohol_frequency.rarely' },
						{ value: 'weekly', label: 'assessment.step4.alcohol_frequency.weekly' },
						{ value: 'most_days', label: 'assessment.step4.alcohol_frequency.most_days' },
						{ value: 'daily', label: 'assessment.step4.alcohol_frequency.daily' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'alcohol_timing',
			label: 'assessment.step4.alcohol_timing',
			questions: [
				{
					id: 'alcohol_timing',
					type: 'single-select',
					label: 'assessment.step4.alcohol_timing',
					options: [
						{ value: 'not_applicable', label: 'assessment.step4.alcohol_timing.not_applicable' },
						{ value: 'with_dinner', label: 'assessment.step4.alcohol_timing.with_dinner' },
						{ value: 'after_dinner', label: 'assessment.step4.alcohol_timing.after_dinner' },
						{ value: 'close_to_bed', label: 'assessment.step4.alcohol_timing.close_to_bed' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'alcohol_sleep_pattern',
			label: 'assessment.step4.alcohol_sleep_pattern',
			questions: [
				{
					id: 'alcohol_sleep_pattern',
					type: 'single-select',
					label: 'assessment.step4.alcohol_sleep_pattern',
					options: [
						{ value: 'helps_fall_asleep_worse_later', label: 'assessment.step4.alcohol_sleep_pattern.helps_fall_asleep_worse_later' },
						{ value: 'no_effect', label: 'assessment.step4.alcohol_sleep_pattern.no_effect' },
						{ value: 'makes_everything_worse', label: 'assessment.step4.alcohol_sleep_pattern.makes_everything_worse' },
						{ value: 'not_applicable', label: 'assessment.step4.alcohol_sleep_pattern.not_applicable' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'nicotine_use',
			label: 'assessment.step4.nicotine_use',
			questions: [
				{
					id: 'nicotine_use',
					type: 'single-select',
					label: 'assessment.step4.nicotine_use',
					options: [
						{ value: 'never', label: 'assessment.step4.nicotine_use.never' },
						{ value: 'former', label: 'assessment.step4.nicotine_use.former' },
						{ value: 'cigarettes', label: 'assessment.step4.nicotine_use.cigarettes' },
						{ value: 'vaping', label: 'assessment.step4.nicotine_use.vaping' },
						{ value: 'other', label: 'assessment.step4.nicotine_use.other' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'nicotine_timing',
			label: 'assessment.step4.nicotine_timing',
			questions: [
				{
					id: 'nicotine_timing',
					type: 'single-select',
					label: 'assessment.step4.nicotine_timing',
					options: [
						{ value: 'not_applicable', label: 'assessment.step4.nicotine_timing.not_applicable' },
						{ value: 'morning', label: 'assessment.step4.nicotine_timing.morning' },
						{ value: 'throughout_day', label: 'assessment.step4.nicotine_timing.throughout_day' },
						{ value: 'close_to_bed', label: 'assessment.step4.nicotine_timing.close_to_bed' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'cannabis_use',
			label: 'assessment.step4.cannabis_use',
			questions: [
				{
					id: 'cannabis_use',
					type: 'single-select',
					label: 'assessment.step4.cannabis_use',
					options: [
						{ value: 'never', label: 'assessment.step4.cannabis_use.never' },
						{ value: 'rarely', label: 'assessment.step4.cannabis_use.rarely' },
						{ value: 'regularly', label: 'assessment.step4.cannabis_use.regularly' },
						{ value: 'daily', label: 'assessment.step4.cannabis_use.daily' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'cannabis_for_sleep',
			label: 'assessment.step4.cannabis_for_sleep',
			questions: [
				{
					id: 'cannabis_for_sleep',
					type: 'single-select',
					label: 'assessment.step4.cannabis_for_sleep',
					options: [
						{ value: 'yes', label: 'assessment.step4.cannabis_for_sleep.yes' },
						{ value: 'sometimes', label: 'assessment.step4.cannabis_for_sleep.sometimes' },
						{ value: 'no', label: 'assessment.step4.cannabis_for_sleep.no' },
						{ value: 'not_applicable', label: 'assessment.step4.cannabis_for_sleep.not_applicable' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'pain_at_night',
			label: 'assessment.step4.pain_at_night',
			questions: [
				{
					id: 'pain_at_night',
					type: 'single-select',
					label: 'assessment.step4.pain_at_night',
					options: [
						{ value: 'yes', label: 'assessment.step4.pain_at_night.yes' },
						{ value: 'sometimes', label: 'assessment.step4.pain_at_night.sometimes' },
						{ value: 'no', label: 'assessment.step4.pain_at_night.no' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'gerd',
			label: 'assessment.step4.gerd',
			questions: [
				{
					id: 'gerd',
					type: 'single-select',
					label: 'assessment.step4.gerd',
					options: [
						{ value: 'yes', label: 'assessment.step4.gerd.yes' },
						{ value: 'sometimes', label: 'assessment.step4.gerd.sometimes' },
						{ value: 'no', label: 'assessment.step4.gerd.no' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'breathing_difficulty',
			label: 'assessment.step4.breathing_difficulty',
			questions: [
				{
					id: 'breathing_difficulty',
					type: 'single-select',
					label: 'assessment.step4.breathing_difficulty',
					options: [
						{ value: 'yes', label: 'assessment.step4.breathing_difficulty.yes' },
						{ value: 'sometimes', label: 'assessment.step4.breathing_difficulty.sometimes' },
						{ value: 'no', label: 'assessment.step4.breathing_difficulty.no' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'headaches',
			label: 'assessment.step4.headaches',
			questions: [
				{
					id: 'headaches',
					type: 'single-select',
					label: 'assessment.step4.headaches',
					options: [
						{ value: 'morning', label: 'assessment.step4.headaches.morning' },
						{ value: 'afternoon', label: 'assessment.step4.headaches.afternoon' },
						{ value: 'evening', label: 'assessment.step4.headaches.evening' },
						{ value: 'varied', label: 'assessment.step4.headaches.varied' },
						{ value: 'rarely', label: 'assessment.step4.headaches.rarely' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'neuropathy',
			label: 'assessment.step4.neuropathy',
			questions: [
				{
					id: 'neuropathy',
					type: 'single-select',
					label: 'assessment.step4.neuropathy',
					options: [
						{ value: 'yes', label: 'assessment.step4.neuropathy.yes' },
						{ value: 'sometimes', label: 'assessment.step4.neuropathy.sometimes' },
						{ value: 'no', label: 'assessment.step4.neuropathy.no' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'fatigue_sensitivity',
			label: 'assessment.step4.fatigue_sensitivity',
			questions: [
				{
					id: 'fatigue_sensitivity',
					type: 'single-select',
					label: 'assessment.step4.fatigue_sensitivity',
					options: [
						{ value: 'yes', label: 'assessment.step4.fatigue_sensitivity.yes' },
						{ value: 'somewhat', label: 'assessment.step4.fatigue_sensitivity.somewhat' },
						{ value: 'no', label: 'assessment.step4.fatigue_sensitivity.no' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'recent_bloodwork',
			label: 'assessment.step4.recent_bloodwork',
			questions: [
				{
					id: 'recent_bloodwork',
					type: 'multi-select',
					label: 'assessment.step4.recent_bloodwork',
					options: [
						{ value: 'iron_low', label: 'assessment.step4.recent_bloodwork.iron_low' },
						{ value: 'vitamin_d_low', label: 'assessment.step4.recent_bloodwork.vitamin_d_low' },
						{ value: 'thyroid_issue', label: 'assessment.step4.recent_bloodwork.thyroid_issue' },
						{ value: 'sugar_issue', label: 'assessment.step4.recent_bloodwork.sugar_issue' },
						{ value: 'normal', label: 'assessment.step4.recent_bloodwork.normal', exclusive: true },
						{ value: 'no_recent', label: 'assessment.step4.recent_bloodwork.no_recent', exclusive: true },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'previous_attempts',
			label: 'assessment.step4.previous_attempts',
			renderMode: 'likert-batch',
			questions: [
				{ id: 'tried_melatonin', type: 'likert', label: 'assessment.step4.tried_melatonin', options: TRIED_OPTIONS },
				{ id: 'tried_prescription', type: 'likert', label: 'assessment.step4.tried_prescription', options: TRIED_OPTIONS },
				{ id: 'tried_routine', type: 'likert', label: 'assessment.step4.tried_routine', options: TRIED_OPTIONS },
				{ id: 'tried_caffeine_cut', type: 'likert', label: 'assessment.step4.tried_caffeine_cut', options: TRIED_OPTIONS },
				{ id: 'tried_exercise', type: 'likert', label: 'assessment.step4.tried_exercise', options: TRIED_OPTIONS },
				{ id: 'tried_meditation', type: 'likert', label: 'assessment.step4.tried_meditation', options: TRIED_OPTIONS },
				{ id: 'tried_therapy', type: 'likert', label: 'assessment.step4.tried_therapy', options: TRIED_OPTIONS },
				{ id: 'tried_sleep_study', type: 'likert', label: 'assessment.step4.tried_sleep_study', options: TRIED_OPTIONS },
				{ id: 'tried_cpap', type: 'likert', label: 'assessment.step4.tried_cpap', options: TRIED_OPTIONS }
			]
		},
		{
			id: 'previous_attempts_notes',
			label: 'assessment.step4.what_stopped_working',
			questions: [
				{
					id: 'what_stopped_working',
					type: 'textarea',
					label: 'assessment.step4.what_stopped_working',
					placeholder: 'assessment.step4.what_stopped_working.placeholder'
				}
			]
		}
	]
};
