import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProjectsSection from "./components/ProjectsSection";
import ExperienceEducation from "./components/ExperienceEducation";
import SkillsMatrix from "./components/SkillsMatrix";
import CertificatesSection from "./components/CertificatesSection";
import AiChatSection from "./components/AiChatSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import ProjectModal from "./components/ProjectModal";
import ResumeModal from "./components/ResumeModal";
import AiFloatingChat from "./components/AiFloatingChat";
import { Project } from "./types";

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#090d16] text-[#e2e8f0] relative bg-grid-pattern selection:bg-sky-500/20 selection:text-sky-200">
      {/* Subtle top ambient radial gradient */}
      <div 
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-sky-500/[0.04] via-indigo-500/[0.02] to-transparent rounded-full blur-3xl pointer-events-none -z-10" 
        aria-hidden="true"
      />

      {/* Navigation Header */}
      <Navbar 
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenAiChat={() => setIsAiChatOpen(true)}
      />

      {/* Main Content Sections */}
      <main id="main-content">
        <Hero 
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenAiChat={() => setIsAiChatOpen(true)}
        />

        <ProjectsSection 
          onSelectProject={(project) => setSelectedProject(project)}
        />

        <ExperienceEducation />

        <SkillsMatrix />

        <CertificatesSection />

        <AiChatSection />

        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Floating Assistants */}
      <ProjectModal 
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <ResumeModal 
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      <AiFloatingChat 
        isOpen={isAiChatOpen}
        onOpen={() => setIsAiChatOpen(true)}
        onClose={() => setIsAiChatOpen(false)}
      />
    </div>
  );
}
