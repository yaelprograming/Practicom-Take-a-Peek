import { Outlet } from "react-router-dom"
import NavBar from "./pages/NavBar"

export default()=>{
return(<>
<div>
    <NavBar></NavBar>
</div>
<Outlet/>
</>)
} 