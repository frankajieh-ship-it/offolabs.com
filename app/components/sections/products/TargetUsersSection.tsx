import { Home, Key, Briefcase, Globe } from 'lucide-react'

export default function TargetUsersSection() {
  const users = [
    {
      icon: <Home className="w-8 h-8" />,
      title: 'Homeowners',
      description: 'Redesign living spaces without hiring an interior designer first.',
      color: 'from-blue-600 to-blue-500',
    },
    {
      icon: <Key className="w-8 h-8" />,
      title: 'Renters',
      description: 'Get flexible, landlord-friendly design ideas that work with small spaces.',
      color: 'from-purple-600 to-purple-500',
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: 'Real Estate Agents',
      description: 'Stage properties virtually to help buyers visualize potential.',
      color: 'from-orange-600 to-orange-500',
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Airbnb Hosts',
      description: 'Create scroll-stopping listings with better room layouts and themed interiors.',
      color: 'from-green-600 to-green-500',
    },
  ]

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
            Who is Renov.AI for?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Make visitors instantly say &quot;This is for me.&quot;
          </p>
        </div>

        {/* User Cards - 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {users.map((user, index) => (
            <div
              key={index}
              className="relative rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-lg transition-all duration-300"
            >
              {/* Header with Icon and Gradient */}
              <div className={`bg-gradient-to-br ${user.color} p-8 text-white`}>
                <div className="w-14 h-14 rounded-lg bg-white/20 flex items-center justify-center mb-4">
                  {user.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{user.title}</h3>
                <p className="text-white/90 leading-relaxed">
                  {user.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
