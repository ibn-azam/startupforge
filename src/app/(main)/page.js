import FeaturedOpportunities from "@/components/FeaturedOpportunities/FeaturedOpportunities";
import FeaturedStartups from "@/components/FeaturedOpportunities/FeaturedStartups";
import Hero from "@/components/Hero";
import SuccessStories from "@/components/SuccessStories";
import WhyJoinStartupForge from "@/components/WhyJoinStartupForge";


export default function Home() {
  return (
    <div className="min-h-screen">
     <Hero/>
     <FeaturedOpportunities/>
    <FeaturedStartups/>
     <SuccessStories/>
     <WhyJoinStartupForge/>
    </div>
  );
}
