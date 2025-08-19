import {getCurrentWindow} from '@tauri-apps/api/window';
import CloseIcon from "@/icons/CloseIcon.jsx";
import CornerOpen from "@/icons/CornerOpen.jsx";
import DashIcon from "@/icons/DashIcon.jsx";

const appWindow = getCurrentWindow();

const TopBar = () => {
    const buttonClasses = "size-[24px] transition-all duration-200 hover:bg-dark-4 rounded-full cursor-pointer bg-dark-3 flex justify-center items-center";

    const check = () => {
        appWindow.isMaximized().then(isMX => {
            if (isMX) {
                document.body.style.border = "1px solid var(--color-neutral-700)"
            } else {
                document.body.style.borderWidth = "0px"
            }
        })
    }

    check()

    const handleMinimize = () => {
        appWindow.minimize()
        check()
    }

    const handleMaximize = () => {
        appWindow.toggleMaximize()
        check()
    }

    const handleClose = () => {
        appWindow.close()
        check()
    }

    return (<div className="titlebar px-3 h-10 bg-dark-2 flex justify-between">
        <div className="controls flex items-center gap-2">
            <button id="titlebar-close" title="close" onClick={handleClose} className={`${buttonClasses}`}>
                <CloseIcon/>
            </button>

            <button id="titlebar-maximize" title={"maximize"} onClick={handleMaximize}
                    className={`${buttonClasses}`}>
                <CornerOpen/>
            </button>

            <button id="titlebar-minimize" title="minimize" onClick={handleMinimize} className={`${buttonClasses}`}>
                <DashIcon/>
            </button>
        </div>
        <div data-tauri-drag-region className={"flex-1"} onClick={handleMaximize}></div>
    </div>)
}

export default TopBar;