import React from 'react';
import { Star, Quote } from 'lucide-react';

export default function TestimonialsSection() {
  const reviews = [
    {
      name: "Dr. Ananya Sharma",
      location: "Mumbai",
      role: "Ayurvedic Practitioner",
      rating: 5,
      review: "Gawdee's A2 Gir Cow Ghee has the authentic Danedar texture and nutty aroma I missed since childhood. Highly recommended for daily health."
    },
    {
      name: "Rajesh Kumar",
      location: "Bengaluru",
      role: "Fitness Enthusiast",
      rating: 5,
      review: "The raw forest honey is genuinely pure! You can smell the wild floral notes. Excellent packaging and fast delivery."
    },
    {
      name: "Pooja Varma",
      location: "Delhi NCR",
      role: "Homemaker",
      rating: 5,
      review: "Switched our entire family to Gawdee A2 Ghee 6 months ago. Digestion is better and my children love it over hot parathas!"
    }
  ];

  return (
    <section className="py-20 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
          Verified Reviews
        </span>
        <h2 className="text-3xl font-extrabold font-serif text-[#1C2421] mt-1 mb-12">
          Loved by Over 50,000 Families Across India
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-[#FAF8F5] p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between text-left relative"
            >
              <Quote className="w-8 h-8 text-[#D4AF37]/30 absolute top-6 right-6" />
              <div>
                <div className="flex text-[#D4AF37] mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-gray-700 font-light leading-relaxed mb-6 italic">
                  "{rev.review}"
                </p>
              </div>
              <div className="pt-4 border-t border-gray-200/60">
                <h4 className="text-sm font-bold font-serif text-[#113826]">{rev.name}</h4>
                <p className="text-[11px] text-gray-500">{rev.role} • {rev.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
