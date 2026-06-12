import LockScreenNav from '../components/LockScreenNav'
import LockScreenBg from '../../assets/LockScreenBG.png'
import UserAvatar from '../../assets/UserAvatar.svg'
import { useNavigate } from 'react-router-dom'
export default function LockScreen() {
    const navigate = useNavigate()
    return (
        <>
            <LockScreenNav />
            <div className="w-full h-screen relative">
                <img src={LockScreenBg} alt="Lock Screen Background" className="w-full h-full object-cover" />
                
                {/* Dark Overlay - 50% width (right side), 10% transparent (10% opacity) */}
                <div className="absolute inset-y-0 right-0 w-1/2 bg-black opacity-10" style={{backgroundColor: 'rgba(14, 13, 13, 0.9)'}}></div>
                
                {/* Overlay Content */}
                <div className="absolute inset-0">
                    
                    {/* Left Section - Time & Navigation */}
                    <div className="absolute flex flex-col text-center left-100 top-1/2 -translate-y-1/2 ml-10z">
                        <div className="text-white text-5xl font-light mb-2">9:38PM</div>
                        <div className="text-white text-2xl font-light">6/11/2026</div>
                    </div>
                    
                    {/* Center-Right - User Card */}
                    <div className="absolute right-1/3 top-1/2 -translate-y-1/2 flex items-center gap-0">
                        
                        {/* Arrow next to card */}
                        <button className="text-white text-4xl hover:opacity-70 transition -mr-13">
                            &lt;
                        </button>
                        
                        {/* Card & Help Text */}
                        
                        <div className="flex flex-col items-center gap-6 ml-2">
                            
                            {/* User Card Container */}
                            <div className="bg-white p-6 shadow-lg w-44">
                                
                                {/* User Avatar */}
                                <div className="mb-4 h-40 flex items-center justify-center">
                                    <img src={UserAvatar} alt="User Avatar" className="w-full h-full object-contain"></img>
                                </div>
                                
                                {/* Username */}
                                <div className="text-center font-semibold text-lg mb-4">YOSHIEM</div>
                                
                                {/* Password Input */}
                            <input 
                                type="password" 
                                placeholder="Password"
                                className="w-full border border-gray-800 px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                onKeyDown={(e) => e.key === 'Enter' && navigate('/desktop')}
                            />
                            </div>
                            
                            {/* Help Text */}
                            <div className="text-white text-center mt-8 transform translate-x-[40px]">
                                Select your user and enter password
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}