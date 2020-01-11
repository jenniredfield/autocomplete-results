import React, { Component } from 'react';
import ResultItem from './components/ResultItem';
import Loading from './components/Loading';
import { parseResponse } from './helpers/Parsers';
import './App.css';
import axios from 'axios';

const NUMBER_OF_RESULTS = 6;

class App extends Component {

  state = {
    data: [],
    hasError: false,
    openResults: false,
    currentIndex: -1,
    selectedLocation: '',
    userInput: '',
    isLoading: false
  }

  inputRef = null;

  componentDidMount() {
    document.addEventListener('click', (e) => {
      if (e.target !== this.inputRef) {
        this.setState({ openResults: false });
      }
    })
  }

  getData = (searchTerm) => {
    this.setState({ isLoading: true })
    axios(`https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en&solrRows=${NUMBER_OF_RESULTS}&solrTerm=${searchTerm}`)
      .then(res => {
        console.log(res);
        this.setState({ data: parseResponse(res.data.results.docs), openResults: true, isLoading: false });
      }).catch((err) => {
        console.log('An error has occurred:', err);
        this.setState({ hasError: true, isLoading: false });
      });
  }

  handleInput = (e) => {
    const value = e.target.value;

    this.setState({ userInput: value });

    if (value.length <= 1) {
      this.setState({ data: [] });
      return;
    }

    this.getData(value);
  }

  handleFocus = (e) => {
    const { userInput, selectedLocation, data } = this.state;
    this.setState({ openResults: Boolean(data.length), selectedLocation: userInput ? userInput : selectedLocation });
  }

  handleBlur = () => {
    // maybe change this to document click event, remove focus
    // this.setState({ hasFocus: false });
  }

  handleKeyDown = (e) => {
    const keyCode = e.which || e.keyCode || e.charCode;
    const { data, currentIndex } = this.state;

    // down
    if (keyCode === 40 && data) {
      if (currentIndex === data.length - 1) {
        return;
      }
      this.setState({ currentIndex: currentIndex + 1 });
    }

    //up
    if (keyCode === 38 && data) {
      if (currentIndex === -1) {
        return;
      }
      this.setState({ currentIndex: currentIndex - 1 });
    }

    //enter
    if (keyCode === 13 && currentIndex > -1) {
      this.selectValue();
    }
  }

  handleOnChange = (e) => {
    console.log('handleChange');
    const value = e.target.value;
    this.setState({ selectedLocation: value })
  }

  selectValue = () => {
    const { data, currentIndex } = this.state;
    const newSelectedLocation = `${data[currentIndex].name}, ${data[currentIndex].location}`;
    this.setState({
      selectedLocation: newSelectedLocation,
      openResults: false,
      currentIndex: -1
    });
  }

  handleMouseEnter = (index) => {
    this.setState({ currentIndex: index });
  }

  handleInputClick = () => {
    const { userInput, selectedLocation, data } = this.state;
    this.setState({ openResults: Boolean(data.length), selectedLocation: userInput ? userInput : selectedLocation });
  }

  render() {
    const { data, currentIndex, selectedLocation, openResults, isLoading } = this.state;

    return (
      <div className="App">
        <div className="main__container">
          <div className="main__row">
            <h1 className="main__title">Let's find your ideal car</h1>
          </div>

          <div className="main__row">
            <label htmlFor="input__item" className="label">Pick-up Location</label>
            <div className="input__container">
              <input
                placeholder='city, airport, station, region, district…'
                onInput={this.handleInput}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                onKeyDown={this.handleKeyDown}
                onChange={this.handleOnChange}
                onClick={this.handleInputClick}
                value={selectedLocation}
                ref={e => this.inputRef = e}
                type="text"
                className="input__item"
                id="input__item"
              />
             {isLoading ? <Loading /> : null}
            </div>
            <ul className="results__container">
              {data.length && openResults ?
                data.map((result, i) => {
                  return (
                    <ResultItem
                      result={result}
                      index={i}
                      currentIndex={currentIndex}
                      handleMouseEnter={this.handleMouseEnter}
                      selectValue={this.selectValue}
                      key={`${result.name}_${i}`} />
                  )
                })
                : null}
            </ul>
          </div>

        </div>
      </div>
    );
  }
}

export default App;
