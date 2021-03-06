import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import EnquiryModal from '../components/EnquiryModal';
import { Heading } from '../components/styles/StyledHeadings';
import { ESTABLISHMENT_URL, POPULATE } from '../utils/api';
require("react-bootstrap/ModalHeader")

function Result() {
    const { location } = useParams();
    const [hotel, setHotel] = useState({});
    const [error, setError] = useState(false);
    const [modal, setModal] = useState(false);

  // Fetching data as authorized user with useAxios.
  // The eslint rule inside removes warnings about missing dependencies, from using http
  // inside the function but not including it in the dependencies.
    useEffect(() => { 
        const fetchData = async () => {
            const response = await axios.get(ESTABLISHMENT_URL + location + POPULATE);
            console.log(response.data.data);
            setHotel(response.data.data);
        }
        fetchData().catch((error) => setError(error))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if(error){
        return (
        <div>
            <Heading>Something went wrong</Heading>
            <p>{error.message}</p>
        </div>
      );
    }

    if(!hotel.hasOwnProperty("id")){
        return <div>Loading...</div>;
    }


  return (  
  <div className='content'>
    <Heading>{hotel.attributes.title}</Heading>
        <div className='result'>
        <div className='result__cont'>
            <div className='result__text'>
                <Heading as={"h2"}>{hotel.attributes.punchline}</Heading>
                <p>{hotel.attributes.description}</p>
            </div>
            <div className='result__btn'>
                <button onClick={() => setModal(true)}>Send booking enquiry</button>
            </div>
        </div>
        <img className='resultImg' src={hotel.attributes.coverimage.data.attributes.url} alt={`${hotel.attributes.title} in bergen`}/>
        </div>
        <EnquiryModal show={modal} onHide={() => setModal(false)} />
  </div>
  )
}

export default Result