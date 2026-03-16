import type { StepConfig, QuestionOption } from 'formcomp';

const NOT_SURE: QuestionOption = { value: 'unsure', label: 'common.not_sure' };

export const step6: StepConfig = {
	id: 'step-6',
	label: 'assessment.steps.6',
	groups: [
		{
			id: 'body_lets_go',
			label: 'assessment.step6.body_lets_go',
			intro: 'assessment.step6.intro',
			questions: [
				{
					id: 'body_lets_go',
					type: 'single-select',
					label: 'assessment.step6.body_lets_go',
					options: [
						{ value: 'yes', label: 'assessment.step6.body_lets_go.yes' },
						{ value: 'partially', label: 'assessment.step6.body_lets_go.partially' },
						{ value: 'no', label: 'assessment.step6.body_lets_go.no' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'home_safety',
			label: 'assessment.step6.home_safety',
			questions: [
				{
					id: 'home_safety',
					type: 'single-select',
					label: 'assessment.step6.home_safety',
					options: [
						{ value: 'yes_completely', label: 'assessment.step6.home_safety.yes_completely' },
						{ value: 'mostly', label: 'assessment.step6.home_safety.mostly' },
						{ value: 'not_really', label: 'assessment.step6.home_safety.not_really' },
						{ value: 'no', label: 'assessment.step6.home_safety.no' }
					]
				}
			]
		},
		{
			id: 'housing_stability',
			label: 'assessment.step6.housing_stability',
			questions: [
				{
					id: 'housing_stability',
					type: 'single-select',
					label: 'assessment.step6.housing_stability',
					options: [
						{ value: 'stable', label: 'assessment.step6.housing_stability.stable' },
						{ value: 'uncertain', label: 'assessment.step6.housing_stability.uncertain' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'neighborhood_safety',
			label: 'assessment.step6.neighborhood_safety',
			questions: [
				{
					id: 'neighborhood_safety',
					type: 'single-select',
					label: 'assessment.step6.neighborhood_safety',
					options: [
						{ value: 'safe', label: 'assessment.step6.neighborhood_safety.safe' },
						{ value: 'mostly_safe', label: 'assessment.step6.neighborhood_safety.mostly_safe' },
						{ value: 'not_safe', label: 'assessment.step6.neighborhood_safety.not_safe' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'lock_checking',
			label: 'assessment.step6.lock_checking',
			questions: [
				{
					id: 'lock_checking',
					type: 'single-select',
					label: 'assessment.step6.lock_checking',
					options: [
						{ value: 'once', label: 'assessment.step6.lock_checking.once' },
						{ value: 'multiple', label: 'assessment.step6.lock_checking.multiple' },
						{ value: 'no', label: 'assessment.step6.lock_checking.no' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'cohabitant_tension',
			label: 'assessment.step6.cohabitant_tension',
			questions: [
				{
					id: 'cohabitant_tension',
					type: 'single-select',
					label: 'assessment.step6.cohabitant_tension',
					options: [
						{ value: 'yes', label: 'assessment.step6.cohabitant_tension.yes' },
						{ value: 'sometimes', label: 'assessment.step6.cohabitant_tension.sometimes' },
						{ value: 'no', label: 'assessment.step6.cohabitant_tension.no' },
						{ value: 'live_alone', label: 'assessment.step6.cohabitant_tension.live_alone' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'partner_effect',
			label: 'assessment.step6.partner_effect',
			questions: [
				{
					id: 'partner_effect',
					type: 'single-select',
					label: 'assessment.step6.partner_effect',
					options: [
						{ value: 'more_safe', label: 'assessment.step6.partner_effect.more_safe' },
						{ value: 'more_alert', label: 'assessment.step6.partner_effect.more_alert' },
						{ value: 'neutral', label: 'assessment.step6.partner_effect.neutral' },
						{ value: 'no_partner', label: 'assessment.step6.partner_effect.no_partner' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'caregiving_role',
			label: 'assessment.step6.caregiving_role',
			questions: [
				{
					id: 'caregiving_role',
					type: 'single-select',
					label: 'assessment.step6.caregiving_role',
					options: [
						{ value: 'yes', label: 'assessment.step6.caregiving_role.yes' },
						{ value: 'sometimes', label: 'assessment.step6.caregiving_role.sometimes' },
						{ value: 'no', label: 'assessment.step6.caregiving_role.no' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'financial_in_bed',
			label: 'assessment.step6.financial_in_bed',
			questions: [
				{
					id: 'financial_in_bed',
					type: 'single-select',
					label: 'assessment.step6.financial_in_bed',
					options: [
						{ value: 'yes', label: 'assessment.step6.financial_in_bed.yes' },
						{ value: 'sometimes', label: 'assessment.step6.financial_in_bed.sometimes' },
						{ value: 'no', label: 'assessment.step6.financial_in_bed.no' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'financial_security',
			label: 'assessment.step6.financial_security',
			questions: [
				{
					id: 'financial_security',
					type: 'single-select',
					label: 'assessment.step6.financial_security',
					options: [
						{ value: 'secure', label: 'assessment.step6.financial_security.secure' },
						{ value: 'manageable', label: 'assessment.step6.financial_security.manageable' },
						{ value: 'significant_stress', label: 'assessment.step6.financial_security.significant_stress' },
						{ value: 'crisis', label: 'assessment.step6.financial_security.crisis' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'last_phone_content',
			label: 'assessment.step6.last_phone_content',
			questions: [
				{
					id: 'last_phone_content',
					type: 'single-select',
					label: 'assessment.step6.last_phone_content',
					options: [
						{ value: 'relaxing', label: 'assessment.step6.last_phone_content.relaxing' },
						{ value: 'stimulating', label: 'assessment.step6.last_phone_content.stimulating' },
						{ value: 'stressful', label: 'assessment.step6.last_phone_content.stressful' },
						{ value: 'no_phone', label: 'assessment.step6.last_phone_content.no_phone' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'evening_news',
			label: 'assessment.step6.evening_news',
			questions: [
				{
					id: 'evening_news',
					type: 'single-select',
					label: 'assessment.step6.evening_news',
					options: [
						{ value: 'yes_activating', label: 'assessment.step6.evening_news.yes_activating' },
						{ value: 'yes_neutral', label: 'assessment.step6.evening_news.yes_neutral' },
						{ value: 'no', label: 'assessment.step6.evening_news.no' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'work_email_check',
			label: 'assessment.step6.work_email_check',
			questions: [
				{
					id: 'work_email_check',
					type: 'single-select',
					label: 'assessment.step6.work_email_check',
					options: [
						{ value: 'yes', label: 'assessment.step6.work_email_check.yes' },
						{ value: 'sometimes', label: 'assessment.step6.work_email_check.sometimes' },
						{ value: 'no', label: 'assessment.step6.work_email_check.no' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'doomscrolling',
			label: 'assessment.step6.doomscrolling',
			questions: [
				{
					id: 'doomscrolling',
					type: 'single-select',
					label: 'assessment.step6.doomscrolling',
					options: [
						{ value: 'yes', label: 'assessment.step6.doomscrolling.yes' },
						{ value: 'sometimes', label: 'assessment.step6.doomscrolling.sometimes' },
						{ value: 'no', label: 'assessment.step6.doomscrolling.no' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'body_state',
			label: 'assessment.step6.body_state',
			questions: [
				{
					id: 'body_state',
					type: 'single-select',
					label: 'assessment.step6.body_state',
					options: [
						{ value: 'calm_ready', label: 'assessment.step6.body_state.calm_ready' },
						{ value: 'tired_wired', label: 'assessment.step6.body_state.tired_wired' },
						{ value: 'heart_elevated', label: 'assessment.step6.body_state.heart_elevated' },
						{ value: 'muscles_tense', label: 'assessment.step6.body_state.muscles_tense' },
						{ value: 'alert_scanning', label: 'assessment.step6.body_state.alert_scanning' },
						{ value: 'numb_disconnected', label: 'assessment.step6.body_state.numb_disconnected' },
						NOT_SURE
					]
				}
			]
		},
		{
			id: 'safety_rituals',
			label: 'assessment.step6.safety_rituals',
			questions: [
				{
					id: 'safety_rituals',
					type: 'multi-select',
					label: 'assessment.step6.safety_rituals',
					options: [
						{ value: 'door_closed', label: 'assessment.step6.safety_rituals.door_closed' },
						{ value: 'door_open', label: 'assessment.step6.safety_rituals.door_open' },
						{ value: 'light_on', label: 'assessment.step6.safety_rituals.light_on' },
						{ value: 'complete_darkness', label: 'assessment.step6.safety_rituals.complete_darkness' },
						{ value: 'phone_near', label: 'assessment.step6.safety_rituals.phone_near' },
						{ value: 'specific_side', label: 'assessment.step6.safety_rituals.specific_side' },
						{ value: 'partner_present', label: 'assessment.step6.safety_rituals.partner_present' },
						{ value: 'alone', label: 'assessment.step6.safety_rituals.alone' },
						{ value: 'audio_playing', label: 'assessment.step6.safety_rituals.audio_playing' },
						{ value: 'silence', label: 'assessment.step6.safety_rituals.silence' },
						{ value: 'other', label: 'assessment.step6.safety_rituals.other' }
					]
				}
			]
		},
		{
			id: 'sleep_away_from_home',
			label: 'assessment.step6.sleep_away_from_home',
			questions: [
				{
					id: 'sleep_away_from_home',
					type: 'single-select',
					label: 'assessment.step6.sleep_away_from_home',
					options: [
						{ value: 'better', label: 'assessment.step6.sleep_away_from_home.better' },
						{ value: 'worse', label: 'assessment.step6.sleep_away_from_home.worse' },
						{ value: 'same', label: 'assessment.step6.sleep_away_from_home.same' },
						NOT_SURE
					]
				}
			]
		}
	]
};
