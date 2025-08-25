import { notion, n2m, BLOG_DATABASE_ID } from "./notion";
import { Post } from "./types/post";
import { Author } from "./types/author";
import markdownToHtml from "./markdownToHtml";

// Simple in-memory cache for posts to reduce API calls
const postsCache = {
  data: null as Post[] | null,
  timestamp: 0,
  ttl: 5 * 60 * 1000 // 5 minutes TTL
};

function getCachedPosts(): Post[] | null {
  if (postsCache.data && Date.now() - postsCache.timestamp < postsCache.ttl) {
    return postsCache.data;
  }
  return null;
}

function setCachedPosts(posts: Post[]): void {
  postsCache.data = posts;
  postsCache.timestamp = Date.now();
}

// Check if Notion client is available
function isNotionAvailable(): boolean {
  return notion !== null && n2m !== null && BLOG_DATABASE_ID !== "";
}

// Flexible property extraction that works with different property names
function getPropertyValue(properties: any, possibleNames: string[]): any {
  for (const name of possibleNames) {
    if (properties[name]) {
      return properties[name];
    }
  }
  return null;
}

function extractTextFromRichText(richText: Array<{ plain_text: string }> | null): string {
  if (!richText || !Array.isArray(richText)) return "";
  return richText.map(text => text.plain_text).join("");
}

function extractImageUrl(files: Array<{ file?: { url: string }; external?: { url: string } }> | null): string {
  if (!files || !Array.isArray(files) || files.length === 0) return "";
  const file = files[0];
  return file.file?.url || file.external?.url || "";
}

function generateSlugFromTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function convertNotionPageToPost(page: any): Promise<Post> {
  const properties = page.properties;

  // Extract title (required)
  const titleProp = getPropertyValue(properties, ["Title", "Name"]);
  const title = titleProp?.title ? extractTextFromRichText(titleProp.title) : "Untitled";

  // Extract or generate slug
  const slugProp = getPropertyValue(properties, ["Slug", "URL Slug"]);
  const slug = slugProp?.rich_text ? extractTextFromRichText(slugProp.rich_text) : generateSlugFromTitle(title);

  // Extract date
  const dateProp = getPropertyValue(properties, ["Date", "Publish Date", "Published", "Created"]);
  const date = dateProp?.date?.start || new Date().toISOString();

  // Extract status (handle both 'select' and 'status' property types)
  const statusProp = getPropertyValue(properties, ["Status", "Published"]);
  const status = statusProp?.select?.name || statusProp?.status?.name || "Draft";

  // Extract excerpt
  const excerptProp = getPropertyValue(properties, ["Excerpt", "Summary", "Description"]);
  const excerpt = excerptProp?.rich_text ? extractTextFromRichText(excerptProp.rich_text) : title; // Fallback to title if no excerpt

  // Extract cover image
  const coverImageProp = getPropertyValue(properties, ["Cover Image", "Featured Image", "Image"]);
  let coverImage = null; // Will be handled by component

  if (coverImageProp?.files) {
    const extractedUrl = extractImageUrl(coverImageProp.files);
    if (extractedUrl && extractedUrl.trim() !== "") {
      coverImage = extractedUrl;
    }
  }

  // Extract tags
  const tagsProp = getPropertyValue(properties, ["Tags", "Categories", "Category"]);
  const tags = tagsProp?.multi_select ? tagsProp.multi_select.map((tag: any) => tag.name) : [];

  // Extract author information (simplified since not displayed)
  const authorNameProp = getPropertyValue(properties, ["Author Name", "Author", "Writer"]);
  const authorName = authorNameProp?.rich_text ? extractTextFromRichText(authorNameProp.rich_text) : "Blog Author";

  const author: Author = {
    name: authorName,
    picture: "",
    title: "",
    bio: "",
  };

  // Get page content and convert to markdown
  let content = "";
  let readingTime = 1;

  try {
    // Only try to convert content if n2m is available
    if (n2m) {
      const mdblocks = await n2m.pageToMarkdown(page.id);
      const markdownString = n2m.toMarkdownString(mdblocks);

      // The toMarkdownString returns a string directly, not an object with .parent
      const markdownText = typeof markdownString === "string" ? markdownString : markdownString.parent || "";

      if (markdownText) {
        content = await markdownToHtml(markdownText);
        // Calculate reading time (average 200 words per minute)
        const wordCount = markdownText.split(/\s+/).length;
        readingTime = Math.ceil(wordCount / 200);
      } else {
        content = "<p>Content coming soon...</p>";
      }
    } else {
      content = "<p>Content coming soon...</p>";
    }
  } catch (error) {
    console.warn("Error converting content for page:", page.id, error instanceof Error ? error.message : String(error));
    content = "<p>Content coming soon...</p>";
  }

  return {
    id: page.id,
    slug,
    title,
    date,
    coverImage,
    author,
    excerpt,
    ogImage: {
      url: coverImage,
    },
    content,
    tags,
    readingTime,
    status: status as "Published" | "Draft",
  };
}

export async function getAllPosts(): Promise<Post[]> {
  try {
    // Return empty array if Notion is not available (e.g., during build)
    if (!isNotionAvailable()) {
      console.warn("Notion client not available, returning empty posts array");
      return [];
    }

    // Check cache first
    const cached = getCachedPosts();
    if (cached) {
      return cached;
    }

    const response = await notion!.databases.query({
      database_id: BLOG_DATABASE_ID,
      filter: {
        property: "Status",
        status: {
          equals: "Published",
        },
      },
      sorts: [
        {
          property: "Publish Date", // Using your actual property name
          direction: "descending",
        },
      ],
    });

    const posts = await Promise.all(response.results.map((page: any) => convertNotionPageToPost(page)));
    
    // Cache the results
    setCachedPosts(posts);
    
    return posts;
  } catch (error) {
    console.error("Error fetching posts from Notion:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    // Return null if Notion is not available
    if (!isNotionAvailable()) {
      console.warn("Notion client not available, returning null for post");
      return null;
    }

    // First, query just the properties without converting content
    const response = await notion!.databases.query({
      database_id: BLOG_DATABASE_ID,
      filter: {
        property: "Status",
        status: {
          equals: "Published",
        },
      },
    });

    // Find the matching page by checking only title -> slug conversion
    let matchingPage = null;
    for (const page of response.results) {
      // Type guard to ensure we have a full page with properties
      if (!('properties' in page)) continue;
      
      const properties = page.properties;
      const titleProp = getPropertyValue(properties, ["Title", "Name"]);
      const title = titleProp?.title ? extractTextFromRichText(titleProp.title) : "Untitled";
      
      // Check if slug property exists first
      const slugProp = getPropertyValue(properties, ["Slug", "URL Slug"]);
      const pageSlug = slugProp?.rich_text ? extractTextFromRichText(slugProp.rich_text) : generateSlugFromTitle(title);
      
      if (pageSlug === slug) {
        matchingPage = page;
        break;
      }
    }

    if (!matchingPage) {
      return null;
    }

    // Only convert the matching page to a full post (with content)
    return await convertNotionPageToPost(matchingPage);
  } catch (error) {
    console.error("Error fetching post by slug from Notion:", error);
    return null;
  }
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
  try {
    // Return empty array if Notion is not available
    if (!isNotionAvailable()) {
      console.warn("Notion client not available, returning empty posts array");
      return [];
    }

    const response = await notion!.databases.query({
      database_id: BLOG_DATABASE_ID,
      filter: {
        and: [
          {
            property: "Status",
            status: {
              equals: "Published",
            },
          },
          {
            property: "Tags",
            multi_select: {
              contains: tag,
            },
          },
        ],
      },
      sorts: [
        {
          property: "Publish Date",
          direction: "descending",
        },
      ],
    });

    const posts = await Promise.all(response.results.map((page: any) => convertNotionPageToPost(page)));

    return posts;
  } catch (error) {
    console.error("Error fetching posts by tag from Notion:", error);
    return [];
  }
}

export async function getAllTags(): Promise<string[]> {
  try {
    // Return empty array if Notion is not available
    if (!isNotionAvailable()) {
      console.warn("Notion client not available, returning empty tags array");
      return [];
    }

    const response = await notion!.databases.query({
      database_id: BLOG_DATABASE_ID,
      filter: {
        property: "Status",
        status: {
          equals: "Published",
        },
      },
    });

    const tags = new Set<string>();

    response.results.forEach((page: any) => {
      const tagsProp = getPropertyValue(page.properties, ["Tags", "Categories", "Category"]);
      if (tagsProp?.multi_select) {
        tagsProp.multi_select.forEach((tag: any) => {
          tags.add(tag.name);
        });
      }
    });

    return Array.from(tags).sort();
  } catch (error) {
    console.error("Error fetching tags from Notion:", error);
    return [];
  }
}

export async function getAllPostSlugs(): Promise<string[]> {
  try {
    // Optimize by getting all posts (which might be cached) and extracting slugs
    const posts = await getAllPosts();
    const slugs = posts.map(post => post.slug);
    return slugs;
  } catch (error) {
    console.error("Error fetching post slugs from Notion:", error);
    return [];
  }
}
