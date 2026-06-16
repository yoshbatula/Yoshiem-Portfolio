import resumePdf from '../../../assets/YoshBatulaResume.pdf'

export default function ResumeContent() {
  return (
    <div className="flex flex-col h-full bg-[#1b1e20]">
      <div className="bg-[#242729] border-b border-[#3e4446] h-10 px-4 flex items-center text-[#eff0f1] text-xs shrink-0 select-none">
        <div className="flex items-center gap-3">
          <span className="font-semibold tracking-wider text-xs text-[#3daee9]">OKULAR - PDF VIEWER</span>
          <div className="w-[1px] h-4 bg-[#3e4446]" />
          <span className="text-[#a0adb5]">Yosh Batula Resume</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#3e4446] scrollbar-track-transparent bg-[#31363b]">
        <iframe
          src={resumePdf}
          className="w-full h-full border-0"
          title="Resume PDF"
        />
      </div>
    </div>
  )
}
