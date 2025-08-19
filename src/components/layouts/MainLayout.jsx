import Header from "@/components/Partials/Header.jsx";
import {useMusic} from "@/providers/MusicProvider.jsx";

const MainLayout = ({children}) => {
    const {music} = useMusic()

    return (<>
        <div className={"flex"}>
            <div className={"basis-9/12"}>
                <Header/>
                <div className={"px-4 border py-5 mx-auto"}>
                    {children}
                </div>
            </div>
            <div className={"basis-3/12 border border-red-500"}>

            </div>
        </div>
    </>)
}

export default MainLayout;