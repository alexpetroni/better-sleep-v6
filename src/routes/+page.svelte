<script lang="ts">
	import { MultiStepForm } from 'formcomp';
	import type { FormCallbacks } from 'formcomp';
	import { formConfig } from '$lib/data/config';
	import { translate } from '$lib/translate';

	let completed = $state(false);
	let results = $state<Record<string, Record<string, unknown>> | null>(null);

	const callbacks: FormCallbacks = {
		onStepComplete(stepId, stepIndex) {
			console.log(`Step completed: ${stepId} (index: ${stepIndex})`);
		},
		onStepChange(from, to) {
			console.log(`Navigation: step ${from} -> step ${to}`);
		},
		onFormComplete(allResponses) {
			console.log('Assessment complete:', allResponses);
			results = allResponses;
			completed = true;
		}
	};
</script>

<div class="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-4xl">
		<div class="text-center mb-8">
			<h1 class="text-3xl font-bold text-gray-900">Better Sleep Assessment</h1>
			<p class="mt-2 text-gray-600">A comprehensive sleep health evaluation — 6 steps</p>
		</div>

		{#if completed && results}
			<div class="bg-white rounded-xl p-8 shadow-lg">
				<h2 class="text-2xl font-bold mb-4 text-gray-900">Assessment Complete</h2>
				<p class="mb-4 text-gray-600">Your responses have been recorded. Here is a summary:</p>
				<pre class="bg-gray-100 p-4 rounded-lg overflow-auto text-sm max-h-[600px]">{JSON.stringify(results, null, 2)}</pre>
				<button
					class="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
					onclick={() => { completed = false; results = null; }}
				>
					Start Over
				</button>
			</div>
		{:else}
			<MultiStepForm config={formConfig} {translate} {callbacks} />
		{/if}
	</div>
</div>
