/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import LucideIcon from './LucideIcon';

interface HeaderProps {
  currentTab: 'recruit' | 'blog' | 'admin';
  onChangeTab: (tab: 'recruit' | 'blog' | 'admin') => void;
  onCtaclick: () => void;
  onScrollToSection: (sectionId: string) => void;
  onNavigateToSection?: (sectionId: string) => void;
  isAdminMode?: boolean;
}

export default function Header({ currentTab, onChangeTab, onCtaclick, onScrollToSection, onNavigateToSection, isAdminMode }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'お仕事コラム', action: 'blog', href: '/blog' },
    { name: '当店が選ばれる理由', action: 'section', target: 'about', href: '/#about' },
    { name: 'お仕事内容', action: 'section', target: 'job-content', href: '/#job-content' },
    { name: 'お給料・待遇', action: 'section', target: 'salary', href: '/#salary' },
    { name: 'よくある質問', action: 'section', target: 'faq', href: '/#faq' },
    { name: '女性の声', action: 'section', target: 'voice', href: '/#voice' },
    { name: '応募の流れ', action: 'section', target: 'flow', href: '/#flow' },
    { name: '募集要項', action: 'section', target: 'requirements', href: '/#requirements' },
  ];

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>, link: typeof navLinks[0]) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (link.action === 'recruit') {
      onChangeTab('recruit');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (link.action === 'blog') {
      onChangeTab('blog');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (link.action === 'section' && link.target) {
      if (onNavigateToSection) {
        onNavigateToSection(link.target);
      } else {
        onScrollToSection(link.target);
      }
    }
  };

  return (
    <>
      <header 
        id="app-header"
        className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#fcfaf7]/95 backdrop-blur-md shadow-sm py-3 border-b border-[#c5a059]/25' 
            : 'bg-[#fcfaf7]/85 backdrop-blur-sm py-4 border-b border-[#c5a059]/15'
        }`}
      >
        <div className="flex justify-between items-center w-full px-6 max-w-[1100px] mx-auto">
          {/* Logo */}
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              onChangeTab('recruit');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#2a1d22] to-[#150d11] border border-[#c5a059]/60 flex items-center justify-center text-[#f2dfb3] transition-all duration-300 group-hover:scale-105 shadow-md shadow-[#2a1d22]/20">
              <LucideIcon name="Crown" className="text-[#ecd49f]" size={20} />
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-gradient-to-tr from-[#c5a059] to-[#ecd49f] rounded-full border border-[#2a1d22] flex items-center justify-center">
                <span className="text-[7px] leading-none text-[#1f181b]">★</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-black text-lg md:text-xl tracking-wider text-[#23181c] flex items-center gap-1.5 uppercase">
                sinodayama vip
              </span>
              <span className="text-[10px] font-sans font-bold text-[#a83252] tracking-widest -mt-0.5 block scale-95 origin-left">
                信太山新地 高額保証求人
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex gap-5 xl:gap-6 items-center" id="desktop-navigation">
            {navLinks.map((link) => {
              const isActive = link.action === 'blog' && currentTab === 'blog';

              return (
                <a 
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link)}
                  className={`font-sans font-bold text-xs xl:text-sm tracking-wide transition-all cursor-pointer ${
                    isActive 
                      ? 'text-[#a83252] border-b-2 border-[#a83252] pb-1 font-extrabold' 
                      : 'text-[#524348] hover:text-[#a83252]'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-3">

            {/* Mobile Hamburger Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-on-surface hover:text-secondary focus:outline-none cursor-pointer"
              aria-label="メニューを開く"
              id="mobile-menu-trigger"
            >
              <LucideIcon name={mobileMenuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[65px] bg-white/95 backdrop-blur-md border-b border-rose-100 shadow-xl z-40 lg:hidden px-6 py-6"
            id="mobile-navigation-drawer"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link)}
                  className="font-sans font-bold text-base text-on-surface hover:text-secondary py-2 border-b border-rose-50 flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <LucideIcon name="ChevronRight" size={16} className="text-secondary/40" />
                </a>
              ))}
              <div className="pt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onCtaclick();
                  }}
                  className="w-full bg-secondary text-white font-sans font-bold py-3 rounded-xl shadow-md flex items-center justify-center gap-2"
                >
                  <LucideIcon name="MessageCircle" size={18} />
                  <span>まずは気軽に相談してみる</span>
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
