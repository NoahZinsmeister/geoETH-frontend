import React, { Component } from 'react'
import socketIOClient from 'socket.io-client'

import { Widget, addResponseMessage, dropMessages } from 'react-chat-widget';

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

    addResponseMessage("Welcome to the " + journey + " chat!");

    this.socket = socketIOClient(endpoint);

    this.socket.on("disconnect", () => console.log("Client disconnected"));
    this.socket.on(journey, data => {
        console.log(data)
        newMessages.push(data);
        if (data.user !== user){
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
    return (
      <div style={{ textAlign: "center" }}>
        <Widget
            key={this.props.journey}
            handleNewUserMessage={this.handleNewUserMessage}
            title={this.props.journey}
            subtitle="Message Board"
          />
      </div>
    );
  }

}

export default Message;
