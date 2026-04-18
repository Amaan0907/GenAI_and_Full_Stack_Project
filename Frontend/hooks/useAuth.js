import { useContext,useEffect } from "react";
import { AuthContext } from "../services/auth.context";
import { login,logout,register,getUser } from "../services/auth.api.js";

export const useAuth=()=>{

    const context=useContext(AuthContext)

    const {user,setUser,loading,setLoading}=context


    const handleLogin=async({email,password})=>{
        setLoading(true)
        try {
            const data=await login({email,password})
            setUser(data.data)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const handleRegister=async({username,email,password})=>{
        setLoading(true)
        try {
            const data=await register({username,email,password})
    
            setUser(data.data)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const handleLogout=async()=>{
        setLoading(true)
        try {
            const data=await logout()
            setUser(null)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        const getAndSetUser = async () => {
            try {
                const data = await getUser()
                setUser(data.data)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                
            }
        }

        getAndSetUser()
    }, [])

    return {user,loading,handleLogin,handleLogout,handleRegister}


}