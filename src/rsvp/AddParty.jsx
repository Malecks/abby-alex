import { db } from '../firebase-config'
import { addDoc, collection } from 'firebase/firestore'
import { Formik, Field, Form } from 'formik'

import './Rsvp.css'

function AddParty() {
    const partiesRef = collection(db, 'parties')

    const addParty = async (newParty) => {
        await addDoc(partiesRef, {
            guests: [],
            partyName: newParty
        })
    }

    return (
        <div className='rsvpWrapper'>
            <header id='rsvpHeader'>
                <div>July 8th, 2023 – Ellicottville N.Y.</div>
                <h1>Add a party</h1>
            </header>
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
        </div>
    )
}

export default AddParty