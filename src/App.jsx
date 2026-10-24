import { useEffect, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';

const navItems = [
  ['home', 'Home'], ['about', 'About'], ['experiences', 'Experiences'],
  ['skills', 'Skills'], ['projects', 'Projects'], ['contact', 'Contact'],
];

const interests = [
  { id: 'hockey', title: 'Field hockey', className: 'green', detail: 'I played Division I hockey in high school for four years, winning the title all four years. It taught me discipline, teamwork, and most importantly: healthy competition.' },
  { id: 'pasta', title: 'Spaghetti, obviously', className: 'red', detail: 'I know every man says this, but I can claim with 97% confidence that I make the best pasta. P.S.: I don’t break my spaghetti.' },
  { id: 'ikigai', title: 'Ikigai', className: 'white', detail: 'Avid reader, currently exploring purpose, balance, and the small habits that make life meaningful.' },
  { id: 'pickleball', title: 'Pickleball', className: 'green', detail: 'I’m a sports guy and love learning new things; I’ll probably be down for a game even after a long work week.' },
  { id: 'football', title: 'Football', className: 'blue', detail: 'I fell in love with the game the second I landed in America. I’m a Hoosiers and Bills fan; I’ll wear a jersey underneath on game day.' },
];

const experiences = [
  { id: 'dispatch', date: 'Jul–Oct 2026', role: 'Project Manager', org: 'DispatchHer · Community Dreams Foundation', metrics: ['2 developers', 'Route-level unit economics', 'Inquiry-to-profitability workflow'], bullets: ['Turned an ambiguous launch plan into operating, pricing, route-economics, and execution workflows.', 'Directed two developers plus marketing and business-analysis work; built a customer website and connected operations analytics.'], skills: ['Unit economics', 'Route design', 'Analytics systems', 'QA / QC', 'Cross-functional leadership'] },
  { id: 'instructor', date: 'Aug 2024–May 2026', role: 'Undergraduate Instructor', org: 'Indiana University Economics Department', metrics: ['120 students', '2 academic years', 'Presentations + review sessions'], bullets: ['Explained economic models and guided problem-solving in clear, practical terms.', 'Coordinated presentations and review sessions with faculty and peers for 120 students.'], skills: ['Economics instruction', 'Public speaking', 'Model explanation', 'Facilitation', 'Learning support'] },
  { id: 'research', date: 'Jan–May 2025', role: 'Research Scholar', org: 'Honors Research in Economics · IU', metrics: ['3 governance regimes', 'Excel + Stata', 'Research paper'], bullets: ['Analyzed population, harvest, and policy data with Dr. Dean Lueck to study conservation and sustainable trade.', 'Compared open-access harvesting, regulated quotas, and ranching to examine recovery and profitability trade-offs.'], skills: ['Econometric research', 'Policy analysis', 'Institutional incentives', 'Data interpretation', 'Research writing'] },
  { id: 'hyphenova', date: 'Sep–Dec 2024', role: 'Finance & Business Development Intern', org: 'Hyphenova', metrics: ['10% targeted ROI improvement', '10 SaaS metrics', '10+ VC firms and accelerators'], bullets: ['Modeled customer segments and referral channels to identify acquisition opportunities targeting a 10% ROI improvement.', 'Translated pricing, churn, retention, and revenue assumptions into leadership forecasts and investor-facing materials.'], skills: ['Revenue planning', 'Customer segmentation', 'SaaS metrics', 'Scenario analysis', 'Investor communication'] },
  { id: 'consulting', date: 'Jan–Dec 2024', role: 'Project Lead', org: '812 Consulting · Kelley School of Business', metrics: ['4-person team', '8 countries', '12% projected share upside', '15% projected ROI improvement'], bullets: ['Led a four-person team across eight countries, coordinating market research, client communication, and analysis.', 'Prioritized customer segments and markets; recommended CRM and KPI tracking to target share and ROI improvements.'], skills: ['Go-to-market strategy', 'Market research', 'Team leadership', 'CRM / KPI design', 'Client communication'] },
  { id: 'aum', date: 'Jun–Aug 2023', role: 'Business Analyst Intern', org: 'AUM Capital Market', metrics: ['$110B investor market', '10 funds', '5 KPIs'], bullets: ['Analyzed mutual funds, real estate, and alternative assets in a $110B foreign-investor and NRI market.', 'Combined regulatory research, portfolio design, and weekly reporting to shape market-entry recommendations.'], skills: ['Portfolio analysis', 'Market research', 'Regulatory analysis', 'Benchmarking', 'Executive reporting'] },
];

const years = {
  '2023': { tools: ['Excel', 'PowerPoint'], skills: ['Portfolio analysis', 'Market research', 'Regulatory analysis', 'Weekly reporting'] },
  '2024': { tools: ['Excel', 'PowerPoint', 'CRM / KPI tracking'], skills: ['Customer segmentation', 'Go-to-market research', 'Revenue planning', 'Investor communication', 'Team coordination'] },
  '2025': { tools: ['Excel', 'Python', 'R', 'Stata', 'Jupyter', 'JupySQL', 'SQL'], skills: ['Econometrics', 'Regression analysis', 'Panel data analysis', 'Policy research', 'OLS and GBM modeling', 'Economic instruction'] },
  '2026': { tools: ['Python', 'pandas', 'NumPy', 'SQL', 'GitHub', 'Streamlit', 'Tableau', 'ChatGPT', 'Claude', 'statsmodels', 'matplotlib', 'requests', 'yfinance', 'Plotly', 'SciPy', 'FRED'], skills: ['Route unit economics', 'Dashboard design', 'Forecasting', 'Data validation', 'Attribution analysis', 'Workflow leadership', 'Time-series analysis', 'Sensitivity analysis', 'AI-assisted development'] },
};

const projects = [
  { id: 'valuation', title: 'Valuation Drivers Across Business Models', stat: '15 companies · 5 sectors', question: 'Which assumptions matter most across different business models?', approach: 'A sourced valuation study comparing how DCF assumptions affect value.', finding: 'Revenue growth led non-WACC sensitivity for 11 of 15 companies; EBIT margin led for the other 4.', href: 'https://github.com/bchandak-120/valuation-assumption-sensitivity-analyzer' },
  { id: 'inflation', title: 'Forecasting U.S. Inflation', stat: '5 models · CPI + PCE', question: 'How do forecast errors change across models and time horizons?', approach: 'Compared five models in a rolling-origin backtest using CPI, PCE, labor, rates, industrial production, and energy series.', finding: 'Reports RMSE and MAE for full, pre-2020, and post-2020 periods, with one- and twelve-month forecast comparisons.', href: 'https://github.com/bchandak-120/Inflation-forecasting' },
  { id: 'etf', title: 'ETF Creation & Redemption Simulator', stat: 'NAV · costs · arbitrage', question: 'When does an ETF premium or discount create a viable signal after costs?', approach: 'Models NAV from a constituent basket, transaction costs, price deviations, and creation or redemption thresholds.', finding: 'Makes the arbitrage mechanics visible while noting simplified execution, liquidity, and market-impact assumptions.', href: 'https://github.com/bchandak-120/etf-creation-redemption-simulator' },
  { id: 'semi', title: 'Semiconductor Market Analysis', stat: '3.45M rows', question: 'What patterns emerge across a large semiconductor dataset?', approach: 'Structured millions of records for time-series and market-geography analysis.', finding: 'Focused on finding and communicating patterns in data too large to inspect row by row.', href: 'https://github.com/bchandak-120?tab=repositories' },
  { id: 'airbnb', title: 'Airbnb Demand Analysis', stat: '126,882 observations · NYC + Seattle', question: 'What best explains booking demand across listings in two cities?', approach: 'Built a listing-month panel and compared OLS and gradient-boosted models.', finding: 'Lagged booking rate was the strongest predictor; the model reached approximately 80% explanatory power.', href: 'https://github.com/bchandak-120?tab=repositories' },
];

const tools = ['Python', 'R', 'Stata', 'SQL', 'JupySQL', 'Excel', 'Tableau', 'Jupyter', 'Streamlit', 'pandas', 'NumPy', 'statsmodels', 'matplotlib', 'requests', 'yfinance', 'Plotly', 'SciPy', 'FRED', 'DCF modeling', 'sensitivity analysis', 'econometrics', 'time-series analysis', 'rolling-origin backtesting', 'data visualization', 'OLS', 'GBM', 'GitHub', 'PowerPoint', 'ChatGPT', 'Claude'];

function Doodle({ id }) {
  if (id === 'hockey') return <svg viewBox="0 0 80 58" aria-hidden="true"><path d="M20 6 38 43q3 6 10 6h20M65 7 23 48l-8 4M28 8l18 34M15 52h16" /></svg>;
  if (id === 'pasta') return <svg viewBox="0 0 80 58" aria-hidden="true"><ellipse cx="40" cy="34" rx="32" ry="16"/><path d="M12 32c13 9 41 10 56 0M21 32c7-15 34-15 39 0M29 28c4-10 18-10 23 0M49 19c6-9 14-7 13-1-3 3-8 3-13 1z"/><path className="basil" d="M51 18c0-6-6-8-9-4 1 4 4 5 9 4z"/></svg>;
  if (id === 'ikigai') return <svg viewBox="0 0 80 58" aria-hidden="true"><path d="M8 12c12-5 22-3 32 4v34c-10-7-20-9-32-5zM72 12c-12-5-22-3-32 4v34c10-7 20-9 32-5zM40 16v34M14 22c7-2 15-1 21 2m31-2c-7-2-15-1-21 2M14 30c7-2 15-1 21 2m31-2c-7-2-15-1-21 2" /></svg>;
  if (id === 'pickleball') return <svg viewBox="0 0 80 58" aria-hidden="true"><circle cx="27" cy="25" r="18"/><path d="m42 40 24 14M19 17h1m15-3h1m8 11h1M19 32h1m13 4h1"/></svg>;
  return <svg viewBox="0 0 80 58" aria-hidden="true"><path d="M12 37c-7-8 5-23 19-30s31-2 36 6-4 24-18 32-29 0-37-8zM18 35l42-22M30 12l17 38M24 18l17 36M38 9l17 36"/></svg>;
}

function BentoCard({ className = '', children, onClick, ...props }) {
  const Component = onClick ? motion.button : motion.article;
  return <Component type={onClick ? 'button' : undefined} layout whileHover={{ y: -3 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }} className={`bento-card ${className}`} onClick={onClick} {...props}>{children}</Component>;
}

function WorldMap() {
  return <svg className="world-map" viewBox="0 0 1000 360" role="img" aria-label="Map showing a westward route from India to Indiana">
    <g className="land">
      <path d="M43 76 76 44l43 4 18-14 38 11 23-9 28 17 42-5 30 21 39 5 17 22-17 20-34 9-17 28-26 7-9 24-24 5-18-15-16 5-11-16-25-2-20-20-27-5-9-26-31-5-13-27-22 3z"/>
      <path d="m285 191 23 8 21 20 17 8-3 20 20 15-8 19-9 27-17 31-15-12-11-34-18-17-4-30-17-18 2-22-15-9z"/>
      <path d="m490 83 17-12 25 4 12-8 30 6 14 15-12 13-20 3-15 12-19-4-15-13-20-2z"/>
      <path d="m531 124 26-9 28 5 23-12 45 8 26-15 54 2 20 15 43-7 35 16 53-3 28 14-18 20-37 8-26 23-31 3-20 18-24-7-18-21-26 8-27-10-24 6-31-14-18 11-26-7-8-22-26-5z"/>
      <path d="m574 177 31-12 35 9 22 22-5 22-13 11-10 27-18 37-24 22-18-22-5-31-15-23 2-24-13-20 10-18z"/>
      <path d="m735 190 14-5 8 13-5 15-11-4zM769 164l18-9 21 6 7 15-15 7-19-7zM810 205l23-12 24 12 11 20-18 12-11 24-17-12-10-21zM846 267l18 5 12 16-6 25-13 16-14-18-3-23zM919 205l23-9 19 13 2 24-18 12-16-11z"/>
    </g>
    <path className="map-route" d="M803 189 C730 140 657 139 604 147 S457 150 349 159"/>
    <circle cx="803" cy="189" r="8" className="map-dot india-dot"/><circle cx="349" cy="159" r="8" className="map-dot iu-dot"/>
    <text x="818" y="184" className="map-label">India</text><text x="247" y="145" className="map-label">Indiana University</text>
    <text x="608" y="319" className="continent-label">AFRICA</text><text x="708" y="110" className="continent-label">ASIA</text><text x="112" y="235" className="continent-label">NORTH AMERICA</text>
  </svg>;
}

function App() {
  const [page, setPage] = useState(() => navItems.some(([id]) => id === location.hash.slice(1)) ? location.hash.slice(1) : 'home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [interest, setInterest] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [arranged, setArranged] = useState(false);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedProject, setSelectedProject] = useState('valuation');
  const [openingEnvelope, setOpeningEnvelope] = useState(false);

  useEffect(() => {
    const sync = () => setPage(navItems.some(([id]) => id === location.hash.slice(1)) ? location.hash.slice(1) : 'home');
    addEventListener('hashchange', sync);
    addEventListener('popstate', sync);
    return () => { removeEventListener('hashchange', sync); removeEventListener('popstate', sync); };
  }, []);

  useEffect(() => {
    const close = (event) => { if (event.key === 'Escape') { setInterest(''); setMenuOpen(false); } };
    addEventListener('keydown', close);
    return () => removeEventListener('keydown', close);
  }, []);

  function goTo(id) {
    setMenuOpen(false);
    setInterest('');
    if (id !== page) history.pushState({}, '', `#${id}`);
    setPage(id);
    scrollTo({ top: 0, behavior: 'smooth' });
  }

  function envelopeToContact() {
    if (openingEnvelope) return;
    setOpeningEnvelope(true);
    window.setTimeout(() => { setOpeningEnvelope(false); goTo('contact'); }, 600);
  }

  const activeProject = projects.find((item) => item.id === selectedProject) || projects[0];
  const activeExperience = experiences.find((item) => item.id === selectedExperience);

  return <div className="app-shell">
    <div className="chalk-dust" aria-hidden="true" />
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className="site-header">
      <button className="brand" onClick={() => goTo('home')} aria-label="Bhavesh Chandak, home"><span className="brand-mark">BC</span><span>Bhavesh Chandak</span></button>
      <button className="nav-toggle" type="button" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>Menu</button>
      <nav className={menuOpen ? 'is-open' : ''} aria-label="Main navigation">{navItems.map(([id, label]) => <button key={id} className={page === id ? 'is-active' : ''} aria-current={page === id ? 'page' : undefined} onClick={() => goTo(id)}>{label}</button>)}</nav>
    </header>
    <main id="main-content">
      <AnimatePresence mode="wait" initial={false}>
        <motion.section key={page} className={`page page-${page}`} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.28, ease: 'easeOut' }}>
          {page === 'home' && <>
            <div className="page-kicker"><span>FIELD NOTES · 01</span><span>BUSINESS × ECONOMICS × ANALYTICS</span></div>
            <LayoutGroup id="home-bento"><div className="bento-grid home-grid">
              <BentoCard className="home-intro chalk-panel">
                <p className="eyebrow">Indiana University · Class of 2026</p><h1>Making sense<br/><em>of the moving parts.</em></h1>
                <p className="intro-copy">I work where business decisions and economic questions meet.</p>
                <div className="home-social"><a href="https://www.linkedin.com/in/bhaveshchandak" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://github.com/bchandak-120" target="_blank" rel="noreferrer">GitHub ↗</a></div>
              </BentoCard>
              <BentoCard className="home-portrait chalk-panel"><img src={`${import.meta.env.BASE_URL}images/portrait.jpeg`} alt="Bhavesh at an outdoor ice rink in Chicago"/><span className="photo-caption">Chicago · rink-side</span></BentoCard>
              <BentoCard className="education-card chalk-panel"><p className="eyebrow">Two lenses</p><h2>Education</h2><div className="degree-note"><strong>B.S. in Business</strong><b>With Distinction</b><span>Economic Consulting<br/>Business Analytics</span></div><div className="degree-note"><strong>B.S. in Economics and Quantitative Methods</strong><b>With Distinction</b><span>Quantitative Economics · STEM</span></div></BentoCard>
              <BentoCard className="honors-card chalk-panel"><p className="eyebrow">Indiana University</p><h2>Academic honors</h2><p>Global Engagement Scholarship · Founders Scholar · Executive Dean’s List · Hutton Honors College · Phi Eta Sigma · Alpha Lambda Delta</p></BentoCard>
              {interests.map((item) => <motion.article layout key={item.id} className={`interest-card bento-card chalk-panel ${item.className} ${interest === item.id ? 'is-expanded' : ''}`} whileHover={{ y: -4 }} onClick={() => setInterest(interest === item.id ? '' : item.id)}>
                <button className="interest-button" aria-expanded={interest === item.id}><Doodle id={item.id}/><span>{item.title}</span><span className="plus">{interest === item.id ? '−' : '+'}</span></button>
                <AnimatePresence>{interest === item.id && <motion.p className="interest-copy" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>{item.detail}</motion.p>}</AnimatePresence>
              </motion.article>)}
              <BentoCard className="contact-teaser chalk-panel" onClick={envelopeToContact}>
                <motion.div className={`envelope ${openingEnvelope ? 'is-opening' : ''}`} animate={openingEnvelope ? { rotateX: 40, y: -10 } : { rotateX: 0, y: 0 }}><svg viewBox="0 0 72 52" aria-hidden="true"><path d="M5 7h62v39H5zM6 9l30 23L66 9M6 45l22-19M66 45 44 26"/></svg></motion.div><strong>Get in touch</strong><span>Open the contact page ↗</span>
              </BentoCard>
            </div></LayoutGroup>
          </>}

          {page === 'about' && <>
            <div className="page-heading"><p className="eyebrow">THE PATH THAT BROUGHT ME HERE</p><h1>From India to IU.</h1><p className="lead">I wanted to understand both how businesses make decisions and how economic forces shape them.</p></div>
            <LayoutGroup id="about-bento"><div className="bento-grid about-grid">
              <BentoCard className="map-card chalk-panel"><WorldMap/><p className="map-caption">India → Bloomington, Indiana</p></BentoCard>
              <BentoCard className="origin-card chalk-panel"><p className="eyebrow">01 · Where I started</p><h2>India</h2><p>I grew up in India, then crossed the world to study at Indiana University.</p></BentoCard>
              <BentoCard className="why-card chalk-panel"><p className="eyebrow">02 · Why IU</p><h2>A place to bring both fields together.</h2><p>IU gave me the chance to combine Kelley’s applied business education with rigorous quantitative economics.</p></BentoCard>
              <BentoCard className="landmark-card chalk-panel"><p className="eyebrow">Places that stay with me</p><div className="landmarks"><div><span className="landmark-sketch taj" aria-hidden="true">⌂</span><strong>Taj Mahal</strong></div><div><span className="landmark-sketch victoria" aria-hidden="true">⌂</span><strong>Victoria Memorial</strong></div></div></BentoCard>
              <BentoCard className="degree-card chalk-panel"><p className="eyebrow">03 · Two lenses</p><div className="degree-note"><strong>B.S. in Business</strong><span>Economic Consulting · Business Analytics</span><b>With Distinction</b></div><div className="degree-note"><strong>B.S. in Economics and Quantitative Methods</strong><span>Quantitative Economics · STEM</span><b>With Distinction</b></div></BentoCard>
              <BentoCard className="about-outro chalk-panel"><p>Together, these paths taught me to look at decisions from both sides: the organization making the choice and the economic forces around it.</p></BentoCard>
            </div></LayoutGroup>
          </>}

          {page === 'experiences' && <>
            <div className="page-heading"><p className="eyebrow">THE WORK BEHIND THE QUESTIONS</p><h1>Experiences</h1><p className="lead">Choose a card. The board will put the timeline in order.</p></div>
            <LayoutGroup id="experience-bento"><div className={`experience-layout ${arranged ? 'is-arranged' : ''}`}>
              <div className="experience-grid">{experiences.map((item, i) => <motion.button layout key={item.id} className={`experience-card chalk-panel ${selectedExperience === item.id ? 'is-selected' : ''}`} onClick={() => { setArranged(true); setSelectedExperience(item.id); }} initial={{ opacity: 0, scale: .9, rotate: i % 2 ? 2 : -2 }} animate={{ opacity: 1, scale: 1, rotate: arranged ? 0 : (i % 2 ? 1.1 : -1.1), y: arranged ? 0 : (i % 3 - 1) * 8 }} transition={{ type: 'spring', stiffness: 280, damping: 24 }} whileHover={{ scale: 1.025 }}><span className="card-date">{item.date}</span><strong>{item.role}</strong><span>{item.org}</span><small>{item.metrics[0]} · {item.metrics[1]}</small></motion.button>)}</div>
              <AnimatePresence mode="wait">{activeExperience ? <motion.aside key={activeExperience.id} className="experience-detail chalk-panel" layout initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 12 }}><p className="eyebrow">ROLE NOTES · {activeExperience.date}</p><h2>{activeExperience.role}</h2><p className="detail-org">{activeExperience.org}</p><div className="metric-row">{activeExperience.metrics.map(m => <span key={m}>{m}</span>)}</div><ul>{activeExperience.bullets.map(b => <li key={b}>{b}</li>)}</ul><h3>Five skills built here</h3><div className="skill-tags">{activeExperience.skills.map(s => <span key={s}>{s}</span>)}</div><button className="text-button" onClick={() => setSelectedExperience('')}>Close details ×</button></motion.aside> : <motion.aside key="empty" className="experience-detail chalk-panel" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><p className="eyebrow">SELECT AN EXPERIENCE</p><h2>The details will land here.</h2><p>Each role opens with two short highlights and five skills developed in the work.</p><button className="text-button" onClick={() => setArranged(!arranged)}>{arranged ? 'Scatter the cards again ↺' : 'Arrange the timeline ↗'}</button></motion.aside>}</AnimatePresence>
            </div></LayoutGroup>
            <div className="chat-cta"><span>Like what you see?</span><button className="mini-envelope" onClick={envelopeToContact}><span aria-hidden="true">✉</span><strong>Let’s chat</strong><b>↗</b></button></div>
          </>}

          {page === 'skills' && <>
            <div className="page-heading"><p className="eyebrow">A TIMELINE WITH A SLOPE</p><h1>Skills, over time</h1><p className="lead">Tools and skills grew alongside the questions I was working on.</p></div>
            <div className="chart-shell chalk-panel">
              <div className="chart-legend"><span><i className="tool-key"/>Tools</span><span><i className="skill-key"/>Skills</span></div>
              <div className="chart-area"><span className="y-axis">Tools / Skills</span><svg className="curve-svg" viewBox="0 0 1000 500" preserveAspectRatio="none" aria-hidden="true"><path className="curve-fill" d="M70 430 C330 430 660 420 930 90 L930 430Z"/><path className="curve-line" d="M70 430 C330 430 660 420 930 90"/><path className="axis" d="M70 55V430H950"/></svg>
                <div className="year-grid">{Object.keys(years).map((year, i) => <motion.button layout key={year} className={`year-card chalk-panel ${selectedYear === year ? 'is-selected' : ''}`} style={{ '--rise': `${i * 11}px` }} onMouseEnter={() => setSelectedYear(year)} onFocus={() => setSelectedYear(year)} onClick={() => setSelectedYear(selectedYear === year ? '' : year)} whileHover={{ scale: 1.04 }}><strong>{year}</strong><small><span>Tools {years[year].tools.length}</span><span>Skills {years[year].skills.length}</span></small>{selectedYear === year && <motion.div className="year-popover" layoutId="year-popover"><b>Tools</b><span>{years[year].tools.join(' · ')}</span><b>Skills</b><span>{years[year].skills.join(' · ')}</span></motion.div>}</motion.button>)}</div>
                <span className="x-axis">Time</span>
              </div>
            </div>
            <p className="skills-punchline">Give an economist a timeline, and they’ll find a curve.</p>
          </>}

          {page === 'projects' && <>
            <div className="page-heading"><p className="eyebrow">THE RESEARCH WORKBENCH</p><h1>Projects & case studies</h1><p className="lead">Five projects. Different questions. One board to work them through.</p></div>
            <LayoutGroup id="projects-bento"><div className="projects-layout"><div className="project-grid">{projects.map((item, i) => <motion.button layout key={item.id} className={`project-card chalk-panel project-${item.id} ${selectedProject === item.id ? 'is-selected' : ''}`} onClick={() => setSelectedProject(item.id)} whileHover={{ y: -4 }}><span className="project-number">0{i + 1}</span><strong>{item.title}</strong><small>{item.stat}</small><span className="project-arrow">↗</span></motion.button>)}</div>
              <AnimatePresence mode="wait"><motion.article key={activeProject.id} className="project-detail chalk-panel" layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}><p className="eyebrow">SELECTED CASE STUDY</p><h2>{activeProject.title}</h2><div className="case-note"><h3>The question</h3><p>{activeProject.question}</p></div><div className="case-note"><h3>The approach</h3><p>{activeProject.approach}</p></div><div className="case-note"><h3>What emerged</h3><p>{activeProject.finding}</p></div><a className="chalk-link" href={activeProject.href} target="_blank" rel="noreferrer">Open project on GitHub ↗</a></motion.article></AnimatePresence>
            </div></LayoutGroup>
            <div className="tool-cloud"><p className="eyebrow">TOOLS & METHODS ACROSS THE WORK</p><div>{tools.map((tool, i) => <motion.span key={tool} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .018 }}>{tool}</motion.span>)}</div></div>
          </>}

          {page === 'contact' && <motion.div className="contact-sheet chalk-panel" initial={{ scale: .96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 180, damping: 22 }}><p className="eyebrow">THE BOARD IS OPEN</p><h1>Let’s talk.</h1><p className="lead">Have a question, an idea, or a project where business and economics meet? Send me a note.</p><div className="contact-list"><a href="mailto:chandakbhavesh25@gmail.com"><span>✉</span><div><small>Email</small><strong>chandakbhavesh25@gmail.com</strong></div><b>↗</b></a><a href="https://www.linkedin.com/in/bhaveshchandak" target="_blank" rel="noreferrer"><span>in</span><div><small>LinkedIn</small><strong>Connect with me</strong></div><b>↗</b></a><a href="https://github.com/bchandak-120" target="_blank" rel="noreferrer"><span>⌘</span><div><small>GitHub</small><strong>Explore my projects</strong></div><b>↗</b></a></div><p className="contact-location">Indiana University · Bloomington, Indiana</p></motion.div>}
        </motion.section>
      </AnimatePresence>
    </main>
    <footer className="site-footer"><span>Bhavesh Chandak</span><span>Chalkboard portfolio · 2026</span></footer>
  </div>;
}

export default App;
