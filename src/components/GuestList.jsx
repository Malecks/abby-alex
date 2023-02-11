import React, { useState, useEffect } from 'react'

import { db } from '../firebase-config'
import { collection, getDocs } from 'firebase/firestore'
// import { getDatabase, ref, set } from 'firebase/database'

import GuestInfo from './GuestInfo'
import '../Rsvp.css'

function GuestList() {
    // DB values
    const [guests, setGuests] = useState([])
    const [parties, setParties] = useState([])

    const guestsRef = collection(db, 'guests')
    const getGuests = async () => {
        const data = await getDocs(guestsRef)
        // console.log(data)

        setGuests(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        // console.log(guests)
    }
    
    const partiesRef = collection(db, 'parties')
    const getParties = async () => {
        const data = await getDocs(partiesRef)
        setParties(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        console.log(parties)
    }

    useEffect(() => {
        getGuests()
        getParties()
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