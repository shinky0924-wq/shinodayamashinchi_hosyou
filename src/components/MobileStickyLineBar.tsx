import React from 'react';
import { LINE_OFFICIAL_URL } from '../data';
import { Sparkles, ChevronRight } from 'lucide-react';

export default function MobileStickyLineBar() {
  return (
    <aside
      aria-label="LINE応募・相談固定バー"
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-md border-t border-pink-100 shadow-[0_-4px_25px_rgba(0,0,0,0.12)] px-3 pt-2 pb-[max(env(safe-area-inset-bottom),10px)] transition-all animate-in fade-in slide-in-from-bottom duration-300"
    >
      <div className="max-w-md mx-auto">
        {/* Top Micro Catch */}
        <div className="flex items-center justify-center gap-1.5 mb-1.5">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <p className="text-[11px] font-bold text-zinc-700 tracking-tight flex items-center gap-1">
            <Sparkles size={11} className="text-pink-500" />
            <span>24時間受付中・質問や見学だけでも大歓迎♪</span>
          </p>
        </div>

        {/* Main LINE CTA Button */}
        <a
          href={LINE_OFFICIAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative w-full flex items-center justify-between bg-gradient-to-r from-[#06C755] to-[#00B900] active:scale-[0.98] hover:brightness-105 text-white font-extrabold px-4 py-3 rounded-2xl shadow-md shadow-[#06C755]/30 transition-all cursor-pointer"
        >
          {/* Left: Authentic LINE Icon */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0 shadow-inner">
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 fill-white drop-shadow-xs"
                aria-hidden="true"
              >
                <path d="M19.365 9.863c.349.004.622.29.61.64-.176 5.176-4.664 9.176-10.02 8.92-1.745-.083-3.376-.665-4.786-1.638l-3.327.973a.625.625 0 0 1-.774-.775l.97-3.328A9.39 9.39 0 0 1 2.39 9.863C2.214 4.687 6.702.687 12.058.943c5.19.248 9.356 4.414 9.307 8.92" fill="#fff" opacity="0.1" />
                <path d="M12 2C6.477 2 2 5.918 2 10.751c0 3.013 1.74 5.674 4.417 7.218-.192.686-.689 2.457-.788 2.827-.123.46.168.455.353.332.146-.097 2.327-1.579 3.27-2.221.887.247 1.83.377 2.748.377 5.523 0 10-3.918 10-8.751S17.523 2 12 2zm-4.73 11.23h-1.64a.526.526 0 0 1-.527-.526V7.79a.526.526 0 0 1 .527-.526h1.64a.526.526 0 0 1 0 1.052H5.63v1.312h1.64a.526.526 0 1 1 0 1.052H5.63v1.498h1.64a.526.526 0 1 1 0 1.052zm2.664 0a.526.526 0 0 1-.527-.526V7.79a.526.526 0 0 1 1.053 0v4.914a.526.526 0 0 1-.526.526zm4.996 0a.526.526 0 0 1-.418-.206L12.3 9.77v2.934a.526.526 0 0 1-1.053 0V7.79a.526.526 0 0 1 .419-.516.53.53 0 0 1 .52.128l2.213 3.253V7.79a.526.526 0 0 1 1.053 0v4.914a.526.526 0 0 1-.522.526zm3.328-3.414h-1.64v1.498h1.64a.526.526 0 0 1 0 1.052h-2.166a.526.526 0 0 1-.526-.526V7.79a.526.526 0 0 1 .526-.526h2.166a.526.526 0 0 1 0 1.052h-1.64v1.312h1.64a.526.526 0 0 1 0 1.052z" />
              </svg>
            </div>
            <div className="text-left">
              <div className="text-[15px] font-black tracking-wide text-white leading-tight">
                LINEで友だち追加・相談する
              </div>
              <div className="text-[10px] font-medium text-white/90 leading-tight mt-0.5">
                面接・体験入店・質問はこちらから（秘密厳守）
              </div>
            </div>
          </div>

          {/* Right Chevron */}
          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center shrink-0 ml-2 group-hover:translate-x-0.5 transition-transform">
            <ChevronRight size={18} className="text-white" />
          </div>
        </a>
      </div>
    </aside>
  );
}
