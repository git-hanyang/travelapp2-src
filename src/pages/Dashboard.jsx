import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import React, { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import axios from "axios"; //no need to use .json
import { LinkContainer } from "react-router-bootstrap";
import {
  Container,
  Card,
  Button,
} from "react-bootstrap";

import DestinationCards from "../components/DashboardComponents/DestinationCards";

import PlannerCards from "../components/DashboardComponents/PlannerCards";
import cityData from "../data/destinations";
import { PlannerContext,countStatus } from "../PlannerContext";
import { LoginStatus } from "../PlannerContext";



export default function Dashboard() {
  const [plannerData,setPlannerData]=useContext(PlannerContext)
  const [isLoggedIn,setLoggedIn]= useContext(LoginStatus)
  const [count,setCount]=useContext(countStatus)

  const [plannerLoaded,setPlannerLoaded]=useState(false)
  const [destinationsData, setDestinationsData] = useState([]);
  const [destinationsLoaded, setDestinationsLoaded]=useState(false)
  

  function fetchDestinationsData() {
    const dataArray = [];
    for (const key in cityData) {
      dataArray.push(cityData[key]);
    }
    setDestinationsData(dataArray);
    setDestinationsLoaded(true)
  }

  function fetchPlannerData() {
    const token = Cookies.get('jwt')
    console.log(token)
    axios({
      url: `https://travelapp2u-api.onrender.com/api/planner`,
      method: "get",
      headers:{
        Authorization:`Bearer ${token}`
      },
      withCredentials:true
    })
    .then((res)=>{
      // console.log(res.data)
      setPlannerData(res.data)
      // console.log(plannerData)
      setPlannerLoaded(true)
    })
    .catch((err)=>{
      console.log(err.response.status)
    })
  }

  useEffect(() => {
    //console.log(document.cookie)
    fetchPlannerData();
    fetchDestinationsData();
  }, []);

  useEffect(()=>{
    fetchPlannerData()
  },[count])


  
  return (
  <>
    <Container
      fluid={true}
      className="flex-fill "
    >
    <br />
      <h2>Dashboard</h2>
  
        <Container
          fluid={true}
          className="d-flex flex-column justify-content-center align-items-start p-0 gap-1"
        >
          <h5>Destinations</h5>
          
            <Container
              fluid={true}
              className="d-flex flex-row justify-content-start align-items-center gap-3 p-2"
              style={{ overflowX: "auto" }}
            >
              {destinationsLoaded ? (
                destinationsData.map((city,idx) => {
                  return (
                    <DestinationCards
                      data={city}
                      key={idx}
                      className="mb-3"
                    />
                  );
                })
              ) : (
                <h5>Loading...</h5>
              )}
            </Container>
        </Container>

      <Container
        fluid={true}
        className="d-flex flex-column justify-content-center align-items-start p-0 gap-3 my-2"
      >
        <h5>Planner</h5>
        
        <Container
          fluid={true}
          className="d-flex flex-row justify-content-start align-items-center gap-3 p-2"
          style={{ overflowX: "auto" }}
        >
          {plannerLoaded ? (
              plannerData.map((planner,idx) => {
                return (
                  <PlannerCards
                    data={planner}
                    key={idx}
                    // state={setPlannerLoaded}
                  />
                );
              })
            ) : 
            null}

          <Card className="flex-shrink-0 25 text-start p-4">
            <Card.Body>
            {isLoggedIn?
              <LinkContainer to="/planner/create">
                <Button variant="primary" size="lg">
                  <FontAwesomeIcon icon={solid("circle-plus")} /> &nbsp; Create
                </Button>
              </LinkContainer>
              :
              <LinkContainer to="/login">
                <Button variant="primary" size="lg">
                  <FontAwesomeIcon icon={solid("circle-plus")} /> &nbsp; Create
                </Button>
              </LinkContainer>
            }
            </Card.Body>
          </Card>

        </Container>
      </Container>
      
    </Container>
     
    
  </>
  );
}