import {BrowserRouter, Link, Route, Routes} from "react-router";
import TopBar from "@/components/Partials/TopBar.jsx";

const RoutesPath = () => {
    return (<>
        <BrowserRouter>
            <TopBar />
            <Routes>
                <Route index element={<>
                    i
                </>} />
            </Routes>
        </BrowserRouter>
    </>)
}

export default RoutesPath;