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
    const [volume, setVolume] = useState(1);
    const [muted, setMuted] = useState(false);
    const [repeat, setRepeat] = useState(false);
    const [shuffle, setShuffle] = useState(false);

    useEffect(() => {
        if (audio.current) {
            audio.current.volume = volume;
            audio.current.addEventListener("loadedmetadata", () => {
                setDuration(audio.current.duration);
            });
            audio.current.addEventListener("timeupdate", () => {
                setProgress(audio.current.currentTime);
            });
        }
    }, [music]);

    const togglePlay = () => {
        if (isPlaying) {
            audio.current.pause();
        } else {
            audio.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleSeek = (e) => {
        const value = e.target.value;
        audio.current.currentTime = value;
        setProgress(value);
    };

    const formatTime = (time) => {
        if (isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60).toString().padStart(2, "0");
        return `${minutes}:${seconds}`;
    };

    const handleEnded = () => {
        if (repeat) {
            audio.current.play()
            return null;
        } else {
            if (shuffle) {
                handleNext()
            } else {
                setIsPlaying(false);
            }
        }
    }

    const handlePrev = () => {
        let ndis = null

        songs.map((sg, index) => {
            if (sg._id === music._id) {
                ndis = index;
            }
        })

        const prev = songs.find((sg, index) => index === ndis - 1)

        if (prev) {
            setMusic(prev);
        }
    }

    const handleNext = () => {
        let ndis = null

        songs.map((sg, index) => {
            if (sg._id === music._id) {
                ndis = index;
            }
        })

        const next = songs.find((sg, index) => index === ndis + 1)

        if (next) {
            setMusic(next);
        }
    }

    return (<div
        className="w-full text-white p-4 flex flex-col gap-4">
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
                className="w-full h-2 bg-gray-300 rounded appearance-none accent-primary hover:accent-primary focus:outline-none"
                style={{
                    background: `linear-gradient(to right, var(--color-primary) ${progress / duration * 100}%, #d1d5db 0%)`,
                }}
            />
            <span className="text-xs">{formatTime(duration)}</span>
        </div>

        <div className="flex items-center w-fit  mx-auto gap-4">
            <button onClick={() => setShuffle(!shuffle)} className={`cursor-pointer ${shuffle && "text-green-400"}`}>
                <Shuffle size={20}/>
            </button>
            <button onClick={handlePrev} className={"cursor-pointer"}>
                <SkipBack size={28}/>
            </button>
            <button
                onClick={togglePlay}
                className="size-12 flex justify-center items-center cursor-pointer bg-primary text-black rounded-full"
            >
                {isPlaying ? <PauseIcon/> : <PlayIcon/>}
            </button>
            <button onClick={handleNext} className={"cursor-pointer"}>
                <SkipForward size={28}/>
            </button>
            <button
                onClick={() => setRepeat(!repeat)}
                className={`cursor-pointer ${repeat && "text-green-400"}`}>
                <Repeat size={20}/>
            </button>
        </div>
    </div>);
};

export default MainLayout;