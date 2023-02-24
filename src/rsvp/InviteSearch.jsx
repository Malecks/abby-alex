import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase-config'
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { useFormik } from 'formik'

import { CssVarsProvider } from '@mui/joy/styles';
import { rsvpTheme } from './MuiTheme';
import { Input, Button } from '@mui/joy'

export default function InviteSearch () {
    const Searching = {
        yes: 'Searching...',
        no: 'Search for your invite by email address',
        error: "Sorry, we couldn't find an invite with that email address."
    }

    const [searching, setSearching] = useState(Searching.no)

    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        // validationSchema: validationSchema,
        onSubmit: async (values) => {
            setSearching(Searching.yes)
            searchForInvite(values.email)
        },
    });

    const searchForInvite = async (email) => {
        console.log(email)
        const guestsRef = collection(db, 'guests')
        const q = query(guestsRef, where("email", "==", email), limit(1));
       
        const querySnapshot = await getDocs(q)
        if (querySnapshot.empty) {
            setSearching(Searching.error)
        }

        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data())
            navigate("your-party/" + doc.id)
        })
    }

    return (<>
        <header>
            <h1>RSVP</h1>
            <p className='prompt'>{searching}</p>
            </header>
        <CssVarsProvider theme={rsvpTheme}>


            <form onSubmit={formik.handleSubmit}>
                <Input 
                    size='lg'
                    id='email'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    placeholder='Email'
                    // helperText={formik.touched.first && formik.errors.first}
                />
                <Button type='submit'>Search</Button>
            </form>
        </CssVarsProvider>
    </>)
}