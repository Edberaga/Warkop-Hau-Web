
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { ListGroup } from 'react-bootstrap';

const TableCard = ({ no, booked, customer_name, book_time, handleBooking, handleCancelBooking, tableUid, currentUserUid, isUserAdmin }) => {
    const isUserBooked = (currentUserUid === null) ? false : booked && tableUid === currentUserUid; // Check if the user logged in and has booked this table
    
    return (
      <div className="col">
        <div className="card mb-4 rounded-3 shadow-sm">
          <div className={`card-header py-3 ${(booked) ? 'text-bg-success' : 'text-bg-warning'}`}>
            <h4 className="my-0 fw-bold">Meja. {no}</h4>
          </div>
  
          <div className="card-body">
            <div style={{ minHeight: '100px', display: 'flex', flexFlow: 'column', justifyContent: 'center' }}>
              {booked 
                ? 
                <ListGroup style={{ textAlign: "left" }} className='mb-3'>
                  <ListGroup.Item><AccountCircleIcon /> {customer_name}</ListGroup.Item>
                  <ListGroup.Item><AccessTimeIcon /> {book_time}</ListGroup.Item>
                </ListGroup>
                :
                <h1 className="card-title pricing-card-title fst-italic text-black-50">Tidak Dibuku</h1>
              }
            </div>
  
            <button
              onClick={isUserBooked ? handleCancelBooking : (booked ? (isUserAdmin ? handleCancelBooking : null) : handleBooking)} 
              className={`
                w-100 btn btn-lg mb-3
                ${(isUserBooked || isUserAdmin) ? 'text-bg-primary' : (booked ? 'text-bg-success' : 'text-bg-warning')}
              `}
            >
              {(isUserBooked) ? "Batal Pesan" : (booked ? (isUserAdmin ? 'Batal Pesan' : "Telah Dipesan") : "Pesan Meja")}
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default TableCard;