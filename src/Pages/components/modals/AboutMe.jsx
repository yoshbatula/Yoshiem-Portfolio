import heroImg from '../../../assets/Profile.svg'
// Skill dot-bar component 
function DotBar({ filled = 0, total = 5 }) {
  return (
    <div className="flex gap-[3px] mt-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-[5px] w-5 rounded-sm transition-colors duration-200 ${
            i < filled ? 'bg-[#3daee9]' : 'bg-[#4a5568]'
          }`}
        />
      ))}
    </div>
  )
}

// Skill card 
function SkillCard({ category, name, filled, total = 5 }) {
  return (
    <div className="bg-[#2a2f32] border border-[#3e4446] rounded p-3 hover:border-[#3daee9]/40 transition-colors duration-200">
      <p className="text-[9px] tracking-[0.12em] text-[#7b8f9a] uppercase font-medium">{category}</p>
      <p className="text-[13px] text-[#eff0f1] font-semibold mt-0.5">{name}</p>
      <DotBar filled={filled} total={total} />
    </div>
  )
}

// Sidebar nav item 
function NavItem({ icon, label, active = false }) {
  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 rounded text-xs cursor-pointer transition-colors duration-150 select-none ${
        active
          ? 'bg-[#3daee9]/20 text-[#3daee9] font-semibold'
          : 'text-[#a0adb5] hover:bg-[#3e4446]/50 hover:text-[#eff0f1]'
      }`}
    >
      {icon}
      <span className="truncate">{label}</span>
    </div>
  )
}

// Main component 
export default function AboutMe() {
  const skills = [
    { category: 'LIBRARY',    name: 'React',          filled: 4 },
    { category: 'FRAMEWORK',  name: 'Laravel',        filled: 3 },
    { category: 'LANGUAGE',   name: 'Python',         filled: 3 },
    { category: 'TOOLS',      name: 'Git / Linux',    filled: 4 },
    { category: 'TOOLS',      name: 'Blender',        filled: 1 },
    { category: 'LANGUAGE',   name: 'JavaScript',     filled: 4 },
  ]

  return (
    <div className="flex h-full text-[#eff0f1] font-mono text-xs bg-[#31363b]">

      {/* Sidebar */}
      <aside className="w-[160px] shrink-0 bg-[#272b2d] border-r border-[#3e4446] flex flex-col py-3 px-2 gap-0.5">
        {/* Places heading */}
        <p className="text-[9px] tracking-[0.14em] text-[#596b75] uppercase font-bold px-3 mb-1.5">Places</p>

        <NavItem
          label="About me"
          active
          icon={
            <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
          }
        />

        {/* Spacer */}
        <div className="flex-1" />

        {/* Version tag */}
        <p className="text-[9px] text-[#3e5060] px-3 mt-2">v1.0 · 2025</p>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#3e4446] scrollbar-track-transparent">

        {/* Profile row */}
        <div className="flex gap-5 p-5 border-b border-[#3e4446]">

          {/* Avatar */}
          <div className="relative shrink-0 w-[110px] h-[110px]">
            <img
              src={heroImg}
              alt="Yosh Batula"
              className="w-full h-full object-cover rounded border border-[#3e4446]"
            />
            {/* Online badge */}
            <span className="absolute -bottom-2 right-0 bg-[#27ae60] text-white text-[8px] font-bold tracking-wider px-1.5 py-0.5 rounded-sm">
              ONLINE
            </span>
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center gap-1.5 min-w-0">
            <h2 className="text-[22px] font-bold text-[#eff0f1] tracking-wide leading-none">Yosh Batula</h2>
            <p className="text-[11px] text-[#7b8f9a]">
              @yoshbatula &nbsp;·&nbsp; BS Computer Science &nbsp;·&nbsp; University of Mindanao
            </p>
            <p className="text-[11px] text-[#c5cdd3] leading-relaxed mt-0.5 max-w-[340px]">
              Passionate about software development, web development, and 3D design using Blender. Continuously building projects that enhance my programming, problem-solving, and creative skills while exploring new technologies and contributing to the tech community.
            </p>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex gap-3 px-5 py-4 border-b border-[#3e4446]">
          {/* Stat: years coding */}
          <div className="bg-[#2a2f32] border border-[#3e4446] rounded p-4 flex flex-col justify-center min-w-[120px]">
            <p className="text-[26px] font-bold text-[#eff0f1] leading-none">3+</p>
            <p className="text-[10px] text-[#7b8f9a] mt-1">years coding</p>
          </div>

          {/* Stat: current project */}
          <div className="bg-[#2a2f32] border border-[#3e4446] rounded p-4 flex flex-col justify-center hover:border-[#3daee9]/40 transition-colors cursor-pointer group">
            <p className="text-[13px] font-bold text-[#eff0f1] tracking-wide leading-tight group-hover:text-[#3daee9] transition-colors">
              3D MODEL<br/>PORTFOLIO
            </p>
            <p className="text-[10px] text-[#596b75] mt-1">current project</p>
          </div>
        </div>

        {/* Skills / Tech Stack */}
        <div className="px-5 pt-4 pb-2">
          <p className="text-[10px] tracking-[0.18em] text-[#596b75] uppercase font-bold mb-3">
            Skills / Tech Stack
          </p>

          <div className="grid grid-cols-3 gap-2">
            {skills.map((s, i) => (
              <SkillCard key={i} {...s} />
            ))}
          </div>
        </div>

        {/* ── Education ───────────────────────────────── */}
        <div className="px-5 pt-4 pb-5">
          <p className="text-[10px] tracking-[0.18em] text-[#596b75] uppercase font-bold mb-3">
            Education
          </p>

          <div className="flex gap-5 items-start">
            {/* Date range */}
            <div className="text-[11px] text-[#7b8f9a] shrink-0 leading-relaxed pt-0.5">
              2026 →<br/>present
            </div>

            {/* Detail */}
            <div className="border-l border-[#3e4446] pl-4">
              <p className="text-[13px] font-semibold text-[#eff0f1]">BS Computer Science</p>
              <p className="text-[11px] text-[#eff0f1]/80 mt-0.5">
                University of Mindanao &nbsp;·&nbsp; Davao City
              </p>
              <p className="text-[10px] text-[#596b75] mt-1">Focus: Web Development</p>
            </div>
          </div>
        </div>

      </main>
    </div>
  )
}
