import React, { useState, useEffect } from 'react'

import { db } from '../firebase-config'
import {addDoc, collection, getDocs } from 'firebase/firestore'
import { getDatabase, ref, set } from "firebase/database"

import GuestInfo from './GuestInfo'

import './GuestList.css'
import { async } from '@firebase/util'

function GuestList() {

    // DB values
    const [guests, setGuests] = useState([])
    const [parties, setParties] = useState([])

    // Form values
    const [firstValue, setFirstValue] = useState("")
    const [lastValue, setLastValue] = useState("") 
    const [emailValue, setEmailValue] = useState("")
    const [partyValue, setPartyValue] = useState("")
    
    const [newPartyValue, setNewPartyValue] = useState("")

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

    const addParty = async () => {
        await addDoc(partiesRef, {
            guests: [],
            partyName: newPartyValue
        })
    }

    const addGuest = async () => {
        await addDoc(guestsRef, {
            attending: false,
            email: emailValue,
            first: firstValue,
            last: lastValue,
            party: partyValue 
        })
    }

    useEffect(() => {
        getGuests()
        getParties()
      }, [])
    
    return (
        <div>
            <div id="guest-input-wrapper">
                <form>
                    <label>
                        Add party
                    </label>

                    <input value={newPartyValue} onChange={event => setNewPartyValue(event.target.value)} type="text" placeholder="Name" />
                </form> 
                <button onClick={addParty}>Add party</button> 
                
                <form>
                    <label>
                        Guest Info
                    </label>
                    <select required={true} value={partyValue} onChange={event => setPartyValue(event.target.value)}>
                        <option disabled value="">Select party</option>
                        { parties.map((party) => {
                            return <option value={party.id} key={party.id}>{party.partyName}</option>
                        })}
                    </select>
                    <input value={firstValue} onChange={event => setFirstValue(event.target.value)} type="text" placeholder="First"/>
                    <input value={lastValue} onChange={event => setLastValue(event.target.value)} id="last" type="text" placeholder="Last"/>
                    <input value={emailValue} onChange={event => setEmailValue(event.target.value)} id ="email" type="email" placeholder="Email"/>
                </form>
                <button onClick={addGuest}>Add guest</button>
                             
            </div>

            { guests.map((guest) => {
            return <GuestInfo 
                key={guest.id}
                first={guest.first} 
                last={guest.last} 
                email={guest.email} 
                attending={guest.attending}
            />
            })}
        </div>
    )
}

export default GuestList