import { stores } from '@/lib/stores'

const DEFAULT = stores[0].whatsapp

export function whatsappUrl(message?: string) {
  const text =
    message ??
    'Hi LBW Sports! I want to enquire about sports gear available in your store.'
  return `https://wa.me/${DEFAULT}?text=${encodeURIComponent(text)}`
}

export function enquireProductUrl(productName: string) {
  return whatsappUrl(
    `Hi LBW Sports! I'd like to enquire about "${productName}". Please confirm what you have in stock.`,
  )
}
