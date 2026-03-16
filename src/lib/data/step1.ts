import type { StepConfig, QuestionOption } from 'formcomp';

const NOT_SURE: QuestionOption = { value: 'unsure', label: 'common.not_sure' };

const ISI_SEVERITY = [
	{ value: '0', label: 'assessment.step1.isi.none' },
	{ value: '1', label: 'assessment.step1.isi.mild' },
	{ value: '2', label: 'assessment.step1.isi.moderate' },
	{ value: '3', label: 'assessment.step1.isi.severe' },
	{ value: '4', label: 'assessment.step1.isi.very_severe' }
];

const ISI_SATISFACTION = [
	{ value: '0', label: 'assessment.step1.isi.very_satisfied' },
	{ value: '1', label: 'assessment.step1.isi.satisfied' },
	{ value: '2', label: 'assessment.step1.isi.neutral' },
	{ value: '3', label: 'assessment.step1.isi.dissatisfied' },
	{ value: '4', label: 'assessment.step1.isi.very_dissatisfied' }
];

const ISI_NOTICEABILITY = [
	{ value: '0', label: 'assessment.step1.isi.not_at_all' },
	{ value: '1', label: 'assessment.step1.isi.a_little' },
	{ value: '2', label: 'assessment.step1.isi.somewhat' },
	{ value: '3', label: 'assessment.step1.isi.much' },
	{ value: '4', label: 'assessment.step1.isi.very_much' }
];

export const step1: StepConfig = {
	id: 'step-1',
	label: 'assessment.steps.1',
	groups: [
		{
			id: 'schedule',
			label: 'assessment.step1.schedule',
			renderMode: 'inline',
			layout: { columns: 2 },
			questions: [
				{ id: 'bedtime_work', type: 'time-input', label: 'assessment.step1.bedtime_work', required: true },
				{ id: 'bedtime_free', type: 'time-input', label: 'assessment.step1.bedtime_free', required: true },
				{ id: 'waketime_work', type: 'time-input', label: 'assessment.step1.waketime_work', required: true },
				{ id: 'waketime_free', type: 'time-input', label: 'assessment.step1.waketime_free', required: true }
			]
		},
		{
			id: 'onset',
			label: 'assessment.step1.onset',
			questions: [
				{
					id: 'sleep_onset',
					type: 'single-select',
					label: 'assessment.step1.sleep_onset',
					required: true,
					options: [
						{ value: 'immediate', label: 'assessment.step1.sleep_onset.immediate' },
						{ value: '10_20', label: 'assessment.step1.sleep_onset.10_20' },
						{ value: '20_40', label: 'assessment.step1.sleep_onset.20_40' },
						{ value: '40_60', label: 'assessment.step1.sleep_onset.40_60' },
						{ value: 'over_60', label: 'assessment.step1.sleep_onset.over_60' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'wakings',
			label: 'assessment.step1.wakings',
			questions: [
				{
					id: 'night_wakings',
					type: 'single-select',
					label: 'assessment.step1.night_wakings',
					required: true,
					options: [
						{ value: '0', label: 'assessment.step1.night_wakings.0' },
						{ value: '1_2', label: 'assessment.step1.night_wakings.1_2' },
						{ value: '3_4', label: 'assessment.step1.night_wakings.3_4' },
						{ value: '5_plus', label: 'assessment.step1.night_wakings.5_plus' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'total_sleep',
			label: 'assessment.step1.total_sleep',
			questions: [
				{
					id: 'sleep_hours',
					type: 'single-select',
					label: 'assessment.step1.sleep_hours',
					required: true,
					options: [
						{ value: 'under_4', label: 'assessment.step1.sleep_hours.under_4' },
						{ value: '4_5', label: 'assessment.step1.sleep_hours.4_5' },
						{ value: '5_6', label: 'assessment.step1.sleep_hours.5_6' },
						{ value: '6_7', label: 'assessment.step1.sleep_hours.6_7' },
						{ value: '7_8', label: 'assessment.step1.sleep_hours.7_8' },
						{ value: 'over_8', label: 'assessment.step1.sleep_hours.over_8' },
						{ value: 'no_idea', label: 'assessment.step1.sleep_hours.no_idea' }
					]
				}
			]
		},
		{
			id: 'primary_complaint',
			label: 'assessment.step1.primary_complaint',
			questions: [
				{
					id: 'main_struggle',
					type: 'single-select',
					label: 'assessment.step1.main_struggle',
					required: true,
					options: [
						{ value: 'cant_fall_asleep', label: 'assessment.step1.main_struggle.cant_fall_asleep' },
						{ value: 'wake_during_night', label: 'assessment.step1.main_struggle.wake_during_night' },
						{ value: 'wake_too_early', label: 'assessment.step1.main_struggle.wake_too_early' },
						{ value: 'unrestorative', label: 'assessment.step1.main_struggle.unrestorative' },
						{ value: 'excessive_sleepiness', label: 'assessment.step1.main_struggle.excessive_sleepiness' },
						{ value: 'parasomnias', label: 'assessment.step1.main_struggle.parasomnias' },
						{ value: 'irregular_schedule', label: 'assessment.step1.main_struggle.irregular_schedule' },
						{ value: 'multiple', label: 'assessment.step1.main_struggle.multiple' }
					]
				}
			]
		},
		{
			id: 'duration',
			label: 'assessment.step1.duration',
			questions: [
				{
					id: 'duration',
					type: 'single-select',
					label: 'assessment.step1.duration',
					required: true,
					options: [
						{ value: 'weeks', label: 'assessment.step1.duration.weeks' },
						{ value: 'months', label: 'assessment.step1.duration.months' },
						{ value: '6_12_months', label: 'assessment.step1.duration.6_12_months' },
						{ value: 'over_year', label: 'assessment.step1.duration.over_year' },
						{ value: 'always', label: 'assessment.step1.duration.always' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'frequency',
			label: 'assessment.step1.frequency',
			questions: [
				{
					id: 'frequency',
					type: 'single-select',
					label: 'assessment.step1.frequency',
					required: true,
					options: [
						{ value: 'every_night', label: 'assessment.step1.frequency.every_night' },
						{ value: 'most_nights', label: 'assessment.step1.frequency.most_nights' },
						{ value: 'couple_nights', label: 'assessment.step1.frequency.couple_nights' },
						{ value: 'unpredictable', label: 'assessment.step1.frequency.unpredictable' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'isi',
			label: 'assessment.step1.isi',
			intro: 'assessment.step1.isi.intro',
			renderMode: 'likert-batch',
			questions: [
				{ id: 'isi_falling_asleep', type: 'likert', label: 'assessment.step1.isi.falling_asleep', required: true, min: 0, max: 4, options: ISI_SEVERITY },
				{ id: 'isi_staying_asleep', type: 'likert', label: 'assessment.step1.isi.staying_asleep', required: true, min: 0, max: 4, options: ISI_SEVERITY },
				{ id: 'isi_waking_early', type: 'likert', label: 'assessment.step1.isi.waking_early', required: true, min: 0, max: 4, options: ISI_SEVERITY },
				{ id: 'isi_satisfaction', type: 'likert', label: 'assessment.step1.isi.satisfaction', required: true, min: 0, max: 4, options: ISI_SATISFACTION },
				{ id: 'isi_noticeable', type: 'likert', label: 'assessment.step1.isi.noticeable', required: true, min: 0, max: 4, options: ISI_NOTICEABILITY },
				{ id: 'isi_worried', type: 'likert', label: 'assessment.step1.isi.worried', required: true, min: 0, max: 4, options: ISI_NOTICEABILITY },
				{ id: 'isi_interfere', type: 'likert', label: 'assessment.step1.isi.interfere', required: true, min: 0, max: 4, options: ISI_NOTICEABILITY }
			]
		}
	]
};
