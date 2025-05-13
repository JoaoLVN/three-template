import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',
  assetsInclude: ['**/*.glb', '**/*.gltf'],
  build: {
    sourcemap: true,
  },
  server: {
    host: '0.0.0.0',
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    {
      name: "build-error-handler", // Naming it appropriately
      buildEnd(error) {
	if (error) {
	  // An error occurred during the Rollup bundling phase
	  console.error("[ERROR WITH BUILD]")
	}
      },
    },
    {
      name: "add-og-tags",
      transformIndexHtml(html) {
	return {
	  html,
	  tags: [
	    {
	      tag: "meta",
	      attrs: {
		property: "og:title",
		content: "Check Out My Game!",
	      },
	    },
	    {
	      tag: "meta",
	      attrs: {
		property: "og:description",
		content:
		"Made this game using Playbot in minutes. You can build one too - no coding needed!",
	      },
	    },
	    {
	      tag: "meta",
	      attrs: {
		property: "og:image",
		content: `${process.env.PUBLIC_URL}/api/og?projectId=${process.env.PROJECT_ID}`,
	      },
	    },
	  ],
	}
      },
    },
  ],
});
