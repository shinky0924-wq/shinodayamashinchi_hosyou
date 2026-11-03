/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CONSULTANT_AVATAR_URL } from '../data';
import { SiteContent } from '../siteContent';
import LucideIcon from './LucideIcon';

interface FAQProps {
  content: SiteContent['faq'];
}

export default function FAQ({ content }: FAQProps) {
  const [openFAQ, setOpenFAQ] = useState<string | null>('faq-1');

  const toggleFAQ = (id: string) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section className="py-20 bg-[#fbf9f6]" id="faq">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Reassuring Banner */}
          <div className="lg:col-span-5 lg:sticky lg:top-24" id="faq-intro-sidebar">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#24171c] to-[#1c1216] border border-[#c5a059]/50 px-4 py-1.5 rounded-full text-[#ecd49f] font-sans font-bold text-xs tracking-widest uppercase mb-4 shadow-sm">
              <LucideIcon name="Crown" size={13} className="text-[#ecd49f]" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h2 className="font-sans font-black text-2xl md:text-3.5xl lg:text-4xl text-[#1f181b] leading-tight mb-6 whitespace-pre-line">
              {content.title}
            </h2>
            
            {/* Consultant Message Card */}
            <div className="bg-gradient-to-b from-[#fcfaf7] to-white border-2 border-[#c5a059]/35 rounded-[28px] md:rounded-[32px] p-5 md:p-8 flex flex-col sm:flex-row items-center text-center sm:text-left gap-4 md:gap-6 shadow-md">
              <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 bg-white rounded-full overflow-hidden border-2 border-[#c5a059]/50 shadow-md transform -rotate-2 hover:rotate-0 transition-transform">
                <img 
                  src={CONSULTANT_AVATAR_URL} 
                  alt="アドバイザー相談スタッフ" 
                  className="w-full h-full object-cover" 
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.dataset.tried) {
                      target.dataset.tried = '1';
                      target.src = '/images/japanese_staff_advisor.jpg';
                    } else {
                      target.onerror = null;
                    }
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-sans text-xs md:text-base italic text-[#4f3f45] font-medium leading-relaxed">
                  {content.sidebarMessage}
                </p>
                <span className="text-xs font-bold text-[#a83252] mt-2 block">{content.sidebarRole}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Accordion */}
          <div className="lg:col-span-7 space-y-4" id="faq-accordions-group">
            {content.items.map((faq, index) => {
              const isOpen = openFAQ === faq.id;
              return (
                <div 
                  key={faq.id}
                  className={`bg-white rounded-2xl border transition-all overflow-hidden ${
                    isOpen 
                      ? 'border-[#c5a059] shadow-md ring-1 ring-[#c5a059]/20' 
                      : 'border-[#c5a059]/25 hover:border-[#c5a059]/60 shadow-xs'
                  }`}
                  id={`faq-accordion-card-${index + 1}`}
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className={`w-full flex justify-between items-center p-4 md:p-6 text-left cursor-pointer gap-4 transition-colors ${
                      isOpen ? 'bg-[#fcfaf7]' : 'hover:bg-[#fcfaf7]/50'
                    }`}
                  >
                    <span className="font-sans font-bold text-xs md:text-base text-[#1f181b] flex-1 leading-snug">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className={`text-[#524348] flex-shrink-0 ${isOpen ? 'text-[#a83252]' : ''}`}
                    >
                      <LucideIcon name="ChevronDown" size={18} className="md:w-5 md:h-5" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                      >
                        <div className="px-4 md:px-6 pb-5 md:pb-6 pt-0 font-sans text-xs md:text-sm text-[#4f3f45] leading-relaxed border-t border-[#c5a059]/20">
                          <div className="pt-3 md:pt-4 flex gap-2">
                            <span className="text-[#a83252] font-sans font-black text-sm md:text-lg select-none">A.</span>
                            <p className="flex-1 whitespace-pre-line text-xs md:text-sm text-[#4f3f45] leading-relaxed">
                              {faq.answer.replace(/^A\.\s*/, '')}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
