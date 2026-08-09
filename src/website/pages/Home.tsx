import React, { useEffect, useState } from 'react';
import { HipRoof3D } from '../components/HipRoof3D';
import { SERVICES, GALLERY_PROJECTS } from '../data';
import { useWebsite } from '../WebsiteContext';
import { FadeIn } from '../components/FadeIn';

const STAT_ITEMS = [
  { value: 2500, suffix: '+', label: 'PROJECTS COMPLETED', color: '#44d991' },
  { value: 15, suffix: '+', label: 'YEARS EXPERIENCE', color: '#eaf9f2' },
  { value: 100, suffix: '%', label: 'SATISFACTION RATE', color: '#4c92e9' },
  { value: 10, suffix: 'yr', label: 'WORKMANSHIP GUARANTEE', color: '#ffffff' },
  { value: 500, suffix: '+', label: 'HAPPY CLIENTS', color: '#ff6a51' },
];

/**
 * Animated Stat Block Component
 * All cards are equal size with animated number counters!
 */
const AnimatedStatCard: React.FC<{
  targetValue: number;
  suffix: string;
  label: string;
  color: string;
  delay: number;
}> = ({ targetValue, suffix, label, color, delay }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const stepTime = 30;
    const steps = duration / stepTime;
    const increment = targetValue / steps;

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        start += increment;
        if (start >= targetValue) {
          setCount(targetValue);
          clearInterval(interval);
        } else {
          setCount(Math.floor(start));
        }
      }, stepTime);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [targetValue, delay]);

  return (
    <div
      className="flex flex-col justify-between p-6 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md"
      style={{
        backgroundColor: color,
        borderRadius: '8px',
        border: color === '#ffffff' ? '1px solid #000000' : 'none',
        height: '160px',
        width: '100%',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-athletics)',
          fontSize: 'clamp(32px, 3vw, 48px)',
          fontWeight: 500,
          letterSpacing: '0.04em',
          lineHeight: 1,
          color: '#000000',
        }}
      >
        {count.toLocaleString()}{suffix}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-athletics)',
          fontSize: '12px',
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
          color: '#000000',
          opacity: 0.9,
          lineHeight: 1.2,
        }}
      >
        {label}
      </div>
    </div>
  );
};

export const Home: React.FC = () => {
  const { setCurrentPage } = useWebsite();

  return (
    <div className="flex-1 w-full bg-paper-white min-h-screen">
      {/* ── Professional Hero Section ── */}
      <section className="py-12 lg:py-16">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Left Side (7 cols) — Headline, Subtitle, CTAs */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <FadeIn delay={0.1} direction="up">
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 mb-6"
                  style={{ backgroundColor: '#eaf9f2', borderRadius: '100px', border: '1px solid #44d991' }}
                >
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#44d991' }} />
                  <span
                    style={{
                      fontFamily: 'var(--font-athletics)',
                      fontSize: '12px',
                      letterSpacing: '0.04em',
                      color: '#000000',
                      textTransform: 'uppercase'
                    }}
                  >
                    Melbourne's Premium Roofing Specialists
                  </span>
                </div>

                <h1
                  className="text-ink-black mb-6"
                  style={{
                    fontFamily: 'var(--font-athletics)',
                    fontSize: 'clamp(38px, 4.5vw, 68px)',
                    fontWeight: 500,
                    lineHeight: 1.05,
                    letterSpacing: '0.03em',
                    textTransform: 'uppercase',
                  }}
                >
                  PROTECT YOUR MOST VALUABLE ASSET.
                </h1>

                <p
                  className="text-ink-black mb-8 max-w-xl"
                  style={{
                    fontFamily: 'var(--font-manrope)',
                    fontSize: '18px',
                    lineHeight: 1.5,
                    letterSpacing: '0.01em',
                    color: '#444444',
                  }}
                >
                  Expert roof replacements, restorations, and emergency repairs across Melbourne. Backed by a 10-year workmanship guarantee and 15+ years of trusted excellence.
                </p>

                <div className="flex flex-wrap gap-4 mb-10">
                  <button
                    onClick={() => setCurrentPage('contact')}
                    className="btn-pill py-3.5 px-7 text-sm"
                  >
                    Get a Free Quote
                  </button>
                  <button
                    onClick={() => setCurrentPage('services')}
                    className="btn-pill-ghost py-3.5 px-7 text-sm"
                  >
                    Explore Services
                  </button>
                </div>

                {/* Customer Trust Gallery Preview */}
                <div className="pt-6 border-t border-slate-200 flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {GALLERY_PROJECTS.slice(0, 4).map((p, idx) => (
                      <div
                        key={idx}
                        className="w-11 h-11 rounded-full border-2 border-white overflow-hidden shadow-sm shrink-0"
                      >
                        <img src={p.imageUrl} alt="Roof work" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="flex text-amber-500 text-sm font-bold">★★★★★</div>
                    <div
                      style={{
                        fontFamily: 'var(--font-manrope)',
                        fontSize: '13px',
                        color: '#000000',
                        fontWeight: 500
                      }}
                    >
                      Over 500+ Verified Roof Projects Completed
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Right Side (5 cols) — Photorealistic 3D Hip Roof Model (Framing OFF by default) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <FadeIn delay={0.2} direction="left">
                {/* 3D Hip Roof Construction Model */}
                <HipRoof3D className="w-full h-[460px] lg:h-[500px]" />
              </FadeIn>
            </div>

          </div>
        </div>
      </section>

      {/* ── Equal Size Animated Stat Blocks ("Project completed years experience") ── */}
      <section className="py-12 bg-slate-50 border-y border-slate-200">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between mb-8">
            <h2
              style={{
                fontFamily: 'var(--font-athletics)',
                fontSize: '22px',
                fontWeight: 500,
                color: '#000000',
                letterSpacing: '0.04em',
                textTransform: 'uppercase'
              }}
            >
              PROJECT COMPLETED & YEARS EXPERIENCE
            </h2>
            <button
              onClick={() => setCurrentPage('about')}
              className="flex items-center gap-2 hover:opacity-75 transition-opacity"
              style={{
                fontFamily: 'var(--font-athletics)',
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                color: '#000000',
              }}
            >
              <span className="w-2 h-2 rounded-full bg-ink-black inline-block" />
              LEARN MORE
            </button>
          </div>

          {/* Equal Sized Animated Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {STAT_ITEMS.map((stat, i) => (
              <FadeIn key={i} delay={i * 0.1} direction="up">
                <AnimatedStatCard
                  targetValue={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  color={stat.color}
                  delay={i * 0.15}
                />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services Preview — Real Roof Images ── */}
      <section className="py-16" style={{ backgroundColor: '#eaf9f2' }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between mb-10">
            <h2
              style={{
                fontFamily: 'var(--font-athletics)',
                fontSize: '22px',
                fontWeight: 500,
                color: '#000000',
                letterSpacing: '0.04em',
                textTransform: 'uppercase'
              }}
            >
              OUR SPECIALIZED SERVICES
            </h2>
            <button
              onClick={() => setCurrentPage('services')}
              className="flex items-center gap-2 hover:opacity-75 transition-opacity"
              style={{
                fontFamily: 'var(--font-athletics)',
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                color: '#000000',
              }}
            >
              <span className="w-2 h-2 rounded-full bg-ink-black inline-block" />
              VIEW ALL SERVICES
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SERVICES.slice(0, 3).map((service, i) => (
              <FadeIn delay={i * 0.12} direction="up" key={i}>
                <div
                  className="flex flex-col h-full cursor-pointer group hover:-translate-y-1 transition-all duration-300"
                  style={{ borderRadius: '8px', backgroundColor: '#ffffff', padding: '16px', border: '1px solid #eaf9f2' }}
                  onClick={() => setCurrentPage('services')}
                >
                  {/* Real Photo Header */}
                  <div
                    className="w-full aspect-[16/10] mb-4 overflow-hidden"
                    style={{ borderRadius: '6px' }}
                  >
                    <img
                      src={service.imageUrl}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <span
                    style={{
                      fontFamily: 'var(--font-athletics)',
                      fontSize: '11px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      color: '#44d991',
                      marginBottom: '6px',
                    }}
                  >
                    SERVICE OFFERING
                  </span>

                  <h3
                    className="mb-2 font-semibold"
                    style={{
                      fontFamily: 'var(--font-manrope)',
                      fontSize: '18px',
                      color: '#000000',
                      letterSpacing: '0.01em',
                      lineHeight: 1.3,
                    }}
                  >
                    {service.title}
                  </h3>
                  <p
                    className="mb-6 flex-1 text-slate-600"
                    style={{
                      fontFamily: 'var(--font-manrope)',
                      fontSize: '14px',
                      letterSpacing: '0.01em',
                      lineHeight: 1.4,
                    }}
                  >
                    {service.description}
                  </p>
                  <button className="btn-pill self-start text-xs py-2.5 px-5">
                    Learn More
                  </button>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Photo Gallery Grid (Real User Images) ── */}
      <section className="py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between mb-10">
            <h2
              style={{
                fontFamily: 'var(--font-athletics)',
                fontSize: '22px',
                fontWeight: 500,
                color: '#000000',
                letterSpacing: '0.04em',
                textTransform: 'uppercase'
              }}
            >
              FEATURED COMPLETED PROJECTS
            </h2>
            <button
              onClick={() => setCurrentPage('gallery')}
              className="flex items-center gap-2 hover:opacity-75 transition-opacity"
              style={{
                fontFamily: 'var(--font-athletics)',
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                color: '#000000',
              }}
            >
              <span className="w-2 h-2 rounded-full bg-ink-black inline-block" />
              EXPLORE FULL GALLERY
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {GALLERY_PROJECTS.slice(0, 8).map((proj, idx) => (
              <FadeIn key={proj.id} delay={idx * 0.08} direction="up">
                <div
                  className="group relative h-64 rounded-lg overflow-hidden cursor-pointer shadow-sm"
                  onClick={() => setCurrentPage('gallery')}
                >
                  <img
                    src={proj.imageUrl}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 flex flex-col justify-end">
                    <div
                      className="text-xs text-cooperative-green font-bold uppercase tracking-wider"
                      style={{ fontFamily: 'var(--font-athletics)' }}
                    >
                      {proj.category}
                    </div>
                    <div className="text-white font-semibold text-sm truncate">{proj.title}</div>
                    <div className="text-slate-300 text-xs">{proj.location}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
