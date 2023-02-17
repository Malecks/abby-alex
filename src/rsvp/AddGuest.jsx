import { useEffect, useState } from 'react'
import { Formik, Field, Form } from 'formik'
import { addParty, addGuest, getParties } from './FirebaseActions'

import './Rsvp.css'

function AddGuest() {

    const [parties, setParties] = useState([])

    const updateParties = async () => {
        const data = await getParties()
        setParties(data)
    }

    useEffect(() => {
        updateParties()
    }, [])

    return (
        <div className='rsvpWrapper'>
            <h4>Add a party</h4>
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
                        <Field id='partyName' name='partyName' placeholder='Party name' />
                        <button type='submit' disabled={isSubmitting}>Add party</button>
                    </Form>
                )}
            </Formik>

            <hr />
            <h4>Add a guest</h4>
            <Formik
                initialValues={{
                    party: '',
                    first: '',
                    last: '',
                    email: '',
                    // fridayEvent: '',
                    // ceremony: '',
                    // sundayEvent: '',
                    // entre: '',
                    // notes: ''
                }}
                onSubmit={ async (values) => {
                   await addGuest({
                        party: values.party,
                        first: values.first,
                        last: values.last,
                        email: values.email,
                        fridayEvent: '',
                        ceremony: '',
                        sundayEvent: '',
                        entre: '',
                        notes: ''
                    })
                }}
            >
                {({ isSubmitting }) => (
                    <Form>

                        <Field as='select' name='party'>
                            <option disabled value=''>Party name</option>
                            { parties.map((party) => {
                             return <option value={party.id} key={party.id}> {party.partyName} </option>
                            })}
                        </Field>
                        {/* <Field id='party' name='party' placeholder='Party name' /> */}
                        <Field id='first' name='first' placeholder='First name' />
                        <Field id='last' name='last' placeholder='Last name' />
                        <Field id='email' name='email' placeholder='Email' />
                        <button type='submit' disabled={isSubmitting}>Add guest</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default AddGuest