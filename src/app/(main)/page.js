import FeaturedOpportunities from "@/components/FeaturedOpportunities/FeaturedOpportunities";
import Hero from "@/components/Hero";


export default function Home() {
  return (
    <div className="min-h-screen">
     <Hero/>
     <FeaturedOpportunities/>
    </div>
  );
}
