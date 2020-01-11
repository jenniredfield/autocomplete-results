import React, {Component} from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {


  getData = (searchTerm) => {
    axios(`https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en&solrRows=6&solrTerm=${searchTerm}`)
    .then(res => console.log(res))
  }

  handleInput = (e) => {
    const value = e.target.value;

    if(value.length <= 1) {
      return;
    }

    this.getData(value);
  }


  render() {
    return (
      <div className="App">
          <div className="main__container">
            <input 
              placeholder='Search for location...' 
              onInput={this.handleInput}></input>

          </div>
      </div>
    );
  }
}

export default App;
