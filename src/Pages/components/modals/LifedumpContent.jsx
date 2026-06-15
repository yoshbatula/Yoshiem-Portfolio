export default function LifedumpContent() {
  const posts = [
    {
      date: 'June 15, 2026',
      title: 'Integrating Tailwind v4 with Vite 8',
      content: 'Migrated the portfolio configuration to Tailwind v4. The new @theme directive and CSS-first configuration model make index.css the central hub for styling rules, which is cleaner than maintaining a separate tailwind.config.js.'
    },
    {
      date: 'June 10, 2026',
      title: 'Designing KDE Plasma Window Decorations',
      content: 'Wrote a custom React state controller for draggable and resizable windows. The goal was to emulate standard OS behaviors (drag thresholds, maximize toggles, window grouping) without bloated external packages.'
    },
    {
      date: 'May 28, 2026',
      title: 'Automating Arch Linux Installations',
      content: 'Finally completed my automated bash script for Arch Linux. It supports LUKS encryption, partitions disks, configures Grub, installs Pipewire/NetworkManager, and sets up a clean KDE environment out of the box.'
    },
    {
      date: 'April 15, 2026',
      title: 'The Beauty of Wayland',
      content: 'After using X11 for years, I fully committed to Wayland on Plasma. Fractional scaling is noticeably smoother, and multi-monitor setups no longer suffer from mismatched refresh rates. The transition was completely worth it.'
    }
  ]

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 text-[#eff0f1]">
      <div className="border-b border-[#3e4446] pb-4">
        <h2 className="text-2xl font-bold text-white tracking-wide">Yoshiem's Lifedump</h2>
        <p className="text-xs text-[#a5a6a7] mt-1 font-medium">Random updates, code findings, and digital logs.</p>
      </div>

      <div className="space-y-6">
        {posts.map((post, index) => (
          <article 
            key={index} 
            className="bg-[#212426] p-5 rounded-lg border border-[#3e4446] hover:border-[#3daee9]/40 transition-colors space-y-2.5"
          >
            <div className="flex items-center justify-between text-xs text-[#a5a6a7] font-mono">
              <span>📅 {post.date}</span>
              <span className="bg-[#3daee9]/10 text-[#3daee9] px-2 py-0.5 rounded border border-[#3daee9]/25 font-bold">LOG #{posts.length - index}</span>
            </div>
            <h3 className="text-base font-bold text-white tracking-tight">{post.title}</h3>
            <p className="text-sm leading-relaxed text-[#eff0f1]/80 pt-1">
              {post.content}
            </p>
          </article>
        ))}
      </div>
    </div>
  )
}
