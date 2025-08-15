import React from 'react'
import { createContext, useEffect, useContext, useState } from 'react'
// import { verify } from '../utils/verify.js'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)


    //Getting user datails from localstorage
    useEffect(() => {
        console.log("getting from localstorage.....")
        const storedUser = JSON.parse(localStorage.getItem('user'));
        console.log("from local storage", storedUser)
        setUser(storedUser)
        
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {
                children
            }
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const { user, setUser } = useContext(UserContext)
    return { user, setUser }
}

