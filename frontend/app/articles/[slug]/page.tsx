'use client';

import Link from 'next/link';
import { use } from 'react';

interface ArticleContent {
  title: string;
  description: string;
  author: string;
  readTime: string;
  date: string;
  tags: string[];
  content: string;
}

const articleDatabase: Record<string, ArticleContent> = {
  'why-insurers-use-behavioral-risk-scoring': {
    title: 'Why Insurers Use Behavioral Risk Scoring',
    description: 'Traditional underwriting relies on historical claims data — but what if you could predict risk before incidents occur?',
    author: 'OFFO Labs',
    readTime: '5 min read',
    date: 'January 15, 2025',
    tags: ['Insurance', 'Underwriting', 'Risk Management'],
    content: `
# Why Insurers Use Behavioral Risk Scoring

Traditional underwriting relies heavily on historical claims data, industry benchmarks, and retrospective risk assessments. While these methods have served the insurance industry for decades, they share a critical limitation: **they look backward, not forward**.

## The Problem with Reactive Risk Assessment

When underwriters evaluate a potential policyholder, they typically examine:
- Past claims history
- Industry loss ratios
- Credit scores and financial stability
- Physical site inspections

This approach works reasonably well for identifying obvious risks, but it misses a crucial dimension: **behavioral indicators** that predict future incidents before they occur.

## Enter Behavioral Risk Scoring

Behavioral risk scoring analyzes real-time operational data to identify patterns that correlate with future risk:

### 1. Task Completion Patterns (40% Weight)
Organizations that consistently complete safety tasks on time demonstrate operational discipline. Late or missed tasks signal potential compliance gaps that could lead to incidents.

### 2. Training Engagement (30% Weight)
Employee training isn't just a compliance checkbox — it's a leading indicator of risk awareness. Organizations with high training completion rates and frequent refresher courses show measurably lower incident rates.

### 3. Documentation Quality (30% Weight)
Complete, accurate, and timely documentation reflects organizational maturity. Poor documentation quality often precedes operational failures.

## Real-World Impact

Early adopters of behavioral risk scoring report:
- **15-25% reduction in loss ratios** within the first year
- **Faster underwriting decisions** with objective data backing intuition
- **Better policyholder relationships** through data-driven feedback and improvement recommendations

## The Future of Underwriting

Behavioral risk scoring doesn't replace traditional underwriting — it enhances it. By combining historical data with forward-looking behavioral indicators, insurers can:

- Identify high-risk accounts before renewal
- Offer dynamic pricing based on real-time risk posture
- Provide value-added services that help policyholders improve their risk profiles

As the insurance industry continues to evolve, behavioral risk intelligence is becoming a competitive necessity, not a nice-to-have.

---

**Want to learn more?** [Download our methodology whitepaper](/methodology) or [join our pilot program](/pilot).
    `
  },
  'how-compliance-teams-track-risk-in-real-time': {
    title: 'How Compliance Teams Track Risk in Real Time',
    description: 'Compliance isn\'t just about passing audits — it\'s about preventing incidents.',
    author: 'OFFO Labs',
    readTime: '6 min read',
    date: 'January 10, 2025',
    tags: ['Compliance', 'Risk Management', 'Real-Time Analytics'],
    content: `
# How Compliance Teams Track Risk in Real Time

For most organizations, compliance is synonymous with annual audits, quarterly reviews, and checkbox exercises. But this reactive approach leaves a critical gap: **What happens between audits?**

## The Audit Cycle Problem

Traditional compliance programs follow a predictable pattern:
1. **Audit preparation** (scramble to gather documentation)
2. **Audit execution** (external reviewers assess compliance)
3. **Remediation** (fix identified issues)
4. **Return to business as usual** (until next audit)

The problem? Risk doesn't wait for audit cycles. Incidents happen when nobody's watching.

## Real-Time Compliance Monitoring

Leading organizations are shifting from periodic audits to **continuous compliance monitoring**:

### Daily Task Tracking
Instead of reviewing safety checklists once a month, real-time systems track completion rates daily:
- Which tasks are consistently late?
- Which departments have the lowest completion rates?
- Are high-risk tasks being prioritized appropriately?

### Training Currency Dashboard
Compliance teams can now see training status across the organization in real time:
- Who has certifications expiring in the next 30 days?
- Which teams have the lowest training completion rates?
- Are new hires completing onboarding training on schedule?

### Documentation Completeness Metrics
Real-time scoring identifies documentation gaps before they become audit findings:
- Missing required fields in safety reports
- Incomplete incident investigations
- Outdated standard operating procedures

## The Behavioral Risk Score Advantage

The OFFO Risk Score aggregates these real-time signals into a single, actionable metric:

**Low Risk (80-100):** Strong compliance culture, proactive risk management
**Moderate Risk (50-79):** Some gaps identified, corrective action recommended
**High Risk (0-49):** Critical deficiencies, immediate intervention required

## Case Study: Construction Contractor

A mid-sized construction firm implemented real-time compliance monitoring and saw:
- **40% reduction in overdue safety tasks** within 60 days
- **Zero critical audit findings** in their next compliance review
- **25% fewer workplace incidents** year-over-year

The key? Visibility. When compliance teams can see risk building in real time, they can intervene before problems escalate.

## Getting Started

Implementing real-time compliance monitoring doesn't require a massive technology overhaul:

1. **Identify key metrics** (task completion, training status, documentation quality)
2. **Establish data collection** (integrate with existing LMS and task management systems)
3. **Set baseline scores** (understand your current state)
4. **Monitor trends** (watch for degradation over time)
5. **Intervene proactively** (address issues before they become incidents)

Real-time compliance isn't just about avoiding audit findings — it's about building a culture where risk is managed continuously, not just during audit season.

---

**Ready to implement real-time compliance monitoring?** [Contact our team](/pilot) to learn more.
    `
  },
  'why-investors-back-safer-teams': {
    title: 'Why Investors Back Safer Teams',
    description: 'Operational risk is startup risk. Smart investors are now using behavioral risk scores as part of their due diligence process.',
    author: 'OFFO Labs',
    readTime: '4 min read',
    date: 'January 5, 2025',
    tags: ['Venture Capital', 'Due Diligence', 'Startups'],
    content: `
# Why Investors Back Safer Teams

When evaluating startup investments, VCs traditionally focus on market size, product-market fit, and team pedigree. But there's a hidden risk factor that many investors overlook: **operational maturity**.

## The Hidden Risk in High-Growth Startups

Startups move fast — sometimes too fast. In the rush to scale, operational fundamentals often get deprioritized:
- Safety protocols are "good enough for now"
- Compliance tasks are handled reactively
- Training programs are minimal or non-existent
- Documentation is incomplete or missing entirely

These shortcuts create **operational debt** that compounds over time, leading to:
- Workplace incidents and legal liability
- Regulatory violations and fines
- Reputational damage
- Difficulty securing insurance coverage
- Challenges scaling operations

## Behavioral Risk as a Due Diligence Signal

Forward-thinking investors are now incorporating **behavioral risk scores** into their due diligence process:

### Pre-Investment Screening
Before committing capital, investors can assess:
- Does this startup have basic operational discipline?
- Are they managing compliance proactively or reactively?
- Will they be insurable as they scale?

### Portfolio Monitoring
After investment, behavioral risk scores provide ongoing visibility:
- Is operational maturity improving over time?
- Are there early warning signs of potential incidents?
- Where should the startup focus operational improvements?

### Exit Planning
When preparing for acquisition or IPO, operational maturity matters:
- Acquirers conduct operational due diligence
- Public companies face regulatory scrutiny
- Strong compliance posture increases valuation

## The Competitive Advantage

Startups with strong behavioral risk scores demonstrate:
- **Operational discipline** that scales
- **Leadership maturity** beyond product development
- **Reduced insurance premiums** (15-30% lower in some cases)
- **Faster fundraising** with objective proof of operational maturity

## What Investors Look For

Key indicators of operational maturity:
1. **Consistent task completion** (>90% on-time rate)
2. **Proactive training culture** (regular refreshers, not just onboarding)
3. **Documentation hygiene** (complete, accurate, accessible)
4. **Incident response** (clear protocols, thorough investigations)

## Real-World Example

A Series B logistics startup improved their OFFO Risk Score from 62 to 87 over 12 months by:
- Implementing structured safety task management
- Launching a quarterly training program
- Digitalizing their documentation workflows

The result? Their Series C lead investor cited "operational excellence" as a key differentiator in their investment thesis.

## The Bottom Line

Operational risk is investment risk. Startups that manage compliance and safety proactively demonstrate the kind of operational discipline that scales — and smart investors are taking notice.

---

**Are you an investor or startup founder?** [Learn more about pilot access](/pilot).
    `
  }
};

export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const article = articleDatabase[slug];

  if (!article) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <Link href="/articles" className="text-blue-600 hover:text-blue-700 font-semibold">
            ← Back to Articles
          </Link>
        </div>
      </main>
    );
  }

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

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-8 py-12">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/articles" className="text-sm text-blue-600 hover:text-blue-700 font-semibold">
            ← Back to Articles
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-8">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-blue-50 text-blue-600 text-sm font-semibold rounded"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            {article.title}
          </h1>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>{article.author}</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{article.date}</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{article.readTime}</span>
            </div>
          </div>
        </header>

        {/* Article Body */}
        <div className="prose prose-lg prose-blue max-w-none">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 sm:p-12">
            {article.content.split('\n').map((paragraph, idx) => {
              if (paragraph.trim().startsWith('# ')) {
                return <h1 key={idx} className="text-3xl font-bold text-gray-900 mt-8 mb-4">{paragraph.replace('# ', '')}</h1>;
              } else if (paragraph.trim().startsWith('## ')) {
                return <h2 key={idx} className="text-2xl font-bold text-gray-900 mt-6 mb-3">{paragraph.replace('## ', '')}</h2>;
              } else if (paragraph.trim().startsWith('### ')) {
                return <h3 key={idx} className="text-xl font-bold text-gray-900 mt-4 mb-2">{paragraph.replace('### ', '')}</h3>;
              } else if (paragraph.trim().startsWith('- ')) {
                return <li key={idx} className="text-gray-700 ml-6">{paragraph.replace('- ', '')}</li>;
              } else if (paragraph.trim().startsWith('**') && paragraph.trim().endsWith('**')) {
                return <p key={idx} className="font-bold text-gray-900 mb-3">{paragraph.replace(/\*\*/g, '')}</p>;
              } else if (paragraph.trim() === '---') {
                return <hr key={idx} className="my-8 border-gray-300" />;
              } else if (paragraph.trim()) {
                return <p key={idx} className="text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-600 hover:text-blue-700 font-semibold">$1</a>') }} />;
              }
              return null;
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-blue-600 rounded-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Risk Intelligence?</h3>
          <p className="text-blue-100 mb-6">
            Join the pilot program and experience behavioral risk scoring firsthand.
          </p>
          <Link
            href="/pilot"
            className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-all transform hover:scale-105 shadow-xl"
          >
            Join Pilot Program
          </Link>
        </div>
      </article>

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
