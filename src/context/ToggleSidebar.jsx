import React, {useContext, useState, createContext} from 'react';

const StateContext = createContext();

export const ToggleSidebar = ({children}) => {
    const [activeMenu, setActiveMenu] = useState(true);

    return (
        <StateContext.Provider value={{activeMenu, setActiveMenu}}>
            {children}
        </StateContext.Provider>
    ) 
};

export const useStateContext = () => useContext(StateContext)