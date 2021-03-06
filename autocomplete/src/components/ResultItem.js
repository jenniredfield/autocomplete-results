import React from 'react';
import PlaceType from './PlaceType';
import cx from 'classnames';

const ResultItem = ({ result, index, currentIndex, handleMouseEnter, selectValue}) => {
        const isSelected = Boolean(index === currentIndex)
        const containerClassnames = cx("result__item", {
            "result__item--active": isSelected
        });
            return (
                <li
                    className={containerClassnames}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onClick={selectValue}
                    role="option"
                    aria-selected={isSelected}
                    id={`option_${index}`}
                    >
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