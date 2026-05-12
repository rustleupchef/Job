import { marked } from "marked";

export default {
	async fetch(request, env, ctx) {

		if (request.method === "GET" && new URL(request.url).pathname === "/") {
		
			const response = await fetch("https://raw.githubusercontent.com/rustleupchef/Job/master/resume.md");
			const markdown = await response.text();

			const html = marked(markdown);
			return new Response(html, {
				headers: {
					"Content-Type": "text/html",
				},
			});
		}  else if (request.method === "GET" && new URL(request.url).pathname === "/resume.md") {
			const response = await fetch("https://raw.githubusercontent.com/rustleupchef/Job/master/resume.md");
			const markdown = await response.text();

			return new Response(markdown, {
				headers: {
					"Content-Type": "text/markdown",
				},
			});
		} else {
			return new Response("Not Found", { status: 404 });
		}
	}
};
