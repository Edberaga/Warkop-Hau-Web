import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useState } from "react";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import logo from '../../assets/images/Logo.webp';
import './styles.scss';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update user profile with displayName (username)
      await updateProfile(user, {
        displayName: username
      });

      toast.success(`User ${username} Successfully Registered`);
      navigate('/');
    } catch (error) {
      setError("Registration failed. Please try again.");
      console.log(error);
    }
  };

  return (
  <Container className="loginContainer">
    <Card className="loginCard">
      <div className="text-center">
        <img style={{width: '250px'}} src={logo} alt="Hau Bofet dan Warung Kopi" />
      </div>
      {error && <p>{error}</p>}
      <Form onSubmit={handleRegister}>
        {/* Username field */}
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        <Button className="px-5" variant="primary" type="submit">
          Register
        </Button>
        <br/>
        <Form.Text>
          Already have an account? <a href="/login">Login here</a>!
        </Form.Text>
      </Form>
    </Card>
  </Container>
  );
};

export default Register;