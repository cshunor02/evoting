import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav className="layoutLinks">
        <h1>E-Voting System</h1>
        <ul>
          <li>
            <Link to="/dashboard" onClick={ (event) => event.preventDefault() }>Dashboard</Link>
          </li>
          <li>
            <Link to="/elections" onClick={ (event) => event.preventDefault() }>Elections</Link>
          </li>
          <li>
            <Link to="/results" onClick={ (event) => event.preventDefault() }>Results</Link>
          </li>
          <li>
            <Link to="/"onClick={ (event) => event.preventDefault() }>Logout</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;