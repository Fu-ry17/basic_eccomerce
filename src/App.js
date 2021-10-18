import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import Pages from './components/pages/Pages'
import NavBar from './components/nav/NavBar'

export default function App() {

  return (
    <Router>

      <div>
          <NavBar />
          <Pages />
      </div>

    </Router>
  )
}
