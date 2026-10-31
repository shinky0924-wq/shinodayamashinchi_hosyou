/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import LucideIcon from './LucideIcon';

export default function JobWorkflow() {
  const steps = [
    {
      step: '01',
      time: '出勤・個室待機',
      title: '出勤・準備・個室待機',
      icon: 'Sparkles',
      image: '/images/col_vanity_trial_1789107497172.jpg',
      imageAlt: '清潔なドレッサーと個室待機スペース',
      desc: '出勤したら清潔な個室でメイクを整え、衣装に着替えます。無料の貸衣装やアメニティも充実。待機中はテレビやスマホを見ながらリラックスして自分のペースで過ごせます。'
    },
    {
      step: '02',
      time: 'マッチング・移動',
      title: '仲居さんによるマッチングとお部屋への移動',
      icon: 'Phone',
      image: '/images/ryotei_entrance_lantern_1789108525834.jpg',
      imageAlt: '老舗旅館の外観と店内ご案内',
      desc: '旅館に来店されたお客様の希望や好みに合わせ、仲居さんが出勤メンバーの中から選んで電話で旅館へ連絡します。連絡が入ったら、徒歩1〜2分圏内にある指定の旅館のお部屋へ移動します。外回りや客引きは一切ありません。'
    },
    {
      step: '03',
      time: '入室・ご挨拶',
      title: '入室・笑顔でのご挨拶（ベッド完備の清潔な洋室）',
      icon: 'Heart',
      image: '/images/col_ryotei_flow_1789107427433.jpg',
      imageAlt: '清潔な洋室・ベッドルーム',
      desc: '清潔な洋室・ベッドのお部屋でお待ちのお客様に笑顔で挨拶します。お客様は入口での手消毒やシャワーを事前に済ませているため清潔で安心です。'
    },
    {
      step: '04',
      time: '接客サービス',
      title: '基本サービス（絶対ゴム着用・15分〜60分）',
      icon: 'ShieldCheck',
      image: '/images/col_safety_shield_1789107540732.jpg',
      imageAlt: '安心の衛生管理とルール徹底',
      desc: '会話やキス、生フェラ、ゴム着用での挿入が基本サービスとなります。組合ルールとして【ゴムなし行為は完全禁止】されており、安全面が徹底されています。コースは最短15分から（30分・45分・60分）と短時間接客が中心。常連のお客様が多いため延長も入りやすい環境です。'
    },
    {
      step: '05',
      time: '終了コール・退室',
      title: '終了コール（内線ワンコール）・シャワーとお見送り',
      icon: 'Clock',
      image: '/images/col_welcome_gift_1783883703745.jpg',
      imageAlt: 'お見送りとお部屋の整頓',
      desc: '時間（タイマー）は仲居さんが計測しており、終了時間になると部屋の内線電話（ワンコール）が鳴ってスムーズにサービス終了となります。サービス完了後にシャワーを浴びて着替え、お客様をお見送り。お部屋の片付けや掃除は仲居さんが行うため手伝う必要はありません。'
    },
    {
      step: '06',
      time: '精算・帰宅',
      title: '即日全額日払い精算・自宅前まで無料送迎',
      icon: 'Coins',
      image: '/images/col_salary_savings_1789107442335.jpg',
      imageAlt: '全額当日日払い手渡し',
      desc: 'その日のシフトが終了したら退勤です。稼いだお給料（永久保証給含む）をその場で全額日払い（現金手渡し）で受け取れます。雑費天引きは完全ゼロ。行きは難波集合・帰りはご自宅前までの無料送迎で安全に帰宅できます。'
    }
  ];

  return (
    <section className="py-20 bg-[#fbf9f6] relative overflow-hidden" id="job-content">
      <div className="max-w-[1100px] mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#24171c] to-[#1c1216] border border-[#c5a059]/50 px-4 py-1.5 rounded-full text-[#ecd49f] font-sans font-bold text-xs tracking-widest uppercase mb-3 shadow-sm">
            <LucideIcon name="Crown" size={13} className="text-[#ecd49f]" />
            <span>DAILY WORKFLOW & SERVICE</span>
          </div>
          <h2 className="font-sans font-black text-2xl md:text-3xl lg:text-4xl text-[#1f181b] mb-4">
            お仕事内容と1日の流れ
          </h2>
          <p className="font-sans text-xs md:text-base text-[#4f3f45] max-w-2xl mx-auto leading-relaxed">
            コースは最短15分から60分。当店は常連のお客様が多いため延長も入りやすく、短時間でしっかり稼げます。<br className="hidden sm:inline" />
            仲居さんによるマッチングやタイマー内線コールなど、万全のサポート体制で安心してお仕事していただけます。
          </p>
          <div className="h-0.5 w-20 bg-gradient-to-r from-[#c5a059] via-[#ecd49f] to-[#c5a059] mx-auto rounded-full mt-4" />
        </div>

        {/* 3 Key Points Highlight Box */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="bg-white p-5 rounded-2xl border border-[#c5a059]/30 shadow-xs hover:border-[#c5a059] transition-all flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2a1d22] to-[#170e12] border border-[#c5a059]/40 text-[#ecd49f] flex items-center justify-center shrink-0">
              <LucideIcon name="Phone" size={20} />
            </div>
            <div>
              <h4 className="font-sans font-bold text-sm text-[#1f181b]">仲居さんによるマッチング</h4>
              <p className="text-xs text-[#524348]">やり手の仲居さんなので安心</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#c5a059]/30 shadow-xs hover:border-[#c5a059] transition-all flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2a1d22] to-[#170e12] border border-[#c5a059]/40 text-[#ecd49f] flex items-center justify-center shrink-0">
              <LucideIcon name="Clock" size={20} />
            </div>
            <div>
              <h4 className="font-sans font-bold text-sm text-[#1f181b]">15分〜60分の短時間接客</h4>
              <p className="text-xs text-[#524348]">内線ワンコールで終了・延長も人気</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#c5a059]/30 shadow-xs hover:border-[#c5a059] transition-all flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2a1d22] to-[#170e12] border border-[#c5a059]/40 text-[#ecd49f] flex items-center justify-center shrink-0">
              <LucideIcon name="ShieldCheck" size={20} />
            </div>
            <div>
              <h4 className="font-sans font-bold text-sm text-[#1f181b]">絶対ゴム着用・掃除不要</h4>
              <p className="text-xs text-[#524348]">片付けは仲居さん担当で楽ちん</p>
            </div>
          </div>
        </div>

        {/* 1日の流れタイムラインカード */}
        <div className="space-y-4 max-w-4xl mx-auto mb-14">
          {steps.map((st, idx) => (
            <motion.div
              key={st.step}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="bg-white rounded-3xl p-5 md:p-6 border border-[#c5a059]/30 shadow-xs hover:shadow-lg hover:border-[#c5a059]/80 transition-all flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6"
              id={`workflow-step-${st.step}`}
            >
              {/* Step number badge */}
              <div className="flex sm:flex-col items-center justify-between w-full sm:w-auto shrink-0 gap-2 sm:gap-1">
                <div className="flex items-center gap-3 sm:flex-col sm:gap-1">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2a1d22] to-[#170e12] border border-[#c5a059]/50 text-[#ecd49f] flex items-center justify-center font-sans font-black text-lg shadow-sm">
                    {st.step}
                  </div>
                  <span className="text-[10px] font-bold text-[#a83252] tracking-wider uppercase">
                    {st.time}
                  </span>
                </div>
                <div className="sm:hidden text-[#a83252]">
                  <LucideIcon name={st.icon} size={20} />
                </div>
              </div>

              {/* Image thumbnail */}
              <div className="w-full sm:w-36 md:w-44 h-36 sm:h-28 rounded-2xl overflow-hidden shrink-0 border border-[#c5a059]/30 shadow-xs relative group/img">
                <img
                  src={st.image}
                  alt={st.imageAlt}
                  className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent sm:hidden" />
                <span className="absolute bottom-2 left-2 text-[10px] text-white font-bold sm:hidden px-2 py-0.5 rounded bg-black/40 backdrop-blur-xs">
                  {st.title}
                </span>
              </div>

              {/* Main content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <h3 className="font-sans font-bold text-base md:text-lg text-[#1f181b]">
                    {st.title}
                  </h3>
                </div>
                <p className="font-sans text-xs md:text-sm text-[#4f3f45] leading-relaxed">
                  {st.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 安全対策・サポート環境バナー */}
        <div className="bg-gradient-to-r from-[#24171c] via-[#2f1c24] to-[#1c1216] border-2 border-[#c5a059]/60 rounded-3xl p-6 md:p-8 text-[#f7eed9] max-w-5xl mx-auto shadow-xl">
          <div className="text-center mb-6">
            <span className="inline-block bg-gradient-to-r from-[#c5a059] to-[#ecd49f] text-[#1f181b] text-[11px] font-bold tracking-widest px-3.5 py-1 rounded-full uppercase mb-2 shadow-sm">
              SAFETY & SUPPORT ENVIRONMENT
            </span>
            <h3 className="font-sans font-bold text-lg md:text-2xl text-white">
              女性が安心して働ける3つの安全ルール＆サポート体制
            </h3>
            <p className="text-xs md:text-sm text-[#e6d8c4] mt-1.5">
              無理な行為やトラブルから女性を守るための厳格な店舗ルールを徹底しています
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Rule 1 */}
            <div className="bg-[#1b1216]/80 border border-[#c5a059]/30 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-extrabold tracking-wider bg-[#c5a059]/20 text-[#ecd49f] px-2 py-0.5 rounded border border-[#c5a059]/30">
                    RULE 01
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-[#c5a059]/20 text-[#ecd49f] flex items-center justify-center">
                    <LucideIcon name="ShieldAlert" size={18} />
                  </div>
                </div>
                <h4 className="font-sans font-bold text-sm sm:text-base text-white mb-2 leading-snug">
                  無理な要求は即お断りOK<br className="hidden sm:inline" />（中断・即退室可）
                </h4>
                <p className="text-xs text-[#d8c8b4] leading-relaxed">
                  ゴムなし行為の強要や嫌がるリクエストは毅然と断ることができます。強引なお客様の場合は、その場でサービスを中断して退室しても問題ありません。常駐する仲居さんやスタッフがすぐに駆けつけて助けてくれます。
                </p>
              </div>
            </div>

            {/* Rule 2 */}
            <div className="bg-[#1b1216]/80 border border-[#c5a059]/30 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-extrabold tracking-wider bg-[#c5a059]/20 text-[#ecd49f] px-2 py-0.5 rounded border border-[#c5a059]/30">
                    RULE 02
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-[#c5a059]/20 text-[#ecd49f] flex items-center justify-center">
                    <LucideIcon name="Users" size={18} />
                  </div>
                </div>
                <h4 className="font-sans font-bold text-sm sm:text-base text-white mb-2 leading-snug">
                  厳格な客層制限<br className="hidden sm:inline" />（泥酔・未成年・外国人お断り）
                </h4>
                <p className="text-xs text-[#d8c8b4] leading-relaxed">
                  お酒を飲まれている方、未成年の方、日本語でのコミュニケーションが取れない外国人のお客様は、旅館の受付段階で仲居さんがすべてお断りするルールを徹底しています。トラブルを未然に防ぎます。
                </p>
              </div>
            </div>

            {/* Rule 3 */}
            <div className="bg-[#1b1216]/80 border border-[#c5a059]/30 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-extrabold tracking-wider bg-[#c5a059]/20 text-[#ecd49f] px-2 py-0.5 rounded border border-[#c5a059]/30">
                    RULE 03
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-[#c5a059]/20 text-[#ecd49f] flex items-center justify-center">
                    <LucideIcon name="HeartHandshake" size={18} />
                  </div>
                </div>
                <h4 className="font-sans font-bold text-sm sm:text-base text-white mb-2 leading-snug">
                  仲居さん常駐サポート＆<br className="hidden sm:inline" />お部屋の清掃・片付け不要
                </h4>
                <p className="text-xs text-[#d8c8b4] leading-relaxed">
                  時間のタイマー計測は仲居さんが行い、終了時間になると内線ワンコールでスムーズに終了。お部屋の片付けやシーツ交換・清掃はすべて仲居さんが担当するため、接客後の掃除や雑務の負担は一切ありません。
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#c5a059]/25 text-center text-xs text-[#ecd49f] font-medium">
            ※組合ルールによる絶対ゴム着用と、常駐仲居さんによる手厚いサポートで、女性の安全を最優先に守る体制が確立されています。
          </div>
        </div>

      </div>
    </section>
  );
}
