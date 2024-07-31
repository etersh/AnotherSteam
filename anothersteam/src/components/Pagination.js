// src/components/Pagination.js

import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
// import Pagination from "@mui/material/Pagination";


// import Toggle from "./ToggleExpand";

function ReactPagination() {
  
  const [currentPage, setCurrentPage] = useState(null);
  const [data, setData] = useState(null);
  const [paginatedItems, setPaginatedItems] = useState([]);
  
  const itemsPerPage = 3; // Number of items to display per page
  const pageCount = Math.ceil(data.length / itemsPerPage);

  useEffect(() => {
    // Calculate the index range for the current page
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    console.log("ReactPagination useEffect: ", { data });

    setPaginatedItems(data.slice(startIndex, endIndex));
  }, [currentPage, data]);

  const handlePageChange = ({ selected: selectedPage }) => {
    console.log("Page selected:", selectedPage);
    setCurrentPage(selectedPage);
  };


  return (
    <div id="container">
      {paginatedItems == 0 ? (
        ""
      ) : (
        <ReactPaginate
          pageCount={pageCount}
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          onPageChange={handlePageChange}
          containerClassName="pagination"
          activeClassName="pagination-active"
          previousLabel="<"
          nextLabel=">"
        />
      )}
      {paginatedItems.map((game) => {
        // console.log(`CITY:`, {city});
        // const iconCode = city.weather[0].icon;
        const containerId = `gameContainer-${game.id}`;

        return (
          <div className="" key={game.id} id={containerId}>
            <div className="">
              <p>
                A
                {/* <img
                  src={``}
                  alt={`${} icon`}
                  className=""
                />{" "}
                {game.id}, {game.name} */}
              </p>
            </div>
            {/* <Toggle containerId={containerId} data={game}/> */}
          </div>
        );
      })}
    </div>
  );
}

export default ReactPagination;
