import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='SearchBar'>
        <input className='input' placeholder="Enter A Song Title" />
        <a input='a'>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;
