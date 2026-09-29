import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../..');

export const TOPIC_CLUSTERS = [
  {
    pillar: 'Roof Restoration',
    canonicalPillarUrl: 'https://assistroofing.com.au/services/roof-restoration',
    suggestedTopics: [
      {
        slug: 'melbourne-roof-restoration-costs-guide',
        title: 'Roof Restoration Cost in Melbourne: Complete 2026 Homeowner Price Guide',
        keyword: 'Roof Restoration Cost Melbourne',
        intent: 'Commercial / Informational',
        targetPillar: '/services/roof-restoration'
      },
      {
        slug: 'signs-ridge-capping-repointing-needed',
        title: 'Signs Your Melbourne Roof Needs Ridge Capping Bedding and Repointing',
        keyword: 'Ridge Capping Repointing Melbourne',
        intent: 'Informational',
        targetPillar: '/services/roof-restoration'
      }
    ]
  },
  {
    pillar: 'Emergency Roof Repairs',
    canonicalPillarUrl: 'https://assistroofing.com.au/services/roof-repairs',
    suggestedTopics: [
      {
        slug: 'what-to-do-when-roof-leaks-storm',
        title: 'What To Do When Your Roof Leaks During a Severe Melbourne Storm',
        keyword: 'Emergency Roof Leak Repairs Melbourne',
        intent: 'Transactional / Emergency',
        targetPillar: '/services/roof-repairs'
      },
      {
        slug: 'cracked-tile-roof-leak-repair-guide',
        title: 'How Broken and Displaced Tiles Cause Concealed Ceiling Damage',
        keyword: 'Broken Tile Roof Repairs Melbourne',
        intent: 'Informational',
        targetPillar: '/services/roof-repairs'
      }
    ]
  },
  {
    pillar: 'Roof Replacement & Colorbond',
    canonicalPillarUrl: 'https://assistroofing.com.au/services/roof-replacement',
    suggestedTopics: [
      {
        slug: 'tile-to-colorbond-conversion-guide',
        title: 'Tile to Colorbond Roof Replacement in Melbourne: Step-by-Step Guide',
        keyword: 'Tile to Colorbond Roof Replacement Melbourne',
        intent: 'Commercial',
        targetPillar: '/services/roof-replacement'
      },
      {
        slug: 'best-colorbond-colors-melbourne-homes',
        title: 'Best Colorbond Roof Colors for Melbourne Homes & Architecture',
        keyword: 'Colorbond Roofing Melbourne Colors',
        intent: 'Informational',
        targetPillar: '/services/colorbond-roofing'
      }
    ]
  }
];

export function listTopicClusters() {
  console.log(`\n==============================================`);
  console.log(`📚  ASSIST ROOFING TOPICAL CONTENT CLUSTERS`);
  console.log(`==============================================`);
  TOPIC_CLUSTERS.forEach(cluster => {
    console.log(`\n📌 Pillar: ${cluster.pillar}`);
    console.log(`   Link: ${cluster.canonicalPillarUrl}`);
    cluster.suggestedTopics.forEach(t => {
      console.log(`   - "${t.title}"`);
      console.log(`     Primary Keyword: "${t.keyword}" | Intent: ${t.intent}`);
    });
  });
  console.log(`\n==============================================\n`);
}

export function generateDraftBrief(topicSlug) {
  let matchedTopic = null;
  let matchedCluster = null;

  for (const cluster of TOPIC_CLUSTERS) {
    const found = cluster.suggestedTopics.find(t => t.slug === topicSlug);
    if (found) {
      matchedTopic = found;
      matchedCluster = cluster;
      break;
    }
  }

  if (!matchedTopic) {
    console.error(`Topic slug "${topicSlug}" not found in registered clusters.`);
    return null;
  }

  const draftsDir = path.join(ROOT_DIR, 'tools/content/drafts');
  if (!fs.existsSync(draftsDir)) {
    fs.mkdirSync(draftsDir, { recursive: true });
  }

  const brief = `# Research & Writing Brief: ${matchedTopic.title}

## Metadata
- **Status**: DRAFT (Review required before publication)
- **Primary Keyword**: ${matchedTopic.keyword}
- **Target URL / Pillar**: ${matchedCluster.canonicalPillarUrl}
- **Search Intent**: ${matchedTopic.intent}
- **Authoritative Verified Facts**:
  - Business: Assist Roofing and Home Solution
  - Licensure: VBA Registered Trades
  - Standards: AS 4349.1 visual inspections, AS 1562.1 metal roofing
  - Warranty: 10-Year Workmanship Warranty
  - Phone: 0478 250 790
  - Location: 139 Boundary Road, North Melbourne VIC 3051

## Direct Answer First (AI / GEO Snippet)
> Provide a direct, factual 2-sentence answer addressing "${matchedTopic.keyword}" immediately at the top of the article. State exact Melbourne service context, typical scope, and why VBA registered trades are required under Victorian building standards.

## Recommended Outline
- **H1**: ${matchedTopic.title}
- **H2**: Direct Answer & Immediate Overview
- **H2**: Signs and Symptoms Melbourne Homeowners Notice
- **H2**: Professional Inspection Process (Drone & Roof Condition Assessment)
- **H2**: Solutions & Workmanship Guarantees
- **H2**: Frequently Asked Questions (FAQ schema ready)
- **CTA**: Free On-Site Roof Assessment & Itemized Quote

## Internal Linking Plan
- Anchor: [${matchedCluster.pillar}](${matchedCluster.canonicalPillarUrl})
- Anchor: [Free Melbourne Roof Inspection](https://assistroofing.com.au/contact)
`;

  const targetFile = path.join(draftsDir, `${matchedTopic.slug}-brief.md`);
  fs.writeFileSync(targetFile, brief, 'utf-8');
  console.log(`[Content Planner] Draft brief generated at: ${targetFile}`);
  return targetFile;
}

if (process.argv[1] && process.argv[1].endsWith('content-planner.mjs')) {
  const arg = process.argv[2];
  if (arg === 'brief' && process.argv[3]) {
    generateDraftBrief(process.argv[3]);
  } else {
    listTopicClusters();
  }
}
