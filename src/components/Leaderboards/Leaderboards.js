import React from 'react';
import './Leaderboards.css'

const Leaderboards = ({ name, entries }) => {
    return (
      <div className="LeaderWrapper">
          <p>
            {`${name}, you have put this number of pictures into the machine...`}
          </p>
          <h3>
              {entries}
          </h3>
      </div>
    )
}

export default Leaderboards;