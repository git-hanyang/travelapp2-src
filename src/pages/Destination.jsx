import { Container } from "react-bootstrap";
import { useEffect,useState } from "react";
import DestinationCards from "../components/DashboardComponents/DestinationCards";
import cityData from "../data/destinations";

export default function Destination() {
  const [destinationsData, setDestinationsData] = useState([]);
  const [test, setTest] = useState([])
  let content = [];
  let test1=[]

  function fetchDestinationsData() {
    const dataArray = [];
    for (const key in cityData) {
        const included = cityData[key].included;
        const photoId = included[0].relationships.featured_photo.data.id;
        const photo = included.find(
            (item) => item.id !== photoId && item.type === "photo"
          ).attributes.image.medium;
      content.push(cityData[key]);
      test1.push([photo])
    }
    setDestinationsData(()=>content);
    setTest(test1)
  }
  
  function display(){
    console.log(test1)
    console.log(test)
  }

  useEffect(() => {
    fetchDestinationsData()
   //console.log(destinationsData)
  },[]);

  

  return (
    <>
    <Container fluid={true} className="flex-fill overflow-auto" >
    <br/>
      <h2>Destinations</h2>
    <br/>
      <Container
        fluid={true}
        className="d-flex flex-row justify-content-center align-items-center flex-wrap gap-5 "
      >
      {destinationsData.map((city,idx) => {
                  return (
                    <DestinationCards
                      data={city}
                      key={idx}
                      className="mb-3"
                    />
                  )
                })}
        {/* <button onClick={display}></button> */}
            
        
      </Container>
    </Container>
    </>
  )
}
