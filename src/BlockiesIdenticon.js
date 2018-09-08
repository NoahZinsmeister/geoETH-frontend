import React, { Component } from 'react'
import blockies from 'blockies-identicon/blockies'

class BlockiesIdenticon extends Component {
  getOpts () {
    console.log(this.props.seed)
    return {
      seed: this.props.seed || "foo",
      color: '#ba3434',
      bgcolor: '#dfe527',
      size: 8,
      scale: 3,
      spotcolor: '#000'
    };
  }
  componentDidMount() {
    this.draw();
  }
  draw() {
    blockies.render(this.getOpts(), this.canvas);
  }
  render() {
    return React.createElement("canvas", {ref: canvas => this.canvas = canvas});
  }
}

export default BlockiesIdenticon
