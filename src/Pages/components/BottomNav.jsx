import KDEPLASMAICON from "../../assets/KDEPLASMAICON.svg"
export default function BottomNav() {
    return (
        <div className="p-4 w-full h-15 bg-[#242729] rounded-[10px] flex flex-row items-center">
            <button><img src={KDEPLASMAICON} alt="KDE Plasma Icon" className="w-10 h-10" /></button>
        </div>
    );
}