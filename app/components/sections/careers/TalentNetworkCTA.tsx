'use client'

export default function TalentNetworkCTA() {
  return (
    <button
      onClick={() => {
        const newsletter = document.getElementById('newsletter')
        if (newsletter) {
          newsletter.scrollIntoView({ behavior: 'smooth' })
        } else {
          window.location.hash = '#newsletter'
        }
      }}
      className="inline-block px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
    >
      Join Talent Network
    </button>
  )
}
