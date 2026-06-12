import BackgroundImage from "../../assets/BackgroundImage.png"
import BottomNav from "../components/BottomNav"
export default function Desktop() {
 

  return (
    <>
      <div className="w-full h-screen relative">
        <img src={BackgroundImage} alt="Background" className="w-full h-full object-cover" />
          <div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="transform translate-y-[-5%] absolute inset-0 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center">
                  <h1 className="text-white text-[41px] font-light">WELCOME TO MY</h1>
                </div>
                <div className="mt-10 absolute inset-0 flex items-center justify-center">
                    <h1 className="text-white text-[80px] font-light absolute inset-0 flex items-center justify-center translate-y-20 font-display">PORTFOLIO</h1>
                </div>
              </div>
            </div>
            <div className="p-6 absolute inset-0 top-[90%] flex">
              <BottomNav />
            </div>
          </div>
      </div>
    </>
  )
}