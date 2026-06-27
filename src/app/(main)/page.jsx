import React from 'react'
import Hero from '../../components/home/Hero'
import DonorMarquee from '../../components/home/DonarMarquee'
import StatsSection from '../../components/home/StatsSection'
import FeatureSection from '../../components/home/FeaturedSection'

import BloodMatrixSection from '../../components/home/BloodMatrixSection'
import ContactSection from '../../components/home/ContactSection'
import FindDonorSection from '../../components/home/FindDonarSection'
async function getDonors() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/donors?page=1&limit=6`,
      {
        cache: "no-store",
      }
    );

    const result = await res.json();

    return result.success ? result.data : [];
  } catch (error) {
    console.error(error);
    return [];
  }
}
async function getPendingReq() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/donation-requests/public-pending?page=1&limit=6`,
      {
        cache: "no-store",
      }
    );
    

    const result = await res.json();

    return result.success ? result.data : [];
  } catch (error) {
    console.error(error);
    return [];
  }
}
async function getActiveDonarsCount() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/active-donors-count`,
      {
        cache: "no-store",
      }
    );

    const result = await res.json();

    return result.success ? result.data : [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function getFundCount() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/funds/total-funds`,
      {
        cache: "no-store",
      }
    );

    const result = await res.json();

    return result.success ? result.totalFunds : 0;
  } catch (error) {
    console.error(error);
    return [];
  }
}




const HomePage = async() => {
  const donors=await getDonors()
  const pendingReqEmergency=await getPendingReq()
  const activeDonorsCount=await getActiveDonarsCount()
  const totalFundsCount=await getFundCount()
  
  
  
  return (
    <section>
      <DonorMarquee requests={pendingReqEmergency}></DonorMarquee>
      <Hero totalDonarActive={activeDonorsCount}></Hero>
      <StatsSection totalFundsCount={totalFundsCount} activeDonorsCount={activeDonorsCount} ></StatsSection>
      <FeatureSection ></FeatureSection>
      <FindDonorSection donars={donors}  ></FindDonorSection>
      <BloodMatrixSection></BloodMatrixSection>
      <ContactSection></ContactSection>
    </section>
  )
}

export default HomePage