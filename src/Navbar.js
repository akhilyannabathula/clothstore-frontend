import { Link, useMatch, useResolvedPath } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/clothstore-frontend" className="site-title">Home</Link>
      <ul>
        <CustomLink to="/clothstore-frontend/admin">Admin and Stats</CustomLink>
        <CustomLink to="/clothstore-frontend/recent">Recent Orders</CustomLink>
        <CustomLink to="/clothstore-frontend/edit">Edit Item</CustomLink>
      </ul>
        
      
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}
