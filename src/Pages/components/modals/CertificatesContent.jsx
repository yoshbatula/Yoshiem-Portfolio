import DatabasesCert from '../../../assets/DatabasesCertificate.png'
import CybersecurityCert from '../../../assets/CybersecurityCertificate.png'
import FileIcon from '../../../assets/FileIcon.svg'

const certs = [
  { id: 'databases', title: 'Databases Certificate', image: DatabasesCert },
  { id: 'cybersecurity', title: 'Cybersecurity Certificate', image: CybersecurityCert },
]

export default function CertificatesContent() {
  return (
    <div className="flex h-full text-[#eff0f1] font-mono text-xs bg-[#31363b]">
      <aside className="w-[160px] shrink-0 bg-[#272b2d] border-r border-[#3e4446] flex flex-col py-3 px-2 gap-0.5">
        <p className="text-[9px] tracking-[0.14em] text-[#596b75] uppercase font-bold px-3 mb-1.5">Places</p>
        <div className="flex items-center gap-2 px-3 py-2 rounded text-xs bg-[#3daee9]/20 text-[#3daee9] font-semibold select-none">
          <img src={FileIcon} alt="" className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">Certificates</span>
        </div>
        <div className="flex-1" />
        <p className="text-[9px] text-[#3e5060] px-3 mt-2">v1.0 · 2026</p>
      </aside>
      <main className="flex-1 overflow-y-auto p-5 flex flex-col gap-5">
        <p className="text-[10px] tracking-[0.18em] text-[#596b75] uppercase font-bold">Certificates</p>
        {certs.map(cert => (
          <div key={cert.id} className="bg-[#2a2f32] border border-[#3e4446] rounded p-4">
            <p className="text-[13px] font-semibold text-[#eff0f1] mb-3">{cert.title}</p>
            <img
              src={cert.image}
              alt={cert.title}
              className="w-full max-w-2xl object-contain rounded border border-[#3e4446]"
            />
          </div>
        ))}
      </main>
    </div>
  )
}
