import React, { useState, useEffect } from 'react'

import { db } from '../firebase-config'
import {addDoc, collection, getDocs } from 'firebase/firestore'

// import { getDatabase, ref, set } from 'firebase/database'
// import { async } from '@firebase/util'
import { Formik, Field, Form } from 'formik'

import './GuestList.css'

function RsvpForm() {
    // const [guests, setGuests] = useState([])
    const [parties, setParties] = useState([])

    const guestsRef = collection(db, 'guests')

    const partiesRef = collection(db, 'parties')
    const getParties = async () => {
        const data = await getDocs(partiesRef)
        setParties(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        console.log(parties)
    }

    const addGuest = async (newGuest) => {
        await addDoc(guestsRef, {
            attending: newGuest.ceremony,
            email: newGuest.email,
            first: newGuest.firstName,
            last: newGuest.lastName,
            party: newGuest.guestPartyName 
        })
    }

    useEffect(() => {
        getParties()
      }, [])

    return (
        <div id='guest-input-wrapper'>
            {/* Add party form
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
            <hr /> */}
            
            {/* RSVP form */}
            <header id='rsvpHeader'>
                <div>July 8th, 2023 – Ellicottville N.Y.</div>
                <h1>You're invited, Alex</h1>
            </header>
            
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
                        <Field as='select' id='guestPartyName' name='guestPartyName' placeholder='Select party'>
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
                        <div role='group' aria-labelledby='checkbox-group'>
                            <label className='checkBox'>
                                <Field type='checkbox' name='checked' value='fridayEvent' />
                                Friday July 7th – Welcome drinks
                            </label>
                            <label className='checkBox'>
                                <Field type='checkbox' name='checked' value='ceremony' />
                                Saturday July 8th – Ceremony, dinner, and dancing!
                            </label>
                            <label className='checkBox'>
                                <Field type='checkbox' name='checked' value='sundayEvent' />
                                Sunday July 8th – Pond brunch (11am – 2pm)
                            </label>
                        </div>
                        <button type='submit' disabled={isSubmitting}>Submit</button>
                    </Form>
                )}
            </Formik>    
        </div>
    )
}

export default RsvpForm