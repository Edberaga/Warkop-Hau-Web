import { Navbar, Nav, Container, Button} from 'react-bootstrap';
import logo from '../assets/images/content/Logo-white.png';
import menu from '../data/nav-links.json';
import './styles.scss';
import { useMediaQuery } from 'react-responsive';

const Header = () => {
  const isTablet = useMediaQuery({ query: '(max-width: 992px)' })
  return (
  <nav className='py-2'>
  <Navbar collapseOnSelect expand="lg">
    <Container>
      <Navbar.Brand href="/">
        <img style={{width: (!isTablet) ? '250px' : '180px' }} src={logo} alt="Hau Bofet dan Warung Kopi." />
      </Navbar.Brand>
      <Navbar.Toggle className='text-light bg-light' aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
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
          )}
        )}
        <Button className='bg-warning' style={{border: 0, padding: '5px 25px', color: 'black', marginBottom: (isTablet) && '20px'}} href='/buku-meja'>Buku Meja</Button>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  </nav>
  )
}

export default Header