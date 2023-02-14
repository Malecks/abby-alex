import React, { useState, useEffect } from 'react'

import { db } from '../firebase-config'
import { collection, getDocs } from 'firebase/firestore'

import GuestInfo from './GuestInfo'
import '../Rsvp.css'

function GuestList() {
    const [guests, setGuests] = useState([])
    const guestsRef = collection(db, 'guests')
    
    const getGuests = async () => {
        const data = await getDocs(guestsRef)
        setGuests(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }

    useEffect(() => {
        getGuests()
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