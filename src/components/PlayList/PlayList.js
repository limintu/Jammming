import React from 'react';
import './PlayList.css';
import TrackList from '../TrackList/TrackList';

class PlayList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="Playlist">
        <input placeholder='New Playlist' />
        <TrackList tracks={this.props.playList}/>
        <a className="Playlist-save">SAVE TO SPOTIFY</a>
      </div>

    );
  }
}

export default PlayList;
