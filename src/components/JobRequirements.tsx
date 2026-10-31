/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import LucideIcon from './LucideIcon';
import { LINE_OFFICIAL_URL } from '../data';

export default function JobRequirements() {
  const specs = [
    {
      label: '応募資格・スペック',
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-[#4f3f45] leading-relaxed">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            <div className="bg-[#fcfaf7] border border-[#c5a059]/40 rounded-xl p-3">
              <span className="text-[10px] text-[#a83252] font-bold block">年齢</span>
              <span className="font-sans font-bold text-sm text-[#1f181b]">20〜27才くらいまで</span>
            </div>
            <div className="bg-[#fcfaf7] border border-[#c5a059]/40 rounded-xl p-3">
              <span className="text-[10px] text-[#a83252] font-bold block">身長</span>
              <span className="font-sans font-bold text-sm text-[#1f181b]">140cm〜</span>
            </div>
            <div className="bg-[#fcfaf7] border border-[#c5a059]/40 rounded-xl p-3">
              <span className="text-[10px] text-[#a83252] font-bold block">スペック</span>
              <span className="font-sans font-bold text-sm text-[#1f181b]">108以上</span>
            </div>
            <div className="bg-[#fcfaf7] border border-[#c5a059]/40 rounded-xl p-3">
              <span className="text-[10px] text-[#a83252] font-bold block">バスト</span>
              <span className="font-sans font-bold text-sm text-[#1f181b]">Cカップ以上</span>
            </div>
            <div className="bg-[#fcfaf7] border border-[#c5a059]/40 rounded-xl p-3">
              <span className="text-[10px] text-[#a83252] font-bold block">適性</span>
              <span className="font-sans font-bold text-sm text-[#1f181b]">イチャイチャ系</span>
            </div>
            <div className="bg-[#fcfaf7] border border-[#c5a059]/40 rounded-xl p-3">
              <span className="text-[10px] text-[#a83252] font-bold block">採用地域</span>
              <span className="font-sans font-bold text-xs sm:text-sm text-[#1f181b]">大阪市内と隣接地域</span>
            </div>
          </div>
          <div className="bg-white border border-[#c5a059]/25 rounded-xl p-3 text-xs text-gray-600 space-y-1">
            <p>・※スペックの計算目安：<strong>身長(cm) − 体重(kg) ＝ 108以上</strong></p>
            <p>・<strong className="text-[#a83252]">完全未経験者大歓迎</strong>（仲居さん・女性スタッフが手厚くサポート）</p>
            <p>・お酒を飲む必要は一切ありません（お酒が飲めない方も多数活躍中）</p>
          </div>
        </div>
      )
    },
    {
      label: 'こんな女性に向いています♡',
      content: (
        <div className="space-y-3">
          <div className="bg-gradient-to-br from-pink-50/90 via-[#fcfaf7] to-rose-50/60 border border-pink-200/80 rounded-2xl p-4 sm:p-5 shadow-2xs">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 text-xs sm:text-sm text-[#4f3f45]">
              {[
                'イチャイチャするのが好きな方',
                'お客さんを喜ばせるのが好きな方',
                '人懐っこく、愛嬌がある方',
                'お客さんに楽しんでもらうことに喜びを感じる方',
                '約束した出勤日をきちんと守れる方',
                '責任感を持ってお仕事に取り組める方',
                '安定して出勤できる方',
                'お客さんにもお店にも誠実に向き合える方',
                '目標のためにやる気があって、しっかり稼ぎたい方'
              ].map((trait, idx) => (
                <li
                  key={idx}
                  className={`flex items-center gap-2.5 bg-white/95 border border-pink-100 rounded-xl px-3.5 py-2.5 shadow-2xs hover:border-pink-300 transition-colors ${
                    idx === 8 ? 'sm:col-span-2 bg-gradient-to-r from-pink-50/60 to-rose-50/60 font-bold text-[#a83252]' : ''
                  }`}
                >
                  <span className="text-secondary font-bold shrink-0">♥</span>
                  <span className="leading-snug">{trait}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )
    },
    {
      label: '必要書類・持ち物',
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-[#4f3f45] leading-relaxed">
          <div>
            <span className="font-bold text-[#a83252] block">① 本籍地記載の住民票（マイナンバーカード等でコンビニ即日発行可能）</span>
            <p className="text-xs text-gray-500 mt-0.5">
              ※法令順守および年齢確認のため、1日体験入店時でも必ずご持参いただく必要があります。
            </p>
          </div>
          <div>
            <span className="font-bold text-[#a83252] block">② 顔写真付き公的身分証明書</span>
            <p className="text-xs text-gray-500 mt-0.5">
              運転免許証、パスポート、マイナンバーカード等の有効期限内のもの。
            </p>
          </div>
          <div className="bg-[#fcfaf7] border border-[#c5a059]/40 rounded-xl p-3.5">
            <span className="font-bold text-[#1f181b] block mb-1">【体験入店時の持ち物】</span>
            <p className="text-xs text-[#4f3f45] leading-relaxed">
              仕事用の衣装は<strong>高級ロングドレスをすべて無料レンタル完備</strong>していますので、自前の衣装を用意する必要はありません（完全手ぶら出勤OK）。<br />
              体験入店当日は、普段お使いの<strong>メイク道具</strong>と<strong>身分証明書</strong>のみお持ちいただければすぐにお仕事可能です。
            </p>
          </div>
        </div>
      )
    },
    {
      label: '勤務時間・シフト',
      content: (
        <div className="space-y-2 text-xs sm:text-sm text-[#4f3f45] leading-relaxed">
          <p>
            <strong className="text-base text-[#1f181b]">12:00〜24:00</strong>（当店の営業時間）
          </p>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            ・完全自由出勤制（月1回の出勤でもOK、週1日〜レギュラーまで大歓迎）<br />
            ・希望シフトに合わせて柔軟に調整いたします。<br />
            <span className="font-bold text-[#a83252]">【シフト区分】</span><br />
            ①12:00～17:00最終受付 ②12:00～19:00最終受付 ③12:00～24:00最終受付<br />
            ④15:00～24:00最終受付 ⑤17:00～24:00最終受付 ⑥19:00～24:00最終受付
          </p>
        </div>
      )
    },
    {
      label: '勤務地・送迎',
      content: (
        <div className="space-y-1.5 text-xs sm:text-sm text-[#4f3f45] leading-relaxed">
          <p className="font-bold text-[#1f181b]">
            大阪府和泉市幸（信太山新地エリア）
          </p>
          <ul className="space-y-1 text-xs text-gray-600">
            <li>・お迎えは難波集合、お帰りはご自宅まで無料送迎（送り可能エリア対応・お住まいの場所はお気軽にお問い合わせください）</li>
            <li>・JR阪和線「信太山駅」より徒歩約3分（駅チカ）</li>
            <li>・家具家電付きマンション寮完備（即日入居可能）</li>
          </ul>
        </div>
      )
    },
    {
      label: '給与システム',
      content: (
        <div className="space-y-1 text-xs sm:text-sm text-[#4f3f45] leading-relaxed">
          <p>
            <strong className="text-[#a83252] text-sm sm:text-base">規定バック給＋高額永久保証制度完備（全額即日日払い・現金手渡し）</strong>
          </p>
          <p className="text-xs text-gray-600 leading-relaxed">
            ・1本バック：15分 3,800円／30分 7,200円／60分 15,200円<br />
            ・高額永久保証：日給¥35,000〜最大¥120,000（1日ごとに即日全額現金精算）<br />
            ・ノルマ・罰金・待機カット一切なし、衣装代やお菓子代などの雑費天引き完全0円。
          </p>
        </div>
      )
    }
  ];

  return (
    <section className="py-20 bg-[#fbf9f6] border-t border-[#c5a059]/25" id="requirements">
      <div className="max-w-[900px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#24171c] to-[#1c1216] border border-[#c5a059]/50 px-4 py-1.5 rounded-full text-[#ecd49f] font-sans font-bold text-xs tracking-widest uppercase mb-3 shadow-sm">
            <LucideIcon name="Crown" size={13} className="text-[#ecd49f]" />
            <span>REQUIREMENTS</span>
          </div>
          <h2 className="font-sans font-black text-2xl md:text-3xl lg:text-4xl text-[#1f181b] mb-3">
            募集要項
          </h2>
          <p className="font-sans text-xs md:text-sm text-[#4f3f45] max-w-xl mx-auto leading-relaxed">
            信太山新地の老舗店・当店で働くための応募資格・必要書類・勤務条件の概要です。
          </p>
          <div className="h-0.5 w-20 bg-gradient-to-r from-[#c5a059] via-[#ecd49f] to-[#c5a059] mx-auto rounded-full mt-4" />
        </div>

        {/* Clean Spec Table / Card Container */}
        <div className="bg-white rounded-3xl border-2 border-[#c5a059]/35 shadow-md overflow-hidden">
          <dl className="divide-y divide-[#c5a059]/20">
            {specs.map((spec) => (
              <div key={spec.label} className="grid grid-cols-1 md:grid-cols-12 p-5 sm:p-6 gap-2 md:gap-6 hover:bg-[#fcfaf7] transition-colors">
                <dt className="md:col-span-3 font-sans font-bold text-sm sm:text-base text-[#1f181b] flex items-start gap-2">
                  <span className="w-1.5 h-4 bg-[#c5a059] rounded-full shrink-0 mt-1 inline-block" />
                  <span>{spec.label}</span>
                </dt>
                <dd className="md:col-span-9">
                  {spec.content}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Quick Question / LINE Link */}
        <div className="mt-8 text-center">
          <p className="text-xs sm:text-sm text-[#4f3f45] mb-3">
            書類の取得方法やシフトについてなど、ご不明な点はお気軽にLINEでお問い合わせください。
          </p>
          <a
            href={LINE_OFFICIAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#06c755] hover:bg-[#05b34c] text-white font-sans font-bold text-xs sm:text-sm py-3 px-7 rounded-full shadow-md border border-[#c5a059]/40 hover:shadow-lg transition-all"
            id="requirements-line-cta"
          >
            <LucideIcon name="MessageCircle" size={16} className="fill-white text-white" />
            <span>LINEで質問・相談する</span>
          </a>
        </div>

      </div>
    </section>
  );
}
