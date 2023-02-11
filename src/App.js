import React from 'react'
// import { Routes, Route, BrowserRouter } from 'react-router-dom'


import {
  createBrowserRouter, 
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
import Rsvp from './Rsvp'
import RsvpForm, { getGuest } from './components/RsvpForm'
import AddParty from './components/AddParty'


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Home />}>
        <Route path='/accomodation' element={<Accomodation />} />
        <Route path='/guide' element={<Guide />} />
        <Route path='/house' element={<House />} />
        <Route path='/schedule' element={<Schedule />} />
        <Route path='/faq' element={<Faq />} />
      </Route>
      
      <Route path='/rsvp' element={<Rsvp />}>
          <Route index element={<AddParty />} />
          <Route
            path='/rsvp/:guestId'
            loader={getGuest}
            element={<RsvpForm />} 
          />
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
