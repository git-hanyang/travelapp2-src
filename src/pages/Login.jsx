import { useState, useEffect, useContext, useRef } from "react";
import { Link, useNavigate} from "react-router-dom";
import {
  Container,
  Card,
  Toast,
  ToastContainer,
  Form,
  FloatingLabel,
  Button,
} from "react-bootstrap";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import axios from "axios";
import { LoginStatus } from "../PlannerContext";



const Login = () => {
  const [isLoggedIn,setLoggedIn]= useContext(LoginStatus);

  const navigate = useNavigate();
  const usernameRef= useRef()
  const passwordRef=useRef()

  function handleLogin(e) {
    e.preventDefault();

    const user={
        username:usernameRef.current.value,
        password:passwordRef.current.value,
    }
    
    axios({  
      url:"http://localhost:3003/user/verify",
      method:"post",
      data:user,
      withCredentials:true,
    })
      .then(()=>{
        setLoggedIn(true)
        navigate('/dashboard')
        //console.log(user)
      })
      .catch((err) => {
        console.log(err)
      });
  }


  return (
    <>
    <Container
      fluid={true}
      className="flex-fill d-flex flex-column justify-content-center align-items-center position-relative"
    >
        <Card className="w-75 h-50">
            <Card.Body className="h-100 d-flex flex-column justify-content-center align-items-center gap-4">
            <h4>Sign In</h4>
            <Form
                onSubmit={handleLogin}
                className="w-75 d-flex flex-column justify-content-center align-content-center gap-3"
            >
                <FloatingLabel controlId="username" label="Username">
                <Form.Control
                    type="text"
                    ref={usernameRef}
                    autoComplete="username"
                    required
                />
                </FloatingLabel>
                <FloatingLabel controlId="password" label="Password">
                <Form.Control
                    type="password"
                    ref={passwordRef}
                    autoComplete="current-password"
                    required
                />
                </FloatingLabel>

                <Button
                className="flex-grow-0 flex-shrink-0 w-50 mx-auto"
                type="submit"
                >
                Sign In
                </Button>
            </Form>
            <p>
                Don't have an account? <Link to="/signup">Sign Up</Link> instead.
            </p>
            </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Login;