import React, { useState, useEffect } from 'react'
import { getGuests } from './FirebaseActions'

import GuestInfo from '../components/GuestInfo'
import './Rsvp.css'

function GuestList() {
    const [guests, setGuests] = useState([])
    const [attending, setAttending] = useState(0)

    const updateGuests = async () => {
        const data = await getGuests()
        setGuests(data)
        getAttendingCount(data)
    }

    const getAttendingCount = (data) => {
        var attendingCount = 0
        for (let index = 0; index < data.length; index++) {
            const guest = data[index];
            if (guest.ceremony === 'yes') {
                attendingCount ++
            }
        }
        setAttending(attendingCount)
    }

    useEffect(() => {
        updateGuests()
    }, [])
    
    return (
        <div className='partyList'>
            <h1>Guest list</h1>
            <h5 style={{textAlign:'center'}}>{"Attending: " + attending}</h5>
            { guests.map((guest) => {
                return <GuestInfo 
                    key={guest.id}
                    first={guest.first} 
                    last={guest.last} 
                    email={guest.email} 
                    attending={guest.ceremony}
                />
            })}
        </div>
    )
}

export default GuestList