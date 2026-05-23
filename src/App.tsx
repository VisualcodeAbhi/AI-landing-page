import CursorGlow from './components/CursorGlow';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import DashboardShowcase from './components/DashboardShowcase';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const handleScrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      const topOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative min-h-screen text-slate-100 bg-[#030014] antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Premium Ambient Cursor Glow Tracker */}
      <CursorGlow />

      {/* Navigation Header */}
      <Navbar onStartTrial={() => handleScrollToSection('#pricing')} />

      {/* Main Container */}
      <main className="relative z-10">
        
        {/* 1. Immersive Hero & Console mockup */}
        <Hero onGetStarted={() => handleScrollToSection('#pricing')} />

        {/* 2. Features Grid */}
        <Features />

        {/* 3. Interactive AI Console Showcase */}
        <DashboardShowcase />

        {/* 4. Timeline Setup Guide */}
        <HowItWorks />

        {/* 5. Infinite Draggable Client Testimonials */}
        <Testimonials />

        {/* 6. Premium Pricing Matrix */}
        <Pricing onPlanSelect={() => handleScrollToSection('#contact')} />

        {/* 7. Contact Submission Core */}
        <Contact />

      </main>

      {/* System Operational Footer */}
      <Footer />
    </div>
  );
}
