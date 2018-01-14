import React, { Component } from 'react';
import logo from './logo.svg';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import PlayList from './components/PlayList/PlayList';
import './App.css';
import {Spotify} from './util/spotify.js';

const testSearchResults = [
  {id: "4vBoopG4WzohMju1GUmwoi", name: "失落沙洲", artist: "LaLa Hsu", album: "徐佳瑩LaLa首張創作專輯", uri: "spotify:track:4vBoopG4WzohMju1GUmwoi"},
  {id: "2mtFJ0dJv67r3BZTguRloB", name: "言不由衷", artist: "LaLa Hsu", album: "言不由衷", uri: "spotify:track:2mtFJ0dJv67r3BZTguRloB"},
  {id: "1dIKxlEtHBABzk1DlRNCxc", name: "灰色", artist: "LaLa Hsu", album: "心裡學", uri: "spotify:track:1dIKxlEtHBABzk1DlRNCxc"},
  {id: "3AIvgFB3YTo349ZlcfOnOo", name: "言不由衷", artist: "LaLa Hsu", album: "心裡學", uri: "spotify:track:3AIvgFB3YTo349ZlcfOnOo"},
  {id: "5dUshocB5ykBkSr8jtMf7p", name: "到此為止", artist: "LaLa Hsu", album: "心裡學", uri: "spotify:track:5dUshocB5ykBkSr8jtMf7p"},
  {id: "3gZ8MaUydTMX27teBh1L22", name: "浪費", artist: "LaLa Hsu", album: "收•音•《我是歌手4》原音精選", uri: "spotify:track:3gZ8MaUydTMX27teBh1L22"},
  {id: "2vufWUfS5xLwIf3S0jKV1V", name: "記得帶走", artist: "LaLa Hsu", album: "心裡學", uri: "spotify:track:2vufWUfS5xLwIf3S0jKV1V"},
  {id: "7CjUELqDMLUo2fu61nkJOJ", name: "心裡學", artist: "LaLa Hsu", album: "心裡學", uri: "spotify:track:7CjUELqDMLUo2fu61nkJOJ"},
  {id: "5v0yJdkHitenZU1Bkvaz7O", name: "灰色", artist: "LaLa Hsu", album: "灰色", uri: "spotify:track:5v0yJdkHitenZU1Bkvaz7O"},
  {id: "05mOZWxwX317mNF4lQjm5x", name: "傲嬌", artist: "A-Mei Chang", album: "偷故事的人", uri: "spotify:track:05mOZWxwX317mNF4lQjm5x"},
];

const testPlayList = [
  {id:11, title:'Stronger', artist: 'Britney Spears', album: 'Oops!... I Did It Again'},
  {id:12, title:'So Emotional', artist: 'Whitney Houston' , album: 'Whitney'},
  {id:13, title: "It's Not Right But It's Okay", artist:'Whitney Houston', album: 'My Love Is Your Love'}
];

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
    console.log(`upload tracks with Spotify API`);
    const targetPlaylistTracks = this.state.playListTracks.map(track => track.uri);
    console.log(`~upload~ Playlist:"${playlistName}" Tracks: [${targetPlaylistTracks}]`);

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
