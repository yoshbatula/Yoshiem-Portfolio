import { useNavigate } from 'react-router-dom'
import USFlag from "../../assets/US-ICON.svg"
import RebootIcon from "../../assets/RestartButtonIcon.svg"
import ShutdownIcon from "../../assets/PowerOffIcon.svg"
export default function LockScreenNav() {
    const navigate = useNavigate()
    return (
        <div className="p-7 flex flex-row bg-white w-full h-14 items-center">
            <div className="flex flex-row items-center gap-3">
                <h1 className="text-[20px]">Session</h1>
                <input className="p-2 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" value="Plasma (Wayland)"></input>
                <div className="flex flex-row items-center gap-3">
                    <h1 className="text-[20px]">Layout</h1>
                </div>
                <button className="gap-2 p-2 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 flex flex-row items-center">
                    <img src={USFlag} alt="US Flag" className="w-10 h-5"></img>
                    <p>US</p>
                </button>
            </div>
            <div className="flex ml-auto gap-3">
                <button className="hover:cursor-pointer" onClick={() => navigate('/restart')}><img src={RebootIcon} alt="Reboot" className="w-10 h-10 hover:opacity-75 transition"></img></button>
                <button className="hover:cursor-pointer" onClick={() => navigate('/shutdown')}><img src={ShutdownIcon} alt="Shutdown" className="w-10 h-10 hover:opacity-75 transition"></img></button>
            </div>
        </div>
    );
}