import React, { Component } from 'react'
import socketIOClient from 'socket.io-client'
import Avatar from '@material-ui/core/Avatar'
import blockies from 'blockies-identicon/blockies'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { Widget, addResponseMessage, dropMessages, renderCustomComponent } from 'react-chat-widget';

import 'react-chat-widget/lib/styles.css';

const divMargin = {
  margin: '8px'
};

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

          // let canv = document.createElement('canvas')
          // const icon = blockies.render({
          //   seed: data.user,
          //   size: 15,
          //   scale: 3,
          //   spotcolor: '#000'
          // }, canv);
          renderCustomComponent(ClickableBlockies, {user: data.user})
          addResponseMessage(data.msg)
          // renderCustomComponent(CustomCard, {user: this.props.user})
        }
        this.setState({ messages: newMessages })
      }
    );
  }

  handleNewUserMessage = (newMessage) => {
    const journey = this.props.journey;
    const user = this.props.user;

    // renderCustomComponent(BlockiesIdenticon, {opts:{seed: user}})
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

class CustomCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <Card>
      <div style={divMargin}>
        <BlockiesIdenticon seed={this.props.user}/>
      </div>
      <CardContent>
        <Typography color="textSecondary">
          {this.props.user}
        </Typography>
      </CardContent>
    </Card>
    )
  }
}

class ClickableBlockies extends Component {
  constructor(props) {
    super(props);
  }

  handleOnClick = () => {
    renderCustomComponent(CustomCard, {user: this.props.user})
  }

  render() {
    return (
    <div onClick={this.handleOnClick}>
      <BlockiesIdenticon seed={this.props.user}/>
    </div>)
  }
}

class BlockiesIdenticon extends Component {
  constructor(props) {
    super(props);
  }

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

export default Message;
