import fs from 'fs';
import path from 'path';
import * as XLSX from 'xlsx';

interface BlogArticle {
  id: string | number;
  slug: string;
  title: string;
  category: string;
  categoryLabel?: string;
  publishedAt?: string;
  readTime?: string;
  summary?: string;
  eyeCatch?: string;
}

const BASE_URL = 'https://osaka-shinodayamashinchivip.pages.dev/blog';

function main() {
  const rootDir = process.cwd();
  const jsonPath = path.join(rootDir, 'data', 'blogArticles.json');
  const articles: BlogArticle[] = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

  console.log(`Generating Excel file for ${articles.length} articles...`);

  // Format data for Excel
  const rows = articles.map((art, index) => ({
    No: index + 1,
    '記事タイトル': art.title,
    'カテゴリ': art.categoryLabel || art.category,
    '記事URL': `${BASE_URL}/${art.slug}`,
    '要約・サマリー': art.summary || '',
    '公開日': art.publishedAt || '2026-10-25',
    '読了目安': art.readTime || '5分',
    'サムネイル画像URL': `https://osaka-shinodayamashinchivip.pages.dev/images/card_${art.slug}.jpg`
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);

  // Set column widths
  worksheet['!cols'] = [
    { wch: 6 },   // No
    { wch: 55 },  // 記事タイトル
    { wch: 18 },  // カテゴリ
    { wch: 75 },  // 記事URL
    { wch: 60 },  // 要約
    { wch: 14 },  // 公開日
    { wch: 10 },  // 読了目安
    { wch: 80 }   // サムネイル画像URL
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, '信太山新地お仕事コラム一覧');

  const fileName = 'shinodayamashinchi_articles_url_list.xlsx';
  const outPaths = [
    path.join(rootDir, fileName),
    path.join(rootDir, 'public', fileName),
    path.join(rootDir, 'dist', fileName)
  ];

  for (const p of outPaths) {
    const dir = path.dirname(p);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    XLSX.writeFile(workbook, p);
    console.log(`Saved Excel to: ${p}`);
  }

  console.log(`✅ Successfully generated ${fileName} with ${articles.length} article URLs!`);
}

main();
