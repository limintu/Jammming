import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.renderAction = this.renderAction.bind(this);
  }

  renderAction(isRemoval) {
    return isRemoval? '-' : '+';
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.title}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        <a className="Track-action"> {this.renderAction(true)}</a>
      </div>
    );
  }
}


export default Track;
