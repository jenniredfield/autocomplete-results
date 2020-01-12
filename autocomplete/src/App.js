import React, { Component } from 'react';
import ResultItem from './components/ResultItem';
import Loading from './components/Loading';
import Input from './components/Input';
import { parseResponse } from './helpers/Parsers';
import './styles/styles.css';
import axios from 'axios';

const NUMBER_OF_RESULTS = 6;
// make tests
// check mobile styling
// add accessibility arias


class App extends Component {

  state = {
    data: [],
    hasError: false,
    openResults: false,
    currentIndex: -1,
    selectedLocation: '',
    userInput: '',
    isLoading: false,
    hasSelectedValue: false
  }

  inputRef = React.createRef();;

  componentDidMount() {
    document.addEventListener('click', (e) => {
      if (e.target !== this.inputRef.current) {
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

  handleKeyDown = (e) => {
    const keyCode = e.which || e.keyCode || e.charCode;
    console.log('keyCode', keyCode)
    const { data, currentIndex } = this.state;

    // down
    if (keyCode === 40 && data) {
      if (currentIndex === data.length - 1) {
        return;
      }
      if (this.state.hasSelectedValue) {
        this.setState({ currentIndex: currentIndex + 1, userInput: '', selectedLocation: '', hasSelectedValue: false, openResults: true });
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
    //handle backspace when has selected value
    if (keyCode === 8 && this.state.hasSelectedValue) {
      this.setState({ userInput: '', selectedLocation: '', hasSelectedValue: false, openResults: true })
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
      currentIndex: -1,
      hasSelectedValue: true,
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
    console.log('selected name', this.state.selectedLocation);
    console.log('current index', this.state.currentIndex);
    console.log('current index', this.state.data);
    return (
      <div className="App">
        <div className="main__container">
          <div className="main__row">
            <h1 className="main__title">Let's find your ideal car</h1>
          </div>

          <div className="main__row">
            <label htmlFor="input__item" className="label">Pick-up Location</label>
            <div className="input__container">
              <Input
                handleInput={this.handleInput}
                handleFocus={this.handleFocus}
                handleKeyDown={this.handleKeyDown}
                handleOnChange={this.handleOnChange}
                onClick={this.handleInputClick}
                selectedLocation={selectedLocation}
                ref={this.inputRef}
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
