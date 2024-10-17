import axios from 'axios';
import { Container, ListGroup } from 'react-bootstrap';
import booking from '../data/Tables.json'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useEffect, useState } from 'react';

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
  const [table, setTable] = useState([]);
  const url = 'https://ad05cf14-c6a1-47ee-bf07-5e67270d988b-00-1l68yogb2dq5j.sisko.replit.dev/meja';

  // Fetch events
  const fetchEvents = async () => {
    try {
      const response = await axios.get(url);
      setTable(response.data);
      console.log('Fetched events:', response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
  <section className='container py-3 text-center d-flex justify-content-center'>
    <Container className="row row-cols-1 row-cols-xl-3 mb-3 ">
      {table.map((item) => {
        return <Card key={item.id} no={item.id} booked={item.booked} customer_name={item.customer_name} book_time={item.book_time}/>;
      })}
    </Container>
  </section>
    
  )
}

export default Tables