import {createBrowserRouter} from "react-router"
import Login from "../pages/Login.jsx"
import Register from "../pages/Register.jsx"
import Protected from "../component/Protected.jsx"

export const router=createBrowserRouter([
    {
        path:"/login",
        element:<Login/>
    },{
        path:"/register",
        element:<Register/>
    },{
        path:"/",
        element:<Protected><h1>Home Page</h1></Protected>
    }
])