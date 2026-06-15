import UserAvatar from '../../../assets/UserAvatar.svg'

export default function AboutMe() {
  const skills = [
    { name: 'React / Next.js', level: 90, category: 'Frontend' },
    { name: 'JavaScript / TypeScript', level: 85, category: 'Frontend' },
    { name: 'Tailwind CSS / Vanilla CSS', level: 95, category: 'Frontend' },
    { name: 'Node.js / Express', level: 80, category: 'Backend' },
    { name: 'PostgreSQL / MongoDB', level: 75, category: 'Backend' },
    { name: 'Arch Linux / Bash scripting', level: 85, category: 'DevOps' },
    { name: 'Docker / Git / CI-CD', level: 80, category: 'DevOps' },
  ]

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8 text-[#eff0f1]">
      {/* Header Profile */}
      <div className="flex flex-col md:flex-row items-center gap-6 border-b border-[#3e4446] pb-6">
        <div className="w-28 h-28 rounded-full bg-[#1b1e20] border-2 border-[#3daee9] p-2 flex items-center justify-center shadow-lg">
          <img src={UserAvatar} alt="Yoshiem Avatar" className="w-full h-full object-contain" />
        </div>
        <div className="text-center md:text-left space-y-2">
          <h2 className="text-2xl font-bold text-white tracking-wide">Yoshiem Batula</h2>
          <p className="text-[#3daee9] font-medium">Full-Stack Developer &amp; Linux Enthusiast</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-1.5 text-xs text-[#a5a6a7]">
            <span className="bg-[#212426] px-2.5 py-1 rounded border border-[#3e4446]">📍 Manila, Philippines</span>
            <span className="bg-[#212426] px-2.5 py-1 rounded border border-[#3e4446]">💻 yoshiem.dev</span>
            <span className="bg-[#212426] px-2.5 py-1 rounded border border-[#3e4446]">✉️ contact@yoshiem.dev</span>
          </div>
        </div>
      </div>

      {/* Bio Section */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-white border-l-3 border-[#3daee9] pl-3">Biography</h3>
        <p className="leading-relaxed text-sm text-[#eff0f1]/90">
          Hello! I'm Yoshiem, a software engineer with a deep passion for writing clean, optimized code and crafting beautiful web applications. 
          I love operating systems, particularly Arch Linux and customizing KDE Plasma desktops, which inspired this portfolio. 
          My development philosophy focuses on performance, pixel-perfect UI execution, and user experience.
        </p>
      </div>

      {/* Skills Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white border-l-3 border-[#3daee9] pl-3">Technical Skills</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map((skill, index) => (
            <div key={index} className="bg-[#212426] p-3.5 rounded border border-[#3e4446] space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-white">{skill.name}</span>
                <span className="text-[#3daee9]">{skill.level}%</span>
              </div>
              <div className="w-full bg-[#1b1e20] h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-[#3daee9] h-full rounded-full transition-all duration-1000 ease-out" 
                  style={{ width: `${skill.level}%` }}
                />
              </div>
              <span className="inline-block text-[10px] text-[#a5a6a7] bg-[#31363b] px-2 py-0.5 rounded border border-[#3e4446]">
                {skill.category}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Work Experience Timeline */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white border-l-3 border-[#3daee9] pl-3">Experience</h3>
        <div className="space-y-6 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-[1px] before:bg-[#3e4446]">
          
          {/* Job 1 */}
          <div className="relative pl-8 space-y-1 group">
            <div className="absolute left-2 top-1.5 w-3 h-3 rounded-full bg-[#3daee9] border border-[#242729] group-hover:scale-125 transition-transform" />
            <div className="flex flex-wrap items-center justify-between text-sm">
              <h4 className="font-bold text-white">Full Stack Software Engineer</h4>
              <span className="text-xs text-[#a5a6a7] bg-[#212426] px-2 py-0.5 rounded border border-[#3e4446]">2024 - Present</span>
            </div>
            <p className="text-xs text-[#3daee9] font-medium">Tech Solutions Inc.</p>
            <p className="text-xs text-[#eff0f1]/80 leading-relaxed pt-1">
              Developed and maintained key microservices using Node.js and React. Boosted system performance by 30% by optimizing database queries and caching strategies in Redis. Collaborated with designers to deliver responsive, user-friendly UI dashboards.
            </p>
          </div>

          {/* Job 2 */}
          <div className="relative pl-8 space-y-1 group">
            <div className="absolute left-2 top-1.5 w-3 h-3 rounded-full bg-[#3e4446] border border-[#242729] group-hover:bg-[#3daee9] group-hover:scale-125 transition-all" />
            <div className="flex flex-wrap items-center justify-between text-sm">
              <h4 className="font-bold text-white">Junior Front-End Developer</h4>
              <span className="text-xs text-[#a5a6a7] bg-[#212426] px-2 py-0.5 rounded border border-[#3e4446]">2022 - 2024</span>
            </div>
            <p className="text-xs text-[#3daee9] font-medium">Creative Web Studio</p>
            <p className="text-xs text-[#eff0f1]/80 leading-relaxed pt-1">
              Designed custom websites for clients using Vue.js and Tailwind CSS. Built interactive features, form validations, and integrated REST APIs. Ensured SEO-optimized structures and cross-browser responsiveness.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
