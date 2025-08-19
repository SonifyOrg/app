import Header from "@/components/Partials/Header.jsx";
import {useMusic} from "@/providers/MusicProvider.jsx";
import {useMemo} from "react";

const MainLayout = ({children}) => {
    const {music} = useMusic();

    const musicAvailable = useMemo(() => {
        return Object.entries(music).length !== 0
    }, [music]);

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
                className={`${!musicAvailable && "translate-x-56 opacity-0"} basis-[400px] overflow-hidden transition-all duration-200 bg-dark-2 h-screen`}>
                <img src={`http://141.11.37.179:5000/${music?.cover}`} alt=""
                     className={"aspect-square w-full object-cover"}/>
                <div className={"px-4 pt-4"}>
                    <h3 className={"text-3xl font-bold hover:underline cursor-pointer"}>{music?.title}</h3>
                    <h4 className={"text-gray-400 hover:underline cursor-pointer mt-2"}>{music?.artist}</h4>
                </div>
            </div>
        </div>
    </>)
}

export default MainLayout;