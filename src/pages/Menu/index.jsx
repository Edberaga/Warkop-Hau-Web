import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db, storage } from '../../firebase'; // Import storage
import { Container, Row, Col, Button, Card, Dropdown, Modal, Form } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // For image upload
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const Menu = ({ isAdmin }) => {
  const [selectedCategory, setSelectedCategory] = useState('Makanan');
  const [menuItems, setMenuItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newMenuItem, setNewMenuItem] = useState({ nama: '', harga: '', img: null });
  const [selectedUploadCategory, setSelectedUploadCategory] = useState('Makanan');
  const isTablet = useMediaQuery({ query: '(max-width: 992px)' });

  const categories = ['Makanan', 'Minuman', 'Ayam Goreng', 'Sayuran', 'Aneka Jus', 'Tambahan'];

  const fetchMenuItems = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, selectedCategory));
      const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMenuItems(items);
    } catch (error) {
      console.error("Error fetching menu items: ", error);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, [selectedCategory]);

  const handleFileChange = (e) => {
    setNewMenuItem({ ...newMenuItem, img: e.target.files[0] });
  };

  const handleAddMenuItem = async () => {
    if (!newMenuItem.nama || !newMenuItem.harga || !newMenuItem.img) {
      alert("Please fill in all fields and select an image.");
      return;
    }
  
    try {
      console.log("Starting upload for image:", newMenuItem.img);
  
      // Define the storage reference, using the selected category and file name
      const storageRef = ref(storage, `${selectedUploadCategory}/${newMenuItem.img.name}`);
      
      // Upload the file
      const uploadTask = await uploadBytes(storageRef, newMenuItem.img);
      console.log("Image uploaded to storage:", uploadTask.metadata.fullPath);
      
      // Get the download URL
      const imageURL = await getDownloadURL(uploadTask.ref);
      console.log("Image URL obtained:", imageURL);
      
      // Now, add the item to Firestore with the image URL
      await addDoc(collection(db, selectedUploadCategory), {
        nama: newMenuItem.nama,
        harga: newMenuItem.harga,
        img: imageURL,
      });
  
      toast.success("Menu item added successfully!");
      setShowModal(false); // Close the modal upon success
      fetchMenuItems(); // Refresh menu items
    } catch (error) {
      console.error("Error adding menu item:", error);
      toast.error("Failed to add menu item.");
    }
  };

  return (
    <Container className="py-4">
      {isAdmin && (
        <Button onClick={() => setShowModal(true)} variant="primary" className="mb-4">
          Add New Menu Item
        </Button>
      )}

      <div className="text-center mb-4">
        {!isTablet
          ? categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'primary' : 'outline-primary'}
                onClick={() => setSelectedCategory(category)}
                style={{ margin: '0 10px' }}
              >
                {category}
              </Button>
            ))
          : (
            <Dropdown className="mb-4 w-100">
              <Dropdown.Toggle variant="primary" id="dropdown-basic" style={{ width: '100%' }}>
                {selectedCategory}
              </Dropdown.Toggle>
              <Dropdown.Menu className="w-100">
                {categories.map(category => (
                  <Dropdown.Item key={category} onClick={() => setSelectedCategory(category)}>
                    {category}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          )}
      </div>

      {/* Display Menu Items */}
      <Row className="menu-items">
        {menuItems.map((item, index) => (
        <Col key={item.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
        <motion.div 
          initial={{ scale: 0, rotate: 180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', delay: index * 0.3 }}
        >
          <Card className="h-100 shadow-sm">
            <Card.Img variant="top" src={item.img} alt={item.nama} style={{ height: '200px', objectFit: 'cover' }} />
            <Card.Body>
              <Card.Title style={{ fontWeight: '600', textTransform: 'capitalize' }}>{item.nama}</Card.Title>
              <Card.Text>
                <strong>Rp.</strong> {item.harga}<span style={{ fontSize: '12px' }}></span>
              </Card.Text>
            </Card.Body>
          </Card>
        </motion.div>
        </Col>
        ))}
      </Row>

      {/* Modal for Adding New Menu Item */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Menu Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nama</Form.Label>
              <Form.Control
                type="text"
                value={newMenuItem.nama}
                onChange={(e) => setNewMenuItem({ ...newMenuItem, nama: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Harga</Form.Label>
              <Form.Control
                type="text"
                value={newMenuItem.harga}
                onChange={(e) => setNewMenuItem({ ...newMenuItem, harga: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Dropdown onSelect={(eventKey) => setSelectedUploadCategory(eventKey)}>
                <Dropdown.Toggle variant="secondary" id="category-dropdown">
                  {selectedUploadCategory}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {categories.map(category => (
                    <Dropdown.Item key={category} eventKey={category}>
                      {category}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddMenuItem}>
            Add Item
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Menu;