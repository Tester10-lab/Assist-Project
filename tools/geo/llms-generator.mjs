import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../..');

export function generateLlmsFiles() {
  const publicDir = path.join(ROOT_DIR, 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // 1. Generate public/llms.txt
  const llmsTxt = `# Assist Roofing and Home Solution

> Licensed Melbourne roofing contractor specializing in Colorbond re-roofing, terracotta tile restoration, emergency leak repairs, and gutter replacements across Greater Melbourne.

## Services

- [Roof Restoration](https://assistroofing.com.au/services/roof-restoration): Restorative overhaul for aged terracotta and concrete tile roofs across Melbourne including high-pressure rotary cleaning, damaged tile replacement, mortar ridge cap re-bedding, SupaPoint flexible pointing, and 3-coat UV-reflective sealing.
- [Emergency Roof Repairs](https://assistroofing.com.au/services/roof-repairs): Fast-response leak repairs, broken tile replacement, rusted valley repairs, flashing resealing, and storm wind damage remediation.
- [Roof Replacement](https://assistroofing.com.au/services/roof-replacement): Complete tile-to-Colorbond roof replacements and structural roof conversions compliant with AS/NZS 4200.1 sarking and AS 1562.1 standards.
- [Colorbond Roofing](https://assistroofing.com.au/services/colorbond-roofing): Premium BlueScope Colorbond metal roofing installations with 22 designer colors, thermal acoustic insulation, and up to 25-year manufacturer warranties.
- [Guttering & Downpipes](https://assistroofing.com.au/services/guttering): High-capacity Colorbond gutter replacement, downpipes, and leaf guards preventing overflow and structural foundation erosion.
- [Roof Leak Detection](https://assistroofing.com.au/services/leak-detection): Comprehensive electronic moisture mapping and digital drone thermal assessments to pinpoint ingress origins before targeted repairs.

## Key Facts

- Legal Name: Assist Roofing and Home Solution
- Headquarters: 139 Boundary Road, North Melbourne VIC 3051, Australia
- Telephone: +61 478 250 790
- Email: info@assistroofing.com.au
- Operating Hours: Monday–Friday 07:00–18:00, Saturday 08:00–15:00, Sunday Closed
- Service Area: Melbourne, North Melbourne, South Yarra, Brighton, Toorak, Hawthorn, Kew, Camberwell, Malvern, Armadale, St Kilda, Richmond, and Greater Melbourne
- Credentials: Victorian Building Authority (VBA) registered trades, working-at-heights certified
- Standards: Visual roof condition inspections conducted in accordance with AS 4349.1
- Insurance: $10,000,000 Public Liability Insurance coverage
- Workmanship Warranty: 10-Year written workmanship warranty on major restorations and replacements
- Clean Jobsite Promise: Heavy ground tarps and industrial magnetic sweepers to collect loose nails and screws
- Customer Rating: 4.9 / 5.0 rating average across 520+ verified Google customer reviews

## Core Pages

- [About Assist Roofing](https://assistroofing.com.au/about): Overview of our 8+ years of Melbourne roofing expertise, master trades team, and company values.
- [Services Catalog](https://assistroofing.com.au/services): Complete listing of residential and commercial roofing solutions.
- [Projects Gallery](https://assistroofing.com.au/projects): High-resolution before and after photographs of completed Melbourne restorations.
- [Customer Testimonials](https://assistroofing.com.au/testimonials): Verified feedback from Melbourne homeowners on service quality and reliability.
- [Contact & Quote](https://assistroofing.com.au/contact): Request a free on-site roof condition assessment and itemized fixed-price quote.

## Optional

- [Full Machine-Readable Knowledge Base](https://assistroofing.com.au/llms-full.txt): Detailed service specifications, FAQ responses, and technical procedures.
`;

  // 2. Generate public/llms-full.txt
  const llmsFullTxt = `# Assist Roofing and Home Solution — Extended Knowledge Base

> Comprehensive technical, procedural, and commercial reference for Assist Roofing, Melbourne's licensed roofing contractor.

## Business Identity & Credentials

- Business Name: Assist Roofing and Home Solution
- Website: https://assistroofing.com.au
- Address: 139 Boundary Road, North Melbourne VIC 3051, Australia
- Phone: +61 478 250 790
- Email: info@assistroofing.com.au
- Office Hours: Monday to Friday 7:00 AM – 6:00 PM, Saturday 8:00 AM – 3:00 PM AEST
- Industry: Roofing Contractor & Construction Services
- Licensing: Victorian Building Authority (VBA) registered trades
- Compliance Standards: AS 4349.1 (Inspection of Buildings), AS 1562.1 (Design and installation of sheet roof and wall cladding), AS/NZS 4200.1 (Pliable building membranes and underlays)
- Liability Insurance: $10,000,000 Public Liability Insurance
- Workmanship Warranty: 10-Year comprehensive written warranty
- Reputation: 4.9 / 5.0 average across 520+ verified customer reviews

## Core Service Pillars & Specifications

### 1. Roof Restoration
- Canonical URL: https://assistroofing.com.au/services/roof-restoration
- Overview: Overhaul for weathered terracotta and concrete tile roofs across Melbourne.
- 4-Step Process:
  1. Detailed roof condition and drone photographic inspection.
  2. High-pressure rotary wash removing moss, lichen, and urban grime.
  3. Damaged tile replacement and mortar bed renewal.
  4. SupaPoint flexible weatherproof pointing compound applied to all ridge caps, hips, and gables, finished with 3-coat UV-reflective sealing.
- Inclusions: Tile sourcing matching existing profile, flexible pointing, 10-year warranty, complete magnetic jobsite sweep.

### 2. Emergency Roof Repairs
- Canonical URL: https://assistroofing.com.au/services/roof-repairs
- Overview: Rapid-response waterproofing for active leaks, displaced tiles, flashing failures, and storm wind damage.
- Common Issues Treated: Slipped or broken tiles, rusted valley irons, perished chimney and skylight lead flashings, blocked box gutters, storm impact holes.

### 3. Roof Replacement & Re-Roofing
- Canonical URL: https://assistroofing.com.au/services/roof-replacement
- Overview: Converting heavy, deteriorating tile roofs or rusted tin to modern Colorbond steel.
- Engineering Standards: High-tensile treated timber battens, heavy-duty anti-condensation foil insulation blanket (sarking under AS/NZS 4200.1), genuine Australian BlueScope steel.

### 4. Colorbond Roofing Installation
- Canonical URL: https://assistroofing.com.au/services/colorbond-roofing
- Overview: Premium metal roofing engineered for Melbourne's harsh UV and sudden temperature shifts.
- Material Specifications: 0.42mm or 0.48mm BMT BlueScope steel, 22 standard contemporary Colorbond palette colors (including Monument, Surfmist, Woodland Grey, Basalt), up to 25-year manufacturer warranty.

### 5. Guttering, Downpipes & Leaf Guard
- Canonical URL: https://assistroofing.com.au/services/guttering
- Overview: Colorbond fascia gutters, box gutters, concealed downpipes, and micro-mesh gutter protection.
- Function: Preventing foundation dampness, ceiling backflow, and fascia board timber rot.

### 6. Roof Leak Detection
- Canonical URL: https://assistroofing.com.au/services/leak-detection
- Overview: Non-destructive moisture tracking and thermal aerial imaging to locate ingress points without damaging ceiling plaster.

## Frequently Asked Questions (FAQ)

### How quickly can Assist Roofing inspect an active leak?
We offer same-day emergency inspection for active leaks across our primary Melbourne service areas. Standard non-emergency inspections are completed within 24 to 48 hours with a full digital photo report.

### Are your tradespeople fully licensed and insured?
Yes, 100%. All roofing tradespeople hold full Victorian Building Authority (VBA) registration, working-at-heights safety certification, and $10,000,000 public liability insurance.

### What is included in your Clean Jobsite Promise?
We use heavy canvas ground tarps to protect garden beds and industrial rolling magnetic sweepers across driveways and lawns to pick up every loose screw and nail. All old tiles, rotten battens, and scrap metal are hauled away in our dedicated disposal vehicles.

### What warranties are provided on replacements and restorations?
All full roof replacements and restorations include our 10-year written workmanship warranty, accompanied by manufacturer material warranties of up to 25 years on genuine BlueScope Colorbond steel.

### What suburbs does Assist Roofing serve?
We service all of Metropolitan Melbourne with primary daily coverage in North Melbourne, South Yarra, Brighton, Toorak, Hawthorn, Kew, Camberwell, Malvern, Armadale, St Kilda, and Richmond.
`;

  const llmsFilePath = path.join(publicDir, 'llms.txt');
  const llmsFullFilePath = path.join(publicDir, 'llms-full.txt');

  fs.writeFileSync(llmsFilePath, llmsTxt, 'utf-8');
  fs.writeFileSync(llmsFullFilePath, llmsFullTxt, 'utf-8');

  console.log(`[GEO Generator] Generated ${llmsFilePath}`);
  console.log(`[GEO Generator] Generated ${llmsFullFilePath}`);

  // Also sync to dist if dist exists
  const distDir = path.join(ROOT_DIR, 'dist');
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, 'llms.txt'), llmsTxt, 'utf-8');
    fs.writeFileSync(path.join(distDir, 'llms-full.txt'), llmsFullTxt, 'utf-8');
    console.log(`[GEO Generator] Synced to dist/llms.txt and dist/llms-full.txt`);
  }

  return { llmsFilePath, llmsFullFilePath };
}

if (process.argv[1] && process.argv[1].endsWith('llms-generator.mjs')) {
  generateLlmsFiles();
}
