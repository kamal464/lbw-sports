import { PageLoader } from '@/components/home/PageLoader'
import { Hero } from '@/components/home/Hero'
import { ScrollJourney } from '@/components/home/ScrollJourney'
import { BatShowcase } from '@/components/home/BatShowcase'
import { BallSection } from '@/components/home/BallSection'
import { CategoryGrid } from '@/components/home/CategoryGrid'
import { BrandStory } from '@/components/home/BrandStory'
import { MotionMarquee } from '@/components/motion/MotionMarquee'

export default function HomePage() {
  return (
    <>
      <PageLoader />
      <Hero />
      <MotionMarquee />
      <ScrollJourney />
      <BatShowcase />
      <BallSection />
      <CategoryGrid />
      <BrandStory />
    </>
  )
}
