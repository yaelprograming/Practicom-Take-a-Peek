import { createBrowserRouter, Link } from "react-router-dom"
import Gallery from "./pages/Gallery";
import AppLayout from "./AppLayout";



const Router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children:
            [{
                path: '/gallery',
                element: <Gallery />,
            },]
    },

]);

export default Router;