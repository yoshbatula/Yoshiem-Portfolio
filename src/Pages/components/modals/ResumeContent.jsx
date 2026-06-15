import { useState } from 'react'

export default function ResumeContent() {
  const [zoom, setZoom] = useState(100)

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    // Generate a simple print-based download or trigger browser print
    window.print()
  }

  return (
    <div className="flex flex-col h-full bg-[#1b1e20] text-black">
      {/* Okular-like Document Viewer Toolbar */}
      <div className="bg-[#242729] border-b border-[#3e4446] h-10 px-4 flex items-center justify-between text-[#eff0f1] text-xs shrink-0 select-none">
        <div className="flex items-center gap-3">
          <span className="font-semibold tracking-wider text-xs text-[#3daee9]">OKULAR - MOCK READER</span>
          <div className="w-[1px] h-4 bg-[#3e4446]" />
          <span>Page 1 of 1</span>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setZoom(z => Math.max(50, z - 10))}
            className="w-6 h-6 rounded bg-[#31363b] border border-[#3e4446] hover:bg-[#3daee9]/20 flex items-center justify-center font-bold"
          >
            -
          </button>
          <span className="w-12 text-center">{zoom}%</span>
          <button 
            onClick={() => setZoom(z => Math.min(150, z + 10))}
            className="w-6 h-6 rounded bg-[#31363b] border border-[#3e4446] hover:bg-[#3daee9]/20 flex items-center justify-center font-bold"
          >
            +
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button 
            onClick={handlePrint}
            className="px-2.5 py-1 rounded bg-[#3daee9] hover:bg-[#299cd1] text-white font-medium transition-colors"
          >
            Print
          </button>
          <button 
            onClick={handleDownload}
            className="px-2.5 py-1 rounded bg-[#31363b] border border-[#3e4446] hover:bg-[#444a50] text-[#eff0f1] font-medium transition-colors"
          >
            Download
          </button>
        </div>
      </div>

      {/* Viewer Body */}
      <div className="flex-1 overflow-auto p-8 flex justify-center bg-[#31363b] pattern-grid">
        {/* PDF Simulated Sheet */}
        <div 
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
          className="w-[8.5in] min-h-[11in] bg-white p-[0.8in] shadow-2xl transition-transform duration-200 flex flex-col justify-between border border-gray-300"
        >
          {/* Header */}
          <div className="border-b-2 border-gray-800 pb-4">
            <h1 className="text-3xl font-black tracking-tight text-gray-900">YOSHIEM BATULA</h1>
            <p className="text-sm font-semibold tracking-wider text-gray-600 uppercase mt-1">Full-Stack Software Engineer</p>
            
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs text-gray-500 font-mono">
              <span>🌐 yoshiem.dev</span>
              <span>✉️ contact@yoshiem.dev</span>
              <span>📱 +63 900 000 0000</span>
              <span>📍 Manila, Philippines</span>
            </div>
          </div>

          {/* Main content grid */}
          <div className="mt-6 space-y-6 text-xs text-gray-800 leading-relaxed">
            
            {/* Professional Summary */}
            <div className="space-y-1.5">
              <h2 className="text-xs font-bold tracking-widest text-gray-950 uppercase border-b border-gray-200 pb-1">Profile</h2>
              <p>
                Highly motivated and results-oriented Software Engineer with experience in designing, building, and deploying robust full-stack web applications. Proactive problem solver with a strong background in JavaScript/TypeScript ecosystems (React, Next.js, Node.js) and a deep interest in Unix systems administration, Shell configuration, and desktop environment customization.
              </p>
            </div>

            {/* Technical Skills */}
            <div className="space-y-1.5">
              <h2 className="text-xs font-bold tracking-widest text-gray-950 uppercase border-b border-gray-200 pb-1">Skills</h2>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <h3 className="font-bold text-gray-900 mb-1 font-mono">LANGUAGES</h3>
                  <p>JavaScript (ES6+), TypeScript, HTML5, CSS3, SQL, Shell Scripting (Bash/Zsh)</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1 font-mono">FRAMEWORKS &amp; LIBS</h3>
                  <p>React.js, Next.js, Node.js, Express, Tailwind CSS, Vue.js, Redux Toolkit</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1 font-mono">TOOLS &amp; SYSTEMS</h3>
                  <p>Arch Linux, Git, Docker, PostgreSQL, MongoDB, Redis, Webpack, Vite</p>
                </div>
              </div>
            </div>

            {/* Professional Experience */}
            <div className="space-y-3">
              <h2 className="text-xs font-bold tracking-widest text-gray-950 uppercase border-b border-gray-200 pb-1">Experience</h2>
              
              {/* Job 1 */}
              <div className="space-y-1">
                <div className="flex justify-between font-bold text-gray-900">
                  <span>FULL STACK ENGINEER | TECH SOLUTIONS INC.</span>
                  <span className="font-mono text-gray-500">2024 – PRESENT</span>
                </div>
                <ul className="list-disc pl-4 space-y-0.5 text-gray-700">
                  <li>Spearheaded integration of responsive UI dashboards using React 19 and Tailwind CSS, improving core web vitals by 20%.</li>
                  <li>Optimized Express backend APIs and PostgreSQL databases, lowering average response latency from 250ms to 90ms.</li>
                  <li>Maintained and automated container deployments via Docker and GitHub Actions, speeding up release pipelines by 40%.</li>
                </ul>
              </div>

              {/* Job 2 */}
              <div className="space-y-1">
                <div className="flex justify-between font-bold text-gray-900">
                  <span>JUNIOR WEB DEVELOPER | CREATIVE WEB STUDIO</span>
                  <span className="font-mono text-gray-500">2022 – 2024</span>
                </div>
                <ul className="list-disc pl-4 space-y-0.5 text-gray-700">
                  <li>Built responsive landing pages and single-page apps using Vue.js, Tailwind CSS, and headless CMS systems.</li>
                  <li>Tested web elements to ensure cross-device consistency and compatibility with strict W3C standards.</li>
                  <li>Assisted in setting up Linux staging servers, configure Nginx reverse proxies, and manage SSL certificate renewal.</li>
                </ul>
              </div>
            </div>

            {/* Key Projects */}
            <div className="space-y-3">
              <h2 className="text-xs font-bold tracking-widest text-gray-950 uppercase border-b border-gray-200 pb-1">Projects</h2>
              
              <div className="space-y-1">
                <span className="font-bold text-gray-900">Yoshiem Portfolio OS (KDE Plasma Simulator)</span>
                <p className="text-gray-700">An interactive operating system simulator built in React, mimicking a system initialization logs sequence, lock screen, and fully functioning window-manager interface with dragging, resizing, and system utility windows.</p>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-gray-900">Arch Auto-Install Script</span>
                <p className="text-gray-700">A modular Bash script to automate standard Arch Linux base installation, package config, network setups, audio/display servers, and theme setups for KDE Plasma.</p>
              </div>
            </div>

            {/* Education */}
            <div className="space-y-1.5">
              <h2 className="text-xs font-bold tracking-widest text-gray-950 uppercase border-b border-gray-200 pb-1">Education</h2>
              <div className="flex justify-between font-bold text-gray-900">
                <span>B.S. IN COMPUTER SCIENCE | UNIVERSITY OF MANILA</span>
                <span className="font-mono text-gray-500">2018 – 2022</span>
              </div>
              <p className="text-gray-700">Graduated with honors. Specialization in Software Engineering and Network Systems.</p>
            </div>

          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 pt-3 text-center text-[10px] text-gray-400 font-mono mt-8 select-none">
            Yoshiem Batula &copy; 2026. Powered by React + Vite.
          </div>
        </div>
      </div>
    </div>
  )
}
