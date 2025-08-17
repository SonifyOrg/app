import {BrowserRouter, Link, Route, Routes} from "react-router";

const RoutesPath = () => {
    return (<>
        <BrowserRouter>
            <Routes>
                <Route index element={<>
                    main page
                    <Link to={"/test"} >Naviagte</Link>
                </>} />
                <Route path="/test" element={<>
                    test page
                    <Link to={"/"} >Naviagte</Link>
                </>} />
            </Routes>
        </BrowserRouter>,
    </>)
}

export default RoutesPath;