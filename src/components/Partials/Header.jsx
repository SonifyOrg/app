import Spotify from "@/icons/Spotify.jsx";
import {Link} from "react-router";
import HomeIcon from "@/icons/HomeIcon.jsx";

const Header = () => (<>
    <header className={" w-full h-12 my-2 flex px-4"}>
        <div className="border flex-1"></div>
        <div className="flex-1 flex justify-center items-center">
            <Link to="/" className={"size-12 bg-dark-2 rounded-full flex justify-center items-center transition-all duration-200 active:scale-100 hover:scale-105 active:opacity-75"}>
                <HomeIcon />
            </Link>
        </div>
        <div className="flex-1 flex items-center justify-end">
            <Link to="/">
                <Spotify/>
            </Link>
        </div>
    </header>
</>)

export default Header