import { Outlet, Link } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";

const Layout = () => {
  return (
    <>
       <Link to="/create" className='addNewPoll'><IoIosAdd className='plusButton' /></Link>
      <nav className="layoutLinks">
      <Link to="/" className="titleLink"><h1>E-Voting System</h1></Link>
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/elections">Elections</Link>
          </li>
          <li>
            <Link to="/results">Results</Link>
          </li>
          <li>
            {
               //<Link to="/"onClick={ (event) => event.preventDefault() } className='logout'>Logout</Link>
            }
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;