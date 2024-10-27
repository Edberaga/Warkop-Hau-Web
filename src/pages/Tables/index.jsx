import axios from 'axios';
import { auth } from '../../firebase';
import { useEffect, useState } from 'react';
import { Container, ListGroup, Modal, Button, Form } from 'react-bootstrap';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from 'react-router-dom';
import backend from '../../data/backend.json'

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { toast } from 'react-toastify';
import { TimePicker } from 'react-time-picker';

const Card = ({ no, booked, customer_name, book_time, handleBooking, handleCancelBooking, tableUid, currentUserUid }) => {
  const adminId = 'HtDyb4IYJLObM7yXffmehXSxeBJ3';
  const isUserBooked = booked && tableUid === currentUserUid; // Check if the user has booked this table
  const isUserAdmin = adminId === currentUserUid;

  return(
  <div className="col">
    <div className="card mb-4 rounded-3 shadow-sm">
      <div className={`card-header py-3 ${(booked) ? 'text-bg-success' : 'text-bg-warning'}`}>
        <h4 className="my-0 fw-bold">Meja. {no}</h4>
      </div>

      <div className="card-body">
        <div style={{minHeight: '100px', display: 'flex', flexFlow: 'column', justifyContent: 'center'}}>
        {booked 
          ? 
          <ListGroup style={{textAlign: "left"}} className='mb-3 '>
            <ListGroup.Item><AccountCircleIcon/> {customer_name}</ListGroup.Item>
            <ListGroup.Item><AccessTimeIcon/> {book_time}</ListGroup.Item>
          </ListGroup>
          :
          <h1 className="card-title pricing-card-title fst-italic text-black-50">Tidak Dibuku</h1>
        }
        </div>

        <button
          onClick={isUserBooked ? handleCancelBooking : (!booked ? handleBooking: null)} 
          className={`
            w-100 btn btn-lg mb-3
            ${(isUserBooked) ? 'text-bg-primary' : (booked ? 'text-bg-success' : 'text-bg-warning')}
          `}
        >
          {isUserBooked ? "Batal Pesan" : (booked ? "Telah Dipesan" : "Pesan Meja")}
        </button>
        {(isUserAdmin) &&
        <button
          onClick={booked ? handleCancelBooking : handleBooking} 
          className={`w-100 btn btn-lg text-bg-primary`}
        >
          {booked ? "Tutup Meja" : "Tandai Meja telah Dibuku"}
        </button>
        }
      </div>
    </div>
  </div>
  )
}

const Tables = () => {
  const [user] = useAuthState(auth);
  const [table, setTable] = useState([]);
  const [showCancelModal, setShowCancelModal ] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [selectedTableId, setSelectedTableId] = useState(null);
  const [customerName, setCustomerName] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const navigate = useNavigate();
  const url = backend.url;

  const fetchTables = async () => {
    try {
      const response = await axios.get(url);
      setTable(response.data);
      console.log('Fetched events:', response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleBooking = (tableId) => {
    if (!user) {
      navigate("/login"); // Redirect to login page if user is not logged in
      return;
    }
    setCustomerName(user.displayName);
    setSelectedTableId(tableId);
    console.log(`${url}/${selectedTableId}`);
    setShowTimeModal(true); // Show time selection modal
  };

  const confirmBooking = async () => {
    if (!selectedTableId) { //Ensure selected table ID exists
      toast.error("Error: Selected table ID did not exist");
    }
    try {
      await axios.put(`${url}/${selectedTableId}`, {
        booked: true,
        customer_name: customerName,
        book_time: selectedTime,
        uid: user.uid
      });
      fetchTables(); // Refresh table list after booking
      toast.success(`Pesanan Meja ${selectedTableId} berhasil diterima oleh ${customerName}.`);
      setShowTimeModal(false);
    } catch (error) {
      console.error('Error booking table:', error);
      toast.error('Pesanan Meja gagal diterima.', error);
    }
  };

  const handleCancelBooking = async (tableId) => {
    setSelectedTableId(tableId);
    setShowCancelModal(true);
  };

  const confirmCancelBooking = async () => {
    if (!selectedTableId) { //Ensure selected table ID exists
      toast.error("Error: Selected table ID did not exist");
    }
    try {
      await axios.put(`${url}/${selectedTableId}`, {
        booked: false,
        customer_name: null,
        book_time: null,
        uid: null,
      });
      fetchTables(); // Refresh table list after canceling
      setShowCancelModal(false); // Hide cancel modal after canceling booking
      toast.success('Pesanan Meja berhasil dibatalkan.');
    } catch (error) {
      console.error('Error canceling booking:', error);
      toast.error('Pesanan Meja gagal dibatalkan.', error);
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  return (
  <section className='container py-3 text-center d-flex flex-column align-items-center'>
    {(user) && <h1>Hello, {user.displayName}</h1>}
    <Button 
      className='btn btn-success btn-lg my-5' 
      style={{
        fontWeight: "600",
        fontSize: "18px"
      }} 
      href='https://wa.link/zmf47m'
      target='_blank'
    >
      <WhatsAppIcon/> Pesan Melalui WhatsApp
    </Button>
    <Container className="row row-cols-1 row-cols-xl-3 mb-3 ">
    {table.map((item) => (
    <Card 
      key={item.id} 
      no={item.id} 
      booked={item.booked} 
      customer_name={item.customer_name} 
      book_time={item.book_time}
      handleBooking={() => handleBooking(item.id)}
      handleCancelBooking={() => handleCancelBooking(item.id)}
      tableUid={item.uid}
      currentUserUid={user ? user.uid : null}
    />
    ))}
    </Container>

    {/* Time Selection Modal */}
    <Modal show={showTimeModal} onHide={() => setShowTimeModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Pilih Waktu untuk Pesan Meja</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
        <Form.Group>
          <Form.Label>Atas Nama</Form.Label>
            <Form.Control
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Edbert Lim"
            />
          </Form.Group>
          <TimePicker onChange={setSelectedTime} value={selectedTime} />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowTimeModal(false)}>
          Cancel
        </Button>
        <Button variant="primary" onClick={confirmBooking}>
          Confirm Booking
        </Button>
      </Modal.Footer>
    </Modal>

    {/*Cancel Booking Modal */}
    <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Batalkan Pesan Meja</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Apakah Anda yakin ingin membatalkan pesanan meja ini?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowCancelModal(false)}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => confirmCancelBooking(selectedTableId)}>
          Iya, Batalkan
        </Button>
      </Modal.Footer>
    </Modal>
  </section>
  )
}

export default Tables