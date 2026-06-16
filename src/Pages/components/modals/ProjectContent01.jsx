import { useState } from 'react'
import UmerchScreenshot from '../../../assets/UmerchScreenshot.svg'
import DonMachosScreenshot from '../../../assets/DonMachosScreenshot.svg'
import NidsScreenshot from '../../../assets/NidsScreenshot.svg'
const PROJECTS = {
  project1: {
    label: 'Project 01',
    title: 'UMERCH (University of Mindanao Merchandise)',
    description: 'UMERCH is a full-stack e-commerce web application for the University of Mindanao, built with Laravel and React. It features a product catalog, shopping cart, checkout system, and admin dashboard for managing inventory and orders.',
    image: UmerchScreenshot,
    deploy: 'https://umerch30-main-edex8f.free.laravel.cloud/',
    tech: [
      { category: 'Backend', items: ['Laravel'] },
      { category: 'Frontend', items: ['React'] },
      { category: 'Styling', items: ['Tailwind CSS'] },
      { category: 'SPA Framework', items: ['Inertia.js'] },
      { category: 'Database', items: ['MySQL'] },
    ],
    github: 'https://github.com/yoshbatula/UMERCH3.0',
    demo: null,
  },
  project2: {
    label: 'Project 02',
    title: 'Don Machos Website Kiosk',
    description: 'Don Machos is a self-service food & beverage ordering kiosk for a coffee shop/cafe. Customers tap the landing page to browse a categorized menu (Coffee, Frappe, Coolers), customize drinks (mood, size, sugar level, quantity), manage a cart, and checkout through payment options — all via a kiosk-style touch interface.',
    image: DonMachosScreenshot,
    deploy: null,
    tech: [
      { category: 'Backend', items: ['PHP 8.2+', 'Laravel 12.x', 'MySQL'] },
      { category: 'Frontend', items: ['Blade', 'Tailwind CSS v4', 'Alpine.js 3.x', 'HTMX 2.x'] },
      { category: 'Tooling', items: ['Vite 7', 'laravel-vite-plugin'] },
      { category: 'Assets', items: ['Google Fonts (Outfit, Roboto)', 'SVG/PNG'] },
    ],
    github: 'https://github.com/yoshbatula/DonMachiatos-Laravel',
    demo: null,
  },
  project3: {
    label: 'Project 03',
    title: 'Hybrid Enhance Nids',
    description: 'A Network Intrusion Detection System (NIDS) using a hybrid stacked ensemble architecture. It combines LightGBM and BaggingClassifier (DecisionTree) as base-level models, with a LogisticRegression meta-learner on top. The system is trained on the CICIDS 2017 and NF-BoT-IoT-V2 datasets, achieving ~96% accuracy and ~99.98% AUC-ROC. It includes a Flask backend (app.py) and a Streamlit real-time dashboard (nids_dashboard.py) for live traffic monitoring.',
    image: NidsScreenshot,
    deploy: 'https://nids-attack-simulation.onrender.com/',
    tech: [
      { category: 'Core ML', items: ['Python', 'scikit-learn', 'LightGBM', 'imbalanced-learn', 'joblib', 'SHAP'] },
      { category: 'Data', items: ['pandas', 'NumPy', 'seaborn', 'matplotlib'] },
      { category: 'Deployment / UI', items: ['Flask', 'Plotly', 'Gunicorn'] },
      { category: 'Notebooks', items: ['Jupyter (.ipynb)'] },
    ],
    github: 'https://github.com/yoshbatula/Hybrid-Enhanced-Stacked-Ensemble-for-Network-Intrusion-Detection',
    demo: null,
  }
}

function NavItem({ label, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-2 rounded text-xs cursor-pointer transition-colors duration-150 select-none ${
        active
          ? 'bg-[#3daee9]/20 text-[#3daee9] font-semibold'
          : 'text-[#a0adb5] hover:bg-[#3e4446]/50 hover:text-[#eff0f1]'
      }`}
    >
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
      </svg>
      <span className="truncate">{label}</span>
    </div>
  )
}

export default function ProjectContent({ projectId }) {
  const [activeId, setActiveId] = useState(projectId || 'project1')
  const project = PROJECTS[activeId]

  if (!project) {
    return (
      <div className="flex h-full items-center justify-center text-[#eff0f1] font-mono text-xs bg-[#31363b]">
        <p className="text-red-400 font-bold text-lg mb-2">Project Not Found</p>
      </div>
    )
  }

  return (
    <div className="flex h-full text-[#eff0f1] font-mono text-xs bg-[#31363b]">
      {/* Sidebar */}
      <aside className="w-[160px] shrink-0 bg-[#272b2d] border-r border-[#3e4446] flex flex-col py-3 px-2 gap-0.5">
        <p className="text-[9px] tracking-[0.14em] text-[#596b75] uppercase font-bold px-3 mb-1.5">Projects</p>
        {Object.entries(PROJECTS).map(([id, p]) => (
          <NavItem
            key={id}
            projectId={id}
            label={p.label}
            active={activeId === id}
            onClick={() => setActiveId(id)}
          />
        ))}
        <div className="flex-1" />
        <p className="text-[9px] text-[#3e5060] px-3 mt-2">v1.0 · 2026</p>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#3e4446] scrollbar-track-transparent px-5 md:px-8 lg:px-12 xl:px-16 py-5 lg:py-8 space-y-6 lg:space-y-8 xl:space-y-10">
        {/* Title */}
        <div>
          <h2 className="text-lg md:text-xl lg:text-[24px] xl:text-[26px] font-bold text-white tracking-wide">{project.title}</h2>
        </div>

        {/* Image */}
        <div>
          {project.image ? (
            <img src={project.image} alt={project.title} className="w-full max-w-2xl md:max-w-3xl xl:max-w-4xl aspect-video object-cover rounded-lg border border-[#3e4446]" />
          ) : (
            <div className="w-full max-w-2xl md:max-w-3xl xl:max-w-4xl aspect-video rounded-lg border border-[#3e4446] bg-[#272b2d] flex items-center justify-center text-[#596b75] text-[11px]">
              <span>Project screenshot</span>
            </div>
          )}
        </div>

        {/* Overview */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <p className="text-[10px] tracking-[0.18em] text-[#596b75] uppercase font-bold">Overview</p>
            <div className="h-px flex-1 bg-[#3e4446]" />
          </div>
          <p className="text-[13px] lg:text-[14px] leading-relaxed text-[#eff0f1]/90 max-w-prose lg:max-w-2xl">
            {project.description}
          </p>
        </div>

        {/* Tech Stack */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <p className="text-[10px] tracking-[0.18em] text-[#596b75] uppercase font-bold">Tech Stack</p>
            <div className="h-px flex-1 bg-[#3e4446]" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-2.5">
            {project.tech.map((group, idx) => (
              <div key={idx} className="bg-[#272b2d] border border-[#3e4446] rounded-lg p-3 hover:border-[#3daee9]/30 transition-colors duration-200">
                <p className="text-[10px] text-[#7b8f9a] font-medium mb-2 tracking-wide">{group.category}</p>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-1 rounded bg-[#1b1e20] border border-[#3e4446] text-[#3daee9]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GitHub / Deploy */}
        <div className="flex gap-3 pt-2">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#3daee9] hover:bg-[#299cd1] text-white font-medium text-xs transition-all duration-200 cursor-pointer hover:scale-[1.02]"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span>Source</span>
          </a>
          {project.deploy && (
            <a
              href={project.deploy}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#31363b] border border-[#3e4446] hover:bg-[#444a50] hover:border-[#3daee9]/40 text-[#eff0f1] font-medium text-xs transition-all duration-200 cursor-pointer hover:scale-[1.02]"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
              <span>Deployment</span>
            </a>
          )}
        </div>
      </main>
    </div>
  )
}
