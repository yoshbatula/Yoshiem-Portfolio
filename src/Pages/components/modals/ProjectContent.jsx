const PROJECT_DATA = {
  project1: {
    title: 'Arch Linux Modular Auto-Installer',
    subtitle: 'Automated modular installation scripts for Arch Linux & custom KDE builds.',
    description: 'A robust, modular Bash script designed to automate the installation and initial configuration of Arch Linux. It handles everything from disk partitioning and LUKS encryption to display managers and custom dotfiles setups, drastically reducing the system provisioning time.',
    tech: ['Bash', 'Shell Scripting', 'Systemd', 'Arch Linux', 'GRUB'],
    features: [
      'Interactive disk partitioning using parted and sfdisk with UEFI support.',
      'Optional automated LUKS2 disk encryption configuration.',
      'Dynamic mirror list updates and parallel package downloads.',
      'Automated desktop environment installation (KDE Plasma/Wayland default).',
      'Configures system services: NetworkManager, pipewire, docker, UFW.'
    ],
    github: 'https://github.com/yoshbatula/arch-autoinstall',
    demo: null,
    stats: { stars: 124, forks: 38, license: 'MIT' }
  },
  project2: {
    title: 'KDE Plasma Theme Configurator',
    subtitle: 'An Electron-based theme editor and live preview tool for KDE Plasma desktops.',
    description: 'An open-source desktop application that simplifies the creation and modification of KDE Plasma theme files. It provides a visual interface for editing colors, widget coordinates, panels, and window borders, with instant preview capabilities.',
    tech: ['Electron', 'React', 'Node.js', 'KDE Plasma APIs', 'SVG'],
    features: [
      'Live interactive desktop layout mock showing changes in real-time.',
      'Easy customization of color palettes matching Breeze Dark standards.',
      'Automatic configuration packaging into Plasma-compatible tarballs.',
      'One-click publishing to the KDE Store via Open Collaboration API.',
      'Built-in validation to check for broken assets or missing SVG elements.'
    ],
    github: 'https://github.com/yoshbatula/plasma-theme-configurator',
    demo: 'https://plasma-editor.yoshiem.dev',
    stats: { stars: 87, forks: 12, license: 'GPL-3.0' }
  },
  project3: {
    title: 'Interactive Desktop Portfolio (This Project)',
    subtitle: 'A web-based KDE Plasma simulator built using React, Vite, and Tailwind CSS.',
    description: 'A portfolio application modeled after a Linux boot sequence and lock screen, culminating in a responsive, desktop-like operating system interface. Features custom components for draggable/resizable windows, focus ordering, and simulation of desktop tools.',
    tech: ['React 19', 'Vite', 'Tailwind CSS v4', 'JavaScript', 'HTML5'],
    features: [
      'Interactive boot log screen displaying simulated Linux kernel logs.',
      'Draggable and resizable window manager with dynamic Z-Index layering.',
      'Simulated PDF viewer (Okular replica) with interactive scaling and print actions.',
      'Fully functioning bottom bar with system clock, notifications, and application launcher.',
      'Responsive design adapting gracefully to all desktop resolutions.'
    ],
    github: 'https://github.com/yoshbatula/Yoshiem-Portfolio',
    demo: 'https://yoshiem.dev',
    stats: { stars: 45, forks: 5, license: 'MIT' }
  }
}

export default function ProjectContent({ projectId }) {
  const project = PROJECT_DATA[projectId]

  if (!project) {
    return (
      <div className="p-8 text-center text-[#eff0f1]">
        <p className="text-red-400 font-bold text-lg mb-2">Project Not Found</p>
        <p className="text-xs text-[#a5a6a7]">The project you are trying to view does not exist.</p>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 text-[#eff0f1]">
      {/* Title block */}
      <div className="border-b border-[#3e4446] pb-4 space-y-1">
        <h2 className="text-2xl font-bold text-white tracking-wide">{project.title}</h2>
        <p className="text-sm text-[#a5a6a7] font-medium">{project.subtitle}</p>
      </div>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2">
        {project.tech.map((t, idx) => (
          <span 
            key={idx} 
            className="text-xs font-semibold px-2.5 py-1 rounded bg-[#212426] border border-[#3e4446] text-[#3daee9]"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Description */}
      <div className="space-y-2.5">
        <h3 className="text-sm font-bold uppercase tracking-wider text-white">Overview</h3>
        <p className="text-sm leading-relaxed text-[#eff0f1]/90 bg-[#212426]/50 p-4 rounded border border-[#3e4446]/60">
          {project.description}
        </p>
      </div>

      {/* Features */}
      <div className="space-y-2.5">
        <h3 className="text-sm font-bold uppercase tracking-wider text-white">Key Features</h3>
        <ul className="space-y-2">
          {project.features.map((feat, idx) => (
            <li key={idx} className="flex gap-2 text-sm leading-relaxed">
              <span className="text-[#3daee9] select-none">➜</span>
              <span className="text-[#eff0f1]/80">{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* GitHub & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-[#3e4446]">
        {/* Repo Stats */}
        <div className="bg-[#212426] p-4 rounded border border-[#3e4446] flex justify-around items-center text-center">
          <div>
            <div className="text-lg font-bold text-white">{project.stats.stars}</div>
            <div className="text-[10px] text-[#a5a6a7] uppercase tracking-wider">Stars</div>
          </div>
          <div className="w-[1px] h-8 bg-[#3e4446]" />
          <div>
            <div className="text-lg font-bold text-white">{project.stats.forks}</div>
            <div className="text-[10px] text-[#a5a6a7] uppercase tracking-wider">Forks</div>
          </div>
          <div className="w-[1px] h-8 bg-[#3e4446]" />
          <div>
            <div className="text-lg font-bold text-white">{project.stats.license}</div>
            <div className="text-[10px] text-[#a5a6a7] uppercase tracking-wider">License</div>
          </div>
        </div>

        {/* Action Links */}
        <div className="flex flex-col justify-center gap-2">
          <a 
            href={project.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded bg-[#3daee9] hover:bg-[#299cd1] text-white font-medium text-sm transition-colors cursor-pointer"
          >
            <span>View Source on GitHub</span>
          </a>
          {project.demo && (
            <a 
              href={project.demo} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded bg-[#31363b] border border-[#3e4446] hover:bg-[#444a50] text-[#eff0f1] font-medium text-sm transition-colors cursor-pointer"
            >
              <span>Launch Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
