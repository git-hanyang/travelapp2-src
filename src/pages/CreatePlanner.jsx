import React, { useState, useEffect, useContext, useRef } from "react";
import cityData from "../data/destinations";
import axios from "axios";
import {
  Container,
  Form,
  FloatingLabel,
  FormSelect,
  Button,
  InputGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";


export default function CreatePlanner() {

    const [inputPlannerData,setInputPlannerData]=useState({
        travelPeriod: {
                        start: "",
                        end: "",
                    },
        destination: '',
      })

  const [destinationsData, setDestinationsData] = useState([]);
  const navigate = useNavigate();
  
  const plannerName=useRef('')
  const plannedActivity=useRef('')

  function fetchDestinationsData() {
    const dataArray = [];
    for (const key in cityData) {
      dataArray.push(cityData[key]);
    }
    setDestinationsData(dataArray);
    // console.log(dataArray);
  }

  useEffect(() => {
    fetchDestinationsData();
  },[]);

  function handleDates(e) {
    setInputPlannerData((prevState) => {
      return {
        ...prevState,
        travelPeriod: {
          ...prevState.travelPeriod,
          [e.target.id]: e.target.value,
        },
      };
    });
  }

  function handleChange(e){
    setInputPlannerData((prevState)=>{
      return{
        ...prevState,  
          [e.target.id]:e.target.value
      }
    }) 
  }

  function handleSubmit(e) {
    
  const addPlannerData={
    id: Cookies.get('bridge'),
    name: plannerName.current.value,
    travelPeriod: {
      start: inputPlannerData.travelPeriod.start,
      end: inputPlannerData.travelPeriod.end,
    },
    destination: inputPlannerData.destination,
    plannedActivity: plannedActivity.current.value
  };
//   data variable names have to match with database variables

    e.preventDefault();
    const token = Cookies.get('jwt')
    axios({
      url: "http://localhost:3003/api/planner",
      method: "post",
      data: addPlannerData,
      headers:{
        Authorization:`Bearer ${token}`
      }
    }).then(()=>{
      navigate('/dashboard')
    })
         
   }

  return (
    <Container
      fluid={true}
      className="flex-fill d-flex flex-column justify-content-center align-items-center"
    >
      <h4 className="my-3">Create a Planner</h4>
      <Form
        onSubmit={handleSubmit}
        className="w-50 d-flex flex-column justify-content-center align-content-center gap-3 mx-auto"
      >
        <FloatingLabel controlId="name" label="Planner Name">
          <Form.Control
            type="text"
            ref={plannerName}
          />
        </FloatingLabel>

        <InputGroup>
          <Form.Control
            type="date"
            id="start"
            value={inputPlannerData.travelPeriod.start}
            onChange={handleDates}
            placeholder="Select Date"
          />
          <Form.Control
            type="date"
            id="end"
            value={inputPlannerData.travelPeriod.end}
            onChange={handleDates}
            placeholder="Select Date"
          />
        </InputGroup>

        <FormSelect 
        onChange={handleChange} 
        id="destination">
          <option>Choose Destination</option>
          {destinationsData.map((city,idx) => {
            return (
              // <>
              <option value={city.data.attributes.slug} key={idx}>
                {city.data.attributes.name}
              </option>
              // </>
            );
          })}
        </FormSelect>
          <textarea cols="30" rows="10" placeholder="Plan your schedule & activities here"  
          ref={plannedActivity} 
          />
        <Button
          className="flex-grow-0 flex-shrink-0 w-50 mx-auto"
          type="submit"
        >
          Create
        </Button>
      </Form>
    </Container>
  );
}

//https://blog.logrocket.com/solve-react-useeffect-hook-infinite-loop-patterns/

