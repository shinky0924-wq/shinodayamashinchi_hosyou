/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MouseEvent, useState, useEffect } from 'react';
import LucideIcon from './LucideIcon';

interface FooterProps {
  currentTab: string;
  onChangeTab: (tab: 'recruit' | 'blog' | 'admin') => void;
  onScrollToSection: (sectionId: string) => void;
  onNavigateToSection?: (sectionId: string) => void;
  onOpenAdmin: () => void;
  isAdminMode?: boolean;
}

export default function Footer({ currentTab, onChangeTab, onScrollToSection, onNavigateToSection, onOpenAdmin, isAdminMode }: FooterProps) {
  const [showAdminLink, setShowAdminLink] = useState(false);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('creator') === 'tobita' || params.get('admin') === 'true') {
        localStorage.setItem('show_admin_portal', 'true');
        setShowAdminLink(true);
      } else if (localStorage.getItem('show_admin_portal') === 'true') {
        setShowAdminLink(true);
      }
    } catch (e) {
      console.warn('localStorage or window.location not accessible', e);
    }
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

    if (link.action === 'blog') {
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
    <footer className="bg-gradient-to-b from-[#1c1216] to-[#110a0e] text-[#f7eed9] border-t-2 border-[#c5a059]/40 pt-16 pb-12" id="app-footer">
      <div className="max-w-[1100px] mx-auto px-6">
        
        {/* Upper footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          
          {/* Logo details */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="text-[11px] font-sans font-bold text-[#c5a059] uppercase tracking-widest flex items-center gap-1.5">
                <LucideIcon name="Crown" size={13} className="text-[#ecd49f]" />
                <span>信太山新地 創業二十余年・最高峰老舗料亭グループ</span>
              </div>
              <div className="font-sans font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#ecd49f] via-white to-[#ecd49f] flex items-center gap-2 pb-1 uppercase tracking-wide">
                sinodayama vip
              </div>
              <div className="text-xs text-[#ecd49f] font-bold tracking-widest -mt-1">
                信太山新地 高額保証求人
              </div>
            </div>
            <p className="font-sans text-xs md:text-sm text-[#d8c8b4] leading-loose">
              信太山新地トップクラスの安心・安全・最高水準の永久保証完備！未経験大歓迎です。<br />
              営業時間：12:00〜24:00（LINEでの事前相談・ご質問は24時間年中無休で受付中）<br />
              所在地：大阪府和泉市幸（JR阪和線「信太山駅」徒歩約3分・無料送迎あり）
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4 text-left md:text-right">
            <h5 className="font-sans font-bold text-[#ecd49f] text-sm tracking-widest uppercase">
              サイトメニュー
            </h5>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 font-sans text-xs md:text-sm max-w-xs md:ml-auto">
              {navLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link)}
                  className="text-[#d8c8b4] hover:text-[#ecd49f] transition-all block text-left"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom subtle copyright and admin triggers */}
        <div className="pt-8 border-t border-[#c5a059]/20 flex flex-col sm:flex-row items-center justify-between text-xs text-[#a89680] gap-4">
          <p>© {new Date().getFullYear()} sinodayama vip. All rights reserved. 信太山新地 高額保証求人 公式サイト</p>

          <div className="flex items-center gap-4">
            {/* Direct CMS Admin Access button when enabled */}
            {showAdminLink && (
              <button
                onClick={onOpenAdmin}
                className="text-[11px] text-[#c5a059] hover:underline cursor-pointer flex items-center gap-1"
                id="footer-admin-login-link"
              >
                <LucideIcon name="Lock" size={12} />
                <span>管理ポータル</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
}
