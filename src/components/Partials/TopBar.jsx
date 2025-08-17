import { getCurrentWindow } from '@tauri-apps/api/window';
import {useEffect} from "react";

const appWindow = getCurrentWindow();

const TopBar = () => {
    const buttonClasses = "size-[15px] rounded-full cursor-pointer";

    const handleMinimize = () => {
        appWindow.minimize()
    }

    const handleMaximize = () => {
        appWindow.toggleMaximize()
    }

    const handleClose = () => {
        appWindow.close()
    }

    return (
        <div className="titlebar px-3 h-10 bg-dark-2 flex justify-between">
            <div className="controls flex items-center gap-2">
                <button id="titlebar-close" title="close" onClick={handleClose} className={`${buttonClasses} bg-[#FC5753]`}></button>
                <button id="titlebar-minimize" title="minimize" onClick={handleMinimize} className={`${buttonClasses} bg-[#FDBC40]`}></button>
                <button id="titlebar-maximize" title="maximize" onClick={handleMaximize} className={`${buttonClasses} bg-[#36C84B]`}></button>
            </div>
            <div data-tauri-drag-region className={"flex-1"}></div>
        </div>
    )
}

export default TopBar;