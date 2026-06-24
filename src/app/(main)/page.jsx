import React from 'react'
import Hero from '../../components/home/Hero'
import DonorMarquee from '../../components/home/DonarMarquee'
import StatsSection from '../../components/home/StatsSection'

const HomePage = () => {
  return (
    <section>
      <DonorMarquee></DonorMarquee>
      <Hero></Hero>
      <StatsSection></StatsSection>
    </section>
  )
}

export default HomePage