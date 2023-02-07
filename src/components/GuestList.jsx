import React, { useState, useEffect } from 'react'

import { db } from '../firebase-config'
import {addDoc, collection, getDocs } from 'firebase/firestore'
import { getDatabase, ref, set } from 'firebase/database'
import { Formik, Field, Form } from 'formik'

import GuestInfo from './GuestInfo'

import './GuestList.css'
import { async } from '@firebase/util'

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

    const addParty = async (newParty) => {
        await addDoc(partiesRef, {
            guests: [],
            partyName: newParty
        })
    }

    const addGuest = async (newGuest) => {
        await addDoc(guestsRef, {
            attending: newGuest.ceremony,
            email: newGuest.email,
            first: newGuest.firstName,
            last: newGuest.lastName,
            party: newGuest.partyName 
        })
    }

    useEffect(() => {
        getGuests()
        getParties()
      }, [])
    
    return (
        <div>
            <div id='guest-input-wrapper'>
                {/* Add party form */}
                <Formik
                    initialValues={{
                        partyName:'',
                    }}
                    onSubmit={async (values) => {
                        addParty(values.partyName)
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <label htmlFor='Party name'>Party name</label>
                            <Field id='partyName' name='partyName' placeholder='Party name' />
                            <button type='submit' disabled={isSubmitting}>Add party</button>
                        </Form>
                    )}
                </Formik>
                <hr />
                
                {/* RSVP form */}
                <Formik
                    initialValues={{
                        partyName:'',
                        firstName:'',
                        lastName:'',
                        email:'',
                        fridayEvent: false,
                        ceremony: true,
                        sundayEvent: false,
                        entre:'',
                        notes:'',
                    }}
                    onSubmit={async (values) => {
                        addGuest(values)
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <label htmlFor='Party name'>Party name</label>                            
                            <Field as='select' id='guestPartyName'  name='guestPartyName' placeholder='Select party'>
                                <option disabled value=''>Select party</option>
                                { parties.map((party) => {
                                    return <option value={party.id} key={party.id}>{party.partyName}</option>
                                })}
                            </Field>
                            <hr />
                            <label htmlFor='firstName'>First name</label>
                            <Field id='firstName' name='firstName' placeholder='Albus' />

                            <label htmlFor='lastName'>Last name</label>
                            <Field id='lastName' name='lastName' placeholder='Dumbledore' />

                            <label htmlFor='email'>Email</label>
                            <Field id='email' name='email' placeholder='your.name@gmail.com' />
                            <hr />
                            <button type='submit' disabled={isSubmitting}>Submit</button>
                        </Form>
                    )}
                </Formik>    
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