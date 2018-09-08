import React, { Component } from 'react'
import socketIOClient from 'socket.io-client'

import { Widget, addResponseMessage } from 'react-chat-widget';

import 'react-chat-widget/lib/styles.css';

class Message extends Component {

  constructor() {
    super();
    this.state = {
      user: '0xMyEthAddress',
      journey: 'EthBerlin!',
      messages: [],
      endpoint: "https://geoeth.herokuapp.com/"
    };
  }

  componentDidMount() {
    const { endpoint, messages, journey, user } = this.state;
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
    const { journey, user }= this.state;

    console.log(`New message incoming! ${newMessage}`);

    this.socket.emit('chat message', {journey: journey, msg: newMessage, lat: 52, long: 13, user: user});
  }

  sendMessage = () => {
    this.socket.emit('chat message', {journey: 'EthBerlin!', msg: 'testing 2', lat: 52, long: 13, user: '0xMyEthAddress2'});
  }

  render() {
    const { journey } = this.state;
    return (
      <div style={{ textAlign: "center" }}>
        <Widget
            handleNewUserMessage={this.handleNewUserMessage}
            title={journey}
            subtitle="Message Board"
          />
        <button onClick={this.sendMessage}>click me</button>
      </div>
    );
  }

}

export default Message;
