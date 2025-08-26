import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://hellovera.app'
  
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
