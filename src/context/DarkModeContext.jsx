import { createContext } from "react"
import DarkModeReducer from "./DarkModeReducer";
import { useReducer } from "react";

const INITIAL_STATE = {
    darkMode : true
}

export const DarkModeContext = createContext(INITIAL_STATE)

export const DarkModeContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(DarkModeReducer, INITIAL_STATE);

    return (
        <DarkModeContext.Provider value={{darkMode:state.darkMode, dispatch}}>
            {children}
        </DarkModeContext.Provider>
    )
}