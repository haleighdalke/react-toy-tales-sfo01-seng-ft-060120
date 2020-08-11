import React, { Component } from 'react';

class ToyCard extends Component {
  render() {
    let { name, image, likes } = this.props.toy
    return (
      <div className="card">
        <h2>{name}</h2>
        <img src={image} alt={name} className="toy-avatar" />
        <p>{likes} Likes </p>
        <button className="like-btn" onClick={() => this.props.likeToy(this.props.toy)}>Like {'<3'}</button>
        <button className="del-btn" onClick={() => this.props.donateToy(this.props.toy)}>Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;
