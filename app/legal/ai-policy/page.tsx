import { Metadata } from 'next'
import MainLayout from '@/components/layouts/MainLayout'
import LegalPageLayout from '@/components/layouts/LegalPageLayout'

export const metadata: Metadata = {
  title: 'AI Policy | OFFO Labs',
  description: 'Learn about OFFO Labs AI policy, model limitations, and our commitment to responsible AI development and deployment.',
  keywords: ['AI policy', 'AI compliance', 'machine learning', 'responsible AI'],
}

export default function AIPolicyPage() {
  const lastUpdated = 'November 23, 2024'

  return (
    <MainLayout>
      <LegalPageLayout
        title="AI Policy"
        lastUpdated={lastUpdated}
        analyticsEvent="legal_ai_policy_viewed"
      >
        <section className="space-y-8">
          {/* 1. Introduction */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              1. Our AI Commitment
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                OFFO Labs builds practical AI solutions that serve real users and real business needs. This policy outlines our commitment to responsible, transparent, and ethical AI development and deployment.
              </p>
              <p>
                We believe AI should be trustworthy, explainable, and designed with clear human oversight. This document describes how we design, test, deploy, and monitor our AI systems.
              </p>
            </div>
          </div>

          {/* 2. How OFFO Uses AI */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              2. How OFFO Uses AI
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Engine Acoustic AI
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Acoustic analysis of rotating machinery for predictive diagnostics</li>
                <li>Anomaly detection in engine and equipment performance</li>
                <li>Pattern recognition from non-OEM acoustic datasets</li>
                <li>Risk scoring and maintenance recommendations</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6">
                OFFO AI Agents
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Business process automation and workflow optimization</li>
                <li>Data analysis and insights generation</li>
                <li>Document understanding and processing</li>
                <li>Decision support systems for non-critical workflows</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6">
                What We Don't Use AI For
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Autonomous decision-making in critical systems without human review</li>
                <li>Hiring or employment decisions (without explicit human review)</li>
                <li>Credit or loan decisions</li>
                <li>Facial recognition or mass surveillance</li>
                <li>Manipulation or deception</li>
              </ul>
            </div>
          </div>

          {/* 3. AI Model Limitations */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              3. AI Model Limitations
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                All AI models have limitations. We are transparent about what our systems can and cannot do.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Technical Limitations
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Models are trained on historical data and may not predict future anomalies</li>
                <li>Performance varies based on data quality, quantity, and relevance</li>
                <li>Models can exhibit bias if training data is biased or unrepresentative</li>
                <li>Out-of-distribution inputs may produce unreliable outputs</li>
                <li>Confidence scores should be treated as probability estimates, not certainties</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6">
                Contextual Limitations
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Models operate within specific domains and may not generalize</li>
                <li>Real-world scenarios may not match training environments</li>
                <li>Adversarial examples and edge cases may confuse models</li>
                <li>Human expertise and judgment are irreplaceable</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6">
                User Responsibilities
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Understand that AI outputs are probabilistic, not deterministic</li>
                <li>Validate AI recommendations with domain expertise</li>
                <li>Use AI as a decision support tool, not a replacement for human judgment</li>
                <li>Report unexpected or suspicious outputs immediately</li>
              </ul>
            </div>
          </div>

          {/* 4. Model Behavior and Disclaimers */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              4. Model Behavior and Disclaimers
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Accuracy and Performance
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Accuracy metrics are published with clear methodology and caveats</li>
                <li>Performance degrades gracefully outside the training domain</li>
                <li>Regular testing ensures model quality over time</li>
                <li>False positive and false negative rates are disclosed</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6">
                Bias and Fairness
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>We actively test for and mitigate bias in training data</li>
                <li>Models are evaluated for disparate impact across groups</li>
                <li>We acknowledge known limitations in fairness</li>
                <li>Users are informed of potential sources of bias</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6">
                Output Reliability
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Models should not be treated as ground truth</li>
                <li>Outputs should be interpreted by qualified professionals</li>
                <li>Confidence scores indicate model certainty, not ground truth probability</li>
                <li>Always verify critical outputs through independent means</li>
              </ul>
            </div>
          </div>

          {/* 5. Responsibility and Human Oversight */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              5. Responsibility and Human Oversight
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Governance
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>All AI systems have designated owners and oversight</li>
                <li>Regular review cycles ensure continued safety and effectiveness</li>
                <li>Clear escalation procedures for flagged or unusual outputs</li>
                <li>Documented decision-making for model updates and changes</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6">
                Human-in-the-Loop
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Critical decisions always require human review</li>
                <li>Users can easily escalate AI recommendations to human experts</li>
                <li>Feedback mechanisms allow humans to correct AI mistakes</li>
                <li>Systems are designed for interpretability and transparency</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6">
                Accountability
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>OFFO Labs is responsible for AI system performance and safety</li>
                <li>We maintain logs of all AI decisions for audit purposes</li>
                <li>Users are informed of the AI-assisted nature of recommendations</li>
                <li>Liability for AI-based decisions remains with humans who act on them</li>
              </ul>
            </div>
          </div>

          {/* 6. Safety and Monitoring */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              6. Safety and Monitoring
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Continuous Monitoring
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>AI systems are monitored in real-time for performance degradation</li>
                <li>Drift detection alerts when model behavior changes</li>
                <li>Automated rollback procedures for systems that fail safety checks</li>
                <li>Regular A/B testing compares AI performance against baselines</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6">
                Testing and Validation
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Adversarial testing to identify robustness issues</li>
                <li>Edge case testing for unusual scenarios</li>
                <li>Fairness and bias audits before deployment</li>
                <li>Third-party audits for critical systems</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6">
                Incident Response
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Clear procedures for reporting AI-related incidents</li>
                <li>Immediate investigation of reported safety concerns</li>
                <li>Rapid remediation and communication to affected users</li>
                <li>Post-incident analysis to prevent recurrence</li>
              </ul>
            </div>
          </div>

          {/* 7. Data and Model Governance */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              7. Data and Model Governance
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Training Data
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Data quality and representativeness are critical to model performance</li>
                <li>Training data sources are documented and validated</li>
                <li>Regular audits ensure data integrity and appropriateness</li>
                <li>Users have the right to understand data sources for model predictions</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6">
                Model Updates
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Model updates follow a structured change management process</li>
                <li>Users are notified of significant model changes</li>
                <li>Updates are tested thoroughly before production deployment</li>
                <li>Rollback capability is maintained for problematic updates</li>
              </ul>
            </div>
          </div>

          {/* 8. Updates to This Policy */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              8. Updates to This Policy
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                As AI technology evolves and our practices improve, we will update this policy. Material changes will be communicated to users. We encourage you to review this policy regularly.
              </p>
              <p>
                We welcome feedback on our AI practices. If you have concerns about how we use AI, please contact us.
              </p>
            </div>
          </div>

          {/* 9. Contact Information */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              9. Contact Information
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                For questions about our AI practices or to report AI-related concerns:
              </p>
              <ul className="list-none space-y-2 ml-4">
                <li>Email: ai@offodlabs.com</li>
                <li>Legal: legal@offodlabs.com</li>
                <li>Website: www.offodlabs.com</li>
              </ul>
            </div>
          </div>
        </section>
      </LegalPageLayout>
    </MainLayout>
  )
}