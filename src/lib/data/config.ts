import type { FormConfig } from 'formcomp';
import { step1 } from './step1';
import { step2 } from './step2';
import { step3 } from './step3';
import { step4 } from './step4';
import { step5 } from './step5';
import { step6 } from './step6';

export const formConfig: FormConfig = {
	steps: [step1, step2, step3, step4, step5, step6]
};
