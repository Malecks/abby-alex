import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase-config'
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { Formik, Field, Form } from 'formik'

export default function InviteSearch () {
    const [prompt, setPrompt] = useState('')
    const navigate = useNavigate()

    const searchForInvite = async (email) => {
        console.log(email)
        const guestsRef = collection(db, 'guests')
        const q = query(guestsRef, where("email", "==", email), limit(1));
       
        const querySnapshot = await getDocs(q)
        if (querySnapshot.empty) {
            console.log("EMPTY TEMPTY")
            setPrompt("Sorry we couldn't find an invite associated with that email address.")
        }

        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data())
            setPrompt('')
            navigate("your-party/" + doc.id)
        })
    }

    return (
        <>
            <header id='rsvpHeader'>
                <h1>RSVP</h1>
            </header>
            <p className='prompt'>{prompt}</p>
            <Formik
                initialValues={{
                    email:'',
                }}
                onSubmit={async (values) => {
                    setPrompt('Searching...')
                    searchForInvite(values.email)
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <label htmlFor='email'>Email</label>
                        <Field id='email' name='email' placeholder='your.name@gmail.com' />
                        <button type='submit' disabled={isSubmitting}>Search</button>
                    </Form>
                )}
            </Formik>
        </>
    )
}