import { Route, Routes } from "react-router-dom"
import Home from "../pages/public/Home"


const AppRoutes = () => {
  return (
    <div>
       <Routes>
        <Route path="/" element={<Home/>}/>
       </Routes>
    </div>
  )
}

export default AppRoutes