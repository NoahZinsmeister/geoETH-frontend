import React, { Component, Fragment } from 'react';
import { withWeb3 } from 'web3-webpacked-react';
import { Typography, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core'
import QrReader from 'react-qr-reader'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  }
})

class Body extends Component {
  state = {
    result: undefined
  }

  render() {
    return (
      <Fragment>
        <Typography align="center">Account: {this.props.w3w.account}</Typography>
        <input
          accept="image/*"
          className={this.props.classes.input}
          id="flat-button-file"
          type="file"
        />
        <label htmlFor="flat-button-file">
          <Button variant="contained" component="span" className={this.props.classes.button}>
            Upload
          </Button>
        </label>

        <QrReader
          delay={100}
          onScan={data => this.setState({result: data})}
          onError={error => console.error(error)}
          onImageLoad={data => this.setState({result: data})}
          style={{ width: '20%' }}
        />
        <Typography align="center">{this.state.result}</Typography>
      </Fragment>
    )
  }
}

export default withStyles(styles)(withWeb3(Body))
