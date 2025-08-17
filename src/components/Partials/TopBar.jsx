import {getCurrentWindow} from '@tauri-apps/api/window';
import {useState} from "react";
import CloseIcon from "@/icons/CloseIcon.jsx";
import CornerOpen from "@/icons/CornerOpen.jsx";
import DashIcon from "@/icons/DashIcon.jsx";

const appWindow = getCurrentWindow();

const TopBar = () => {
    const [fullscreen, setFullscreen] = useState(false);
    const buttonClasses = "size-[24px] transition-all duration-200 hover:bg-dark-4 rounded-full cursor-pointer bg-dark-3 flex justify-center items-center";

    const handleMinimize = () => {
        appWindow.minimize()
    }

    const handleMaximize = () => {
        appWindow.toggleMaximize()

        appWindow.isMaximized().then(isMX => {
            if (isMX) {
                setFullscreen(true);
            } else {
                setFullscreen(false);
            }
        })
    }

    const handleClose = () => {
        appWindow.close()
    }

    return (<div className="titlebar px-3 h-10 bg-dark-2 flex justify-between">
            <div className="controls flex items-center gap-2">
                <button id="titlebar-close" title="close" onClick={handleClose} className={`${buttonClasses}`}>
                    <CloseIcon/>
                </button>

                <button id="titlebar-maximize" title="maximize" onClick={handleMaximize} className={`${buttonClasses}`}>
                    {fullscreen ? <CornerOpen/> : ""}
                </button>

                <button id="titlebar-minimize" title="minimize" onClick={handleMinimize} className={`${buttonClasses}`}>
                    <DashIcon/>
                </button>
            </div>
            <div data-tauri-drag-region className={"flex-1"}></div>
        </div>)
}

export default TopBar;