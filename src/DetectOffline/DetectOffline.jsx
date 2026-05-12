import React from "react";
import { MdWifiOff } from "react-icons/md";

export default function DetectOffline() {
    return (
        <div className="fixed top-0 left-0 w-full z-[9999] animate-pulse">
            <div className="bg-rose-600 text-white px-4 py-2 flex items-center justify-center gap-3 shadow-lg border-b border-rose-400">
                <MdWifiOff size={20} />
                <span className="font-bold text-xs">You are currently offline. Some features may be unavailable.</span>
            </div>
        </div>
    );
}