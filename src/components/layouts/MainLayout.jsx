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
                className={`${!musicAvailable && "translate-x-[calc(450px/2)]"} transition-all duration-200 basis-[calc(100%-400px)]`}>
                <Header/>
                <div className={"px-4 border py-5 mx-auto"}>
                    {children}
                </div>
            </div>
            <div
                className={`${!musicAvailable && "translate-x-56 opacity-0"} basis-[450px] overflow-hidden transition-all duration-200 bg-dark-2`}>
            </div>
        </div>
    </>)
}

export default MainLayout;