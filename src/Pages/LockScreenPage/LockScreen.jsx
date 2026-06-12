import LockScreenNav from '../components/LockScreenNav'
import LockScreenBg from '../../assets/LockScreenBG.png'
export default function LockScreen() {
    return (
        <>
            <LockScreenNav />
            <div className="w-full h-screen">
                <img src={LockScreenBg} alt="Lock Screen Background" className="w-full h-full object-cover" />
            </div>
        </>
    );
}