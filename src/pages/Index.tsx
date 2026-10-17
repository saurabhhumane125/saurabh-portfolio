import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowDown, ArrowUpRight, Download, Github, Linkedin, Menu, X, Fingerprint, Code2, Mail, Copy, Check } from 'lucide-react';
import CursorGlitter from '@/components/CursorGlitter';
import ProjectGallery, { getProjectScreenshots } from '@/components/ProjectGallery';
import './portfolio.css';

const projects = [
  { name: 'Trove', linkedin: 'https://lnkd.in/p/dgCYHapt', screenshots: getProjectScreenshots('Trove'), category: 'PRODUCT ENGINEERING', date: 'JUNE 2026', tagline: 'A secure home for the documents that matter.', detail: 'A family document vault with biometric authentication, encrypted offline caching, expiry tracking, and secure upload and retrieval APIs.', stack: ['Flutter', 'Dart', 'Node.js', 'Fastify', 'PostgreSQL', 'Cloudflare R2'], notes: ['Backend APIs handle document upload, retrieval, metadata updates, and persistence.', 'Biometric authentication and encrypted offline caching support secure access.', 'Expiry tracking and push notifications support document lifecycle workflows.', 'Production fixes covered navigation, synchronization, and metadata persistence.'] },
  { name: 'Tradox', linkedin: 'https://lnkd.in/p/dCusQdjz', screenshots: getProjectScreenshots('Tradox'), category: 'MACHINE LEARNING', date: 'MAY 2026 · ONGOING', tagline: 'Turning market signals into model predictions.', detail: 'A modular stock prediction pipeline combining feature engineering, ensemble inference, market indicators, and sentiment signals, with model versioning and ONNX deployment.', stack: ['Python', 'FastAPI', 'PyTorch', 'LightGBM', 'ONNX', 'SQLite', 'WebSocket'], notes: ['Feature engineering and model training form a modular prediction pipeline.', 'Ensemble inference combines model outputs, market indicators, and sentiment signals.', 'Model versioning and ONNX deployment support training and inference workflows.', 'Automated performance monitoring is part of the ongoing platform work.'] },
];
const skills = [ ['Languages & web', 'Python · C · HTML5 / CSS3 · React.js · Next.js'], ['Data & databases', 'MySQL · MongoDB · PostgreSQL · Firebase Firestore'], ['Tools · foundational', 'Git · Docker · Jenkins · VS Code · IntelliJ IDEA · Cursor'] ];
const nav = ['Work', 'About', 'Skills', 'Contact'];
const Tags = ({ items }: { items: string[] }) => <div className="stack-tags">{items.map(item => <span key={item}>{item}</span>)}</div>;

export default function Index() {
  const [menu, setMenu] = useState(false);
  const [status, setStatus] = useState('idle');
  const [activeSection, setActiveSection] = useState('');
  const [copied, setCopied] = useState(false);
  const scrollProgress = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const visible = new Map<string, boolean>();
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => visible.set(entry.target.id, entry.isIntersecting));
      const candidates = nav.map(label => document.getElementById(label.toLowerCase()))
        .filter((element): element is HTMLElement => !!element && !!visible.get(element.id));
      candidates.sort((a, b) => Math.abs(a.getBoundingClientRect().top) - Math.abs(b.getBoundingClientRect().top));
      if (candidates[0]) setActiveSection(candidates[0].id);
    }, { rootMargin: '-15% 0px -55% 0px' });
    nav.forEach(label => {
      const element = document.getElementById(label.toLowerCase());
      if (element) observer.observe(element);
    });
    const update = () => {
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollProgress.current) scrollProgress.current.style.transform = `scaleX(${distance > 0 ? Math.min(1, window.scrollY / distance) : 0})`;
      if (window.scrollY < 100) setActiveSection('');
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => { observer.disconnect(); window.removeEventListener('scroll', update); };
  }, []);

  async function copyEmail() {
    try { await navigator.clipboard.writeText('saurabhhumane125@gmail.com'); setCopied(true); }
    catch { setCopied(false); }
  }

  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    const body = Object.fromEntries(['name', 'email', 'message'].map(key => [key, String(values.get(key) || '').trim()]));
    if (Object.values(body).some(value => !value)) { setStatus('invalid'); return; }
    setStatus('sending');
    try {
      const { supabase } = await import('@/integrations/supabase/client');
      const { error } = await supabase.functions.invoke('send-contact-email', { body });
      if (error) throw error;
      setStatus('success'); form.reset();
    } catch { setStatus('error'); }
  }
  return <div className="portfolio-shell"><CursorGlitter /><div className="scroll-progress" ref={scrollProgress} aria-hidden="true" />
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header"><a href="#home" className="wordmark" aria-label="Saurabh Humane home">sh<i /></a><nav id="main-navigation" className={`main-nav ${menu ? 'is-open' : ''}`} aria-label="Main navigation">{nav.map(label => <a key={label} aria-current={activeSection === label.toLowerCase() ? 'location' : undefined} href={`#${label.toLowerCase()}`} onClick={() => setMenu(false)}>{label}</a>)}</nav><a className="header-resume" href="/resume.pdf" target="_blank" rel="noopener noreferrer">Resume <ArrowUpRight size={15} /></a><button className="menu-toggle" aria-label={menu ? 'Close navigation' : 'Open navigation'} aria-expanded={menu} aria-controls="main-navigation" onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button></header>
    <main id="main"><section className="hero-section" id="home"><div className="hero-topline"><span><i /> COMPUTER ENGINEERING · AI / ML</span><span>MUMBAI, INDIA ↗</span></div><div className="hero-layout"><div className="hero-copy"><p className="eyebrow">SAURABH HUMANE / DEVELOPER</p><h1>Engineering<br />ideas into<br /><em>impact.</em></h1><p className="hero-description">Computer Engineering student building secure applications and machine learning systems. From backend architecture to the last interaction.</p><div className="hero-actions"><a className="primary-link" href="#work">Explore my work <ArrowDown size={16} /></a><a className="text-link" href="/resume.pdf" target="_blank" rel="noopener noreferrer">My resume <Download size={16} /></a></div></div><figure className="profile-portrait"><img src="/images/portrait-black.png" alt="Saurabh Humane in a black T-shirt" fetchPriority="high" /><figcaption><span>SAURABH HUMANE</span><span>SOFTWARE / AI / ML</span></figcaption></figure></div><div className="hero-bottom"><span>SOFTWARE. SYSTEMS. INTELLIGENCE.</span><a href="#work">SCROLL TO DISCOVER <ArrowDown size={14} /></a></div></section>
    <div className="discipline-strip"><span>SOFTWARE ENGINEERING</span><i>✳</i><span>MACHINE LEARNING</span><i>✳</i><span>BACKEND SYSTEMS</span></div>
    <section className="content-section" id="work"><div className="section-heading"><div><p className="eyebrow">01 / SELECTED WORK</p><h2>Ideas, made <em>real.</em></h2></div><p>From secure everyday tools<br />to experiments in intelligence.</p></div>{projects.map((project, index) => <article className={`project-row project-${index}`} key={project.name}>{project.screenshots.length > 0 ? <ProjectGallery project={project.name} images={project.screenshots} /> : (<div className="project-visual"><div className="mock-topbar"><strong>{project.name.toLowerCase()} ↗</strong><span>CONCEPT PREVIEW</span></div>{index === 0 ? <div className="vault-demo"><Fingerprint size={55} strokeWidth={1} /><h3>Your family.<br />Your documents.<br /><span>Your peace of mind.</span></h3><div className="document-preview">▤ &nbsp; Family documents <span>✓</span></div><p>SECURE BY DESIGN <span>●</span></p></div> : <div className="market-demo"><p>SIGNAL → INTELLIGENCE</p><h3>Finding patterns.<br /><span>Building predictions.</span></h3><svg viewBox="0 0 400 125" role="img" aria-label="Illustrative market signal chart"><path className="chart-grid" d="M0 25H400 M0 65H400 M0 105H400"/><path className="chart-line" d="M0 110L24 99L43 107L67 71L90 86L114 65L139 81L165 48L190 60L215 29L237 49L262 39L290 53L315 20L345 33L372 8L400 18"/></svg><p>ENSEMBLE INFERENCE <span>ONNX</span></p></div>}</div>)}<div className="project-copy"><p className="eyebrow">0{index + 1} / {project.category}</p><h3>{project.name}</h3><h4>{project.tagline}</h4><p>{project.detail}</p><Tags items={project.stack} /><a className="project-linkedin text-link" href={project.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`Read about ${project.name} on LinkedIn`}><Linkedin size={16} /> View project on LinkedIn <ArrowUpRight size={15} /></a><p className="project-date">{project.date}</p><details className="project-notes"><summary>Engineering details <ArrowUpRight size={15} /></summary><ul>{project.notes.map(note => <li key={note}>{note}</li>)}</ul></details></div></article>)}<a className="text-link" href="https://github.com/saurabhhumane125" target="_blank" rel="noopener noreferrer"><Github size={17} /> More experiments on GitHub <ArrowUpRight size={16} /></a></section>
    <section className="content-section" id="about"><div className="section-heading"><div><p className="eyebrow">02 / ENGINEERING MINDSET</p><h2>Curiosity is<br />my <em>constant.</em></h2></div><p>Computer Engineering student.<br />Developer. ML researcher.</p></div><div className="about-layout"><div className="about-intro"><p>I’m studying Computer Engineering at Pillai College of Engineering, University of Mumbai. My work spans secure mobile applications, backend APIs, and machine learning pipelines. I care about reliable systems, clear interfaces, and understanding how things work beneath the surface.</p><div className="education-card"><p className="eyebrow">2023 — PRESENT</p><h3>B.Tech · Computer Engineering</h3><p>Pillai College of Engineering<br />University of Mumbai</p><div><strong>8.31</strong> CGPA</div></div></div><div className="experience-panel"><p className="eyebrow">RESEARCH EXPERIENCE / JAN — MAR 2026</p><h3>Research Intern</h3><h4>Suvidha Foundation · Remote</h4><p className="research-description">Compared BART, PEGASUS, and LED for Indian English news summarization through literature review, experimentation, and reproducible research documentation.</p><Tags items={['Python', 'BART', 'PEGASUS', 'LED', 'ROUGE', 'LaTeX']} /><div className="research-note"><Code2 size={16} /><span>Experimentation. Evaluation. Reproducibility.</span></div></div></div><div className="skills-heading" id="skills"><p className="eyebrow">03 / TECHNICAL TOOLKIT</p><h3>Tools for the <em>task.</em></h3></div><div className="skills-grid">{skills.map(([title, detail]) => <div key={title}><p className="eyebrow">{title}</p><p>{detail}</p></div>)}</div><div className="certifications"><p className="eyebrow">CONTINUING TO LEARN</p><div><p>Google DeepMind: Train A Small Language Model <span>Google Skills · APR 2026</span></p><p>Transformer Models and BERT Model <span>Google Skills · APR 2026</span></p></div></div></section>
    <section className="content-section contact-section" id="contact"><div className="contact-copy"><p className="eyebrow">04 / NEXT CHAPTER</p><h2>Have something<br />in <em>mind?</em></h2><p>A project, an opportunity, or a good conversation.<br />Let’s see what we can build together.</p><a className="email-link" href="mailto:saurabhhumane125@gmail.com">saurabhhumane125@gmail.com <ArrowUpRight size={18} /></a><button className="copy-email" type="button" onClick={copyEmail}>{copied ? <Check size={14} /> : <Copy size={14} />}<span role="status">{copied ? 'Email copied' : 'Copy email address'}</span></button><div className="social-links"><a href="https://github.com/saurabhhumane125" target="_blank" rel="noopener noreferrer"><Github size={17} /> GitHub</a><a href="https://www.linkedin.com/in/saurabh-humane-77171a31b/" target="_blank" rel="noopener noreferrer"><Linkedin size={17} /> LinkedIn</a></div></div><form onSubmit={send} className="contact-form"><label htmlFor="name">Your name</label><input id="name" name="name" autoComplete="name" required maxLength={100} placeholder="What should I call you?" disabled={status === 'sending'} /><label htmlFor="email">Email address</label><input id="email" name="email" type="email" autoComplete="email" required maxLength={255} placeholder="you@example.com" disabled={status === 'sending'} /><label htmlFor="message">What are you thinking?</label><textarea id="message" name="message" required maxLength={1000} rows={3} placeholder="Tell me a little about it…" disabled={status === 'sending'} /><button className="primary-link" disabled={status === 'sending'} type="submit">{status === 'sending' ? 'Sending…' : 'Send message'} <ArrowUpRight size={17} /></button><p className="form-status" role="status">{status === 'success' ? 'Message sent. Thanks for reaching out!' : status === 'error' ? 'Could not send. Please use the email address alongside.' : status === 'invalid' ? 'Please complete all fields.' : ''}</p></form></section></main>
    <footer className="site-footer"><a className="wordmark" href="#home" aria-label="Back to home">sh<i /></a><span>© {new Date().getFullYear()} Saurabh Humane</span><a href="#home">BACK TO TOP <ArrowUpRight size={14} /></a></footer><nav className="mobile-dock" aria-label="Mobile quick navigation">{nav.map((label, index) => { const Icon = [Code2, Fingerprint, Code2, Mail][index]; return <a key={label} aria-current={activeSection === label.toLowerCase() ? 'location' : undefined} href={`#${label.toLowerCase()}`}><Icon size={18} />{label}</a>; })}</nav>
  </div>;
}
