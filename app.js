const pages = [...document.querySelectorAll('[data-page]')];
const navLinks = [...document.querySelectorAll('[data-nav]')];
const nav = document.querySelector('#main-nav');
const navToggle = document.querySelector('.nav-toggle');

function showPage(id, options = {}) {
  const page = document.querySelector('[data-page="' + id + '"]');
  if (!page) return;
  pages.forEach((item) => {
    const active = item === page;
    item.hidden = !active;
    item.classList.toggle('is-active', active);
  });
  navLinks.forEach((link) => link.classList.toggle('is-active', link.dataset.nav === id));
  nav.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
  if (!options.fromHistory && location.hash !== '#' + id) history.pushState({ page: id }, '', '#' + id);
  window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
}

function animateEnvelope(link) {
  if (!link || link.classList.contains('is-opening')) return;
  link.classList.add('is-opening');
  link.setAttribute('aria-busy', 'true');
  window.setTimeout(() => {
    link.classList.remove('is-opening');
    link.removeAttribute('aria-busy');
    showPage('contact');
  }, 620);
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const id = link.getAttribute('href').slice(1);
    if (!document.querySelector('[data-page="' + id + '"]')) return;
    event.preventDefault();
    if (link.matches('[data-envelope]')) animateEnvelope(link);
    else showPage(id);
  });
});
window.addEventListener('popstate', () => showPage(location.hash.slice(1) || 'home', { fromHistory: true }));
navToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(open));
});
showPage(location.hash.slice(1) || 'home', { fromHistory: true });

// Interest doodles open small, local cards without disturbing the home board.
const interests = [...document.querySelectorAll('.interest')];
function closeInterests() {
  interests.forEach((item) => {
    item.classList.remove('is-open');
    item.querySelector('.interest-trigger').setAttribute('aria-expanded', 'false');
    item.querySelector('.interest-detail').hidden = true;
  });
}
interests.forEach((item) => {
  const trigger = item.querySelector('.interest-trigger');
  trigger.addEventListener('click', () => {
    const wasOpen = item.classList.contains('is-open');
    closeInterests();
    if (!wasOpen) {
      item.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
      item.querySelector('.interest-detail').hidden = false;
    }
  });
  item.querySelector('.detail-close').addEventListener('click', closeInterests);
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeInterests();
});

const experienceData = {
  dispatch: {
    role: 'Project Manager · DispatchHer',
    org: 'Community Dreams Foundation · July–October 2026',
    metrics: ['2 developers', 'Route-level unit economics', 'Inquiry-to-profitability workflow'],
    bullets: [
      'Turned an ambiguous launch plan into operating, pricing, route-economics, and execution workflows.',
      'Directed two developers plus marketing and business-analysis work; built a customer website and connected operations analytics.'
    ],
    skills: ['Unit economics', 'Route design', 'Analytics systems', 'QA / QC', 'Cross-functional leadership']
  },
  instructor: {
    role: 'Undergraduate Instructor',
    org: 'Indiana University Economics Department · August 2024–May 2026',
    metrics: ['120 students', 'Presentations + review sessions', '2 academic years'],
    bullets: [
      'Explained economic models and guided problem-solving in clear, practical terms.',
      'Coordinated presentations and review sessions with faculty and peers for 120 students.'
    ],
    skills: ['Economics instruction', 'Public speaking', 'Model explanation', 'Facilitation', 'Learning support']
  },
  research: {
    role: 'Research Scholar',
    org: 'Honors Research in Economics · January–May 2025',
    metrics: ['3 governance regimes', 'Excel + Stata', 'Research paper'],
    bullets: [
      'Analyzed population, harvest, and policy data with Dr. Dean Lueck to study conservation and sustainable trade.',
      'Compared open-access harvesting, regulated quotas, and ranching to examine recovery and profitability trade-offs.'
    ],
    skills: ['Econometric research', 'Policy analysis', 'Institutional incentives', 'Data interpretation', 'Research writing']
  },
  hyphenova: {
    role: 'Finance, Revenue Management & Business Development Intern',
    org: 'Hyphenova · September–December 2024',
    metrics: ['10% targeted ROI improvement', '10 SaaS metrics', '10+ VC firms and accelerators'],
    bullets: [
      'Modeled customer segments and referral channels to identify acquisition opportunities targeting a 10% ROI improvement.',
      'Translated pricing, churn, retention, and revenue assumptions into leadership forecasts and investor-facing materials.'
    ],
    skills: ['Revenue planning', 'Customer segmentation', 'SaaS metrics', 'Scenario analysis', 'Investor communication']
  },
  consulting: {
    role: 'Project Lead · Go-to-Market Marketing & Strategy',
    org: '812 Consulting · Kelley School of Business · January–December 2024',
    metrics: ['4-person team', '8 countries', '12% projected share upside', '15% projected ROI improvement'],
    bullets: [
      'Led a four-person team across eight countries, coordinating market research, client communication, and analysis.',
      'Prioritized customer segments and markets; recommended CRM and KPI tracking to target share and ROI improvements.'
    ],
    skills: ['Go-to-market strategy', 'Market research', 'Team leadership', 'CRM / KPI design', 'Client communication']
  },
  aum: {
    role: 'Business Analyst Intern',
    org: 'AUM Capital Market Pvt. Ltd. · June–August 2023',
    metrics: ['$110B investor market', '10 funds', '5 KPIs'],
    bullets: [
      'Analyzed mutual funds, real estate, and alternative assets in a $110B foreign-investor and NRI market.',
      'Combined regulatory research, portfolio design, and weekly reporting to shape market-entry recommendations.'
    ],
    skills: ['Portfolio analysis', 'Market research', 'Regulatory analysis', 'Benchmarking', 'Executive reporting']
  }
};

function setExperienceDetail(id) {
  const data = experienceData[id];
  if (!data) return;
  const panel = document.querySelector('#experience-detail');
  panel.innerHTML = '<p class="eyebrow">Role notes</p><h2>' + data.role + '</h2><p class="detail-org">' + data.org + '</p>' +
    '<div class="metric-row">' + data.metrics.map((metric) => '<span class="metric-chip">' + metric + '</span>').join('') + '</div>' +
    '<ul>' + data.bullets.map((bullet) => '<li>' + bullet + '</li>').join('') + '</ul>' +
    '<div class="skills-learned"><h3>Five skills built here</h3><div class="skill-tags">' + data.skills.map((skill) => '<span>' + skill + '</span>').join('') + '</div></div>';
}
function animateExperienceLayout(arrange) {
  const board = document.querySelector('#experience-board');
  const cards = [...board.querySelectorAll('.experience-card')];
  const before = cards.map((card) => card.getBoundingClientRect());
  board.classList.toggle('is-arranged', arrange);
  const after = cards.map((card) => card.getBoundingClientRect());
  cards.forEach((card, i) => {
    const dx = before[i].left - after[i].left;
    const dy = before[i].top - after[i].top;
    card.style.transition = 'none';
    card.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
  });
  board.offsetHeight;
  requestAnimationFrame(() => cards.forEach((card) => {
    card.style.transition = '';
    card.style.transform = '';
  }));
}
document.querySelectorAll('.experience-card').forEach((card) => {
  card.addEventListener('click', () => {
    if (!document.querySelector('#experience-board').classList.contains('is-arranged')) animateExperienceLayout(true);
    document.querySelectorAll('.experience-card').forEach((item) => item.classList.toggle('is-selected', item === card));
    setExperienceDetail(card.dataset.exp);
  });
});
document.querySelector('#scatter-reset').addEventListener('click', () => {
  animateExperienceLayout(false);
  document.querySelectorAll('.experience-card').forEach((item) => item.classList.remove('is-selected'));
  document.querySelector('#experience-detail').innerHTML = '<p class="eyebrow">Select an experience</p><h2>The details will land here.</h2><p>Each role opens with two short highlights and five skills developed in the work.</p>';
});

const yearData = {
  '2023': {
    tools: ['Excel', 'PowerPoint'],
    skills: ['Portfolio analysis', 'Market research', 'Regulatory analysis', 'Weekly reporting']
  },
  '2024': {
    tools: ['Excel', 'PowerPoint', 'CRM / KPI tracking'],
    skills: ['Customer segmentation', 'Go-to-market research', 'Revenue planning', 'Investor communication', 'Team coordination']
  },
  '2025': {
    tools: ['Excel', 'Python', 'R', 'Stata', 'Jupyter', 'JupySQL', 'SQL'],
    skills: ['Econometrics', 'Regression analysis', 'Panel data analysis', 'Policy research', 'OLS and GBM modeling', 'Economic instruction']
  },
  '2026': {
    tools: ['Python', 'pandas', 'NumPy', 'SQL', 'GitHub', 'Streamlit', 'Tableau', 'ChatGPT', 'Claude', 'statsmodels', 'matplotlib', 'requests', 'yfinance', 'Plotly', 'SciPy', 'FRED'],
    skills: ['Route unit economics', 'Dashboard design', 'Forecasting', 'Data validation', 'Attribution analysis', 'Workflow leadership', 'Time-series analysis', 'Sensitivity analysis', 'AI-assisted development']
  }
};
function setYearDetail(year) {
  const data = yearData[year];
  if (!data) return;
  const panel = document.querySelector('#year-detail');
  panel.innerHTML = '<p class="eyebrow">' + year + ' · tools and skills in the work</p>' +
    '<div class="detail-row"><strong>Tools</strong><span>' + data.tools.join(' · ') + '</span></div>' +
    '<div class="detail-row skills-row"><strong>Skills</strong><span>' + data.skills.join(' · ') + '</span></div>';
  document.querySelectorAll('.year-block').forEach((block) => block.classList.toggle('is-active', block.dataset.year === year));
}
document.querySelectorAll('.year-block').forEach((block) => {
  block.addEventListener('pointerenter', () => setYearDetail(block.dataset.year));
  block.addEventListener('focus', () => setYearDetail(block.dataset.year));
  block.addEventListener('click', () => setYearDetail(block.dataset.year));
});

const projectData = {
  valuation: {
    title: 'Valuation Drivers Across Business Models',
    question: 'Which assumptions matter most across different business models?',
    approach: 'A sourced valuation study across 15 companies in five sectors, comparing how DCF assumptions affect value.',
    finding: 'Revenue growth led non-WACC sensitivity for 11 of 15 companies; EBIT margin led for the other 4.',
    link: 'https://github.com/bchandak-120/valuation-assumption-sensitivity-analyzer',
    bars: [36, 49, 61, 73, 91]
  },
  inflation: {
    title: 'Forecasting U.S. Inflation',
    question: 'How do forecast errors change across models and time horizons?',
    approach: 'Compared five models in a strict rolling-origin backtest using CPI, PCE, labor, rates, industrial-production, and energy series.',
    finding: 'The notebook reports RMSE and MAE for the full period, pre-2020, and post-2020, with one- and twelve-month forecast comparisons.',
    link: 'https://github.com/bchandak-120/Inflation-forecasting',
    bars: [60, 42, 72, 53, 86]
  },
  etf: {
    title: 'ETF Creation & Redemption Simulator',
    question: 'When does an ETF premium or discount create a viable arbitrage signal after costs?',
    approach: 'Models NAV from a constituent basket, transaction costs, price deviations, and creation or redemption thresholds.',
    finding: 'The simulator makes the arbitrage mechanics visible; its assumptions simplify execution, liquidity, and market impact.',
    link: 'https://github.com/bchandak-120/etf-creation-redemption-simulator',
    bars: [33, 66, 47, 81, 58]
  },
  semi: {
    title: 'Semiconductor Market Analysis',
    question: 'What patterns emerge across a 3.45-million-row semiconductor dataset?',
    approach: 'Structured a large dataset for time-series and market-geography analysis.',
    finding: 'The project centers on finding and communicating patterns in a dataset too large to inspect row by row.',
    link: 'https://github.com/bchandak-120?tab=repositories',
    bars: [31, 58, 42, 76, 64]
  },
  airbnb: {
    title: 'Demand Persistence and Price Sensitivity in Airbnb Markets',
    question: 'What best explains booking demand across New York City and Seattle listings?',
    approach: 'Built a 126,882-observation listing-month panel and compared OLS and gradient-boosted models.',
    finding: 'Lagged booking rate was the strongest predictor; the model raised explanatory power to approximately 80%.',
    link: 'https://github.com/bchandak-120?tab=repositories',
    bars: [38, 56, 48, 83, 69]
  }
};
function setProject(id) {
  const data = projectData[id];
  if (!data) return;
  document.querySelectorAll('.project-card').forEach((card) => card.classList.toggle('is-selected', card.dataset.project === id));
  const panel = document.querySelector('#project-detail');
  panel.querySelector('h2').textContent = data.title;
  const caseSections = panel.querySelectorAll('.case-section p');
  caseSections[0].textContent = data.question;
  caseSections[1].textContent = data.approach;
  caseSections[2].textContent = data.finding;
  panel.querySelector('#project-link').href = data.link;
  const bars = panel.querySelectorAll('.case-bar');
  bars.forEach((bar, i) => bar.style.setProperty('--h', data.bars[i] + '%'));
}
document.querySelectorAll('.project-card').forEach((card) => card.addEventListener('click', () => setProject(card.dataset.project)));
