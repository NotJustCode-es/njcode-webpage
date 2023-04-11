export function getTestSitemap(): string {
  return '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'
  + ' xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml"'
  + ' xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">'
  + '<url><loc>http://localhost:4200/</loc><lastmod>2023-03-03T11:47:44.856Z</lastmod><changefreq>monthly</changefreq><priority>'
  + '1.0</priority></url></urlset>';
}