/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, MouseEvent } from 'react';
import { motion } from 'motion/react';
import { TESTIMONIALS } from '../data';
import LucideIcon from './LucideIcon';

export default function Testimonials() {
  const [likedReviews, setLikedReviews] = useState<Record<string, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({
    'test-1': 14,
    'test-2': 28,
    'test-3': 9
  });

  const handleLike = (id: string, e: MouseEvent) => {
    e.preventDefault();
    const isLiked = likedReviews[id];
    setLikedReviews({ ...likedReviews, [id]: !isLiked });
    setLikeCounts({
      ...likeCounts,
      [id]: isLiked ? likeCounts[id] - 1 : likeCounts[id] + 1
    });
  };

  return (
    <section className="py-20 bg-[#fbf9f6]" id="voice">
      <div className="max-w-[1100px] mx-auto px-6">
        
        {/* Title */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#24171c] to-[#1c1216] border border-[#c5a059]/50 px-4 py-1.5 rounded-full text-[#ecd49f] font-sans font-bold text-xs tracking-widest uppercase mb-3 shadow-sm">
            <LucideIcon name="Crown" size={13} className="text-[#ecd49f]" />
            <span>CAST TESTIMONIALS</span>
          </div>
          <h2 className="font-sans font-black text-2xl md:text-3xl lg:text-4xl mb-4 text-[#1f181b]">
            在籍キャストのリアルな<span className="text-[#a83252] ml-1">体験談・感想</span>
          </h2>
          <p className="font-sans text-xs md:text-sm text-[#4f3f45] max-w-xl mx-auto leading-relaxed">
            20〜27才の未経験からスタートした在籍キャストの本音をご紹介します。
          </p>
          <div className="h-0.5 w-20 bg-gradient-to-r from-[#c5a059] via-[#ecd49f] to-[#c5a059] mx-auto rounded-full mt-4" />
        </div>

        {/* Testimonials Deck */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, idx) => {
            const isLiked = likedReviews[testimonial.id];
            return (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white p-6 md:p-8 rounded-3xl md:rounded-[32px] border-2 border-[#c5a059]/30 hover:border-[#c5a059]/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                id={`testimonial-card-${idx + 1}`}
              >
                <div>
                  {/* Avatar and Info Header */}
                  <div className="flex gap-3 md:gap-4 items-center mb-5 md:mb-6">
                    <div className="relative flex-shrink-0">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-[18px] md:rounded-[22px] overflow-hidden shadow-inner ring-4 ring-[#c5a059]/30 relative">
                        <img 
                          src={testimonial.avatarUrl} 
                          alt="信太山保証 キャスト体験者" 
                          className="w-full h-full object-cover bg-[#fcfaf7]"
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            const target = e.currentTarget;
                            if (!target.dataset.tried) {
                              target.dataset.tried = '1';
                              const fallbacks = [
                                '/images/japanese_cast_avatar_one.jpg',
                                '/images/japanese_cast_avatar_two.jpg',
                                '/images/japanese_cast_avatar_three.jpg'
                              ];
                              target.src = fallbacks[idx % fallbacks.length];
                            } else {
                              target.onerror = null;
                            }
                          }}
                        />
                      </div>
                      <div className="absolute bottom-0 right-0 w-5 h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-r from-[#c5a059] to-[#ecd49f] text-[#1f181b] flex items-center justify-center text-[9px] md:text-[11px] font-bold shadow-sm border border-[#1f181b]">
                        {"✓"}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5 min-w-0">
                      <div className="flex flex-wrap">
                        <span className="bg-gradient-to-r from-[#24171c] to-[#1c1216] text-[#ecd49f] border border-[#c5a059]/40 text-[10px] md:text-xs font-sans font-bold px-3 py-0.5 rounded-full shadow-xs truncate">
                          {testimonial.tag}
                        </span>
                      </div>
                      <div className="text-xs md:text-base text-[#1f181b] font-sans font-bold flex flex-wrap items-center gap-1.5 pl-0.5">
                        <span className="truncate">{testimonial.age}</span>
                        <span className="text-[10px] bg-[#f5e7ce]/80 text-[#a83252] font-sans font-bold px-2 py-0.5 rounded-md whitespace-nowrap border border-[#c5a059]/30">
                          {testimonial.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Speech Bubble quote */}
                  <div className="relative">
                    <span className="absolute -top-3 -left-2 text-[#c5a059]/30 text-4xl font-sans select-none pointer-events-none">“</span>
                    <p className="font-sans text-sm md:text-base leading-relaxed text-[#4f3f45] relative z-10 pl-2">
                      「{testimonial.quote}」
                    </p>
                  </div>
                </div>

                {/* Helpful Like Button */}
                <div className="mt-8 pt-4 border-t border-[#c5a059]/20 flex justify-between items-center text-xs text-[#524348]">
                  <span className="font-sans font-bold text-[#a83252] flex items-center gap-1.5 bg-[#fcfaf7] border border-[#c5a059]/30 px-3 py-1 rounded-full">
                    <LucideIcon name="CheckCircle" size={13} className="text-[#c5a059]" />
                    当店在籍キャスト
                  </span>
                  
                  <button 
                    onClick={(e) => handleLike(testimonial.id, e)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                      isLiked 
                        ? 'bg-[#f5e7ce] text-[#a83252] font-bold border border-[#c5a059]/40' 
                        : 'bg-zinc-50 hover:bg-[#fcfaf7] text-gray-500 hover:text-[#a83252] border border-gray-200/60'
                    }`}
                  >
                    <LucideIcon 
                      name="Heart" 
                      size={14} 
                      className={`${isLiked ? 'fill-[#a83252] text-[#a83252]' : 'text-gray-400'}`} 
                    />
                    <span>参考になった ({likeCounts[testimonial.id]})</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
