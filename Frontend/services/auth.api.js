import axios from "axios"



const api=axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
    withCredentials:true
})



export async function register({username,email,password}){
    const response=await api.post("/api/auth/register",{
        username,email,password
    })
    return response.data
}

export async function login({email,password}) {
    const response=await api.post("/api/auth/login",
        {email,password}
    )
    return response.data
}


export async function logout() {
    const response =await api.get("/api/auth/logout")
    console.log("getUser response:", response.data)
    return response.data
}

export async function getUser() {
    const response =await api.get("/api/auth/current-user")
    return response.data
}