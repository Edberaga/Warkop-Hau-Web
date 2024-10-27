import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Homepage';
import Tables from './pages/Tables';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';

function App() {
  return (
  <main className='h-full bg-pattern bg-repeat max-w-[1800px] mx-auto overflow-hidden'>
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/buku-meja" element={<Tables />} />
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </Router>
    <ToastContainer />
  </main>
  )
}

export default App
