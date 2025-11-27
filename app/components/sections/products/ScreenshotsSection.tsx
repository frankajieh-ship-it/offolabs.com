import React from 'react'

export default function ScreenshotsSection() {
  return (
    <section className="py-20 lg:py-28 bg-gray-50 dark:bg-gray-900/50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            See CodeCrack in Action
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore the interface and experience the game yourself
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: 'Challenge Selection', desc: 'Browse 1000+ challenges' },
            { title: 'Code Editor', desc: 'Real-time code execution' },
            { title: 'Leaderboard', desc: 'Compete globally' },
          ].map((item, index) => (
            <div key={index} className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow">
              <div className="aspect-[9/16] bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="text-4xl mb-2">📱</div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-blue-100">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-8">
          Screenshots coming soon. Download the beta to see CodeCrack now.
        </p>
      </div>
    </section>
  )
}
