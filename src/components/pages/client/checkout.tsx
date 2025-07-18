'use client'

import React, { useState } from 'react'

interface CheckoutPageProps {
  selectedItems: any[]
  onBack: () => void
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ selectedItems, onBack }) => {
  const [foods, setFoods] = useState(selectedItems)
  const [orderType, setOrderType] = useState<'dine-in' | 'take-out'>('dine-in')
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null)
  const [quantities, setQuantities] = useState<Record<number, number>>(() => {
    const initialQuantities: Record<number, number> = {}
    selectedItems.forEach(food => {
      if (food && food.id) {
        initialQuantities[food.id] = 1
      }
    })
    return initialQuantities
  })

  const handleBack = () => {
    onBack()
  }

  const handleRemove = (id: number) => {
    setFoods(prev => prev.filter(food => food.id !== id))
  }

  const handleIncrease = (id: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: prev[id] + 1,
    }))
  }

  const handleDecrease = (id: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }))
  }

  const calculateSubtotal = () => {
    return foods.reduce((sum, food) => {
      const qty = quantities[food.id] || 1
      const price = typeof food.price === 'number' ? food.price : 0
      return sum + (price * qty)
    }, 0)
  }
  
  const TAX_RATE = 0.075
  
  const subtotal = calculateSubtotal()
  const tax = isNaN(subtotal) ? 0 : subtotal * TAX_RATE
  const total = isNaN(subtotal) || isNaN(tax) ? 0 : subtotal + tax

  // Debug logging - remove this after fixing
  console.log('Foods:', foods)
  console.log('Quantities:', quantities)
  console.log('Subtotal:', subtotal)
  console.log('Tax:', tax)
  console.log('Total:', total)

  const handleCompleteOrder = () => {
    console.log('Order Summary:')
    console.log('Order Type:', orderType)
    console.log('Payment Method:', selectedPaymentMethod)
    console.log('Items:', foods.map(f => ({ ...f, quantity: quantities[f.id] })))
    alert('Order completed!')
  }

  // Show empty state if no items
  if (foods.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold text-gray-600 mb-4">Your cart is empty</h2>
        <button
          onClick={handleBack}
          className="bg-[#5F0101] text-white px-6 py-3 rounded hover:bg-[#7F0202] transition-colors"
        >
          Go Back to Menu
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="w-full bg-[#5F0101] text-white py-6 px-6 flex flex-col justify-end relative h-32">
        <div className="absolute left-6">
          <button
            onClick={handleBack}
            className="text-white text-sm px-4 py-2 hover:bg-[#990404] transition"
          >
            &lt;
          </button>
        </div>
        <h1 className="text-center text-xl font-semibold">Your Order</h1>
      </div>

      {/* Rest of the checkout page remains the same... */}
      {/* Order Summary */}
      <div className="w-full px-6 py-10">
        <div className="max-w-4xl mx-auto space-y-4">
          {foods.map(food => (
            <div
              key={food.id}
              className="relative border border-gray-300 rounded-lg p-6 bg-gray-100 shadow-sm"
            >
              <button
                onClick={() => handleRemove(food.id)}
                className="absolute -top-3 -right-3 text-white text-sm bg-red-600 rounded-full w-6 h-6 flex items-center justify-center shadow hover:bg-red-700"
                title="Remove item"
              >
                ×
              </button>

              <div className="flex justify-between items-start">
                <div className="flex-1 pr-4 min-w-0">
                  <h3 className="text-lg font-semibold text-[#5F0101] truncate">{food.name}</h3>
                  <p className="text-sm text-gray-600 break-words">{food.description}</p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <span className="text-md font-medium text-[#5F0101]">₦{food.price}</span>
                  <div className="mt-2 flex items-center justify-end space-x-2">
                    <button
                      onClick={() => handleDecrease(food.id)}
                      className="w-6 h-6 bg-white text-[#5F0101] border border-[#5F0101] rounded-full flex items-center justify-center"
                    >
                      −
                    </button>
                    <span className="text-md font-medium text-[#5F0101] w-6 text-center">
                      {quantities[food.id]}
                    </span>
                    <button
                      onClick={() => handleIncrease(food.id)}
                      className="w-6 h-6 bg-white text-[#5F0101] border border-[#5F0101] rounded-full flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Order Type */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-[#5F0101] mb-2">Order Type</h2>
            <div className="flex items-center space-x-6">
              {['dine-in', 'take-out'].map(type => (
                <label key={type} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value={type}
                    checked={orderType === type}
                    onChange={() => setOrderType(type as 'dine-in' | 'take-out')}
                    className="accent-[#5F0101]"
                  />
                  <span className="text-gray-800 capitalize">{type.replace('-', ' ')}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Table & Order Number */}
        <div className="mt-6 max-w-4xl mx-auto pt-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 text-[#5F0101] font-semibold">
              <div className="w-10 h-10 flex items-center justify-center">
                <img
                  src="/images/client/people.png"
                  alt="Two people icon"
                  className="w-10 h-10"
                />
              </div>
              <span>Table Number</span>
            </div>
            <div className="text-black font-semibold">12</div>
          </div>

          <hr className="border-gray-300" />

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 text-[#5F0101] font-semibold">
              <div className="w-10 h-10 flex items-center justify-center">
                <img
                  src="/images/client/docs.png"
                  alt="Order icon"
                  className="w-10 h-10"
                />
              </div>
              <span>Order Number</span>
            </div>
            <div className="text-black font-semibold">04567</div>
          </div>
          
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-black mb-2">Payment Method</h2>
            <div className="flex space-x-6">
              {[
                { id: 'cash', label: 'Cash', icon: '/images/client/cash2.png' },
                { id: 'mobile', label: 'Mobile Money', icon: '/images/client/networks.png' },
                { id: 'card', label: 'Card', icon: '/images/client/cards.png' },
              ].map(method => (
                <div
                  key={method.id}
                  onClick={() => setSelectedPaymentMethod(method.id)}
                  className={`relative flex flex-col items-center cursor-pointer p-2 rounded-xl border-2 transition ${
                    selectedPaymentMethod === method.id ? 'border-blue-500' : 'border-transparent'
                  }`}
                >
                  <div className="w-14 h-14 flex items-center justify-center relative">
                    <img src={method.icon} alt={method.label} className="w-10 h-5" />
                    {selectedPaymentMethod === method.id && (
                      <div className="absolute -top-2 -right-2 bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-xs shadow-md">
                        ✓
                      </div>
                    )}
                  </div>
                  <span className="mt-2 text-sm font-medium text-gray-700">{method.label}</span>
                </div>
              ))}
            </div>
          </div>
          
          <hr className="border-gray-300" />
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-semibold text-black">Sub Total</h4>
            <p className="text-lg text-black font-semibold">₦{subtotal.toLocaleString()}</p>
          </div>
          <div className="flex justify-between items-center">
            <h6 className="text-lg font-semibold text-black">Tax (7.5%)</h6>
            <p className="text-lg text-black font-semibold">₦{tax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-black">Total</h2>
            <p className="text-xl font-bold text-black">₦{total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-10 px-2">
          <button
            onClick={handleCompleteOrder}
            className="w-full bg-[#5F0101] text-white py-3 border-rounded rounded hover:bg-[#7F0202] transition-colors text-center text-lg"
          >
            Send Order
          </button>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage