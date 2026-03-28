import { HeroSection } from "@/components/home/hero-section"
import { HowItWorks } from "@/components/home/how-it-works"
import { FeaturesSection } from "@/components/home/features-section"
import { QuestionTypesSection } from "@/components/home/question-types-section"
import { CtaSection } from "@/components/home/cta-section"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HowItWorks />
      <FeaturesSection />
      <QuestionTypesSection />
      <CtaSection />
    </>
  )
}
