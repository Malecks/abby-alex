import { db } from '../firebase-config'
import { doc, setDoc } from 'firebase/firestore'
import { useFormik } from 'formik'

import { CssVarsProvider } from '@mui/joy/styles';
import { rsvpTheme } from './MuiTheme';
import { Box, Input, Button, Radio, RadioGroup, FormControl, FormLabel, FormHelperText} from '@mui/joy'

import { useLoaderData } from 'react-router-dom'
import { getGuest } from './FirebaseActions'

// import '@fontsource/public-sans';
import './Rsvp.css'

// Loader func
export const loadGuest = async ({ params }) => {
    return await getGuest(params.guestId)
}

// const validationSchema = yup.object({
//     email: yup
//       .string('Enter your email')
//       .email('Enter a valid email')
//       .required('Email is required'),
//     password: yup
//       .string('Enter your password')
//       .min(8, 'Password should be of minimum 8 characters length')
//       .required('Password is required'),
//   });

export default function RsvpForm() {
    const {guest, guestId} = useLoaderData()

    const formik = useFormik({
        initialValues: {
            party: guest.party ?? '',
            first: guest.first ?? '',
            last: guest.last ?? '',
            email: guest.email ?? '',
            fridayEvent: guest.fridayEvent ?? '',
            ceremony: guest.ceremony ?? '',
            sundayEvent: guest.sundayEvent ?? '',
            entre: guest.entre ?? '',
            notes: guest.notes ?? '',
        },
        // validationSchema: validationSchema,
        onSubmit: async (values) => {
            console.log(values)
            // addGuest(values)
        },
    });

    const addGuest = async (values) => {
        const guestRef = doc(db, 'guests', guestId)
        await setDoc(guestRef, {
            party: values.party,
            first: values.first,
            last: values.last,
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
            <h1>{ guest.first ? (guest.first + ", you're invited!") : "You're invited!" }</h1>
            <CssVarsProvider theme={rsvpTheme}>
                <form onSubmit={formik.handleSubmit}>
                    <hr />
                    <h4>Guest information</h4>
                    <Box sx={{ display:'flex', flexDirection:'column', gap: '12px' }}>
                        <Input 
                            size='lg'
                            // variant='soft'
                            id='first'
                            value={formik.values.first}
                            onChange={formik.handleChange}
                            error={formik.touched.first && Boolean(formik.errors.first)}
                            placeholder={guest.first}
                            // helperText={formik.touched.first && formik.errors.first}
                        />

                        <Input 
                            size='lg'
                            // variant='soft'
                            id='last' 
                            value={formik.values.last}
                            onChange={formik.handleChange}
                            error={formik.touched.last && Boolean(formik.errors.last)}
                            placeholder='Last name'
                            // helperText={formik.touched.last && formik.errors.last}
                        />

                        <Input 
                            size='lg'
                            // variant='soft'
                            id='email'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            placeholder='Email'
                            // helperText={formik.touched.email && formik.errors.email}
                        />
                    </Box>
                    <hr/>
                    <h4>Wedding Ceremony & Reception</h4>

                    <RadioGroup
                        name='ceremony'
                        onChange={formik.handleChange}
                        value={formik.values.ceremony}
                    >
                        <div className='rsvpQuestion'>
                            <p>Ceremony & Reception</p>
                            <p className='rsvpSubheader'>Saturday, July 8th (5pm – late).</p>
                        </div>
                        <FormControl>
                            <Radio 
                                value='yes'
                                label="Yes! I will be able to attend"
                            />
                        </FormControl>
                        <FormControl>
                            <Radio 
                                value='no'
                                label="No. Unfortunately I won't be able to attend"
                            />
                        </FormControl>
                    </RadioGroup>

                    <div style={{display: (formik.values.ceremony==='yes' ? 'flex' : 'none'), flexDirection: "column", gap: "36px"}}>
                        <RadioGroup 
                            name='entre'
                            onChange={formik.handleChange}
                            value={formik.values.entre}
                        >
                            <div className='rsvpQuestion'>
                                <p className='rsvpSubheader'>What would you like for dinner?</p>
                            </div>
                            <FormControl>
                                <Radio
                                    overlay
                                    value='chicken'
                                />
                                <div style={{display: 'flex', flexDirection: "column", marginLeft: "8px"}}>
                                    <FormLabel>Lemon Garlic Roasted Chicken</FormLabel>
                                    <FormHelperText>Oregano, Basil, Castelveltrano Olives. Yukon Gold Mash, Slow-roasted Fennel, Rosemary Butter Roasted Garlic Green Beans</FormHelperText>
                                </div>
                            </FormControl>

                            <FormControl>
                                <Radio 
                                    overlay
                                    value='steak'
                                />
                                <div style={{display: 'flex', flexDirection: "column", marginLeft: "8px"}}>
                                    <FormLabel>Grilled Hanger Steak</FormLabel>
                                    <FormHelperText>Tamari, Garlic, Chile Marinade. Yukon Gold Mash, Slow-roasted Fennel, Rosemary Butter Roasted Garlic Green Beans</FormHelperText>
                                </div>
                            </FormControl>

                            <FormControl>
                                <Radio
                                    overlay
                                    value='vegetarian'
                                />
                                <div style={{display: 'flex', flexDirection: "column", marginLeft: "4px"}}>
                                    <FormLabel>Cauliflower Steaks</FormLabel>
                                    <FormHelperText>Gold Mash, Lentils, Almond Romesco, Chimichurri Roasted Garlic Green Beans</FormHelperText>
                                </div>
                            </FormControl>
                        </RadioGroup>


                        <hr />
                        <h4>Other events</h4>
                        <RadioGroup
                            name='fridayEvent'
                            onChange={formik.handleChange}
                            value={formik.values.fridayEvent}
                        >
                            <div className='rsvpQuestion'>
                                <p>Welcome drinks</p>
                                <p className='rsvpSubheader'>Friday, July 7th (8pm – 12pm).</p>
                            </div>
                            <FormControl>
                                <Radio 
                                    value='yes'
                                    label="Yes! I will be able to attend"
                                />
                            </FormControl>
                            <FormControl>
                                <Radio 
                                    value='no'
                                    label="No. Unfortunately I won't be able to attend"
                                />
                            </FormControl>
                            <FormControl>
                                <Radio 
                                    value='maybe'
                                    label="Maybe? I'm not sure if I can attend"
                                />
                            </FormControl>
                        </RadioGroup>
                       
                        <RadioGroup
                            name='sundayEvent'
                            onChange={formik.handleChange}
                            value={formik.values.sundayEvent}
                        >
                            <div className='rsvpQuestion'>
                                <p>Pond brunch</p>
                                <p className='rsvpSubheader'>Sunday, July 9th (12pm – 2pm).</p>
                            </div>
                            <FormControl>
                                <Radio
                                    value='yes'
                                    label="Yes! I will be able to attend"
                                />
                            </FormControl>
                            <FormControl>
                                <Radio
                                    value='no'
                                    label="No. Unfortunately I won't be able to attend"
                                />
                            </FormControl>
                            <FormControl>
                                <Radio
                                    value='maybe'
                                    label="Maybe? I'm not sure if I can attend"
                                />
                            </FormControl>
                        </RadioGroup>
                    </div>
                    <Button type='submit'>Submit</Button>
                </form>
            </CssVarsProvider>
        </div>
    )
}

