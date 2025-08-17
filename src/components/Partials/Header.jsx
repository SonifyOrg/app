import Spotify from "@/icons/Spotify.jsx";

const Header = () => (
    <>
        <header className={"border border-white w-full h-12 my-2 flex px-4"}>
            <div className="border flex-1"></div>
            <div className="border flex-1"></div>
            <div className="flex-1 flex items-center justify-end">
                <Spotify />
            </div>
        </header>
    </>
)

export default Header