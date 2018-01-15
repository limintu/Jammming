import React, { Component } from 'react';
import logo from './logo.svg';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import PlayList from './components/PlayList/PlayList';
import './App.css';
import {Spotify} from './util/spotify.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playListTracks: []
    }
    this.searchTracks = this.searchTracks.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
  }

  searchTracks(keyword) {
    const tracks = Spotify.getAccessToken(keyword)
    .then(tracks => {
      let searchResults = [];
      if (tracks != undefined){
        if (tracks.length != 0) {
          tracks.forEach(track => searchResults.push(track));
        } else {
          console.log("No Search Result!!");
        }
      }
      console.log("~~~~setState~~~~");
      console.log(searchResults);
      this.setState({searchResults: searchResults});
    })
  }

  addTrack(track) {
    if (!this.state.playListTracks.map(element => element.id).includes(track.id)) {
      let list = this.state.playListTracks;
      list.push(track);
      this.setState({playListTracks: list});
      console.log("Add new track: " + track.id + ", " + track.name);
    }
  }

  removeTrack(track) {
    let list = this.state.playListTracks.filter(element => element.id != track.id);
    this.setState({playListTracks: list});
    console.log("Remove track: " + track.id + ", " + track.name);
  }

  savePlaylist(playlistName) {
    const targetPlaylistTracks = this.state.playListTracks.map(track => track.uri);
    console.log(`About to save Playlist:"${playlistName}" Tracks: [${targetPlaylistTracks}]`);

    Spotify.savePlaylist(playlistName, this.state.playListTracks)
    .then(responseok => {
      if (responseok) {
        this.setState({playListTracks: []});
        alert(`Successfully save these songs to ${playlistName}`);
      }
    });
    //action for upload tracks with Spotify API
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className ="App">
          <SearchBar searchTracks={this.searchTracks} />
          <div className="App-playlist">

            <SearchResults searchResults={this.state.searchResults}
            onAdd={this.addTrack} isRemoval={false} />

            <PlayList playList={this.state.playListTracks}
            onRemove={this.removeTrack} onSave={this.savePlaylist}
            isRemoval={true} />

          </div>
        </div>
      </div>
    );
  }
}

export default App;
