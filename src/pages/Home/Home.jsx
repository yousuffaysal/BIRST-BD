import React, { useEffect } from "react";
import HeroBento from "../../components/Hero/HeroBento";
import AboutSection from "../../components/Home/AboutSection";
import WhyChooseSection from "../../components/Home/WhyChooseSection";
import SeminarsSection from "../../components/Home/SeminarsSection";
import AiToolsSection from "../../components/Home/AiToolsSection";
import DashboardPreviewSection from "../../components/Home/DashboardPreviewSection";
import CoursesSection from "../../components/Home/CoursesSection";
import ExpertsSection from "../../components/Home/ExpertsSection";
import SuccessStoriesSection from "../../components/Home/SuccessStoriesSection";
import CertificateSection from "../../components/Home/CertificateSection";
import ResourcesSection from "../../components/Home/ResourcesSection";
import StatsSection from "../../components/Home/StatsSection";
import FaqSection from "../../components/Home/FaqSection";

const Home = () => {

  // Simple scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-birst-light)]">
      <HeroBento />
      <AboutSection />
      <WhyChooseSection />
       <SeminarsSection /> 
      <AiToolsSection />
      <DashboardPreviewSection />
      <CoursesSection />
      <ExpertsSection />
      <SuccessStoriesSection />
      <CertificateSection />
      <ResourcesSection />
      <StatsSection />
      <FaqSection />
    </div>
  );
};

export default Home;