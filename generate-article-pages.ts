import * as fs from 'fs';
import * as path from 'path';
import { BLOG_ARTICLES } from './src/blogData';

interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  category: string;
  categoryLabel?: string;
  publishedAt?: string;
  readTime?: string;
  summary: string;
  eyeCatch: string;
  tags?: string[];
  content?: {
    type: 'p' | 'h2' | 'h3' | 'list' | 'cta' | 'qna';
    text?: string;
    items?: string[];
    question?: string;
    answer?: string;
  }[];
}

function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function replaceRootInnerHtml(html: string, innerHtml: string): string {
  const rootRegex = /<div id="root">[\s\S]*?<\/div>\s*(?=<script)/i;
  if (rootRegex.test(html)) {
    return html.replace(rootRegex, `<div id="root">\n${innerHtml}\n    </div>\n    `);
  }
  return html.replace('<div id="root"></div>', `<div id="root">${innerHtml}</div>`);
}

function renderArticleStaticHtml(article: BlogArticle, baseDomain: string): string {
  const blocksHtml = (article.content || [])
    .map(block => {
      if (block.type === 'h2') {
        return `<h2>${escapeHtml(block.text || '')}</h2>`;
      }
      if (block.type === 'h3') {
        return `<h3>${escapeHtml(block.text || '')}</h3>`;
      }
      if (block.type === 'list' && Array.isArray(block.items)) {
        const li = block.items.map(item => `<li>${escapeHtml(item)}</li>`).join('\n');
        return `<ul>\n${li}\n</ul>`;
      }
      if (block.type === 'qna') {
        return `<section><h3>Q. ${escapeHtml(block.question || '')}</h3><p>A. ${escapeHtml(block.answer || block.text || '')}</p></section>`;
      }
      if (block.type === 'p' && block.text) {
        return `<p>${escapeHtml(block.text)}</p>`;
      }
      return '';
    })
    .filter(Boolean)
    .join('\n          ');

  return `      <article style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;">
        <p><a href="${escapeHtml(baseDomain)}/">sinodayama vip（信太山新地 高額保証求人）トップ</a> &gt; <a href="${escapeHtml(baseDomain)}/blog">お仕事コラム一覧</a></p>
        <p><strong>${escapeHtml(article.categoryLabel || 'お仕事コラム')}</strong>｜公開日: ${escapeHtml(article.publishedAt || '2026-10-10')}</p>
        <h1>${escapeHtml(article.title)}</h1>
        <p><strong>${escapeHtml(article.summary)}</strong></p>
        <div>
          ${blocksHtml}
        </div>
        <hr />
        <section>
          <h2>信太山新地で最短本日スタート！1日体験入店・LINE無料相談受付中</h2>
          <p>1日体験入店は「面接＋見学＋1日お仕事＋規定バック（15分3,800円／30分7,200円／60分15,200円）または永久保証給を雑費天引きゼロで即日全額手渡し」がすべて1日で完了する安心コースです。まずはLINEでお気軽にご相談ください。</p>
          <p><a href="https://lin.ee/quudzvJ3">公式LINEで今すぐ相談する（https://lin.ee/quudzvJ3）</a></p>
        </section>
      </article>
      <aside id="static-sticky-line-bar" style="position:fixed;bottom:0;left:0;right:0;z-index:99999;background:rgba(28,18,22,0.96);border-top:1px solid rgba(197,160,89,0.5);padding:8px 12px;box-shadow:0 -4px 25px rgba(0,0,0,0.45);text-align:center;">
        <div style="max-width:448px;margin:0 auto;">
          <a href="https://lin.ee/quudzvJ3" target="_blank" rel="noopener noreferrer" style="display:flex;align-items:center;justify-content:space-between;background:linear-gradient(to right,#06C755,#00B900);color:#ffffff;font-weight:800;padding:10px 16px;border-radius:12px;text-decoration:none;box-shadow:0 4px 12px rgba(6,199,85,0.3);font-size:14px;border:1px solid rgba(255,255,255,0.3);">
            <div style="display:flex;align-items:center;gap:10px;text-align:left;">
              <span style="display:inline-flex;width:28px;height:28px;border-radius:50%;background:rgba(255,255,255,0.2);align-items:center;justify-content:center;font-size:15px;">💬</span>
              <div>
                <div style="font-size:10px;opacity:0.9;font-weight:500;">24時間質問・相談・面接予約受付中</div>
                <div style="font-size:14px;font-weight:900;">公式LINEで今すぐ相談・応募</div>
              </div>
            </div>
            <span style="font-size:18px;font-weight:bold;">&rsaquo;</span>
          </a>
        </div>
      </aside>`;
}

function renderBlogListStaticHtml(articles: BlogArticle[], baseDomain: string): string {
  const itemsHtml = articles
    .map(
      a => `          <li>
            <h3><a href="${escapeHtml(baseDomain)}/blog/${escapeHtml(a.slug)}">${escapeHtml(a.title)}</a></h3>
            <p>${escapeHtml(a.summary)}</p>
          </li>`
    )
    .join('\n');

  return `      <main style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;">
        <h1>信太山新地で安心デビューするためのお仕事コラム＆完全ガイド｜sinodayama vip</h1>
        <p>信太山新地で働くうえで知っておきたい給料システム、身バレ対策、仕事内容やお店の雰囲気を徹底解説。15分3,800円〜60分15,200円の規定バック＆日給最大12万円の永久保証、全額即日日払い、完全私服通勤と高級ロングドレス無料レンタル、送迎完備など、未経験から安心して働ける理由をすべて公開します。</p>
        <ul>
${itemsHtml}
        </ul>
      </main>
      <aside id="static-sticky-line-bar" style="position:fixed;bottom:0;left:0;right:0;z-index:99999;background:rgba(28,18,22,0.96);border-top:1px solid rgba(197,160,89,0.5);padding:8px 12px;box-shadow:0 -4px 25px rgba(0,0,0,0.45);text-align:center;">
        <div style="max-width:448px;margin:0 auto;">
          <a href="https://lin.ee/quudzvJ3" target="_blank" rel="noopener noreferrer" style="display:flex;align-items:center;justify-content:space-between;background:linear-gradient(to right,#06C755,#00B900);color:#ffffff;font-weight:800;padding:10px 16px;border-radius:12px;text-decoration:none;box-shadow:0 4px 12px rgba(6,199,85,0.3);font-size:14px;border:1px solid rgba(255,255,255,0.3);">
            <div style="display:flex;align-items:center;gap:10px;text-align:left;">
              <span style="display:inline-flex;width:28px;height:28px;border-radius:50%;background:rgba(255,255,255,0.2);align-items:center;justify-content:center;font-size:15px;">💬</span>
              <div>
                <div style="font-size:10px;opacity:0.9;font-weight:500;">24時間質問・相談・面接予約受付中</div>
                <div style="font-size:14px;font-weight:900;">公式LINEで今すぐ相談・応募</div>
              </div>
            </div>
            <span style="font-size:18px;font-weight:bold;">&rsaquo;</span>
          </a>
        </div>
      </aside>`;
}

export function injectMetaIntoHtml(baseHtml: string, meta: {
  title: string;
  description: string;
  imageUrl: string;
  url: string;
  type?: 'website' | 'article';
  bodyHtml?: string;
}): string {
  let html = baseHtml;
  const escapedTitle = escapeHtml(meta.title);
  const escapedDesc = escapeHtml(meta.description);
  const escapedImage = escapeHtml(meta.imageUrl);
  const escapedUrl = escapeHtml(meta.url);
  const type = meta.type || 'article';

  // 1. Replace <title>
  if (/<title>.*?<\/title>/i.test(html)) {
    html = html.replace(/<title>.*?<\/title>/i, `<title>${escapedTitle}</title>`);
  }

  // 2. Replace meta name="description"
  if (/<meta\s+name="description"\s+content=".*?"\s*\/?>/i.test(html)) {
    html = html.replace(/<meta\s+name="description"\s+content=".*?"\s*\/?>/i, `<meta name="description" content="${escapedDesc}" />`);
  }

  // 3. Replace canonical link
  if (/<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i.test(html)) {
    html = html.replace(/<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i, `<link rel="canonical" href="${escapedUrl}" />`);
  }

  // Helper to upsert a meta tag
  const upsertMeta = (propOrName: 'property' | 'name', attrValue: string, content: string) => {
    const regex = new RegExp(`<meta\\s+${propOrName}="${attrValue}"\\s+content=".*?"\\s*\\/?>`, 'i');
    const newTag = `<meta ${propOrName}="${attrValue}" content="${content}" />`;
    if (regex.test(html)) {
      html = html.replace(regex, newTag);
    } else {
      html = html.replace('</head>', `  ${newTag}\n</head>`);
    }
  };

  // Open Graph Tags
  upsertMeta('property', 'og:title', escapedTitle);
  upsertMeta('property', 'og:description', escapedDesc);
  upsertMeta('property', 'og:url', escapedUrl);
  upsertMeta('property', 'og:type', type);
  upsertMeta('property', 'og:site_name', 'sinodayama vip｜信太山新地 高額保証求人');
  upsertMeta('property', 'og:image', escapedImage);
  upsertMeta('property', 'og:image:secure_url', escapedImage);
  upsertMeta('property', 'og:image:type', 'image/jpeg');
  upsertMeta('property', 'og:image:width', '1200');
  upsertMeta('property', 'og:image:height', '630');
  upsertMeta('property', 'og:image:alt', escapedTitle);

  // Twitter Card Tags
  upsertMeta('name', 'twitter:card', 'summary_large_image');
  upsertMeta('name', 'twitter:title', escapedTitle);
  upsertMeta('name', 'twitter:description', escapedDesc);
  upsertMeta('name', 'twitter:image', escapedImage);
  upsertMeta('name', 'twitter:image:alt', escapedTitle);
  upsertMeta('name', 'twitter:site', '@shinodayama_vip');

  if (meta.bodyHtml) {
    html = replaceRootInnerHtml(html, meta.bodyHtml);
  }

  return html;
}

export function toAbsoluteImageUrl(imagePath: string, domain = 'https://osaka-shinodayamashinchivip.pages.dev'): string {
  if (!imagePath) {
    return `${domain}/images/shinodayama_high_guarantee.jpg`;
  }
  let clean = imagePath.trim();
  if (clean.includes('tobitashinchi-recruit.com') || clean.includes('takishinchi-recruit.com') || clean.includes('takishinchi.pages.dev') || clean.includes('shinodayamashinchi.pages.dev') || clean.includes('shinodayamashinchi-recruit.com')) {
    clean = clean.replace(/https?:\/\/(tobitashinchi-recruit\.com|takishinchi-recruit\.com|takishinchi\.pages\.dev|shinodayamashinchi\.pages\.dev|shinodayamashinchi-recruit\.com)/g, domain);
  }
  let fullUrl = '';
  if (clean.startsWith('http://') || clean.startsWith('https://')) {
    fullUrl = clean;
  } else {
    const normalizedPath = clean.startsWith('/') ? clean : `/${clean}`;
    fullUrl = `${domain}${normalizedPath}`;
  }

  return fullUrl.split('?')[0];
}

function generateSitemapXml(articles: BlogArticle[], baseDomain: string): string {
  const today = '2026-10-10';
  const urls = [
    `  <url>\n    <loc>${baseDomain}/</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>`,
    `  <url>\n    <loc>${baseDomain}/blog</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>0.9</priority>\n  </url>`,
    ...articles
      .filter(a => a.slug)
      .map(
        a =>
          `  <url>\n    <loc>${baseDomain}/blog/${escapeHtml(a.slug)}</loc>\n    <lastmod>${escapeHtml(a.publishedAt || today)}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`
      )
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
}

async function main() {
  const rootDir = process.cwd();
  const distDir = path.join(rootDir, 'dist');
  const publicDir = path.join(rootDir, 'public');
  const articlesFile = path.join(rootDir, 'data', 'blogArticles.json');
  const legacyArticlesFile = path.join(rootDir, 'data', 'articles.json');
  const baseDomain = process.env.DEPLOY_DOMAIN || 'https://osaka-shinodayamashinchivip.pages.dev';

  const articles: BlogArticle[] = BLOG_ARTICLES as BlogArticle[];
  try {
    fs.writeFileSync(articlesFile, JSON.stringify(articles, null, 2), 'utf-8');
    fs.writeFileSync(legacyArticlesFile, JSON.stringify(articles, null, 2), 'utf-8');
  } catch (e) {
    console.error('Error syncing blogArticles.json:', e);
  }

  // Always keep public/sitemap.xml updated
  if (fs.existsSync(publicDir) && articles.length > 0) {
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), generateSitemapXml(articles, baseDomain), 'utf-8');
  }

  if (articles.length > 0 && fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, 'sitemap.xml'), generateSitemapXml(articles, baseDomain), 'utf-8');
  }

  // Base template: prefer dist/index.html (with bundled JS), fallback to root index.html
  const distIndexPath = path.join(distDir, 'index.html');
  const rootIndexPath = path.join(rootDir, 'index.html');
  const baseHtmlPath = fs.existsSync(distIndexPath) ? distIndexPath : rootIndexPath;

  if (!fs.existsSync(baseHtmlPath)) {
    console.warn('⚠️ No index.html found.');
    return;
  }

  const baseHtml = fs.readFileSync(baseHtmlPath, 'utf-8');

  // Also inject the column links into dist/index.html so AI/crawlers reading "/" see all article titles & links!
  if (fs.existsSync(distIndexPath) && articles.length > 0) {
    const topArticleLinksHtml = articles
      .map(
        a =>
          `            <li><a href="${escapeHtml(baseDomain)}/blog/${escapeHtml(a.slug)}"><strong>${escapeHtml(a.title)}</strong></a> - ${escapeHtml(a.summary)}</li>`
      )
      .join('\n');
    const enhancedIndexHtml = baseHtml.replace(
      '<p><a href="https://shinodayamashinchi.pages.dev/blog">すべてのコラム記事一覧を見る（/blog）</a></p>',
      `<p><a href="${escapeHtml(baseDomain)}/blog">すべてのコラム記事一覧を見る（/blog）</a></p>\n          <ul>\n${topArticleLinksHtml}\n          </ul>`
    );
    fs.writeFileSync(distIndexPath, enhancedIndexHtml, 'utf-8');
  }

  console.log(`🚀 Pre-rendering static HTML pages for ${articles.length} articles for ChatGPT / AI / X / OGP (Base Domain: ${baseDomain})...`);

  // 1. Generate /blog/index.html AND /blog.html
  const blogListHtml = injectMetaIntoHtml(baseHtml, {
    title: '信太山新地 お仕事コラム一覧',
    description: '信太山新地で安心デビューするためのコラム・完全ガイド一覧。給料システム（30分7,200円・雑費完全ゼロ・日給永久保証7万〜11万円）、面接対策、身バレ防止、未経験からの働き方などを詳しく解説しています。',
    imageUrl: `${baseDomain}/images/card_blog_index.jpg`,
    url: `${baseDomain}/blog`,
    type: 'website',
    bodyHtml: renderBlogListStaticHtml(articles, baseDomain)
  });

  // Write to public/blog
  const publicBlogListDir = path.join(publicDir, 'blog');
  if (!fs.existsSync(publicBlogListDir)) {
    fs.mkdirSync(publicBlogListDir, { recursive: true });
  }
  fs.writeFileSync(path.join(publicBlogListDir, 'index.html'), blogListHtml, 'utf-8');

  // Write to dist/blog if dist exists
  if (fs.existsSync(distDir)) {
    const distBlogListDir = path.join(distDir, 'blog');
    if (!fs.existsSync(distBlogListDir)) {
      fs.mkdirSync(distBlogListDir, { recursive: true });
    }
    fs.writeFileSync(path.join(distBlogListDir, 'index.html'), blogListHtml, 'utf-8');
    fs.writeFileSync(path.join(distDir, 'blog.html'), blogListHtml, 'utf-8');
  }

  // 2. Generate each /blog/:slug/index.html AND /blog/:slug.html
  let count = 0;
  for (const article of articles) {
    if (!article.slug) continue;

    const fullImageUrl = fs.existsSync(path.join(process.cwd(), 'public', 'images', `card_${article.slug}.jpg`))
      ? `${baseDomain}/images/card_${article.slug}.jpg`
      : toAbsoluteImageUrl(article.eyeCatch, baseDomain);

    const articleUrl = `${baseDomain}/blog/${article.slug}`;
    const articleTitle = `信太山新地 ${article.title}`;
    const articleDesc = article.summary || `${article.title}についての詳しい解説記事です。`;

    const articleHtml = injectMetaIntoHtml(baseHtml, {
      title: articleTitle,
      description: articleDesc,
      imageUrl: fullImageUrl,
      url: articleUrl,
      type: 'article',
      bodyHtml: renderArticleStaticHtml(article, baseDomain)
    });

    // Write to public/blog/:slug/index.html so it is committed to git
    const publicArticleDir = path.join(publicDir, 'blog', article.slug);
    if (!fs.existsSync(publicArticleDir)) {
      fs.mkdirSync(publicArticleDir, { recursive: true });
    }
    fs.writeFileSync(path.join(publicArticleDir, 'index.html'), articleHtml, 'utf-8');

    // Write to dist/blog/:slug/index.html
    if (fs.existsSync(distDir)) {
      const distArticleDir = path.join(distDir, 'blog', article.slug);
      if (!fs.existsSync(distArticleDir)) {
        fs.mkdirSync(distArticleDir, { recursive: true });
      }
      fs.writeFileSync(path.join(distArticleDir, 'index.html'), articleHtml, 'utf-8');
      fs.writeFileSync(path.join(distDir, 'blog', `${article.slug}.html`), articleHtml, 'utf-8');
    }

    count++;
  }

  console.log(`✅ Successfully generated ${count} article static HTML pages with full body HTML & OGP meta tags in public/blog/ and dist/blog/!`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(err => {
    console.error('Failed to generate article pages:', err);
    process.exit(1);
  });
}
