import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: ''
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleKeywordChange = this.handleKeywordChange.bind(this);
  }

  handleSearch(event) {
    const keyword = this.state.keyword;
    console.log("Search keyword: " + keyword);
    this.props.searchTracks(keyword);
  }

  handleKeywordChange(event) {
    this.setState({keyword: event.target.value});
  }

  render() {
    return (
      <div className='SearchBar'>
        <input className='input' placeholder="Enter A Song Title"
        value={this.state.keyword} onChange={this.handleKeywordChange}/>
        <a input='a' onClick={this.handleSearch}>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;
