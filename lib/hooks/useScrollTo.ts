'use client'

import { useCallback } from 'react'

interface ScrollOptions {
  behavior?: 'smooth' | 'auto'
  block?: 'start' | 'center' | 'end' | 'nearest'
  inline?: 'start' | 'center' | 'end' | 'nearest'
  offset?: number
  focus?: boolean
}

/**
 * Custom hook for smooth scrolling to elements with automatic sticky header offset
 * @returns A function that scrolls to an element by ID with optional offset
 */
export function useScrollTo() {
  return useCallback((elementId: string, options: ScrollOptions = {}) => {
    const element = document.getElementById(elementId)
    if (!element) {
      console.warn(`Element with id "${elementId}" not found`)
      return
    }

    // Calculate sticky header offset
    const stickyOffset = options.offset !== undefined ? options.offset : calculateStickyHeaderOffset()

    // Get element position
    const elementTop = element.getBoundingClientRect().top + window.scrollY

    // Scroll with offset
    window.scrollTo({
      top: elementTop - stickyOffset,
      behavior: options.behavior || 'smooth',
    })

    // Focus element for accessibility (default true)
    if (options.focus !== false) {
      if (element.tagName !== 'FORM' && !element.hasAttribute('tabindex')) {
        element.setAttribute('tabindex', '-1')
      }
      element.focus({ preventScroll: true })
    }
  }, [])
}

/**
 * Calculate the total height of sticky/fixed elements at the top of the viewport
 * This accounts for headers and other sticky elements that need offset
 */
function calculateStickyHeaderOffset(): number {
  let offset = 0

  // Check for elements with sticky or fixed positioning
  const elements = document.querySelectorAll('[class*="sticky"], [class*="fixed"]')

  elements.forEach((element) => {
    const style = window.getComputedStyle(element)
    const isSticky = style.position === 'sticky' || style.position === 'fixed'

    if (isSticky) {
      const rect = element.getBoundingClientRect()
      // Only count elements that are at or near the top of the viewport
      if (rect.top <= 0 && rect.bottom > 0) {
        offset += rect.height
      }
    }
  })

  // Add 16px padding for visual separation
  return offset + 16
}