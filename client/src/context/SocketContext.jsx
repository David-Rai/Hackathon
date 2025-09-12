import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify'
import { io } from 'socket.io-client';
import URL from '../../config'

const SocketContext = createContext(null);

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io(`${URL}`, {
            withCredentials: true
        }); // Your backend URL here
        
        setSocket(newSocket);

        // Connection successful
        newSocket.on("connect", () => {
            toast.success("Connected to server!");
        });

        // Connection error
        newSocket.on("connect_error", (error) => {
            toast.error(`Connection error: ${error.message}`);
        });

        // Disconnect event
        newSocket.on("disconnect", (reason) => {
            toast.warn(`Disconnected: ${reason}`);
        });


        return () => {
            newSocket.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};
