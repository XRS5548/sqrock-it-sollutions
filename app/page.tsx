'use client'
import { ModeToggle } from '@/components/Togglemod'
import ClientExpectationsSection from '@/components/website/clientexpectations'
import ContactCTASection from '@/components/website/contact'
import Footer from '@/components/website/footer'
import HeroSection from '@/components/website/herosection'
import Navbar from '@/components/website/navbar'
import ServicesSection from '@/components/website/services'
import StatsSection from '@/components/website/states'
import TechStackSection from '@/components/website/techstack'
import WhatWeBuildSection from '@/components/website/whatwecanbuild'
import WhyChooseUsSection from '@/components/website/whychooseus'
import React from 'react'

export default function page() {
  return (
    <div>
      <HeroSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <StatsSection />
      <WhatWeBuildSection />
      <ClientExpectationsSection />
      <TechStackSection />
      {/* <ContactCTASection /> */}
    </div>
  )
}
