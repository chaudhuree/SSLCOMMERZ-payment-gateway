import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard'
import PaymentPage from './pages/PaymentPage'
import PaymentStatus from './pages/PaymentStatus'
function App() {


  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<PaymentPage />} />
          <Route path="/paymentstatus/:status" element={<PaymentStatus />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>

    </div>
  )
}

export default App
