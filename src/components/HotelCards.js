import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ESTABLISHMENT_URL, POPULATE } from "../utils/api";
import { Heading } from "./styles/StyledHeadings";
import loading from "../media/Spin-1s-200px.gif";

function HotelCards() {
  const [hotel, setHotel] = useState([]);
  const [error, setError] = useState();
  const [searchInput, setSearchInput] = useState("");
  const [filteredResult, setFilteredResult] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(ESTABLISHMENT_URL + POPULATE);
      console.log(response.data.data);
      setHotel(response.data.data);
    };
    fetchData().catch((error) => setError(error));
  }, []);

  if (error) {
    return (
      <div>
        <Heading as={"h2"}>Something went wrong</Heading>
        <p>{error.message}</p>
      </div>
    );
  }

  if (hotel.length === 0) {
    return (
      <div className="loading content">
        <img src={loading} alt="loading" />
      </div>
    );
  }

  // Filter through the titles from the data to match the search input value.
  // and sends filtered data to be displayed on the page.
  const filterItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = hotel.filter((item) => {
        return Object.values(item.attributes.title)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResult(filteredData);
    } else {
      setFilteredResult(hotel);
    }
  };

  return (
    <>
      <Heading>Discover the hotels</Heading>
      <input
        type={"text"}
        placeholder="Search..."
        className="hotelSearch"
        onChange={(e) => filterItems(e.target.value)}
      />
      <div className="cards">
        {searchInput.length > 1
          ? filteredResult.map((hotel, idx) => {
              return (
                <div className="card" key={idx}>
                  <Link to={`/${hotel.id}`}>
                    <img
                      className="card__img"
                      src={hotel.attributes.coverimage.data.attributes.url}
                      alt={`${hotel.attributes.title} in bergen`}
                    />
                    <div className="card__text">
                      <Heading as={"h3"}>{hotel.attributes.title}</Heading>
                    </div>
                  </Link>
                </div>
              );
            })
          : hotel.map((hotel, idx) => {
              return (
                <div className="card" key={idx}>
                  <Link to={`/${hotel.id}`}>
                    <img
                      className="card__img"
                      src={hotel.attributes.coverimage.data.attributes.url}
                      alt={`${hotel.attributes.title} in bergen`}
                    />
                    <div className="card__text">
                      <Heading as={"h3"}>{hotel.attributes.title}</Heading>
                    </div>
                  </Link>
                </div>
              );
            })}
      </div>
    </>
  );
}

export default HotelCards;
