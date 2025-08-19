import Header from "@/components/Partials/Header.jsx";
import {useMusic} from "@/providers/MusicProvider.jsx";
import {useEffect, useMemo, useRef, useState} from "react";
import {Repeat, Shuffle, SkipBack, SkipForward} from "lucide-react";
import PlayIcon from "@/icons/PlayIcon.jsx";
import PauseIcon from "@/icons/PauseIcon.jsx";

const MainLayout = ({children}) => {
    const {music, setMusic, songs} = useMusic();

    const musicAvailable = useMemo(() => {
        return Object.entries(music).length !== 0
    }, [music]);

    const handleEnded = () => {

    }

    return (<>
        <div className={"flex justify-center"}>
            <div
                className={`${!musicAvailable && "translate-x-[calc(400px/2)]"} transition-all duration-200 basis-[calc(100%-400px)]`}>
                <Header/>
                <div className={"px-4 py-5 mx-auto"}>
                    {children}
                </div>
            </div>
            <div
                className={`${!musicAvailable && "translate-x-56 opacity-0"} relative basis-[400px] overflow-hidden transition-all duration-200 bg-dark-2 h-screen`}>
                <img src={`http://141.11.37.179:5000/${music?.cover}`} alt=""
                     className={"aspect-square w-full object-cover"}/>
                <div className={"px-4 pt-4"}>
                    <h3 className={"text-3xl font-bold hover:underline cursor-pointer"}>{music?.title}</h3>
                    <h4 className={"text-gray-400 hover:underline cursor-pointer mt-2"}>{music?.artist}</h4>
                </div>
                <footer className={"w-full absolute bottom-0 right-0"}>
                    {musicAvailable && (<>
                        <Player music={music} songs={songs} setMusic={setMusic}/>
                    </>)}
                </footer>
            </div>
        </div>
    </>)
}

const Player = ({music, songs, setMusic}) => {
    const audio = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [repeat, setRepeat] = useState(false);
    const [shuffle, setShuffle] = useState(false);

    useEffect(() => {
        if (!audio.current) return;

        const el = audio.current;
        el.volume = 1;

        const setMeta = () => setDuration(el.duration);
        const updateTime = () => setProgress(el.currentTime);

        el.addEventListener("loadedmetadata", setMeta);
        el.addEventListener("timeupdate", updateTime);

        return () => {
            el.removeEventListener("loadedmetadata", setMeta);
            el.removeEventListener("timeupdate", updateTime);
        };
    }, [music]);

    const togglePlay = () => {
        if (!audio.current) return;
        isPlaying ? audio.current.pause() : audio.current.play();
        setIsPlaying(!isPlaying);
    };

    const handleSeek = (e) => {
        const value = +e.target.value;
        audio.current.currentTime = value;
        setProgress(value);
    };

    const formatTime = (t) => {
        if (isNaN(t)) return "0:00";
        const m = Math.floor(t / 60);
        const s = Math.floor(t % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };

    const changeSong = (step) => {
        const index = songs.findIndex((s) => s._id === music._id);
        let nextIndex = index + step;

        if (shuffle && nextIndex >= songs.length) {
            nextIndex = 0;
        }

        if (shuffle && nextIndex < 0) {
            nextIndex = songs.length - 1;
        }

        const next = songs[nextIndex];
        if (next) setMusic(next);
    };

    const handleEnded = () => {
        if (repeat) {
            return audio.current.play();
        }
        if (shuffle) {
            changeSong(1);
        } else {
            setIsPlaying(false);
        }
    };

    return (<div className="w-full text-white p-4 flex flex-col gap-4">
            <audio
                ref={audio}
                src={`http://141.11.37.179:5000/${music.audio}`}
                autoPlay
                onEnded={handleEnded}
            />

            <div className="flex items-center gap-2 w-full">
                <span className="text-xs">{formatTime(progress)}</span>
                <input
                    type="range"
                    min="0"
                    max={duration}
                    value={progress}
                    onChange={handleSeek}
                    className="w-full h-2 bg-gray-300 rounded appearance-none accent-primary"
                    style={{
                        background: `linear-gradient(to right, var(--color-primary) ${(progress / duration) * 100}%, #d1d5db 0%)`,
                    }}
                />
                <span className="text-xs">{formatTime(duration)}</span>
            </div>

            <div className="flex items-center mx-auto gap-4">
                <button
                    onClick={() => setShuffle(!shuffle)}
                    className={shuffle ? "text-green-400" : ""}
                >
                    <Shuffle size={20}/>
                </button>
                <button onClick={() => changeSong(-1)}>
                    <SkipBack size={28}/>
                </button>
                <button
                    onClick={togglePlay}
                    className="size-12 flex justify-center items-center bg-primary text-black rounded-full"
                >
                    {isPlaying ? <PauseIcon/> : <PlayIcon/>}
                </button>
                <button onClick={() => changeSong(1)}>
                    <SkipForward size={28}/>
                </button>
                <button
                    onClick={() => setRepeat(!repeat)}
                    className={repeat ? "text-green-400" : ""}
                >
                    <Repeat size={20}/>
                </button>
            </div>
        </div>);
};

export default MainLayout;