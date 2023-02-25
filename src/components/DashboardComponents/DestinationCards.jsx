import React from "react";
import { Card, Button } from "react-bootstrap";

//destructuring props to get only the key and its value
function DestinationCards({data}) {

  const cityName = data.data.attributes.name;
  const cityBudget = data.data.attributes.budget[cityName].text;
  const cityRating = Math.round(data.data.attributes.average_rating*10)/10;
  const slug=data.data.attributes.slug

  const included = data.included;
        const photoId = included[0].relationships.featured_photo.data.id;
        const photo = included.find(
            (item) => item.id !== photoId && item.type === "photo"
          ).attributes.image.medium;

  // function display(){
  //   console.log(slug)
  // }
          const baseUrl="https://www.google.com/search?q="
          const search="+top+attractions+now"
          
  return (
    <>
    
    <Card className="flex-grow-0 flex-shrink-0 w-25 text-center ">
      <Card.Body>
      
        <div className="img-wrap">
          <img src={photo} alt={photo} />
        </div>

        <Card.Title className="mt-0">{cityName}</Card.Title>

        <Card.Text>
          Budget : {cityBudget}
          <br />
          Rating : {cityRating}/5
        </Card.Text>
        
          <Button href={baseUrl+slug+search} target="_blank" variant="primary">See More</Button>
          {/* <button onClick={display}>asd</button> */}
      </Card.Body>
    </Card>

    </>
  );
}

export default DestinationCards;
//<LinkContainer to={`/destination/${data.data.attributes.slug}`}>