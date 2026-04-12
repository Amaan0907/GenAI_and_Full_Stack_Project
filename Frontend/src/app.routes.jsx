import {createBrowserRouter} from "react-router"
import Login from "../pages/Login.jsx"
import Register from "../pages/Register.jsx"

export const router=createBrowserRouter([
    {
        path:"/login",
        element:<Login/>
    },{
        path:"/register",
        element:<Register/>
    }
])