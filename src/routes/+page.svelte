<script lang="ts">
	import { MultiStepForm } from 'formcomp';
	import type { FormCallbacks } from 'formcomp';
	import { formConfig } from '$lib/data/config';
	import { translate } from '$lib/translate';
	import { scoreAssessment } from '$lib/scoring/index';
	import { generateNarrative, type NarrativeResult } from '$lib/narrative/index';

	let completed = $state(false);
	let narrative = $state<NarrativeResult | null>(null);
	let error = $state<string | null>(null);

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
				narrative = generateNarrative(scoring);
				completed = true;
			} catch (e) {
				console.error('Scoring/narrative error:', e);
				error = String(e);
			}
		}
	};
</script>

<div class="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-3xl">
		<div class="text-center mb-8">
			<h1 class="text-3xl font-bold text-gray-900">Better Sleep Assessment</h1>
			<p class="mt-2 text-gray-600">A comprehensive sleep health evaluation — 6 steps</p>
		</div>

		{#if error}
			<div class="bg-red-50 border border-red-200 rounded-xl p-8">
				<h2 class="text-xl font-bold text-red-700 mb-2">Something went wrong</h2>
				<p class="text-red-600 text-sm">{error}</p>
				<button
					class="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
					onclick={() => { error = null; completed = false; narrative = null; }}
				>
					Start Over
				</button>
			</div>
		{:else if completed && narrative}
			<article class="bg-white rounded-xl shadow-lg overflow-hidden">
				<div class="p-8 sm:p-12 space-y-10">
					<section>
						<h2 class="text-xl font-bold text-gray-900 mb-4">Where you are right now</h2>
						{#each narrative.sections.whereYouAre.split('\n\n') as paragraph}
							<p class="text-gray-700 leading-relaxed mb-4">{paragraph}</p>
						{/each}
					</section>

					<hr class="border-gray-200" />

					<section>
						<h2 class="text-xl font-bold text-gray-900 mb-4">What's feeding the loop</h2>
						{#each narrative.sections.feedingTheLoop.split('\n\n') as paragraph}
							<p class="text-gray-700 leading-relaxed mb-4">{paragraph}</p>
						{/each}
					</section>

					<hr class="border-gray-200" />

					<section>
						<h2 class="text-xl font-bold text-gray-900 mb-4">What I'd suggest, and the order matters</h2>
						{#each narrative.sections.suggestions.split('\n\n') as paragraph}
							{#if paragraph === 'First two weeks: the non-negotiables' || paragraph === 'Weeks three and four: building on the base' || paragraph === 'Month two onward: fine-tuning'}
								<h3 class="text-lg font-semibold text-gray-800 mt-6 mb-3">{paragraph}</h3>
							{:else}
								<p class="text-gray-700 leading-relaxed mb-4">{paragraph}</p>
							{/if}
						{/each}
					</section>

					<hr class="border-gray-200" />

					<section>
						<h2 class="text-xl font-bold text-gray-900 mb-4">The honest version</h2>
						{#each narrative.sections.honestVersion.split('\n\n') as paragraph}
							<p class="text-gray-700 leading-relaxed mb-4">{paragraph}</p>
						{/each}
					</section>
				</div>

				<div class="bg-gray-50 px-8 sm:px-12 py-6 border-t border-gray-200">
					<div class="flex items-center justify-between">
						<p class="text-xs text-gray-400">
							Primary pattern: {narrative.metadata.primaryPattern}
							{#if narrative.metadata.secondaryPatterns.length > 0}
								 + {narrative.metadata.secondaryPatterns.join(', ')}
							{/if}
							 · ISI: {narrative.metadata.isiSeverity}
						</p>
						<button
							class="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm"
							onclick={() => { completed = false; narrative = null; }}
						>
							Start Over
						</button>
					</div>
				</div>
			</article>
		{:else}
			<MultiStepForm config={formConfig} {translate} {callbacks} />
		{/if}
	</div>
</div>
