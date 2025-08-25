import { type Author } from "./author";

export type Post = {
  id: string; // Notion page ID
  slug: string;
  title: string;
  date: string;
  coverImage: string | null;
  author: Author;
  excerpt: string;
  ogImage: {
    url: string | null;
  };
  content: string;
  preview?: boolean;
  tags?: string[];
  readingTime?: number;
  status?: "Published" | "Draft";
};
