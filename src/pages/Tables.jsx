import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Container, ListGroup } from 'react-bootstrap';
import booking from '../data/Tables.json'

const Card = ({ no, booked, customer_name, book_time}) => {
  return(
  <div className="col">
    <div className="card mb-4 rounded-3 shadow-sm">
      <div className={`card-header py-3 ${(booked) ? 'text-bg-success' : 'text-bg-warning'}`}>
        <h4 className="my-0 fw-bold">Meja. {no}</h4>
      </div>

      <div className="card-body ">
        <div style={{minHeight: '100px', display: 'flex', flexFlow: 'column', justifyContent: 'center'}}>
        {(booked) 
        ? 
        <ListGroup style={{textAlign: "left"}} className='mb-3 '>
          <ListGroup.Item><AccountCircleIcon/> {customer_name}</ListGroup.Item>
          <ListGroup.Item><AccessTimeIcon/> {book_time}</ListGroup.Item>
        </ListGroup>
        :
        <h1 className="card-title pricing-card-title fst-italic text-black-50">Tidak Dibuku</h1>
        }
        </div>
        <button className={`w-100 btn btn-lg btn-outline-primary ${(booked) ? 'text-bg-success' : 'text-bg-warning'}`}>
          {(booked) ? "Telah Dipesan" : "Pesan Meja"}
        </button>
      </div>
    </div>
  </div>
  )
}

const Tables = () => {
  return (
  <section className='container py-3 text-center d-flex justify-content-center'>
    <Container className="row row-cols-1 row-cols-xl-3 mb-3 ">
      {booking.map((item) => {
        return <Card key={item.no} no={item.no} booked={item.booked} customer_name={item.customer_name} book_time={item.book_time}/>;
      })}
    </Container>
  </section>
    
  )
}

export default Tables