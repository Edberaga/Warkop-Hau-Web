import { Button, Container } from "react-bootstrap"
import './styles.scss';

const Home = () => {
  return (
  <section className="homepage" >
    <Container style={{maxWidth: '700px', }}>
      <h1 >Hau Bofet dan Warung Kopi</h1>
      <p style={{}}>
        Discover the authentic flavors of Southeast Asia right here at Hau Bofet dan Warung Kopi. Enjoy our curated dishes, refreshing drinks, and warm atmosphere. Let us bring you a taste of home.
      </p>
      <div style={{ display: 'flex', width:'100%', gap:'10px' }}>
        <Button className="w-50" href="/menu">Lihat Menu</Button>
        <Button className="w-50 btn-outline-primary" href="/buku-meja">Buku Meja</Button>
      </div>
    </Container>
    
  </section>
  )
}

export default Home