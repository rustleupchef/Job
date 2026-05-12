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
