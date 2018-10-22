import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {ping,getUsers } from '../../actions/index'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import EnhancedTableHead from '../table/EnhancedTable'
import FormDialog from './NewPersonFormDialog'
const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  fontSize:{
    fontSize:'14 !important',
    color:'red'
  },
  table: {
    minWidth: 700,
    fontSize: '2rem',
    color:red
  },
  body: {
    fontSize: 14,
  },
  button: {
    margin: theme.spacing.unit,
  }
});

class ProductList extends Component {
  constructor(props){
    super(props);
    this.props.fetchUsers();
    this.showDialogNewPerson = this.showDialogNewPerson.bind(this);
    this.savePerson = this.savePerson.bind(this);
    this.updatePerson= this.updatePerson.bind(this);
    this.selectedRow = this.selectedRow.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.showNewPersondialog = this.showNewPersondialog.bind(this)
    this.state={
              id:0,
              showDialog:false,
              users: [],
              user :undefined,
              typeAction :undefined,
              selectedRow :undefined
    }
    
  }
  componentWillMount(){
    if (this.props.users != undefined){
      this.props.users.map(item=> {
        this.state.users.push(this.createData(item.id, item.firstname, item.lastname))
      });
    }
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.users != undefined) {
        nextProps.users.map(item=> {
          this.state.users.push(this.createData(item.id, item.firstname, item.lastname, item.email))
       });
    }
  }


  createData(id, firstname, lastname,email) {
    return { id: id, firstname:firstname, lastname : lastname, email :email};
  }

  showDialogNewPerson(typeAction){
    this.setState({showDialog:true,
                   typeAction :typeAction});
    this.props.users.filter(item=>item.id)
  }

  savePerson(person){
    this.props.users.push({id:this.props.users.length+1,firstname:person.firstname,lastname:person.lastname});
    this.setState({users:this.props.users})
    this.showNewPersondialog(false)
  }
  updatePerson(person){
    this.props.users.filter(item=> item.id==person.id)
                    .map(item => {
                              item.firstname=person.firstname
                              item.lastname=person.lastname
                    })
    this.setState({users:this.props.users})
    this.showNewPersondialog(false)
  }
  showNewPersondialog(show){
    this.setState({showDialog:show})
  }
  selectedRow(person){
    this.setState({selectedRow : person.length>1? undefined :  person})
  }
  deleteRow(person){
    let index = this.props.users.indexOf(person[0]);
    delete this.props.users[index]
    this.setState({users:this.props.users})
  }
  render() {

    return (
      <div>
      
    <EnhancedTableHead 
        persons={this.state.users}
        selectedRow={this.selectedRow}
        deleteRow={this.deleteRow}>
    </EnhancedTableHead>
    <FormDialog 
          show={this.state.showDialog}
          savePerson={this.savePerson}
          updatePerson={this.updatePerson}
          showNewPersondialog={this.showNewPersondialog}
          typeAction={this.state.typeAction}
          selectedRow={this.state.selectedRow}
          >
    </FormDialog>
    <Button variant="outlined" color="primary" onClick={() => this.showDialogNewPerson('Add')} className={styles.button}>
        New Person
      </Button>
      <Button variant="outlined" color="secondary" onClick={() => this.showDialogNewPerson('Update')} className={styles.button}>
        update
      </Button>
      </div>
    )
  }
}



function mapStateToProps(state) {

 const users = state.get('users').items;

  return {
    users : users,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    fetchUsers: () => dispatch({type: "USER_FETCH_REQUESTED"}),
  };
}

export default connect(mapStateToProps,mapDispatchToProps) (ProductList)
