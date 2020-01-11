import React from 'react';
import PlaceType from './PlaceType';

const ResultItem = ({ result, index, currentIndex }) => {
            return (
                <li
                    className="result__item">
                    <div className="result__placetype-container">
                        <PlaceType placeType={result.placeType}/>
                    </div>

                    <div className="result__location-container">

                         <div className="result__location-row">
                            <p>{result.name}</p>
                        </div>

                        <div className="result__location-row">
                            <p>{result.location}</p>
                        </div>
               
                    </div>
                </li>
            );
}

export default ResultItem;