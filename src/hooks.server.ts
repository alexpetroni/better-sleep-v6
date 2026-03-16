import type { HandleServerError } from '@sveltejs/kit';

export const handleError: HandleServerError = ({ error, event }) => {
	console.error('Server error:', error);
	console.error('URL:', event.url.pathname);
	return {
		message: String(error)
	};
};
