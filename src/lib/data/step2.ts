import type { StepConfig, QuestionOption } from 'formcomp';

const NOT_SURE: QuestionOption = { value: 'unsure', label: 'common.not_sure' };

export const step2: StepConfig = {
	id: 'step-2',
	label: 'assessment.steps.2',
	groups: [
		{
			id: 'bedroom_darkness',
			label: 'assessment.step2.bedroom_darkness',
			questions: [
				{
					id: 'bedroom_darkness',
					type: 'single-select',
					label: 'assessment.step2.bedroom_darkness.question',
					required: true,
					options: [
						{ value: 'complete_darkness', label: 'assessment.step2.bedroom_darkness.complete_darkness' },
						{ value: 'outlines_shapes', label: 'assessment.step2.bedroom_darkness.outlines_shapes' },
						{ value: 'noticeable_light', label: 'assessment.step2.bedroom_darkness.noticeable_light' },
						{ value: 'fairly_lit', label: 'assessment.step2.bedroom_darkness.fairly_lit' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'bedroom_sound',
			label: 'assessment.step2.bedroom_sound',
			questions: [
				{
					id: 'bedroom_sound',
					type: 'single-select',
					label: 'assessment.step2.bedroom_sound.question',
					required: true,
					options: [
						{ value: 'silent', label: 'assessment.step2.bedroom_sound.silent' },
						{ value: 'occasional', label: 'assessment.step2.bedroom_sound.occasional' },
						{ value: 'regular_noise', label: 'assessment.step2.bedroom_sound.regular_noise' },
						{ value: 'partner_snores', label: 'assessment.step2.bedroom_sound.partner_snores' },
						{ value: 'unpredictable', label: 'assessment.step2.bedroom_sound.unpredictable' },
						{ value: 'sound_machine', label: 'assessment.step2.bedroom_sound.sound_machine' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'bedroom_temp',
			label: 'assessment.step2.bedroom_temp',
			questions: [
				{
					id: 'bedroom_temp',
					type: 'single-select',
					label: 'assessment.step2.bedroom_temp.question',
					required: true,
					options: [
						{ value: 'comfortable', label: 'assessment.step2.bedroom_temp.comfortable' },
						{ value: 'too_warm', label: 'assessment.step2.bedroom_temp.too_warm' },
						{ value: 'too_cold', label: 'assessment.step2.bedroom_temp.too_cold' },
						{ value: 'changes', label: 'assessment.step2.bedroom_temp.changes' },
						{ value: 'cant_control', label: 'assessment.step2.bedroom_temp.cant_control' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'bedroom_comfort',
			label: 'assessment.step2.bedroom_comfort',
			questions: [
				{
					id: 'bedroom_comfort',
					type: 'single-select',
					label: 'assessment.step2.bedroom_comfort.question',
					required: true,
					options: [
						{ value: 'comfortable', label: 'assessment.step2.bedroom_comfort.comfortable' },
						{ value: 'acceptable', label: 'assessment.step2.bedroom_comfort.acceptable' },
						{ value: 'stiff_sore', label: 'assessment.step2.bedroom_comfort.stiff_sore' },
						{ value: 'uncomfortable', label: 'assessment.step2.bedroom_comfort.uncomfortable' },
						{ value: 'old_mattress', label: 'assessment.step2.bedroom_comfort.old_mattress' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'bedroom_air',
			label: 'assessment.step2.bedroom_air',
			questions: [
				{
					id: 'bedroom_air',
					type: 'single-select',
					label: 'assessment.step2.bedroom_air.question',
					required: true,
					options: [
						{ value: 'fresh', label: 'assessment.step2.bedroom_air.fresh' },
						{ value: 'stuffy', label: 'assessment.step2.bedroom_air.stuffy' },
						{ value: 'congested', label: 'assessment.step2.bedroom_air.congested' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'bed_sharing',
			label: 'assessment.step2.bed_sharing',
			questions: [
				{
					id: 'bed_sharing',
					type: 'single-select',
					label: 'assessment.step2.bed_sharing.question',
					required: true,
					options: [
						{ value: 'alone', label: 'assessment.step2.bed_sharing.alone' },
						{ value: 'partner_no_issue', label: 'assessment.step2.bed_sharing.partner_no_issue' },
						{ value: 'partner_disrupts', label: 'assessment.step2.bed_sharing.partner_disrupts' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'pets',
			label: 'assessment.step2.pets',
			questions: [
				{
					id: 'pets',
					type: 'single-select',
					label: 'assessment.step2.pets.question',
					required: true,
					options: [
						{ value: 'no_pets', label: 'assessment.step2.pets.no_pets' },
						{ value: 'pets_no_issue', label: 'assessment.step2.pets.pets_no_issue' },
						{ value: 'pets_wake_me', label: 'assessment.step2.pets.pets_wake_me' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'evening_activities',
			label: 'assessment.step2.evening_activities',
			questions: [
				{
					id: 'evening_activities',
					type: 'multi-select',
					label: 'assessment.step2.evening_activities.question',
					required: true,
					options: [
						{ value: 'tv', label: 'assessment.step2.evening_activities.tv' },
						{ value: 'phone', label: 'assessment.step2.evening_activities.phone' },
						{ value: 'computer', label: 'assessment.step2.evening_activities.computer' },
						{ value: 'book_physical', label: 'assessment.step2.evening_activities.book_physical' },
						{ value: 'book_device', label: 'assessment.step2.evening_activities.book_device' },
						{ value: 'talking', label: 'assessment.step2.evening_activities.talking' },
						{ value: 'physical', label: 'assessment.step2.evening_activities.physical' },
						{ value: 'combination', label: 'assessment.step2.evening_activities.combination' }
					]
				}
			]
		},
		{
			id: 'evening_content',
			label: 'assessment.step2.evening_content',
			questions: [
				{
					id: 'evening_content',
					type: 'single-select',
					label: 'assessment.step2.evening_content.question',
					required: true,
					options: [
						{ value: 'relaxing', label: 'assessment.step2.evening_content.relaxing' },
						{ value: 'engaging', label: 'assessment.step2.evening_content.engaging' },
						{ value: 'news', label: 'assessment.step2.evening_content.news' },
						{ value: 'social_media', label: 'assessment.step2.evening_content.social_media' },
						{ value: 'work', label: 'assessment.step2.evening_content.work' },
						{ value: 'stressful', label: 'assessment.step2.evening_content.stressful' },
						{ value: 'no_screens', label: 'assessment.step2.evening_content.no_screens' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'evening_lighting',
			label: 'assessment.step2.evening_lighting',
			questions: [
				{
					id: 'evening_lighting',
					type: 'single-select',
					label: 'assessment.step2.evening_lighting.question',
					required: true,
					options: [
						{ value: 'bright_overhead', label: 'assessment.step2.evening_lighting.bright_overhead' },
						{ value: 'dimmed', label: 'assessment.step2.evening_lighting.dimmed' },
						{ value: 'dark_screens_only', label: 'assessment.step2.evening_lighting.dark_screens_only' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'bed_activities',
			label: 'assessment.step2.bed_activities',
			questions: [
				{
					id: 'bed_activities',
					type: 'single-select',
					label: 'assessment.step2.bed_activities.question',
					required: true,
					options: [
						{ value: 'sleep_only', label: 'assessment.step2.bed_activities.sleep_only' },
						{ value: 'work_in_bed', label: 'assessment.step2.bed_activities.work_in_bed' },
						{ value: 'eat_in_bed', label: 'assessment.step2.bed_activities.eat_in_bed' },
						{ value: 'watch_in_bed', label: 'assessment.step2.bed_activities.watch_in_bed' },
						{ value: 'multiple', label: 'assessment.step2.bed_activities.multiple' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'environment_noise',
			label: 'assessment.step2.environment_noise',
			questions: [
				{
					id: 'environment_noise',
					type: 'single-select',
					label: 'assessment.step2.environment_noise.question',
					required: true,
					options: [
						{ value: 'quiet', label: 'assessment.step2.environment_noise.quiet' },
						{ value: 'moderate', label: 'assessment.step2.environment_noise.moderate' },
						{ value: 'noisy', label: 'assessment.step2.environment_noise.noisy' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'shift_work',
			label: 'assessment.step2.shift_work',
			questions: [
				{
					id: 'shift_work',
					type: 'single-select',
					label: 'assessment.step2.shift_work.question',
					required: true,
					options: [
						{ value: 'no', label: 'assessment.step2.shift_work.no' },
						{ value: 'yes_rotating', label: 'assessment.step2.shift_work.yes_rotating' },
						{ value: 'yes_nights', label: 'assessment.step2.shift_work.yes_nights' },
						{ value: 'yes_early', label: 'assessment.step2.shift_work.yes_early' },
						NOT_SURE
					]
				}
			]
		}
	]
};
