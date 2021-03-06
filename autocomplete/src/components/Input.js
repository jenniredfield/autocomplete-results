import React from 'react';

const Input = React.forwardRef((props , ref) => {
    const {handleInput, handleFocus, handleKeyDown, handleOnChange, handleInputClick, selectedLocation, currentIndex} = props;
    
    return (<input
        placeholder='city, airport, station, region, district…'
        onInput={handleInput}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        onChange={handleOnChange}
        onClick={handleInputClick}
        value={selectedLocation}
        type="text"
        className="input__item"
        id="input__item"
        ref={ref}
        aria-describedby="location-input-description"
        aria-labelledby="label-for-location-input"
        aria-haspopup="listbox"
        aria-activedescendant={`option_${currentIndex}`}
        tabIndex={0}
    />)
});

export default Input;