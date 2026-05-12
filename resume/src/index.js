import { marked } from "marked";

const html = (content) => `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  /* ---- Page setup ---- */
  @page {
    size: A4;
    margin: 15mm;
  }

  /* ---- Screen styles ---- */
  body {
    font-family: system-ui, sans-serif;
    max-width: 210mm;
    margin: 0 auto;
    padding: 15mm;
    box-sizing: border-box;
  }

  /* ---- Print: lock to 1 page ---- */
  @media print {
    html, body {
      width: 210mm;
      height: 297mm;
      overflow: hidden;
      padding: 0;
      margin: 0;
    }

    #content {
      transform-origin: top left;
    }

    * {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
  }
</style>
</head>
<body>
  <div id="content">${content}</div>
</body>
</html>`;

export default {
	async fetch(request, env, ctx) {

		if (request.method === "GET" && new URL(request.url).pathname === "/") {
		
			const response = await fetch("https://raw.githubusercontent.com/rustleupchef/Job/master/resume.md");
			const markdown = await response.text();

			const htmlContent = marked(markdown);
			return new Response(html(htmlContent), {
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
