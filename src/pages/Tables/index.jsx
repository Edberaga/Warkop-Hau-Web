import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import backend from '../../data/backend'
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { TimePicker } from 'react-time-picker';
import TableCard from '../../components/tableCard/TableCard';

const Tables = ({ user, isAdmin }) => {
  const [table, setTable] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCancelModal, setShowCancelModal ] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [selectedTableId, setSelectedTableId] = useState(null);
  const [customerName, setCustomerName] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const navigate = useNavigate();
  const url = backend.url;

  const currentUserUid = user ? user.uid : null;

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
      setShowLoginModal(true);
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
    {table.map((item , index) => (
    <motion.div 
      key={item.id}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', delay: index * 0.18 }}
    >
      <TableCard
        no={item.id} 
        booked={item.booked} 
        customer_name={item.customer_name} 
        book_time={item.book_time}
        handleBooking={() => handleBooking(item.id)}
        handleCancelBooking={() => handleCancelBooking(item.id)}
        tableUid={item.uid}
        currentUserUid={currentUserUid}
        isUserAdmin={isAdmin}
      />
    </motion.div>
    
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

    {/* Login Required Modal */}
    <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Login Required</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Please log in to book a table.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowLoginModal(false)}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => navigate("/login")}>
          Login
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