import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

// Check if we're in build time (when NOTION env vars might not be available)
const isBuildTime = process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE === 'phase-production-build';

// Create notion client only if environment variables are available
let notion: Client | null = null;
let n2m: NotionToMarkdown | null = null;

if (process.env.NOTION_API_KEY && process.env.NOTION_BLOG_DATABASE_ID) {
  notion = new Client({
    auth: process.env.NOTION_API_KEY,
  });

  n2m = new NotionToMarkdown({
    notionClient: notion,
    config: {
      parseChildPages: false, // Don't parse child pages to avoid circular references
    },
  });
} else if (!isBuildTime) {
  // Only throw errors in development or runtime, not during build
  if (!process.env.NOTION_API_KEY) {
    throw new Error("NOTION_API_KEY is not set in environment variables");
  }
  if (!process.env.NOTION_BLOG_DATABASE_ID) {
    throw new Error("NOTION_BLOG_DATABASE_ID is not set in environment variables");
  }
}

// Export with runtime checks
export { notion, n2m };

export const BLOG_DATABASE_ID = process.env.NOTION_BLOG_DATABASE_ID || "";
