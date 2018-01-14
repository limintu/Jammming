import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.renderAction = this.renderAction.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  renderAction(isRemoval) {
    if (isRemoval) {
      return (
        <a className="Track-action" onClick={this.removeTrack}>-</a>
      );
    } else {
      return (
        <a className="Track-action" onClick={this.addTrack}>+</a>
      );
    }
  }

  addTrack(event) {
    this.props.onAdd(this.props.track);
    // console.log(this.props.track.title);
  }

  removeTrack(event) {
    this.props.onRemove(this.props.track);
    // console.log(this.props.track.title);
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        {this.renderAction(this.props.isRemoval)}
      </div>
    );
  }
}


export default Track;
