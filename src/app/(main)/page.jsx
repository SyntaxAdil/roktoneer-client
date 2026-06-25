import React from 'react'
import Hero from '../../components/home/Hero'
import DonorMarquee from '../../components/home/DonarMarquee'
import StatsSection from '../../components/home/StatsSection'
import FeatureSection from '../../components/home/FeaturedSection'

import BloodMatrixSection from '../../components/home/BloodMatrixSection'
import ContactSection from '../../components/home/ContactSection'
import FindDonorSection from '../../components/home/FindDonarSection'

const HomePage = () => {
  return (
    <section>
      <DonorMarquee></DonorMarquee>
      <Hero></Hero>
      <StatsSection></StatsSection>
      <FeatureSection></FeatureSection>
      <FindDonorSection></FindDonorSection>
      <BloodMatrixSection></BloodMatrixSection>
      <ContactSection></ContactSection>
    </section>
  )
}

export default HomePage