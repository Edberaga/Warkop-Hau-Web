import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Tables from './pages/Tables';
import Login from './pages/Login';

function App() {
  return (
  <main>
    <Router>
      <Routes>
        <Route path="/" element={<Tables />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
    <ToastContainer />
  </main>
  )
}

export default App
