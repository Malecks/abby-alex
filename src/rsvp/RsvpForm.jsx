import React, { useState, useEffect } from 'react'

import { db } from '../firebase-config'
import { doc, setDoc } from 'firebase/firestore'
import { Formik, Field, Form, useFormikContext } from 'formik'

import { useLoaderData } from 'react-router-dom'
import { getGuest } from './FirebaseActions'

import './Rsvp.css'

// Loader func
export const loadGuest = async ({ params }) => {
    return await getGuest(params.guestId)
}

export default function RsvpForm() {
    const {guest, guestId} = useLoaderData()

    const [showFields, setShowFields] = useState(false)

    const FormObserver = () => {
        const { values } = useFormikContext();
        useEffect(() => {
            switch (values.ceremony) {
                case 'yes': 
                    if (!showFields) {
                        setShowFields(true)
                    }
                    return
                case '', 'no':
                    if (showFields) {
                        setShowFields(false)
                    }
                    return
            }
        }, [values])
        return null
    }

    const addGuest = async (values) => {
        const guestRef = doc(db, 'guests', guestId)
        await setDoc(guestRef, {
            party: values.partyName,
            first: values.firstName,
            last: values.lastName,
            email: values.email,
            fridayEvent: values.fridayEvent,
            ceremony: values.ceremony,
            sundayEvent: values.sundayEvent,
            entre: values.entre,
            notes: values.notes
        })
    }

    return (
        <div className='rsvpWrapper'>            
            {/* RSVP form */}
            <h1>{ guest.first ? (guest.first + ", you're invited!") : "You're invited!" }</h1>
            
            <Formik
                initialValues={{
                    partyName: guest.party ?? '',
                    firstName: guest.first ?? '',
                    lastName: guest.last ?? '',
                    email: guest.email ?? '',
                    fridayEvent: guest.fridayEvent ?? '',
                    ceremony: guest.ceremony ?? '',
                    sundayEvent: guest.sundayEvent ?? '',
                    entre: guest.entre ?? '',
                    notes: guest.notes ?? '',
                }}
                onSubmit={async (values) => {
                    addGuest(values)
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <FormObserver />
                        <hr />
                        <h4>Guest information</h4>
                        {/* <label htmlFor='firstName'>First name</label> */}
                        <Field id='firstName' name='firstName' placeholder='First name' />
            
                        {/* <label htmlFor='lastName'>Last name</label> */}
                        <Field id='lastName' name='lastName' placeholder='Last name' />
            
                        {/* <label htmlFor='email'>Email</label> */}
                        <Field id='email' name='email' placeholder='Email' />
                        <hr />
                        
                        {/* Ceremony */}
                        <h4>Wedding Ceremony & Reception</h4>
                        <p className='rsvpQuestion'>Will you be attending the <em>Wedding Ceremony & Reception</em> on Saturday, July 8th? (5pm – late).</p>

                        {/* <label htmlFor='ceremony'>Ceremony & Reception</label> */}
                        <Field as='select' name='ceremony'>
                            <option disabled value=''>Please select</option>
                            <option value='yes'>Yes! I will be attending.</option>
                            <option value='no'>Unfortunately, I will not be attending.</option>
                        </Field>

                        <div style={{display: (showFields ? 'flex' : 'none'), flexDirection: "column", gap: "12px"}}>
                            <p className='rsvpQuestion'>What would you like for dinner?</p>
                            {/* <label htmlFor='entre'>Entré</label> */}
                            <Field as='select' name='entre'>
                                <option disabled value=''>Please select</option>
                                <option value='chicken'>Chicken</option>
                                <option value='steak'>Hanger steak</option>
                                <option value='vegetarian'>Vegetarian</option>
                            </Field>

                            <hr />
                            <h4>Other events</h4> 
                            
                            <p className='rsvpQuestion'>Will you be attending the <em>Welcome Drinks</em> on Friday, July 7th? (8pm – 12pm)</p>
                            {/* <label htmlFor='fridayEvent'>Welcome drinks</label> */}
                            <Field as='select' id='fridayEvent' name='fridayEvent'>
                                <option disabled value='' >Please select</option>
                                <option value='yes'>Yes! I will be attending.</option>
                                <option value='no'>Unfortunately, I will not be attending.</option>
                                <option value='maybe'>Put me down as a 'maybe'.</option>
                            </Field>
                            
                            <p className='rsvpQuestion'>Will you be attending the <em>Pond brunch</em> on Sunday, July 9th? (12pm – 2pm)</p>
                            {/* <label htmlFor='sundayEvent'>Pond brunch</label> */}
                            <Field as='select' id='sundayEvent' name='sundayEvent'>
                                <option disabled value=''>Please select</option>
                                <option value='yes'>Yes! I will be attending.</option>
                                <option value='no' >Unfortunately, I will not be attending.</option>
                                <option value='maybe'>Put me down as a 'maybe'.</option>
                            </Field>
                        </div>
                        <button type='submit' disabled={isSubmitting}>Submit</button>
                    </Form>
                )}
            </Formik>    
        </div>
    )
}

