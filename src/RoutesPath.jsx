import {BrowserRouter, Link, Route, Routes} from "react-router";
import TopBar from "@/components/Partials/TopBar.jsx";
import MainLayout from "@/components/layouts/MainLayout.jsx";
import Main from "@/components/pages/Main.jsx";

const RoutesPath = () => {
    return (<>
        <BrowserRouter>
            <MainLayout>
                <Routes>
                    <Route index element={<Main />} />
                </Routes>
            </MainLayout>
        </BrowserRouter>
    </>)
}

export default RoutesPath;