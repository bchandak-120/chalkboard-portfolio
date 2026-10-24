import { useEffect, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';

const navItems = [
  ['home', 'Home'], ['about', 'About'], ['experiences', 'Experiences'],
  ['skills', 'Skills'], ['projects', 'Projects'], ['contact', 'Contact'],
];

const interests = [
  { id: 'hockey', title: 'Field hockey', className: 'green', detail: 'I played Division I hockey in high school for four years, winning the title all four years. It taught me discipline, teamwork, and most importantly: healthy competition.' },
  { id: 'pasta', title: 'Spaghetti', className: 'red', detail: 'I know every man says this, but I can claim with 97% confidence that I make the best pasta. P.S.: I don’t break my spaghetti.' },
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

function LandmarkSketch({ kind }) {
  if (kind === 'taj') return <svg className="landmark-art" viewBox="0 0 180 110" role="img" aria-label="Chalk sketch of the Taj Mahal">
    <g><path d="M18 95h144M29 89h122M39 83h102M48 79V61h84v18M52 61c4-17 22-21 38-21s34 4 38 21M67 41c0-17 8-26 23-29 15 3 23 12 23 29M90 12V6M77 42v-8m26 8v-8M59 79V67q14-22 28 0v12m7 0V67q14-22 28 0v12M25 82V48l7-7 7 7v34M141 82V48l7-7 7 7v34M28 41V25l4-6 4 6v16M144 41V25l4-6 4 6v16"/></g>
  </svg>;
  return <svg className="landmark-art" viewBox="0 0 180 110" role="img" aria-label="Chalk sketch of the Victoria Memorial in Kolkata">
    <g><path d="M13 93h154M22 89h136M29 83h122M36 78h108M42 78V61h96v17M47 61h86M53 60V44h74v16M61 44c4-16 15-23 32-25 17 2 28 9 32 25M93 19V8m-4 0h8M76 44V34m34 10V34M59 60V50m68 10V50M31 83V65m12 18V65m94 18V65m12 18V65M69 78V63m14 15V63m20 15V63m14 15V63M29 65h14m94 0h14M74 60V49q19-23 38 0v11M89 89V72q4-8 8 0v17"/></g>
  </svg>;
}

function BentoCard({ className = '', children, onClick, ...props }) {
  const Component = onClick ? motion.button : motion.article;
  return <Component type={onClick ? 'button' : undefined} layout whileHover={{ y: -3 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }} className={`bento-card ${className}`} onClick={onClick} {...props}>{children}</Component>;
}

function WorldMap() {
  return <svg className="world-map" viewBox="0 0 1000 360" role="img" aria-label="Map showing a westward route from India to Indiana">
    <g className="land">
      <path d="m55 101 20-28 27-8 20-20 37 7 16-11 31 12 25-5 23 12 37-4 29 17 24 2 13 19-21 13-14 25-31 4-12 20-23-8-18-17-25 2-17-15-26 2-19-13-30 5-15-14-28 9-16-9z"/>
      <path d="m338 66 23-20 31 5 19 19-12 20-33 4-24-12z"/>
      <path d="m288 178 18 7 15 22 19 12 7 22-12 21-8 30-17 27-13-15-6-30-14-20-3-25-14-22 4-19z"/>
      <path d="m469 104 17-15 26 1 13 12-7 15-23 6-22-7z"/>
      <path d="m475 137 22-9 27 5 21 15 16 29-9 28-15 30-19 31-17-18-4-30-12-23-14-17 3-22-13-19z"/>
      <path d="m527 105 23-20 42 4 20-16 48 7 27-14 55 5 26-8 57 13 38 26 32 9-8 19-30 7-22 18-33-4-24 17-28-5-16 19-24-8-14-21-31 5-18-12-24 5-23-14-24 9-21-13-24 7-17-18-29-5z"/>
      <path d="m672 161 20-9 20 9 16 22-9 12-18-9-18 3-11-14z"/>
      <path d="m800 250 25-13 28 5 21 17-8 17-24 8-26-9-17-12z"/>
      <path d="m439 282 13-9 11 8-4 18-12 6z"/>
    </g>
    <path className="map-route" d="M682 171 C595 117 473 118 398 135 S304 151 267 145"/>
    <circle cx="682" cy="171" r="8" className="map-dot india-dot"/><circle cx="267" cy="145" r="8" className="map-dot iu-dot"/>
    <text x="697" y="168" className="map-label">India</text><text x="183" y="132" className="map-label">Indiana University</text>
    <text x="514" y="294" className="continent-label">AFRICA</text><text x="712" y="109" className="continent-label">ASIA</text><text x="105" y="225" className="continent-label">NORTH AMERICA</text>
  </svg>;
}

function App() {
  const [page, setPage] = useState(() => navItems.some(([id]) => id === location.hash.slice(1)) ? location.hash.slice(1) : 'home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [interest, setInterest] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [arranged, setArranged] = useState(false);
  const [homeArranged, setHomeArranged] = useState(false);
  const [scatterPoints] = useState(() => Array.from({ length: 10 }, () => ({
    // Give the notes real breathing room around their grid positions so the
    // first view reads as a working board, not a perfectly aligned dashboard.
    x: Math.round((Math.random() - 0.5) * (innerWidth < 720 ? 18 : 86)),
    y: Math.round((Math.random() - 0.5) * (innerWidth < 720 ? 22 : 58)),
    r: (Math.random() - 0.5) * (innerWidth < 720 ? 3 : 9),
  })));
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
    window.setTimeout(() => goTo('contact'), 760);
    window.setTimeout(() => setOpeningEnvelope(false), 980);
  }

  const activeProject = projects.find((item) => item.id === selectedProject) || projects[0];
  const activeExperience = experiences.find((item) => item.id === selectedExperience);
  const scatterStyle = (index) => ({
    '--scatter-x': `${homeArranged ? 0 : scatterPoints[index].x}px`,
    '--scatter-y': `${homeArranged ? 0 : scatterPoints[index].y}px`,
    '--scatter-r': `${homeArranged ? 0 : scatterPoints[index].r}deg`,
  });

  return <div className="app-shell">
    <div className="chalk-dust" aria-hidden="true" />
    <AnimatePresence>{openingEnvelope && <motion.div className="envelope-transition" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .28 }} aria-hidden="true">
      <motion.div className="transition-envelope" initial={{ scale: .55, rotate: -5 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 8, opacity: 0 }} transition={{ duration: .78, ease: [0.2, 0.8, 0.2, 1] }}>
        <svg viewBox="0 0 160 112"><path className="envelope-paper" d="M8 13h144v88H8z"/><path className="envelope-flap" d="M9 15 80 70l71-55"/><path d="M9 99 56 60M151 99 104 60"/></svg>
        <span>Get in touch</span>
      </motion.div>
    </motion.div>}</AnimatePresence>
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
            <div className="page-kicker"><span>FIELD NOTES · 01</span><span>BUSINESS × ECONOMICS × ANALYTICS</span><button className="board-toggle" onClick={() => setHomeArranged(!homeArranged)}>{homeArranged ? 'Scatter the notes ↗' : 'Arrange the board ↗'}</button></div>
            <LayoutGroup id="home-bento"><div className={`bento-grid home-grid ${homeArranged ? 'is-arranged' : 'is-scattered'}`}>
              <div className="chalk-marginalia" aria-hidden="true"><span className="marginalia-a">MODEL → DECISION</span><span className="marginalia-b">BUSINESS × ECONOMICS</span><svg viewBox="0 0 160 80"><path d="M5 68 C38 68 58 60 76 48 S117 28 154 7"/><path d="M142 7h12v12"/></svg></div>
              <BentoCard style={scatterStyle(0)} className="home-intro chalk-panel">
                <p className="eyebrow">Indiana University · Class of 2026</p><h1>Making sense<br/><em>of the moving parts.</em></h1>
                <p className="intro-copy">I work where business decisions and economic questions meet.</p>
                <div className="home-social"><a href="https://www.linkedin.com/in/bhaveshchandak" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://github.com/bchandak-120" target="_blank" rel="noreferrer">GitHub ↗</a></div>
              </BentoCard>
              <BentoCard style={scatterStyle(1)} className="home-portrait chalk-panel"><img src={`${import.meta.env.BASE_URL}images/portrait.jpeg`} alt="Bhavesh at an outdoor ice rink in Chicago"/><span className="photo-caption">Chicago · rink-side</span></BentoCard>
              <BentoCard style={scatterStyle(2)} className="education-card chalk-panel"><p className="eyebrow">Two lenses</p><h2>Education</h2><div className="degree-note"><strong>B.S. in Business</strong><b>With Distinction</b><span>Economic Consulting<br/>Business Analytics</span></div><div className="degree-note"><strong>B.S. in Economics and Quantitative Methods</strong><b>With Distinction</b><span>Quantitative Economics · STEM</span></div></BentoCard>
              <BentoCard style={scatterStyle(3)} className="honors-card chalk-panel"><p className="eyebrow">Indiana University</p><h2>Academic honors</h2><p>Global Engagement Scholarship · Founders Scholar · Executive Dean’s List · Hutton Honors College · Phi Eta Sigma · Alpha Lambda Delta</p></BentoCard>
              {interests.map((item, i) => <motion.article style={scatterStyle(i + 4)} layout key={item.id} className={`interest-float ${item.className} ${interest === item.id ? 'is-expanded' : ''}`} whileHover={{ y: -4 }}>
                <button type="button" className="interest-button" aria-label={item.title} aria-expanded={interest === item.id} onClick={() => setInterest(interest === item.id ? '' : item.id)}><Doodle id={item.id}/></button>
                <AnimatePresence>{interest === item.id && <motion.div className="interest-copy" initial={{ opacity: 0, y: 6, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 4, scale: .97 }}><strong>{item.title}</strong><span>{item.detail}</span></motion.div>}</AnimatePresence>
              </motion.article>)}
              <BentoCard style={scatterStyle(9)} className="contact-teaser chalk-panel" onClick={envelopeToContact}>
                <motion.div className={`envelope ${openingEnvelope ? 'is-opening' : ''}`} animate={openingEnvelope ? { scale: 1.06, y: -5 } : { scale: 1, y: 0 }}><svg viewBox="0 0 72 52" aria-hidden="true"><path className="envelope-paper" d="M5 7h62v39H5z"/><path className="envelope-flap" d="M6 9 36 32 66 9"/><path d="M6 45l22-19M66 45 44 26"/></svg><b>Get in touch</b></motion.div><span>Open the contact page ↗</span>
              </BentoCard>
            </div></LayoutGroup>
          </>}

          {page === 'about' && <>
            <div className="page-heading"><p className="eyebrow">THE PATH THAT BROUGHT ME HERE</p><h1>From India to IU.</h1><p className="lead">I wanted to understand both how businesses make decisions and how economic forces shape them.</p></div>
            <LayoutGroup id="about-bento"><div className="bento-grid about-grid">
              <BentoCard className="map-card chalk-panel"><WorldMap/><p className="map-caption">India → Bloomington, Indiana</p></BentoCard>
              <BentoCard className="origin-card chalk-panel"><p className="eyebrow">01 · Where I started</p><h2>India</h2><p>I grew up in India, then crossed the world to study at Indiana University.</p></BentoCard>
              <BentoCard className="why-card chalk-panel"><p className="eyebrow">02 · Why IU</p><h2>A place to bring both fields together.</h2><p>IU gave me the chance to combine Kelley’s applied business education with rigorous quantitative economics.</p></BentoCard>
              <BentoCard className="landmark-card chalk-panel"><p className="eyebrow">Places that stay with me</p><div className="landmarks"><div><LandmarkSketch kind="taj"/><strong>Taj Mahal</strong></div><div><LandmarkSketch kind="victoria"/><strong>Victoria Memorial</strong></div></div></BentoCard>
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
              <div className="chart-area"><span className="y-axis">Tools / Skills</span><svg className="curve-svg" viewBox="0 0 1000 500" preserveAspectRatio="none" aria-hidden="true"><path className="curve-fill" d="M70 430 C330 430 660 420 930 90 L930 430Z"/><motion.path className="curve-line" d="M70 430 C330 430 660 420 930 90" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.4, ease: 'easeOut' }}/><path className="axis" d="M70 55V430H950"/></svg>
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
