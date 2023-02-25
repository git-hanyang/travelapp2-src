import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Card, Button, Toast, ToastContainer } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { countStatus } from "../../PlannerContext";



function PlannerCards(data) {
  
  const [count,setCount]=useContext(countStatus)

  function handleDelete(e) {
    //console.log(data.data._id)
    axios({
      url: `http://localhost:3003/api/planner/${data.data._id}`,
      method: "delete",
    }).then((res) => {
        console.log(count)
        setCount(count+1)
        //https://stackoverflow.com/questions/25777826/onclick-works-but-ondoubleclick-is-ignored-on-react-component
      });
    };

  return (
    <>
      <Card className="flex-grow-0 flex-shrink-0 w-20 text-start mb-0">
        <Card.Body>
        {/* {console.log(typeof data.data.travelPeriod.start.toString())} */}
          <Card.Title className="text-center"><h5>{data.data.name}</h5></Card.Title>
          
            <h6>Travel Period</h6> 
            <p>{data.data.travelPeriod.start} - {data.data.travelPeriod.end}</p> 

            <h6>Destination</h6> 
            <p>{data.data.destination}</p>
          
          
        </Card.Body>
        <Card.Footer className="text-end">
          <LinkContainer to={`/planner/${data.data._id}`}>
            <Button variant="primary" className="me-1">
              <FontAwesomeIcon icon={solid("pen")} />
            </Button>
          </LinkContainer>
          <Button
            variant="danger"
            onClick={handleDelete}
            data-uuid={data.uuid}
          >
            <FontAwesomeIcon icon={solid("x")} />
          </Button>
        </Card.Footer>
      </Card>
    </>
  );
}

export default PlannerCards;