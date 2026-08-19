import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, RotateCcw, HeartHandshake, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#113826] text-white pt-16 pb-8 border-t border-[#1b4d3e]">
      {/* Top Value Pillars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold font-serif">100% Pure & Ethical</h4>
              <p className="text-xs text-white/70">A2 Bilona Ghee & Raw Foods</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] flex-shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold font-serif">Express Delivery</h4>
              <p className="text-xs text-white/70">Safe across All India</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] flex-shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold font-serif">Quality Guarantee</h4>
              <p className="text-xs text-white/70">Lab Certified Purity</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] flex-shrink-0">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold font-serif">Direct From Farm</h4>
              <p className="text-xs text-white/70">Supporting Ethical Farmers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
        {/* Brand Col */}
        <div className="lg:col-span-2 space-y-4">
          <Link to="/" className="inline-block">
            <img
              src="/imges/LogoMainText.png"
              alt="Gawdee - The Mother of Organic Nutrition"
              className="h-12 w-auto object-contain brightness-0 invert"
            />
          </Link>
          <p className="text-xs text-white/80 leading-relaxed max-w-sm font-light">
            Gawdee is dedicated to bringing authentic, pure, and ethically crafted Indian farm products—from traditional Bilona A2 Gir Cow Ghee to raw forest honey and Ayurvedic daily wellness essentials.
          </p>
          <div className="pt-2 flex items-center gap-3">
            <a href="https://wa.me/917055107030" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#25D366] text-white flex items-center justify-center transition-all">
              <i className="fa-brands fa-whatsapp text-base"></i>
            </a>
            <a href="#" className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#E4405F] text-white flex items-center justify-center transition-all">
              <i className="fa-brands fa-instagram text-base"></i>
            </a>
            <a href="#" className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#1877F2] text-white flex items-center justify-center transition-all">
              <i className="fa-brands fa-facebook text-base"></i>
            </a>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">Categories</h4>
          <ul className="space-y-2 text-xs text-white/80">
            <li><Link to="/products/desi-ghee" className="hover:text-[#D4AF37] transition-colors">A2 Gir Cow Ghee</Link></li>
            <li><Link to="/products/honey" className="hover:text-[#D4AF37] transition-colors">Raw Forest Honey</Link></li>
            <li><Link to="/products/drops" className="hover:text-[#D4AF37] transition-colors">Taral Ayurvedic Drops</Link></li>
            <li><Link to="/products/mix-me" className="hover:text-[#D4AF37] transition-colors">Mix Me Family Nutrition</Link></li>
            <li><Link to="/all-products" className="hover:text-[#D4AF37] transition-colors">View All Products</Link></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">Quick Links</h4>
          <ul className="space-y-2 text-xs text-white/80">
            <li><Link to="/about-us" className="hover:text-[#D4AF37] transition-colors">About Our Farm</Link></li>
            <li><Link to="/contact-us" className="hover:text-[#D4AF37] transition-colors">Contact Support</Link></li>
            <li><Link to="/my-orders" className="hover:text-[#D4AF37] transition-colors">Track Orders</Link></li>
            <li><Link to="/blogs" className="hover:text-[#D4AF37] transition-colors">Gawdee Wellness Blog</Link></li>
            <li><Link to="/exhibitions" className="hover:text-[#D4AF37] transition-colors">Exhibitions & Wholesale</Link></li>
            <li><Link to="/gawdee-organic-lab-test" className="hover:text-[#D4AF37] transition-colors">Organic Lab Test Reports</Link></li>
          </ul>
        </div>

        {/* Policies */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">Customer Care</h4>
          <ul className="space-y-2 text-xs text-white/80">
            <li><Link to="/privacy-policy" className="hover:text-[#D4AF37] transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms-and-condition" className="hover:text-[#D4AF37] transition-colors">Terms & Conditions</Link></li>
            <li><Link to="/cookie-policy" className="hover:text-[#D4AF37] transition-colors">Cookie Policy</Link></li>
          </ul>
          <div className="pt-2 text-xs text-white/70 space-y-1">
            <p className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-[#D4AF37]" /> +91 70551 07030</p>
            <p className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-[#D4AF37]" /> support@gawdee.com</p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 gap-4">
        <p>© {new Date().getFullYear()} Gawdee. All Rights Reserved. Crafted for Healthy Living.</p>
        <div className="flex items-center gap-3">
          <span className="px-2 py-1 bg-white/10 rounded text-[10px] uppercase tracking-wider font-semibold">UPI</span>
          <span className="px-2 py-1 bg-white/10 rounded text-[10px] uppercase tracking-wider font-semibold">Cards</span>
          <span className="px-2 py-1 bg-white/10 rounded text-[10px] uppercase tracking-wider font-semibold">Net Banking</span>
          <span className="px-2 py-1 bg-white/10 rounded text-[10px] uppercase tracking-wider font-semibold">COD</span>
        </div>
      </div>
    </footer>
  );
}
