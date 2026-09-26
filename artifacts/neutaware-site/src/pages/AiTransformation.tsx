import { Link } from 'wouter';
import {
  ArrowRight,
  AudioLines,
  BarChart3,
  Blocks,
  BrainCircuit,
  Database,
  Eye,
  MessageSquareText,
  ShieldCheck,
} from 'lucide-react';
import './ai-transformation.css';

const capabilities = [
  {
    number: '01',
    title: 'Multimodal & agentic AI',
    description: 'Give AI a clearer understanding of the work at hand. Explore agents that can interpret voice, text and visual inputs, use the right context, and assist with multi-step tasks while keeping people in control of consequential decisions.',
    detail: 'Voice / text / visual inputs · human oversight',
    icon: BrainCircuit,
  },
  {
    number: '02',
    title: 'Data transformation',
    description: 'Siloed information cannot support connected thinking. We help examine sources, improve data quality, shape integration paths and create usable data foundations so teams can work from a more coherent, decision-ready view.',
    detail: 'Discover · connect · prepare',
    icon: Database,
  },
  {
    number: '03',
    title: 'AI-assisted application modernization',
    description: 'Modernization is not a one-size-fits-all rewrite. Assess what should be retained, refactored, replaced or retired; then use AI-assisted engineering where it helps with understanding legacy code, migration planning and delivery. Architecture choices still deserve deliberate human review.',
    detail: 'Legacy assessment · APIs · cloud-native options',
    icon: Blocks,
  },
  {
    number: '04',
    title: 'Intelligent analytics',
    description: 'Move from scattered reports toward insight people can act on. Bring operational data into well-defined models, useful dashboards and exploratory analysis, with AI assistance to help users ask better questions and interpret the signals responsibly.',
    detail: 'Business context · Power BI · actionable insight',
    icon: BarChart3,
  },
];

const governance = [
  {
    number: '01 / FIND',
    title: 'Discovery & catalog',
    description: 'Use Microsoft Purview Data Map and Unified Catalog capabilities to locate data assets, describe what they contain and give teams a shared language for finding the right information.',
  },
  {
    number: '02 / UNDERSTAND',
    title: 'Classification & lineage',
    description: 'Identify sensitive information and trace how data moves between sources, transformations and reports, so the context behind an answer does not disappear.',
  },
  {
    number: '03 / PROTECT',
    title: 'Access & sensitivity',
    description: 'Consider permissions, sensitivity labels and data loss prevention policies together, aligning access to business need and the handling requirements of each data type.',
  },
  {
    number: '04 / PREPARE',
    title: 'Responsible AI readiness',
    description: 'Review data ownership, exposure and policy gaps before information is used to ground AI experiences. Establish human accountability for what AI may access, produce and recommend.',
  },
];

const steps = [
  {
    number: '01 / UNDERSTAND',
    title: 'Start with the work.',
    description: 'Map the decision, workflow or customer moment that needs to improve before selecting a model or platform.',
  },
  {
    number: '02 / DESIGN',
    title: 'Shape the foundation.',
    description: 'Examine data, architecture, integration and governance together. Define a sensible first use case and the controls it needs.',
  },
  {
    number: '03 / EVOLVE',
    title: 'Learn in the open.',
    description: 'Build with users, review how the experience behaves and refine the approach as needs and constraints become clearer.',
  },
];

function AiTransformation() {
  return (
    <div className="ait">
      <section className="ait-hero" aria-labelledby="ait-title">
        <div className="ait-wrap ait-hero-inner">
          <nav className="ait-breadcrumb" aria-label="Breadcrumb">
            <Link href="/" data-testid="link-ai-breadcrumb-home">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">AI-led transformation</span>
          </nav>
          <div className="ait-hero-copy">
            <div className="ait-label">AI-led transformation</div>
            <h1 id="ait-title">Make intelligence <span>useful.</span><br />Make change <span>work.</span></h1>
            <p className="ait-hero-lead">AI has more to offer than a new interface. Neutaware helps organizations connect data, modernize applications and design human-led AI experiences around the work that matters.</p>
            <div className="ait-hero-actions">
              <Link href="/contact" className="ait-primary-link" data-testid="link-ai-hero-contact">
                Talk through your priorities <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <a href="#ait-capabilities" className="ait-text-link" data-testid="link-ai-explore-capabilities">
                Explore capabilities <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="ait-hero-figure" aria-hidden="true">
            <div className="ait-diagram">
              <div className="ait-inputs">
                <div className="ait-signal"><AudioLines size={19} strokeWidth={1.6} /> Voice</div>
                <div className="ait-signal"><MessageSquareText size={19} strokeWidth={1.6} /> Text</div>
                <div className="ait-signal"><Eye size={19} strokeWidth={1.6} /> Visual</div>
              </div>
              <div className="ait-connector" />
              <div className="ait-core">
                <BrainCircuit size={38} strokeWidth={1.2} />
                <strong>Context<br />to action</strong>
                <small>With oversight</small>
              </div>
            </div>
            <span className="ait-diagram-caption">Signals → understanding → decisions</span>
          </div>
        </div>
      </section>

      <div className="ait-thesis">
        <div className="ait-wrap ait-thesis-inner">
          <span className="ait-label">The real opportunity</span>
          <p>Intelligence becomes valuable when information, systems and people can work together.</p>
          <aside>Not AI everywhere. The right capability, in the right workflow, with the right safeguards.</aside>
        </div>
      </div>

      <section id="ait-capabilities" className="ait-capabilities" aria-labelledby="ait-capabilities-title">
        <div className="ait-wrap">
          <div className="ait-section-heading">
            <div>
              <div className="ait-label">Where we focus</div>
              <h2 id="ait-capabilities-title">Four connected paths<br />to meaningful change.</h2>
            </div>
            <p>Each organization starts from a different place. These capabilities are designed to work together, not as isolated technology projects.</p>
          </div>
          <div className="ait-capability-list">
            {capabilities.map(({ number, title, description, detail, icon: Icon }) => (
              <article className="ait-capability-row" key={number}>
                <span className="ait-row-number">{number}</span>
                <h3>{title}</h3>
                <div className="ait-row-copy">
                  <p>{description}</p>
                  <span>{detail}</span>
                </div>
                <div className="ait-row-icon" aria-hidden="true"><Icon size={25} strokeWidth={1.5} /></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ait-governance" aria-labelledby="ait-governance-title">
        <div className="ait-wrap">
          <div className="ait-governance-head">
            <div>
              <div className="ait-label">Data governance / Microsoft Purview</div>
              <h2 id="ait-governance-title">Trusted AI begins with <span>data you understand.</span></h2>
            </div>
            <p>Before data powers a dashboard, an agent or a business decision, teams need to know what they have, where it came from and who should be able to use it. Governance is part of the foundation, not a final check.</p>
          </div>
          <div className="ait-purview">
            <aside className="ait-purview-aside">
              <ShieldCheck size={36} strokeWidth={1.4} aria-hidden="true" />
              <div>
                <strong>From visibility<br />to accountability.</strong>
                <p>Microsoft Purview provides capabilities to help organizations discover, understand and protect data across their estate.</p>
              </div>
            </aside>
            <div className="ait-purview-grid">
              {governance.map(({ number, title, description }) => (
                <div className="ait-purview-item" key={number}>
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="ait-governance-note">Our Microsoft Purview expertise helps translate these capabilities into a workable governance model: clear owners, understandable policies and practical review points for the data that people and AI systems rely on.</p>
        </div>
      </section>

      <section className="ait-approach" aria-labelledby="ait-approach-title">
        <div className="ait-wrap">
          <div className="ait-approach-head">
            <div>
              <div className="ait-label">How we think about delivery</div>
              <h2 id="ait-approach-title">Begin with clarity.<br />Build for change.</h2>
            </div>
            <p>Experienced delivery matters most when the next step is uncertain. We bring a practical lens to discovery, architecture and adoption so the technology serves a real purpose.</p>
          </div>
          <div className="ait-steps">
            {steps.map(({ number, title, description }) => (
              <div className="ait-step" key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ait-close" aria-labelledby="ait-close-title">
        <div className="ait-wrap ait-close-inner">
          <div>
            <div className="ait-label">The next conversation</div>
            <h2 id="ait-close-title">What could work better in your organization?</h2>
          </div>
          <Link href="/contact" className="ait-primary-link" data-testid="link-ai-cta-contact">
            Start a conversation <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default AiTransformation;