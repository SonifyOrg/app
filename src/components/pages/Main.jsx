import axios from "axios";
import {toast, Toaster} from "react-hot-toast";
import {useEffect, useState} from "react";
import PlayIcon from "@/icons/PlayIcon.jsx";

const Main = () => {
    const [songs, setSongs] = useState([]);

    const fetchData = async () => {
        const res = await axios.get("http://141.11.37.179:5000/songs");

        if (res.status === 200) {
            setSongs(res.data);
        } else {
            toast.error("Have something went wrong");
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (<>
        <div className={"gap-4"}>
            <h1 className={"text-2xl font-bold mb-4"}>Popular</h1>
            <div className={"grid grid-cols-6 gap-4"}>
                {songs.map(song => <Music key={song?._id} song={song}/>)}
            </div>
        </div>
        <Toaster/>
    </>);
}

const Music = ({song}) => {
    return (<>
        <div className={"w-full cursor-pointer flex flex-col items-center gap-2 group hover:bg-dark-2 p-3 rounded-lg transition-all duration-200"}>
            <div className={"w-full relative"}>
                <img src={`http://141.11.37.179:5000/${song?.cover}`} alt=""
                     className={"aspect-square w-full object-cover rounded-lg"}/>
                <div
                    className={"size-12 bg-primary absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 flex justify-center items-center transition-all duration-200 rounded-full"}>
                    <PlayIcon />
                </div>
            </div>
            <div className={"text-center"}>
                <h3 className={"text-gray-300"}>{song?.title}</h3>
                <span className={"text-[13px] text-gray-500 block"}>{song?.artist}</span>
            </div>
        </div>
    </>)
}

export default Main;