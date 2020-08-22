import React from 'react';
import ReactDOM from 'react-dom';


const Details = (props) => {
  //console.log(props)
  const {id, rating, name, destroy, updateRating} = props
  return (
      <div>
          <li>{name}</li>
          <li>rating: {rating}</li>
          <button onClick={() => updateRating(id,rating+1)}>+</button>
          <button onClick={() => updateRating(id,rating-1)}>-</button>
          <button onClick={() => destroy(id)}>x</button>
      </div>
  )
}

export default Details
