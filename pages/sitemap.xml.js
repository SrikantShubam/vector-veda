const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://vectorveda.online").replace(
  /\/+$/,
  ""
);

const ROUTES = [
  "/",
  "/privacy-policy",
  "/saraswati-vandana-privacy-policy",
  "/saraswati-vandana-data-deletion",
  "/hanuman-chalisa-11x-sankalp-privacy-policy",
  "/hanuman-chalisa-11x-sankalp-data-deletion",
  "/legals/terms-of-service"
];

function buildSitemap() {
  const urls = ROUTES.map((route) => {
    return [
      "<url>",
      `<loc>${SITE_URL}${route}</loc>`,
      "<changefreq>weekly</changefreq>",
      "<priority>0.8</priority>",
      "</url>"
    ].join("");
  }).join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

export async function getServerSideProps({ res }) {
  res.setHeader("Content-Type", "text/xml");
  res.write(buildSitemap());
  res.end();

  return {
    props: {}
  };
}

export default function Sitemap() {
  return null;
}
