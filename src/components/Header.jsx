import React, { useContext, useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Container, Nav, Navbar } from "react-bootstrap";
import Cookies from 'js-cookie'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginStatus } from "../PlannerContext";

export default function Header() {
  const [expanded, setExpanded] = useState(false);
  const [isLoggedIn,setLoggedIn]= useContext(LoginStatus);

  const navigate=useNavigate()
  useEffect(()=>{
   getUser()
  })

  function getUser(){
    if(Cookies.get('jwt')){
      // this is to get cookies with jwt as the name
      //https://github.com/js-cookie/js-cookie
      setLoggedIn(true)
    }else{
      setLoggedIn(false)
    }
  }

  function logOut(){
    axios({
      url: `http://localhost:3003/user/logout`,
      method: "delete",
    })
    .then(()=>{
      Cookies.remove("jwt")
      Cookies.remove("bridge")
      setLoggedIn(false)
    })
    .then(()=>{
      navigate('/')
    })
  }
  return (
    <Navbar bg="dark" variant="dark" expand="lg" expanded={expanded}>
      <Container>
        <Navbar.Brand>
          <LinkContainer to="/">
            <h1 className="m-0 p-0">Traveller App</h1>
          </LinkContainer>
        </Navbar.Brand>
        <Navbar.Toggle
          onClick={() => setExpanded(expanded ? false : "expanded")}
        />

        {isLoggedIn?
        <Navbar.Collapse>
          <Nav className="ms-auto">
            <LinkContainer to="/" onClick={() => setExpanded(false)}>
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/dashboard" onClick={() => setExpanded(false)}>
              <Nav.Link>Dashboard</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/destinations" onClick={() => setExpanded(false)}>
              <Nav.Link>Destinations</Nav.Link>
            </LinkContainer>

            {isLoggedIn?
              <LinkContainer to="/" onClick={logOut}>
              <Nav.Link>SignOut</Nav.Link>
            </LinkContainer>
            : <LinkContainer to="/login" onClick={() => setExpanded(false)}>
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>}
          </Nav>
        </Navbar.Collapse>
        :
        null
        }
      </Container>
    </Navbar>
  );
}
