import Navbar from "./Navbar"
import Admin from "./pages/Admin"
import Home from "./pages/Home"
import RecentOrders from "./pages/RecentOrders"
import { Route, Routes } from "react-router-dom"
import Edit from "./pages/Edit"

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clothstore-frontend" element={<Home />} />
          <Route path="/clothstore-frontend/admin" element={<Admin />} />
          <Route path="/clothstore-frontend/recent" element={<RecentOrders />} />
          <Route path="/clothstore-frontend/edit" element={<Edit />} />
        </Routes>
      </div>
    </>
  )
}

export default App
