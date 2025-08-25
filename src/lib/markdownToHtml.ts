import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

export default async function markdownToHtml(markdown: string) {
  try {
    const result = await remark()
      .use(remarkGfm) // GitHub Flavored Markdown (tables, strikethrough, task lists, etc.)
      .use(remarkBreaks) // Convert line breaks to <br> tags
      .use(html, {
        sanitize: false, // Allow HTML in markdown
        allowDangerousHtml: true, // Allow potentially dangerous HTML
      })
      .process(markdown);

    return result.toString();
  } catch (error) {
    console.error("Error processing markdown:", error);
    // Return the markdown as-is wrapped in a pre tag if processing fails
    return `<pre>${markdown}</pre>`;
  }
}
