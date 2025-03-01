import { useEffect } from 'react'
import './App.scss'
import { store, useAppDispatch } from './store/store'
import { fetchCountries } from './store/slices/CountryEmissionSlice'
import NavBar from './components/navbar'
import ContentMenu from './components/content-menu'
import Dashboard from './pages/dashboard'


function App() {
  
  return (
    <div className='App'>
      <NavBar/>
      <div className='App__main-page-content'>
          <Dashboard />
      </div>
    </div>
  )
}

export default App
