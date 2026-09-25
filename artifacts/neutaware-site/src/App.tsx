import { useEffect, useState, type ReactNode } from 'react';
import { Link, Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import { ArrowRight, ChevronDown, Menu, X, Workflow, ChartNoAxesCombined, Bot, ShieldCheck, Activity, ScanLine, HeartPulse, DatabaseZap } from 'lucide-react';
import { ContactForm } from './components/ContactForm';
import './index.css';

type Item = {
  title: string;
  nav?: string;
  path: string;
  eyebrow: string;
  intro: string;
  body: string;
  features: { title: string; text: string }[];
  note?: string;
};

const solutions: Item[] = [
  {
    title: 'Dynamics 365 Finance & Operations', nav: 'Dynamics 365 F&O', path: '/solutions/dynamics-365-finance-operations',
    eyebrow: 'Microsoft Business Solutions / 01',
    intro: 'One connected view of the operations that move your business.',
    body: 'Bring finance, procurement, supply chain and core business operations into a more connected environment. We help teams shape a practical path from fragmented processes to more responsive, informed work.',
    features: [
      { title: 'Connected finance', text: 'Align financial processes, planning and operational visibility.' },
      { title: 'Supply chain clarity', text: 'Make procurement, inventory and fulfillment easier to coordinate.' },
      { title: 'Built for change', text: 'Design processes that can evolve with your organization.' },
    ],
  },
  {
    title: 'Dynamics 365 Business Central', nav: 'Dynamics 365 Business Central', path: '/solutions/dynamics-365-business-central',
    eyebrow: 'Microsoft Business Solutions / 02',
    intro: 'A clearer picture of the business, from first order to final account.',
    body: 'Connect financial management, inventory, sales, projects and purchasing in one adaptable business platform. Our approach keeps implementation grounded in how your people actually work.',
    features: [
      { title: 'Financial management', text: 'Bring everyday accounting and decision-making into closer alignment.' },
      { title: 'Operational flow', text: 'Connect inventory, purchasing and sales across teams.' },
      { title: 'Project visibility', text: 'Give delivery teams more context to plan and act.' },
    ],
  },
  {
    title: 'Dynamics 365 CRM', nav: 'Dynamic 365 CRM', path: '/solutions/dynamics-365-crm',
    eyebrow: 'Microsoft Business Solutions / 03',
    intro: 'Put the full customer relationship into focus.',
    body: 'Connect sales force automation, customer service and marketing around a more complete, 360-degree view of each customer. Build experiences that make information useful, not simply available.',
    features: [
      { title: 'Sales momentum', text: 'Support teams with connected pipeline and relationship context.' },
      { title: 'Service continuity', text: 'Help customer-facing teams respond with better information.' },
      { title: 'Relevant engagement', text: 'Bring marketing and customer insight closer together.' },
    ],
  },
  {
    title: 'Power Platform', path: '/solutions/power-platform',
    eyebrow: 'Microsoft Business Solutions / 04',
    intro: 'Turn the ideas closest to the work into tools that move it forward.',
    body: 'Use Power Apps, Power Automate, Power BI and Copilot Studio to build low-code applications, streamline workflows and make data easier to understand. We help establish the right governance as capability scales.',
    features: [
      { title: 'Apps for real work', text: 'Create practical low-code experiences around team needs.' },
      { title: 'Smarter workflows', text: 'Reduce repetitive steps with thoughtful automation.' },
      { title: 'Insight in context', text: 'Translate operational data into clearer decisions.' },
    ],
  },
  {
    title: 'Microsoft Copilot', path: '/solutions/microsoft-copilot',
    eyebrow: 'Microsoft Business Solutions / 05',
    intro: 'Make AI useful where work already happens.',
    body: 'Explore Microsoft 365 and Dynamics productivity, business process assistance and secure enterprise AI with a deliberate approach to adoption. The goal is augmentation that respects people, data and governance.',
    features: [
      { title: 'Everyday productivity', text: 'Support writing, analysis and knowledge work within familiar tools.' },
      { title: 'Process assistance', text: 'Identify business workflows where AI can reduce friction.' },
      { title: 'Responsible adoption', text: 'Ground implementation in security, oversight and human judgment.' },
    ],
  },
];

const products: Item[] = [
  {
    title: 'OTiQ', path: '/products/otiq', eyebrow: 'ISV Solutions / Operating Theatre Intelligence',
    intro: 'A more connected view of operating theatre readiness.',
    body: 'OTiQ is an AI-powered Operating Theatre Intelligence Platform concept designed around Microsoft Dynamics 365 Business Central, Azure AI, Microsoft Copilot and RFID intelligence. It is envisioned to help teams manage risk and improve patient safety through better visibility of critical theatre resources.',
    features: [
      { title: 'Procedure-specific readiness', text: 'Bring the right kits, instruments and supplies into view before procedures.' },
      { title: 'Intelligent supply planning', text: 'Support surgical supply-demand forecasting and timely expiry alerts.' },
      { title: 'Traceable workflows', text: 'Explore instrument, tray and implant tracking, pre-closure reconciliations and an OT safety command center.' },
    ],
    note: 'OTiQ is presented as a platform concept and intended capability. No clinical outcome or regulatory certification is claimed.',
  },
  {
    title: 'Umbra', path: '/products/umbra', eyebrow: 'ISV Solutions / Dark-web Intelligence',
    intro: 'Structured intelligence for authorized investigation.',
    body: 'Umbra is a dark-web intelligence platform concept for authorized law-enforcement, corporate security and investigative teams. It is designed to organize exposed breach intelligence into controlled, accountable investigative workflows.',
    features: [
      { title: 'Controlled discovery', text: 'Support verified access and managed search workflows for authorized users.' },
      { title: 'Investigative scale', text: 'Organize intelligence with controlled bulk workflows.' },
      { title: 'Deployment choice', text: 'Consider local hosting, data sovereignty and optional secure deployment.' },
    ],
    note: 'Use is intended for authorized, lawful investigations with appropriate access controls and oversight.',
  },
  {
    title: 'Animetra', path: '/products/animetra', eyebrow: 'ISV Solutions / Animal Health',
    intro: 'Turn everyday signals into more informed animal care.',
    body: 'Animetra is an intelligent animal health and performance solution informed by wearable-driven observation. It brings vital trends, movement and activity insight together to support care-team decisions at both individual and herd level.',
    features: [
      { title: 'Vital trends', text: 'Surface wearable-driven patterns that help teams see change over time.' },
      { title: 'Earlier awareness', text: 'Explore predictive risk timelines and anomaly alerts to prompt attention.' },
      { title: 'Whole-herd perspective', text: 'Bring individual signals into a broader oversight view.' },
    ],
    note: 'Animetra is presented through intended solution capabilities, not as a claim of established clinical performance.',
  },
  {
    title: 'RehabSoft', path: '/products/rehabsoft', eyebrow: 'ISV Solutions / Rehabilitation',
    intro: 'More connected care, from assessment to progress.',
    body: 'RehabSoft is a cloud-based therapy and rehabilitation management solution designed to connect the administrative and clinical work around patient care. It supports a more coherent way to manage therapy workflows and team collaboration.',
    features: [
      { title: 'Patient journey', text: 'Connect registration, assessments and care plans in a shared workflow.' },
      { title: 'Clinical documentation', text: 'Support structured notes and consistent therapy processes.' },
      { title: 'Progress visibility', text: 'Track progress and help care teams work with greater clarity.' },
    ],
    note: 'Capabilities describe the solution direction and do not imply a released product or certified clinical outcome.',
  },
];

const meta: Record<string, { title: string; description: string }> = {
  '/': { title: 'Neutaware | Intelligence. Governance. Impact.', description: 'Neutaware brings experienced global technology leadership to the AI era, helping organizations transform with intelligence, governance and measurable intent.' },
  '/microsoft-business-solutions': { title: 'Microsoft Business Solutions | Neutaware', description: 'Modernize operations with Microsoft Dynamics 365, Power Platform and Copilot, guided by experienced, human-centred delivery.' },
  '/isv-solutions': { title: 'ISV Solutions | Neutaware', description: 'Explore Neutaware solution directions across operating theatre intelligence, investigative intelligence, animal health and rehabilitation.' },
  '/about': { title: 'About Neutaware | Experience meets the AI era', description: 'Meet Neutaware: a new journey shaped by experienced leadership, intelligent transformation and human-centred delivery.' },
  '/contact': { title: 'Contact Neutaware | Start a conversation', description: 'Connect with Neutaware about Microsoft business solutions, AI-led transformation and industry-focused solution ideas.' },
};
for (const item of [...solutions, ...products]) meta[item.path] = { title: `${item.title} | Neutaware`, description: item.body };

function RouteEffects() {
  const [location] = useLocation();
  useEffect(() => {
    const details = meta[location] ?? { title: 'Page not found | Neutaware', description: 'Explore Neutaware and our approach to intelligent transformation.' };
    document.title = details.title;
    const tags = [
      ['name', 'description', details.description],
      ['property', 'og:title', details.title],
      ['property', 'og:description', details.description],
      ['name', 'twitter:title', details.title],
      ['name', 'twitter:description', details.description],
    ];
    for (const [attribute, key, content] of tags) {
      let tag = document.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attribute, key);
        document.head.appendChild(tag);
      }
      tag.content = content;
    }
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function Header() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [desktopOpen, setDesktopOpen] = useState<string | null>(null);
  useEffect(() => { setMobileOpen(false); setExpanded(null); setDesktopOpen(null); }, [location]);
  const groups = [
    { label: 'Microsoft Business Solutions', path: '/microsoft-business-solutions', children: solutions },
    { label: 'ISV Solutions', path: '/isv-solutions', children: products },
  ];
  return <header className="site-header">
    <div className="container nav-inner">
      <Link href="/" className="brand" aria-label="Neutaware home" data-testid="link-brand"><img src={`${import.meta.env.BASE_URL}neutaware-logo.png`} alt="Neutaware — Intelligence. Governance. Impact." /></Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        <div className="nav-item"><Link href="/" className={`nav-link ${location === '/' ? 'active' : ''}`} data-testid="link-home">Home</Link></div>
        {groups.map(group => <div className={`nav-item ${desktopOpen === group.label ? 'open' : ''}`} key={group.path}>
          <Link href={group.path} className={`nav-link ${location === group.path || group.children.some(c => c.path === location) ? 'active' : ''}`} data-testid={`link-nav-${group.path.slice(1)}`}>{group.label}</Link>
          <button className="nav-link nav-trigger" type="button" aria-label={`Show ${group.label} menu`} aria-expanded={desktopOpen === group.label} onClick={() => setDesktopOpen(desktopOpen === group.label ? null : group.label)} data-testid={`button-menu-${group.path.slice(1)}`}><ChevronDown size={14}/></button>
          <div className="dropdown"><div className="dropdown-label">Explore {group.label}</div>{group.children.map(child => <Link key={child.path} href={child.path} data-testid={`link-dropdown-${child.path.split('/').pop()}`}><span>{child.nav ?? child.title}</span><ArrowRight size={13}/></Link>)}</div>
        </div>)}
        <div className="nav-item"><Link href="/about" className={`nav-link ${location === '/about' ? 'active' : ''}`} data-testid="link-about">About</Link></div>
        <div className="nav-item"><Link href="/contact" className={`nav-link ${location === '/contact' ? 'active' : ''}`} data-testid="link-contact">Contact</Link></div>
      </nav>
      <Link href="/contact" className="header-cta" data-testid="link-header-conversation">Let's talk <ArrowRight size={15}/></Link>
      <button className="mobile-toggle" type="button" aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={mobileOpen} aria-controls="mobile-navigation" onClick={() => setMobileOpen(!mobileOpen)} data-testid="button-mobile-navigation">{mobileOpen ? <X size={23}/> : <Menu size={23}/>}</button>
    </div>
    <nav id="mobile-navigation" className="mobile-menu" aria-label="Mobile navigation" hidden={!mobileOpen} onClick={(event) => { if ((event.target as HTMLElement).closest('a')) setMobileOpen(false); }}>
      <Link href="/" data-testid="link-mobile-home">Home</Link>
      {groups.map(group => <div key={group.path}>
        <div className="mobile-parent"><Link href={group.path} data-testid={`link-mobile-${group.path.slice(1)}`}>{group.label}</Link><button type="button" aria-expanded={expanded === group.label} aria-label={`Toggle ${group.label} submenu`} onClick={() => setExpanded(expanded === group.label ? null : group.label)} data-testid={`button-mobile-${group.path.slice(1)}`}><ChevronDown size={18}/></button></div>
        {expanded === group.label && <div className="mobile-sub">{group.children.map(child => <Link href={child.path} key={child.path} data-testid={`link-mobile-${child.path.split('/').pop()}`}>{child.nav ?? child.title}</Link>)}</div>}
      </div>)}
      <Link href="/about" data-testid="link-mobile-about">About</Link>
      <Link href="/contact" data-testid="link-mobile-contact">Contact</Link>
    </nav>
  </header>;
}

function Footer() {
  return <footer className="site-footer"><div className="container">
    <div className="footer-top">
      <div><Link href="/" className="footer-brand" data-testid="link-footer-brand"><img src={`${import.meta.env.BASE_URL}neutaware-logo.png`} alt="Neutaware" /></Link><p className="footer-about">A new chapter in intelligent transformation, grounded in experienced leadership and built for what's next.</p></div>
      <div className="footer-col"><h4>Explore</h4><Link href="/" data-testid="link-footer-home">Home</Link><Link href="/about" data-testid="link-footer-about">About</Link><Link href="/contact" data-testid="link-footer-contact">Contact</Link><a href="mailto:info@neutaware.com">info@neutaware.com</a></div>
      <div className="footer-col"><h4>Microsoft solutions</h4><Link href="/microsoft-business-solutions" data-testid="link-footer-microsoft-overview">Overview</Link>{solutions.map(s => <Link key={s.path} href={s.path} data-testid={`link-footer-${s.path.split('/').pop()}`}>{s.nav ?? s.title}</Link>)}</div>
      <div className="footer-col"><h4>ISV solutions</h4><Link href="/isv-solutions" data-testid="link-footer-isv-overview">Overview</Link>{products.map(p => <Link key={p.path} href={p.path} data-testid={`link-footer-${p.path.split('/').pop()}`}>{p.title}</Link>)}</div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Neutaware. All rights reserved.</span><span>Intelligence. Governance. Impact.</span><span>neutaware.com</span></div>
  </div></footer>;
}

function ArrowLink({ href, children, dark = false }: { href: string; children: ReactNode; dark?: boolean }) {
  return <Link href={href} className={`section-action ${dark ? 'dark-action' : ''}`} data-testid={`link-action-${href.split('/').pop() || 'home'}`}>{children}<ArrowRight size={17}/></Link>;
}

function Cta() {
  return <section className="cta-section"><div className="container cta-layout"><div><div className="eyebrow text-blue">The next conversation</div><h2>Transformation starts with a better question.</h2></div><Link href="/contact" className="btn btn-blue" data-testid="link-cta-contact">Start a conversation <ArrowRight size={18}/></Link></div></section>;
}

function Home() {
  const capabilities = [
    { icon: Bot, title: 'Multimodal agents', text: 'AI that can work across different forms of information.' },
    { icon: DatabaseZap, title: 'Data transformation', text: 'Make data more usable, connected and decision-ready.' },
    { icon: Workflow, title: 'Application modernization', text: 'Rethink software with AI-led possibilities in mind.' },
    { icon: ChartNoAxesCombined, title: 'Intelligent analytics', text: 'Turn complex signals into useful perspective.' },
  ];
  const productIcons = [ScanLine, ShieldCheck, Activity, HeartPulse];
  return <>
    <section className="hero"><div className="container hero-inner">
      <div className="hero-copy"><div className="eyebrow hero-kicker">A new era, experienced hands</div><h1>Intelligence for<br/>what <em>comes next.</em></h1><p>We bring decades of global technology delivery leadership into a new journey: helping organizations move forward with AI, modern platforms and human judgment.</p><div className="button-row"><Link href="/microsoft-business-solutions" className="btn btn-primary" data-testid="link-hero-solutions">Explore our solutions <ArrowRight size={18}/></Link><Link href="/about" className="btn btn-outline" data-testid="link-hero-about">Get to know us <ArrowRight size={18}/></Link></div></div>
      <div className="hero-art" aria-hidden="true"><div className="orbital"><div className="orbit one"/><div className="orbit two"/><div className="orbit three"/><div className="orbit-core"><span>N</span></div><div className="orbit-point a"/><div className="orbit-point b"/><div className="orbit-point c"/></div><span className="art-caption a">Intelligence / in motion</span><span className="art-caption b">Built for what's next</span></div>
      <div className="hero-bottom"><span>Neutaware / Intelligence. Governance. Impact.</span><span>Scroll to explore ↓</span></div>
    </div></section>
    <div className="intro-strip"><div className="container intro-grid"><div className="intro-cell"><span className="mini">01 / Our foundation</span><p>Leadership shaped by 20 years of global IT delivery experience, including Fortune 500 work through Octaware.</p></div><div className="intro-cell"><span className="mini">02 / Our focus</span><p>AI-led transformation that connects ambition with practical execution.</p></div><div className="intro-cell"><span className="mini">03 / Our conviction</span><p>Technology creates lasting value when people and governance come first.</p></div></div></div>
    <section className="section"><div className="container"><div className="eyebrow text-blue">Microsoft Business Solutions</div><div className="section-head"><h2 className="section-title">Modern platforms.<br/><span className="text-blue">Meaningful progress.</span></h2><p className="section-lead">Connect the moving parts of your business with Microsoft technologies, guided by a team that understands the complexity behind change.</p></div><div className="solution-list">{solutions.map((item, i) => <Link href={item.path} className="solution-row" key={item.path} data-testid={`link-home-${item.path.split('/').pop()}`}><span className="num">0{i + 1}</span><h3>{item.nav ?? item.title}</h3><p>{item.intro}</p><span className="row-arrow"><ArrowRight size={17}/></span></Link>)}</div><ArrowLink href="/microsoft-business-solutions">Explore Microsoft solutions</ArrowLink></div></section>
    <section className="section dark-band"><div className="container split"><div><div className="eyebrow">AI-led transformation</div><h2 className="section-title">The future isn't a feature.<br/><span className="text-cyan">It's a way of thinking.</span></h2><p className="section-lead">From multimodal agents to modernized applications, we explore where AI can make work clearer and more effective. Always with responsible implementation, thoughtful oversight and real human needs at the center.</p><ArrowLink href="/contact" dark>Talk about your AI priorities</ArrowLink></div><div className="capability-grid">{capabilities.map(({ icon: Icon, title, text }) => <div className="capability" key={title}><Icon size={25} strokeWidth={1.5}/><div><strong>{title}</strong><small>{text}</small></div></div>)}</div></div></section>
    <section className="section products-section"><div className="container"><div className="eyebrow text-blue">ISV Solutions</div><div className="section-head"><h2 className="section-title">Ideas with a<br/><span className="text-blue">specific purpose.</span></h2><p className="section-lead">Focused solution directions for complex, high-stakes environments. Each begins with a sharper understanding of the work.</p></div><div className="product-grid">{products.map((p, i) => { const Icon = productIcons[i]; return <Link href={p.path} className="product-card" key={p.path} data-testid={`link-home-product-${p.title.toLowerCase()}`}><div className="product-icon"><Icon size={26} strokeWidth={1.6}/></div><span className="index">0{i + 1} / ISV SOLUTION</span><h3>{p.title}</h3><p>{p.intro}</p><span className="card-link">Explore solution <ArrowRight size={16}/></span></Link>; })}</div><ArrowLink href="/isv-solutions">See all ISV solutions</ArrowLink></div></section>
    <section className="people-section"><div className="people-image"><img src={`${import.meta.env.BASE_URL}neutaware-collaboration.jpg`} alt="Technology professionals working together around a table" loading="lazy"/></div><div className="people-content"><div className="eyebrow text-blue">The human part of transformation</div><h2>Technology moves forward. People make it matter.</h2><p>We believe the strongest transformation happens when experienced delivery, curious thinking and the people closest to the work come together.</p><ArrowLink href="/about">Get to know Neutaware</ArrowLink></div></section>
    <section className="manifesto"><div className="container manifesto-grid"><div><div className="eyebrow text-blue">The Neutaware perspective</div><h2>Progress needs more than possibility.</h2></div><div className="manifesto-content"><div className="manifesto-line"><strong>Intelligence</strong><p>We look past the noise to find where technology can solve a genuine problem.</p></div><div className="manifesto-line"><strong>Governance</strong><p>Trust, security and accountability belong in the design, not the fine print.</p></div><div className="manifesto-line"><strong>Impact</strong><p>We focus on work that creates durable value for organizations and the people they serve.</p></div><ArrowLink href="/about">Discover our approach</ArrowLink></div></div></section>
    <Cta/>
  </>;
}

function PageHero({ eyebrow, title, description, parent }: { eyebrow: string; title: string; description: string; parent?: { label: string; path: string } }) {
  return <section className="page-hero"><div className="container"><div className="breadcrumb"><Link href="/" data-testid="link-breadcrumb-home">Home</Link><span>/</span>{parent && <><Link href={parent.path} data-testid="link-breadcrumb-parent">{parent.label}</Link><span>/</span></>}<span>{title}</span></div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{description}</p></div></section>;
}

function Overview({ kind }: { kind: 'microsoft' | 'isv' }) {
  const isMicrosoft = kind === 'microsoft';
  const list = isMicrosoft ? solutions : products;
  const title = isMicrosoft ? 'Microsoft Business Solutions' : 'ISV Solutions';
  return <>
    <PageHero eyebrow={isMicrosoft ? 'Modernize with purpose' : 'Focused innovation'} title={title} description={isMicrosoft ? 'Technology is most powerful when it works with your business, not around it. Explore connected Microsoft platforms for the work ahead.' : 'Purpose-built thinking for complex domains. Explore solution concepts and directions informed by real operational challenges.'}/>
    <section className="page-content"><div className="container"><div className="two-column-intro"><h2>{isMicrosoft ? 'Make change work across your organization.' : 'Explore what focused intelligence can make possible.'}</h2><p>{isMicrosoft ? 'Dynamics 365, Power Platform and Copilot offer a connected foundation for modern operations. We bring delivery experience and an AI-ready perspective to the decisions that matter: where to start, what to connect and how to make change stick.' : 'From healthcare operations and rehabilitation to investigative intelligence and animal health, our ISV directions are designed around the people who need better information at the right moment.'}</p></div><div className="solution-list">{list.map((item, i) => <Link href={item.path} className="solution-row" key={item.path} data-testid={`link-overview-${item.path.split('/').pop()}`}><span className="num">0{i + 1}</span><h3>{item.nav ?? item.title}</h3><p>{item.intro}</p><span className="row-arrow"><ArrowRight size={17}/></span></Link>)}</div>{!isMicrosoft && <p className="detail-note">These pages describe solution concepts and intended capabilities. They are not claims of commercial release, certification or proven outcomes.</p>}</div></section><Cta/>
  </>;
}

function Detail({ item, category, next }: { item: Item; category: 'microsoft' | 'isv'; next: Item }) {
  const parent = category === 'microsoft' ? { label: 'Microsoft Business Solutions', path: '/microsoft-business-solutions' } : { label: 'ISV Solutions', path: '/isv-solutions' };
  return <>
    <PageHero eyebrow={item.eyebrow} title={item.title} description={item.intro} parent={parent}/>
    <section className="page-content"><div className="container"><div className="two-column-intro"><div><div className="eyebrow text-blue">The opportunity</div><h2>Better systems.<br/>Better decisions.</h2></div><p>{item.body}</p></div><div className="eyebrow text-blue" style={{ marginBottom: 25 }}>Where it makes a difference</div><div className="feature-layout">{item.features.map((feature, i) => <div className="feature-card" key={feature.title}><span>0{i + 1} / CAPABILITY</span><h3>{feature.title}</h3><p>{feature.text}</p></div>)}</div>{item.note && <p className="detail-note">{item.note}</p>}<div className="detail-next"><span>Continue exploring</span><Link href={next.path} data-testid="link-next-solution">{next.nav ?? next.title}<ArrowRight size={24}/></Link></div></div></section><Cta/>
  </>;
}

function About() {
  return <>
    <PageHero eyebrow="About Neutaware" title="A new journey, grounded in experience." description="Leadership experience meets the AI era. We exist to help organizations make intelligent change with clarity, care and conviction."/>
    <section className="page-content"><div className="container"><p className="about-quote">“The point isn't to put AI everywhere. It's to put <em>better thinking</em> behind what we build, how we deliver and whom it serves.”</p><div className="two-column-intro"><h2>Experienced leadership.<br/>A fresh perspective.</h2><p>Neutaware is a new company shaped by an executive team with 20 years of experience leading global IT software delivery, including Fortune 500 engagements through Octaware. We carry that depth of experience forward without standing still: combining delivery discipline with the possibilities of the AI era.</p></div><div className="eyebrow text-blue">Our values</div><div className="principles"><div className="principle"><span>01 / THINK CLEARLY</span><h3>Intelligence</h3><p>We use technology and insight to understand the real problem before choosing the answer.</p></div><div className="principle"><span>02 / ACT RESPONSIBLY</span><h3>Governance</h3><p>We build trust through considered decisions, security, transparency and human oversight.</p></div><div className="principle"><span>03 / MAKE IT MATTER</span><h3>Impact</h3><p>We measure our work by its usefulness and its long-term value to people and organizations.</p></div></div><div className="csr-panel"><div><div className="eyebrow text-blue">Responsibility is foundational</div><h2>Progress should include more people.</h2></div><div><p>Corporate social responsibility is not an adjacent initiative for us; it is a way to evaluate the choices we make. Responsible AI means asking who benefits, who might be left out and how systems remain accountable.</p><p>We believe in digital inclusion, strengthening skills and communities, protecting access and dignity, and seeking sustainable long-term benefit. Human-centred delivery is not only how we work with clients. It is how we think about the wider world our work enters.</p></div></div></div></section><Cta/>
  </>;
}

function Contact() {
  return <>
    <PageHero eyebrow="Contact Neutaware" title="Let's talk about what matters next." description="The most useful conversations start with a real challenge. Tell us what you're navigating, exploring or trying to change."/>
    <section className="page-content"><div className="container contact-panel"><div><div className="eyebrow text-blue">Start with a conversation</div><h2>Good questions lead to better work.</h2><p>Whether you're rethinking core operations, exploring enterprise AI or interested in one of our solution directions, we welcome meaningful enquiries.</p><p>Share what you're working on, and we'll take the conversation from there.</p><a className="btn btn-blue contact-email-button" href="mailto:info@neutaware.com" data-testid="link-contact-email">Email us <ArrowRight size={18}/></a></div><aside className="contact-aside"><div className="eyebrow text-blue">Get in touch</div><h3>Find the right starting point.</h3><div className="contact-details"><div><span>Email</span><a href="mailto:info@neutaware.com">info@neutaware.com</a></div><div><span>Office</span><address>New No. 6, Old No. 69,<br/>Thygarayanagar, Chennai,<br/>Tamil Nadu, India 600017</address></div></div><p>Interested in Microsoft business transformation, responsible enterprise AI or one of our ISV solutions? We'd be glad to hear from you.</p></aside><ContactForm/></div></section>
  </>;
}

function NotFound() {
  return <div className="not-found"><div className="container"><div className="eyebrow text-blue">404 / Page not found</div><h1>Looks like this path<br/>goes somewhere else.</h1><p className="section-lead">The page you're looking for isn't here. Let's get you back to the beginning.</p><Link href="/" className="btn btn-blue" data-testid="link-not-found-home">Return home <ArrowRight size={18}/></Link></div></div>;
}

function Routes() {
  return <div className="site-shell"><RouteEffects/><Header/><main id="main-content"><Switch>
    <Route path="/" component={Home}/>
    <Route path="/microsoft-business-solutions">{() => <Overview kind="microsoft"/>}</Route>
    <Route path="/isv-solutions">{() => <Overview kind="isv"/>}</Route>
    {solutions.map((item, i) => <Route key={item.path} path={item.path}>{() => <Detail item={item} category="microsoft" next={solutions[(i + 1) % solutions.length]}/>}</Route>)}
    {products.map((item, i) => <Route key={item.path} path={item.path}>{() => <Detail item={item} category="isv" next={products[(i + 1) % products.length]}/>}</Route>)}
    <Route path="/about" component={About}/>
    <Route path="/contact" component={Contact}/>
    <Route component={NotFound}/>
  </Switch></main><Footer/></div>;
}

function App() {
  return <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Routes/></WouterRouter>;
}

export default App;