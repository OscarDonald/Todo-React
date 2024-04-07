// Components

import Header from './Header'
import MainContent from './MainContent'
import Footer from './Footer'



import './App.css'
import StateProvider from './Context/StateContext'
import { Routes, Route } from 'react-router-dom'

function App() {


  return (
    <>
      <Header title="The Board App" />
      <Routes>
        <Route path='*' element={
          <StateProvider>
            <MainContent />
          </StateProvider>
        } />
      </Routes>
      <Footer />
    </>
  )
}

export default App
