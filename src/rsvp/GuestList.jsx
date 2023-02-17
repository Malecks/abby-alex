import React, { useState, useEffect } from 'react'
import { getGuests } from './FirebaseActions'

import GuestInfo from '../components/GuestInfo'
import './Rsvp.css'

function GuestList() {
    const [guests, setGuests] = useState([])
    
    const updateGuests = async () => {
        const data = await getGuests()
        setGuests(data)
    }

    useEffect(() => {
        updateGuests()
    }, [])
    
    return (
        <>
            { guests.map((guest) => {
            return <GuestInfo 
                key={guest.id}
                first={guest.first} 
                last={guest.last} 
                email={guest.email} 
                attending={guest.attending}
            />
            })}
        </>
    )
}

export default GuestList