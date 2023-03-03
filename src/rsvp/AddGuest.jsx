import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { addParty, addGuest, getParties } from './FirebaseActions'

import { CssVarsProvider } from '@mui/joy/styles';
import { rsvpTheme } from './MuiTheme';
import { Input, Button, Divider } from '@mui/joy'

import './Rsvp.css'

function AddGuest() {

    const [parties, setParties] = useState([])

    const formikAddParty = useFormik({
        initialValues: {
            partyName: '',
        },
        onSubmit: async (values, helpers) => {
            console.log('add party: ', values.partyName)
            await addParty(values.partyName)
            await updateParties()
            helpers.resetForm()
        }
    })

    const formikAddGuest = useFormik({
        initialValues: {
            party: '',
            first: '',
            last: '',
            email: '',
        },
        // validationSchema: validationSchema,
        onSubmit: async (values, helpers) => {
            console.log('add guest: ', values)
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
            helpers.resetForm()
        },
    });

    const updateParties = async () => {
        const data = await getParties()
        setParties(data)
    }

    useEffect(() => {
        updateParties()
    }, [])

    return (<>
        <CssVarsProvider theme={rsvpTheme}>
            <h4>Add a party</h4>
            <form onSubmit={formikAddParty.handleSubmit}>
                <Input 
                    size='lg'
                    id='partyName'
                    value={formikAddParty.values.partyName}
                    onChange={formikAddParty.handleChange}
                    error={formikAddParty.touched.partyName && Boolean(formikAddParty.errors.partyName)}
                    placeholder='Party name'
                />
                <Button type='submit'>Add party</Button>
            </form>
            <Divider sx={{marginTop: 4, marginBottom: 4}}/>
            <h4>Add a guest</h4>
            <form onSubmit={formikAddGuest.handleSubmit} required>
                <select 
                    as="select" 
                    size='lg'
                    id='party'
                    onChange={formikAddGuest.handleChange}
                    value={formikAddGuest.values.par}
                >
                    <option selected value>----- Select party -------</option>
                    { parties.map((party) => {
                        return <option value={party.id} key={party.id}> {party.partyName} </option>
                    })}
                </select>

                <Input 
                    size='lg'
                    id='first'
                    value={formikAddGuest.values.first}
                    onChange={formikAddGuest.handleChange}
                    error={formikAddGuest.touched.first && Boolean(formikAddGuest.errors.first)}
                    placeholder='First name'
                    // helperText={formik.touched.first && formik.errors.first}
                />

                <Input 
                    size='lg'
                    id='last'
                    value={formikAddGuest.values.last}
                    onChange={formikAddGuest.handleChange}
                    error={formikAddGuest.touched.last && Boolean(formikAddGuest.errors.last)}
                    placeholder='Last name'
                    // helperText={formik.touched.last && formik.errors.last}
                />

                <Input 
                    size='lg'
                    id='email'
                    value={formikAddGuest.values.email}
                    onChange={formikAddGuest.handleChange}
                    error={formikAddGuest.touched.email && Boolean(formikAddGuest.errors.email)}
                    placeholder='Email'
                    // helperText={formik.touched.email && formik.errors.email}
                />
                <Button type='submit'>Add guest</Button>
            </form>
        </CssVarsProvider>
    </>)
}

export default AddGuest