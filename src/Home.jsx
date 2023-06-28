import './App.css'
import Header from './components/Header.jsx'
import { NavLink, Outlet } from 'react-router-dom'

import { useLocation } from 'react-router-dom'


const Home = () => {
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");

  return (
    <div className='App'>
      <div className={splitLocation[1] === "" ? 'LargeNav' : 'SmallNav'}>
        <NavLink to="/" className={({ isActive }) => isActive ? 'large' : 'small'}>
          <Header />
        </NavLink>
        <nav>
          <ul>
            <li><NavLink to="/schedule" className={({ isActive }) => isActive ? 'active' : null }>Schedule</NavLink></li>
            <li><NavLink to="/transportation" className={({ isActive }) => isActive ? 'active' : null }>Party bus</NavLink></li>
            <li><NavLink to="/accomodation" className={({ isActive }) => isActive ? 'active' : null }>Accomodation</NavLink></li>
            <li><NavLink to="/guide" className={({ isActive }) => isActive ? 'active' : null }>Guide</NavLink></li>
            <li><NavLink to="/house" className={({ isActive }) => isActive ? 'active' : null }>The House</NavLink></li>
            <li><NavLink to="/faq" className={({ isActive }) => isActive ? 'active' : null }>F.A.Q.</NavLink></li>
          </ul>
        </nav>
      </div>
      <Outlet />
    </div>
  )
}

export default Home