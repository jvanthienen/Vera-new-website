import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://vera-new-website.vercel.app'
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/_next/',
        '/private/',
        '*.json',
        '/checkout_redirect/',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
