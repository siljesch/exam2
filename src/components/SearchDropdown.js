import React, { useEffect, useRef } from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

function SearchDropdown({ home, items, onChange, searching }) {
  const listRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    home.current.addEventListener("click", (event) => {
      listRef.current.style.display = "none";
    });
    inputRef.current.addEventListener("click", (event) => {
      event.stopPropagation();
      listRef.current.style.display = "flex";
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <input
        type="text"
        id="hotelSearch"
        className="hero__search"
        ref={inputRef}
        onChange={onChange}
        placeholder="Search..."
      />
      <ListGroup className="searchDropdown" ref={listRef}>
        {searching && (
          <>
            {items.map((item, idx) => {
              return (
                <Link to={`/${item.id}`} key={idx}>
                  <ListGroup.Item action>
                    {item.attributes.title}
                  </ListGroup.Item>
                </Link>
              );
            })}
          </>
        )}
      </ListGroup>
    </>
  );
}

export default SearchDropdown;
