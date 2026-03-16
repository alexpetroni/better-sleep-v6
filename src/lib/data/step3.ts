import type { StepConfig, QuestionOption } from 'formcomp';

const NOT_SURE: QuestionOption = { value: 'unsure', label: 'common.not_sure' };

export const step3: StepConfig = {
	id: 'step-3',
	label: 'assessment.steps.3',
	groups: [
		{
			id: 'age_range',
			label: 'assessment.step3.physical_profile.age_range',
			questions: [
				{
					id: 'age_range',
					type: 'single-select',
					label: 'assessment.step3.physical_profile.age_range',
					required: true,
					options: [
						{ value: '18_25', label: 'assessment.step3.physical_profile.age_range.18_25' },
						{ value: '26_35', label: 'assessment.step3.physical_profile.age_range.26_35' },
						{ value: '36_45', label: 'assessment.step3.physical_profile.age_range.36_45' },
						{ value: '46_55', label: 'assessment.step3.physical_profile.age_range.46_55' },
						{ value: '56_65', label: 'assessment.step3.physical_profile.age_range.56_65' },
						{ value: 'over_65', label: 'assessment.step3.physical_profile.age_range.over_65' }
					]
				}
			]
		},
		{
			id: 'biological_sex',
			label: 'assessment.step3.physical_profile.biological_sex',
			questions: [
				{
					id: 'biological_sex',
					type: 'single-select',
					label: 'assessment.step3.physical_profile.biological_sex',
					required: true,
					options: [
						{ value: 'male', label: 'assessment.step3.physical_profile.biological_sex.male' },
						{ value: 'female', label: 'assessment.step3.physical_profile.biological_sex.female' },
						{ value: 'intersex', label: 'assessment.step3.physical_profile.biological_sex.intersex' },
						{ value: 'prefer_not_say', label: 'assessment.step3.physical_profile.biological_sex.prefer_not_say' }
					]
				}
			]
		},
		{
			id: 'body_measurements',
			label: 'assessment.step3.physical_profile.body_measurements',
			renderMode: 'inline',
			layout: { columns: 2 },
			questions: [
				{
					id: 'height',
					type: 'number-input',
					label: 'assessment.step3.physical_profile.height',
					min: 100,
					max: 250,
					step: 1,
					placeholder: 'cm'
				},
				{
					id: 'weight',
					type: 'number-input',
					label: 'assessment.step3.physical_profile.weight',
					min: 30,
					max: 300,
					step: 1,
					placeholder: 'kg'
				}
			]
		},
		{
			id: 'neck_size',
			label: 'assessment.step3.physical_profile.neck_size',
			questions: [
				{
					id: 'neck_size',
					type: 'single-select',
					label: 'assessment.step3.physical_profile.neck_size',
					required: true,
					options: [
						{ value: 'small', label: 'assessment.step3.physical_profile.neck_size.small' },
						{ value: 'medium', label: 'assessment.step3.physical_profile.neck_size.medium' },
						{ value: 'large', label: 'assessment.step3.physical_profile.neck_size.large' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'weight_distribution',
			label: 'assessment.step3.physical_profile.weight_distribution',
			questions: [
				{
					id: 'weight_distribution',
					type: 'single-select',
					label: 'assessment.step3.physical_profile.weight_distribution',
					required: true,
					options: [
						{ value: 'neck_midsection', label: 'assessment.step3.physical_profile.weight_distribution.neck_midsection' },
						{ value: 'evenly', label: 'assessment.step3.physical_profile.weight_distribution.evenly' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'snoring',
			label: 'assessment.step3.breathing.snoring',
			questions: [
				{
					id: 'snoring',
					type: 'single-select',
					label: 'assessment.step3.breathing.snoring',
					required: true,
					options: [
						{ value: 'no', label: 'assessment.step3.breathing.snoring.no' },
						{ value: 'light', label: 'assessment.step3.breathing.snoring.light' },
						{ value: 'loud', label: 'assessment.step3.breathing.snoring.loud' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'witnessed_apnea',
			label: 'assessment.step3.breathing.witnessed_apnea',
			questions: [
				{
					id: 'witnessed_apnea',
					type: 'single-select',
					label: 'assessment.step3.breathing.witnessed_apnea',
					required: true,
					options: [
						{ value: 'yes', label: 'assessment.step3.breathing.witnessed_apnea.yes' },
						{ value: 'no', label: 'assessment.step3.breathing.witnessed_apnea.no' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'choking',
			label: 'assessment.step3.breathing.choking',
			questions: [
				{
					id: 'choking',
					type: 'single-select',
					label: 'assessment.step3.breathing.choking',
					required: true,
					options: [
						{ value: 'yes', label: 'assessment.step3.breathing.choking.yes' },
						{ value: 'sometimes', label: 'assessment.step3.breathing.choking.sometimes' },
						{ value: 'no', label: 'assessment.step3.breathing.choking.no' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'morning_symptoms',
			label: 'assessment.step3.breathing.morning_symptoms',
			questions: [
				{
					id: 'morning_symptoms',
					type: 'multi-select',
					label: 'assessment.step3.breathing.morning_symptoms',
					required: true,
					options: [
						{ value: 'dry_mouth', label: 'assessment.step3.breathing.morning_symptoms.dry_mouth' },
						{ value: 'sore_throat', label: 'assessment.step3.breathing.morning_symptoms.sore_throat' },
						{ value: 'headache', label: 'assessment.step3.breathing.morning_symptoms.headache' },
						{ value: 'none', label: 'assessment.step3.breathing.morning_symptoms.none', exclusive: true },
						{ value: 'unsure', label: 'common.not_sure', exclusive: true }
					]
				}
			]
		},
		{
			id: 'mouth_breathing',
			label: 'assessment.step3.breathing.mouth_breathing',
			questions: [
				{
					id: 'mouth_breathing',
					type: 'single-select',
					label: 'assessment.step3.breathing.mouth_breathing',
					required: true,
					options: [
						{ value: 'yes', label: 'assessment.step3.breathing.mouth_breathing.yes' },
						{ value: 'sometimes', label: 'assessment.step3.breathing.mouth_breathing.sometimes' },
						{ value: 'no', label: 'assessment.step3.breathing.mouth_breathing.no' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'teeth_grinding',
			label: 'assessment.step3.breathing.teeth_grinding',
			questions: [
				{
					id: 'teeth_grinding',
					type: 'single-select',
					label: 'assessment.step3.breathing.teeth_grinding',
					required: true,
					options: [
						{ value: 'yes', label: 'assessment.step3.breathing.teeth_grinding.yes' },
						{ value: 'suspected', label: 'assessment.step3.breathing.teeth_grinding.suspected' },
						{ value: 'no', label: 'assessment.step3.breathing.teeth_grinding.no' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'restless_legs',
			label: 'assessment.step3.movement.restless_legs',
			questions: [
				{
					id: 'restless_legs',
					type: 'single-select',
					label: 'assessment.step3.movement.restless_legs',
					required: true,
					options: [
						{ value: 'yes', label: 'assessment.step3.movement.restless_legs.yes' },
						{ value: 'sometimes', label: 'assessment.step3.movement.restless_legs.sometimes' },
						{ value: 'no', label: 'assessment.step3.movement.restless_legs.no' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'restless_relief',
			label: 'assessment.step3.movement.restless_relief',
			condition: { questionId: 'restless_legs', operator: 'not-equals', value: 'no' },
			questions: [
				{
					id: 'restless_relief',
					type: 'single-select',
					label: 'assessment.step3.movement.restless_relief',
					required: true,
					options: [
						{ value: 'yes', label: 'assessment.step3.movement.restless_relief.yes' },
						{ value: 'no', label: 'assessment.step3.movement.restless_relief.no' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'leg_jerking',
			label: 'assessment.step3.movement.leg_jerking',
			questions: [
				{
					id: 'leg_jerking',
					type: 'single-select',
					label: 'assessment.step3.movement.leg_jerking',
					required: true,
					options: [
						{ value: 'yes', label: 'assessment.step3.movement.leg_jerking.yes' },
						{ value: 'no', label: 'assessment.step3.movement.leg_jerking.no' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'dream_acting',
			label: 'assessment.step3.movement.dream_acting',
			questions: [
				{
					id: 'dream_acting',
					type: 'single-select',
					label: 'assessment.step3.movement.dream_acting',
					required: true,
					options: [
						{ value: 'yes', label: 'assessment.step3.movement.dream_acting.yes' },
						{ value: 'sometimes', label: 'assessment.step3.movement.dream_acting.sometimes' },
						{ value: 'no', label: 'assessment.step3.movement.dream_acting.no' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'sleepwalking',
			label: 'assessment.step3.movement.sleepwalking',
			questions: [
				{
					id: 'sleepwalking',
					type: 'single-select',
					label: 'assessment.step3.movement.sleepwalking',
					required: true,
					options: [
						{ value: 'yes', label: 'assessment.step3.movement.sleepwalking.yes' },
						{ value: 'sometimes', label: 'assessment.step3.movement.sleepwalking.sometimes' },
						{ value: 'no', label: 'assessment.step3.movement.sleepwalking.no' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'sleep_paralysis',
			label: 'assessment.step3.movement.sleep_paralysis',
			questions: [
				{
					id: 'sleep_paralysis',
					type: 'single-select',
					label: 'assessment.step3.movement.sleep_paralysis',
					required: true,
					options: [
						{ value: 'yes', label: 'assessment.step3.movement.sleep_paralysis.yes' },
						{ value: 'sometimes', label: 'assessment.step3.movement.sleep_paralysis.sometimes' },
						{ value: 'no', label: 'assessment.step3.movement.sleep_paralysis.no' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'hypnagogic',
			label: 'assessment.step3.movement.hypnagogic',
			questions: [
				{
					id: 'hypnagogic',
					type: 'single-select',
					label: 'assessment.step3.movement.hypnagogic',
					required: true,
					options: [
						{ value: 'yes', label: 'assessment.step3.movement.hypnagogic.yes' },
						{ value: 'sometimes', label: 'assessment.step3.movement.hypnagogic.sometimes' },
						{ value: 'no', label: 'assessment.step3.movement.hypnagogic.no' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'peak_alertness',
			label: 'assessment.step3.internal_clock.peak_alertness',
			questions: [
				{
					id: 'peak_alertness',
					type: 'single-select',
					label: 'assessment.step3.internal_clock.peak_alertness',
					required: true,
					options: [
						{ value: 'early_morning', label: 'assessment.step3.internal_clock.peak_alertness.early_morning' },
						{ value: 'late_morning', label: 'assessment.step3.internal_clock.peak_alertness.late_morning' },
						{ value: 'afternoon', label: 'assessment.step3.internal_clock.peak_alertness.afternoon' },
						{ value: 'evening', label: 'assessment.step3.internal_clock.peak_alertness.evening' },
						{ value: 'night', label: 'assessment.step3.internal_clock.peak_alertness.night' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'adaptability',
			label: 'assessment.step3.internal_clock.adaptability',
			questions: [
				{
					id: 'adaptability',
					type: 'single-select',
					label: 'assessment.step3.internal_clock.adaptability',
					required: true,
					options: [
						{ value: 'easy', label: 'assessment.step3.internal_clock.adaptability.easy' },
						{ value: 'moderate', label: 'assessment.step3.internal_clock.adaptability.moderate' },
						{ value: 'difficult', label: 'assessment.step3.internal_clock.adaptability.difficult' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'vacation_sleep',
			label: 'assessment.step3.internal_clock.vacation_sleep',
			questions: [
				{
					id: 'vacation_sleep',
					type: 'single-select',
					label: 'assessment.step3.internal_clock.vacation_sleep',
					required: true,
					options: [
						{ value: 'much_better', label: 'assessment.step3.internal_clock.vacation_sleep.much_better' },
						{ value: 'somewhat_better', label: 'assessment.step3.internal_clock.vacation_sleep.somewhat_better' },
						{ value: 'same', label: 'assessment.step3.internal_clock.vacation_sleep.same' },
						{ value: 'worse', label: 'assessment.step3.internal_clock.vacation_sleep.worse' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'schedule_gap',
			label: 'assessment.step3.internal_clock.schedule_gap',
			questions: [
				{
					id: 'schedule_gap',
					type: 'single-select',
					label: 'assessment.step3.internal_clock.schedule_gap',
					required: true,
					options: [
						{ value: 'no_gap', label: 'assessment.step3.internal_clock.schedule_gap.no_gap' },
						{ value: 'small', label: 'assessment.step3.internal_clock.schedule_gap.small' },
						{ value: 'large', label: 'assessment.step3.internal_clock.schedule_gap.large' },
						{ value: 'huge', label: 'assessment.step3.internal_clock.schedule_gap.huge' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'cortisol_surge',
			label: 'assessment.step3.hormonal.cortisol_surge',
			questions: [
				{
					id: 'cortisol_surge',
					type: 'single-select',
					label: 'assessment.step3.hormonal.cortisol_surge',
					required: true,
					options: [
						{ value: 'yes', label: 'assessment.step3.hormonal.cortisol_surge.yes' },
						{ value: 'sometimes', label: 'assessment.step3.hormonal.cortisol_surge.sometimes' },
						{ value: 'no', label: 'assessment.step3.hormonal.cortisol_surge.no' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'early_waking_pattern',
			label: 'assessment.step3.hormonal.early_waking_pattern',
			questions: [
				{
					id: 'early_waking_pattern',
					type: 'single-select',
					label: 'assessment.step3.hormonal.early_waking_pattern',
					required: true,
					options: [
						{ value: 'yes_alert', label: 'assessment.step3.hormonal.early_waking_pattern.yes_alert' },
						{ value: 'yes_groggy', label: 'assessment.step3.hormonal.early_waking_pattern.yes_groggy' },
						{ value: 'no', label: 'assessment.step3.hormonal.early_waking_pattern.no' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'post_meal_drowsy',
			label: 'assessment.step3.hormonal.post_meal_drowsy',
			questions: [
				{
					id: 'post_meal_drowsy',
					type: 'single-select',
					label: 'assessment.step3.hormonal.post_meal_drowsy',
					required: true,
					options: [
						{ value: 'yes', label: 'assessment.step3.hormonal.post_meal_drowsy.yes' },
						{ value: 'sometimes', label: 'assessment.step3.hormonal.post_meal_drowsy.sometimes' },
						{ value: 'no', label: 'assessment.step3.hormonal.post_meal_drowsy.no' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'afternoon_crash',
			label: 'assessment.step3.hormonal.afternoon_crash',
			questions: [
				{
					id: 'afternoon_crash',
					type: 'single-select',
					label: 'assessment.step3.hormonal.afternoon_crash',
					required: true,
					options: [
						{ value: 'yes', label: 'assessment.step3.hormonal.afternoon_crash.yes' },
						{ value: 'sometimes', label: 'assessment.step3.hormonal.afternoon_crash.sometimes' },
						{ value: 'no', label: 'assessment.step3.hormonal.afternoon_crash.no' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'hormonal_women',
			label: 'assessment.step3.hormonal_women',
			condition: { questionId: 'biological_sex', operator: 'equals', value: 'female' },
			questions: [
				{
					id: 'cycle_sleep',
					type: 'single-select',
					label: 'assessment.step3.hormonal_women.cycle_sleep',
					required: true,
					options: [
						{ value: 'yes', label: 'assessment.step3.hormonal_women.cycle_sleep.yes' },
						{ value: 'somewhat', label: 'assessment.step3.hormonal_women.cycle_sleep.somewhat' },
						{ value: 'no', label: 'assessment.step3.hormonal_women.cycle_sleep.no' },
						NOT_SURE
					]
				},
				{
					id: 'perimenopause',
					type: 'single-select',
					label: 'assessment.step3.hormonal_women.perimenopause',
					required: true,
					options: [
						{ value: 'yes', label: 'assessment.step3.hormonal_women.perimenopause.yes' },
						{ value: 'possibly', label: 'assessment.step3.hormonal_women.perimenopause.possibly' },
						{ value: 'no', label: 'assessment.step3.hormonal_women.perimenopause.no' },
						NOT_SURE
					]
				},
				{
					id: 'pregnant',
					type: 'single-select',
					label: 'assessment.step3.hormonal_women.pregnant',
					required: true,
					options: [
						{ value: 'yes', label: 'assessment.step3.hormonal_women.pregnant.yes' },
						{ value: 'recent_baby', label: 'assessment.step3.hormonal_women.pregnant.recent_baby' },
						{ value: 'no', label: 'assessment.step3.hormonal_women.pregnant.no' }
					]
				}
			]
		},
		{
			id: 'hormonal_men',
			label: 'assessment.step3.hormonal_men',
			condition: { questionId: 'biological_sex', operator: 'equals', value: 'male' },
			questions: [
				{
					id: 'nocturia',
					type: 'single-select',
					label: 'assessment.step3.hormonal_men.nocturia',
					required: true,
					options: [
						{ value: 'none', label: 'assessment.step3.hormonal_men.nocturia.none' },
						{ value: 'once', label: 'assessment.step3.hormonal_men.nocturia.once' },
						{ value: 'twice', label: 'assessment.step3.hormonal_men.nocturia.twice' },
						{ value: 'three_plus', label: 'assessment.step3.hormonal_men.nocturia.three_plus' },
						NOT_SURE
					]
				},
				{
					id: 'energy_changes',
					type: 'single-select',
					label: 'assessment.step3.hormonal_men.energy_changes',
					required: true,
					options: [
						{ value: 'yes', label: 'assessment.step3.hormonal_men.energy_changes.yes' },
						{ value: 'somewhat', label: 'assessment.step3.hormonal_men.energy_changes.somewhat' },
						{ value: 'no', label: 'assessment.step3.hormonal_men.energy_changes.no' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'cold_sluggish',
			label: 'assessment.step3.thyroid_everyone.cold_sluggish',
			questions: [
				{
					id: 'cold_sluggish',
					type: 'single-select',
					label: 'assessment.step3.thyroid_everyone.cold_sluggish',
					required: true,
					options: [
						{ value: 'yes', label: 'assessment.step3.thyroid_everyone.cold_sluggish.yes' },
						{ value: 'somewhat', label: 'assessment.step3.thyroid_everyone.cold_sluggish.somewhat' },
						{ value: 'no', label: 'assessment.step3.thyroid_everyone.cold_sluggish.no' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'warm_wired',
			label: 'assessment.step3.thyroid_everyone.warm_wired',
			questions: [
				{
					id: 'warm_wired',
					type: 'single-select',
					label: 'assessment.step3.thyroid_everyone.warm_wired',
					required: true,
					options: [
						{ value: 'yes', label: 'assessment.step3.thyroid_everyone.warm_wired.yes' },
						{ value: 'somewhat', label: 'assessment.step3.thyroid_everyone.warm_wired.somewhat' },
						{ value: 'no', label: 'assessment.step3.thyroid_everyone.warm_wired.no' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'family',
			label: 'assessment.step3.family',
			questions: [
				{
					id: 'family_sleep_problems',
					type: 'single-select',
					label: 'assessment.step3.family.family_sleep_problems',
					required: true,
					options: [
						{ value: 'yes', label: 'assessment.step3.family.family_sleep_problems.yes' },
						{ value: 'possibly', label: 'assessment.step3.family.family_sleep_problems.possibly' },
						{ value: 'no', label: 'assessment.step3.family.family_sleep_problems.no' },
						NOT_SURE
					]
				}
			]
		}
	]
};
