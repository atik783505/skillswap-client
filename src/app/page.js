import Hero from "@/components/HeroSection";
import WorkflowSteps from "@/components/HowItWorks";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Hero />
      <WorkflowSteps />
    </div>
  );
}
