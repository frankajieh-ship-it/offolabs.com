// Common types for OFFO Labs

export interface NavLink {
  href: string
  label: string
}

export interface Feature {
  id: string
  title: string
  description: string
  icon: React.ReactNode
}

export interface Testimonial {
  id: string
  author: string
  role: string
  content: string
  avatar?: string
}

export interface Service {
  id: string
  title: string
  description: string
  features: string[]
  price?: number
}

export type ProductStatus = 'Available' | 'In Development' | 'Coming Soon'

export interface Product {
  id: string
  title: string
  description: string
  status: ProductStatus
  href: string
  icon?: React.ReactNode
  features?: string[]
  fullDescription?: string
}
