import React from 'react';
import Header from '@/component/layout/Header';
import HeroSection from '@/component/home/HeroSection';
import CategoriesSection from '@/component/home/CategoriesSection';
import GawdeeKPISection from '@/component/home/GawdeeKPISection';
import RecomandedProduct from '@/component/home/RecomandedProduct';
import NewProducts from '@/component/home/NewProducts';
import AboutUsSection from '@/component/home/AboutUsSection';
import QualitySection from '@/component/home/QualitySection';
import FAQSection from '@/component/home/FAQSection';
import TestimonialsSection from '@/component/home/TestimonialsSection';
import BlogsSection from '@/component/home/BlogsSection';
import Footer from '@/component/layout/Footer';
import WhatsAppFloatingButton from '@/component/layout/WhatsAppFloatingButton';
import GawdeePopup from '@/component/popupMain/GawdeePopup';

export default function Home() {
  return (
    <div className="relative w-full min-h-screen bg-[#FAF8F5] text-[#1C2421]">
      <Header />
      <main>
        <HeroSection />
        <CategoriesSection />
        <GawdeeKPISection />
        <RecomandedProduct />
        <NewProducts />
        <AboutUsSection />
        <QualitySection />
        <FAQSection />
        <TestimonialsSection />
        <BlogsSection />
      </main>
      <Footer />
      <WhatsAppFloatingButton />
      <GawdeePopup />
    </div>
  );
}
