import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import sharp from 'sharp';
import { BLOG_ARTICLES } from './src/blogData';

// Ensure rounded Japanese font (Zen Maru Gothic) is available to fontconfig/librsvg
try {
  const repoFontsDir = path.join(process.cwd(), 'fonts');
  const userFontsDir = path.join(process.env.HOME || '/root', '.local', 'share', 'fonts');
  if (fs.existsSync(repoFontsDir)) {
    fs.mkdirSync(userFontsDir, { recursive: true });
    for (const file of fs.readdirSync(repoFontsDir)) {
      if (file.endsWith('.ttf') || file.endsWith('.otf')) {
        const dest = path.join(userFontsDir, file);
        if (!fs.existsSync(dest)) {
          fs.copyFileSync(path.join(repoFontsDir, file), dest);
        }
      }
    }
    execSync('fc-cache -f', { stdio: 'ignore' });
  }
} catch {
  // Ignore font cache errors in restricted environments
}

interface BlogArticle {
  id: string | number;
  title: string;
  slug: string;
  category: string;
  categoryLabel?: string;
  summary: string;
  eyeCatch?: string;
  tags?: string[];
}

function escapeXml(unsafe: string): string {
  return (unsafe || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

interface ParsedCardContent {
  badge: string;
  lines: string[];
}

export function parseTitleForCard(title: string, categoryLabel?: string): ParsedCardContent {
  let rest = title.trim();
  let badge = '';

  const bracketMatch = rest.match(/^[【\[](.*?)[】\]]\s*/);
  if (bracketMatch) {
    badge = bracketMatch[1].trim();
    rest = rest.slice(bracketMatch[0].length).trim();
  }

  // Strip emojis & brackets from badge
  badge = badge.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}【】\[\]]/gu, '').trim();

  // If badge is empty
  if (!badge) {
    if (rest.includes('仲居さん') || rest.includes('おばちゃん')) {
      badge = 'おばちゃんの役割と安心サポート';
    } else {
      badge = categoryLabel || '信太山新地お仕事ガイド';
    }
  }

  // Wrap with heart icons on both sides matching user specification: ♥ [バッジ] ♥
  badge = badge.replace(/^[♥♡\s]+|[♥♡\s]+$/gu, '').trim();
  badge = `♥ ${badge} ♥`;

  // Helper to split a segment cleanly without breaking quotes or words
  function splitSegment(text: string, targetLen?: number): [string, string] {
    const t = targetLen || Math.floor(text.length / 2);
    const particles = ['！', '!', '？', '?', '・', '、', '」', '＆', 'で', 'を', 'に', 'が', 'の', 'と', 'へ', 'から', 'は'];
    let bestSplit = -1;
    let bestDist = 999;
    let inQuote = false;
    for (let i = 3; i < text.length - 3; i++) {
      if (text[i] === '「' || text[i] === '『') inQuote = true;
      if (text[i] === '」' || text[i] === '』') {
        inQuote = false;
        const dist = Math.abs((i + 1) - t);
        if (dist < bestDist) {
          bestDist = dist;
          bestSplit = i + 1;
        }
        continue;
      }
      if (inQuote) continue;

      if (particles.includes(text[i])) {
        if (text[i] === 'の' && i > 0 && text[i - 1] === '女') continue; // don't break 女の子

        let splitIdx = i + 1;
        if (text[i] === '・' || text[i] === '＆' || text[i] === '、') {
          splitIdx = i;
        }
        const dist = Math.abs(splitIdx - t);
        if (dist < bestDist) {
          bestDist = dist;
          bestSplit = splitIdx;
        }
      }
    }
    if (bestSplit !== -1) {
      let l1 = text.slice(0, bestSplit).trim();
      let l2 = text.slice(bestSplit).trim();
      if (l2.startsWith('・') && !l1.endsWith('・')) {
        l1 += '・';
        l2 = l2.slice(1).trim();
      }
      return [l1, l2];
    }
    return [text.slice(0, t).trim(), text.slice(t).trim()];
  }

  // Check punctuation break (！, ?, etc.)
  const puncMatch = rest.match(/^(.*?)([！!？?])(.*)$/);
  let lines: string[] = [];

  if (puncMatch) {
    const firstPart = (puncMatch[1] + puncMatch[2]).trim();
    const secondPart = puncMatch[3].trim();

    if (secondPart.length === 0) {
      if (firstPart.length > 24) {
        const [l1, l23] = splitSegment(firstPart);
        if (l23.length > 15) {
          const [l2, l3] = splitSegment(l23);
          lines = [l1, l2, l3];
        } else {
          lines = [l1, l23];
        }
      } else if (firstPart.length > 15) {
        lines = splitSegment(firstPart);
      } else {
        lines = [firstPart];
      }
    } else {
      if (secondPart.length >= 13) {
        const [l2, l3] = splitSegment(secondPart);
        if (firstPart.length > 22) {
          const [l1a, l1b] = splitSegment(firstPart);
          lines = [l1a, l1b, secondPart];
        } else {
          lines = [firstPart, l2, l3];
        }
      } else {
        if (firstPart.length > 18) {
          const [l1, l2] = splitSegment(firstPart);
          lines = [l1, l2, secondPart];
        } else {
          lines = [firstPart, secondPart];
        }
      }
    }
  } else {
    if (rest.length <= 15) {
      lines = [rest];
    } else if (rest.length <= 25) {
      lines = splitSegment(rest);
    } else {
      const target1 = Math.floor(rest.length / 3);
      const [l1, rest23] = splitSegment(rest, target1);
      const [l2, l3] = splitSegment(rest23);
      lines = [l1, l2, l3];
    }
  }

  lines = lines.map(l => l.replace(/^・+/, '')).filter(Boolean);
  return {
    badge: badge || '♥ お仕事徹底解説',
    lines
  };
}

function selectBackgroundForArticle(article: BlogArticle): string {
  const imagesDir = path.join(process.cwd(), 'public', 'images');
  // 100% matched semantic photographic background per article
  const uniquePhoto = `col_unique_art_${article.id}.jpg`;
  if (fs.existsSync(path.join(imagesDir, uniquePhoto))) {
    return uniquePhoto;
  }
  return 'col_ryotei_flow_1789107427433.jpg';
}

export interface CardPalette {
  name: string;
  headerGradStart: string;
  headerGradEnd: string;
  cardBg: string;
  dashedBorder: string;
  accentPrimary: string;
  accentSecondary: string;
  subBadgeBg: string;
  subBadgeStroke: string;
  subBadgeText: string;
  highlightColor: string;
  textColor: string;
  shadowColor: string;
  glowBall1: string;
  glowBall2: string;
  glowBall3: string;
  bgDimTintStart: string;
  bgDimTintEnd: string;
}

export const CARD_PALETTES: CardPalette[] = [
  {
    name: 'sakura-rose',
    headerGradStart: '#ff476e',
    headerGradEnd: '#ff758c',
    cardBg: '#ffffff',
    dashedBorder: '#f687a4',
    accentPrimary: '#e03b62',
    accentSecondary: '#fbaec2',
    subBadgeBg: '#fff0f4',
    subBadgeStroke: '#fa7293',
    subBadgeText: '#c0264f',
    highlightColor: '#fecdd3',
    textColor: '#2e1823',
    shadowColor: '#a82846',
    glowBall1: '#ffa7ba',
    glowBall2: '#ffccd5',
    glowBall3: '#ffd1b3',
    bgDimTintStart: '#1a0a14',
    bgDimTintEnd: '#2a0f20'
  },
  {
    name: 'peach-coral',
    headerGradStart: '#f97316',
    headerGradEnd: '#fb923c',
    cardBg: '#fffdf9',
    dashedBorder: '#fb923c',
    accentPrimary: '#ea580c',
    accentSecondary: '#fdba74',
    subBadgeBg: '#fff7ed',
    subBadgeStroke: '#fb923c',
    subBadgeText: '#c2410c',
    highlightColor: '#fef08a',
    textColor: '#2c170d',
    shadowColor: '#9a3412',
    glowBall1: '#fed7aa',
    glowBall2: '#ffedd5',
    glowBall3: '#fef08a',
    bgDimTintStart: '#201008',
    bgDimTintEnd: '#2e160e'
  },
  {
    name: 'lilac-lavender',
    headerGradStart: '#9333ea',
    headerGradEnd: '#c084fc',
    cardBg: '#faf7ff',
    dashedBorder: '#c084fc',
    accentPrimary: '#7e22ce',
    accentSecondary: '#e9d5ff',
    subBadgeBg: '#faf5ff',
    subBadgeStroke: '#a855f7',
    subBadgeText: '#6b21a8',
    highlightColor: '#fbcfe8',
    textColor: '#221233',
    shadowColor: '#581c87',
    glowBall1: '#e9d5ff',
    glowBall2: '#f3e8ff',
    glowBall3: '#fbcfe8',
    bgDimTintStart: '#150a22',
    bgDimTintEnd: '#220f35'
  },
  {
    name: 'mint-green',
    headerGradStart: '#0d9488',
    headerGradEnd: '#2dd4bf',
    cardBg: '#f7fdfb',
    dashedBorder: '#2dd4bf',
    accentPrimary: '#0f766e',
    accentSecondary: '#99f6e4',
    subBadgeBg: '#f0fdfa',
    subBadgeStroke: '#14b8a6',
    subBadgeText: '#115e59',
    highlightColor: '#fef08a',
    textColor: '#0f2420',
    shadowColor: '#134e4a',
    glowBall1: '#99f6e4',
    glowBall2: '#ccfbf1',
    glowBall3: '#a7f3d0',
    bgDimTintStart: '#091a16',
    bgDimTintEnd: '#0f2a24'
  },
  {
    name: 'honey-mimosa',
    headerGradStart: '#d97706',
    headerGradEnd: '#f59e0b',
    cardBg: '#fffdf5',
    dashedBorder: '#f59e0b',
    accentPrimary: '#b45309',
    accentSecondary: '#fde68a',
    subBadgeBg: '#fffbeb',
    subBadgeStroke: '#f59e0b',
    subBadgeText: '#92400e',
    highlightColor: '#fed7aa',
    textColor: '#291c06',
    shadowColor: '#78350f',
    glowBall1: '#fde68a',
    glowBall2: '#fef3c7',
    glowBall3: '#fed7aa',
    bgDimTintStart: '#1f1406',
    bgDimTintEnd: '#2e1e0a'
  },
  {
    name: 'sky-aqua',
    headerGradStart: '#0284c7',
    headerGradEnd: '#38bdf8',
    cardBg: '#f6fbfe',
    dashedBorder: '#38bdf8',
    accentPrimary: '#0369a1',
    accentSecondary: '#bae6fd',
    subBadgeBg: '#f0f9ff',
    subBadgeStroke: '#0ea5e9',
    subBadgeText: '#075985',
    highlightColor: '#fef08a',
    textColor: '#0c2233',
    shadowColor: '#0c4a6e',
    glowBall1: '#bae6fd',
    glowBall2: '#e0f2fe',
    glowBall3: '#ccfbf1',
    bgDimTintStart: '#081724',
    bgDimTintEnd: '#0f263a'
  },
  {
    name: 'rose-fuchsia',
    headerGradStart: '#db2777',
    headerGradEnd: '#f472b6',
    cardBg: '#fff8fb',
    dashedBorder: '#f472b6',
    accentPrimary: '#be185d',
    accentSecondary: '#fbcfe8',
    subBadgeBg: '#fdf2f8',
    subBadgeStroke: '#ec4899',
    subBadgeText: '#9d174d',
    highlightColor: '#fed7aa',
    textColor: '#2c1221',
    shadowColor: '#831843',
    glowBall1: '#fbcfe8',
    glowBall2: '#fce7f3',
    glowBall3: '#fed7aa',
    bgDimTintStart: '#1e0a17',
    bgDimTintEnd: '#2c1024'
  },
  {
    name: 'matcha-pistachio',
    headerGradStart: '#16a34a',
    headerGradEnd: '#4ade80',
    cardBg: '#f7fcf7',
    dashedBorder: '#4ade80',
    accentPrimary: '#15803d',
    accentSecondary: '#bbf7d0',
    subBadgeBg: '#f0fdf4',
    subBadgeStroke: '#22c55e',
    subBadgeText: '#166534',
    highlightColor: '#fef08a',
    textColor: '#122718',
    shadowColor: '#14532d',
    glowBall1: '#bbf7d0',
    glowBall2: '#dcfce7',
    glowBall3: '#fef08a',
    bgDimTintStart: '#0b1a0e',
    bgDimTintEnd: '#122a18'
  },
  {
    name: 'wisteria-violet',
    headerGradStart: '#7c3aed',
    headerGradEnd: '#a78bfa',
    cardBg: '#f8f6ff',
    dashedBorder: '#a78bfa',
    accentPrimary: '#6d28d9',
    accentSecondary: '#ddd6fe',
    subBadgeBg: '#f5f3ff',
    subBadgeStroke: '#8b5cf6',
    subBadgeText: '#5b21b6',
    highlightColor: '#fed7aa',
    textColor: '#1e1333',
    shadowColor: '#4c1d95',
    glowBall1: '#ddd6fe',
    glowBall2: '#ede9fe',
    glowBall3: '#fbcfe8',
    bgDimTintStart: '#140924',
    bgDimTintEnd: '#211039'
  },
  {
    name: 'warm-apricot',
    headerGradStart: '#ea580c',
    headerGradEnd: '#fb923c',
    cardBg: '#fffcf9',
    dashedBorder: '#f97316',
    accentPrimary: '#c2410c',
    accentSecondary: '#fed7aa',
    subBadgeBg: '#fff7ed',
    subBadgeStroke: '#ea580c',
    subBadgeText: '#9a3412',
    highlightColor: '#fef08a',
    textColor: '#28170e',
    shadowColor: '#7c2d12',
    glowBall1: '#ffedd5',
    glowBall2: '#fed7aa',
    glowBall3: '#fef9c3',
    bgDimTintStart: '#1e0f08',
    bgDimTintEnd: '#2d170e'
  },
  {
    name: 'ruby-coral',
    headerGradStart: '#e11d48',
    headerGradEnd: '#fb7185',
    cardBg: '#fffafb',
    dashedBorder: '#fb7185',
    accentPrimary: '#be123c',
    accentSecondary: '#fecdd3',
    subBadgeBg: '#fff1f2',
    subBadgeStroke: '#f43f5e',
    subBadgeText: '#9f1239',
    highlightColor: '#fed7aa',
    textColor: '#2d1217',
    shadowColor: '#881337',
    glowBall1: '#fecdd3',
    glowBall2: '#ffe4e6',
    glowBall3: '#fed7aa',
    bgDimTintStart: '#1e080e',
    bgDimTintEnd: '#2e0e18'
  },
  {
    name: 'iris-blue',
    headerGradStart: '#2563eb',
    headerGradEnd: '#60a5fa',
    cardBg: '#f7faff',
    dashedBorder: '#60a5fa',
    accentPrimary: '#1d4ed8',
    accentSecondary: '#bfdbfe',
    subBadgeBg: '#eff6ff',
    subBadgeStroke: '#3b82f6',
    subBadgeText: '#1e40af',
    highlightColor: '#fef08a',
    textColor: '#101e33',
    shadowColor: '#1e3a8a',
    glowBall1: '#bfdbfe',
    glowBall2: '#dbeafe',
    glowBall3: '#e0e7ff',
    bgDimTintStart: '#0a1426',
    bgDimTintEnd: '#12203d'
  }
];

export function getPaletteForArticle(articleId: string | number): CardPalette {
  if (typeof articleId === 'string' && isNaN(Number(articleId))) {
    return CARD_PALETTES[0];
  }
  const idNum = Math.abs(Number(articleId)) || 1;
  return CARD_PALETTES[(idNum - 1) % CARD_PALETTES.length];
}

export function buildCuteNoteCardSvg(content: ParsedCardContent, palette: CardPalette = CARD_PALETTES[0]): string {
  const width = 1200;
  const height = 630;

  const escapedBadge = escapeXml(content.badge);
  const lines = content.lines && content.lines.length > 0 ? content.lines : ['信太山新地お仕事ガイド'];

  // 1. Top Header Pill: "大阪　信太山新地"
  const headerWidth = 560;
  const headerHeight = 68;
  const headerX = (width - headerWidth) / 2;
  const headerY = 22; // spanning y: 22 to 90

  // 2. Sub-Badge / Category Pill: Clearly separated from header with 46px gap
  const badgeFontSize = 32;
  const badgeWidth = Math.min(940, Math.max(380, escapedBadge.length * 30 + 76));
  const badgeX = (width - badgeWidth) / 2;
  const badgeY = 136; // spanning y: 136 to 192
  const badgeHeight = 56;

  // 3. Title Lines: Clearly separated from badge with balanced vertical rhythm
  const lineCount = lines.length;
  let lineFontSizes: number[] = [];
  let lineYPositions: number[] = [];
  const highlightLineIndex = Math.max(0, lineCount - 1); // Highlight the bottom punchline

  if (lineCount >= 3) {
    lineFontSizes = lines.map(line => {
      if (line.length <= 13) return 48;
      if (line.length <= 17) return 44;
      if (line.length <= 21) return 40;
      return Math.max(34, Math.floor(940 / line.length));
    });
    lineYPositions = [288, 376, 464];
  } else if (lineCount === 2) {
    lineFontSizes = lines.map(line => {
      if (line.length <= 13) return 52;
      if (line.length <= 17) return 48;
      if (line.length <= 21) return 44;
      return Math.max(36, Math.floor(940 / line.length));
    });
    lineYPositions = [328, 428];
  } else {
    // 1 line
    const line = lines[0] || '';
    const size = line.length <= 14 ? 56 : line.length <= 20 ? 50 : 44;
    lineFontSizes = [size];
    lineYPositions = [370];
  }

  // Highlight marker behind punchline
  const targetHighlightLine = lines[highlightLineIndex] || '';
  const targetFontSize = lineFontSizes[highlightLineIndex] || 40;
  const targetY = lineYPositions[highlightLineIndex] || 464;
  const approxTextWidth = targetHighlightLine.length * targetFontSize * 0.96;
  const highlightWidth = Math.min(940, approxTextWidth + 36);
  const highlightX = (width - highlightWidth) / 2;
  const highlightY = targetY - targetFontSize * 0.44;
  const highlightHeight = Math.max(26, targetFontSize * 0.64);

  // Render text lines
  const linesSvg = lines.map((line, idx) => {
    const fontSize = lineFontSizes[idx];
    const yPos = lineYPositions[idx];
    const letterSpacing = line.length > 20 ? '0.8' : '1.8';
    return `    <text x="600" y="${yPos}" fill="${palette.textColor}" font-size="${fontSize}" font-family="'Zen Maru Gothic Black', 'Zen Maru Gothic', sans-serif" font-weight="900" text-anchor="middle" letter-spacing="${letterSpacing}">
      ${escapeXml(line)}
    </text>`;
  }).join('\n');

  return `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Soft blur for background bokeh -->
      <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="30" />
      </filter>
      <!-- Card drop shadow -->
      <filter id="cardShadow" x="-10%" y="-10%" width="130%" height="130%">
        <feDropShadow dx="0" dy="12" stdDeviation="22" flood-color="${palette.shadowColor}" flood-opacity="0.20" />
      </filter>
      <!-- Header pill shadow -->
      <filter id="headerShadow" x="-15%" y="-15%" width="130%" height="130%">
        <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="${palette.shadowColor}" flood-opacity="0.35" />
      </filter>
      <!-- Badge pill shadow -->
      <filter id="badgeShadow" x="-15%" y="-15%" width="130%" height="130%">
        <feDropShadow dx="0" dy="3" stdDeviation="5" flood-color="${palette.shadowColor}" flood-opacity="0.18" />
      </filter>
      <!-- Header Gradient -->
      <linearGradient id="headerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="${palette.headerGradStart}" />
        <stop offset="100%" stop-color="${palette.headerGradEnd}" />
      </linearGradient>
      <!-- Dim overlay on background photo -->
      <linearGradient id="bgDim" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="${palette.bgDimTintStart}" stop-opacity="0.26" />
        <stop offset="100%" stop-color="${palette.bgDimTintEnd}" stop-opacity="0.42" />
      </linearGradient>
    </defs>

    <!-- Darkening / tinting background overlay with palette tint -->
    <rect width="${width}" height="${height}" fill="url(#bgDim)" />

    <!-- Soft bokeh glow balls around card edges with palette colors -->
    <circle cx="1080" cy="110" r="95" fill="${palette.glowBall1}" opacity="0.25" filter="url(#softGlow)" />
    <circle cx="120" cy="520" r="110" fill="${palette.glowBall2}" opacity="0.25" filter="url(#softGlow)" />
    <circle cx="1120" cy="500" r="85" fill="${palette.glowBall3}" opacity="0.20" filter="url(#softGlow)" />

    <!-- Main White / Soft Tinted Rounded Card -->
    <rect x="60" y="48" width="1080" height="534" rx="34" ry="34" fill="${palette.cardBg}" filter="url(#cardShadow)" />

    <!-- Inner Dashed Border with palette color -->
    <rect x="84" y="72" width="1032" height="486" rx="24" ry="24" fill="none" stroke="${palette.dashedBorder}" stroke-width="2.8" stroke-dasharray="9 9" />

    <!-- 4 Corner Floral / Sparkle Accents with palette colors -->
    <!-- Top-Left Sakura Flower -->
    <g transform="translate(122, 110)">
      <circle cx="0" cy="0" r="4.5" fill="${palette.accentPrimary}" />
      <circle cx="0" cy="-9" r="4" fill="${palette.accentSecondary}" />
      <circle cx="8.5" cy="-2.7" r="4" fill="${palette.accentSecondary}" />
      <circle cx="5.2" cy="7.2" r="4" fill="${palette.accentSecondary}" />
      <circle cx="-5.2" cy="7.2" r="4" fill="${palette.accentSecondary}" />
      <circle cx="-8.5" cy="-2.7" r="4" fill="${palette.accentSecondary}" />
    </g>

    <!-- Top-Right Sakura Flower -->
    <g transform="translate(1078, 110)">
      <circle cx="0" cy="0" r="4.5" fill="${palette.accentPrimary}" />
      <circle cx="0" cy="-9" r="4" fill="${palette.accentSecondary}" />
      <circle cx="8.5" cy="-2.7" r="4" fill="${palette.accentSecondary}" />
      <circle cx="5.2" cy="7.2" r="4" fill="${palette.accentSecondary}" />
      <circle cx="-5.2" cy="7.2" r="4" fill="${palette.accentSecondary}" />
      <circle cx="-8.5" cy="-2.7" r="4" fill="${palette.accentSecondary}" />
    </g>

    <!-- Bottom-Left Sparkle Diamond -->
    <g transform="translate(122, 524)" stroke="${palette.accentPrimary}" stroke-width="1.8" fill="none">
      <path d="M 0,-9 Q 0,0 9,0 Q 0,0 0,9 Q 0,0 -9,0 Q 0,0 0,-9 Z" />
    </g>

    <!-- Bottom-Right Sparkle Diamond -->
    <g transform="translate(1078, 524)" stroke="${palette.accentPrimary}" stroke-width="1.8" fill="none">
      <path d="M 0,-9 Q 0,0 9,0 Q 0,0 0,9 Q 0,0 -9,0 Q 0,0 0,-9 Z" />
    </g>

    <!-- Top Center Badge: BIGGER & PROMINENT "大阪　信太山新地" -->
    <g transform="translate(${headerX}, ${headerY})" filter="url(#headerShadow)">
      <rect x="0" y="0" width="${headerWidth}" height="${headerHeight}" rx="${headerHeight / 2}" fill="url(#headerGrad)" stroke="#ffffff" stroke-width="3.5" />
      <text x="${headerWidth / 2}" y="48" fill="#ffffff" font-size="42" font-family="'Zen Maru Gothic Black', 'Zen Maru Gothic', sans-serif" font-weight="900" text-anchor="middle" letter-spacing="5">
        大阪　信太山新地
      </text>
    </g>

    <!-- Sub-Badge / Category Pill: ENLARGED -->
    <g transform="translate(${badgeX}, ${badgeY})" filter="url(#badgeShadow)">
      <rect x="0" y="0" width="${badgeWidth}" height="${badgeHeight}" rx="${badgeHeight / 2}" fill="${palette.subBadgeBg}" stroke="${palette.subBadgeStroke}" stroke-width="2.6" />
      <text x="${badgeWidth / 2}" y="39" fill="${palette.subBadgeText}" font-size="${badgeFontSize}" font-family="'Zen Maru Gothic Black', 'Zen Maru Gothic Bold', 'Zen Maru Gothic', sans-serif" font-weight="900" text-anchor="middle" letter-spacing="2">
        ${escapedBadge}
      </text>
    </g>

    <!-- Highlight Marker Strip behind punchline -->
    <rect x="${highlightX}" y="${highlightY}" width="${highlightWidth}" height="${highlightHeight}" rx="${highlightHeight / 2}" fill="${palette.highlightColor}" opacity="0.85" />

    <!-- Main Headline Lines (positioned downward for supreme readability) -->
${linesSvg}
  </svg>
  `;
}

export async function generateOgCardForArticle(article: BlogArticle, outputDir: string): Promise<string> {
  const width = 1200;
  const height = 630;

  // 1. 記事の内容に直結した背景写真を選定（記事ごとに固有）
  const bgFileName = selectBackgroundForArticle(article);
  const baseImagePath = path.join(process.cwd(), 'public', 'images', bgFileName);

  let baseImgBuffer: Buffer;
  try {
    baseImgBuffer = await sharp(baseImagePath)
      .resize(width, height, { fit: 'cover', position: 'center' })
      .blur(10)
      .modulate({ brightness: 0.90, saturation: 1.12 })
      .toBuffer();
  } catch {
    const fallbackPath = path.join(process.cwd(), 'public', 'images', 'col_ryotei_flow_1789107427433.jpg');
    baseImgBuffer = await sharp(fallbackPath)
      .resize(width, height, { fit: 'cover', position: 'center' })
      .blur(10)
      .modulate({ brightness: 0.90, saturation: 1.12 })
      .toBuffer();
  }

  // 2. タイトルのパース（【バッジ】＋2行構成）
  const parsed = parseTitleForCard(article.title, article.categoryLabel);
  const palette = getPaletteForArticle(article.id);
  const svg = buildCuteNoteCardSvg(parsed, palette);

  const fileName = `card_${article.slug}.jpg`;
  const outPath = path.join(outputDir, fileName);

  await sharp(baseImgBuffer)
    .composite([{ input: Buffer.from(svg) }])
    .jpeg({ quality: 90, progressive: false })
    .toFile(outPath);

  return fileName;
}

async function main() {
  const rootDir = process.cwd();
  const articles: BlogArticle[] = (BLOG_ARTICLES as BlogArticle[]) || [];
  console.log(`🎨 Generating cute editorial card thumbnails for ${articles.length} articles...`);

  const publicImagesDir = path.join(rootDir, 'public', 'images');
  const srcImagesDir = path.join(rootDir, 'src', 'assets', 'images');
  const distImagesDir = path.join(rootDir, 'dist', 'images');

  fs.mkdirSync(publicImagesDir, { recursive: true });
  fs.mkdirSync(srcImagesDir, { recursive: true });
  if (fs.existsSync(path.join(rootDir, 'dist'))) {
    fs.mkdirSync(distImagesDir, { recursive: true });
  }

  // Generate card for /blog index page
  const blogIndexCardFile = await generateOgCardForArticle(
    {
      id: 'blog-index',
      slug: 'blog_index',
      title: '【お仕事コラム一覧】信太山新地で安心デビュー完全ガイド',
      category: 'beginner',
      categoryLabel: '信太山新地お仕事コラム',
      summary: '',
      eyeCatch: '',
    },
    publicImagesDir
  );
  const blogIndexSrc = path.join(publicImagesDir, blogIndexCardFile);
  fs.copyFileSync(blogIndexSrc, path.join(srcImagesDir, blogIndexCardFile));
  if (fs.existsSync(distImagesDir)) {
    fs.copyFileSync(blogIndexSrc, path.join(distImagesDir, blogIndexCardFile));
  }

  let count = 0;
  for (const article of articles) {
    const fileName = await generateOgCardForArticle(article, publicImagesDir);
    const srcFile = path.join(publicImagesDir, fileName);
    fs.copyFileSync(srcFile, path.join(srcImagesDir, fileName));
    if (fs.existsSync(distImagesDir)) {
      fs.copyFileSync(srcFile, path.join(distImagesDir, fileName));
    }
    count++;
    if (count % 20 === 0 || count === articles.length) {
      console.log(`✅ Generated ${count} / ${articles.length} cards`);
    }
  }

  console.log(`🎉 Finished generating all ${count} cards with enlarged 「大阪　信太山新地」, cute note card styling & semantic backgrounds!`);
}

if (process.argv[1] && process.argv[1].includes('generate-og-cards')) {
  main().catch(console.error);
}
