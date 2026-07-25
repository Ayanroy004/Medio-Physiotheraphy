import Hero from '../components/home/Hero.jsx';
import ServicesOverview from '../components/home/ServicesOverview.jsx';
import WhyChooseUs from '../components/home/WhyChooseUs.jsx';
import TestimonialsSection from '../components/home/TestimonialsSection.jsx';
import LocationSection from '../components/home/LocationSection.jsx';
import CtaBanner from '../components/home/CtaBanner.jsx';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <WhyChooseUs />
      <TestimonialsSection />
      <LocationSection />
      <CtaBanner />
    </>
  );
}
