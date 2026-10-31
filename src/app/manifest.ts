import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'LBW Sports Shop',
    short_name: 'LBW Sports',
    description:
      'Cricket and multi-sport gear from LBW Sports Shop in Hanamkonda and Mancherial. Enquire on WhatsApp.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1c2f7a',
    icons: [
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
