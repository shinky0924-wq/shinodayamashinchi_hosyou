import fs from 'fs';
import path from 'path';

interface BlogArticle {
  id: string | number;
  slug: string;
  title: string;
  category: string;
  categoryLabel?: string;
  publishedAt?: string;
  readTime?: string;
  summary: string;
  eyeCatch?: string;
  author?: {
    name: string;
    role: string;
    avatar: string;
  };
  tags: string[];
  content: Array<{
    type: string;
    text?: string;
    items?: string[];
    question?: string;
    answer?: string;
  }>;
}

function cleanText(text: string): string {
  if (!text) return '';
  let res = text;

  // 1. Operating hours & daytime contradictions
  res = res.replace(/信太山新地の当店の営業時間は15:00に開店し、24:00に閉店となります（朝・昼からの営業はありません）。/g, 
    '当店の営業時間は12:00〜24:00です。お昼12時からオープンしているため、昼のスキマ時間（12:00〜17:00、12:00〜19:00）や夕方・夜のシフト（15:00〜24:00、17:00〜24:00、19:00〜24:00）まで、都合に合わせて柔軟に働けます。');
  
  res = res.replace(/（12:00〜24:00・朝昼営業なし）/g, '（12:00〜24:00・昼12時オープン）');
  res = res.replace(/（朝・昼からの営業はありません）/g, '（お昼12:00から夜24:00まで営業）');
  res = res.replace(/（朝・昼の営業はありません）/g, '（お昼12:00から夜24:00まで営業）');
  res = res.replace(/※信太山新地の営業時間は12:00〜24:00（朝・昼の営業はありません）。/g, 
    '※当店の営業時間は12:00〜24:00（お昼12時オープン〜夜24時最終受付）。');

  res = res.replace(/信太山新地は15:00から開店しており、/g, '当店は12:00から営業しており、早い時間帯から常連のお客様が来店されます。12:00〜17:00や15:00〜19:00などの短時間勤務でも、');
  res = res.replace(/信太山新地の15:00オープンからの早めシフト/g, '信太山新地の当店で人気のお昼〜夕方早めシフト（12:00〜17:00、15:00〜19:00など）');
  res = res.replace(/15:00オープンから夕方・夜早めの時間帯/g, '12:00オープンのお昼シフトや夕方の時間帯');
  res = res.replace(/15:00オープンに合わせて出勤する/g, 'ご自身の希望時間（12:00〜や15:00〜など）に合わせて出勤する');
  res = res.replace(/15:00の開店に向けてお店に出勤します。/g, '希望シフトの時間（お昼12:00出勤や夕方15:00出勤など）に合わせてお店に出勤します。');
  res = res.replace(/【15:00】お仕事スタート（お店の奥で待機＆顔合わせ）/g, '【出勤後すぐ】お仕事スタート（お店の奥で待機＆顔合わせ）');
  res = res.replace(/準備が整ったら15:00からお仕事開始です。/g, '準備が整ったら早速お仕事開始です。');
  res = res.replace(/15:00の開店から18:00や19:00まで/g, 'お昼12:00や15:00の出勤から夕方までの');
  res = res.replace(/夕方シフト（15:00〜19:00頃）：/g, '昼・夕方シフト（12:00〜17:00、12:00〜19:00など）：');
  res = res.replace(/15時〜24時/g, '12時〜24時');
  res = res.replace(/15:00からお仕事/g, '出勤後すぐにお仕事');

  // 2. Station and railway corrections (Shinodayama is JR Hanwa line, NOT Keihan)
  res = res.replace(/現役キャスト（22歳・京阪沿線在住）/g, '現役キャスト（22歳・大阪市内在住）');
  res = res.replace(/信太山新地（京阪信太山駅・難波駅徒歩約3分、谷町線天王寺駅・難波大宮駅徒歩圏内）/g,
    '信太山新地（JR阪和線「信太山駅」より徒歩約3分・難波集合無料送迎完備）');
  res = res.replace(/信太山新地（京阪信太山駅・難波駅徒歩約3分、谷町線天王寺駅・難波大宮駅徒歩圏/g,
    '信太山新地（JR阪和線「信太山駅」より徒歩約3分・難波集合無料送迎完備');
  res = res.replace(/京橋エリア（京阪モール等）：京阪電車ですぐ！トレンドコスメやアパレル、おしゃ/g,
    '難波・天王寺エリア（なんばCITY・あべのハルカス等）：トレンドコスメやお買い物、お食事');
  res = res.replace(/京橋エリア（京阪モール等）：話題のコスメや服のお買い物、お仕事帰りのディナー/g,
    '難波・天王寺エリア：話題のコスメや服のお買い物、お仕事帰りのディナー');
  res = res.replace(/京阪信太山駅/g, 'JR信太山駅');
  res = res.replace(/難波大宮駅/g, '天王寺駅');
  res = res.replace(/京阪モール/g, 'なんばCITY');
  res = res.replace(/京阪電車/g, 'JR阪和線や無料送迎');
  res = res.replace(/京阪沿線/g, '大阪市内・JR阪和線沿線');
  res = res.replace(/京阪本線/g, 'JR阪和線');
  res = res.replace(/京阪/g, 'JR');
  res = res.replace(/京橋/g, '難波');

  // 3. Dress rental consistency (high luxury long dress rental)
  res = res.replace(/無料レンタルの可愛い着物やドレスに着替えます。/g, '無料レンタルの高級ロングドレスに着替えます。');

  // 4. Guarantee numbers consistency
  res = res.replace(/日給7万〜11万円/g, '日給最大12万円永久保証（日給3.5万〜12万円）');
  res = res.replace(/7万〜11万円/g, '3.5万〜12万円');

  return res;
}

function processArticle(art: BlogArticle): BlogArticle {
  const updated = { ...art };

  // Clean title
  updated.title = cleanText(updated.title);
  if (updated.title.includes('15時からの夕方シフトが人気！')) {
    updated.title = updated.title.replace('【15時からの夕方シフトが人気！】15:00〜20:00の短時間勤務で効率よく稼げる理由とメリット', 
      '【昼・夕方からの短時間シフトが人気！】12:00〜や15:00〜の勤務で無理なく稼げる理由とメリット');
  }
  if (updated.title.includes('京橋・梅田からすぐ！')) {
    updated.title = updated.title.replace('京橋・梅田からすぐ！', '難波集合・送迎＆JR信太山駅3分！');
  }
  if (updated.title.includes('京橋・梅田・千林のおすすめスポット')) {
    updated.title = updated.title.replace('京橋・梅田・千林のおすすめスポット', '難波・天王寺・心斎橋のおすすめスポット');
  }

  // Clean summary
  updated.summary = cleanText(updated.summary);

  // Clean tags
  updated.tags = (updated.tags || []).map(t => {
    let tag = cleanText(t);
    if (tag === '15時〜24時') return '12時〜24時';
    if (tag === '京橋') return '難波';
    if (tag === '千林') return '天王寺';
    return tag;
  });

  // Clean author
  if (updated.author) {
    updated.author = {
      ...updated.author,
      name: cleanText(updated.author.name),
      role: cleanText(updated.author.role),
    };
  }

  // Clean content blocks
  updated.content = (updated.content || []).map(block => {
    const newBlock = { ...block };
    if (newBlock.text) {
      newBlock.text = cleanText(newBlock.text);
    }
    if (newBlock.question) {
      newBlock.question = cleanText(newBlock.question);
    }
    if (newBlock.answer) {
      newBlock.answer = cleanText(newBlock.answer);
    }
    if (Array.isArray(newBlock.items)) {
      newBlock.items = newBlock.items.map(item => cleanText(item));
    }
    return newBlock;
  });

  return updated;
}

function main() {
  const rootDir = process.cwd();
  const jsonPath = path.join(rootDir, 'data', 'blogArticles.json');
  const articles: BlogArticle[] = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

  console.log(`Processing ${articles.length} articles...`);
  const updatedArticles = articles.map(processArticle);

  // Write to both data/blogArticles.json and data/articles.json
  fs.writeFileSync(jsonPath, JSON.stringify(updatedArticles, null, 2), 'utf-8');
  fs.writeFileSync(path.join(rootDir, 'data', 'articles.json'), JSON.stringify(updatedArticles, null, 2), 'utf-8');
  
  // Write to src/blogData.original.ts as well
  const originalTsPath = path.join(rootDir, 'src', 'blogData.original.ts');
  const tsContent = `// Auto-generated synchronized blog articles\nexport const BLOG_ARTICLES = ${JSON.stringify(updatedArticles, null, 2)};\n`;
  fs.writeFileSync(originalTsPath, tsContent, 'utf-8');

  console.log(`✅ Successfully updated all articles to match top page exactly!`);
}

main();
