import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TechStackSection from '@/components/TechStackSection';
import ProjectsSection from '@/components/ProjectsSection';
import VisualsSection from '@/components/VisualsSection';
import JourneySection from '@/components/JourneySection';
import ExperienceSection from '@/components/ExperienceSection';
import ContactSection from '@/components/ContactSection';
import CursorGlow from '@/components/CursorGlow';
import NeuralNetwork3D from '@/components/NeuralNetwork3D';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Global 3D Neural Network Background */}
      <div className="fixed inset-0 z-0">
        <NeuralNetwork3D />
      </div>
      
      <CursorGlow />
      <Navbar />
      
      {/* Main content with relative positioning to appear above background */}
      <div className="relative z-10">
        <Hero />
        <TechStackSection />
        <ProjectsSection />
        <VisualsSection />
        <ExperienceSection />
        <JourneySection />
        <ContactSection />
      </div>
    </div>
  );
};

export default Index;
