import React, { Component } from 'react'
import BlockiesIdenticon from './BlockiesIdenticon'

import { renderCustomComponent } from 'react-chat-widget';

import CustomCard from './CustomCard'

class ClickableBlockies extends Component {
  constructor(props) {
    super(props);
  }

  handleOnClick = () => {
    renderCustomComponent(CustomCard, {user: this.props.user, me: this.props.me})
  }

  render() {
    return (
    <div onClick={this.handleOnClick}>
      <BlockiesIdenticon seed={this.props.user}/>
    </div>)
  }
}

export default ClickableBlockies
