import React, { useState } from 'react';
import { useWebsite } from '../WebsiteContext';
import type { CoreServiceSlug } from '../types';
import type { ServiceOfferingItem } from '../data';

interface ServicesAccordionProps {
  services: ServiceOfferingItem[];
  className?: string;
}

interface CategoryGroup {
  id: 'repairs' | 'replacement' | 'restoration' | 'gutters';
  title: string;
  subtitle: string;
  icon: string;
  badge: string;
  primaryPillarSlug: CoreServiceSlug;
  primaryPillarName: string;
  secondaryPillarSlug?: CoreServiceSlug;
  secondaryPillarName?: string;
}

const CATEGORY_GROUPS: CategoryGroup[] = [
  {
    id: 'repairs',
    title: 'Roof Repairs & Emergency Leak Detection',
    subtitle: 'Pinpoint drone leak detection, storm damage repair, and AS 4349.1 structural inspections',
    icon: 'fa-solid fa-screwdriver-wrench',
    badge: 'Emergency & Inspection',
    primaryPillarSlug: 'roof-repairs',
    primaryPillarName: 'Roof Repairs',
    secondaryPillarSlug: 'leak-detection',
    secondaryPillarName: 'Leak Detection',
  },
  {
    id: 'replacement',
    title: 'Roof Replacement & Colorbond Installations',
    subtitle: 'Complete tile-to-Colorbond conversions, new builds, corrugated iron, and structural renewals',
    icon: 'fa-solid fa-hammer',
    badge: '10-Yr Warranty',
    primaryPillarSlug: 'roof-replacement',
    primaryPillarName: 'Roof Replacement',
    secondaryPillarSlug: 'colorbond-roofing',
    secondaryPillarName: 'Colorbond Roofing',
  },
  {
    id: 'restoration',
    title: 'Roof Restoration, Painting & Ridge Capping',
    subtitle: 'Multi-coat UV heat-reflective painting, SupaPoint flexible pointing, and lead apron flashings',
    icon: 'fa-solid fa-brush',
    badge: 'Full Restoration',
    primaryPillarSlug: 'roof-restoration',
    primaryPillarName: 'Roof Restoration',
  },
  {
    id: 'gutters',
    title: 'Gutters, Downpipes & Stormwater Drainage',
    subtitle: 'Genuine Colorbond high-flow guttering, downpipes, fascia/eave repairs, and skylight fittings',
    icon: 'fa-solid fa-water',
    badge: 'Engineered Fall',
    primaryPillarSlug: 'guttering',
    primaryPillarName: 'Guttering & Downpipes',
  },
];

// Mapping every service to its most relevant pillar page
const SERVICE_PILLAR_MAP: Record<string, CoreServiceSlug> = {
  // Repairs & Leaks
  'roof-leak-repairs': 'roof-repairs',
  'roof-repairs': 'roof-repairs',
  'roof-leak-detection': 'leak-detection',
  'storm-wind-damage-repair': 'roof-repairs',
  'roof-inspection': 'leak-detection',
  'leaky-roof-maintenance': 'roof-repairs',

  // Installation & Replacement
  'roof-replacement': 'roof-replacement',
  'new-roof-installation': 'roof-replacement',
  'roof-installation': 'roof-replacement',
  'garage-pergola-roofing': 'colorbond-roofing',
  'concrete-tile-roof': 'roof-replacement',
  'corrugated-iron-roof': 'colorbond-roofing',

  // Restoration & Painting
  'roof-painting': 'roof-restoration',
  'tile-metal-roof-painting': 'roof-restoration',
  'roof-flashing': 'roof-restoration',
  'bedding-and-repointing': 'roof-restoration',
  'ridge-capping': 'roof-restoration',

  // Gutters & Drainage
  'guttering-repair-new-guttering': 'guttering',
  'gutter-installation': 'guttering',
  'gutter-repairs': 'guttering',
  'colorbond-gutters': 'guttering',
  'gutters-and-downpipes': 'guttering',
  'fascia-eave-repair': 'guttering',
  'skylight-installation': 'guttering',
};

export const ServicesAccordion: React.FC<ServicesAccordionProps> = ({ services, className = '' }) => {
  const { navigateTo, openQuoteModal } = useWebsite();

  // First category open by default for immediate visibility without clutter
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    repairs: true,
    replacement: false,
    restoration: false,
    gutters: false,
  });

  const toggleCategory = (categoryId: string) => {
    setOpenCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, slug: CoreServiceSlug) => {
    e.preventDefault();
    navigateTo('services', slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const allOpen = Object.values(openCategories).every(Boolean);

  const toggleAll = () => {
    const nextState = !allOpen;
    setOpenCategories({
      repairs: nextState,
      replacement: nextState,
      restoration: nextState,
      gutters: nextState,
    });
  };

  return (
    <div className={`services-accordion-wrapper ${className}`}>
      {/* Top Controls: Scope Info + Expand/Collapse All */}
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4 pb-2 border-bottom border-white/20">
        <div className="d-flex align-items-center gap-2 max-w-full">
          <span className="badge bg-white/20 text-white font-weight-600 px-2.5 px-sm-3 py-1.5 rounded-pill text-size-12 text-sm-size-13 text-wrap max-w-full text-left line-height-normal">
            <i className="fa-solid fa-list-check mr-1.5 text-[#f19e1f]"></i>
            <span className="d-inline d-sm-none">4 Divisions • 24 Scopes</span>
            <span className="d-none d-sm-inline">4 Core Divisions • 24 Specialised Scopes</span>
          </span>
        </div>
        <button
          type="button"
          onClick={toggleAll}
          className="btn btn-sm btn-outline-light text-size-12 text-sm-size-13 font-weight-600 rounded-pill px-2.5 px-sm-3 py-1.5 d-inline-flex align-items-center gap-1.5 transition-all"
          style={{ borderColor: 'rgba(255,255,255,0.3)', backgroundColor: 'rgba(255,255,255,0.08)' }}
          aria-label={allOpen ? 'Collapse all service categories' : 'Expand all service categories'}
        >
          <i className={`fa-solid ${allOpen ? 'fa-compress' : 'fa-expand'} text-size-12`}></i>
          <span>{allOpen ? 'Collapse All' : 'Expand All Categories'}</span>
        </button>
      </div>

      {/* Accordion Categories List */}
      <div className="d-flex flex-column gap-3">
        {CATEGORY_GROUPS.map((group) => {
          const groupServices = services.filter(s => s.category === group.id);
          const isOpen = !!openCategories[group.id];
          const panelId = `services-accordion-panel-${group.id}`;
          const buttonId = `services-accordion-btn-${group.id}`;

          return (
            <div
              key={group.id}
              className="rounded-3 transition-all border border-white/20 overflow-hidden"
              style={{
                backgroundColor: isOpen ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.06)',
                backdropFilter: 'blur(10px)',
              }}
            >
              {/* Accordion Header Button */}
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleCategory(group.id)}
                className="w-100 d-flex align-items-center justify-content-between p-3 p-md-4 text-left border-0 bg-transparent text-white cursor-pointer transition-colors group"
                style={{ outline: 'none' }}
              >
                <div className="d-flex align-items-center gap-2 gap-sm-3 pr-2 flex-1 min-w-0">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center shrink-0 shadow-sm"
                    style={{
                      width: '38px',
                      height: '38px',
                      backgroundColor: isOpen ? '#f19e1f' : 'rgba(255, 255, 255, 0.15)',
                      color: isOpen ? '#1e2e4f' : '#ffffff',
                      fontSize: '16px',
                      transition: 'all 0.25s ease',
                    }}
                  >
                    <i className={group.icon}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="d-flex flex-wrap align-items-center gap-1.5 gap-sm-2 mb-1">
                      <h4 className="text-white text-size-15 text-sm-size-18 font-weight-700 mb-0 group-hover:text-[#f19e1f] transition-colors">
                        {group.title}
                      </h4>
                      <span
                        className="badge rounded-pill text-size-11 text-sm-size-12 px-2 py-0.5"
                        style={{ backgroundColor: 'rgba(255,255,255,0.18)', color: '#ffffff', fontWeight: 600 }}
                      >
                        {groupServices.length} Services
                      </span>
                    </div>
                    <p className="text-white opacity-80 text-size-13 mb-0 d-none d-sm-block font-light">
                      {group.subtitle}
                    </p>
                  </div>
                </div>

                {/* Right side indicators */}
                <div className="d-flex align-items-center gap-2 shrink-0 ml-1">
                  <span className="text-size-12 opacity-75 d-none d-md-inline-block font-weight-600">
                    {isOpen ? 'Collapse' : 'Expand'}
                  </span>
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: '30px',
                      height: '30px',
                      backgroundColor: 'rgba(255, 255, 255, 0.12)',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                    }}
                  >
                    <i className="fa-solid fa-chevron-down text-size-12 text-white"></i>
                  </div>
                </div>
              </button>

              {/* Accordion Content Panel - Always kept in DOM for Google crawlers & SEO */}
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="transition-all"
                style={{
                  maxHeight: isOpen ? '2500px' : '0px',
                  opacity: isOpen ? 1 : 0,
                  overflow: isOpen ? 'visible' : 'hidden',
                  paddingLeft: '14px',
                  paddingRight: '14px',
                  paddingBottom: isOpen ? '18px' : '0px',
                  transition: 'max-height 0.35s ease, opacity 0.25s ease, padding-bottom 0.35s ease',
                }}
              >
                {/* Pillar Hub Link Bar */}
                <div
                  className="p-2.5 p-sm-3 rounded-3 mb-3 d-flex flex-wrap align-items-center justify-content-between gap-2"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.12)' }}
                >
                  <div className="d-flex flex-wrap align-items-center gap-1.5 gap-sm-2 text-white text-size-12 text-sm-size-13">
                    <span className="text-[#f19e1f] font-weight-bold">
                      <i className="fa-solid fa-compass mr-1"></i> Dedicated Pillar Guide:
                    </span>
                    <a
                      href={`/services/${group.primaryPillarSlug}`}
                      onClick={(e) => handleNav(e, group.primaryPillarSlug)}
                      className="text-white hover:text-[#f19e1f] font-weight-700 text-decoration-underline"
                    >
                      {group.primaryPillarName}
                    </a>
                    {group.secondaryPillarSlug && (
                      <>
                        <span className="opacity-50">•</span>
                        <a
                          href={`/services/${group.secondaryPillarSlug}`}
                          onClick={(e) => handleNav(e, group.secondaryPillarSlug!)}
                          className="text-white hover:text-[#f19e1f] font-weight-700 text-decoration-underline"
                        >
                          {group.secondaryPillarName}
                        </a>
                      </>
                    )}
                  </div>
                  <a
                    href={`/services/${group.primaryPillarSlug}`}
                    onClick={(e) => handleNav(e, group.primaryPillarSlug)}
                    className="text-[#f19e1f] hover:text-white text-size-12 font-weight-700 d-inline-flex align-items-center gap-1 text-decoration-none"
                  >
                    <span>View Technical Scope</span>
                    <i className="fa-solid fa-arrow-right text-size-10"></i>
                  </a>
                </div>

                {/* Sub-services Grid */}
                <div className="row g-2.5">
                  {groupServices.map((srv) => {
                    const pillarSlug = SERVICE_PILLAR_MAP[srv.id] || group.primaryPillarSlug;
                    return (
                      <div key={srv.id} className="col-12 col-md-6 col-lg-4 mb-2">
                        <div
                          className="h-100 p-3 rounded-3 d-flex flex-col justify-between transition-all border border-white/10 group hover:border-[#f19e1f]"
                          style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.07)',
                          }}
                        >
                          <div>
                            {/* Title row with check icon and badge */}
                            <div className="d-flex align-items-start gap-2.5 mb-2">
                              <div
                                className="rounded-circle d-flex align-items-center justify-content-center shrink-0 mt-0.5"
                                style={{
                                  width: '24px',
                                  height: '24px',
                                  backgroundColor: '#ffffff',
                                  color: '#dc2626',
                                  fontWeight: 'bold',
                                  fontSize: '12px',
                                }}
                              >
                                <i className="fa-solid fa-check"></i>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="d-flex flex-wrap align-items-center justify-content-between gap-1">
                                  <h5 className="text-white text-size-14 text-sm-size-15 font-weight-700 mb-0 group-hover:text-[#f19e1f] transition-colors leading-snug">
                                    {srv.name}
                                  </h5>
                                  {srv.badge && (
                                    <span
                                      className="badge rounded-pill text-size-10 px-2 py-0.5 shrink-0"
                                      style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#fff' }}
                                    >
                                      {srv.badge}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Service Description for indexing and user guidance */}
                            <p className="text-white opacity-80 text-size-12 mb-2.5 pl-0 pl-sm-4 font-light leading-relaxed">
                              {srv.description}
                            </p>
                          </div>

                          {/* Action Footer: SEO Anchor + Fast Quote Trigger */}
                          <div className="pt-2 border-top border-white/10 d-flex align-items-center justify-content-between pl-0 pl-sm-4 text-size-12">
                            <a
                              href={`/services/${pillarSlug}`}
                              onClick={(e) => handleNav(e, pillarSlug)}
                              className="text-white hover:text-[#f19e1f] font-weight-600 text-decoration-none d-inline-flex align-items-center gap-1 transition-colors"
                              title={`Learn more about ${srv.name}`}
                            >
                              <span>Overview</span>
                              <i className="fa-solid fa-arrow-right text-size-10"></i>
                            </a>
                            <button
                              type="button"
                              onClick={() => openQuoteModal(srv.name)}
                              className="btn btn-sm text-[#f19e1f] hover:text-white font-weight-700 p-0 border-0 bg-transparent cursor-pointer"
                              title={`Request an itemized quote for ${srv.name}`}
                            >
                              Quote <i className="fa-solid fa-chevron-right text-size-10 ml-0.5"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
