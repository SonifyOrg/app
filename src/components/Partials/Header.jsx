import Spotify from "@/icons/Spotify.jsx";
import {Link} from "react-router";
import HomeIcon from "@/icons/HomeIcon.jsx";
import { open } from '@tauri-apps/plugin-shell';

const Header = () => {
    const handleGithub = async () => {
        await open("https://github.com/SonifyOrg");
    }

    return <>
        <header className={" w-full h-12 my-2 flex px-4"}>
            <div className="flex-1 flex items-center">
                <button
                    className={"bg-white active:scale-100 py-2.5 hover:scale-105 active:opacity-75 cursor-pointer transition-all duration-200 text-black min-w-[100px] rounded-full font-bold"}
                    onClick={handleGithub}>Github
                </button>
            </div>
            <div className="flex-1 flex justify-center items-center">
                <Link to="/"
                      className={"size-12 bg-dark-2 rounded-full flex justify-center items-center transition-all duration-200 active:scale-100 hover:scale-105 active:opacity-75"}>
                    <HomeIcon/>
                </Link>
            </div>
            <div className="flex-1 flex items-center justify-end">
                <Link to="/"
                      className={"active:scale-100 hover:scale-105 active:opacity-75 transition-all duration-200"}>
                    <Spotify/>
                </Link>
            </div>
        </header>
    </>
}

export default Header