import React, { Component } from 'react'
import { Button } from '@material-ui/core'
import { Dialog, DialogContent } from '@material-ui/core'
import { CameraAlt as CameraIcon } from '@material-ui/icons'
import { withStyles } from '@material-ui/core'
import QrReader from 'react-qr-reader'

import { isMobile } from 'react-device-detect';


const styles = theme => ({
  qr: {
    width: '50%'
  },
  paperFullScreen: {
    width: '75%',
    height: '75%'
  },
  marginTopBottom: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  }
})

class ScanSecret extends Component {
  state = {
    open: false
  }

  qrRef = React.createRef()

  parseResult = result => {
    console.log(result)
    if (result !== null) {
      try {
        // TODO this needs to check the smart contract for validity
        const parsed = JSON.parse(result)
        this.props.addSecret(Number(parsed.id), parsed.secret)
        this.setState({open: false})
      } catch (error) {
        return
      }
    }
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.marginTopBottom}>
        <Button variant="contained" onClick={() => this.setState({ open: true })}>
          <CameraIcon />
          Scan Secret
        </Button>

        <Dialog
          fullScreen
          classes={{paperFullScreen: classes.paperFullScreen}}
          open={this.state.open}
          onClose={() => this.setState({ open: false })}
        >
          <DialogContent>
            <QrReader
              ref={this.qrRef}
              delay={200}
              style={{width: '50%', margin: '0 auto'}}
              onError={error => { console.error(error) }}
              onScan={this.parseResult}
              legacyMode={isMobile}
            />
            {isMobile ?
              <div style={{textAlign: 'center'}}>
                <Button
                  style={{marginTop: 5}}
                  variant='contained'
                  color='primary'
                  onClick={() => { this.qrRef.current.openImageDialog()}}
                >
                  Submit Secret
                </Button>
              </div> :
              undefined
            }
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}


export default withStyles(styles)(ScanSecret)
