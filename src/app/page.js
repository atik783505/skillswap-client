import FeaturedTasksClient from "@/components/FeauturedTask";
import Hero from "@/components/HeroSection";
import WorkflowSteps from "@/components/HowItWorks";
import PopularCategories from "@/components/PopularCategory";
import TopFreelancersClient from "@/components/TopFreelancer";
import PlatformStats from "@/components/PlatformStats";
import Testimonials from "@/components/Testimonials";
import { getTopFreelancer } from "@/lib/api/proposals";
import { getFeauturedTask } from "@/lib/api/tasks";

export default async function Home() {
  const tasks = await getFeauturedTask();
  const freelancers = await getTopFreelancer();

  return (
    <div>
      <Hero />
      <FeaturedTasksClient tasks={tasks} />
      <WorkflowSteps />
      <PopularCategories />
      <TopFreelancersClient freelancers={freelancers} />
      <PlatformStats />
      <Testimonials />
    </div>
  );
}
