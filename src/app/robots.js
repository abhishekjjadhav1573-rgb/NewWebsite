export default function robots() {
  const baseUrl = 'https://www.smartfinmetrics.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}