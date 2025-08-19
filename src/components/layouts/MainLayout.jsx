import Header from "@/components/Partials/Header.jsx";

const MainLayout = ({ children }) => {
    return (<>
        <Header />
        <div className={"max-w-[1440px] border py-5 mx-auto"}>
            {children}
        </div>
    </>)
}

export default MainLayout;