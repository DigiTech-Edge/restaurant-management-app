import Image from 'next/image'

interface SplashProps {
  onComplete: () => void
}

export default function Splash({ onComplete }: SplashProps) {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/client/background.png"
        alt="Background"
        fill
        className="object-cover"
        priority
      />
      <div className="relative z-10 h-full w-full flex flex-col items-center justify-between px-4 py-8">
        <div className="flex flex-col items-center space-y-6">
          <Image
            src="/images/client/logo.png"
            alt="Logo"
            width={120}
            height={120}
            className="object-contain"
            priority
          />
          <div className="flex items-center space-x-4 text-sm font-medium text-white tracking-wide uppercase">
            <span>Starters</span>
            <span className="h-4 w-px bg-white" />
            <span>Breakfast</span>
            <span className="h-4 w-px bg-white" />
            <span>Lunch</span>
            <span className="h-4 w-px bg-white" />
            <span>Drinks</span>
          </div>

          <h1 className="text-4xl font-bold text-white mt-2">Menu</h1>
        </div>
        
        {/* Add a skip button for user control */}
        <button
          onClick={onComplete}
          className="bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full hover:bg-white/30 transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  )
}