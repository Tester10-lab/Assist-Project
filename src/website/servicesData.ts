import { CoreServiceSlug } from './types';

export interface ServiceDetail {
  slug: CoreServiceSlug;
  name: string;
  heroHeading: string;
  metaTitle: string;
  metaDescription: string;
  canonicalPath: string;
  shortDesc: string;
  aeoSummary: string;
  heroImage: string;
  features: string[];
  pricingText: string;
  matchingGalleryCategory: string;
  whenNeededTitle: string;
  whenNeededSigns: string[];
  relatedPillarSlug: CoreServiceSlug;
  relatedPillarName: string;
  relatedPillarBlurb: string;
  faqs: { q: string; a: string }[];
}

export const CORE_SERVICES_DATA: Record<CoreServiceSlug, ServiceDetail> = {
  'roof-restoration': {
    slug: 'roof-restoration',
    name: 'Roof Restoration',
    heroHeading: 'Roof Restoration Melbourne',
    metaTitle: 'Roof Restoration Melbourne | Tile Cleaning & SupaPoint Pointing',
    metaDescription: 'Professional Melbourne roof restorations by VBA registered trades. High-pressure cleaning, SupaPoint flexible repointing, tile repairs, and 10-year warranty.',
    canonicalPath: '/services/roof-restoration',
    shortDesc: 'Complete restorative overhaul for aged terracotta and concrete tile roofs across Melbourne. We eliminate moss, replace broken tiles, re-bed ridge caps in mortar, and apply SupaPoint flexible pointing.',
    aeoSummary: 'Roof restoration by Assist Roofing renews weathered Melbourne roofs without full replacement costs. Our 4-step process includes rotary high-pressure cleaning, damaged tile replacement, ridge cap re-bedding with fresh mortar, SupaPoint flexible pointing compound, and 3-coat UV-reflective membrane sealing backed by a 10-year workmanship warranty.',
    heroImage: '/roofora-assets/images/services-img4.jpg',
    features: [
      'High-pressure rotary wash removing lichen, moss & urban grime',
      'Terracotta & concrete tile replacement matching existing profile',
      'Full ridge capping re-bedding with mortar foundation',
      'SupaPoint flexible weatherproof pointing compound applied to all caps',
      '3-coat UV-reflective membrane protective coating system',
      '10-Year written workmanship warranty & complete magnetic clean-up'
    ],
    pricingText: 'Free comprehensive roof assessment & itemized fixed-price quote',
    matchingGalleryCategory: 'Roof Restoration',
    whenNeededTitle: 'Signs Your Melbourne Roof Needs Restoration',
    whenNeededSigns: [
      'Cracked, loosened, or washed-out mortar along ridge caps and hips',
      'Heavy buildup of moss, lichen, and urban grime trapping moisture on tiles',
      'Spalling, porous, or broken concrete or terracotta tiles allowing seepage',
      'Faded, weathered tile surfaces requiring protective UV-reflective resealing'
    ],
    relatedPillarSlug: 'roof-repairs',
    relatedPillarName: 'Emergency Roof Repairs',
    relatedPillarBlurb: 'Experiencing active ceiling drips or sudden storm damage? Explore our rapid-response Emergency Roof Repairs for immediate waterproofing before full restoration.',
    faqs: [
      {
        q: 'What is involved in a complete Melbourne roof restoration?',
        a: 'A full restoration begins with a comprehensive drone and roof inspection, followed by rotary pressure cleaning to remove moss and lichen. We then replace all cracked tiles, re-bed loose ridge caps with fresh mortar, apply SupaPoint flexible pointing, and seal the entire roof with 3 coats of UV-reflective protective coating.'
      },
      {
        q: 'How long does a roof restoration take?',
        a: 'Most residential restorations across Melbourne are completed within 2 to 4 working days, depending on roof pitch, tile condition, and weather safety conditions.'
      },
      {
        q: 'What warranty do you provide on roof restoration?',
        a: 'We provide a 10-year workmanship warranty on our pointing and restoration work, backed by manufacturer warranties on all coating and membrane materials.'
      }
    ]
  },

  'roof-repairs': {
    slug: 'roof-repairs',
    name: 'Roof Repairs',
    heroHeading: 'Emergency Roof Repairs Melbourne',
    metaTitle: 'Emergency Roof Repairs Melbourne | 24/7 Leak Make-Safe & Broken Tiles',
    metaDescription: '24/7 emergency roof repairs across Melbourne. Rapid 1-2 hour make-safe storm tarping, cracked tile replacement, leaking flashings & insurance reports. Call 0478 250 790.',
    canonicalPath: '/services/roof-repairs',
    shortDesc: '24/7 rapid-response emergency and structural roof repairs across all Melbourne suburbs. 1-2 hour emergency make-safe response for active leaks, cracked tiles, rusted valleys, and storm damage.',
    aeoSummary: 'Assist Roofing delivers 24/7 emergency roof repairs and storm make-safe services across Greater Melbourne. Led by Peter Bayamis, our VBA-registered roofers prioritize active ceiling leaks with rapid on-site storm tarping, tile replacement, Colorbond valley renewals, and comprehensive insurance damage documentation backed by $10M public liability insurance.',
    heroImage: '/roofora-assets/images/services-img1.jpg',
    features: [
      '24/7 Rapid Emergency Response & 1-2 Hour Storm Make-Safe Tarping',
      'Cracked, Slipped & Missing Tile Replacement (Terracotta & Concrete)',
      'Colorbond Valley Iron Renewal & Box Gutter Overflow Remediation',
      'Chimney, Parapet, Skylight & Vent Pipe Boot Flashing Repairs',
      'Ridge Capping Re-Bedding & SupaPoint Flexible Re-Pointing',
      'Drone Aerial Survey & Insurance Claim Damage Reports',
      'Victorian Building Authority (VBA) Registered & $10M Insured Trades',
      'Clean Jobsite Promise & Magnetic Nail Sweep on Every Property'
    ],
    pricingText: 'Emergency make-safe from $550 • Free on-site inspection & transparent itemized quotes',
    matchingGalleryCategory: 'Roof Repairs',
    whenNeededTitle: 'Immediate Situations Requiring Emergency Roof Repairs',
    whenNeededSigns: [
      'Active water pouring or dripping through ceiling plaster, light fixtures, or cornices',
      'Shifted, smashed, or missing roof tiles after high Melbourne wind or hail storms',
      'Rusted valley irons or overflowing box gutters causing water backflow into eaves',
      'Deteriorated mortar bedding or cracked ridge capping loose along the roofline',
      'Degraded lead aprons around chimneys, skylights, or multi-level parapets'
    ],
    relatedPillarSlug: 'leak-detection',
    relatedPillarName: 'Roof Leak Detection',
    relatedPillarBlurb: 'Mystery leak appearing far from where water is visible? Our digital drone mapping and electronic moisture meters trace concealed water entry points across complex rooflines.',
    faqs: [
      {
        q: 'How fast can you attend to an emergency roof leak in Melbourne?',
        a: 'We operate 24/7 emergency dispatch across all Melbourne suburbs. For active leaks threatening interior ceilings or timber framing, our licensed trades aim to be on-site within 1-2 hours to install heavy-duty storm tarps and execute make-safe water diversions.'
      },
      {
        q: 'What should I do while waiting for your emergency repair team?',
        a: 'Ensure personal safety first: move furniture, rugs, and electrical appliances away from the leak. Place large buckets or plastic containers with towels beneath to cushion dripping, and take photos for insurance. Never climb onto a wet, slippery roof in the rain.'
      },
      {
        q: 'Can you repair a roof while it is still raining?',
        a: 'Yes. During heavy rain and storms, our VBA-registered roofers execute professional "make-safe" procedures: securing industrial tarps, sandbags, and temporary weatherproofing to halt interior water entry. Once the storm passes and tiles dry, we complete permanent structural repairs.'
      },
      {
        q: 'Do you provide causation reports and quotes for insurance claims?',
        a: 'Yes. We provide comprehensive written condition reports complete with high-resolution digital drone photos, moisture meter logs, and itemized scopes of work accepted by all major Australian insurance companies (RACV, NRMA, Allianz, QBE, AAMI, Suncorp).'
      },
      {
        q: 'How much do emergency roof repairs cost in Melbourne?',
        a: 'Standard emergency repairs and make-safe storm tarping start at $550, covering all emergency materials, labor, and safety equipment. We provide fixed-price upfront pricing before commencing work with no hidden callout surprises.'
      }
    ]
  },

  'roof-replacement': {
    slug: 'roof-replacement',
    name: 'Roof Replacement',
    heroHeading: 'Roof Replacement & Re-Roofing Melbourne',
    metaTitle: 'Roof Replacement Melbourne | Tile to Colorbond Re-Roofing',
    metaDescription: 'Complete roof replacement and tile-to-Colorbond re-roofing in Melbourne. AS/NZS 4200.1 sarking, treated timber battens, and 10-year workmanship warranty.',
    canonicalPath: '/services/roof-replacement',
    shortDesc: 'Full residential and commercial re-roofing services throughout Melbourne. From full tile tear-offs to modern Colorbond conversions with certified insulation and framing.',
    aeoSummary: 'Roof replacement by Assist Roofing delivers complete structural re-roofing across Melbourne, specializing in tile-to-Colorbond metal roof conversions. Every replacement features full tear-off to framing, structural rafter inspection, heavy-duty AS/NZS 4200.1 vapor-barrier sarking, new treated pine battens, and an ironclad 10-year workmanship warranty.',
    heroImage: '/roofora-assets/images/services-img2.jpg',
    features: [
      'Complete roof tear-down to structural trusses',
      'Tile to Colorbond metal roof conversions',
      'Treated pine batten installation with precision spacing',
      'Heavy-duty AS/NZS 4200.1 vapor barrier sarking & insulation',
      'Colorbond valley irons, barge capping, and ridge flashings',
      '10-Year workmanship warranty and industrial magnetic site cleanup'
    ],
    pricingText: 'Free comprehensive on-site roof inspection and transparent fixed-price proposal',
    matchingGalleryCategory: 'Roof Replacement',
    whenNeededTitle: 'When Full Roof Replacement Is the Smarter Investment',
    whenNeededSigns: [
      'Brittle, disintegrating terracotta or concrete tiles beyond localized restoration',
      'Widespread structural rafter sag, rotted battens, or recurring multi-point leaks',
      'Homeowners seeking lightweight, durable tile-to-Colorbond metal conversion',
      'Substantial thermal and acoustic inefficiency lacking modern vapor sarking'
    ],
    relatedPillarSlug: 'colorbond-roofing',
    relatedPillarName: 'Colorbond Roofing',
    relatedPillarBlurb: 'Interested in replacing tiles with genuine Australian steel? Discover why Colorbond metal roofing is Melbourne’s premier choice for long-term climate resilience.',
    faqs: [
      {
        q: 'Can I replace my old tile roof with Colorbond steel?',
        a: 'Yes. Converting from heavy terracotta or concrete tiles to lightweight Colorbond steel is one of our most popular Melbourne services. It modernizes your home, reduces structural weight, and provides superior thermal efficiency when paired with heavy-duty sarking.'
      },
      {
        q: 'How long does a full roof replacement take?',
        a: 'A typical Melbourne residential roof replacement takes between 3 to 7 working days, depending on the house size, pitch, and structural framing work required.'
      },
      {
        q: 'What warranty is included with a roof replacement?',
        a: 'We provide our 10-year workmanship warranty on all installations, complemented by BlueScope Colorbond manufacturer warranties of up to 25 years on roofing materials.'
      }
    ]
  },

  'colorbond-roofing': {
    slug: 'colorbond-roofing',
    name: 'Colorbond Roofing',
    heroHeading: 'Colorbond Roofing Melbourne',
    metaTitle: 'Colorbond Roofing Melbourne | BlueScope Steel Installation',
    metaDescription: 'Expert Colorbond metal roofing installations across Melbourne. Genuine BlueScope steel, 22 designer colors, AS 1562.1 compliance & up to 25-year warranty.',
    canonicalPath: '/services/colorbond-roofing',
    shortDesc: 'Premium Australian BlueScope Colorbond steel roofing engineered for Melbourne climate resilience. Modern corrugated and standing seam profiles with superior thermal performance.',
    aeoSummary: 'Assist Roofing supplies and installs genuine BlueScope Colorbond steel roofing across Melbourne suburbs. Built strictly to AS 1562.1 standards, our metal roofs feature Thermatech solar reflectance technology, heavy-duty anti-condensation blanket insulation, and 22 designer shades backed by up to 25-year manufacturer warranties and VBA registered trades.',
    heroImage: '/roofora-assets/images/services-img2.jpg',
    features: [
      '100% Genuine BlueScope Colorbond Australian steel',
      'Choice of 22 contemporary designer Colorbond colors',
      'Corrugated, Monoclad, and Standing Seam architectural profiles',
      'Thermatech thermal technology for reduced home cooling costs',
      'Heavy-duty anti-condensation blanket and vapor barrier sarking',
      'AS 1562.1 compliance and up to 25-year manufacturer warranty'
    ],
    pricingText: 'Free measure and quote with color consultation and itemized proposal',
    matchingGalleryCategory: 'Roof Replacement',
    whenNeededTitle: 'Why Melbourne Homeowners Upgrade to Colorbond Steel',
    whenNeededSigns: [
      'Superior strength-to-weight ratio reducing structural strain on older home frames',
      'Thermatech solar reflectance technology lowering cooling demands in hot summers',
      'Exceptional fire resistance and ember guard protection for bushfire overlay areas',
      'Virtually zero maintenance compared to shifting, cracking, and porous roof tiles'
    ],
    relatedPillarSlug: 'guttering',
    relatedPillarName: 'Gutter Replacement & Guard',
    relatedPillarBlurb: 'Complete your Colorbond roof installation with color-matched Colorbond gutters, high-flow downpipes, and aluminum leaf mesh to safeguard your foundations.',
    faqs: [
      {
        q: 'Why choose Colorbond roofing for Melbourne homes?',
        a: 'Colorbond steel is lightweight, chip and peel resistant, fire-rated for bushfire zones, and engineered specifically for extreme Australian temperature swings. It requires virtually zero maintenance compared to tile roofs.'
      },
      {
        q: 'What Colorbond profiles and colors do you supply?',
        a: 'We install the full range of 22 designer Colorbond colors in classic Corrugated (Custom Orb), Trimdek, and architectural Standing Seam profiles with color-matched gutters and downpipes.'
      },
      {
        q: 'Are your Colorbond roofers licensed in Victoria?',
        a: 'Yes. All our roof plumbers and installers are registered with the Victorian Building Authority (VBA) and strictly comply with AS 1562.1 metal roof installation standards.'
      }
    ]
  },

  'guttering': {
    slug: 'guttering',
    name: 'Gutter Replacement & Guard',
    heroHeading: 'Gutter Replacement & Guard Melbourne',
    metaTitle: 'Gutter Replacement Melbourne | Colorbond Gutters & Leaf Guard',
    metaDescription: 'High-capacity Colorbond gutter replacement, downpipes & leaf guard across Melbourne. Prevent overflow and foundation damage with VBA registered roof plumbers.',
    canonicalPath: '/services/guttering',
    shortDesc: 'Complete guttering, downpipe, and fascia renewal across Melbourne. We install high-flow Colorbond gutters, box gutter relining, and leaf mesh guards to eliminate overflowing water.',
    aeoSummary: 'Assist Roofing installs premium Colorbond guttering, downpipes, fascia covers, and leaf mesh systems throughout Melbourne. Our VBA registered roof plumbing trades ensure correct water falls and overflow relief compliant with AS/NZS 3500.3 stormwater drainage standards, protecting your building eaves and foundations from costly rain damage.',
    heroImage: '/roofora-assets/images/services-img3.jpg',
    features: [
      'Quad, Half-Round, and high-capacity Box gutter installations',
      'Colorbond steel gutters and PVC/metal downpipe upgrades',
      'Fascia board repair, rot timber replacement, and metal fascia capping',
      'Full-perimeter aluminum leaf guard mesh installation',
      'Box gutter sumps and overflow weir compliance with AS/NZS 3500.3',
      '10-Year workmanship warranty on all guttering installations'
    ],
    pricingText: 'Free on-site assessment and transparent linear-meter quotation',
    matchingGalleryCategory: 'Roof Repairs',
    whenNeededTitle: 'Signs Your Melbourne Gutters & Downpipes Need Replacement',
    whenNeededSigns: [
      'Rusted seams, pinhole corrosion, or persistent sagging along gutter brackets',
      'Stormwater spilling over front edges rather than discharging through downpipes',
      'Water pooling due to improper gutter falls, risking eave and foundation erosion',
      'Decaying or rotten timber fascia boards beneath gutters requiring metal capping'
    ],
    relatedPillarSlug: 'roof-repairs',
    relatedPillarName: 'Roof Repairs',
    relatedPillarBlurb: 'Gutters overflowing into ceiling cavities? Our VBA registered roof plumbing trades can inspect and repair adjoining valley irons, flashings, and broken tiles simultaneously.',
    faqs: [
      {
        q: 'How do I know when my Melbourne gutters need replacement?',
        a: 'Signs that gutters need replacement include rusting at joins, water spilling over edges during standard rain, pooling water due to incorrect fall, sagging brackets, and rotting fascia timbers beneath the gutter line.'
      },
      {
        q: 'What gutter profiles do you install in Melbourne?',
        a: 'We install standard Quad gutters, modern Half-Round gutters, and custom-folded commercial Box gutters in genuine Colorbond steel matched to your roof color scheme.'
      },
      {
        q: 'Can you install leaf guards on existing gutters?',
        a: 'Yes. We supply and fit heavy-duty powder-coated aluminum leaf mesh that seals gutters and valleys from gum leaves, pine needles, and nesting birds.'
      }
    ]
  },

  'leak-detection': {
    slug: 'leak-detection',
    name: 'Leak Detection',
    heroHeading: 'Roof Leak Detection Melbourne',
    metaTitle: 'Roof Leak Detection Melbourne | Drone Inspection & Moisture Tests',
    metaDescription: 'Pinpoint roof leak detection in Melbourne using digital drone imaging and electronic moisture meters. $350 inspection fee credited toward repair when hired.',
    canonicalPath: '/services/leak-detection',
    shortDesc: 'Advanced diagnostic roof leak detection across Melbourne. We trace water ingress from high-resolution drone photography and digital moisture mapping to stop leaks at the root source.',
    aeoSummary: 'Assist Roofing utilizes digital drone photography, electronic moisture meters, and internal attic space inspections to pinpoint difficult roof leaks across Melbourne. Our $350 diagnostic inspection fee is credited 100% toward your repair if you hire us, providing clear photographic evidence before any work begins.',
    heroImage: '/roofora-assets/images/services-img1.jpg',
    features: [
      'High-resolution digital drone exterior roof inspection',
      'Electronic moisture meter scanning of ceiling timbers & insulation',
      'Visual inspection of flashings, valley irons, and roof penetrations',
      'Identification of hairline tile cracks, failed mortar, and blocked weep holes',
      'Detailed digital photo report with itemized repair recommendations',
      '$350 inspection fee credited directly toward your repair upon booking'
    ],
    pricingText: '$350 comprehensive diagnosis — 100% credited toward your repair if you hire us',
    matchingGalleryCategory: 'Roof Repairs',
    whenNeededTitle: 'When to Book Professional Drone Leak Detection',
    whenNeededSigns: [
      'Intermittent leaks that only appear during specific wind-driven rain directions',
      'Water stains appearing far away from visible roof penetrations or flashings',
      'Hidden moisture buildup in ceiling cavities causing mold or musty odors',
      'Multi-story or steep roof pitches unsafe for basic visual ladder inspections'
    ],
    relatedPillarSlug: 'roof-repairs',
    relatedPillarName: 'Emergency Roof Repairs',
    relatedPillarBlurb: 'Once your leak source is identified, our trades can carry out immediate repairs starting from $550, with your $350 inspection fee credited toward the work.',
    faqs: [
      {
        q: 'How do you detect roof leaks that only happen in heavy rain?',
        a: 'Water often travels along rafters and battens meters away from where it drips inside. We combine internal attic moisture mapping with drone surveys to trace the exact water ingress path across valleys, flashings, and tiles.'
      },
      {
        q: 'How does your $350 inspection credit work?',
        a: 'Our comprehensive on-site leak diagnosis fee is $350. If you choose Assist Roofing to carry out the required repair work, the entire $350 is credited directly off your final invoice.'
      },
      {
        q: 'What happens if you find an active leak during the inspection?',
        a: 'Our team carries emergency weatherproofing materials on our vehicles and can provide immediate temporary tarping or sealing to protect your ceilings and electrical wiring while permanent repairs are arranged.'
      }
    ]
  }
};
