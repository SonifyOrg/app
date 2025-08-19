import {BrowserRouter, Link, Route, Routes} from "react-router";
import TopBar from "@/components/Partials/TopBar.jsx";
import MainLayout from "@/components/layouts/MainLayout.jsx";
import Main from "@/components/pages/Main.jsx";
import MusicProvider from "@/providers/MusicProvider.jsx";

const RoutesPath = () => {
    return (<>
        <BrowserRouter>
            <MusicProvider>
                <MainLayout>
                    <Routes>
                        <Route index element={<Main />} />
                    </Routes>
                </MainLayout>
            </MusicProvider>
        </BrowserRouter>
    </>)
}

export default RoutesPath;