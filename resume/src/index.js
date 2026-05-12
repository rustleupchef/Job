/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { marked } from "marked";

export default {
	async fetch(request, env, ctx) {
		
		const response = await fetch("https://raw.githubusercontent.com/rustleupchef/Job/master/resume.md");
		const markdown = await response.text();

		const html = marked(markdown);
		return new Response(html, {
			headers: {
				"Content-Type": "text/html",
			},
		});
	},
};
