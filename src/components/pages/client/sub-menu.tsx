'use client'
import React, { useState } from 'react'
import { foodMenu } from '@/lib/constants/index'

interface SubMenuProps {
  section: string
  onBack: () => void
  onProceedToCheckout: (items: any[]) => void
}

const SubMenu: React.FC<SubMenuProps> = ({ section, onBack, onProceedToCheckout }) => {
  const foods = foodMenu[section] || []
  const [selected, setSelected] = useState<number[]>([])

  const toggleSelect = (id: number) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  const handleCheckout = () => {
    const selectedItems = foods.filter(food => selected.includes(food.id))
    if (selectedItems.length > 0) {
      onProceedToCheckout(selectedItems)
    }
  }

  return (
    <div className="min-h-screen w-full bg-white flex flex-col">
      <div className="relative h-[40vh] w-full overflow-hidden">
        <img
          src="/images/client/menu-bg.png"
          alt="Delicious food spread"
          className="w-full h-full object-cover"
        />
        <button
          onClick={onBack}
          className="absolute top-4 left-4 px-4 py-2 bg-white/90 hover:bg-white text-black text-sm rounded shadow-md"
        >
          ← Back
        </button>
      </div>

      {/* Section Name with lines */}
      <div className="my-8 flex items-center justify-center relative px-4">
        <div className="flex-grow h-[2px] bg-[#5F0101]" />
        <span className="mx-4 text-[#5F0101] italic font-[cursive] text-lg lowercase">
          {section}
        </span>
        <div className="flex-grow h-[2px] bg-[#5F0101]" />
      </div>

      {/* Food List */}
      <div className="max-w-4xl mx-auto space-y-6 px-4 flex-grow">
        {foods.map(food => (
          <div key={food.id} className="flex justify-between items-center border border-gray-200 rounded p-4 shadow-sm">
            <div className="flex-1 pr-8 min-w-0">
              <h3 className="text-xl font-semibold text-[#5F0101] truncate">{food.name}</h3>
              <p className="text-sm text-gray-600 break-words">{food.description}</p>
            </div>

            <div className="flex items-center space-x-4 flex-shrink-0">
              <span className="text-lg font-medium text-[#5F0101]">₦{food.price.toLocaleString()}</span>
              <input
                type="checkbox"
                checked={selected.includes(food.id)}
                onChange={() => toggleSelect(food.id)}
                className="w-5 h-5 cursor-pointer accent-[#5F0101]"
                aria-label={`Select ${food.name}`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Checkout Button */}
      {selected.length > 0 && (
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={handleCheckout}
              className="w-full bg-[#5F0101] text-white py-3 rounded hover:bg-[#7F0202] transition-colors text-center text-lg font-semibold"
            >
              View Order ({selected.length} items)
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default SubMenu