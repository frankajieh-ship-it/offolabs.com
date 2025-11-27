import type { Product } from '../types'

// Constants for OFFO Labs

export const SITE_NAME = 'OFFO Labs'
export const SITE_DESCRIPTION = 'Innovative solutions for modern businesses'
export const SITE_URL = 'https://offolabs.com'

export const NAVIGATION_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/products', label: 'Products' },
  { href: '/ecosystem', label: 'Ecosystem' },
  { href: '/contact', label: 'Contact' },
] as const

export const FOOTER_LINKS = {
  product: [
    { label: 'Features', href: '#' },
    { label: 'Pricing', href: '#' },
    { label: 'Security', href: '#' },
    { label: 'Roadmap', href: '#' },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
    { label: 'Cookies', href: '#' },
  ],
} as const

// OFFO Labs Products
export const PRODUCTS: Product[] = [
  {
    id: 'codecrack',
    title: 'CodeCrack',
    description: 'AI-powered logic puzzle & duel game',
    status: 'Coming Soon',
    href: '/products/codecrack',
    features: [
      'Real-time multiplayer duels',
      'AI-powered puzzle generation',
      'Skill-based ranking system',
      'Cross-platform compatibility'
    ]
  },
  {
    id: 'renov-ai',
    title: 'Renov.AI',
    description: 'AI interior redesign + object detection',
    status: 'In Development',
    href: '/products/renov-ai',
    features: [
      'Real-time room visualization',
      'Object detection & recognition',
      'Design style recommendations',
      'AR preview capability'
    ]
  },
  {
    id: 'engine-acoustic-ai',
    title: 'Engine Acoustic AI',
    description: 'Predictive maintenance / belt diagnostics',
    status: 'In Development',
    href: '/products/engine-acoustic-ai',
    features: [
      'Acoustic anomaly detection',
      'Predictive failure analysis',
      'Real-time monitoring',
      'Integration with IoT sensors'
    ]
  },
  {
    id: 'offo-ai',
    title: 'OFFO AI',
    description: 'Multi-agent B2B AI automation platform',
    status: 'Coming Soon',
    href: '/products/offo-ai',
    features: [
      'Multi-agent orchestration',
      'Enterprise automation workflows',
      'Custom AI model training',
      'Advanced analytics & reporting'
    ]
  }
] as const

// OFFO Labs Value Pillars
export const OFFO_PILLARS = [
  {
    id: 'daily-life',
    title: 'Daily Life Automation',
    description: 'Intelligent tools that simplify everyday tasks through AI-powered automation.',
    icon: 'Zap'
  },
  {
    id: 'commerce',
    title: 'Commerce & Selling Tools',
    description: 'AI solutions designed to enhance e-commerce and streamline sales operations.',
    icon: 'ShoppingCart'
  },
  {
    id: 'engineering',
    title: 'Engineering Diagnostics',
    description: 'Predictive maintenance and anomaly detection for industrial equipment.',
    icon: 'Wrench'
  },
  {
    id: 'ai-agents',
    title: 'AI Agents & B2B Intelligence',
    description: 'Enterprise-grade multi-agent AI systems for complex business automation.',
    icon: 'Bot'
  }
] as const

// Investor Information
export const INVESTOR_INFO = {
  seedRound: 'Q1 2026',
  status: 'Opening',
  summary: 'AI ecosystem covering games, e-commerce, engineering diagnostics & agent automation',
  ctaText: 'Investor Overview',
  ctaHref: '/investors'
} as const
