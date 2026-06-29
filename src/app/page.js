import FeaturedTasksClient from "@/components/FeauturedTask";
import Hero from "@/components/HeroSection";
import WorkflowSteps from "@/components/HowItWorks";
import PopularCategories from "@/components/PopularCategory";
import TopFreelancersClient from "@/components/TopFreelancer";
import { getTopFreelancer } from "@/lib/api/proposals";
import { getFeauturedTask } from "@/lib/api/tasks";
import Image from "next/image";

export default async function Home() {
  const tasks = await getFeauturedTask()
  const freelancers = await getTopFreelancer()
  return (
    <div>
      <Hero />
      <FeaturedTasksClient tasks={tasks}></FeaturedTasksClient>
      <TopFreelancersClient freelancers={freelancers}></TopFreelancersClient>
      <WorkflowSteps />
      <PopularCategories/>
    </div>
  );
}
