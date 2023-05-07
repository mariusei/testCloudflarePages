//import adapter from '@sveltejs/adapter-auto';
// cloduflare pages adapter
import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter()
		// Using default routes
		// (decides which paths that are exported as workers,
		//  include '/*', exclude '<all>' )
	}
};

export default config;
