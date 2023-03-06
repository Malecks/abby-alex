import React from 'react'
// import { Routes, Route, BrowserRouter } from 'react-router-dom'


import {
  createHashRouter, 
  createRoutesFromElements,
  Route, 
  RouterProvider
} from 'react-router-dom'

import './App.css'
import Home from './Home'
import Guide from './Guide'
import Accomodation from './Accomodation'
import House from './House'
import Schedule from './Schedule'
import Faq from './Faq'
import Rsvp from './rsvp/Rsvp'
import RsvpForm, { loadGuest } from './rsvp/RsvpForm'
import GuestList from './mng/GuestList'
import InviteSearch from './rsvp/InviteSearch'
import AddGuest from './mng/AddGuest'
import YourParty, { loadGuest as loadPartyGuest } from './rsvp/YourParty'
import ErrorPage from './ErrorPage'


const router = createHashRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Home />} errorElement={<ErrorPage />}>
        <Route path='/accomodation' element={<Accomodation />} />
        <Route path='/guide' element={<Guide />} />
        <Route path='/house' element={<House />} />
        <Route path='/schedule' element={<Schedule />} />
        <Route path='/faq' element={<Faq />} />
      </Route>
      
      <Route path='/rsvp' element={<Rsvp />} errorElement={<ErrorPage />}>
          <Route index element={<InviteSearch />} />
          <Route
            path='/rsvp/:guestId'
            loader={loadGuest}
            element={<RsvpForm />} 
          />
          <Route 
            path='/rsvp/your-party/:guestId' 
            loader={ loadPartyGuest }
            element={<YourParty />} />
      </Route>

      <Route path='/mng' element={<Rsvp />} errorElement={<ErrorPage />}>
        <Route index element={<GuestList />} />
        <Route path='/mng/add-guest' element={<AddGuest />} />
      </Route>
    </>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
