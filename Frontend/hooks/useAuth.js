import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../services/auth.context";
import { login, logout, register, getUser } from "../services/auth.api.js";

export const useAuth = () => {
    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context
    const [error, setError] = useState(null)

    const handleLogin = async ({ email, password }) => {
        setLoading(true)
        setError(null)
        try {
            const data = await login({ email, password })
            // Normalize user data: login returns { loggedInUser, accessToken, refreshToken }
            const userProfile = data.data.loggedInUser || data.data
            setUser(userProfile)
            setLoading(false)
            return true
        } catch (error) {
            console.error("Login error:", error)
            setError(error.response?.data?.message || "Login failed. Please check your credentials and connection.")
            setLoading(false)
            return false
        }
    }

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true)
        setError(null)
        try {
            const data = await register({ username, email, password })
            // Normalize user data: register returns the user object directly in data.data
            setUser(data.data)
            setLoading(false)
            return true
        } catch (error) {
            console.error("Registration error:", error)
            setError(error.response?.data?.message || "Registration failed. Please try again.")
            setLoading(false)
            return false
        }
    }

    const handleLogout = async () => {
        setLoading(true)
        setError(null)
        try {
            await logout()
            setUser(null)
            setLoading(false)
            return true
        } catch (error) {
            console.error("Logout error:", error)
            setError("Logout failed.")
            setLoading(false)
            return false
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

    return { user, loading, error, handleLogin, handleLogout, handleRegister }
}