import { Helmet } from 'react-helmet-async'
import { SITE_URL, company, defaultContact, serviceCities } from '@/data/site'
import { getJsonLd } from '@/lib/utils'

export default function SEO({
  title,
  description,
  path = '/',
  image = '/images/hero-solar.jpg',
  type = 'website',
  noindex = false,
  jsonLd,
  contact = defaultContact,
}) {
  const pageTitle = title ? `${title} | Ramesh Solar Services` : 'Ramesh Solar Services'
  const canonical = `${SITE_URL}${path === '/' ? '' : path}`
  const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`

  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#business`,
    name: company.name,
    description: company.description,
    url: SITE_URL,
    image: `${SITE_URL}/images/hero-solar.jpg`,
    telephone: contact.phoneRaw || contact.phone,
    email: contact.email,
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Indore',
      addressRegion: 'Madhya Pradesh',
      addressCountry: 'IN',
    },
    areaServed: serviceCities.map((city) => ({
      '@type': 'City',
      name: city,
    })),
    knowsAbout: [
      'Rooftop solar installation',
      'Solar consultation',
      'On-grid solar systems',
      'Off-grid solar systems',
      'Hybrid solar systems',
      'Solar maintenance',
    ],
  }

  const structuredData = jsonLd || (path === '/' ? localBusiness : undefined)

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={imageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      {structuredData && (
        <script type="application/ld+json">{getJsonLd(structuredData)}</script>
      )}
    </Helmet>
  )
}
