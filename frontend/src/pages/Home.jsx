import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  // Fetch data from the backend using Fetch API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/form");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError("Failed to fetch data");
        console.error(err);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Showing all Tour Packages</h1>
      {data.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-row items-center flex-wrap justify-center gap-5">
          {data.map((item, index) => (
            <div
              key={index}
              className="p-2 border rounded shadow-sm bg-gray-50 hover:bg-gray-100 h-56 w-80 flex items-end rounded-lg" style={{
                backgroundImage: `url(${item.images[0]})`,
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}>
              <div className="flex flex-col justify-end w-full h- gap-1">
                <p className="text-left w-full text-white">
                  <strong className="text-xl">{item.title}</strong>
                </p>

                <p className="text-left w-full text-white">
                  <strong className="font-normal">Price:</strong> {item.price}
                </p>
                <Link to={`/details/${item._id}`}>
                  <button className="px-4 py-1 bg-white rounded w-full">View</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>

  );
};

export default Home;
