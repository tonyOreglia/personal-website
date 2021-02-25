import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default class FormDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textFieldValue: "",
    };
  }

  _handleTextFieldChange = (e) => {
    this.setState({
      textFieldValue: e.target.value,
    });
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create a Breadcrumb</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To save a breadcrumb, enter a message and click Save.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Your Breadcrumb Message"
              type="email"
              fullWidth
              value={this.state.textFieldValue}
              onChange={this._handleTextFieldChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => this.props.handleSave(this.state.textFieldValue)}
              color="primary"
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
