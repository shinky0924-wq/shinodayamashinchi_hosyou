/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { HERO_IMAGE_URL, LINE_OFFICIAL_URL } from '../data';
import LucideIcon from './LucideIcon';
import { SiteContent } from '../siteContent';

interface ConsultationFormProps {
  content: SiteContent['consultation'];
  initialMessage?: string;
  onClearInitialMessage?: () => void;
}

export default function ConsultationForm({ content, initialMessage, onClearInitialMessage }: ConsultationFormProps) {
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const defaultTemplate = `${content.templateText}${initialMessage ? '\n' + initialMessage : ''}`;

  useEffect(() => {
    if (initialMessage) {
      // Scroll to consultation section smoothly when there's an initial message (like salary simulation)
      containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [initialMessage]);

  const handleCopy = () => {
    navigator.clipboard.writeText(defaultTemplate).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      if (onClearInitialMessage) {
        onClearInitialMessage();
      }
    });
  };

  return (
    <section 
      ref={containerRef}
      className="relative py-20 bg-surface-container overflow-hidden" 
      id="consultation"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={HERO_IMAGE_URL} 
          alt="信太山保証 求人案内背景" 
          className="w-full h-full object-cover opacity-15"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-transparent to-surface" />
      </div>

      <div className="max-w-[1100px] mx-auto px-6 relative z-10">
        
        {/* Header Text */}
        <div className="text-center max-w-2xl mx-auto mb-10 px-2">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#24171c] to-[#1c1216] border border-[#c5a059]/50 px-4 py-1.5 rounded-full text-[#ecd49f] font-sans font-bold text-xs tracking-widest uppercase mb-3 shadow-sm">
            <LucideIcon name="Crown" size={13} className="text-[#ecd49f]" />
            <span>OFFICIAL CONTACT</span>
          </div>
          <h2 className="font-sans font-black text-xl sm:text-2xl md:text-4xl text-[#1f181b] mb-4 md:mb-6 leading-tight break-words whitespace-pre-line">
            {content.title}
          </h2>
          <p className="font-sans text-xs md:text-base text-[#4f3f45] leading-relaxed whitespace-pre-line">
            {content.description}
          </p>
          <div className="h-0.5 w-20 bg-gradient-to-r from-[#c5a059] via-[#ecd49f] to-[#c5a059] mx-auto rounded-full mt-4" />
        </div>

        {/* Consultation Container Box */}
        <div className="max-w-md mx-auto bg-white border-2 border-[#c5a059]/40 rounded-3xl md:rounded-[32px] shadow-2xl p-6 md:p-8 text-center" id="consultation-wizard">
          
          {/* Friendly Advisor Header Banner */}
          <div className="flex items-center gap-3.5 mb-6 bg-gradient-to-r from-[#24171c] via-[#2d1b22] to-[#1c1216] border border-[#c5a059]/50 rounded-2xl p-3.5 text-left text-[#f7eed9] shadow-md">
            <div className="w-13 h-13 rounded-full overflow-hidden border-2 border-[#c5a059]/60 shrink-0 shadow-md">
              <img
                src="/images/japanese_staff_advisor.jpg"
                alt="専任女性相談スタッフ"
                className="w-full h-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="inline-block bg-gradient-to-r from-[#c5a059] to-[#ecd49f] text-[#1f181b] text-[10px] font-sans font-bold px-2.5 py-0.5 rounded-full mb-1">
                専任女性スタッフ対応
              </div>
              <div className="text-xs font-sans font-bold text-white leading-tight">
                「まずは質問だけ」でも大歓迎です✨
              </div>
              <div className="text-[10px] text-[#e6d8c4] mt-0.5">
                秘密厳守・相談費用は完全無料
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            {/* Copy Helper Section (Top) */}
            <div className="space-y-4">
              <div className="bg-[#fcfaf7] border border-[#c5a059]/30 rounded-2xl p-4 text-center">
                <p className="text-xs text-[#1f181b] font-sans font-bold mb-1">
                  {content.badgeText}
                </p>
                <p className="text-xs text-[#4f3f45] font-medium mb-3 whitespace-pre-line">
                  {content.copySubtitle}
                </p>
                
                <div className="w-full bg-white border border-[#c5a059]/35 rounded-xl py-3 px-4 text-left font-sans text-sm text-[#1f181b] select-all mb-4 relative shadow-inner leading-relaxed whitespace-pre-wrap">
                  {defaultTemplate}
                </div>

                <button
                  type="button"
                  onClick={handleCopy}
                  className={`w-full py-3 px-4 rounded-xl font-sans font-bold text-xs md:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    copied 
                      ? 'bg-[#f5e7ce] text-[#a83252] border border-[#c5a059]' 
                      : 'bg-gradient-to-r from-[#24171c] to-[#1c1216] text-[#ecd49f] border border-[#c5a059]/50 hover:bg-[#33222a]'
                  }`}
                >
                  <LucideIcon name={copied ? 'Check' : 'Copy'} size={16} />
                  <span>{copied ? 'コピー完了しました！' : content.copyButtonText}</span>
                </button>
              </div>
            </div>

            {/* LINE CTA Button (Bottom) */}
            <div className="space-y-3 pt-2">
              <p className="text-xs font-bold text-[#a83252] flex items-center justify-center gap-1">
                <span>{content.lineBadgeText}</span>
              </p>
              
              <a
                href={LINE_OFFICIAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full font-sans font-extrabold py-4 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 cursor-pointer text-white bg-[#06c755] hover:bg-[#05b34c] hover:shadow-[#06c755]/40 hover:-translate-y-0.5 shadow-[#06c755]/30 text-base md:text-lg border border-[#c5a059]/50"
              >
                <LucideIcon name="MessageCircle" className="fill-white text-white w-6 h-6" size={24} />
                <span>{content.lineButtonText}</span>
              </a>
              <p className="text-[10px] text-gray-400 font-medium whitespace-pre-line">
                {content.lineSubtitle}
              </p>
            </div>
          </div>

          <p className="text-center text-[10px] text-gray-400 font-medium mt-6 whitespace-pre-line">
            {content.privacyNote}
          </p>

        </div>

      </div>
    </section>
  );
}
