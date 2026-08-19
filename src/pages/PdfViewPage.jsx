import React from 'react';
import Header from '@/component/layout/Header';
import Footer from '@/component/layout/Footer';
import { Meta } from '@/component/common/Meta';
import { ShieldCheck, FileCheck2, Award, Download } from 'lucide-react';

export default function PdfViewPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C2421]">
      <Meta title="Organic Lab Test Reports & Certificates | Gawdee" />
      <Header />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1 px-3.5 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-700" /> NABL Certified Purity
          </span>
          <h1 className="text-4xl font-extrabold font-serif text-[#113826]">
            Organic Lab Test Reports
          </h1>
          <p className="text-xs text-gray-600 font-light">
            Transparent quality assurance. Every single batch of Gawdee A2 Bilona Ghee is tested for heavy metals, pesticides, and adulteration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4 text-center">
            <div className="w-16 h-16 bg-[#113826]/10 text-[#113826] rounded-2xl flex items-center justify-center mx-auto">
              <FileCheck2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold font-serif text-[#1C2421]">A2 Bilona Ghee Test Report</h3>
            <p className="text-xs text-gray-500 font-light">
              Certified zero cholesterol adulteration, 100% pure Gir Cow A2 Beta-Casein protein structure.
            </p>
            <div className="pt-2">
              <a
                href="/gawdee-a2-ghee-lab-report.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#113826] text-white text-xs font-bold rounded-xl shadow-md"
              >
                <Download className="w-4 h-4" /> Download Certificate
              </a>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4 text-center">
            <div className="w-16 h-16 bg-[#D4AF37]/20 text-[#8A711E] rounded-2xl flex items-center justify-center mx-auto">
              <Award className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold font-serif text-[#1C2421]">Raw Forest Honey Test Report</h3>
            <p className="text-xs text-gray-500 font-light">
              Certified zero added sugar syrup, C3/C4 plant sugar negative, 100% natural wild floral origin.
            </p>
            <div className="pt-2">
              <a
                href="/gawdee-honey-lab-report.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#113826] text-white text-xs font-bold rounded-xl shadow-md"
              >
                <Download className="w-4 h-4" /> Download Certificate
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
