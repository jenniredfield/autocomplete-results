import React, { Component } from 'react';
import ResultItem from './components/ResultItem';
import {parseResponse} from './helpers/Parsers';
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
    userInput: ''
  }

  inputRef = null;

  componentDidMount() {
    document.addEventListener('click', (e) => {
      if(e.target !== this.inputRef) {
        this.setState({openResults: false});
      }
    })
  }

  getData = (searchTerm) => {
    axios(`https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en&solrRows=${NUMBER_OF_RESULTS}&solrTerm=${searchTerm}`)
      .then(res => {
        console.log(res);
        this.setState({ data: parseResponse(res.data.results.docs), openResults: true });
      }).catch((err) => {
        console.log('An error has occurred:', err);
        this.setState({ hasError: true });
      });
  }

  handleInput = (e) => {
    const value = e.target.value;

    this.setState({userInput: value});

    if (value.length <= 1) {
      this.setState({ data: [] });
      return;
    }

    this.getData(value);
  }

  handleFocus = (e) => {
    e.stopPropagation();
    const {userInput, selectedLocation, data} = this.state;
    this.setState({ openResults: Boolean(data.length), selectedLocation: userInput ? userInput : selectedLocation});
  }

  handleBlur = () => {
    // maybe change this to document click event, remove focus
    // this.setState({ hasFocus: false });
  }

  handleKeyDown = (e) => {
    const keyCode = e.which || e.keyCode || e.charCode;
    const {data, currentIndex} = this.state;
    console.log('keyCode', keyCode)

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

  handleOnChange = (e) =>{
    console.log('handleChange');
    const value = e.target.value;
    this.setState({selectedLocation: value})
  }

  selectValue = () => {
    const {data, currentIndex} = this.state;
    const newSelectedLocation = `${data[currentIndex].name}, ${data[currentIndex].location}`;
    this.setState({
      selectedLocation: newSelectedLocation,
      openResults: false,
      currentIndex: -1
    });
  }

  handleMouseEnter = (index) => {
    this.setState({currentIndex: index});
  }

  render() {
    const { data, currentIndex, selectedLocation, openResults} = this.state;

    return (
      <div className="App">
        <div className="main__container">
          <div className="input__container">
            <input
              placeholder='Search for location...'
              onInput={this.handleInput}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              onKeyDown={this.handleKeyDown}
              onChange={this.handleOnChange}
              value={selectedLocation}
              ref={e => this.inputRef = e}
            />
            <ul className="results__container">
              {data.length && openResults?
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
