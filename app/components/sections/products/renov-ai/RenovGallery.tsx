import React from 'react'

export default function RenovGallery() {
  const beforeAfter = [
    {
      title: 'Minimalist Living Room',
      description: 'Clean lines and neutral tones',
    },
    {
      title: 'Cozy Bedroom',
      description: 'Warm textures and soft lighting',
    },
    {
      title: 'Modern Kitchen',
      description: 'Sleek finishes and smart storage',
    },
    {
      title: 'Luxury Home Office',
      description: 'Professional yet comfortable workspace',
    },
  ]

  return (
    <section className="py-20 lg:py-28 bg-gray-50 dark:bg-gray-900/50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Before & After Gallery
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            See what users have achieved with Renov.AI
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {beforeAfter.map((item, index) => (
            <div key={index} className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-gradient-to-br from-purple-600 to-purple-500 flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="text-4xl mb-4">🏠</div>
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-purple-100">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-8">
          Before/After images coming soon. Try the beta to see real transformations.
        </p>
      </div>
    </section>
  )
}
