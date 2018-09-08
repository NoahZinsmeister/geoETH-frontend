import React, { Component } from 'react'
import socketIOClient from 'socket.io-client'
import { withWeb3 } from 'web3-webpacked-react';

import { Widget, addResponseMessage, dropMessages, renderCustomComponent } from 'react-chat-widget';

import ClickableBlockies from './ClickableBlockies'
import 'react-chat-widget/lib/styles.css';

class Message extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      endpoint: "https://geoeth.herokuapp.com/"
    };
  }

  componentDidMount() {
    const { endpoint, messages } = this.state;
    const journey = this.props.journey;
    const user = this.props.user;

    dropMessages()

    let newMessages = messages;

    this.socket = socketIOClient(endpoint);

    this.socket.on("disconnect", () => console.log("Client disconnected"));
    this.socket.on(journey, data => {
        console.log(data)
        newMessages.push(data);
        if (data.user !== user){
          renderCustomComponent(ClickableBlockies, {user: data.user, me: this.props.user})
          addResponseMessage(data.msg)
        }
        this.setState({ messages: newMessages })
      }
    );
  }

  handleNewUserMessage = (newMessage) => {
    const journey = this.props.journey;
    const user = this.props.user;
    this.socket.emit('chat message', {journey: journey, msg: newMessage, lat: 52, long: 13, user: user});
  }

  render() {
    let sub = "Talking as " + this.props.user

    return (
      <div style={{ textAlign: "center" }}>
        <Widget
            key={this.props.journey}
            handleNewUserMessage={this.handleNewUserMessage}
            title={this.props.journey}
            subtitle={sub}
          />
      </div>
    );
  }

}

export default withWeb3(Message);
