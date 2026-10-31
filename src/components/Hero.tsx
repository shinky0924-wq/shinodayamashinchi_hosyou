/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useMemo } from 'react';
import { motion } from 'motion/react';
import { HERO_IMAGE_URL, LINE_OFFICIAL_URL } from '../data';
import LucideIcon from './LucideIcon';
import { SiteContent } from '../siteContent';
import { BlogArticle, getValidArticleEyeCatch } from '../blogData';
import { ArticleCardImage } from './ArticleCardImage';

interface HeroProps {
  content: SiteContent['hero'];
  onCtaclick: () => void;
  onBlogClick?: () => void;
  articles?: BlogArticle[];
  onArticleClick?: (slug: string) => void;
}

export default function Hero({ content, onCtaclick, onBlogClick, articles, onArticleClick }: HeroProps) {
  const recommendedArticles = useMemo(() => {
    if (!articles || articles.length === 0) return [];
    return articles.slice(0, 5);
  }, [articles]);

  return (
    <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden hero-pattern bg-radial from-rose-50/20 via-transparent to-transparent">
      {/* Backdrops */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-secondary-container/10 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="max-w-[900px] mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        {/* Top Tagline */}
        <motion.div 
          className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#24171c] via-[#332027] to-[#24171c] text-[#ecd49f] border border-[#c5a059]/50 font-sans font-bold text-xs md:text-sm px-5 py-2 rounded-full mb-6 relative shadow-md"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          id="hero-tagline"
        >
          <span className="relative flex h-2 w-2 rounded-full bg-[#ecd49f] animate-ping" />
          <span>{content?.tagline || '顔見せなし＆高額保証で安心して働けます'}</span>
        </motion.div>

        {/* Main Display Title */}
        <motion.h1 
          className="font-sans font-black text-2xl md:text-4xl lg:text-5xl text-[#1f181b] leading-tight mb-5 tracking-tight break-words"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          id="hero-title"
        >
          {content?.titleLine1 || '信太山新地'}<span className="text-[#a83252] ml-2">{content?.titleLine2 || 'トップクラスのお店'}</span>
        </motion.h1>

        {/* Sub description */}
        <motion.div 
          className="font-sans text-xs md:text-base text-[#4f3f45] leading-relaxed mb-8 max-w-2xl px-2 sm:px-0 space-y-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          id="hero-description"
        >
          <p className="font-bold text-[#1f181b] text-sm md:text-lg">
            {content?.descriptionLine1 || '当店は信太山新地で20年以上、地域トップクラスの信頼と実績を積み重ねてきました。'}
          </p>
          <p>
            {content?.descriptionLine2 ? (
              content.descriptionLine2.includes('高額の永久保証') ? (
                <>
                  {content.descriptionLine2.split('高額の永久保証')[0]}
                  <a 
                    href="#guarantee-system" 
                    className="inline-flex items-center text-[#d9385d] font-bold underline decoration-2 decoration-[#d9385d]/60 underline-offset-4 hover:text-[#b81d43] hover:decoration-[#b81d43] transition-colors cursor-pointer mx-0.5"
                    title="高額保証制度の詳細へ"
                  >
                    高額の永久保証
                  </a>
                  {content.descriptionLine2.split('高額の永久保証')[1]}
                </>
              ) : (
                content.descriptionLine2
              )
            ) : (
              <>
                だからこそ、お客様のご来店が一年を通して途切れないため、
                <a 
                  href="#guarantee-system" 
                  className="inline-flex items-center text-[#d9385d] font-bold underline decoration-2 decoration-[#d9385d]/60 underline-offset-4 hover:text-[#b81d43] hover:decoration-[#b81d43] transition-colors cursor-pointer mx-0.5"
                  title="高額保証制度の詳細へ"
                >
                  高額の永久保証
                </a>
                を続けられています。
              </>
            )}
          </p>
          <p>
            {content?.descriptionLine3 || '在籍するキャスト様全員に永久保証があり、収入の見通しがはっきり立ちます。'}
          </p>
          <p>
            {content?.descriptionLine4 || '「思ったより稼げずイライラする」ということが起きにくい環境です。'}
          </p>
          <p className="font-bold text-[#a83252]">
            {content?.descriptionLine5 || 'まずは気軽にご相談ください。'}
          </p>
        </motion.div>

        {/* Horizontal Styled Photo Wrapper */}
        <motion.div 
          className="w-full relative mb-10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          id="hero-visual"
        >
          {/* Ambient Background Glow */}
          <div className="absolute -inset-4 bg-gradient-to-tr from-[#c5a059]/20 to-[#a83252]/15 rounded-[44px] blur-2xl pointer-events-none" />

          <div className="relative bg-gradient-to-b from-[#2a1d22] via-[#1f1519] to-[#150d11] p-2.5 sm:p-3.5 rounded-[28px] sm:rounded-[36px] shadow-2xl border-2 border-[#c5a059]/40 overflow-hidden transform hover:scale-[1.01] transition-transform duration-500">
            <img 
              src={HERO_IMAGE_URL} 
              alt="信太山新地で輝く明るい未来へ・夢を叶える安心のお仕事" 
              className="w-full h-auto rounded-[20px] sm:rounded-[28px] object-cover aspect-[16/9] object-center bg-gray-900"
              decoding="async"
              referrerPolicy="no-referrer"
              id="hero-img-element"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.dataset.triedFallback) {
                  target.dataset.triedFallback = '1';
                  target.src = '/images/shinodayama_bustling_ryokan_hero.jpg';
                } else {
                  target.onerror = null;
                }
              }}
            />
            
            {/* Overlapping Luxury Glassmorphism Stamp */}
            <div className="absolute bottom-5 right-5 md:bottom-7 md:right-7 bg-[#1c1216]/90 backdrop-blur-md px-4 py-3 md:px-5 md:py-3.5 rounded-xl md:rounded-2xl shadow-2xl border border-[#c5a059]/60 flex flex-col items-center z-10">
              <span className="text-[#ecd49f] font-sans font-bold text-xs md:text-sm tracking-widest uppercase mb-0.5">信太山新地</span>
              <span className="text-white font-sans font-bold text-sm md:text-lg tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#ecd49f] via-white to-[#ecd49f]">
                最高峰の永久保証
              </span>
            </div>
          </div>

          {/* Tiny accent decoration dots */}
          <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-[#2a1d22] rounded-full border border-[#c5a059]/30 flex items-center justify-center -z-10 shadow-xs" />
        </motion.div>

        {/* 期間限定イベント・入店祝い金10万円キャンペーンバナー */}
        <motion.div
          className="w-full max-w-2xl mb-12 relative group cursor-pointer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
          onClick={onCtaclick}
          id="hero-welcome-bonus-banner"
        >
          {/* Animated glow border effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#c5a059] via-[#ff6b8b] to-[#c5a059] rounded-3xl blur-md opacity-75 group-hover:opacity-100 transition duration-500 group-hover:duration-200 animate-pulse" />
          
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#2a1820] via-[#201217] to-[#150a0f] border-2 border-[#f3d48e] shadow-2xl">
            {/* Background Graphic with Gold Ribbons & Gift Boxes */}
            <div className="relative w-full aspect-[21/9] sm:aspect-[16/7] overflow-hidden">
              <img
                src="/images/welcome_bonus_100k.jpg"
                alt="今だけ！入店祝い金10万円支給キャンペーン"
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1b0e14] via-[#1b0e14]/50 to-transparent" />
              
              {/* Event Live Badge */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-gradient-to-r from-[#e52d5e] to-[#ff6b8b] text-white px-3.5 py-1.5 rounded-full font-black text-xs sm:text-sm tracking-wider shadow-lg flex items-center gap-1.5 border border-white/40 animate-bounce">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                <span>特別イベント開催中！</span>
              </div>

              {/* Deadline / Availability pill */}
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-black/60 backdrop-blur-md text-[#ffd67a] border border-[#f3d48e]/60 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold tracking-wider">
                ✨ 今だけの特別増額支給
              </div>
            </div>

            {/* Content Body */}
            <div className="p-5 sm:p-7 text-left relative bg-[#1b0e14]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div>
                  <p className="text-[#f3d48e] font-sans font-bold text-xs sm:text-sm tracking-widest uppercase flex items-center gap-1.5">
                    <LucideIcon name="Gift" size={16} className="text-[#ff6b8b]" />
                    LIMITED TIME BONUS CAMPAIGN
                  </p>
                  <h3 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight mt-1 flex flex-wrap items-baseline gap-1.5">
                    <span>入店祝い金</span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffe599] via-[#ff6b8b] to-[#ffe599] text-3xl sm:text-4xl lg:text-5xl font-black drop-shadow-[0_2px_10px_rgba(255,107,139,0.5)]">
                      10万円
                    </span>
                    <span className="text-[#ffd67a] text-xl sm:text-2xl font-black">支給中！</span>
                  </h3>
                </div>

                <div className="shrink-0">
                  <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#06c755] to-[#05b34c] hover:brightness-110 text-white font-black text-xs sm:text-sm px-5 py-3 rounded-full shadow-lg border border-white/20 transition-all transform group-hover:scale-105">
                    <LucideIcon name="MessageSquare" size={17} />
                    <span>LINEで詳細を聞く</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#f3d48e]/25 pt-3.5 mt-2">
                <p className="text-xs sm:text-sm text-[#f5e9d5] leading-relaxed font-medium">
                  現在、当店では<strong className="text-[#ffd67a] font-bold">【期間限定特別イベント】</strong>を開催しており、新しくご入店いただいたキャスト様に<strong className="text-white bg-[#e52d5e] px-2 py-0.5 rounded mx-1 font-bold">入店祝い金１０万円</strong>をプレゼント中！日給最大12万円の永久保証・15分3,800円〜60分15,200円の全額日払いに加えて、さらにお得にスタートできる大チャンスです。定員に達し次第終了となりますので、ぜひお気軽にお問い合わせください♪
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recommendation Columns (おすすめ5選) */}
        {recommendedArticles.length > 0 && (
          <motion.div 
            className="w-full max-w-xl text-left bg-gradient-to-b from-white to-[#fbf8f4] p-5 md:p-6 rounded-3xl border border-[#c5a059]/30 shadow-xl relative"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            id="hero-random-columns"
          >
              {/* Floating accent badge */}
              <div className="absolute -top-3 -right-3 bg-secondary text-white text-[10px] px-3 py-1 rounded-full font-black shadow-sm flex items-center gap-1 border border-secondary/10 tracking-widest animate-pulse">
                <LucideIcon name="Sparkles" size={11} />
                <span>PICK UP</span>
              </div>
              
              <div className="border-b border-rose-100 pb-3 mb-4">
                <h3 className="font-sans font-extrabold text-sm md:text-base text-secondary flex items-center gap-2">
                  <span className="bg-secondary text-white text-[9px] tracking-wider px-2 py-0.5 rounded-md font-black">RECOMMEND</span>
                  <span className="bg-gradient-to-r from-secondary to-[#a13762] bg-clip-text text-transparent font-black">人気のお仕事コラム（おすすめ5選）</span>
                </h3>
              </div>
              
              <div className="flex flex-col gap-2.5">
                {recommendedArticles.map((art, index) => (
                  <button
                    key={art.id}
                    onClick={() => onArticleClick && onArticleClick(art.slug)}
                    className="w-full text-left font-sans text-xs md:text-sm text-on-surface bg-white hover:bg-secondary-container/10 p-2.5 sm:p-3 rounded-2xl border border-rose-100 hover:border-secondary-container/50 transition-all flex items-center justify-between gap-3 cursor-pointer group shadow-[0_2px_8px_-3px_rgba(210,84,123,0.06)] hover:shadow-[0_4px_12px_-2px_rgba(210,84,123,0.12)] hover:-translate-y-0.5"
                    id={`hero-col-item-${art.id}`}
                  >
                    <div className="flex items-center gap-3 overflow-hidden flex-1">
                      {/* Eyecatch thumbnail */}
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden bg-rose-50 border border-rose-100/60 shrink-0 relative flex items-center justify-center shadow-xs">
                        <ArticleCardImage
                          src={getValidArticleEyeCatch(art)}
                          alt={art.title}
                          category={art.category}
                          categoryLabel={art.categoryLabel}
                          className="w-full h-full"
                        />
                      </div>

                      {/* Title & category */}
                      <div className="overflow-hidden flex-1">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="text-[10px] font-black text-secondary bg-rose-50 px-1.5 py-0.2 rounded border border-rose-100/80">
                            {art.categoryLabel || '安心・身バレ対策'}
                          </span>
                          <span className="text-[10px] text-gray-400 font-mono">
                            No.{String(index + 1).padStart(2, '0')}
                          </span>
                        </div>
                        <span className="truncate block text-gray-800 group-hover:text-secondary transition-colors font-bold text-xs sm:text-sm leading-snug">
                          {art.title}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 pl-1">
                      <span className="hidden sm:inline text-[10px] text-secondary font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        読む
                      </span>
                      <LucideIcon name="ChevronRight" className="text-secondary/40 group-hover:text-secondary group-hover:translate-x-0.5 transition-all shrink-0" size={16} />
                    </div>
                  </button>
                ))}
              </div>
              
              {onBlogClick && (
                <div className="mt-4 text-center border-t border-rose-100/50 pt-4">
                  <button
                    onClick={onBlogClick}
                    className="inline-flex items-center gap-2 text-xs md:text-sm font-extrabold text-white bg-gradient-to-r from-secondary to-[#e2628b] hover:from-[#c2446c] hover:to-[#d2547b] px-6 py-2.5 rounded-full shadow-md shadow-rose-200/50 hover:shadow-lg transition-all cursor-pointer group"
                    id="hero-all-columns-link"
                  >
                    <span>すべてのコラムを見る</span>
                    <LucideIcon name="ChevronRight" className="group-hover:translate-x-1 transition-transform" size={14} />
                  </button>
                </div>
              )}
            </motion.div>
          )}

        {/* Guarantee Badge: 未経験の方も安心のサポート体制 */}
        <motion.div 
          className="mt-8 flex items-center justify-center gap-2.5 bg-white/80 border border-rose-100 py-2 px-5 rounded-full shadow-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          id="hero-badge"
        >
          <div className="w-5 h-5 rounded-full bg-secondary/10 flex items-center justify-center">
            <LucideIcon name="ShieldCheck" className="text-secondary" size={13} />
          </div>
          <span className="text-xs md:text-sm font-bold text-on-surface">未経験の方も安心のサポート体制</span>
        </motion.div>
      </div>

      {/* Decorative Wave Divider at the bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] translate-y-[1px]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[30px] text-surface fill-current">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"></path>
        </svg>
      </div>
    </section>
  );
}
