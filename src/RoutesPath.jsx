import {BrowserRouter, Link, Route, Routes} from "react-router";
import TopBar from "@/components/Partials/TopBar.jsx";

const RoutesPath = () => {
    return (<>
        <BrowserRouter>
            <TopBar />
            <Routes>
                <Route index element={<>
                    main page
                    <Link to={"/test"} >Naviagte</Link>
                </>} />
            </Routes>
        </BrowserRouter>,
    </>)
}

export default RoutesPath;