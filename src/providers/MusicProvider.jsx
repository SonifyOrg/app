import {createContext, useContext, useState} from "react";

const MusicContext = createContext({
    music: null, setMusic: () => {
    },
});

const MusicProvider = ({children}) => {
    const [music, setMusic] = useState({});

    return (<>
            <MusicContext.Provider value={{music, setMusic}}>
                {children}
            </MusicContext.Provider>
        </>);
};

const useMusic = () => useContext(MusicContext);

export {MusicContext, useMusic};
export default MusicProvider;