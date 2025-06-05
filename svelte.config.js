// import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		// adapter: adapter()
        adapter: adapter({
            // default options are usually fine:
            // if you push the build into a folder called 'build' or 'docs',
            // make sure that matches your GitHub Pages settings (see below).
            pages: 'docs',      // where to output your generated HTML/CSS/JS
            assets: 'docs',     // where to put static assets (images, fonts, etc.)
            fallback: 'index.html', // <— serve index.html for any unmatched route
            strict: false           // <— do not error on dynamic routes
          }),
	}
};

export default config;
