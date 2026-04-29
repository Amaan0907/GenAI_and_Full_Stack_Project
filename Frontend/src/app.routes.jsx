import {createBrowserRouter} from "react-router"
import Login from "../pages/Login.jsx"
import Register from "../pages/Register.jsx"
import Protected from "../component/Protected.jsx"
import Report from "../pages/Report.jsx"
import Interview from "../pages/Interview.jsx"
import Landing from "../pages/Landing.jsx"
import Dashboard from "../pages/Dashboard.jsx"

export const router=createBrowserRouter([
    {
        path:"/home",
        element:<Landing/>
    },{
        path:"/login",
        element:<Login/>
    },{
        path:"/register",
        element:<Register/>
    },{
        path:"/",
        element:<Protected><Report/></Protected>
    },{
        path:"/dashboard",
        element:<Protected><Dashboard/></Protected>
    },{
        path:"/interview/:interviewId",
        element:<Protected><Interview/></Protected>
    }
])