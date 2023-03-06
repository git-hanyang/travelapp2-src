import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import {
  Container,
  Form,
  FloatingLabel,
  FormSelect,
  Button,
  InputGroup,
  Toast,

} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

import cityData from "../data/destinations";
import Cookies from "js-cookie";


export default function PlannerDetails() {
    const {_id} = useParams()
    const [thisPlannerData,setThisPlannerData]=useState()
    const [destinationsData, setDestinationsData] = useState([]);
    const [success, setSuccess] = useState(false);

    const plannedActivity=useRef()
    const token = Cookies.get('jwt')

    const toggleShowSuccess = () => setSuccess(!success);

    function handleChange(e){
      setThisPlannerData((prev)=>{
        return {
          ...prev,[e.target.id]:e.target.value
        }
      })
    }
    
    function handleDates(e){
      setThisPlannerData((prev)=>{
        return{
          ...prev,
          travelPeriod:{
              ...prev.travelPeriod,[e.target.id]:e.target.value,
            }
          }
      })
    }

    function fetchDestinationsData() {
      const dataArray = [];
      for (const key in cityData) {
        dataArray.push(cityData[key]);
      }
      setDestinationsData(dataArray);
       console.log(`fetching destination`);
    }
    
    function fetchThisPlannerData(){
      axios({
        
        url: `http://localhost:3003/api/planner/${_id}`,
        method: 'get',
        headers: {
            Authorization:"Bearer "+token
          }
      }).then((res)=>{
        setThisPlannerData(res.data)
      }).then(()=>{
        console.log(`fetching plannerdata`)
      })
    }
    
    function editPlanner(e){
      e.preventDefault();

      let addPlannerData={
        id: Cookies.get('bridge'),
        name: thisPlannerData.name ,
        travelPeriod: {
          start: thisPlannerData.travelPeriod.start,
          end: thisPlannerData.travelPeriod.end,
        },
        destination: thisPlannerData.destination,
        plannedActivity: plannedActivity.current.value
      }
      
      axios({
        url:`https://travelapp2u-api.onrender.com/api/planner/${_id}`,
        method:'put',
        data:addPlannerData,
        headers: {
          Authorization:"Bearer "+token
        }
      }).then(()=>{
        //console.log(`if no e.preventDefault(), this wont be prompt`)
        toggleShowSuccess()
      })
    }
  
useEffect(()=>{
  fetchThisPlannerData()
  fetchDestinationsData()
  console.log(`this render is mounted`)
},[])

  return (
    <>
    {thisPlannerData? (
      <Container
      fluid={true}
      className="flex-fill d-flex flex-column justify-content-center align-items-center"
    >
      <h4 className="my-3">Edit Planner</h4>
      <Form
        onSubmit={editPlanner}
        className="w-50 d-flex flex-column justify-content-center align-content-center gap-3 mx-auto"
      >
        <FloatingLabel controlId="name" label="Planner Name">
          <Form.Control
          type="text"
          value={thisPlannerData.name}
          onChange={handleChange}
          />
        </FloatingLabel>

        <InputGroup>
          <Form.Control
            type="date"
            id="start"
            value={thisPlannerData.travelPeriod.start}
            onChange={handleDates}
            placeholder="Select Date"
          />
          <Form.Control
            type="date"
           id="end"
           value={thisPlannerData.travelPeriod.end}
           onChange={handleDates}
            placeholder="Select Date"
          />
        </InputGroup>

        <FormSelect 
        onChange={handleChange} 
        id="destination">
          <option>{thisPlannerData.destination}</option>
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
        
          defaultValue={thisPlannerData.plannedActivity}
          ref={plannedActivity} 
          />
        <Button
          className="flex-grow-0 flex-shrink-0 w-50 mx-auto"
          type="submit"
        >
          Edit
          
        </Button>
      </Form>
      <Toast show={success} onClose={toggleShowSuccess} delay={3000} autohide className='mt-3'>
      {console.log(success)}
          <Toast.Header>
            <FontAwesomeIcon
              icon={solid("circle-check")}
              className="me-2 "
              color="green"
            />
            <strong className="me-auto">Success</strong>
          </Toast.Header>

          <Toast.Body>Updated successfully</Toast.Body>
        </Toast>
    </Container>
    )
    : (
      <>
      <br/>
      <br/>
      <h1>...loading</h1>
      </>
    )
    }
    
    </>
  )
}

//https://www.pluralsight.com/guides/how-to-use-multiline-text-area-in-reactjs