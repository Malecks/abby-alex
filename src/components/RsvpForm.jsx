import React, { useState, useEffect } from 'react'

import { db } from '../firebase-config'
import {addDoc, collection, getDocs } from 'firebase/firestore'
import { Formik, Field, Form, useFormikContext } from 'formik'


import './Rsvp.css'

function RsvpForm() {
    // const [guests, setGuests] = useState([])
    const guestsRef = collection(db, 'guests')
    const partiesRef = collection(db, 'parties')

    const [parties, setParties] = useState([])

    const [showFields, setShowFields] = useState(false)

    const FormObserver = () => {
        const { values } = useFormikContext();
        useEffect(() => {
          console.log("FormObserver::values", values)
            switch (values.ceremony) {
                case 'yes': 
                    if (!showFields) {
                        setShowFields(true)
                    }
                    console.log(showFields)
                    return
                case '', 'no':
                    if (showFields) {
                        setShowFields(false)
                    }
                    console.log(showFields)
                    return
            }
        }, [values]);
        return null;
      };


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
        <div className='rsvpWrapper'>            
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
                    fridayEvent: '',
                    ceremony: '',
                    sundayEvent: '',
                    entre:'',
                    notes:'',
                }}
                onSubmit={async (values) => {
                    addGuest(values)
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <FormObserver />
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
                        
                        {/* Ceremony */}
                        <label htmlFor='ceremony'>Wedding</label>
                        <p className='rsvpQuestion'>Will you be attending the <strong>Ceremony and Reception</strong> on July 8th? (5pm – late).</p>
                        <Field as='select' id='ceremony' name='ceremony'>
                            <option value='' disabled>Please select</option>
                            <option value='yes' key='yes'>Yes! I will be attending.</option>
                            <option value='no' key='no'>Unfortunately, I will not be attending.</option>
                        </Field>

                        <div hidden={!showFields}>
                            <label htmlFor='entre'>What would you like for dinner?</label>
                            <Field as='select' id='entre' name='entre'>
                                <option value='' disabled>Please select</option>
                                <option value='chicken' key='chicken'>Chicken</option>
                                <option value='steak' key='steak'>Steak</option>
                                <option value='vegetarian' key='vegetarian'>Vegetarian</option>
                                <option value='surprise' key='surprise'>Surprise me!</option>
                            </Field>
                        </div>
                        <button type='submit' disabled={isSubmitting}>Submit</button>
                    </Form>
                )}
            </Formik>    
        </div>
    )
}

export default RsvpForm