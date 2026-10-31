/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ConcernItem, ReasonItem, FAQItem, TestimonialItem, JobFactItem, FlowStep } from './types';

const castAvatarOne = '/images/japanese_cast_avatar_one.jpg';
const castAvatarTwo = '/images/japanese_cast_avatar_two.jpg';
const castAvatarThree = '/images/japanese_cast_avatar_three.jpg';
const heroBanner = '/images/shinodayama_bustling_ryokan_hero.jpg?v=20261022_queue';
const staffAdvisorAvatar = '/images/japanese_staff_advisor.jpg';

export const LINE_OFFICIAL_URL = 'https://lin.ee/quudzvJ3';

export const HERO_IMAGE_URL = heroBanner;
export const CONSULTANT_AVATAR_URL = staffAdvisorAvatar;

export const CONCERNS: ConcernItem[] = [
  {
    id: 'concern-1',
    iconName: 'Baby',
    title: '未経験でも',
    question: '働ける？'
  },
  {
    id: 'concern-2',
    iconName: 'ShieldAlert',
    title: '落ち着いた',
    question: '客層なの？'
  },
  {
    id: 'concern-3',
    iconName: 'EyeOff',
    title: '顔バレ・身バレ',
    question: 'したくない'
  },
  {
    id: 'concern-4',
    iconName: 'Store',
    title: 'お店の雰囲気は',
    question: '安心できる？'
  },
  {
    id: 'concern-5',
    iconName: 'Coins',
    title: '30分7,200円で',
    question: 'ちゃんと稼げる？'
  }
];

export const REASONS: ReasonItem[] = [
  {
    number: '01',
    iconName: 'EyeOff',
    title: 'お店の玄関から顔が見えない',
    description: 'のれんをくぐった店内奥で顔合わせをするため、通行人に顔を見られず安心です。'
  },
  {
    number: '02',
    iconName: 'Award',
    title: '完全未経験から歓迎',
    description: '初心者の方にも女性スタッフが丁寧な事前レクチャーを行い、親身にサポートします。'
  },
  {
    number: '03',
    iconName: 'Users',
    title: '20〜27才の女性が活躍中',
    description: '完全未経験の方から学生・OL・フリーターまで、20〜27才の女性が安心して活躍しています。'
  },
  {
    number: '04',
    iconName: 'MessageSquare',
    title: 'LINEで気軽に事前相談',
    description: '応募前に不安なことや疑問点を、24時間いつでもLINEで気軽に質問できます。'
  },
  {
    number: '05',
    iconName: 'Coins',
    title: '高額永久保証・全額日払い',
    description: '衣装代・お菓子代の雑費天引きは完全0円。稼いだお給料はその日の退勤時に全額現金手渡し。'
  },
  {
    number: '06',
    iconName: 'HandHeart',
    title: '1日体験入店もOK',
    description: 'まずは1日体験入店でお店の雰囲気を確認でき、その日のうちに全額日払い精算。'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Q. 未経験でも本当に大丈夫ですか？',
    answer: 'A. はい、もちろんです！現在当店で働いている女性の多くが未経験からのスタートです。接客は15分〜60分のシンプルな内容で、お客様のご案内もベテランの仲居さん（おばちゃん）がすべてサポートします。'
  },
  {
    id: 'faq-2',
    question: 'Q. 年齢制限や採用基準はありますか？どんな女性を募集していますか？',
    answer: 'A. 応募資格は20歳〜27歳くらいまで、身長140cm〜、スペック108以上、バストCカップ以上、適性はイチャイチャ系の方を募集しています。採用地域は大阪市内および隣接地域となります。完全未経験の方も大歓迎です！'
  },
  {
    id: 'faq-3',
    question: 'Q. 通りすがりの人に顔を見られたりしませんか？',
    answer: 'A. 飛田新地のように通りから女性の姿が直接見えるスタイルとは異なり、当店はのれんをくぐった「お店の奥」で顔合わせを行います。通行人に顔を見られることがなく、ネットへの写真掲載も一切ないため、身バレ・顔バレのリスクは極めて低いです。'
  },
  {
    id: 'faq-4',
    question: 'Q. お給料はいくらですか？全額日払いですか？',
    answer: 'A. 当店は信太山新地の規定バック（15分3,800円／30分7,200円／60分15,200円）に完全準拠し、日給最大12万円の高額永久保証制度も完備しています。稼いだお給料は働いたその日の退勤時に、全額現金手渡しでお持ち帰りいただけます。'
  },
  {
    id: 'faq-5',
    question: 'Q. 衣装代やお菓子代などの天引き（雑費）はありますか？',
    answer: 'A. 当店は雑費・天引きは一切ありません（完全0円）。無料の貸衣装や接客用のお茶・お菓子セットもすべて当店で用意していますので、稼いだお給料がそのまま100%手元に残ります。'
  },
  {
    id: 'faq-6',
    question: 'Q. ノルマや罰金などはありますか？',
    answer: 'A. いいえ、当店にはノルマや罰金・ペナルティなどは一切ありません！自分のペースでストレスなくのびのびと働いていただけます。'
  },
  {
    id: 'faq-7',
    question: 'Q. お酒が飲めなくても働けますか？',
    answer: 'A. はい、お酒が全く飲めなくても問題ありません！当店ではお茶やソフトドリンクでお仕事が可能です。お酒が苦手な方も多数活躍されています。'
  },
  {
    id: 'faq-8',
    question: 'Q. 営業時間は何時からですか？短時間やWワークでも働けますか？',
    answer: 'A. 当店の営業時間は12:00〜24:00です。週1日・週末だけ・夕方からの数時間など、昼職・学生・主婦の方のライフスタイルに合わせて無理のないシフトを組んでいただけます。'
  },
  {
    id: 'faq-9',
    question: 'Q. 働くときの服や衣装はどうなりますか？',
    answer: 'A. 当店ではワンピースやドレス、着物などの素敵な貸衣装が無料で用意されています。もちろんご自身の働きやすい私服・衣装の持ち込みもOKです。'
  },
  {
    id: 'faq-10',
    question: 'Q. 相談だけで実際に働かなくても大丈夫ですか？',
    answer: 'A. はい、もちろん大歓迎です！ご相談・お問い合わせ段階で無理にお仕事を勧めることは絶対にありません。話を聞いてみて「やっぱりやめておきます」でも全く問題ありませんので、まずはお気軽にご連絡ください。'
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    avatarUrl: castAvatarOne,
    tag: '未経験から安心スタート',
    age: '22歳',
    status: '大学生・未経験',
    quote: '最初は不安でいっぱいでしたが、女性スタッフさんがLINEで優しく説明してくださり安心しました。高級ロングドレスも無料レンタルで手ぶら出勤でき、仲居さんも温かくて本当に働きやすいです！'
  },
  {
    id: 'test-2',
    avatarUrl: castAvatarTwo,
    tag: '天引きゼロで手取り大幅UP',
    age: '26歳',
    status: 'フリーター・レギュラー',
    quote: '他店では雑費が引かれることもありましたが、こちらは衣装代もお菓子代も天引き完全0円！日給最大12万円の高額永久保証もあり、稼いだ分が全額その日に手渡しでもらえるので大満足です。'
  },
  {
    id: 'test-3',
    avatarUrl: castAvatarThree,
    tag: '1日体験入店から本入店へ',
    age: '24歳',
    status: 'OL・副業Wワーク',
    quote: '完全自由出勤制で自分の生活に合わせてシフトが組めるのが魅力です。会員制で客層管理が徹底されていて紳士的なお客様ばかりなので、無理な要求もなく安心してマイペースに高収入を稼げています！'
  }
];

export const JOB_FACTS: JobFactItem[] = [
  {
    id: 'fact-1',
    iconName: 'Banknote',
    title: 'バック給',
    highlight: ['15分3,800円〜', '30分7,200円〜']
  },
  {
    id: 'fact-2',
    iconName: 'Sparkles',
    title: 'お店の特徴',
    highlight: ['身バレ対策徹底', '未経験・保証あり']
  },
  {
    id: 'fact-3',
    iconName: 'Clock',
    title: '営業時間',
    highlight: ['12:00〜24:00', '完全自由出勤制']
  },
  {
    id: 'fact-4',
    iconName: 'Home',
    title: '待遇・サポート',
    highlight: ['雑費・天引き完全0円', '個室寮・送迎あり']
  },
  {
    id: 'fact-5',
    iconName: 'PiggyBank',
    title: '体験入店',
    highlight: ['1日体験入店OK', '即日全額現金支給']
  }
];

export const FLOW_STEPS: FlowStep[] = [
  { number: '01', title: 'LINEで無料相談' },
  { number: '02', title: '面接・お店見学' },
  { number: '03', title: '1日体験入店' },
  { number: '04', title: '即日全額日払い' },
  { number: '05', title: '本入店・お仕事開始' }
];
