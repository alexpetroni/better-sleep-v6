import type { StepConfig, QuestionOption } from 'formcomp';

const NOT_SURE: QuestionOption = { value: 'unsure', label: 'common.not_sure' };

const PHQ_OPTIONS: QuestionOption[] = [
	{ value: '0', label: 'assessment.step5.phq.not_at_all' },
	{ value: '1', label: 'assessment.step5.phq.several_days' },
	{ value: '2', label: 'assessment.step5.phq.more_than_half' },
	{ value: '3', label: 'assessment.step5.phq.nearly_every_day' }
];

export const step5: StepConfig = {
	id: 'step-5',
	label: 'assessment.steps.5',
	groups: [
		{
			id: 'phq2',
			label: 'assessment.step5.phq2',
			intro: 'assessment.step5.intro',
			renderMode: 'likert-batch',
			questions: [
				{ id: 'little_interest', type: 'likert', label: 'assessment.step5.little_interest', required: true, min: 0, max: 3, options: PHQ_OPTIONS },
				{ id: 'feeling_down', type: 'likert', label: 'assessment.step5.feeling_down', required: true, min: 0, max: 3, options: PHQ_OPTIONS }
			]
		},
		{
			id: 'gad2',
			label: 'assessment.step5.gad2',
			renderMode: 'likert-batch',
			questions: [
				{ id: 'nervous_anxious', type: 'likert', label: 'assessment.step5.nervous_anxious', required: true, min: 0, max: 3, options: PHQ_OPTIONS },
				{ id: 'cant_stop_worrying', type: 'likert', label: 'assessment.step5.cant_stop_worrying', required: true, min: 0, max: 3, options: PHQ_OPTIONS }
			]
		},
		{
			id: 'bedtime_dread',
			label: 'assessment.step5.bedtime_dread',
			questions: [
				{
					id: 'bedtime_dread',
					type: 'single-select',
					label: 'assessment.step5.bedtime_dread',
					options: [
						{ value: 'yes', label: 'assessment.step5.bedtime_dread.yes' },
						{ value: 'sometimes', label: 'assessment.step5.bedtime_dread.sometimes' },
						{ value: 'no', label: 'assessment.step5.bedtime_dread.no' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'racing_mind',
			label: 'assessment.step5.racing_mind',
			questions: [
				{
					id: 'racing_mind',
					type: 'single-select',
					label: 'assessment.step5.racing_mind',
					options: [
						{ value: 'yes', label: 'assessment.step5.racing_mind.yes' },
						{ value: 'sometimes', label: 'assessment.step5.racing_mind.sometimes' },
						{ value: 'no', label: 'assessment.step5.racing_mind.no' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'clock_watching',
			label: 'assessment.step5.clock_watching',
			questions: [
				{
					id: 'clock_watching',
					type: 'single-select',
					label: 'assessment.step5.clock_watching',
					options: [
						{ value: 'yes', label: 'assessment.step5.clock_watching.yes' },
						{ value: 'sometimes', label: 'assessment.step5.clock_watching.sometimes' },
						{ value: 'no', label: 'assessment.step5.clock_watching.no' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'trying_hard',
			label: 'assessment.step5.trying_hard',
			questions: [
				{
					id: 'trying_hard',
					type: 'single-select',
					label: 'assessment.step5.trying_hard',
					options: [
						{ value: 'yes', label: 'assessment.step5.trying_hard.yes' },
						{ value: 'sometimes', label: 'assessment.step5.trying_hard.sometimes' },
						{ value: 'no', label: 'assessment.step5.trying_hard.no' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'easier_elsewhere',
			label: 'assessment.step5.easier_elsewhere',
			questions: [
				{
					id: 'easier_elsewhere',
					type: 'single-select',
					label: 'assessment.step5.easier_elsewhere',
					options: [
						{ value: 'yes', label: 'assessment.step5.easier_elsewhere.yes' },
						{ value: 'sometimes', label: 'assessment.step5.easier_elsewhere.sometimes' },
						{ value: 'no', label: 'assessment.step5.easier_elsewhere.no' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'avoidance_scrolling',
			label: 'assessment.step5.avoidance_scrolling',
			questions: [
				{
					id: 'avoidance_scrolling',
					type: 'single-select',
					label: 'assessment.step5.avoidance_scrolling',
					options: [
						{ value: 'yes', label: 'assessment.step5.avoidance_scrolling.yes' },
						{ value: 'sometimes', label: 'assessment.step5.avoidance_scrolling.sometimes' },
						{ value: 'no', label: 'assessment.step5.avoidance_scrolling.no' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'main_stressor',
			label: 'assessment.step5.main_stressor',
			questions: [
				{
					id: 'main_stressor',
					type: 'multi-select',
					label: 'assessment.step5.main_stressor',
					options: [
						{ value: 'work', label: 'assessment.step5.main_stressor.work' },
						{ value: 'financial', label: 'assessment.step5.main_stressor.financial' },
						{ value: 'relationship', label: 'assessment.step5.main_stressor.relationship' },
						{ value: 'grief', label: 'assessment.step5.main_stressor.grief' },
						{ value: 'health', label: 'assessment.step5.main_stressor.health' },
						{ value: 'purposelessness', label: 'assessment.step5.main_stressor.purposelessness' },
						{ value: 'loneliness', label: 'assessment.step5.main_stressor.loneliness' },
						{ value: 'caregiving', label: 'assessment.step5.main_stressor.caregiving' },
						{ value: 'none', label: 'assessment.step5.main_stressor.none', exclusive: true },
						{ value: 'rather_not_say', label: 'assessment.step5.main_stressor.rather_not_say', exclusive: true }
					]
				}
			]
		},
		{
			id: 'stress_level',
			label: 'assessment.step5.stress_level',
			questions: [
				{
					id: 'stress_level',
					type: 'scale',
					label: 'assessment.step5.stress_level',
					min: 1,
					max: 10,
					required: true,
					minLabel: 'assessment.step5.stress_level.low',
					maxLabel: 'assessment.step5.stress_level.high'
				}
			]
		},
		{
			id: 'coping_pattern',
			label: 'assessment.step5.coping_pattern',
			questions: [
				{
					id: 'coping_pattern',
					type: 'single-select',
					label: 'assessment.step5.coping_pattern',
					options: [
						{ value: 'push_through', label: 'assessment.step5.coping_pattern.push_through' },
						{ value: 'replay_analyze', label: 'assessment.step5.coping_pattern.replay_analyze' },
						{ value: 'talk_to_someone', label: 'assessment.step5.coping_pattern.talk_to_someone' },
						{ value: 'no_pattern', label: 'assessment.step5.coping_pattern.no_pattern' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'life_context',
			label: 'assessment.step5.life_context',
			questions: [
				{
					id: 'recent_changes',
					type: 'textarea',
					label: 'assessment.step5.recent_changes',
					placeholder: 'assessment.step5.recent_changes.placeholder'
				},
				{
					id: 'upcoming_anxiety',
					type: 'textarea',
					label: 'assessment.step5.upcoming_anxiety',
					placeholder: 'assessment.step5.upcoming_anxiety.placeholder'
				}
			]
		},
		{
			id: 'nightmares',
			label: 'assessment.step5.nightmares',
			questions: [
				{
					id: 'nightmares',
					type: 'single-select',
					label: 'assessment.step5.nightmares',
					options: [
						{ value: 'yes_frequent', label: 'assessment.step5.nightmares.yes_frequent' },
						{ value: 'yes_recurring', label: 'assessment.step5.nightmares.yes_recurring' },
						{ value: 'sometimes', label: 'assessment.step5.nightmares.sometimes' },
						{ value: 'no', label: 'assessment.step5.nightmares.no' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'safety_at_night',
			label: 'assessment.step5.safety_at_night',
			questions: [
				{
					id: 'safety_at_night',
					type: 'single-select',
					label: 'assessment.step5.safety_at_night',
					options: [
						{ value: 'yes', label: 'assessment.step5.safety_at_night.yes' },
						{ value: 'sometimes', label: 'assessment.step5.safety_at_night.sometimes' },
						{ value: 'no', label: 'assessment.step5.safety_at_night.no' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'startle_response',
			label: 'assessment.step5.startle_response',
			questions: [
				{
					id: 'startle_response',
					type: 'single-select',
					label: 'assessment.step5.startle_response',
					options: [
						{ value: 'yes', label: 'assessment.step5.startle_response.yes' },
						{ value: 'sometimes', label: 'assessment.step5.startle_response.sometimes' },
						{ value: 'no', label: 'assessment.step5.startle_response.no' },
						NOT_SURE
					]
				}
			]
		}
	]
};
