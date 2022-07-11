import {io} from "socket.io-client";
import { createContext } from "react";
export const SocketContext = createContext();

export const socketContext = createContext();


export const SocketProvider = ({children}) => {
    const socket = io("");
    return (
        <socketContext.Provider value={socket}>
            {children}
        </socketContext.Provider>
    )
}