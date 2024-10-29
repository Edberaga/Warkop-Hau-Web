import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Homepage';
import Tables from './pages/Tables';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/header/Header';
import Menu from './pages/Menu';
import Contact from './pages/Contact';

import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Auth from './pages/Other/Auth';
import Error from './pages/Other/404';

function App() {
  const [user] = useAuthState(auth);
  const adminId = 'QiNSqaxF5WaT9KBXuXJMAHmkwtN2';
  const isAdmin = user?.uid === adminId;
  console.log(user?.uid);

  return (
  <main className='h-full bg-pattern bg-repeat max-w-[1800px] mx-auto overflow-hidden'>
    <Router>
      <Header user={user}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu isAdmin={isAdmin} />} />
        <Route path="/buku-meja" element={<Tables user={user} isAdmin={isAdmin} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={!user ? <Login /> : <Auth />} />
        <Route path="/register" element={!user ? <Register /> : <Auth/>} />
        <Route path="*" element={<Error/>} />
      </Routes>
    </Router>
    <ToastContainer />
  </main>
  )
}

export default App
