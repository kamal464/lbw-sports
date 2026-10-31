import { brand, stores } from '@/lib/stores'

export function JsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SportsActivityLocation',
        '@id': 'https://lbwsports.in/#organization',
        name: brand.name,
        alternateName: brand.shortName,
        url: 'https://lbwsports.in',
        logo: 'https://lbwsports.in/brand/lbw-logo.png',
        image: 'https://lbwsports.in/gear/hero-gear.jpg',
        email: brand.email,
        sameAs: [brand.instagram],
        slogan: 'Play to live fit',
        areaServed: ['Hanamkonda', 'Mancherial', 'Telangana', 'India'],
        contactPoint: stores.map((store) => ({
          '@type': 'ContactPoint',
          telephone: store.phoneTel,
          contactType: 'customer service',
          areaServed: store.city,
          availableLanguage: ['en', 'te', 'hi'],
        })),
      },
      ...stores.map((store) => ({
        '@type': 'SportsStore',
        '@id': `https://lbwsports.in/#store-${store.city.toLowerCase()}`,
        name: `${brand.shortName} ${store.city}`,
        description: `${brand.name} in ${store.city} — cricket, football, badminton, fitness and teamwear. Enquire on WhatsApp.`,
        url: 'https://lbwsports.in/contact',
        image: 'https://lbwsports.in/gear/hero-gear.jpg',
        telephone: store.phoneTel,
        email: brand.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: store.address,
          addressLocality: store.city,
          addressRegion: 'Telangana',
          addressCountry: 'IN',
        },
        openingHours: 'Mo-Su 10:30-22:00',
        parentOrganization: { '@id': 'https://lbwsports.in/#organization' },
      })),
      {
        '@type': 'WebSite',
        '@id': 'https://lbwsports.in/#website',
        url: 'https://lbwsports.in',
        name: brand.name,
        description:
          'Cricket, football, badminton, fitness and sportswear from LBW Sports Shop in Hanamkonda and Mancherial. Enquire on WhatsApp.',
        publisher: { '@id': 'https://lbwsports.in/#organization' },
        inLanguage: 'en-IN',
      },
    ],
  }

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  )
}
