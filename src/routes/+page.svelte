<script lang="ts">
	import { MultiStepForm } from 'formcomp';
	import type { FormCallbacks } from 'formcomp';
	import { formConfig } from '$lib/data/config';
	import type { FormConfig } from 'formcomp';
	import { translate } from '$lib/translate';
	import { locale } from '$lib/stores/locale.svelte';

	// Resolve placeholder i18n keys in the config since formcomp doesn't translate them
	function resolveConfig(config: FormConfig): FormConfig {
		return {
			steps: config.steps.map((step) => ({
				...step,
				groups: step.groups.map((group) => ({
					...group,
					questions: group.questions.map((q) => ({
						...q,
						placeholder: q.placeholder ? translate(q.placeholder) : undefined
					}))
				}))
			}))
		};
	}

	const resolvedConfig = $derived(resolveConfig(formConfig));
	import { scoreAssessment } from '$lib/scoring/index';
	import { generateNarrative, type NarrativeResult } from '$lib/narrative/index';

	let completed = $state(false);
	let narrative = $state<NarrativeResult | null>(null);
	let error = $state<string | null>(null);
	let formKey = $state(0);

	const callbacks: FormCallbacks = {
		onStepComplete(stepId, stepIndex) {
			console.log(`Step completed: ${stepId} (index: ${stepIndex})`);
		},
		onStepChange(from, to) {
			console.log(`Navigation: step ${from} -> step ${to}`);
		},
		onFormComplete(allResponses) {
			console.log('Assessment complete:', allResponses);
			try {
				const scoring = scoreAssessment(allResponses);
				console.log('Scoring result:', scoring);
				narrative = generateNarrative(scoring, locale.value);
				completed = true;
			} catch (e) {
				console.error('Scoring/narrative error:', e);
				error = String(e);
			}
		}
	};

	function startOver() {
		completed = false;
		narrative = null;
		error = null;
		formKey++;
	}

	function switchLocale(lang: 'en' | 'ro') {
		locale.value = lang;
		if (completed && narrative) {
			// Re-run to regenerate in new language — need to re-score
			// For now just restart
			startOver();
		}
	}

	// Phase subheadings for the suggestions section
	const phaseHeadings = [
		'First two weeks: the non-negotiables',
		'Weeks three and four: building on the base',
		'Month two onward: fine-tuning',
		'Primele două săptămâni: esențialul',
		'Săptămânile trei și patru: consolidare',
		'Luna a doua înainte: reglaj fin'
	];
</script>

<div class="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-3xl">
		<!-- Language selector -->
		<div class="flex justify-end mb-4">
			<div class="inline-flex rounded-md shadow-sm" role="group">
				<button
					type="button"
					class="px-3 py-1.5 text-sm font-medium rounded-l-md border {locale.value === 'en' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}"
					onclick={() => switchLocale('en')}
				>
					English
				</button>
				<button
					type="button"
					class="px-3 py-1.5 text-sm font-medium rounded-r-md border-t border-r border-b {locale.value === 'ro' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}"
					onclick={() => switchLocale('ro')}
				>
					Română
				</button>
			</div>
		</div>

		<div class="text-center mb-8">
			<h1 class="text-3xl font-bold text-gray-900">{translate('ui.app_title')}</h1>
			<p class="mt-2 text-gray-600">{translate('ui.app_subtitle')}</p>
		</div>

		{#if error}
			<div class="bg-red-50 border border-red-200 rounded-xl p-8">
				<h2 class="text-xl font-bold text-red-700 mb-2">{translate('ui.error_title')}</h2>
				<p class="text-red-600 text-sm">{error}</p>
				<button
					class="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
					onclick={startOver}
				>
					{translate('ui.start_over')}
				</button>
			</div>
		{:else if completed && narrative}
			<article class="bg-white rounded-xl shadow-lg overflow-hidden">
				<div class="p-8 sm:p-12 space-y-10">
					<section>
						<h2 class="text-xl font-bold text-gray-900 mb-4">{translate('ui.section_where')}</h2>
						{#each narrative.sections.whereYouAre.split('\n\n') as paragraph}
							<p class="text-gray-700 leading-relaxed mb-4">{paragraph}</p>
						{/each}
					</section>

					<hr class="border-gray-200" />

					<section>
						<h2 class="text-xl font-bold text-gray-900 mb-4">{translate('ui.section_loop')}</h2>
						{#each narrative.sections.feedingTheLoop.split('\n\n') as paragraph}
							<p class="text-gray-700 leading-relaxed mb-4">{paragraph}</p>
						{/each}
					</section>

					<hr class="border-gray-200" />

					<section>
						<h2 class="text-xl font-bold text-gray-900 mb-4">{translate('ui.section_suggest')}</h2>
						{#each narrative.sections.suggestions.split('\n\n') as paragraph}
							{#if phaseHeadings.includes(paragraph)}
								<h3 class="text-lg font-semibold text-gray-800 mt-6 mb-3">{paragraph}</h3>
							{:else}
								<p class="text-gray-700 leading-relaxed mb-4">{paragraph}</p>
							{/if}
						{/each}
					</section>

					<hr class="border-gray-200" />

					<section>
						<h2 class="text-xl font-bold text-gray-900 mb-4">{translate('ui.section_honest')}</h2>
						{#each narrative.sections.honestVersion.split('\n\n') as paragraph}
							<p class="text-gray-700 leading-relaxed mb-4">{paragraph}</p>
						{/each}
					</section>
				</div>

				<div class="bg-gray-50 px-8 sm:px-12 py-6 border-t border-gray-200">
					<div class="flex items-center justify-between">
						<p class="text-xs text-gray-400">
							{translate('ui.primary_pattern')}: {narrative.metadata.primaryPattern}
							{#if narrative.metadata.secondaryPatterns.length > 0}
								 + {narrative.metadata.secondaryPatterns.join(', ')}
							{/if}
							 · ISI: {narrative.metadata.isiSeverity}
						</p>
						<button
							class="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm"
							onclick={startOver}
						>
							{translate('ui.start_over')}
						</button>
					</div>
				</div>
			</article>
		{:else}
			{#key formKey}
				<MultiStepForm config={resolvedConfig} {translate} {callbacks} />
			{/key}
		{/if}
	</div>
</div>
