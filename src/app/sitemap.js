export default function sitemap() {
  const baseUrl = 'https://www.smartfinmetrics.com';

  const routes = [
    '',
    '/tool/emi',
    '/tool/sip',
    '/tool/compound-interest',
    '/tool/gst',
    '/tool/income-tax',
    '/tool/fd',
    '/tool/rd',
    '/tool/bmi',
    '/tool/calorie',
    '/tool/percentage',
    '/tool/average',
    '/tool/profit-loss',
    '/tool/scientific',
    '/tool/age',
    '/tool/password-generator',
    '/tool/qr-code-generator',
    '/tool/image-to-pdf',
    '/tool/image-format-converter',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));
}