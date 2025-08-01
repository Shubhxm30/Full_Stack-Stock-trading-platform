import axios from 'axios'
import {createContext, useState, useEffect} from 'react'
import { toast } from 'react-toastify'

export const AppContext = createContext()

export const AppContextProvider = (props)=>{

    axios.defaults.withCredentials = true;

    const backendUrl = 'http://localhost:3002'
    const [isLoggedin, setIsLoggedin] = useState(false)
    const [userData, setUserData] = useState(false)

    const getAuthState = async ()=>{
        try {
            const {data} =await axios.get(backendUrl + '/auth/is-auth')
            if(data.success){
                setIsLoggedin(true)
                getUserData()
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getUserData = async ()=>{
        try {
            const {data} =await axios.get(backendUrl + '/user/data')
            data.success ? setUserData(data.userData) : toast.error(data.message)

        } catch (error) {
            toast.error(error.message)

        }
    }

    useEffect(() => {
        getAuthState()
    }, [])

    // useEffect();

    const value = {
        backendUrl,
        isLoggedin,setIsLoggedin,
        userData,setUserData,
        getUserData
    }

    return(
        <AppContext.Provider value={value}> 
        {props.children}
        </AppContext.Provider>
    )
}
