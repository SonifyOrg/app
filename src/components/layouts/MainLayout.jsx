import Header from "@/components/Partials/Header.jsx";

const MainLayout = ({ children }) => {
    return (<>
        <Header />
        {children}
    </>)
}

export default MainLayout;