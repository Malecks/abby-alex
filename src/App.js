import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'

import './App.css'
import Home from './Home'
import Guide from './Guide'
import Accomodation from './Accomodation'
import House from './House'
import Schedule from './Schedule'
import Faq from './Faq'

function App() {
  return <HashRouter>
      <Routes>
        <Route path='/' element={<Home />}>
          <Route path='/accomodation' element={<Accomodation />}></Route>
          <Route path='/guide' element={<Guide />}></Route>
          <Route path='/house' element={<House />}></Route>
          <Route path='/schedule' element={<Schedule />}></Route>
          <Route path='/faq' element={<Faq></Faq>}></Route>
        </Route>
      </Routes>
  </HashRouter>
}

export default App