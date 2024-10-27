import { signInWithEmailAndPassword } from "firebase/auth";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useState } from "react";
import { auth } from "../../firebase"; 
import { useNavigate } from "react-router-dom";

import logo from '../../assets/images/content/Logo.webp';
import './styles.scss';
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Succesfully Logined")
      navigate('/');
      // User is signed in, redirect or close login modal
    } catch (error) {
      setError("Email or password is incorrect");
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
      <Form onSubmit={handleLogin}>
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
        <Button className="px-5" variant="primary" type="submit">
          Login
        </Button>
        <br/>
        <Form.Text>
          Don&apos;t have an account? <a href="/register">Register now</a>!
        </Form.Text>
      </Form>
    </Card>
  </Container>
  );
};

export default Login;