import KDEPLASMAICON from "../../assets/KDEPLASMAICON.svg"
import SettingsIcon from "../../assets/Settings.svg"
import LifedumpIcon from "../../assets/Lifedump.svg"
import Speaker from "../../assets/SpeakerIcon.svg"
import EthernetIcon from "../../assets/EthernetIcon.svg"
import { useState, useEffect } from 'react'

export default function BottomNav() {

    const [time, setTime] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    const formatTime = (date) => {
        let hours = date.getHours()
        const minutes = date.getMinutes().toString().padStart(2, '0')
        const ampm = hours >= 12 ? 'PM' : 'AM'
        hours = hours % 12 || 12
        return `${hours}:${minutes} ${ampm}`
    }

    const formatDate = (date) => {
        const month = date.getMonth() + 1
        const day = date.getDate()
        const year = date.getFullYear()
        return `${month}/${day}/${year}`
    }

    return (
        <div className="p-4 w-full h-15 gap-4 bg-[#242729] rounded-[10px] flex flex-row items-center">
            <button className="hover:cursor-pointer"><img src={KDEPLASMAICON} alt="KDE Plasma Icon" className="w-10 h-10" /></button>
            <button className="hover:cursor-pointer"><img src={SettingsIcon} alt="Settings Icon" className="w-10 h-10" /></button>
            <button className="hover:cursor-pointer"><img src={LifedumpIcon} alt="Lifedump Icon" className="w-10 h-10" /></button>
            <div className="ml-auto gap-4 flex flex-row items-center">
                <button className="hover:cursor-pointer"><img src={Speaker} alt="Speaker Icon" className="w-9 h-9" /></button>
                <button className="hover:cursor-pointer"><img src={EthernetIcon} alt="Ethernet Icon" className="w-9 h-9" /></button>
                <div className="flex flex-col items-center gap-1">
                    <span className="text-xs text-white">{formatTime(time)}</span>
                    <span className="text-xs text-white">{formatDate(time)}</span>
                </div>
            </div>
        </div>
    );
}