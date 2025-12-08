'use client';

import Link from 'next/link';

interface Article {
  slug: string;
  title: string;
  description: string;
  author: string;
  readTime: string;
  date: string;
  tags: string[];
}

const articles: Article[] = [
  {
    slug: 'why-insurers-use-behavioral-risk-scoring',
    title: 'Why Insurers Use Behavioral Risk Scoring',
    description: 'Traditional underwriting relies on historical claims data — but what if you could predict risk before incidents occur? Learn how behavioral risk scoring is transforming insurance underwriting.',
    author: 'OFFO Labs',
    readTime: '5 min read',
    date: 'January 15, 2025',
    tags: ['Insurance', 'Underwriting', 'Risk Management']
  },
  {
    slug: 'how-compliance-teams-track-risk-in-real-time',
    title: 'How Compliance Teams Track Risk in Real Time',
    description: 'Compliance isn\'t just about passing audits — it\'s about preventing incidents. Discover how leading organizations are using real-time behavioral data to monitor compliance risk continuously.',
    author: 'OFFO Labs',
    readTime: '6 min read',
    date: 'January 10, 2025',
    tags: ['Compliance', 'Risk Management', 'Real-Time Analytics']
  },
  {
    slug: 'why-investors-back-safer-teams',
    title: 'Why Investors Back Safer Teams',
    description: 'Operational risk is startup risk. Smart investors are now using behavioral risk scores as part of their due diligence process to identify portfolio companies with strong operational foundations.',
    author: 'OFFO Labs',
    readTime: '4 min read',
    date: 'January 5, 2025',
    tags: ['Venture Capital', 'Due Diligence', 'Startups']
  }
];

export default function ArticlesPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header with Logo */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <Link href="/" className="inline-block">
            <img
              src="/OFFO_LAB_logo.png"
              alt="OFFO LAB"
              className="h-10 w-auto"
            />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            OFFO Insights
          </h1>
          <p className="text-xl text-gray-300">
            Thought leadership on behavioral risk intelligence, compliance technology, and predictive analytics.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <div className="max-w-6xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow group"
            >
              {/* Article Card Header */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 h-48 flex items-center justify-center">
                <svg className="w-16 h-16 text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>

              {/* Article Card Content */}
              <div className="p-6">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {article.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {article.description}
                </p>

                {/* Metadata */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{article.readTime}</span>
                  </div>
                </div>

                {/* Read More Link */}
                <div className="mt-4 flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                  <span>Read Article</span>
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Coming Soon Notice */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
          <svg className="w-12 h-12 text-blue-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <h3 className="text-xl font-bold text-gray-900 mb-2">More Articles Coming Soon</h3>
          <p className="text-gray-600 mb-4">
            We're publishing new insights on risk intelligence, compliance automation, and predictive analytics every week.
          </p>
          <Link
            href="/"
            className="inline-block text-blue-600 font-semibold hover:text-blue-700"
          >
            Subscribe to our newsletter →
          </Link>
        </div>

        {/* Back to Home Link */}
        <div className="text-center mt-8">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12 py-8">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src="/OFFO_LAB_logo.png"
                alt="OFFO LAB"
                className="h-8 w-auto opacity-60"
              />
              <p className="text-xs text-gray-600">
                © 2025 <span className="font-semibold">OFFO LAB</span>
              </p>
            </div>
            <div className="text-center sm:text-right">
              <p className="text-sm text-gray-600 font-medium">
                Powered by <span className="text-blue-600 font-bold">OFFO LAB</span> Risk Intelligence Engine · v1.0
              </p>
              <p className="text-xs text-red-600 font-semibold mt-1">
                Confidential
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
