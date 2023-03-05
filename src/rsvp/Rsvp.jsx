import './Rsvp.css'
import { NavLink, Outlet } from 'react-router-dom'

function Rsvp () {
    return (
        <>
            <nav id='rsvpNav'>
                <ul>
                    <li><NavLink to="/" className={({ isActive }) => isActive ? 'active' : null }>{"← Wedding website"}</NavLink></li>
                </ul>
            </nav>
            <div>
                <Outlet>
                </Outlet>
            </div>
        </>
    )
}

export default Rsvp