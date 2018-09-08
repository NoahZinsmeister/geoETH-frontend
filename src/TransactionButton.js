import React, { Component } from 'react';
import { withWeb3 } from 'web3-webpacked-react';
import { Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import { withTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const ProgressIcon = (props) => <CircularProgress {...props} />

const styles = theme => ({
  ready: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark
    }
  },
  loading: {
    backgroundColor: theme.palette.grey[300],
    color: theme.palette.getContrastText(theme.palette.grey[300]),
    '&:hover': {
      backgroundColor: theme.palette.grey[500]
    }
  },
  error: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.error.dark
    }
  },
  success: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.success.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.success.dark
    }
  }
})

class TransactionButton extends Component {
  constructor(props) {
    super(props)

    this.state = {
      text: this.props.buttonInitial,
      buttonState: 'ready',
      buttonDisabled: false,
      linkProps: {}
    }
  }

  sendTransaction = () => {
    if (this.state.buttonState === 'error') {
      this.setState({
        text: this.props.buttonInitial,
        buttonState: 'ready',
        buttonDisabled: false,
        linkProps: {}
      })
      return
    }

    if (this.state.buttonState === 'ready') {
      const iconSize = this.props.theme.typography.button.fontSize

      this.setState({
        text: <ProgressIcon size={iconSize} />,
        buttonState: 'loading',
        buttonDisabled: true,
        linkProps: {}
      })

      this.props.w3w.sendTransaction(this.props.method, {
        error: (error, message) => {
          console.error(error.message)
          this.setState({
            text: `Transaction Error: '${message}'`,
            buttonState: 'error',
            buttonDisabled: false,
            linkProps: {}
          })
        },
        transactionHash: (transactionHash) => {
          this.setState({
            text: <span>Awaiting Confirmation <ProgressIcon size={iconSize} /></span>,
            buttonState: 'loading',
            buttonDisabled: false,
            linkProps: {
              component: "a",
              href: this.props.w3w.etherscanFormat('transaction', transactionHash),
              target: "_blank"
            }
          })
          this.props.onTransactionHash()
        },
        confirmation: (confirmationNumber, receipt) => {
          if (confirmationNumber === 0) {
            this.setState({
              text: this.props.buttonSuccess,
              buttonState: 'success',
              buttonDisabled: false,
              linkProps: {
                component: "a",
                href: this.props.w3w.etherscanFormat('transaction', receipt.transactionHash),
                target: "_blank"
              }
            })
            this.props.onConfirmation()
          }
        }
      })
    }
  }

  render() {
    return (
      <Button
        variant="contained"
        color="primary"
        disabled={this.state.buttonDisabled}
        onClick={this.sendTransaction}
        className={this.props.classes[this.state.buttonState]}
        {...this.state.linkProps}
      >
        {this.state.buttonState === 'ready' ? this.props.buttonInitial : this.state.text}
      </Button>
    )
  }
}

TransactionButton.propTypes = {
  buttonInitial:     PropTypes.node.isRequired,
  buttonSuccess:     PropTypes.string,
  method:            PropTypes.object.isRequired,
  onTransactionHash: PropTypes.func,
  onConfirmation:    PropTypes.func,
  classes:           PropTypes.object.isRequired,
  theme:             PropTypes.object.isRequired,
  w3w:               PropTypes.object.isRequired
}

TransactionButton.defaultProps = {
  buttonSuccess:     'Success!',
  onTransactionHash: () => {},
  onConfirmation:    () => {}
}


export default withTheme()(withStyles(styles)(withWeb3(TransactionButton)))
