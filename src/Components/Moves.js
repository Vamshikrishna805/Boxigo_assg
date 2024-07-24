import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Moves() {
  const [data, setData] = useState(null); // Initialize with null to handle the absence of data
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    axios.get('/api_assignment.json')
      .then(response => {
        setData(response.data || null);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  const toggleDetails = () => {
    setExpanded(!expanded);
  };

  if (!data) {
    return (
      <div className="App">
        <h1>Move Details</h1>
        <p>No move details available.</p>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Move Details</h1>
      <div className="move-list">
        <div key={data.moving_from + data.moving_to}>
          <h2>{data.moving_from} to {data.moving_to}</h2>
          <p>{data.moving_on}</p>
          <button onClick={toggleDetails}>
            {expanded ? "Hide Move Details" : "View Move Details"}
          </button>
          {expanded && (
            <div className="move-items">
              <h3>Items:</h3>
              {data.items && data.items.rooms && data.items.rooms.map(room => (
                <div key={room.id}>
                  <h4>{room.roomName || 'Unknown Room'}</h4>
                  {room.categories && room.categories.map(category => (
                    <div key={category.categoryID}>
                      <h5>{category.categoryName || 'Unknown Category'}</h5>
                      <ul>
                        {category.itemsList && category.itemsList.all && category.itemsList.all.map(item => (
                          <li key={item.name}>
                            {item.display_name || 'Unknown Item'} - {item.qty}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Moves;
