import Navbar from "./Navbar"
import Admin from "./pages/Admin"
import Home from "./pages/Home"
import RecentOrders from "./pages/RecentOrders"
import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clothstore-frontend" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/recent" element={<RecentOrders />} />
        </Routes>
      </div>
    </>
  )
}

export default App
