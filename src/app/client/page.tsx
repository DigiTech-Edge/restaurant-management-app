'use client'

import { useEffect, useState } from 'react'
import Splash from '@/components/pages/client/splash'
import RestaurantMenu from '@/components/pages/client/restaurant-menu'
import SubMenu from '@/components/pages/client/sub-menu'
import CheckoutPage from '@/components/pages/client/checkout'

export default function ClientsSplashPage() {
  const [step, setStep] = useState<'splash' | 'menu' | 'submenu' | 'checkout'>('splash')
  const [selectedSection, setSelectedSection] = useState<string>('')
  const [selectedItems, setSelectedItems] = useState<any[]>([])

  // Automatically move from splash to menu after 5 seconds
  useEffect(() => {
    if (step === 'splash') {
      const timer = setTimeout(() => {
        setStep('menu')
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [step])

  const handleSectionClick = (section: string) => {
    setSelectedSection(section)
    setStep('submenu')
  }

  const handleBackToMenu = () => {
    setStep('menu')
  }

  const handleProceedToCheckout = (items: any[]) => {
    setSelectedItems(items)
    setStep('checkout')
  }

  const handleBackToSubmenu = () => {
    setStep('submenu')
  }

  const handleBackToSplash = () => {
    setStep('splash')
  }

  if (step === 'splash') {
    return <Splash onComplete={() => setStep('menu')} />
  }

  if (step === 'menu') {
    return (
      <RestaurantMenu
        onSectionClick={handleSectionClick}
        onBack={handleBackToSplash}
      />
    )
  }

  if (step === 'submenu') {
    return (
      <SubMenu
        section={selectedSection}
        onBack={handleBackToMenu}
        onProceedToCheckout={handleProceedToCheckout}
      />
    )
  }

  if (step === 'checkout') {
    return (
      <CheckoutPage
        selectedItems={selectedItems}
        onBack={handleBackToSubmenu}
      />
    )
  }

  return null
}