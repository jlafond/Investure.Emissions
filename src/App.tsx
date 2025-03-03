import './App.scss'
import NavBar from './components/navbar'
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
