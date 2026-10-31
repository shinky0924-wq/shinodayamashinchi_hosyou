/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import LucideIcon from './LucideIcon';
import { SiteContent } from '../siteContent';

interface JobDetailsProps {
  content: SiteContent['jobs'];
  onCtaclickWithData: (data: string) => void;
}

export default function JobDetails({ content, onCtaclickWithData }: JobDetailsProps) {
  // 信太山新地の規定バック給リスト
  const backRates = [
    { time: '15分', back: '3,800円', note: '短時間クイックコース' },
    { time: '30分', back: '7,200円', note: '基本・一番人気の標準コース' },
    { time: '60分', back: '15,200円', note: 'じっくり高額バックコース' }
  ];

  // 高額保証制度リスト
  const guaranteePlans = [
    {
      num: '①',
      time: '12:00～17:00 最終受付',
      shortName: '① 12:00〜17:00',
      weekdayVal: 35000,
      weekendVal: 40000,
      weekday: '¥35,000',
      weekend: '¥40,000',
      weekendLabel: '土日祝',
      note: '昼〜夕方の短時間シフト（主婦・学生・Wワークにも大人気）'
    },
    {
      num: '②',
      time: '12:00～19:00 最終受付',
      shortName: '② 12:00〜19:00',
      weekdayVal: 45000,
      weekendVal: 50000,
      weekday: '¥45,000',
      weekend: '¥50,000',
      weekendLabel: '土日祝',
      note: '夕食前・夜の予定前にしっかり稼げる夕方シフト'
    },
    {
      num: '③',
      time: '12:00～24:00 最終受付',
      shortName: '③ 12:00〜24:00',
      weekdayVal: 110000,
      weekendVal: 120000,
      weekday: '¥110,000',
      weekend: '¥120,000',
      weekendLabel: '土日祝＆祝前日',
      note: 'フルタイム最高峰保証！1日で10万円以上を確実に手渡し'
    },
    {
      num: '④',
      time: '15:00～24:00 最終受付',
      shortName: '④ 15:00〜24:00',
      weekdayVal: 90000,
      weekendVal: 100000,
      weekday: '¥90,000',
      weekend: '¥100,000',
      weekendLabel: '土日祝＆祝前日',
      note: '定番の夜メインシフト！日給9万〜10万円の超高額保証'
    },
    {
      num: '⑤',
      time: '17:00～24:00 最終受付',
      shortName: '⑤ 17:00〜24:00',
      weekdayVal: 80000,
      weekendVal: 90000,
      weekday: '¥80,000',
      weekend: '¥90,000',
      weekendLabel: '土日祝＆祝前日',
      note: '7時間待機で8万〜9万円を永久保証！仕事帰りや夕方出勤に最適'
    },
    {
      num: '⑥',
      time: '19:00～24:00 最終受付',
      shortName: '⑥ 19:00〜24:00',
      weekdayVal: 55000,
      weekendVal: 65000,
      weekday: '¥55,000',
      weekend: '¥65,000',
      weekendLabel: '土日祝＆祝前日',
      note: '遅出・夜からのショートシフトでも日給5.5万〜6.5万円保証'
    }
  ];

  // Simulator State - 保証金額に連動
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(4); // デフォルト: ⑤ 17:00〜24:00（8万円保証）
  const [isWeekend, setIsWeekend] = useState(false);
  const [daysPerWeek, setDaysPerWeek] = useState(3);
  const [sessionsPerDay, setSessionsPerDay] = useState(4);

  const selectedPlan = guaranteePlans[selectedPlanIndex] || guaranteePlans[4];
  const baseGuaranteeDaily = isWeekend ? selectedPlan.weekendVal : selectedPlan.weekdayVal;
  
  // 接客歩合（30分基本バック7,200円準拠）
  const pieceworkDaily = sessionsPerDay * 7200;
  
  // 保証額を下回ることは絶対にない安心システム（高い方を支給）
  const dailyEarnings = Math.max(baseGuaranteeDaily, pieceworkDaily);
  const weeklyEarnings = dailyEarnings * daysPerWeek;
  const monthlyEarnings = weeklyEarnings * 4.2; // approx weeks per month

  const handleShareToForm = () => {
    const dataMessage = `【給与シミュレーター希望】${selectedPlan.shortName}（${isWeekend ? '土日祝' : '平日'}）・週${daysPerWeek}日勤務・1日目安${sessionsPerDay}本 (日給保証目安: 約${workingFormatter(dailyEarnings)}円 / 月収目安: 約${workingFormatter(monthlyEarnings)}円)`;
    onCtaclickWithData(dataMessage);
  };

  const workingFormatter = (num: number) => {
    return Math.floor(num).toLocaleString();
  };

  // 充実待遇リスト
  const benefits = [
    {
      icon: 'BadgePercent',
      title: '雑費・天引き一切なし（完全0円）',
      desc: '衣装代・備品代・お菓子代などの雑費天引きは一切ありません。働いた分のお給料を100%全額お渡しします。'
    },
    {
      icon: 'Coins',
      title: '全額日払い・手渡し',
      desc: '稼いだお給料はその日の退勤時に全額現金手渡しでお持ち帰りいただけます。急な出費や金欠でも安心です。'
    },
    {
      icon: 'Smile',
      title: 'ノルマ・罰金・ペナルティなし',
      desc: '売上ノルマや待機カット、遅刻・欠勤による罰金等は一切ありません。プレッシャーなく自分のペースで働けます。'
    },
    {
      icon: 'Car',
      title: '送迎',
      desc: 'お迎えは難波集合、お帰りはご自宅まで送迎します。重い荷物や夜間の移動も負担が少なく、安心して通勤できます。\n\n送り可能なエリアには範囲がありますので、お住まいの場所についてはお気軽にお問い合わせください。'
    },
    {
      icon: 'Home',
      title: '家具家電付きマンション寮完備',
      desc: '即日入居可能なワンルームマンション寮をご用意。遠方からの引越しや、一人暮らしを始めたい方も大歓迎です。'
    },
    {
      icon: 'Baby',
      title: '提携託児所・Wワーク歓迎',
      desc: 'ママさん応援の託児所サポート完備。昼職・学生・OLさんの副業（掛け持ち）シフトも完全対応しています。'
    },
    {
      icon: 'Sparkles',
      title: '安心の1日体験入店制度',
      desc: 'まずは1日体験入店でお店の雰囲気やお仕事をチェックできます。合わないと感じた場合は即日精算の上でその日に退店可能です。'
    },
    {
      icon: 'Crown',
      title: '交通費支給・衣装無料貸出',
      desc: '通勤交通費をしっかり支給。清楚なワンピース・ドレス・着物など豊富な衣装が無料でレンタルできるため手ぶらで出勤OK。'
    }
  ];

  return (
    <section className="py-20 bg-white" id="jobs">
      <div className="max-w-[1100px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#24171c] to-[#1c1216] border border-[#c5a059]/50 px-4 py-1.5 rounded-full text-[#ecd49f] font-sans font-bold text-xs tracking-widest uppercase mb-3 shadow-sm">
            <LucideIcon name="Crown" size={13} className="text-[#ecd49f]" />
            <span>{content?.subtitle || 'SALARY & BENEFITS'}</span>
          </div>
          <h2 className="font-sans font-black text-2xl md:text-3xl lg:text-4xl mb-4 text-[#1f181b]">
            {content?.title || '当店のお給料＆最高峰の待遇'}
          </h2>
          <p className="font-sans text-xs md:text-base text-[#4f3f45] max-w-2xl mx-auto leading-relaxed">
            当店は信太山新地の規定バック給に準拠し、15分3,800円／30分7,200円／60分15,200円。<br className="hidden sm:inline" />
            在籍キャスト全員に【高額の永久保証】を完備し、衣装代・お菓子代などの雑費天引きは完全0円！稼いだお給料は100%全額即日日払い（現金手渡し）でお渡しします。
          </p>
          <div className="h-0.5 w-20 bg-gradient-to-r from-[#c5a059] via-[#ecd49f] to-[#c5a059] mx-auto rounded-full mt-4" />
        </div>

        {/* 当店の固定バック給テーブル */}
        <div className="bg-white border-2 border-[#c5a059]/35 rounded-3xl p-6 md:p-8 mb-12 shadow-md">
          <div className="text-center mb-8">
            <span className="inline-block bg-gradient-to-r from-[#24171c] to-[#1c1216] text-[#ecd49f] border border-[#c5a059]/40 text-[11px] font-bold tracking-widest px-3.5 py-1 rounded-full uppercase mb-2">
              REGULAR BACK SYSTEM
            </span>
            <h3 className="font-sans font-bold text-xl md:text-2xl text-[#1f181b]">
              信太山新地・当店の明瞭なバック給
            </h3>
            <p className="text-xs md:text-sm text-[#4f3f45] mt-1.5">
              在籍キャスト様全員に永久保証あり。全額即日日払い・手渡し支給！
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-3xl mx-auto">
            {backRates.map((br) => (
              <div 
                key={br.time}
                className="bg-gradient-to-b from-[#fcfaf7] to-white rounded-2xl p-6 border border-[#c5a059]/30 text-center shadow-xs hover:border-[#c5a059] hover:shadow-lg transition-all"
              >
                <div className="text-xs font-bold text-[#a83252] mb-1">コース時間</div>
                <div className="font-sans font-black text-2xl md:text-3xl text-[#1f181b] mb-3">
                  {br.time}
                </div>
                <div className="bg-[#f5e7ce]/50 border border-[#c5a059]/30 rounded-xl py-3 px-2 mb-2.5">
                  <div className="text-[11px] text-[#524348] font-bold mb-0.5">女の子バック額</div>
                  <div className="font-sans font-black text-2xl md:text-3xl text-[#a83252]">
                    {br.back}
                  </div>
                </div>
                <p className="text-xs text-[#4f3f45] font-medium leading-tight">
                  {br.note}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center text-xs text-[#524348] font-medium">
            ※接客した分だけ上記金額が確実に積み上がります。不透明な天引きや罰金、歩合引き下げは一切ありません。
          </div>
        </div>

        {/* 高額保証制度 */}
        <div className="bg-gradient-to-r from-[#24171c] via-[#2f1c24] to-[#1c1216] border-2 border-[#c5a059]/60 rounded-3xl p-6 md:p-10 mb-14 shadow-2xl text-[#f7eed9]" id="guarantee-system">
          <div className="text-center mb-8">
            <span className="inline-block bg-gradient-to-r from-[#c5a059] to-[#ecd49f] text-[#1f181b] text-[11px] font-bold tracking-widest px-3.5 py-1 rounded-full uppercase mb-2 shadow-sm">
              HIGH GUARANTEE SYSTEM
            </span>
            <h3 className="font-sans font-bold text-2xl md:text-3xl text-white">
              高額保証制度
            </h3>
            <p className="text-xs md:text-sm text-[#e6d8c4] mt-2 max-w-xl mx-auto">
              在籍キャスト全員に永久保証を完備。お客様の入りに関わらず、規定のシフト時間に応じた高額日給を完全保証＆即日現金日払い！
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {guaranteePlans.map((plan) => (
              <div
                key={plan.num}
                className="bg-[#1b1216]/85 border border-[#c5a059]/40 rounded-2xl p-5 hover:border-[#c5a059] transition-all flex flex-col justify-between shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-[#c5a059]/20">
                    <span className="text-xs font-black text-[#ecd49f] bg-[#c5a059]/20 px-2.5 py-0.5 rounded-full border border-[#c5a059]/40">
                      {plan.num}
                    </span>
                    <span className="text-xs font-bold text-white tracking-wide">
                      {plan.time}
                    </span>
                  </div>

                  <div className="space-y-2 my-3">
                    <div className="flex items-center justify-between bg-black/40 px-3.5 py-2.5 rounded-xl border border-white/5">
                      <span className="text-xs text-[#d8c8b4] font-medium">平日</span>
                      <span className="font-sans font-black text-xl text-white">
                        {plan.weekday}
                      </span>
                    </div>

                    <div className="flex items-center justify-between bg-gradient-to-r from-[#a83252]/30 to-[#8c1e3a]/30 px-3.5 py-2.5 rounded-xl border border-[#a83252]/40">
                      <span className="text-xs text-[#ecd49f] font-bold">{plan.weekendLabel}</span>
                      <span className="font-sans font-black text-xl text-[#ecd49f]">
                        {plan.weekend}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-[#b8a690] mt-1 pt-2 border-t border-white/5 leading-relaxed">
                  {plan.note}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-[#c5a059]/30 text-center text-xs text-[#ecd49f] font-medium leading-relaxed">
            ※保証給はすべて1日ごとに退勤時、全額現金手渡しで即日精算いたします。接客バックが保証額を上回った場合は高い方の全額を支給します。
          </div>
        </div>

        {/* 充実待遇 8選 */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="font-sans font-bold text-xl md:text-2xl text-[#1f181b]">
              当店の充実待遇・最高水準のサポート
            </h3>
            <p className="text-xs md:text-sm text-[#4f3f45] mt-1.5">
              地域トップクラスの老舗店として、女性が安心して長く稼げる環境づくりに妥協しません
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map((bnf) => (
              <div 
                key={bnf.title}
                className="bg-white p-5 rounded-2xl border border-[#c5a059]/30 shadow-xs flex flex-col justify-between hover:border-[#c5a059] hover:shadow-md transition-all"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2a1d22] to-[#170e12] border border-[#c5a059]/40 text-[#ecd49f] flex items-center justify-center mb-3">
                    <LucideIcon name={bnf.icon} size={20} />
                  </div>
                  <h4 className="font-sans font-bold text-sm md:text-base text-[#1f181b] mb-2">
                    {bnf.title}
                  </h4>
                  <p className="font-sans text-xs text-[#4f3f45] leading-relaxed whitespace-pre-line">
                    {bnf.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Earning Simulator Core */}
        <div className="bg-gradient-to-br from-[#24171c] via-[#2e1d24] to-[#1c1216] text-[#f7eed9] border-2 border-[#c5a059]/50 rounded-3xl md:rounded-[36px] p-6 md:p-10 shadow-2xl" id="earnings-simulator">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* User Controls */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <span className="bg-gradient-to-r from-[#c5a059] to-[#ecd49f] text-[#1f181b] font-sans font-bold text-[10px] tracking-widest px-3 py-1 rounded-full uppercase">
                  INCOME SIMULATOR
                </span>
                <h3 className="font-sans font-bold text-lg md:text-2xl text-white mt-3 mb-2">
                  {content.simulatorTitle || '1分でわかる！給与シミュレーター'}
                </h3>
                <p className="font-sans text-xs md:text-sm text-[#e6d8c4]">
                  希望するシフト（保証プラン）と日数から、見込み収入をリアルタイムに計算します。
                </p>
              </div>

              {/* Step 1: Select Guarantee Plan */}
              <div className="space-y-2 bg-[#1b1216]/90 p-4 rounded-2xl border border-[#c5a059]/30">
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <label className="font-bold text-white flex items-center gap-1.5">
                    <LucideIcon name="Clock" size={16} className="text-[#ecd49f]" />
                    <span>希望のシフト（保証プラン）:</span>
                  </label>
                  <span className="text-[11px] text-[#ecd49f] font-bold">
                    最低保証: ¥{workingFormatter(baseGuaranteeDaily)}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                  {guaranteePlans.map((plan, idx) => {
                    const isSelected = selectedPlanIndex === idx;
                    const guaranteedAmount = isWeekend ? plan.weekend : plan.weekday;
                    return (
                      <button
                        key={plan.num}
                        type="button"
                        onClick={() => setSelectedPlanIndex(idx)}
                        className={`text-left p-2.5 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-gradient-to-r from-[#c5a059] to-[#ecd49f] text-[#1f181b] border-white shadow-md'
                            : 'bg-black/40 text-gray-300 border-white/10 hover:border-[#c5a059]/50'
                        }`}
                      >
                        <div className="text-[10px] font-bold opacity-80">{plan.shortName}</div>
                        <div className={`font-sans font-black text-xs sm:text-sm mt-0.5 ${isSelected ? 'text-[#1f181b]' : 'text-[#ecd49f]'}`}>
                          保証 {guaranteedAmount}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Weekday vs Weekend Toggle */}
              <div className="flex items-center justify-between bg-[#1b1216]/90 p-3.5 rounded-2xl border border-[#c5a059]/30">
                <span className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                  <LucideIcon name="CalendarCheck" size={16} className="text-[#ecd49f]" />
                  出勤曜日タイプ:
                </span>
                <div className="inline-flex bg-black/60 p-1 rounded-xl border border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsWeekend(false)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      !isWeekend
                        ? 'bg-[#c5a059] text-[#1f181b] shadow-xs'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    平日
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsWeekend(true)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      isWeekend
                        ? 'bg-[#a83252] text-white shadow-xs'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    土日祝（保証UP）
                  </button>
                </div>
              </div>

              {/* Step 3: Days per week slider */}
              <div className="space-y-2 bg-[#1b1216]/90 p-4 rounded-2xl border border-[#c5a059]/30">
                <div className="flex justify-between items-center text-sm">
                  <label className="font-bold text-white flex items-center gap-1.5">
                    <LucideIcon name="Calendar" size={16} className="text-[#ecd49f]" />
                    週の勤務日数:
                  </label>
                  <span className="font-sans font-bold text-[#ecd49f] text-base">
                    週 <span className="text-xl font-sans">{daysPerWeek}</span> 日
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="6"
                  value={daysPerWeek}
                  onChange={(e) => setDaysPerWeek(Number(e.target.value))}
                  className="w-full accent-[#c5a059] h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  id="days-slider"
                />
                <div className="flex justify-between text-[10px] text-[#b8a690] font-bold px-1">
                  <span>週1日 (副業・スキマ)</span>
                  <span>週3日 (レギュラー)</span>
                  <span>週5〜6日 (ガッツリ高収入)</span>
                </div>
              </div>

              {/* Step 4: Sessions slider */}
              <div className="space-y-2 bg-[#1b1216]/90 p-4 rounded-2xl border border-[#c5a059]/30">
                <div className="flex justify-between items-center text-sm">
                  <label className="font-bold text-white flex items-center gap-1.5">
                    <LucideIcon name="Heart" size={16} className="text-[#ecd49f]" />
                    1日の目安接客本数（歩合上乗せシミュレーション）:
                  </label>
                  <span className="font-sans font-bold text-[#ecd49f] text-base">
                    1日 <span className="text-xl font-sans">{sessionsPerDay}</span> 本
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={sessionsPerDay}
                  onChange={(e) => setSessionsPerDay(Number(e.target.value))}
                  className="w-full accent-[#c5a059] h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  id="sessions-slider"
                />
                <div className="flex justify-between text-[10px] text-[#b8a690] font-bold px-1">
                  <span>マイペース (1〜3本)</span>
                  <span>標準的 (4〜6本)</span>
                  <span>大繁盛 (7〜10本)</span>
                </div>
                <div className="text-[10px] text-[#ecd49f] mt-1 text-right">
                  ※本数が少なくても高額保証給（日給¥{workingFormatter(baseGuaranteeDaily)}）が100%確実に全額支給されます。
                </div>
              </div>
            </div>

            {/* Results display */}
            <div className="lg:col-span-5 bg-white text-[#1f181b] rounded-2xl md:rounded-3xl p-6 md:p-8 border-2 border-[#c5a059]/40 shadow-xl flex flex-col justify-between h-full" id="simulator-results">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#a83252] tracking-widest uppercase">
                    ESTIMATES SUMMARY
                  </span>
                  <span className="text-[10px] font-bold bg-[#ecd49f]/40 text-[#524348] px-2 py-0.5 rounded-full border border-[#c5a059]/40">
                    {dailyEarnings > baseGuaranteeDaily ? '歩合上乗せ達成！' : '高額永久保証適用'}
                  </span>
                </div>
                
                {/* Daily estimation */}
                <div className="flex justify-between items-center border-b border-[#c5a059]/20 pb-3">
                  <div>
                    <span className="text-xs font-bold text-[#524348] block">日給目安（即日全額手渡し）:</span>
                    <span className="text-[10px] text-gray-500">
                      {selectedPlan.shortName}（最低保証: ¥{workingFormatter(baseGuaranteeDaily)}）
                    </span>
                  </div>
                  <span className="font-sans font-black text-xl text-[#a83252]">
                    約 {workingFormatter(dailyEarnings)} 円
                  </span>
                </div>

                {/* Weekly estimation */}
                <div className="flex justify-between items-center border-b border-[#c5a059]/20 pb-3">
                  <span className="text-xs font-bold text-[#524348]">週給目安（週{daysPerWeek}日）:</span>
                  <span className="font-sans font-bold text-sm text-[#1f181b]">
                    約 {workingFormatter(weeklyEarnings)} 円
                  </span>
                </div>

                {/* Monthly estimation */}
                <div className="bg-[#fcfaf7] p-4 rounded-2xl flex flex-col items-center justify-center text-center border border-[#c5a059]/35">
                  <span className="text-xs font-bold text-[#a83252] mb-1">【月収見込み目安】</span>
                  <span className="font-sans font-black text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#a83252] via-[#8c1e3a] to-[#a83252]">
                    約 {workingFormatter(monthlyEarnings)} <span className="text-sm font-sans font-bold text-[#1f181b]">円</span>
                  </span>
                  <span className="text-[10px] text-[#524348] mt-1">
                    ※永久保証給＋接客バックが100%手元に残ります（天引き完全0円）
                  </span>
                </div>
              </div>

              <button
                onClick={handleShareToForm}
                className="mt-6 w-full bg-[#06c755] hover:bg-[#05b34c] text-white font-sans font-bold text-sm py-3.5 px-4 rounded-xl shadow-lg border border-[#c5a059]/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
                id="simulator-share-cta"
              >
                <LucideIcon name="MessageCircle" size={16} className="fill-white text-white" />
                <span>LINEでこの希望を相談する</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
