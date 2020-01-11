import React, { Component } from 'react';
import ResultItem from './components/ResultItem';
import {parseResponse} from './helpers/Parsers';
import './App.css';
import axios from 'axios';

class App extends Component {

  state = {
    data: [],
    hasError: false,
    hasFocus: false,
    currentIndex: -1
  }

  getData = (searchTerm) => {
    axios(`https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en&solrRows=6&solrTerm=${searchTerm}`)
      .then(res => {
        console.log(res);
        this.setState({ data: parseResponse(res.data.results.docs) });
      }).catch((err) => {
        console.log('An error has occurred:', err);
        this.setState({ hasError: true });
      });
  }

  handleInput = (e) => {
    const value = e.target.value;

    if (value.length <= 1) {
      this.setState({ data: [] });
      return;
    }

    this.getData(value);
  }

  handleFocus = () => {
    this.setState({ hasFocus: true });
  }

  handleBlur = () => {
    // maybe change this to document click event, remove focus
    // this.setState({ hasFocus: false });
  }

  render() {
    const { data, hasFocus, currentIndex } = this.state;
    return (
      <div className="App">
        <div className="main__container">
          <div className="input__container">
            <input
              placeholder='Search for location...'
              onInput={this.handleInput}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
            />
            <ul className="results__container">
              {data && hasFocus ?
                data.map((result, i) => {
                  return (
                    <ResultItem
                      result={result}
                      index={i}
                      currentIndex={currentIndex}
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
