import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Snackbar from '@material-ui/core/Snackbar'
import Button from '@material-ui/core/Button'

export default class SnackbarProvider extends PureComponent {
  state = {
    message: null,
    open: false
  }

  getChildContext () {
    return {
      snackbar: {
        showMessage: this.showMessage
      }
    }
  }

  /**
   * Display a message with this snackbar.
   * @param {string} message message to display
   * @param {string} [action] label for the action button
   * @param {function} [handleAction] click handler for the action button
   * @public
   */
  showMessage = (message, action, handleAction) => {
    this.setState({ open: true, message, action, handleAction })
  }

  handleActionClick = () => {
    this.handleClose()
    this.state.handleAction()
  }

  handleClose = () => {
    this.setState({ open: false, handleAction: null })
  }

  render () {
    const {
      action,
      message,
      open
    } = this.state

    const {
      children,
      SnackbarProps = {}
    } = this.props

    return (
      <React.Fragment>
        {children}
        <Snackbar
          {...SnackbarProps}
          open={open}
          message={message || ''}
          action={action != null && (
            <Button
              color='secondary'
              size='small'
              onClick={this.handleActionClick}
            >
              {action}
            </Button>
          )}
          onClose={this.handleClose}
        />
      </React.Fragment>
    )
  }
}

SnackbarProvider.childContextTypes = {
  snackbar: PropTypes.shape({
    showMessage: PropTypes.func
  })
}

SnackbarProvider.propTypes = {
  /**
   * The children that are wrapped by this provider.
   */
  children: PropTypes.node,
  /**
   * Props to pass through to the snackbar.
   */
  SnackbarProps: PropTypes.object
}
