"use client"

import { useState, useEffect, useRef, ReactNode } from "react"




function useInView(threshold: number = 0.15): [React.RefObject<HTMLDivElement | null>, boolean] {
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

const SERVICES: Service[] = [
  {
    icon: "⬡",
    title: "Business Software",
    desc: "Tailored platforms that automate workflows, eliminate bottlenecks and give your team back hours every day.",
  },
  {
    icon: "◫",
    title: "Web Applications",
    desc: "Scalable, secure browser-based software built to handle real-world load and grow with your user base.",
  },
  {
    icon: "⊟",
    title: "Enterprise Software",
    desc: "Mission-critical systems for large organisations — robust architecture, SSO, audit trails and compliance built in.",
  },
  {
    icon: "↺",
    title: "Automation Tools",
    desc: "Custom automation pipelines that eliminate repetitive manual work and reduce operational overhead.",
  },
  {
    icon: "⇌",
    title: "API Development",
    desc: "Clean, documented REST and GraphQL APIs that connect your systems and unlock third-party integrations.",
  },
  {
    icon: "◎",
    title: "Software Maintenance",
    desc: "Proactive monitoring, performance tuning, security patches and feature iteration — long after launch.",
  },
]

const STEPS: Step[] = [
  {
    num: "01",
    label: "Planning",
    desc: "We map your requirements, constraints and goals to define a precise scope before a single line is written.",
  },
  {
    num: "02",
    label: "Design",
    desc: "System architecture, data models and API contracts are agreed upon — building on solid foundations.",
  },
  {
    num: "03",
    label: "Development",
    desc: "Agile sprints with continuous delivery so you see working software early and often.",
  },
  {
    num: "04",
    label: "Testing",
    desc: "Automated test suites, security audits and performance benchmarks ensure production readiness.",
  },
]


export default function CustomSoftwarePage() {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      })
    }

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
          --blue:   #4a7cdc;
        }

        .sw-wrap { background: var(--ink); color: var(--cream); font-family: 'DM Sans', sans-serif; }

        /* ── Hero ── */
        .sw-hero {
          position: relative; min-height: 100vh;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden; background: var(--ink);
        }
        .sw-orb {
          position: absolute; border-radius: 50%; filter: blur(90px);
          pointer-events: none; transition: left .2s ease, top .2s ease;
        }
        .sw-orb-a { width: 600px; height: 600px; background: radial-gradient(circle, rgba(74,124,220,.20) 0%, transparent 70%); }
        .sw-orb-b { width: 500px; height: 500px; background: radial-gradient(circle, rgba(201,168,76,.14) 0%, transparent 70%); }

        .sw-grid-bg {
          position: absolute; inset: 0; opacity: .045;
          background-image: linear-gradient(var(--cream) 1px, transparent 1px),
                            linear-gradient(90deg, var(--cream) 1px, transparent 1px);
          background-size: 80px 80px;
        }

        /* diagonal code lines decoration */
        .sw-code-deco {
          position: absolute; right: 6%; top: 50%; transform: translateY(-50%);
          display: flex; flex-direction: column; gap: .55rem;
          opacity: .1; pointer-events: none; user-select: none;
          font-family: 'Courier New', monospace; font-size: .72rem; color: var(--blue);
          white-space: nowrap;
        }

        .sw-hero-content { position: relative; z-index: 1; text-align: center; max-width: 820px; padding: 0 2rem; }

        .eyebrow {
          display: inline-flex; align-items: center; gap: .6rem;
          font-size: .7rem; letter-spacing: .2em; text-transform: uppercase;
          color: var(--gold); margin-bottom: 2rem;
          border: 1px solid rgba(201,168,76,.3); padding: .4rem 1rem; border-radius: 999px;
          animation: swFadeDown .8s ease forwards;
        }
        .eyebrow::before,.eyebrow::after { content:''; width:18px; height:1px; background:var(--gold); }

        .sw-h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3.2rem, 8vw, 6.8rem);
          font-weight: 300; line-height: 1.05; letter-spacing: -.02em; color: var(--cream);
          animation: swFadeUp .9s .2s ease both;
        }
        .sw-h1 em { font-style: italic; color: var(--gold2); }

        .sw-sub {
          margin: 1.8rem auto 2.8rem; max-width: 500px;
          font-size: 1.05rem; line-height: 1.7; color: var(--muted); font-weight: 300;
          animation: swFadeUp .9s .4s ease both;
        }
        .sw-hero-actions { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; animation: swFadeUp .9s .6s ease both; }

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
          animation: swPulse 2.5s infinite;
        }
        .scroll-hint span { width: 1px; height: 44px; background: linear-gradient(to bottom, transparent, var(--gold)); }

        /* ── Marquee ── */
        .sw-marquee-wrap { background: var(--gold); overflow: hidden; padding: .7rem 0; }
        .sw-marquee-track {
          display: flex; gap: 2.5rem; white-space: nowrap;
          animation: swMarquee 24s linear infinite;
        }
        .sw-marquee-item { font-size: .72rem; letter-spacing: .18em; text-transform: uppercase; color: var(--ink); font-weight: 500; }
        .sw-marquee-dot { opacity: .4; }

        /* ── About ── */
        .sw-about {
          padding: 10rem 2rem; max-width: 1200px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1fr; gap: 8rem; align-items: center;
        }
        @media(max-width:768px){ .sw-about { grid-template-columns:1fr; gap:3rem; padding:5rem 2rem; } }

        .label-tag { font-size: .7rem; letter-spacing: .2em; text-transform: uppercase; color: var(--gold); margin-bottom: 1.2rem; display: block; }

        .section-h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.4rem, 5vw, 3.8rem); font-weight: 300;
          line-height: 1.15; color: var(--cream); margin-bottom: 1.6rem;
        }
        .section-h2 em { font-style: italic; color: var(--gold2); }
        .body-text { color: var(--muted); line-height: 1.8; font-weight: 300; margin-bottom: 1rem; }

        .stat-row { display: flex; gap: 3rem; margin-top: 2.8rem; flex-wrap: wrap; }
        .stat-num { font-family: 'Cormorant Garamond', serif; font-size: 2.6rem; font-weight: 600; color: var(--gold2); }
        .stat-label { font-size: .75rem; letter-spacing: .12em; text-transform: uppercase; color: var(--muted); margin-top: .2rem; }

        /* code window visual */
        .code-window {
          background: var(--panel); border-radius: 8px; overflow: hidden;
          border: 1px solid var(--border); box-shadow: 0 40px 100px rgba(0,0,0,.6);
        }
        .code-titlebar {
          background: #1e212b; padding: .85rem 1.2rem;
          display: flex; align-items: center; gap: .5rem; border-bottom: 1px solid var(--border);
        }
        .dot { width: 11px; height: 11px; border-radius: 50%; }
        .dot-r { background: #ff5f56; }
        .dot-y { background: #ffbd2e; }
        .dot-g { background: #27c93f; }
        .code-filename { margin-left: .8rem; font-size: .75rem; color: var(--muted); letter-spacing: .05em; }
        .code-body { padding: 1.6rem 1.8rem; font-family: 'Courier New', monospace; font-size: .82rem; line-height: 1.8; }
        .c-kw  { color: #c792ea; }
        .c-fn  { color: #82aaff; }
        .c-str { color: #c3e88d; }
        .c-cm  { color: #546e7a; font-style: italic; }
        .c-num { color: var(--gold2); }
        .c-op  { color: #89ddff; }
        .about-badge {
          margin-top: 1.2rem; background: var(--gold); color: var(--ink);
          padding: 1rem 1.4rem; border-radius: 4px; font-size: .82rem; font-weight: 500; line-height: 1.5;
          display: inline-block;
        }
        .about-badge strong { display: block; font-family: 'Cormorant Garamond', serif; font-size: 1.7rem; font-weight: 700; }

        /* ── Services ── */
        .sw-services { background: var(--deep); padding: 10rem 2rem; }
        .sw-services-inner { max-width: 1200px; margin: 0 auto; }
        .section-header { text-align: center; margin-bottom: 5rem; }

        .sw-grid {
          display: grid; grid-template-columns: repeat(3,1fr); gap: 1.5px;
          border: 1.5px solid var(--border); background: var(--border);
        }
        @media(max-width:900px){ .sw-grid { grid-template-columns: 1fr 1fr; } }
        @media(max-width:560px){ .sw-grid { grid-template-columns: 1fr; } }

        .svc-card {
          background: var(--deep); padding: 2.8rem 2.4rem;
          position: relative; overflow: hidden; cursor: default; transition: background .3s;
        }
        .svc-card::after {
          content:''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, var(--blue), var(--gold));
          transform: scaleX(0); transform-origin: left; transition: transform .4s ease;
        }
        .svc-card:hover { background: var(--panel); }
        .svc-card:hover::after { transform: scaleX(1); }

        .svc-icon { font-size: 1.8rem; color: var(--gold); margin-bottom: 1.4rem; display: block; }
        .svc-title { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; font-weight: 600; color: var(--cream); margin-bottom: .8rem; }
        .svc-desc { color: var(--muted); font-size: .9rem; line-height: 1.7; font-weight: 300; }

        /* ── Process ── */
        .sw-process { padding: 10rem 2rem; max-width: 1200px; margin: 0 auto; }
        .steps-row { display: grid; grid-template-columns: repeat(4,1fr); gap: 2rem; margin-top: 5rem; }
        @media(max-width:800px){ .steps-row { grid-template-columns: 1fr 1fr; } }
        @media(max-width:480px){ .steps-row { grid-template-columns: 1fr; } }

        .step {
          position: relative; padding: 2.4rem 2rem;
          border: 1px solid var(--border); border-radius: 2px; transition: border-color .3s;
        }
        .step:hover { border-color: rgba(74,124,220,.4); }
        .step-num { font-family: 'Cormorant Garamond', serif; font-size: 4rem; font-weight: 700; line-height: 1; color: rgb(255, 255, 255); margin-bottom: 1rem; user-select: none; }
        .step-label { font-family: 'Cormorant Garamond', serif; font-size: 1.4rem; font-weight: 600; color: var(--cream); margin-bottom: .6rem; }
        .step-desc { font-size: .88rem; color: var(--muted); line-height: 1.7; font-weight: 300; }
        .step-line { position: absolute; top: 2.4rem; right: -1px; width: 1px; height: 40%; background: linear-gradient(to bottom, var(--blue), transparent); opacity: .4; }

        /* ── CTA ── */
        .sw-cta {
          position: relative; overflow: hidden;
          background: var(--panel); border-top: 1px solid var(--border);
          padding: 10rem 2rem; text-align: center;
        }
        .sw-cta-glow {
          position: absolute; width: 900px; height: 400px;
          background: radial-gradient(ellipse, rgba(74,124,220,.10) 0%, transparent 70%);
          left: 50%; top: 50%; transform: translate(-50%,-50%); pointer-events: none;
        }
        .sw-cta-content { position: relative; z-index: 1; max-width: 680px; margin: 0 auto; }
        .cta-h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.8rem, 6vw, 5rem); font-weight: 300;
          line-height: 1.1; color: var(--cream); margin-bottom: 1.4rem;
        }
        .cta-h2 em { font-style: italic; color: var(--gold2); }
        .cta-sub { color: var(--muted); font-size: 1.05rem; line-height: 1.7; font-weight: 300; margin-bottom: 3rem; }

        /* ── Keyframes ── */
        @keyframes swFadeUp   { from { opacity:0; transform:translateY(28px) } to { opacity:1; transform:translateY(0) } }
        @keyframes swFadeDown { from { opacity:0; transform:translateY(-16px) } to { opacity:1; transform:translateY(0) } }
        @keyframes swPulse    { 0%,100%{opacity:.4} 50%{opacity:.9} }
        @keyframes swMarquee  { from{transform:translateX(0)} to{transform:translateX(-50%)} }
      `}</style>

      <div className="sw-wrap">

        {/* ── HERO ── */}
        <section className="sw-hero">
          <div className="sw-orb sw-orb-a" style={{ left: `${orb1X}%`, top: `${orb1Y}%`, transform: "translate(-50%,-50%)" }} />
          <div className="sw-orb sw-orb-b" style={{ left: `${orb2X}%`, top: `${orb2Y}%`, transform: "translate(-50%,-50%)" }} />
          <div className="sw-grid-bg" />

          {/* decorative code lines */}
          <div className="sw-code-deco">
            {["const solution = build(requirements);", "await deploy({ env: 'production' });", "return scale({ factor: Infinity });", "// engineered for your business", "export default CustomSoftware;"].map((l, i) => (
              <div key={i} style={{ opacity: 1 - i * 0.15 }}>{l}</div>
            ))}
          </div>

          <div className="sw-hero-content">
            <div className="eyebrow">SQROCK — Software Engineering</div>
            <h1 className="sw-h1">
              Software <em>built</em><br />for your world
            </h1>
            <p className="sw-sub">
              Powerful, scalable and tailor-made solutions engineered
              precisely for your business — not adapted from someone else's.
            </p>
            <div className="sw-hero-actions">
              <button className="btn-gold">Start Your Project</button>
              <button className="btn-outline">View Our Work</button>
            </div>
          </div>

          <div className="scroll-hint">
            <span />
            Scroll
          </div>
        </section>

        {/* ── MARQUEE ── */}
        <div className="sw-marquee-wrap">
          <div className="sw-marquee-track">
            {Array(4).fill(null).flatMap((_, i) => [
              <span className="sw-marquee-item" key={`a${i}`}>Business Software</span>,
              <span className="sw-marquee-dot" key={`d1${i}`}>◆</span>,
              <span className="sw-marquee-item" key={`b${i}`}>Web Applications</span>,
              <span className="sw-marquee-dot" key={`d2${i}`}>◆</span>,
              <span className="sw-marquee-item" key={`c${i}`}>API Development</span>,
              <span className="sw-marquee-dot" key={`d3${i}`}>◆</span>,
              <span className="sw-marquee-item" key={`e${i}`}>Automation Tools</span>,
              <span className="sw-marquee-dot" key={`d4${i}`}>◆</span>,
              <span className="sw-marquee-item" key={`f${i}`}>Enterprise Solutions</span>,
              <span className="sw-marquee-dot" key={`d5${i}`}>◆</span>,
            ])}
          </div>
        </div>

        {/* ── ABOUT ── */}
        <section>
          <div className="sw-about">
            <Reveal>
              <span className="label-tag">Our Approach</span>
              <h2 className="section-h2">
                Built for<br /><em>your</em><br />business
              </h2>
              <p className="body-text">
                At SQROCK we specialise in software that solves real problems.
                Unlike off-the-shelf tools that force you to adapt your workflows,
                everything we build is shaped around how your business actually operates.
              </p>
              <p className="body-text">
                From lean automation scripts to full-scale enterprise platforms,
                we engineer for performance, security and long-term maintainability.
              </p>
              <div className="stat-row">
                <div>
                  <div className="stat-num">200+</div>
                  <div className="stat-label">Projects Shipped</div>
                </div>
                <div>
                  <div className="stat-num">99.9%</div>
                  <div className="stat-label">Uptime SLA</div>
                </div>
                <div>
                  <div className="stat-num">8yr</div>
                  <div className="stat-label">Engineering Depth</div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div className="code-window">
                <div className="code-titlebar">
                  <div className="dot dot-r" /><div className="dot dot-y" /><div className="dot dot-g" />
                  <span className="code-filename">sqrock-solution.ts</span>
                </div>
                <div className="code-body">
                  <div><span className="c-cm">// Custom solution for your business</span></div>
                  <div><span className="c-kw">interface</span> <span className="c-fn">BusinessSolution</span> {'{'}</div>
                  <div>&nbsp;&nbsp;scalable<span className="c-op">:</span> <span className="c-kw">boolean</span><span className="c-op">;</span></div>
                  <div>&nbsp;&nbsp;tailored<span className="c-op">:</span> <span className="c-kw">true</span><span className="c-op">;</span></div>
                  <div>&nbsp;&nbsp;support<span className="c-op">:</span> <span className="c-str">'24/7'</span><span className="c-op">;</span></div>
                  <div>{'}'}</div>
                  <br />
                  <div><span className="c-kw">async function</span> <span className="c-fn">build</span>(</div>
                  <div>&nbsp;&nbsp;requirements<span className="c-op">:</span> <span className="c-fn">YourNeeds</span></div>
                  <div>)<span className="c-op">:</span> <span className="c-fn">Promise</span>&lt;<span className="c-fn">BusinessSolution</span>&gt; {'{'}</div>
                  <div>&nbsp;&nbsp;<span className="c-kw">const</span> solution <span className="c-op">=</span> <span className="c-kw">await</span> <span className="c-fn">sqrock</span></div>
                  <div>&nbsp;&nbsp;&nbsp;&nbsp;.<span className="c-fn">analyse</span>(requirements)</div>
                  <div>&nbsp;&nbsp;&nbsp;&nbsp;.<span className="c-fn">design</span>()</div>
                  <div>&nbsp;&nbsp;&nbsp;&nbsp;.<span className="c-fn">ship</span>();</div>
                  <div>&nbsp;&nbsp;<span className="c-kw">return</span> solution<span className="c-op">;</span></div>
                  <div>{'}'}</div>
                </div>
              </div>
              <div className="about-badge">
                <strong>∞</strong>
                Built to scale<br />with your growth
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="sw-services">
          <div className="sw-services-inner">
            <Reveal>
              <div className="section-header">
                <span className="label-tag">What We Build</span>
                <h2 className="section-h2">Our <em>services</em></h2>
              </div>
            </Reveal>
            <div className="sw-grid">
              {SERVICES.map((s, i) => (
                <Reveal key={s.title} delay={i * 60}>
                  <div className="svc-card">
                    <span className="svc-icon">{s.icon}</span>
                    <div className="svc-title">{s.title}</div>
                    <p className="svc-desc">{s.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="sw-process">
          <Reveal>
            <div className="section-header">
              <span className="label-tag">How We Work</span>
              <h2 className="section-h2">Our development <em>process</em></h2>
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

        {/* ── CTA ── */}
        <section className="sw-cta">
          <div className="sw-cta-glow" />
          <Reveal>
            <div className="sw-cta-content">
              <h2 className="cta-h2">
                Need software that<br /><em>actually fits?</em>
              </h2>
              <p className="cta-sub">
                Let SQROCK engineer a solution built around your exact requirements —
                no compromises, no workarounds.
              </p>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
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