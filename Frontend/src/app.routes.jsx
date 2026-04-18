import {createBrowserRouter} from "react-router"
import Login from "../pages/Login.jsx"
import Register from "../pages/Register.jsx"
import Protected from "../component/Protected.jsx"
import Report from "../pages/Report.jsx"

export const router=createBrowserRouter([
    {
        path:"/login",
        element:<Login/>
    },{
        path:"/register",
        element:<Register/>
    },{
        path:"/",
        element:<Protected><Report/></Protected>
    }
])