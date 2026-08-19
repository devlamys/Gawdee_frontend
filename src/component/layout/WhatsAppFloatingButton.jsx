import React from 'react';

export default function WhatsAppFloatingButton() {
  return (
    <a
      href="https://wa.me/917055107030?text=Hello%20Gawdee%2C%20I%20want%20to%20know%20more%20about%20your%20products."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Connect with Gawdee on WhatsApp"
      className="fixed bottom-6 right-6 z-[35000] group flex items-center bg-[#25D366] text-white rounded-full p-3 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden max-w-[50px] hover:max-w-[240px]"
    >
      <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
        <i className="fa-brands fa-whatsapp text-2xl text-white"></i>
      </div>
      <span className="whitespace-nowrap text-xs font-bold pl-3 pr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Chat with Gawdee
      </span>
    </a>
  );
}
