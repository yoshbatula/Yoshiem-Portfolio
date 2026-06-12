import BackgroundImage from "../../assets/BackgroundImage.png"
import BottomNav from "../components/BottomNav"
import FileIcon from "../../assets/FileIcon.svg"
import FolderIcon from "../../assets/FolderIcon.svg"
export default function Desktop() {
 

  return (
    <>
      <div className="w-full h-screen relative">
        {/* Background Image */}
        <img src={BackgroundImage} alt="Background" className="w-full h-full object-cover" />
          <div>
            <div className="absolute inset-0 flex">
              <div className="transform translate-y-[-5%] absolute inset-0 flex items-center justify-center">
                {/* Welcome Text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <h1 className="text-white text-[41px] font-light">WELCOME TO MY</h1>
                </div>
                <div className="mt-10 absolute inset-0 flex items-center justify-center">
                    <h1 className="text-white text-[80px] font-light absolute inset-0 flex items-center justify-center translate-y-20 font-display">PORTFOLIO</h1>
                </div>
              </div>

              {/* Resume Icon */}
              <div className="absolute inset-0 flex flex-col items-start top-[45%] left-[5%] mt-3">
                  <button className="flex flex-col items-center hover:cursor-pointer hover:bg-blue-500/20 w-25 hover:rounded-md">
                      <img src={FileIcon} alt="Resume" className="w-16 h-16" />
                      <span className="text-white text-sm mt-2 text-center max-w-[80px] leading-tight">Resume.pdf</span>
                  </button>
              </div>

              {/* About Me */}
              <div className="absolute inset-0 flex flex-col items-start top-[65%] left-[14%] mt-3">
                  <button className="flex flex-col items-center hover:cursor-pointer hover:bg-blue-500/20 w-25 hover:rounded-md">
                      <img src={FolderIcon} alt="About Me" className="w-16 h-16" />
                      <span className="text-white text-sm mt-2 text-center max-w-[80px] leading-tight">About me</span>
                  </button>
              </div>

              {/* Project 01 */}
              <div className="absolute inset-0 flex flex-col items-start top-[10%] left-[90%] mt-3">
                  <button className="flex flex-col items-center hover:cursor-pointer hover:bg-blue-500/20 w-25 hover:rounded-md leading-tight">
                      <img src={FolderIcon} alt="Project 01" className="w-16 h-16" />
                      <span className="text-white text-sm mt-2 text-center max-w-[80px] leading-tight">Project 01 (UMERCH)</span>
                  </button>
              </div>

               {/* Project 02 */}
              <div className="absolute inset-0 flex flex-col items-start top-[30%] left-[83%] mt-3">
                  <button className="flex flex-col items-center hover:cursor-pointer hover:bg-blue-500/20 w-25 hover:rounded-md leading-tight">
                      <img src={FolderIcon} alt="Project 01" className="w-16 h-16" />
                      <span className="text-white text-sm mt-2 text-center max-w-[80px] leading-tight">Project 02 (WEBSITE DON MACHIATOS KIOSK)</span>
                  </button>
              </div>

              {/* Project 03 */}
              <div className="absolute inset-0 flex flex-col items-start top-[60%] left-[88%] mt-3">
                  <button className="flex flex-col items-center hover:cursor-pointer hover:bg-blue-500/20 w-25 hover:rounded-md leading-tight">
                      <img src={FolderIcon} alt="Project 01" className="w-16 h-16" />
                      <span className="text-white text-sm mt-2 text-center max-w-[80px] leading-tight">Project 03 (HYBRID ENHANCE NIDS)</span>
                  </button>
              </div>

            </div>
            {/* Bottom Navigation */}
            <div className="p-6 absolute inset-0 top-[90%] flex">
              <BottomNav />
            </div>
          </div>
      </div>
    </>
  )
}