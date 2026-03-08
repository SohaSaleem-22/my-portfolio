import { useState, useEffect, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Mono:wght@300;400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #F7F4EF;
    --ink: #1A1714;
    --muted: #8A8278;
    --accent: #C8A96E;
    --accent-light: #E8D9BA;
    --line: rgba(26,23,20,0.1);
    --white: #FFFFFF;
  }

  html { scroll-behavior: smooth; }
  body { background: var(--bg); cursor: none; }

  .cursor {
    position: fixed; width: 8px; height: 8px;
    background: var(--accent); border-radius: 50%;
    pointer-events: none; z-index: 9999;
    transform: translate(-50%, -50%);
    transition: transform 0.1s ease;
  }
  .cursor-ring {
    position: fixed; width: 32px; height: 32px;
    border: 1px solid var(--accent); border-radius: 50%;
    pointer-events: none; z-index: 9998;
    transform: translate(-50%, -50%);
    transition: all 0.18s ease; opacity: 0.6;
  }
  .cursor-large { width: 56px !important; height: 56px !important; opacity: 0.4 !important; }
  .cursor-dot-large { transform: translate(-50%,-50%) scale(1.5) !important; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeDown {
    from { opacity: 0; transform: translateY(-16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; } to { opacity: 1; }
  }

  .anim-fadeDown-1 { opacity: 0; animation: fadeDown 0.8s ease 0.2s forwards; }
  .anim-fadeDown-2 { opacity: 0; animation: fadeDown 0.8s ease 0.4s forwards; }
  .anim-fadeUp-1   { opacity: 0; animation: fadeUp 0.9s ease 0.6s forwards; }
  .anim-fadeUp-2   { opacity: 0; animation: fadeUp 1s ease 0.8s forwards; }
  .anim-fadeUp-3   { opacity: 0; animation: fadeUp 1s ease 1s forwards; }
  .anim-fadeUp-4   { opacity: 0; animation: fadeUp 1s ease 1.2s forwards; }
  .anim-fadeIn-1   { opacity: 0; animation: fadeIn 1.2s ease 0.4s forwards; }
  .anim-fadeIn-2   { opacity: 0; animation: fadeIn 1.4s ease 1s forwards; }
  .anim-fadeIn-3   { opacity: 0; animation: fadeIn 1s ease 1.6s forwards; }

  .reveal {
    opacity: 0; transform: translateY(32px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }
  .reveal.visible { opacity: 1; transform: translateY(0); }
`;

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function Nav() {
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "28px 56px", zIndex: 100,
    }}>
      <a href="#hero" className="anim-fadeDown-1" style={{
        fontFamily: "'Cormorant Garamond', serif", fontSize: "2.1rem",
        letterSpacing: "0.05em", color: "#1A1714", textDecoration: "none",
      }}>Soha Saleem</a>
      <ul className="anim-fadeDown-2" style={{ display: "flex", gap: 36, listStyle: "none" }}>
        {["About", "Services", "Contact"].map(link => (
          <li key={link}>
            <a href={`#${link.toLowerCase()}`} style={{
              fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase",
              color: "#8A8278", textDecoration: "none",
            }}
              onMouseEnter={e => e.target.style.color = "#1A1714"}
              onMouseLeave={e => e.target.style.color = "#8A8278"}
            >{link}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Hero() {
  return (
    <section id="hero" style={{
      minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 56px 80px" }}>
        <p className="anim-fadeUp-1" style={{ fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#C8A96E", marginBottom: 24 }}>
          Web & Business Developer
        </p>
        <h1 className="anim-fadeUp-2" style={{
          fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(3.5rem,6vw,6rem)",
          fontWeight: 300, lineHeight: 0.95, letterSpacing: "-0.02em", color: "#1A1714",
        }}>
          Building<br /><em style={{ color: "#C8A96E" }}>Digital</em><br />Futures
        </h1>
        <p className="anim-fadeUp-3" style={{ marginTop: 32, fontSize: "0.72rem", lineHeight: 1.9, color: "#8A8278", maxWidth: 320 }}>
          I craft purposeful web experiences and drive business growth — blending technical precision with strategic thinking.
        </p>
        <div className="anim-fadeUp-4" style={{ marginTop: 48, display: "flex", alignItems: "center", gap: 24 }}>
          <a href="#contact" style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            background: "#1A1714", color: "#F7F4EF", padding: "14px 28px",
            fontFamily: "'DM Mono', monospace", fontSize: "0.65rem",
            letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none",
            transition: "background 0.3s, transform 0.3s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "#C8A96E"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#1A1714"; e.currentTarget.style.transform = "translateY(0)"; }}
          >Start a Project →</a>
          <a href="#about" style={{
            fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase",
            color: "#8A8278", textDecoration: "none", borderBottom: "1px solid rgba(26,23,20,0.1)", paddingBottom: 2,
          }}
            onMouseEnter={e => { e.currentTarget.style.color = "#1A1714"; e.currentTarget.style.borderColor = "#1A1714"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "#8A8278"; e.currentTarget.style.borderColor = "rgba(26,23,20,0.1)"; }}
          >Learn More</a>
        </div>
      </div>
      <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <div className="anim-fadeIn-1" style={{
          position: "absolute", inset: 0, background: "#E8D9BA",
          clipPath: "polygon(10% 0%, 100% 0%, 100% 100%, 0% 100%)",
        }} />
        <div className="anim-fadeIn-2" style={{
          position: "relative", fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(8rem,16vw,16rem)", fontWeight: 300,
          color: "rgba(200,169,110,0.18)", letterSpacing: "-0.05em", lineHeight: 1, userSelect: "none",
        }}>SS</div>
        <div className="anim-fadeIn-3" style={{
          position: "absolute", bottom: 40, right: 56, fontSize: "0.58rem",
          letterSpacing: "0.2em", textTransform: "uppercase", color: "#8A8278",
          writingMode: "vertical-rl", display: "flex", alignItems: "center", gap: 12,
        }}>
          <span style={{ display: "block", width: 1, height: 40, background: "#C8A96E" }} />
          Scroll
        </div>
      </div>
    </section>
  );
}

function About() {
  const r1 = useReveal(), r2 = useReveal();
  return (
    <section id="about" style={{
      padding: "120px 56px", display: "grid", gridTemplateColumns: "1fr 1fr",
      gap: 80, alignItems: "center", borderTop: "1px solid rgba(26,23,20,0.1)",
    }}>
      <div ref={r1} className="reveal">
        <p style={{ fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#C8A96E", marginBottom: 16 }}>About</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.4rem,4vw,3.8rem)", fontWeight: 300, lineHeight: 1.1, color: "#1A1714" }}>
          Where code <em>meets</em> strategy
        </h2>
        <div style={{ width: 48, height: 1, background: "#C8A96E", margin: "32px 0" }} />
        <p style={{ fontSize: "0.78rem", lineHeight: 2, color: "#8A8278", marginBottom: 20 }}>
          I'm Soha Saleem — a web developer and business developer who believes that great digital products aren't just well-built, they're well-thought-out. My work lives at the intersection of elegant engineering and smart business decisions.
        </p>
        <p style={{ fontSize: "0.78rem", lineHeight: 2, color: "#8A8278" }}>
          From architecting scalable web applications to identifying growth opportunities and crafting go-to-market strategies, I bring a dual perspective that bridges the technical and the commercial.
        </p>
      </div>
      <div ref={r2} className="reveal" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
        {[["10+","Projects Delivered"],["3+","Years Experience"],["7+","Happy Clients"],["2×","Disciplines Mastered"]].map(([num, label]) => (
          <StatCard key={label} num={num} label={label} />
        ))}
      </div>
    </section>
  );
}

function StatCard({ num, label }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#FFFFFF", padding: "36px 28px",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "transform 0.3s",
      }}>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", fontWeight: 300, color: "#C8A96E", lineHeight: 1 }}>{num}</div>
      <div style={{ marginTop: 8, fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#8A8278" }}>{label}</div>
    </div>
  );
}

const services = [
  { num: "01", name: "Web Development", desc: "End-to-end development of fast, accessible, and beautifully crafted websites and web applications — from concept to deployment.", tags: ["React","Next.js","Node.js","UI/UX"] },
  { num: "02", name: "Business Development", desc: "Strategic growth planning, partnership development, and market expansion — helping businesses identify opportunities and scale with intention.", tags: ["Strategy","GTM","Partnerships","Growth"] },
  { num: "03", name: "Digital Consulting", desc: "Advisory services for startups and businesses looking to modernize their digital presence and align technology choices with business goals.", tags: ["Audit","Roadmap","Tech Stack","Advisory"] },
];

function Services() {
  const r = useReveal();
  return (
    <section id="services" style={{ padding: "120px 56px", background: "#1A1714" }}>
      <p className="reveal" style={{ fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#C8A96E", marginBottom: 16, opacity: 0, animation: "none" }} ref={useReveal()}>Services</p>
      <h2 ref={r} className="reveal" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.4rem,4vw,3.8rem)", fontWeight: 300, color: "#F7F4EF", lineHeight: 1.1 }}>
        What I <em>do</em>
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2, marginTop: 60 }}>
        {services.map(s => <ServiceCard key={s.num} {...s} />)}
      </div>
    </section>
  );
}

function ServiceCard({ num, name, desc, tags }) {
  const [hovered, setHovered] = useState(false);
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)",
        padding: "48px 36px", position: "relative", overflow: "hidden",
        transition: "background 0.4s",
      }}>
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
        background: "#C8A96E",
        transform: hovered ? "scaleX(1)" : "scaleX(0)",
        transformOrigin: "left", transition: "transform 0.4s ease",
      }} />
      <div style={{ fontSize: "0.58rem", letterSpacing: "0.2em", color: "#C8A96E", marginBottom: 32 }}>{num}</div>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 300, color: "#F7F4EF", lineHeight: 1.2, marginBottom: 20 }}>{name}</div>
      <p style={{ fontSize: "0.68rem", lineHeight: 1.9, color: "rgba(247,244,239,0.45)" }}>{desc}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 28 }}>
        {tags.map(t => (
          <span key={t} style={{
            fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase",
            color: "#C8A96E", border: "1px solid rgba(200,169,110,0.3)", padding: "5px 10px",
          }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

function Contact() {
  const r1 = useReveal(), r2 = useReveal();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = async () => {
  const res = await fetch("https://formspree.io/f/xyknkggl", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });
  if (res.ok) {
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 3000);
  }
};

  return (
    <section id="contact" style={{
      padding: "120px 56px", display: "grid", gridTemplateColumns: "1fr 1fr",
      gap: 80, alignItems: "start", borderTop: "1px solid rgba(26,23,20,0.1)",
    }}>
      <div ref={r1} className="reveal">
        <p style={{ fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#C8A96E", marginBottom: 16 }}>Contact</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.4rem,4vw,3.8rem)", fontWeight: 300, lineHeight: 1.1, color: "#1A1714" }}>
          Let's <em>work</em><br />together
        </h2>
        <div style={{ width: 48, height: 1, background: "#C8A96E", margin: "32px 0" }} />
        <p style={{ fontSize: "0.75rem", lineHeight: 2, color: "#8A8278", marginBottom: 40 }}>
          Have a project in mind or want to explore how we can collaborate? I'd love to hear from you. Let's build something meaningful.
        </p>
        {[["Email","sohachudhery@gmail.com",null],["Based","Available Worldwide",null],["Status","● Open to projects","#7DBE8A"]].map(([label, val, col]) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
            <span style={{ fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C8A96E", minWidth: 60 }}>{label}</span>
            <span style={{ fontSize: "0.72rem", color: col || "#1A1714" }}>{val}</span>
          </div>
        ))}
      </div>
      <div ref={r2} className="reveal" style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {[["Your Name","text","Jane Smith","name"],["Email Address","email","jane@example.com","email"]].map(([label, type, ph, key]) => (
          <div key={key} style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#8A8278", marginBottom: 8, paddingTop: 20 }}>{label}</label>
            <input type={type} placeholder={ph} value={form[key]}
              onChange={e => setForm({ ...form, [key]: e.target.value })}
              style={{
                background: "#FFFFFF", border: "none", borderBottom: "1px solid rgba(26,23,20,0.1)",
                padding: "14px 16px", fontFamily: "'DM Mono', monospace", fontSize: "0.72rem",
                fontWeight: 300, color: "#1A1714", outline: "none",
              }}
              onFocus={e => e.target.style.borderBottomColor = "#C8A96E"}
              onBlur={e => e.target.style.borderBottomColor = "rgba(26,23,20,0.1)"}
            />
          </div>
        ))}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#8A8278", marginBottom: 8, paddingTop: 20 }}>Project Brief</label>
          <textarea rows={5} placeholder="Tell me about your project..." value={form.message}
            onChange={e => setForm({ ...form, message: e.target.value })}
            style={{
              background: "#FFFFFF", border: "none", borderBottom: "1px solid rgba(26,23,20,0.1)",
              padding: "14px 16px", fontFamily: "'DM Mono', monospace", fontSize: "0.72rem",
              fontWeight: 300, color: "#1A1714", outline: "none", resize: "none",
            }}
            onFocus={e => e.target.style.borderBottomColor = "#C8A96E"}
            onBlur={e => e.target.style.borderBottomColor = "rgba(26,23,20,0.1)"}
          />
        </div>
        <div style={{ marginTop: 32, display: "flex", alignItems: "center", gap: 16 }}>
          <button onClick={handleSubmit} style={{
            background: "#1A1714", color: "#F7F4EF", border: "none",
            padding: "16px 36px", fontFamily: "'DM Mono', monospace",
            fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase",
            cursor: "none", transition: "background 0.3s, transform 0.3s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "#C8A96E"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#1A1714"; e.currentTarget.style.transform = "translateY(0)"; }}
          >Send Message →</button>
          {sent && <span style={{ fontSize: "0.58rem", color: "#7DBE8A" }}>✓ Message sent!</span>}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid rgba(26,23,20,0.1)", padding: "32px 56px",
      display: "flex", justifyContent: "space-between", alignItems: "center",
    }}>
      <p style={{ fontSize: "0.6rem", letterSpacing: "0.12em", color: "#8A8278" }}>© 2026 Soha Saleem. All rights reserved.</p>
      <ul style={{ display: "flex", gap: 28, listStyle: "none" }}>
        {["LinkedIn","GitHub","Dribbble"].map(l => (
          <li key={l}>
            <a href="#" style={{ fontSize: "0.6rem", letterSpacing: "0.12em", color: "#8A8278", textDecoration: "none" }}
              onMouseEnter={e => e.target.style.color = "#C8A96E"}
              onMouseLeave={e => e.target.style.color = "#8A8278"}
            >{l}</a>
          </li>
        ))}
      </ul>
    </footer>
  );
}

function Cursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const mx = useRef(0), my = useRef(0), rx = useRef(0), ry = useRef(0);

  useEffect(() => {
    const move = e => {
      mx.current = e.clientX; my.current = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + "px";
        cursorRef.current.style.top = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", move);
    let raf;
    const animate = () => {
      rx.current += (mx.current - rx.current) * 0.12;
      ry.current += (my.current - ry.current) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = rx.current + "px";
        ringRef.current.style.top = ry.current + "px";
      }
      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}

export default function Portfolio() {
  return (
    <>
      <style>{styles}</style>
      <Cursor />
      <Nav />
      <Hero />
      <About />
      <Services />
      <Contact />
      <Footer />
    </>
  );
}