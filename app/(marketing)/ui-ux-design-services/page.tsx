"use client"

import { useState, useEffect, useRef, ReactNode } from "react"
import { Button } from "@/components/ui/button"

/* ── Hook ───────────────────────── */

function useInView(
  threshold: number = 0.15
): [React.RefObject<HTMLDivElement | null>, boolean] {

  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState<boolean>(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return [ref, visible]
}

/* ── Reveal Component ───────────────────────── */

interface RevealProps {
  children: ReactNode
  delay?: number
  className?: string
}

function Reveal({ children, delay = 0, className = "" }: RevealProps) {

  const [ref, visible] = useInView()

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

/* ── Types ───────────────────────── */

interface Service {
  icon: string
  title: string
  desc: string
}

interface Step {
  num: string
  label: string
  desc: string
}

/* ── Data ───────────────────────── */

const SERVICES: Service[] = [
  { icon: "◎", title: "User Research", desc: "Deep behavioural analysis and goal mapping to align every design decision with real user needs." },
  { icon: "⊞", title: "Wireframing", desc: "Low-to-high fidelity structural blueprints that de-risk decisions before a pixel is painted." },
  { icon: "✦", title: "UI Design", desc: "Pixel-perfect interfaces crafted for beauty, hierarchy, and brand expression." },
  { icon: "↺", title: "UX Optimisation", desc: "Heuristic audits, A/B testing and friction removal to lift conversions and retention." },
  { icon: "⬡", title: "Prototyping", desc: "Clickable, interactive prototypes that validate ideas and accelerate stakeholder sign-off." },
  { icon: "⊟", title: "Design Systems", desc: "Scalable token-based component libraries that keep large products coherent and fast to ship." },
]

const STEPS: Step[] = [
  { num: "01", label: "Research", desc: "Understand users, business goals and competitive landscape." },
  { num: "02", label: "Wireframes", desc: "Map architecture and interaction flows before visual design." },
  { num: "03", label: "Design", desc: "Build high-fidelity screens rooted in brand and accessibility." },
  { num: "04", label: "Testing", desc: "Validate assumptions with real users; iterate to perfection." },
]

/* ── Page ───────────────────────── */


// ── Page ──────────────────────────────────────────────────────────────────────
export default function UIUXDesignPage() {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const handle = (e:MouseEvent) =>
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight })
    window.addEventListener("mousemove", handle)
    return () => window.removeEventListener("mousemove", handle)
  }, [])

  const orb1X = 20 + mousePos.x * 10
  const orb1Y = 20 + mousePos.y * 10
  const orb2X = 70 - mousePos.x * 10
  const orb2Y = 70 - mousePos.y * 10

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --ink:    #0b0c10;
          --deep:   #12141a;
          --panel:  #181b22;
          --border: rgba(255,255,255,0.07);
          --gold:   #c9a84c;
          --gold2:  #e8c97a;
          --cream:  #f5f0e8;
          --muted:  rgba(245,240,232,0.5);
        }

        .page-wrap { background: var(--ink); color: var(--cream); font-family: 'DM Sans', sans-serif; }

        /* ── Hero ── */
        .hero {
          position: relative; min-height: 100vh; display: flex;
          align-items: center; justify-content: center; overflow: hidden;
          background: var(--ink);
        }
        .hero-orb {
          position: absolute; border-radius: 50%; filter: blur(90px);
          pointer-events: none; transition: left .2s ease, top .2s ease;
        }
        .orb-a { width: 600px; height: 600px; background: radial-gradient(circle, rgba(201,168,76,.22) 0%, transparent 70%); }
        .orb-b { width: 500px; height: 500px; background: radial-gradient(circle, rgba(100,120,255,.14) 0%, transparent 70%); }
        .hero-grid {
          position: absolute; inset: 0; opacity: .05;
          background-image: linear-gradient(var(--cream) 1px, transparent 1px),
                            linear-gradient(90deg, var(--cream) 1px, transparent 1px);
          background-size: 80px 80px;
        }
        .hero-content { position: relative; z-index: 1; text-align: center; max-width: 860px; padding: 0 2rem; }
        .eyebrow {
          display: inline-flex; align-items: center; gap: .6rem;
          font-size: .7rem; letter-spacing: .2em; text-transform: uppercase;
          color: var(--gold); margin-bottom: 2rem;
          border: 1px solid rgba(201,168,76,.3); padding: .4rem 1rem; border-radius: 999px;
          animation: fadeDown .8s ease forwards;
        }
        .eyebrow::before { content:''; width:18px; height:1px; background:var(--gold); }
        .eyebrow::after  { content:''; width:18px; height:1px; background:var(--gold); }

        .hero-h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3.2rem, 8vw, 7rem);
          font-weight: 300; line-height: 1.05; letter-spacing: -.02em;
          color: var(--cream);
          animation: fadeUp .9s .2s ease both;
        }
        .hero-h1 em { font-style: italic; color: var(--gold2); }

        .hero-sub {
          margin: 1.8rem auto 2.8rem;
          max-width: 520px; font-size: 1.05rem; line-height: 1.7;
          color: var(--muted); font-weight: 300;
          animation: fadeUp .9s .4s ease both;
        }
        .hero-actions { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; animation: fadeUp .9s .6s ease both; }

        .btn-gold {
          background: linear-gradient(135deg, var(--gold), var(--gold2));
          color: var(--ink); font-weight: 500; font-size: .95rem;
          padding: .85rem 2.2rem; border-radius: 4px; border: none;
          cursor: pointer; letter-spacing: .04em; transition: transform .2s, box-shadow .2s;
        }
        .btn-gold:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(201,168,76,.35); }

        .btn-outline {
          background: transparent; color: var(--cream); font-size: .95rem;
          padding: .85rem 2.2rem; border-radius: 4px; border: 1px solid rgba(245,240,232,.25);
          cursor: pointer; letter-spacing: .04em; transition: border-color .2s, background .2s;
        }
        .btn-outline:hover { border-color: var(--gold); background: rgba(201,168,76,.06); }

        .scroll-hint {
          position: absolute; bottom: 2.5rem; left: 50%; transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: .4rem;
          color: var(--muted); font-size: .7rem; letter-spacing: .15em; text-transform: uppercase;
          animation: pulse 2.5s infinite;
        }
        .scroll-hint span { width: 1px; height: 44px; background: linear-gradient(to bottom, transparent, var(--gold)); }

        /* ── Marquee strip ── */
        .marquee-wrap { background: var(--gold); overflow: hidden; padding: .7rem 0; }
        .marquee-track {
          display: flex; gap: 2.5rem; white-space: nowrap;
          animation: marquee 22s linear infinite;
        }
        .marquee-item { font-size: .72rem; letter-spacing: .18em; text-transform: uppercase; color: var(--ink); font-weight: 500; }
        .marquee-dot { opacity: .4; }

        /* ── About ── */
        .about-section {
          padding: 10rem 2rem; max-width: 1200px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1fr; gap: 8rem; align-items: center;
        }
        @media(max-width:768px){ .about-section { grid-template-columns:1fr; gap:3rem; padding: 5rem 2rem; } }

        .label-tag {
          font-size: .7rem; letter-spacing: .2em; text-transform: uppercase;
          color: var(--gold); margin-bottom: 1.2rem; display: block;
        }
        .section-h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.4rem, 5vw, 3.8rem); font-weight: 300;
          line-height: 1.15; color: var(--cream); margin-bottom: 1.6rem;
        }
        .section-h2 em { font-style: italic; color: var(--gold2); }
        .body-text { color: var(--muted); line-height: 1.8; font-weight: 300; margin-bottom: 1rem; }

        .stat-row { display: flex; gap: 3rem; margin-top: 2.8rem; flex-wrap: wrap; }
        .stat { }
        .stat-num { font-family: 'Cormorant Garamond', serif; font-size: 2.6rem; font-weight: 600; color: var(--gold2); }
        .stat-label { font-size: .75rem; letter-spacing: .12em; text-transform: uppercase; color: var(--muted); margin-top: .2rem; }

        .about-visual {
          position: relative; border-radius: 2px;
          background: var(--panel); aspect-ratio: 4/5; overflow: hidden;
        }
        .about-img { width: 100%; height: 100%; object-fit: cover; display: block; opacity: .85; }
        .about-accent {
          position: absolute; top: -1.5rem; right: -1.5rem;
          width: 70%; height: 70%; border: 1px solid rgba(201,168,76,.25); border-radius: 2px;
          pointer-events: none; z-index: -1;
        }
        .about-badge {
          position: absolute; bottom: 2rem; left: -2rem;
          background: var(--gold); color: var(--ink); padding: 1.2rem 1.6rem;
          border-radius: 2px; font-size: .8rem; font-weight: 500; line-height: 1.5;
          box-shadow: 0 20px 60px rgba(0,0,0,.5);
        }
        .about-badge strong { display: block; font-family: 'Cormorant Garamond', serif; font-size: 1.8rem; font-weight: 700; }

        /* ── Services ── */
        .services-section { background: var(--deep); padding: 10rem 2rem; }
        .services-inner { max-width: 1200px; margin: 0 auto; }
        .section-header { text-align: center; margin-bottom: 5rem; }

        .services-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5px;
          border: 1.5px solid var(--border); background: var(--border);
        }
        @media(max-width:900px){ .services-grid { grid-template-columns: 1fr 1fr; } }
        @media(max-width:560px){ .services-grid { grid-template-columns: 1fr; } }

        .service-card {
          background: var(--deep); padding: 2.8rem 2.4rem;
          position: relative; overflow: hidden; cursor: default;
          transition: background .3s;
        }
        .service-card::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, var(--gold), var(--gold2));
          transform: scaleX(0); transform-origin: left; transition: transform .4s ease;
        }
        .service-card:hover { background: var(--panel); }
        .service-card:hover::after { transform: scaleX(1); }

        .svc-icon { font-size: 1.8rem; color: var(--gold); margin-bottom: 1.4rem; display: block; line-height: 1; }
        .svc-title { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; font-weight: 600; color: var(--cream); margin-bottom: .8rem; }
        .svc-desc { color: var(--muted); font-size: .9rem; line-height: 1.7; font-weight: 300; }

        /* ── Process ── */
        .process-section { padding: 10rem 2rem; max-width: 1200px; margin: 0 auto; }
        .steps-row { display: grid; grid-template-columns: repeat(4,1fr); gap: 2rem; margin-top: 5rem; }
        @media(max-width:800px){ .steps-row { grid-template-columns: 1fr 1fr; } }
        @media(max-width:480px){ .steps-row { grid-template-columns: 1fr; } }

        .step {
          position: relative; padding: 2.4rem 2rem;
          border: 1px solid var(--border); border-radius: 2px;
          transition: border-color .3s;
        }
        .step:hover { border-color: rgba(201,168,76,.35); }
        .step-num {
          font-family: 'Cormorant Garamond', serif; font-size: 4rem; font-weight: 700;
          line-height: 1; color: rgba(201,168,76,.12); margin-bottom: 1rem;
          user-select: none;
        }
        .step-label { font-family: 'Cormorant Garamond', serif; font-size: 1.4rem; font-weight: 600; color: var(--cream); margin-bottom: .6rem; }
        .step-desc { font-size: .88rem; color: var(--muted); line-height: 1.7; font-weight: 300; }
        .step-line {
          position: absolute; top: 2.4rem; right: -1px; width: 1px; height: 40%;
          background: linear-gradient(to bottom, var(--gold), transparent);
          opacity: .4;
        }

        /* ── CTA ── */
        .cta-section {
          position: relative; overflow: hidden;
          background: var(--panel); border-top: 1px solid var(--border);
          padding: 10rem 2rem; text-align: center;
        }
        .cta-glow {
          position: absolute; width: 800px; height: 400px;
          background: radial-gradient(ellipse, rgba(201,168,76,.12) 0%, transparent 70%);
          left: 50%; top: 50%; transform: translate(-50%,-50%);
          pointer-events: none;
        }
        .cta-content { position: relative; z-index: 1; max-width: 680px; margin: 0 auto; }
        .cta-h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.8rem, 6vw, 5rem); font-weight: 300;
          line-height: 1.1; color: var(--cream); margin-bottom: 1.4rem;
        }
        .cta-h2 em { font-style: italic; color: var(--gold2); }
        .cta-sub { color: var(--muted); font-size: 1.05rem; line-height: 1.7; font-weight: 300; margin-bottom: 3rem; }

        /* ── Keyframes ── */
        @keyframes fadeUp   { from { opacity:0; transform:translateY(28px) } to { opacity:1; transform:translateY(0) } }
        @keyframes fadeDown { from { opacity:0; transform:translateY(-16px) } to { opacity:1; transform:translateY(0) } }
        @keyframes pulse    { 0%,100% { opacity:.4 } 50% { opacity:.9 } }
        @keyframes marquee  { from { transform:translateX(0) } to { transform:translateX(-50%) } }
      `}</style>

      <div className="page-wrap">

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="hero">
          <div className="hero-orb orb-a" style={{ left:`${orb1X}%`, top:`${orb1Y}%`, transform:"translate(-50%,-50%)" }} />
          <div className="hero-orb orb-b" style={{ left:`${orb2X}%`, top:`${orb2Y}%`, transform:"translate(-50%,-50%)" }} />
          <div className="hero-grid" />

          <div className="hero-content">
            <div className="eyebrow">SQROCK — UI/UX Design Studio</div>
            <h1 className="hero-h1">
              Design that<br /><em>moves</em> people
            </h1>
            <p className="hero-sub">
              We craft modern, intuitive digital experiences that blend
              artistic vision with conversion-focused strategy.
            </p>
            <div className="hero-actions">
              <button className="btn-gold">Start Your Project</button>
              <button className="btn-outline">View Our Work</button>
            </div>
          </div>

          <div className="scroll-hint">
            <span />
            Scroll
          </div>
        </section>

        {/* ── MARQUEE ──────────────────────────────────────────────────────── */}
        <div className="marquee-wrap">
          <div className="marquee-track">
            {Array(4).fill(null).flatMap((_, i) => [
              <span className="marquee-item" key={`a${i}`}>User Research</span>,
              <span className="marquee-dot" key={`d1${i}`}>◆</span>,
              <span className="marquee-item" key={`b${i}`}>UI Design</span>,
              <span className="marquee-dot" key={`d2${i}`}>◆</span>,
              <span className="marquee-item" key={`c${i}`}>UX Optimisation</span>,
              <span className="marquee-dot" key={`d3${i}`}>◆</span>,
              <span className="marquee-item" key={`e${i}`}>Prototyping</span>,
              <span className="marquee-dot" key={`d4${i}`}>◆</span>,
              <span className="marquee-item" key={`f${i}`}>Design Systems</span>,
              <span className="marquee-dot" key={`d5${i}`}>◆</span>,
            ])}
          </div>
        </div>

        {/* ── ABOUT ────────────────────────────────────────────────────────── */}
        <section className="about-section">
          <Reveal>
            <span className="label-tag">About Our Approach</span>
            <h2 className="section-h2">
              Seamless<br /><em>digital</em><br />experiences
            </h2>
            <p className="body-text">
              At SQROCK we build user-centred interfaces where creativity and
              usability are inseparable. Every design decision is grounded in
              research, tested against real behaviour, and refined until it
              feels inevitable.
            </p>
            <p className="body-text">
              From early-stage discovery to production-ready design systems,
              we move with precision — delivering interfaces that are both
              visually compelling and commercially effective.
            </p>
            <div className="stat-row">
              <div className="stat">
                <div className="stat-num">140+</div>
                <div className="stat-label">Projects Delivered</div>
              </div>
              <div className="stat">
                <div className="stat-num">98%</div>
                <div className="stat-label">Client Satisfaction</div>
              </div>
              <div className="stat">
                <div className="stat-num">6yr</div>
                <div className="stat-label">Studio Experience</div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="about-visual">
              <img src="/images/uiux-process.png" width={"100%"} alt="Our design process" className="about-img" />
              <div className="about-accent" />
              <div className="about-badge">
                <strong>4.9★</strong>
                Average client<br />rating
              </div>
            </div>
          </Reveal>
        </section>

        {/* ── SERVICES ─────────────────────────────────────────────────────── */}
        <section className="services-section">
          <div className="services-inner">
            <Reveal>
              <div className="section-header">
                <span className="label-tag">What We Do</span>
                <h2 className="section-h2">Our <em>services</em></h2>
              </div>
            </Reveal>

            <div className="services-grid">
              {SERVICES.map((s, i) => (
                <Reveal key={s.title} delay={i * 60}>
                  <div className="service-card">
                    <span className="svc-icon">{s.icon}</span>
                    <div className="svc-title">{s.title}</div>
                    <p className="svc-desc">{s.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ──────────────────────────────────────────────────────── */}
        <section className="process-section">
          <Reveal>
            <div className="section-header">
              <span className="label-tag">How We Work</span>
              <h2 className="section-h2">Our design <em>process</em></h2>
            </div>
          </Reveal>

          <div className="steps-row">
            {STEPS.map((s, i) => (
              <Reveal key={s.num} delay={i * 80}>
                <div className="step">
                  <div className="step-num">{s.num}</div>
                  <div className="step-label">{s.label}</div>
                  <p className="step-desc">{s.desc}</p>
                  {i < STEPS.length - 1 && <div className="step-line" />}
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section className="cta-section">
          <div className="cta-glow" />
          <Reveal>
            <div className="cta-content">
              <h2 className="cta-h2">
                Ready to build something<br /><em>extraordinary?</em>
              </h2>
              <p className="cta-sub">
                Let SQROCK design intuitive, modern interfaces that your
                users will love and your business will feel.
              </p>
              <div style={{ display:"flex", gap:"1rem", justifyContent:"center", flexWrap:"wrap" }}>
                <button className="btn-gold">Get Free Consultation</button>
                <button className="btn-outline">See Case Studies</button>
              </div>
            </div>
          </Reveal>
        </section>

      </div>
    </>
  )
}