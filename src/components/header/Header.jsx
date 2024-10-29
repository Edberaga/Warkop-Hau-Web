import { Navbar, Nav, Container, Modal, Button } from 'react-bootstrap';
import { auth } from '../../firebase'; // Adjust the path based on your project structure
import { signOut } from 'firebase/auth';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';

import logo from '../../assets/images/content/Logo-white.png';
import menu from '../../data/nav-links.json';
import './styles.scss';
import { useState } from 'react';
import { toast } from 'react-toastify';

const Header = ({ user }) => {
  const isTablet = useMediaQuery({ query: '(max-width: 992px)' });
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleShowLogoutModal = () => setShowLogoutModal(true);
  const handleCloseLogoutModal = () => setShowLogoutModal(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login'); // Redirect user to login page after logout
      setShowLogoutModal(false); // Close logout modal after logout successfull
      toast.success('Succesfully logged out');
    } catch (error) {
      console.error('Error logging out:', error);
      setShowLogoutModal(false); // Close logout modal
      toast.error('Failed to log out: ', error);
    }
  };

  return (
  <nav className='py-2 align-items-center'>
  <Navbar collapseOnSelect expand="lg" >
    <Container>
      <Navbar.Brand href="/">
        <img style={{width: (!isTablet) ? '210px' : '180px' }} src={logo} alt="Hau Bofet dan Warung Kopi." />
      </Navbar.Brand>
      <Navbar.Toggle className='text-light bg-light' aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
        {(user) && 
          <Nav.Link style={{color: 'white', fontWeight: '500', fontSize: '18px'}}>Hi, {user.displayName}</Nav.Link>
        }
        </Nav>
        <Nav >
        {menu.map((item, index) => {
        return (
        <Nav.Link 
          key={index} 
          href={item.link} 
          style={{
            color: 'white', 
            fontWeight: '500',
            fontSize: '18px',
            padding: '0px',
            marginRight: (!isTablet) ? '50px' : '0px',
            marginBottom: (isTablet) ? '20px' : '0px'
          }}
        >
          {item.name}
        </Nav.Link>
        )})}
        <a href='/buku-meja'>
          <button 
            className='btn text-bg-warning' 
            style={{
              border: 0, 
              padding: '5px 25px',
              width: '100%',
              color: 'black', 
              marginBottom: (isTablet) && '20px'
            }}
          >
            Buku Meja
          </button>
        </a>
        {
          (user) && 
          <button 
            className='btn text-bg-danger' 
            onClick={handleShowLogoutModal}
            style={{
              border: 0, 
              padding: '5px 25px', 
              color: 'black',
              marginLeft: (!isTablet) && '10px',
              marginBottom: (isTablet) && '20px'
            }}
          >
            Logout
          </button>
        }
        
        {/* Logout Confirmation Modal */}
        <Modal show={showLogoutModal} onHide={handleCloseLogoutModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Logout</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to log out?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseLogoutModal}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleLogout}>
              Logout
            </Button>
          </Modal.Footer>
        </Modal>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  </nav>
  )
}

export default Header