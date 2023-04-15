import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import PaymentPage from './pages/PaymentPage'
import PaymentStatus from './pages/PaymentStatus'
function App() {


  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<PaymentPage />} />
          <Route path="/paymentstatus/:status" element={<PaymentStatus />} />
        </Routes>
      </Router>

    </div>
  )
}

export default App
