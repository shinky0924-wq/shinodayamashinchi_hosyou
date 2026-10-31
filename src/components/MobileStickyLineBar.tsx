import React from 'react';
import { LINE_OFFICIAL_URL } from '../data';
import { ChevronRight } from 'lucide-react';

export default function MobileStickyLineBar() {
  return (
    <aside
      aria-label="LINE追加固定バー"
      className="fixed bottom-0 left-0 right-0 md:bottom-4 md:left-1/2 md:-translate-x-1/2 md:right-auto md:w-full md:max-w-md z-[9999] bg-[#1c1216]/95 backdrop-blur-md border-t md:border border-[#c5a059]/50 shadow-[0_-4px_25px_rgba(0,0,0,0.45)] md:shadow-2xl md:rounded-2xl px-3 py-2 pb-[max(env(safe-area-inset-bottom),8px)] md:pb-2.5 transition-all duration-300"
      id="mobile-sticky-line-bar"
    >
      <div className="w-full">
        {/* Compact LINE CTA Button */}
        <a
          href={LINE_OFFICIAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-between gap-3 bg-gradient-to-r from-[#06C755] to-[#00B900] active:scale-[0.98] hover:brightness-105 text-white font-extrabold py-2.5 px-4 rounded-xl shadow-md border border-white/30 transition-all cursor-pointer group"
          id="mobile-sticky-line-link"
        >
          {/* Authentic LINE Icon */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <svg
                viewBox="0 0 24 24"
                className="w-4.5 h-4.5 fill-white shrink-0 drop-shadow-xs"
                aria-hidden="true"
              >
                <path d="M12 2C6.477 2 2 5.918 2 10.751c0 3.013 1.74 5.674 4.417 7.218-.192.686-.689 2.457-.788 2.827-.123.46.168.455.353.332.146-.097 2.327-1.579 3.27-2.221.887.247 1.83.377 2.748.377 5.523 0 10-3.918 10-8.751S17.523 2 12 2zm-4.73 11.23h-1.64a.526.526 0 0 1-.527-.526V7.79a.526.526 0 0 1 .527-.526h1.64a.526.526 0 0 1 0 1.052H5.63v1.312h1.64a.526.526 0 1 1 0 1.052H5.63v1.498h1.64a.526.526 0 1 1 0 1.052zm2.664 0a.526.526 0 0 1-.527-.526V7.79a.526.526 0 0 1 1.053 0v4.914a.526.526 0 0 1-.526.526zm4.996 0a.526.526 0 0 1-.418-.206L12.3 9.77v2.934a.526.526 0 0 1-1.053 0V7.79a.526.526 0 0 1 .419-.516.53.53 0 0 1 .52.128l2.213 3.253V7.79a.526.526 0 0 1 1.053 0v4.914a.526.526 0 0 1-.522.526zm3.328-3.414h-1.64v1.498h1.64a.526.526 0 0 1 0 1.052h-2.166a.526.526 0 0 1-.526-.526V7.79a.526.526 0 0 1 .526-.526h2.166a.526.526 0 0 1 0 1.052h-1.64v1.312h1.64a.526.526 0 0 1 0 1.052z" />
              </svg>
            </div>

            {/* Responsive Text */}
            <div className="flex flex-col text-left min-w-0">
              <span className="text-[10px] sm:text-xs text-white/90 font-medium leading-tight truncate">
                24時間質問・相談・面接予約受付中
              </span>
              <span className="text-sm sm:text-base font-black tracking-wide whitespace-nowrap leading-tight">
                公式LINEで今すぐ相談・応募
              </span>
            </div>
          </div>

          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 group-hover:translate-x-0.5 transition-transform">
            <ChevronRight size={16} className="text-white" />
          </div>
        </a>
      </div>
    </aside>
  );
}
