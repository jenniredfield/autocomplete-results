import React from 'react';

const PlaceType = ({ placeType }) => {
    return (<div
        className={`result__placetype 
            ${placeType ? placeType.toLowerCase() : ''}`}>
        {placeType}</div>)
}

export default PlaceType;