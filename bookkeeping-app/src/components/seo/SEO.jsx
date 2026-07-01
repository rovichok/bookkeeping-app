import { Helmet } from "react-helmet-async";

const SITE_NAME = "Lentis Group";
const SITE_URL = "https://lentisgroup.com";

export default function SEO({
  title = "Lentis Group | Bookkeeping, QuickBooks & Workflow Improvement",
  description = "Bookkeeping cleanup, monthly bookkeeping, QuickBooks support, and workflow improvement services for small businesses.",
  path = "/",
  schema,
  schemas,
}) {
  const canonicalUrl = `${SITE_URL}${path}`;

  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    description,
  };

  const jsonLd = schemas ?? (schema ? [schema] : [defaultSchema]);

  return (
    <Helmet>
      <title>{title}</title>

      <meta name="description" content={description} />

      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

      {jsonLd.map((item, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  );
}
