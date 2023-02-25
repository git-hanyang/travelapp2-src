
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Toast,
  ToastContainer,
  Container,
  Card,
  Form,
  FloatingLabel,
  Button,
} from "react-bootstrap";

const Register =() =>{
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const navigate=useNavigate();

  function handleChange(e) {
    const input = e.target;
    const field = input.dataset.field;
    let value = input.value;
    setUserData((prevState) => {
        return { ...prevState, [e.target.id]: e.target.value };
        });
    }

  function createUser(e) {
    console.log(userData)
     e.preventDefault();
      axios({
        url: "http://localhost:3003/user/add",
        method: "post",
        data: { username: userData.username, password: userData.password }
      })
      .then(()=>{
        navigate('/login')
      })
        .catch((err) => {
          console.log(err);
        });
    }
  
  return (
    <>
    <Container
      fluid={true}
      className="d-flex flex-column justify-content-center align-items-center flex-fill position-relative">
      <Card className="w-75 h-50">
        <Card.Body className="h-100 d-flex flex-column justify-content-center align-items-center gap-4">
          <h4>Register</h4>
          <Form
            noValidate
            className="w-75 d-flex flex-column justify-content-center align-content-center gap-3"
            onSubmit={createUser}>
            <FloatingLabel controlId="username" label="Username">
              <Form.Control
                type="text"
                placeholder="Username"
                value={userData.username}
                onChange={handleChange}
                data-field={"username"}
              />
              {/* <Form.Control.Feedback
                tooltip={true}
                className="text-start"
                type="invalid"
              >
                Username must be at least 8 characters long.
                <br />
                Only alphanumeric characters (a-z, A-Z, 0-9) and underscore (_)
                allowed
              </Form.Control.Feedback> */}
            </FloatingLabel>
            <FloatingLabel controlId="password" label="Create Password">
              <Form.Control
                type="password"
                placeholder="Create Password"
                value={userData.password}
                onChange={handleChange}
                data-field={"password"}
              />
            </FloatingLabel>
            
            <Button
              className="flex-grow-0 flex-shrink-0 w-50 mx-auto"
              variant="primary"
              type="submit"
            >
              Create Account
            </Button>
            <p>
              Already registered? <Link to="/login">Sign in</Link> instead.
            </p>
          </Form>
        </Card.Body>
      </Card>
     
    </Container>
    </>
  );
}


export default Register;