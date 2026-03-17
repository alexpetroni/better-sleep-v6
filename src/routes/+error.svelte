<script lang="ts">
	import { page } from '$app/state';
	import { translate } from '$lib/translate';
</script>

<div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
	<div class="bg-white rounded-xl p-8 shadow-lg max-w-lg w-full">
		<h1 class="text-2xl font-bold text-red-600 mb-4">{translate('ui.error_title')} ({page.status})</h1>
		<p class="text-gray-700 mb-4">{page.error?.message}</p>
		<a href="/" class="text-indigo-600 hover:text-indigo-800">{translate('ui.go_home')}</a>
	</div>
</div>
