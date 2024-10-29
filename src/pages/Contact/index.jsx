import { useRef } from 'react';
import { Container, ListGroup, Form, Button, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import con from '../../data/contact.json';
import map from '../../assets/images/map.webp';
import './styles.scss';
import { toast } from 'react-toastify';

const Contact = () => {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_4jw6323', 'template_2lbsywe', form.current, '62rcHLvMvFBxOexNN')
    .then((result) => {
        console.log(result.text);
        toast.success('Mail sent succesfully');
    }, (error) => {
        console.log(error.text);
        toast.error('Mail sent error...');
    });
  };

  return (
  <section className='py-5'>
    <h1 className="text-center mb-5">Want to Talk? Let&apos;s Chat</h1>
    <Container className="contact-container d-flex justify-content-center flex-wrap">
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0, }}
        transition={{ duration: 1.2 }}
        className="d-flex flex-column align-items-center mb-5 w-100" 
        style={{ maxWidth: '600px' }}
      >
        <ListGroup className="w-100 mb-3" >
          <a href="mailto:edbertjonnathan@gmail.com" style={{textDecoration: 'none'}}>
          <ListGroup.Item>
            <strong>Email:</strong> {con.email}
          </ListGroup.Item>
          </a>
          
          <a href="callto:+6282169672989" style={{textDecoration: 'none'}}>
          <ListGroup.Item>
            <strong>Phone:</strong> {con.phone}
          </ListGroup.Item>
          </a>

          <a href="mailto:edbertjonnathan@gmail.com" style={{textDecoration: 'none'}}>
          <ListGroup.Item>
            <strong>Address:</strong> {con.address}
          </ListGroup.Item>
          </a>
        </ListGroup>
        <a target='_blank' href={con.map}>
          <img className='w-100' src={map} style={{ maxWidth: '600px'}} alt="Lokasi Warkop Hau" />
        </a>
        
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0, }}
        transition={{ duration: 1.2 }}
        className="d-flex flex-column align-items-center mb-5 w-100"
        style={{ maxWidth: '600px' }}
      >
      {/*Show the Map */}
      <Form ref={form} onSubmit={sendEmail} className='contact-form w-100 py-5'>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formName">
              <Form.Control 
                type="text" 
                name="name" 
                placeholder="Enter your name" 
                required 
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formEmail">
              <Form.Control 
                type="email" 
                name="email" 
                placeholder="Enter email" 
                required 
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formPhone">
              <Form.Control 
                type="number" 
                name="phone_number" 
                placeholder="Enter phone number" 
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formSubject">
              <Form.Control 
                type="text" 
                name="subject" 
                placeholder="Enter subject" 
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="formMessage" className="mb-4">
          <Form.Control 
            as="textarea" 
            rows={5} 
            name="message" 
            placeholder="Write your message here" 
            required 
          />
        </Form.Group>

        <div className="text-center">
          <Button type="submit" variant="primary" className="px-4">
            Send Message
          </Button>
        </div>
      </Form>
      </motion.div>
    </Container>
  </section>
  )
}

export default Contact