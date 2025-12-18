export default function StructuredData() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'OFFO Lab Consulting',
    description: 'Launch compliance management for restaurants and medical facilities',
    url: 'https://offolabs.com',
    logo: 'https://offolabs.com/OFFO_LAB_logo.png',
    foundingDate: '2024',
    sameAs: [
      'https://twitter.com/offolabs',
      'https://linkedin.com/company/offo-lab',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Sales',
      email: 'pilot@offolabs.com',
    },
  }

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'OFFO Launch',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '299.00',
      priceCurrency: 'USD',
      priceValidUntil: '2025-12-31',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      ratingCount: '2',
      bestRating: '5',
      worstRating: '1',
    },
    description: 'Eliminate permit chaos and inspection delays for restaurant and medical facility launches. Real-time permit tracking, inspection coordination, and launch readiness scores.',
    featureList: [
      'Permits & Inspections Tracker',
      'Training & Certification Matrix',
      'Launch Audit Binder',
      'Launch Readiness Score',
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
    </>
  )
}
