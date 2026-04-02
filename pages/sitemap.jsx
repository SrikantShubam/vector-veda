export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/sitemap.xml",
      permanent: true
    }
  };
}

export default function SitemapAliasPage() {
  return null;
}
