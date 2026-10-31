/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import LucideIcon from './LucideIcon';

export default function AboutTobita() {
  const points = [
    {
      icon: 'Coins',
      badge: '01. PERMANENT GUARANTEE',
      title: '💰 1. 完全永久保証で100％稼げる（7時間待機で8万円永久保証）',
      desc: '在籍するすべてのキャスト様に【高額の永久保証制度】をご用意しています。7時間待機で【8万円を永久保証】し、保証給は1日ごとにその日の退勤時に全額現金で即日精算。「お客様が入らず稼げなかったらどうしよう…」という不安やイライラとは無縁の環境で、初日から確実に見通しの立つ高収入を得られます。'
    },
    {
      icon: 'Home',
      badge: '02. INN EXCLUSIVE',
      title: '🏮 2. 旅館専属・外回りや他店への挨拶回りなし',
      desc: '当店は伝統ある老舗旅館のため、お店の外に出て客引きをしたり、外回りや他店への挨拶回りは一切ありません。清潔で落ち着いた旅館の店内・お部屋の中だけで、安心してお仕事に専念していただけます。'
    },
    {
      icon: 'EyeOff',
      badge: '03. COMPLETE PRIVACY',
      title: '🙈 3. 完全に顔だしなし・写メ日記もパネルもHP掲載もなし',
      desc: 'プライバシーと身バレ防止を徹底しています。ホームページや求人サイト、SNSへの顔出し写真掲載はゼロ。さらにお店のパネル写真や面倒な写メ日記の更新ノルマも一切ありません。完全源氏名でお仕事でき、家族や会社、知人に知られる心配なく秘密厳守で働けます。'
    },
    {
      icon: 'Car',
      badge: '04. FREE TRANSFER',
      title: '🚗 4. 送迎あり・難波集合で帰りはご自宅前まで直行',
      desc: '通勤の負担を最小限に抑える安心の無料送迎サポートを完備しています。出勤時はアクセスの良い「難波」に集合して専用車でラクラクお店へ。退勤後は深夜でも安心、あなたのご自宅前までしっかりお送りいたします。電車代がかからず終電を気にする必要もありません。'
    },
    {
      icon: 'Smile',
      badge: '05. ZERO PENALTY',
      title: '🕊️ 5. 罰金なしノルマなし・のびのび働けます',
      desc: '売上ノルマ、出勤ノルマ、指名ノルマなどは一切ありません。遅刻や当日欠勤による理不尽な罰金ペナルティもゼロ。女性スタッフと優しい仲居のおばちゃんが温かくサポートするアットホームな環境で、プレッシャーを感じずのびのびと自分のペースで働けます。'
    },
    {
      icon: 'CalendarCheck',
      badge: '06. FLEXIBLE SHIFT',
      title: '🗓️ 6. 完全自由出勤制・月に一度の出勤でもOK',
      desc: '出勤日数やシフトの縛りは一切ありません。「週1日だけ」「週末のみ」「本業や学業の合間に月1回だけ」「スキマ時間にお小遣い稼ぎ」など、ライフスタイルに合わせた自由な働き方が可能です。急なシフト相談や変更もLINEで柔軟に対応いたします。'
    }
  ];

  const overviewRows = [
    {
      label: '所在地',
      value: '大阪府和泉市幸（信太山新地エリア）'
    },
    {
      label: '最寄り駅・送迎',
      value: 'お迎えは難波集合・お帰りはご自宅まで無料送迎あり（送り可能エリア対応） ／ JR阪和線「信太山駅」徒歩約3分'
    },
    {
      label: '当店の営業スタイル',
      value: '旅館専属（外回り挨拶回りなし）・完全顔出しなし（写メ日記＆パネル＆HP掲載ゼロ）'
    },
    {
      label: '出勤スタイル・ノルマ',
      value: '完全自由出勤制（月1回〜OK） ／ 罰金・売上ノルマ完全なし・未経験歓迎'
    },
    {
      label: '営業時間',
      value: '12:00〜24:00（短時間〜長時間まで自由シフト）'
    },
    {
      label: 'お給料・保証システム',
      value: '日給35,000円〜最大120,000円の高額永久保証あり（1日ごとに即日全額現金精算 ／ 雑費は1日3,000円のみ）'
    }
  ];

  return (
    <section className="py-20 bg-[#fbf9f6] relative overflow-hidden" id="about">
      {/* Subtle Background Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#c5a059]/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#a83252]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-[1100px] mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#24171c] to-[#1c1216] border border-[#c5a059]/50 px-4 py-1.5 rounded-full text-[#ecd49f] font-sans font-bold text-xs tracking-widest uppercase mb-3 shadow-sm">
            <LucideIcon name="Crown" size={13} className="text-[#ecd49f]" />
            <span>ABOUT OUR SHOP</span>
          </div>
          <h2 className="font-sans font-black text-2xl md:text-3xl lg:text-4xl text-[#1f181b] mb-4">
            信太山新地の当店が選ばれる理由
          </h2>
          <p className="font-sans text-xs md:text-base text-[#4f3f45] max-w-2xl mx-auto leading-relaxed">
            大阪・和泉市にある伝統ある老舗料亭街「信太山新地」。<br className="hidden sm:inline" />
            当店は20年以上の実績を誇る地域トップクラス店として、在籍キャスト全員への【高額永久保証】、お店の奥での顔合わせによる徹底した身バレ対策、雑費は1日3,000円のみの明朗即日日払いをお約束いたします。
          </p>
          <div className="h-0.5 w-20 bg-gradient-to-r from-[#c5a059] via-[#ecd49f] to-[#c5a059] mx-auto rounded-full mt-4" />
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-12">
          {points.map((pt, idx) => (
            <motion.div
              key={pt.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="bg-white hover:bg-[#fffdfa] p-6 rounded-3xl border border-[#c5a059]/30 hover:border-[#c5a059]/80 shadow-[0_4px_20px_-4px_rgba(31,24,27,0.06)] hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
              id={`about-point-${idx + 1}`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2a1d22] to-[#170e12] border border-[#c5a059]/50 flex items-center justify-center text-[#ecd49f] group-hover:scale-105 transition-transform duration-300 shadow-sm">
                    <LucideIcon name={pt.icon} size={22} />
                  </div>
                  <span className="text-[10px] font-bold tracking-widest text-[#a83252] bg-[#f5e7ce]/70 border border-[#c5a059]/40 px-2.5 py-1 rounded-full">
                    {pt.badge}
                  </span>
                </div>
                <h3 className="font-sans font-bold text-base md:text-lg text-[#1f181b] mb-2.5 group-hover:text-[#a83252] transition-colors">
                  {pt.title}
                </h3>
                <p className="font-sans text-xs md:text-sm text-[#4f3f45] leading-relaxed">
                  {pt.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Summary Table */}
        <div className="bg-white border-2 border-[#c5a059]/35 rounded-3xl p-6 md:p-8 mb-10 max-w-4xl mx-auto shadow-md">
          <h3 className="font-sans font-bold text-base md:text-xl text-[#1f181b] mb-4 flex items-center gap-2.5">
            <LucideIcon name="Crown" size={20} className="text-[#c5a059]" />
            <span>信太山新地・当店の基本データまとめ</span>
          </h3>
          <div className="divide-y divide-[#c5a059]/20">
            {overviewRows.map((row) => (
              <div key={row.label} className="py-3.5 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs md:text-sm">
                <span className="sm:w-48 shrink-0 font-bold text-[#a83252] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] inline-block" />
                  {row.label}
                </span>
                <span className="text-[#1f181b] font-medium leading-relaxed">
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recruitment Banner Note */}
        <div className="bg-gradient-to-r from-[#24171c] via-[#2f1c24] to-[#1c1216] border-2 border-[#c5a059]/60 rounded-3xl p-7 md:p-9 text-center max-w-3xl mx-auto shadow-xl text-[#f7eed9]">
          <span className="inline-block bg-gradient-to-r from-[#c5a059] to-[#ecd49f] text-[#1f181b] text-[11px] font-black tracking-widest px-3.5 py-1 rounded-full uppercase mb-3 shadow-sm">
            OUR PRESTIGE PROMISE
          </span>
          <h4 className="font-sans font-bold text-lg md:text-2xl text-white mb-2 tracking-wide">
            在籍キャスト全員に永久保証！地域最高峰の信頼と実績
          </h4>
          <p className="font-sans text-xs md:text-sm text-[#e6d8c4] leading-relaxed max-w-2xl mx-auto">
            当店は信太山新地で20年以上、地域トップクラスの信頼を誇る老舗店です。<br className="hidden sm:inline" />
            お客様が一年中途切れないため「稼げずイライラする」心配がありません。雑費は1日3,000円のみと明確で、単価15分3,800円〜60分15,200円＋永久保証で即日全額現金手渡しいたします。
          </p>
        </div>
      </div>
    </section>
  );
}
