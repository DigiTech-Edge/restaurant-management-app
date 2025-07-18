'use client'
import React from 'react'

interface RestaurantMenuProps {
  onSectionClick: (section: string) => void
  onBack: () => void
}

const RestaurantMenu: React.FC<RestaurantMenuProps> = ({ onSectionClick, onBack }) => {
  const menuSections = [
    'Starters',
    'Salad & Soup',
    'Mains',
    'Breakfast',
    'Burgers & Pizza',
    'Drinks',
  ]

  return (
    <div className="min-h-screen w-full bg-white flex flex-col">
      {/* Hero Image */}
      <div className="relative h-[40vh] w-full overflow-hidden">
        <img
          src="/images/client/menu-bg.png"
          alt="Delicious food spread"
          className="w-full h-full object-cover"
        />
        {/* Back button */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 px-4 py-2 bg-white/90 hover:bg-white text-black text-sm rounded shadow-md"
        >
          ← Back
        </button>
      </div>

      {/* Separator */}
      <div className="my-1">
        <div className="h-1 w-auto bg-[#5F0101]" />
      </div>

      {/* Header */}
      <div className="flex justify-center">
        <div className="bg-[#5F0101] text-white text-center py-3 sm:py-4 text-base sm:text-xl font-bold tracking-wide w-[95%] sm:w-[98%] max-w-5xl rounded-md shadow-sm">
          Explore and Order
        </div>
      </div>

      {/* Menu Sections */}
      <div className="flex-grow overflow-y-auto flex flex-col items-center text-center mt-4">
        {menuSections.map((section) => (
          <button
            key={section}
            onClick={() => onSectionClick(section)}
            className="bg-gray-100 hover:bg-gray-300 transition-colors duration-200 my-2 text-black font-medium text-sm sm:text-base md:text-lg focus:outline-none rounded-md shadow-md w-[95%] sm:w-[98%] max-w-5xl py-6 px-4"
          >
            {section}
          </button>
        ))}
      </div>
    </div>
  )
}

export default RestaurantMenu