export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([]),
	mimeTypes: {},
	_: {
		client: {start:"_app/immutable/entry/start.BXK5x6cN.js",app:"_app/immutable/entry/app.BBGNQU7F.js",imports:["_app/immutable/entry/start.BXK5x6cN.js","_app/immutable/chunks/C8gnNWyy.js","_app/immutable/chunks/CZyCcRU6.js","_app/immutable/chunks/DRD3kfGY.js","_app/immutable/entry/app.BBGNQU7F.js","_app/immutable/chunks/CZyCcRU6.js","_app/immutable/chunks/C4YN7E9d.js","_app/immutable/chunks/B0a7o7pk.js","_app/immutable/chunks/DRD3kfGY.js","_app/immutable/chunks/BXkCGRo7.js","_app/immutable/chunks/BjzdcZPW.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
