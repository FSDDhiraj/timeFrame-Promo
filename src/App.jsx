import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown, ArrowRight, ArrowUpRight, CalendarDays, Check, Command, Focus, Menu, Play, X, BarChart3, Layers3, Download as DownloadIcon, Zap } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useGSAP } from '@gsap/react';
import Lenis from '@studio-freight/lenis';
import anime from 'animejs/lib/anime.es.js';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);

const A = '/assets/';

const features = [
  {
    number: '01', name: 'FOCUS', kicker: 'ONE THING. FULL ATTENTION.',
    title: <>Make room for<br /><em>deep work.</em></>,
    copy: 'Step into a quieter space. Start a focus session, keep the task in view, and give one thing your full attention.',
    points: ['A dedicated focus space', 'Time-block based sessions', 'Fullscreen-ready interface'],
    image: `${A}focus.jpg`, imageAlt: 'TimeFrame focus screen', accent: 'cyan'
  },
  {
    number: '02', name: 'PLAN', kicker: 'GIVE YOUR DAY A SHAPE.',
    title: <>Make a plan.<br /><em>Keep your pace.</em></>,
    copy: 'Turn an open-ended to-do list into clear blocks of time. Know what comes next before the day starts pulling you around.',
    points: ['Visual daily timeline', 'Set a start and end for each block', 'See schedule conflicts at a glance'],
    image: `${A}plan.jpg`, imageAlt: 'TimeFrame plan timeline', accent: 'orange'
  },
  {
    number: '03', name: 'REFLECT', kicker: 'NOTICE WHERE TIME GOES.',
    title: <>See the day.<br /><em>Learn from it.</em></>,
    copy: 'Your calendar keeps a record of the work behind you. Review completed blocks, focus time, and the rhythm of your days.',
    points: ['A log for each day', 'Focus and break records', 'Progress you can learn from'],
    image: `${A}calendar.jpg`, imageAlt: 'TimeFrame calendar log', accent: 'blue'
  }
];

function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, wheelMultiplier: 0.9, touchMultiplier: 1.25 });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(tick); lenis.destroy(); };
  }, []);
}

function Loader() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    if (sessionStorage.getItem('tf-loaded')) { setShow(false); return; }
    const tl = gsap.timeline({ onComplete: () => { setShow(false); sessionStorage.setItem('tf-loaded', '1'); } });
    tl.fromTo('.loader-mark', { scale: .45, rotate: -18, opacity: 0, filter: 'blur(16px)' }, { scale: 1, rotate: 0, opacity: 1, filter: 'blur(0px)', duration: .9, ease: 'expo.out' })
      .fromTo('.loader-line span', { scaleX: 0 }, { scaleX: 1, transformOrigin: 'left', duration: .72, ease: 'power3.inOut' }, '-=.18')
      .to('.loader-inner', { y: -24, opacity: 0, duration: .42, ease: 'power2.in' }, '+=.18')
      .to('.loader-screen', { yPercent: -100, duration: .9, ease: 'power4.inOut' }, '-=.04');
    return () => tl.kill();
  }, []);
  if (!show) return null;
  return <div className="loader-screen">
    <div className="loader-inner">
      <img className="loader-mark" src={`${A}timeframe-mark.png`} />
    <div className="loader-word">TIME<span>FRAME</span></div>
      <div className="loader-tag">MAKE TIME INTENTIONAL</div>
      <div className="loader-line"><span /></div></div></div>;
}

function Header({ onPlay }) {
  const [open, setOpen] = useState(false);
  const links = [['The product', '#product'], ['Features', '#features'], ['Your day', '#rhythm']];
  return <header className="site-header">
    <a href="#top" className="brand" aria-label="TimeFrame home">
      <img src={`${A}timeframe-mark.png`} alt="" />
      <span>TIME<span>FRAME</span>
      <small>MAKE TIME INTENTIONAL</small></span>
    </a>
    <nav className="desktop-nav">{links.map(([label, href]) => <a key={label} href={href}>{label}</a>)}</nav>
    <div className="header-actions"><button className="watch-link" onClick={onPlay}><Play size={13} fill="currentColor" /> Watch overview</button><a className="button button-hot header-cta" href="#download">Get TimeFrame <ArrowUpRight size={16} /></a></div>
    <button className="menu-toggle" aria-label="Toggle navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    <AnimatePresence>{open && <motion.nav className="mobile-nav" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>{links.map(([label, href]) => <a key={label} href={href} onClick={() => setOpen(false)}>{label}<ArrowUpRight size={16} /></a>)}<a href="#download" onClick={() => setOpen(false)}>Get TimeFrame <ArrowUpRight size={16} /></a></motion.nav>}</AnimatePresence>
  </header>;
}

function AppWindow({ image, alt, className = '', label = 'TIMEFRAME / DESKTOP' }) {
  return <div className={`app-window ${className}`}>
    <div className="window-chrome"><div className="window-label"><span className="window-dot" />{label}</div><div className="window-controls"><i /><i /><i /></div></div>
    <img src={image} alt={alt} loading="lazy" />
    <div className="window-glare" />
  </div>;
}

function Hero() {
  const heroRef = useRef(null);
  useGSAP(() => {
    const intro = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: .08 });
    intro.from('.hero-kicker', { y: 24, opacity: 0, duration: .7 })
      .from('.hero-title .line', { yPercent: 115, rotate: 2, opacity: 0, stagger: .13, duration: 1.05, ease: 'expo.out' }, '-=.34')
      .from('.hero-copy, .hero-actions, .hero-meta', { y: 20, opacity: 0, stagger: .12, duration: .7 }, '-=.48')
      .from('.hero-product', { y: 100, rotateX: 14, rotateZ: -4, opacity: 0, scale: .9, duration: 1.35, ease: 'expo.out' }, '-=.9')
      .from('.hero-float', { y: 20, opacity: 0, stagger: .12, duration: .7 }, '-=.55');
    gsap.to('.hero-product', { y: -24, rotateZ: 1.2, scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 1 } });
    const orbit = anime({ targets: '.hero-orbit', rotate: '1turn', duration: 24000, easing: 'linear', loop: true });
    const pulse = anime({ targets: '.hero-core', scale: [1, 1.08], opacity: [.68, 1], duration: 2400, direction: 'alternate', easing: 'easeInOutSine', loop: true });
    return () => { orbit.pause(); pulse.pause(); intro.kill(); };
  }, { scope: heroRef });

  return <section className="hero" id="top" ref={heroRef}>
    <div className="hero-noise" /><div className="hero-grid" />
    <div className="hero-ambient hero-ambient-a" /><div className="hero-ambient hero-ambient-b" />
    <div className="hero-orbit orbit-a"><span /><span /><span /></div><div className="hero-orbit orbit-b"><span /><span /></div><div className="hero-core" />
    <div className="hero-content">
      <div className="hero-kicker"><span className="kicker-line" /> A DESKTOP SPACE FOR INTENTIONAL WORK <span className="kicker-index">01 — 04</span></div>
      <h1 className="hero-title"><span className="line">MAKE TIME</span><span className="line title-accent">INTENTIONAL<span className="title-period">.</span></span></h1>
      <p className="hero-copy">Plan your day. Protect your focus.<br /><strong>Make the hours count.</strong></p>
      <div className="hero-actions"><a href="#download" className="button button-primary"><DownloadIcon size={17} /> Download for Windows <ArrowUpRight size={16} /></a><button className="button button-ghost" onClick={() => document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' })}><span className="play-circle"><Play size={11} fill="currentColor" /></span> Explore the experience</button></div>
      <div className="hero-meta"><span><Focus size={14} /> Deep focus</span><i /><span><CalendarDays size={14} /> Daily planning</span><i /><span><BarChart3 size={14} /> Time insights</span></div>
    </div>
    <div className="hero-visual">
      <div className="hero-orbit-label label-top">INTENTION / 001</div><div className="hero-orbit-label label-bottom">YOUR DAY, IN VIEW</div>
      <div className="hero-product-wrap"><AppWindow image={`${A}dashboard.jpg`} alt="Actual TimeFrame dashboard showing today's planned work and progress" className="hero-product" label="TIMEFRAME / TODAY" /></div>
      <div className="hero-float float-focus"><span className="float-icon"><Zap size={15} /></span><div><b>FOCUS MODE</b><small>One thing at a time</small></div><span className="float-live" /></div>
      <div className="hero-float float-time"><span className="float-number">01</span><div><b>PLAN YOUR TIME</b><small>Give every block a purpose</small></div></div>
      <div className="hero-caption"><span>FIG. 01</span> YOUR DAY, WITH INTENTION</div>
    </div>
    <a className="scroll-cue" href="#manifesto"><span>SCROLL TO EXPLORE</span><ArrowDown size={15} /></a>
  </section>;
}

function Marquee() {
  return <div className="marquee" aria-hidden="true"><div className="marquee-track">{Array.from({ length: 2 }).map((_, i) => <div className="marquee-group" key={i}><span>LESS DISTRACTION</span><b>✳</b><span>MORE INTENTION</span><b>✳</b><span>BETTER DAYS</span><b>✳</b><span>TIME WELL SPENT</span><b>✳</b></div>)}</div></div>;
}

function Manifesto() {
  const ref = useRef(null);
  useGSAP(() => {
    gsap.from('.manifesto-label, .manifesto-text, .manifesto-side', { y: 35, opacity: 0, stagger: .13, duration: .95, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 72%' } });
    gsap.from('.manifesto-rule', { scaleX: 0, transformOrigin: 'left', duration: 1.3, ease: 'expo.inOut', scrollTrigger: { trigger: ref.current, start: 'top 75%' } });
  }, { scope: ref });
  return <section className="manifesto section-pad" id="manifesto" ref={ref}>
    <div className="manifesto-top"><span className="eyebrow manifesto-label">A DIFFERENT WAY TO WORK</span><span className="mono-small">TIME IS NOT A RESOURCE TO WASTE.</span></div>
    <div className="manifesto-grid"><h2 className="manifesto-text">Your day shouldn't<br />happen <em>to you.</em><br /><span>Make it yours.</span></h2><div className="manifesto-side"><div className="asterisk">✳</div><p>TimeFrame brings your plan, focus sessions, and daily records into one calm desktop space — so you can spend less time figuring out what to do, and more time doing it.</p><a href="#product" className="text-link">MEET YOUR NEW WORKFLOW <ArrowUpRight size={15} /></a></div></div>
    <div className="manifesto-rule" />
    <div className="manifesto-bottom"><span>01 / A MORE INTENTIONAL DAY</span><span>BUILT FOR WINDOWS DESKTOP <span className="status-dot" /></span></div>
  </section>;
}

function HorizontalFeatures() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      const panels = gsap.utils.toArray('.feature-panel');
      const totalTravel = () => trackRef.current.scrollWidth - window.innerWidth;
      const horizontalTween = gsap.to(trackRef.current, {
        x: () => -totalTravel(), ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: () => `+=${totalTravel() + window.innerHeight * .18}`, scrub: 1, pin: true, anticipatePin: 1, invalidateOnRefresh: true }
      });
      panels.forEach((panel) => {
        const copy = panel.querySelector('.feature-copy');
        const visual = panel.querySelector('.feature-visual');
        if (copy) gsap.from(copy.children, { y: 38, opacity: 0, stagger: .1, duration: .75, ease: 'power3.out', scrollTrigger: { trigger: panel, containerAnimation: horizontalTween, start: 'left 68%', end: 'right 45%', toggleActions: 'play none none reverse' } });
        if (visual) gsap.from(visual, { y: 70, rotateY: -8, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: panel, containerAnimation: horizontalTween, start: 'left 60%', end: 'right 45%', toggleActions: 'play none none reverse' } });
      });
    });
    mm.add('(max-width: 899px), (prefers-reduced-motion: reduce)', () => {
      gsap.utils.toArray('.feature-panel').forEach((panel) => gsap.from(panel, { y: 45, opacity: 0, duration: .8, ease: 'power3.out', scrollTrigger: { trigger: panel, start: 'top 82%' } }));
    });
    return () => mm.revert();
  }, { scope: sectionRef });

  return <section className="feature-stage" id="features" ref={sectionRef}>
    <div className="feature-track" ref={trackRef}>
      <div className="feature-intro feature-panel">
        <div className="feature-intro-orbit" /><span className="eyebrow">THE TIMEFRAME METHOD</span><h2>Three moves.<br /><em>A better day.</em></h2><p>Less drift. More direction. A little more ownership of your time.</p><div className="feature-steps"><span className="step-active">01</span><i /><span>02</span><i /><span>03</span></div><span className="feature-intro-foot">SCROLL TO MOVE THROUGH THE STORY <ArrowRight size={14} /></span>
      </div>
      {features.map((feature) => <article className={`feature-panel feature-panel-${feature.accent}`} key={feature.number}>
        <div className="feature-copy"><span className="feature-number">{feature.number} <i /> {feature.name}</span><span className="eyebrow">{feature.kicker}</span><h2>{feature.title}</h2><p>{feature.copy}</p><ul>{feature.points.map((point) => <li key={point}><Check size={14} />{point}</li>)}</ul><span className="feature-foot">TIMEFRAME / {feature.name} <ArrowUpRight size={14} /></span></div>
        <div className="feature-visual"><div className="feature-visual-glow" /><AppWindow image={feature.image} alt={feature.imageAlt} label={`TIMEFRAME / ${feature.name}`} className="feature-screenshot" /><div className="visual-index">{feature.number}<small> / 03</small></div></div>
      </article>)}
    </div>
    <div className="feature-progress"><div className="feature-progress-fill" /><span>THE WORKFLOW</span><span>01 — 03</span></div>
  </section>;
}

function Rhythm() {
  const ref = useRef(null);
  useGSAP(() => {
    gsap.from('.rhythm-heading > *, .rhythm-detail > *', { y: 30, opacity: 0, stagger: .1, duration: .8, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 68%' } });
    gsap.from('.rhythm-bar', { scaleY: 0, transformOrigin: 'bottom', stagger: .07, duration: .8, ease: 'back.out(1.4)', scrollTrigger: { trigger: ref.current, start: 'top 70%' } });
    gsap.from('.rhythm-stat', { y: 28, opacity: 0, stagger: .1, duration: .7, scrollTrigger: { trigger: '.rhythm-stats', start: 'top 85%' } });
  }, { scope: ref });
  return <section className="rhythm section-pad" id="rhythm" ref={ref}>
    <div className="rhythm-heading"><span className="eyebrow">A DAY, WITH A LITTLE MORE SHAPE</span><h2>Turn intention<br />into <em>momentum.</em></h2><p>Small blocks of focused effort add up. TimeFrame gives you a place to plan them, protect them, and learn from them.</p><a className="text-link" href="#download">MAKE YOUR NEXT DAY COUNT <ArrowUpRight size={15} /></a></div>
    <div className="rhythm-detail"><div className="rhythm-card-top"><span>YOUR DAILY RHYTHM</span><span className="mono-small">A SAMPLE VIEW</span></div><div className="rhythm-chart"><div className="chart-grid"><i /><i /><i /><i /></div><div className="chart-bars">{[34,58,43,78,56,89,48,67,38,74,54,92,44,68,52,82].map((v,i)=><div className="rhythm-bar" key={i} style={{'--bar-height': `${v}%`, '--bar-delay': `${i*.04}s`}}><span /></div>)}</div><div className="chart-labels"><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span></div></div><div className="rhythm-stats"><div className="rhythm-stat"><span>01</span><b>Plan your blocks</b><small>Give the day a direction.</small></div><div className="rhythm-stat"><span>02</span><b>Protect your focus</b><small>Show up for one task.</small></div><div className="rhythm-stat"><span>03</span><b>Review your rhythm</b><small>Notice what is working.</small></div></div></div>
  </section>;
}

function ProductStrip({ onPlay }) {
  const ref = useRef(null);
  useGSAP(() => {
    gsap.from('.strip-image', { scale: .88, y: 70, opacity: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: ref.current, start: 'top 72%' } });
    gsap.from('.strip-copy > *', { y: 30, opacity: 0, stagger: .1, duration: .75, scrollTrigger: { trigger: ref.current, start: 'top 70%' } });
  }, { scope: ref });
  return <section className="product-strip section-pad" id="product" ref={ref}>
    <div className="strip-top"><span className="eyebrow">BUILT AROUND YOUR REAL WORKFLOW</span><span className="mono-small">A CLOSER LOOK / 002</span></div>
    <div className="strip-layout"><div className="strip-copy"><h2>Everything you need.<br /><em>Nothing in your way.</em></h2><p>TimeFrame keeps the essentials close: today's priorities, your planned blocks, your focus space, and a calendar that remembers the work.</p><div className="strip-tags"><span><Layers3 size={14} /> One connected workspace</span><span><Command size={14} /> Desktop-first</span></div><button className="text-link button-link" onClick={onPlay}>WATCH THE APP IN MOTION <Play size={13} fill="currentColor" /></button></div><div className="strip-image"><div className="strip-image-backdrop" /><AppWindow image={`${A}dashboard.jpg`} alt="TimeFrame desktop dashboard" label="TIMEFRAME / THE DESKTOP APP" /><div className="strip-image-label"><span>THE CONTROL ROOM</span><span>01 — TODAY</span></div></div></div>
  </section>;
}

function DownloadSection({ onPlay }) {
  const ref = useRef(null);
  useGSAP(() => {
    gsap.from('.download-graphic', { scale: .65, rotate: -14, opacity: 0, duration: 1.15, ease: 'back.out(1.1)', scrollTrigger: { trigger: ref.current, start: 'top 72%' } });
    gsap.from('.download-copy > *', { y: 28, opacity: 0, stagger: .1, duration: .8, scrollTrigger: { trigger: ref.current, start: 'top 72%' } });
  }, { scope: ref });
  return <section className="download section-pad" id="download" ref={ref}>
    <div className="download-graphic">
      <div className="download-ring ring-one" />
      <div className="download-ring ring-two" />  
      <div className="download-mark"><img src={`${A}timeframe-mark.png`} alt="TimeFrame mark" />  
      </div><span className="download-orbit-label">YOUR TIME. YOUR TERMS.</span></div>
    <div className="download-copy">
      <span className="eyebrow">YOUR NEXT DAY STARTS HERE</span>
      <h2>Make time<br /><em>intentional.</em></h2>
      <p>Bring a little more purpose to the hours you already have. Start with TimeFrame for Windows.</p>
      <a
  className="button button-primary download-button"
  href="https://github.com/FSDDhiraj/TimeFrame-Desktop-App/releases/download/v2.0.0/TimeFrame_2.0.0_x64-setup.exe"
  target="_blank"
  rel="noopener noreferrer"
>
  <DownloadIcon size={17} />
  Get TimeFrame for Windows
  <ArrowUpRight size={16} />
</a>
    <button className="download-watch" onClick={onPlay}><Play size={13} fill="currentColor" /> Watch the app overview</button><span className="download-note"><Check size={13} /> Windows desktop app <i /> Make time intentional</span></div>
  </section>;
}

function Footer() {
  return <footer className="site-footer"><a href="#top" className="footer-brand"><img src={`${A}timeframe-mark.png`} alt="" /><span>TIME<span>FRAME</span><small>MAKE TIME INTENTIONAL</small></span></a><div className="footer-center">BUILT FOR DAYS THAT MATTER.</div><div className="footer-right"><a href="#top">BACK TO TOP <ArrowUpRight size={13} /></a><span>© {new Date().getFullYear()} TIMEFRAME</span></div></footer>;
}

function VideoModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', closeOnEscape);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', closeOnEscape); document.body.style.overflow = ''; };
  }, [open, onClose]);
  return <AnimatePresence>{open && <motion.div className="video-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(e) => e.target === e.currentTarget && onClose()}><motion.div className="video-modal" initial={{ y: 30, scale: .96 }} animate={{ y: 0, scale: 1 }} exit={{ y: 20, scale: .97 }}><div className="video-modal-head"><span>TIMEFRAME / PRODUCT WALKTHROUGH</span><button onClick={onClose} aria-label="Close video"><X size={19} /></button></div><video src={`${A}timeframe-tour.mp4`} controls autoPlay playsInline /><p>Explore the actual TimeFrame desktop app.</p></motion.div></motion.div>}</AnimatePresence>;
}

export default function App() {
  const [videoOpen, setVideoOpen] = useState(false);
  const closeVideo = () => setVideoOpen(false);
  useSmoothScroll();
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    const t = setTimeout(refresh, 500);
    return () => { window.removeEventListener('load', refresh); clearTimeout(t); };
  }, []);
  return <>
    <Loader />
    <Header onPlay={() => setVideoOpen(true)} />
    <main><Hero /><Marquee /><Manifesto /><HorizontalFeatures /><Rhythm /><ProductStrip onPlay={() => setVideoOpen(true)} /><DownloadSection onPlay={() => setVideoOpen(true)} /></main>
    <Footer />
    <VideoModal open={videoOpen} onClose={closeVideo} />
  </>;
}
 
