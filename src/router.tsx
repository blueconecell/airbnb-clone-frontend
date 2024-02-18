import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./components/routes/Home";
import Users from "./components/routes/Users";
import NotFound from "./components/routes/NotFound";

const router = createBrowserRouter([
    {
        path:'/',
        element: <Root/>,
        errorElement: <NotFound />,
        children: [{
            path: "",
            element: <Home/>
        },
        {
            path: "users",
            element: <Users/>
        },
    ]
    },
])
export default router