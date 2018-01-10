import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import PlayList from './components/PlayList/PlayList';

const testSearchResults = [
  {id:1, itle: 'Tiny Dancer', artist: 'Elton John', album: 'Madman Across The Water'},
  {id:2, title: 'Tiny Dancer', artist: 'Tim McGraw', album: 'Love Story'},
  {id:3, title: 'Tiny Dancer', artist: 'Rockabye Baby!', album: 'Lullaby Renditions of Elton John'}
];

const testPlayList = [
  {id:1, title:'Stronger', artist: 'Britney Spears', album: 'Oops!... I Did It Again'},
  {id:2, title:'So Emotional', artist: 'Whitney Houston' , album: 'Whitney'},
  {id:3, title: "It's Not Right But It's Okay", artist:'Whitney Houston', album: 'My Love Is Your Love'}
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: testSearchResults,
      playList: testPlayList
    }
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className ="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}/>
            <PlayList playList={this.state.playList}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
