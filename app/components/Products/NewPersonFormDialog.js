import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class FormDialog extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            firstName: null,
            lastName: null,
          };

    }

  

  handleClickOpen = () => {
    this.setState({ open: true });
  };
  componentWillReceiveProps(nextProps){

        this.setState({ open: nextProps.show,
                        selectedRow:nextProps.selectedRow,
                        typeAction: nextProps.typeAction });
    }
  handleClose = () => {
    this.setState({ open: false });
    this.props.showNewPersondialog(false)
  };
  handleSave = () => {
      if (this.state.typeAction=='Add'){
        this.props.savePerson({firstname:this.state.firstname,lastname:this.state.lastname});
        this.setState({
            firstname:null,
            lastname:null});
      }
      else{
        this.props.updatePerson({id:this.state.selectedRow[0].id,firstname:this.state.selectedRow[0].firstname,lastname:this.state.selectedRow[0].lastname});
      }
    
  }
  handleOnChangeFirstName = (event) => {
    if (this.state.typeAction == 'Add'){
      this.setState({firstname: event.target.value});
    }else{
        this.setState({selectedRow: [{id:this.state.selectedRow[0].id,
            firstname:event.target.value,
            lastname:this.state.selectedRow[0].lastname}]});
    
    }
      
    }
  handleOnChangeLastName = (event) => {
    if (this.state.typeAction == 'Add'){
        this.setState({lastname: event.target.value});
    }
    else{
        this.setState({selectedRow: [{id:this.state.selectedRow[0].id,
                                  firstname:this.state.selectedRow[0].firstname,
                                  lastname:event.target.value}]});
    }
    

    }

  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New Person</DialogTitle>
          <DialogContent>
            <DialogContentText>
               please enter your firstName and lastName and your email here. We will send
              updates occasionally.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="FirstName"
              label="FirstName"
              type="text"
              fullWidth
              value={this.state.typeAction == 'Update' ?  this.state.selectedRow[0].firstname : this.state.firstname}
              onChange={this.handleOnChangeFirstName}
            />
            <TextField
              autoFocus
              margin="dense"
              id="LastName"
              label="LastName"
              type="text"
              fullWidth
              value={this.state.typeAction == 'Update' ?  this.state.selectedRow[0].lastname : this.state.lastname}
              onChange={this.handleOnChangeLastName}
            />
            
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}