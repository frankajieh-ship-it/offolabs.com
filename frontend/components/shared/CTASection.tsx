import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CTAAction {
  label: string
  href: string
  variant?: 'default' | 'outline'
}

interface CTASectionProps {
  title: string
  description: string
  primaryAction: CTAAction
  secondaryAction?: CTAAction
}

export default function CTASection({
  title,
  description,
  primaryAction,
  secondaryAction,
}: CTASectionProps) {
  return (
    <section className="rounded-2xl bg-gradient-to-r from-gray-900 to-gray-800 p-8 md:p-12">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">
          {title}
        </h2>
        <p className="text-xl md:text-2xl text-white mb-8 leading-relaxed">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="!bg-white !text-gray-900 hover:!bg-gray-100 font-bold">
            <Link href={primaryAction.href} className="!text-gray-900">
              {primaryAction.label}
              <ArrowRight className="ml-2 h-4 w-4 !text-gray-900" />
            </Link>
          </Button>

          {secondaryAction && (
            <Button asChild size="lg" variant="outline" className="!border-2 !border-white !text-white hover:!bg-white hover:!text-gray-900 font-semibold">
              <Link href={secondaryAction.href}>
                {secondaryAction.label}
              </Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
