import React from 'react';
import './PlayList.css';
import TrackList from '../TrackList/TrackList';

class PlayList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistName: 'New Playlist'
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAddPlaylist = this.handleAddPlaylist.bind(this);
  }

  handleNameChange(event) {
    this.setState({playlistName: event.target.value});
  }

  handleAddPlaylist(event) {
    this.props.onSave(this.state.playlistName);
  }

  render() {
    return (
      <div className="Playlist">
        <input defaultValue={this.state.playlistName} onChange={this.handleNameChange}/>
        <TrackList tracks={this.props.playList}
        onRemove={this.props.onRemove}
        isRemoval={this.props.isRemoval}
        />
        <a className="Playlist-save" onClick={this.handleAddPlaylist}
        >SAVE TO SPOTIFY
        </a>
      </div>
    );
  }
}

export default PlayList;
