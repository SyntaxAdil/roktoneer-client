import React from 'react'
import Hero from '../../components/home/Hero'
import DonorMarquee from '../../components/home/DonarMarquee'
import StatsSection from '../../components/home/StatsSection'
import FeatureSection from '../../components/home/FeaturedSection'

import BloodMatrixSection from '../../components/home/BloodMatrixSection'
import ContactSection from '../../components/home/ContactSection'
import FindDonorSection from '../../components/home/FindDonarSection'
async function getPendingRequests() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/donors?page=1&limit=6`,
      {
        cache: "no-store",
      }
    );

    const result = await res.json();
console.log(result)
    return result.success ? result.data : [];
  } catch (error) {
    console.error(error);
    return [];
  }
}
const HomePage = async() => {
  const pendingRequests=await getPendingRequests()
  
  return (
    <section>
      <DonorMarquee></DonorMarquee>
      <Hero></Hero>
      <StatsSection></StatsSection>
      <FeatureSection  ></FeatureSection>
      <FindDonorSection donars={pendingRequests}  ></FindDonorSection>
      <BloodMatrixSection></BloodMatrixSection>
      <ContactSection></ContactSection>
    </section>
  )
}

export default HomePage