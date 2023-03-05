import React, { useState, useEffect } from 'react'
import { getGuest, getParty } from './FirebaseActions'
import { Link, useLoaderData } from 'react-router-dom'

import GuestInfo from '../components/GuestInfo'
import './Rsvp.css'

export const loadGuest = async ({ params }) => {
    return await getGuest(params.guestId)
}

export default function YourParty() {
    const { guest } = useLoaderData()

    const [guests, setGuests] = useState([])
    
    const updateGuests = async () => {
        const { party } = await getParty(guest.party)
        const partyGuests = []

        for (let index = 0; index < party.guests.length; index++) {
            const partyGuestId = party.guests[index]
            const guest = await getGuest(partyGuestId)
            partyGuests.push(guest)
        }
        setGuests(partyGuests)
    }

    useEffect(() => {
        updateGuests()
    }, [])
    
    return (
        <div className="rsvpWrapper">
            <header>
                <h1>Your party</h1>
            </header>
            <div className='yourParty'>
                { guests.map((partyGuest) => {
                    return (
                        <Link to={"/rsvp/" + partyGuest.guestId} key={partyGuest.guestId}>
                            <GuestInfo 
                                key={partyGuest.guestId}
                                first={partyGuest.guest.first} 
                                last={partyGuest.guest.last} 
                                email={partyGuest.guest.email} 
                                attending={partyGuest.guest.ceremony}
                            />
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}