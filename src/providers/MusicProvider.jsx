import {createContext, useContext, useState} from "react";

const MusicContext = createContext({
    music: null,
    setMusic: () => {},
    songs: null,
    setSongs: () => {},
});

const MusicProvider = ({children}) => {
    const [songs, setSongs] = useState([]);
    const [music, setMusic] = useState({});

    return (<>
        <MusicContext.Provider value={{music, setMusic, songs, setSongs}}>
            {children}
        </MusicContext.Provider>
    </>);
};

const useMusic = () => useContext(MusicContext);

export {MusicContext, useMusic};
export default MusicProvider;