import GuestList from "./components/GuestList"
import './Rsvp.css'
import { NavLink, Outlet } from 'react-router-dom'

function Rsvp () {
    return (
        <>
            <nav id='rsvpNav'>
                <ul>
                    <li>website</li>
                    <li>parties</li>
                    <li>guest list</li>
                </ul>
            </nav>
            
            <Outlet>
            </Outlet>
        </>
    )
}

export default Rsvp