'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: 'What does "pilot participant" mean? Is there a cost?',
      answer:
        'Pilot participants get free access to OFFO for the 8-week program in exchange for feedback and validation. There is no cost during the pilot. After the pilot, you can choose to continue with enterprise pricing or opt out.',
    },
    {
      question: 'How much time does the pilot require from my team?',
      answer:
        'Initial setup takes 2-3 hours (integration, training). Weekly time commitment is minimal: 15-minute executive summary review, bi-weekly 30-minute check-in calls. OFFO is designed to save time, not consume it.',
    },
    {
      question: 'What tools does OFFO integrate with?',
      answer:
        'OFFO integrates with Jira, GitHub, GitLab, PagerDuty, CircleCI, Jenkins, Datadog, Slack, and more. We support standard REST APIs and webhooks. Custom integrations can be built during the pilot if needed.',
    },
    {
      question: 'How is OFFO different from existing monitoring tools?',
      answer:
        'Traditional monitoring tools (Datadog, New Relic, PagerDuty) are reactive—they alert after problems occur. OFFO is predictive—it combines behavioral signals (pace, precision) with operational data to predict incidents 7-14 days in advance.',
    },
    {
      question: 'What if we don\'t meet the eligibility criteria exactly?',
      answer:
        'The criteria are guidelines, not hard requirements. If you have a smaller team (5-10 engineers) but complex operations, or unique industry needs, apply anyway. We evaluate each application individually.',
    },
    {
      question: 'What happens after the 8-week pilot?',
      answer:
        'You get a comprehensive ROI report showing incidents prevented, time saved, and risk reduction. You then decide: (1) Continue with enterprise deployment, (2) Extend pilot with additional teams, or (3) Opt out with no obligation.',
    },
    {
      question: 'How does OFFO protect our data?',
      answer:
        'OFFO is SOC2 Type II compliant, GDPR-compliant, and CCPA-compliant. Data is encrypted in transit and at rest. We never share customer data. You maintain full ownership and can request deletion at any time.',
    },
    {
      question: 'Can we see OFFO in action before applying?',
      answer:
        'Yes! Visit our Harmony Engine demo page to see OFFO\'s risk scoring in action with simulated data. We can also schedule a personalized demo with your team.',
    },
  ]

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-gray-700 max-w-4xl">
          Common questions about the OFFO pilot program
        </p>
      </motion.div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="text-lg font-semibold text-gray-900 pr-8">
                {faq.question}
              </span>
              <ChevronDown
                className={`h-5 w-5 text-gray-400 flex-shrink-0 transition-transform ${
                  openIndex === index ? 'transform rotate-180' : ''
                }`}
              />
            </button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
