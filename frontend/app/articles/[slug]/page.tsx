import Link from 'next/link';

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
    description: 'From Lagging Loss Models to Leading Behavioral Intelligence',
    author: 'OFFO Labs — Behavioral Risk Intelligence',
    readTime: '8 min read',
    date: 'January 15, 2025',
    tags: ['Insurance', 'Underwriting', 'Risk Management'],
    content: `
# Why Insurers Use Behavioral Risk Scoring
## From Lagging Loss Models to Leading Behavioral Intelligence

**OFFO Labs — Behavioral Risk Intelligence**

### Executive Summary

Insurance has always been a business of uncertainty.

For decades, insurers have managed that uncertainty by analyzing historical loss data, exposure classifications, and compliance artifacts. While this approach has worked for broad population risk, it is increasingly ineffective in modern, complex, and high-velocity operating environments.

Today's risk does not emerge suddenly.
It forms quietly, through small behavioral deviations that accumulate long before a claim is filed.

Behavioral risk scoring exists because insurers need earlier, more actionable signals of risk — signals that appear before loss, not after.

This paper explains:

- Why traditional loss-based models are structurally lagging
- Why behavioral signals precede claims
- Why insurers increasingly rely on behavioral risk scoring
- And how modern behavioral intelligence differs from legacy compliance scoring

## 1. The Structural Limits of Traditional Insurance Models

Traditional insurance underwriting relies on three primary inputs:

- Historical loss experience
- Exposure characteristics
- Periodic compliance or audit artifacts

These inputs are valuable — but they are inherently backward-looking.

### The Core Problem

Loss data tells insurers what has already happened, not what is forming.

In low-frequency, high-severity environments (industrial operations, logistics, energy, healthcare, large enterprises), this creates a dangerous blind spot:

**By the time losses appear in the data, the underlying risk has already matured.**

As operations become faster, more automated, and more distributed, the lag between risk formation and risk recognition continues to widen.

## 2. Risk Forms Before Loss — Always

Across industries, serious incidents are rarely sudden.

They are preceded by:

- Near-misses
- Minor failures
- Procedural shortcuts
- Training decay
- Oversight compression

These signals often exist for months or years before a claim.

Safety science, reliability engineering, and operational research consistently show the same pattern:

**Major losses sit at the end of a long chain of small, tolerated deviations.**

Traditional insurance models rarely capture this chain.

Behavioral risk scoring exists to measure the chain, not just the outcome.

## 3. Why Compliance Alone Is Not Enough

Many insurers have moved beyond pure loss data and now consider compliance signals:

- Training completion
- Audit outcomes
- Certifications
- Safety programs

This is a step forward — but still incomplete.

Why?

Because compliance is often:

- Periodic
- Binary (pass/fail)
- Self-reported
- Disconnected from day-to-day behavior

Compliance answers:
**"Did the organization meet requirements at a point in time?"**

It does not answer:
**"How is the organization actually behaving right now?"**

Behavioral risk scoring fills this gap.

## 4. Behavioral Risk: The Missing Leading Indicator

Behavioral risk scoring focuses on how work is actually performed, not just how it is documented.

It looks at:

- Procedural adherence trends
- Review and oversight behavior
- Training reinforcement or decay
- Near-miss and micro-failure clustering
- Output pressure relative to stability

These are leading indicators — not because they predict loss deterministically, but because they reveal trajectory.

**Insurers do not need perfect prediction.**
**They need earlier signal.**

## 5. Why Output Pressure Matters to Insurers

One of the strongest correlates of emerging risk is output pressure.

As organizations increase:

- Production speed
- Deployment velocity
- Workload intensity

They often experience:

- Compressed reviews
- Deferred training
- Tolerated shortcuts
- Increased rework and instability

This relationship does not need to be perfect to matter.

From an insurer's perspective:

**Sustained output pressure combined with behavioral drift indicates rising loss potential**

Even if no incident has occurred yet.

Behavioral risk scoring allows insurers to see when performance gains are eroding safety margins.

## 6. From Events to States: How Behavioral Risk Is Modeled

Traditional insurance models treat risk as event-based:

**Incident occurred → loss recorded → model updated**

Behavioral risk scoring treats risk as a state:

**Behavioral patterns shift → Deviations accumulate → Risk posture changes**

This distinction matters.

A system can move into a higher-risk state long before a claim exists.

By modeling risk as a state — rather than waiting for an event — insurers gain time:

- Time to adjust pricing
- Time to intervene
- Time to reduce loss severity

## 7. Why Insurers Can Trust Behavioral Risk Scoring

Modern behavioral risk intelligence differs fundamentally from opaque "AI scoring."

Key characteristics insurers require:

- **Explainability** — every change in risk posture is traceable to observable behavior
- **Auditability** — scores can be reconstructed and reviewed
- **Non-deterministic framing** — correlation and trajectory, not black-box prediction
- **Continuous updates** — not annual or quarterly snapshots

This makes behavioral risk scoring:

- Regulator-friendly
- Defensible in underwriting
- Suitable for portfolio-level risk management

## 8. What Behavioral Risk Scoring Enables for Insurers

When implemented correctly, behavioral risk scoring supports:

### Better Risk Selection

Identifying accounts whose behavioral trajectory is deteriorating — even if historical losses are low.

### More Accurate Pricing

Reflecting current operational reality, not stale loss data.

### Proactive Loss Prevention

Enabling early intervention before incidents occur.

### Stronger Client Relationships

Shifting from punitive post-loss action to collaborative risk improvement.

## 9. Behavioral Risk Is Not a Replacement — It Is an Upgrade

Behavioral risk scoring does not replace:

- Actuarial models
- Loss history
- Compliance reviews

It augments them.

It fills the gap between:

**What happened**
and
**What is forming**

For insurers operating in modern, high-velocity environments, that gap is where the greatest losses are born.

## Conclusion: Why Insurers Use Behavioral Risk Scoring

Insurers adopt behavioral risk scoring because:

- Loss data arrives too late
- Compliance is too static
- Modern operations change too fast
- Risk forms behaviorally before it materializes financially

Behavioral risk scoring provides early, explainable insight into how risk is evolving — while there is still time to act.

That is not speculation.
It is how resilient systems are managed.

---

### About OFFO Labs

OFFO Labs builds Behavioral Risk Intelligence systems that transform weak, distributed behavioral signals into real-time, explainable risk insight.

Our focus is not reporting what already happened —
but helping insurers and organizations see risk while it is forming.
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
    description: 'Operational Stability as a Hidden Driver of Valuation, Resilience, and Compounding Performance',
    author: 'OFFO Labs — Behavioral Risk Intelligence',
    readTime: '10 min read',
    date: 'January 5, 2025',
    tags: ['Venture Capital', 'Due Diligence', 'Portfolio Management'],
    content: `
# Why Investors Back Safer Teams
## Operational Stability as a Hidden Driver of Valuation, Resilience, and Compounding Performance

**OFFO Labs — Behavioral Risk Intelligence**

### At a Glance

This memo examines why leading institutional investors increasingly integrate behavioral risk scoring into their diligence and portfolio management workflows.

**Key Topics:**

- Why traditional financial and team metrics miss operational instability
- How behavioral drift compounds into long-term value destruction
- What the Pace vs Precision framework reveals about founder discipline
- Why operational risk scores predict exit readiness, not just safety compliance
- How investors use OFFO to derisk portfolios and protect capital

---

### Executive Summary

Venture capital and growth equity firms invest in teams, markets, and execution — but they often underestimate a critical risk variable:

**Operational stability.**

Operational instability doesn't announce itself.

It doesn't appear in pitch decks, cap tables, or P&L statements.

It forms slowly — in how a team manages tasks, how they respond to pressure, how they balance speed with precision.

Over time, unstable operations compound into:

- Missed commitments
- Preventable incidents
- Insurance problems
- Compliance failures
- Leadership turnover
- Fundraising delays
- Exit complications

For investors, operational instability is a silent tax on returns.

This memo explains:

- Why traditional diligence methods fail to detect operational risk
- How behavioral risk scoring exposes drift before it becomes crisis
- Why "safe" teams compound better than "fast" teams
- And how investors increasingly use behavioral intelligence as a competitive edge in deal flow, portfolio management, and exit planning

---

## 1. The Investor Problem: Traditional Metrics Miss Operational Drift

Institutional investors rely on well-established frameworks to assess companies:

**Financial Diligence:**
- Revenue, burn rate, margins, unit economics

**Market Diligence:**
- TAM, competitive dynamics, customer traction

**Team Diligence:**
- Founder experience, domain expertise, references

**Technical Diligence:**
- Product roadmap, IP, tech stack evaluation

These inputs are valuable.

But they share a common weakness:

**They are snapshot-based, not trajectory-based.**

They tell you where a company is today — not how it operates under pressure, not whether it's drifting toward instability, not whether it can scale safely.

### The Gap: Behavioral Risk

Operational risk doesn't show up in financial models.

It shows up in:

- Task completion rates declining over time
- Training cycles being skipped
- Incident response becoming reactive rather than proactive
- Documentation falling behind actual operations
- Leadership prioritizing speed over precision

These signals are behavioral.

And they precede financial deterioration — often by months or years.

**Behavioral risk is a leading indicator of future financial risk.**

Investors who cannot measure behavioral risk are investing blind.

---

## 2. How Drift Happens: The Compounding Mechanism

Operational drift is not a single event.

It is a slow accumulation of small compromises that, individually, seem rational but collectively destabilize the organization.

### The Drift Sequence

**Stage 1: Pressure**
- Growth targets increase
- Timelines compress
- Resources stay flat

**Stage 2: Trade-offs**
- "We'll document this later"
- "Training can wait until next quarter"
- "We don't need a safety protocol for that yet"

**Stage 3: Normalization**
- Shortcuts become standard practice
- Team stops noticing deviations
- "This is just how we operate now"

**Stage 4: Accumulation**
- Undocumented processes multiply
- Training gaps widen
- Risk exposure grows silently

**Stage 5: Crisis**
- Incident occurs
- Regulatory scrutiny
- Insurance complications
- Leadership distraction
- Valuation impact

By the time drift reaches Stage 5, the damage is done.

Investors who only see Stage 5 never understood Stages 1-4.

**Behavioral risk scoring measures drift in real-time — across all stages.**

---

## 3. Why This Matters to Investors: Portfolio Lens

From a portfolio perspective, behavioral risk compounds in three critical ways:

### 3.1 Valuation Erosion

Companies with unstable operations face:

- Higher insurance premiums (15-40% markup)
- Regulatory fines and legal settlements
- Reputational damage affecting customer trust
- Difficulty recruiting senior leadership
- Lower multiples at exit due to operational concerns

**Acquirers and public market investors heavily discount companies with operational instability.**

### 3.2 Exit Complications

When preparing for acquisition or IPO, operational diligence becomes critical:

- Acquirers audit compliance history
- Public companies face heightened regulatory scrutiny
- Insurance underwriters require operational data
- Legal counsel reviews incident records

Companies with poor behavioral risk profiles face:

- Extended due diligence timelines
- Reduced offer valuations
- Deal structure complications (escrows, earnouts, reps & warranties)
- Or worst case: deal termination

**Exit readiness is operational readiness.**

### 3.3 Capital Efficiency

Operationally unstable companies burn capital faster:

- Preventable incidents require crisis response
- Regulatory issues consume leadership bandwidth
- Insurance problems delay fundraising
- Customer churn from operational failures

Investors in these companies face:

- Unplanned bridge rounds
- Down rounds
- Dilution
- Write-downs

**Safe teams compound capital more efficiently than fast teams.**

---

## 4. The Pace vs Precision Framework: What It Reveals About Founders

OFFO's Pace vs Precision framework measures two behavioral dimensions:

### Pace (Output Pressure)
- How fast is the team moving?
- Are deadlines compressing?
- Is throughput accelerating?

### Precision (Execution Quality)
- Are tasks being completed correctly?
- Is documentation kept current?
- Are protocols being followed?

The relationship between these two dimensions reveals founder discipline:

**High Pace + High Precision:**
- Disciplined execution under pressure
- Scalable operations
- Low behavioral risk

**High Pace + Low Precision:**
- Drift in progress
- Unsustainable velocity
- Elevated behavioral risk

**Low Pace + Low Precision:**
- Stagnation or disengagement
- Operational decay
- High behavioral risk

**Low Pace + High Precision:**
- Deliberate execution
- Strong operational foundation
- Low behavioral risk (but growth questions)

**For investors, the Pace vs Precision profile is as important as the P&L.**

It reveals:

- Whether the team can scale safely
- Whether growth is sustainable or reckless
- Whether leadership prioritizes long-term resilience or short-term optics

---

## 5. How Investors Use Behavioral Risk Scoring

Leading institutional investors use OFFO across three stages:

### 5.1 Pre-Investment Diligence

**Questions OFFO Answers:**

- Does this company have operational discipline, or just good metrics today?
- Will they be insurable as they scale?
- Is leadership managing for sustainable growth or just hitting milestones?
- Are there hidden operational risks that will surface post-investment?

**Use Case:**

A growth equity firm evaluating two logistics companies with similar financials. Company A has an OFFO score of 72; Company B has an OFFO score of 54.

The firm invests in Company A.

18 months later:

- Company A raises a Series C at a 3x markup
- Company B faces regulatory issues, insurance complications, and a down round

**Behavioral risk scoring provided signal that financials alone did not.**

### 5.2 Portfolio Monitoring

**Questions OFFO Answers:**

- Is operational maturity improving or deteriorating?
- Are there early warning signs of drift?
- Which portfolio companies need operational support?

**Use Case:**

A venture firm tracks OFFO scores quarterly across 40 portfolio companies.

One company's score drops from 68 to 52 over two quarters.

The firm intervenes early:

- Adds operational advisor to board
- Implements structured task management
- Requires quarterly safety and compliance reviews

The score recovers to 71 within 6 months, preventing a potential crisis.

**Behavioral risk monitoring enables proactive portfolio management.**

### 5.3 Exit Planning

**Questions OFFO Answers:**

- Is this company ready for acquisition due diligence?
- Will operational issues complicate the exit process?
- What remediation is needed before going to market?

**Use Case:**

A private equity firm preparing a manufacturing portfolio company for sale.

OFFO identifies gaps in:

- Training documentation
- Incident reporting workflows
- Compliance audit trails

The firm invests 4 months remediating these gaps before launching the sale process.

Result:

- Clean operational diligence
- No post-LOI surprises
- 12% higher valuation vs comparable exits

**Exit readiness = operational readiness.**

---

## 6. What Smart Investors Ask During Diligence

Forward-thinking investors now incorporate behavioral risk questions into their diligence process:

### Operational Discipline

- What is your current OFFO Risk Score?
- How has it trended over the past 12 months?
- What is your task completion rate?
- How do you track training compliance?

### Incident Management

- How many incidents have occurred in the past 24 months?
- How do you investigate and document incidents?
- What is your protocol for near-miss reporting?

### Leadership Philosophy

- How do you balance speed and precision?
- What happens when deadlines conflict with protocol?
- How do you measure operational maturity beyond compliance?

### Insurance & Compliance

- What is your current insurance posture?
- Have you faced underwriting challenges?
- Are you audit-ready at all times?

**These questions separate operationally mature companies from those coasting on momentum.**

---

## 7. The Competitive Advantage: Why Behavioral Intelligence Matters

Investors who integrate behavioral risk scoring gain several competitive advantages:

### Better Deal Selection

- Avoid companies with hidden operational risk
- Identify founders with sustainable execution discipline
- Reduce portfolio blow-up risk

### Faster Diligence

- Objective, data-driven operational assessment
- Reduce reliance on subjective references
- Accelerate decision timelines

### Stronger Portfolio Management

- Early warning system for drift
- Data-driven operational support
- Proactive crisis prevention

### Higher Exit Multiples

- Companies with strong OFFO scores achieve cleaner exits
- Operational maturity increases acquirer confidence
- Fewer post-LOI complications

**In competitive markets, behavioral intelligence is an edge.**

---

## 8. Real-World Portfolio Example

A multi-stage venture firm managing 60 companies began tracking OFFO scores in 2023.

**Findings:**

- Companies with OFFO scores >75 had 40% lower incident rates
- Companies with improving OFFO trajectories raised follow-on rounds 6 months faster
- Companies with declining OFFO scores (>10 point drop in 6 months) faced operational crises within 12 months in 80% of cases

**The firm now requires quarterly OFFO reporting from all portfolio companies.**

They treat operational risk as seriously as financial burn.

---

## 9. Why "Safe" Teams Outperform "Fast" Teams

The venture narrative often celebrates speed:

- "Move fast and break things"
- "Blitzscaling"
- "Growth at all costs"

But the data tells a different story:

**Safe teams compound better over time.**

Why?

- They avoid preventable crises
- They scale sustainably
- They retain institutional knowledge
- They build trust with customers, employees, and regulators
- They are exit-ready when opportunities arise

**Investors who back safe teams achieve more consistent returns with lower volatility.**

---

## 10. Conclusion: Operational Stability Is Investment Strategy

Behavioral risk is not a compliance issue.

It is a strategic investment issue.

Investors who ignore operational stability are:

- Overvaluing risky companies
- Missing early warning signals of portfolio deterioration
- Accepting unnecessary risk in their portfolios
- Reducing exit optionality

Investors who integrate behavioral risk scoring are:

- Selecting better companies
- Managing portfolios proactively
- Protecting capital from preventable losses
- Achieving cleaner, higher-value exits

**Operational stability is a competitive advantage.**

And in competitive markets, advantages matter.

---

### About OFFO Labs

OFFO Labs provides real-time behavioral risk intelligence for enterprises, insurers, and institutional investors.

Our Harmony Engine™ analyzes operational signals — task completion, training compliance, incident patterns — to generate predictive risk scores that inform underwriting, portfolio management, and strategic decision-making.

**For Investors:**
- Pre-investment diligence support
- Portfolio-wide risk monitoring
- Exit readiness assessment

[Learn more about institutional access →](/pilot)
    `
  }
};

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
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
