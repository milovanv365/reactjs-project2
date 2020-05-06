import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, CardTitle, CardText, Row, Col, Table } from 'reactstrap';
import axios from "axios";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';


class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            d_user: false,
            d_userName: '',
            d_email: ''
        }
    }

    getUsers = () => {
        var token = localStorage.getItem('token');
        var url = `http://localhost:8000/team/getusers/${localStorage.getItem('teamname')}`;
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token
        };
        axios.get(url, { headers: headers }).then((response) => {
            this.setState({
                users: response.data.users,
                d_user: false,
                d_userName: '',
                d_email: ''
            });
            console.log(111,this.state.users)
        }).catch((error) => {
            if (error.response) {
                console.log(error.response.data); // => the response payload
            }
            console.log(error);
        });
    }

    componentDidMount() {
        this.getUsers();
    }

    deleteTeamUser(e, index) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            d_user: true,
            d_userName: this.state.users[index].username,
            d_email: this.state.users[index].email
        });
    }
    handleClose = () => {
        this.setState({ d_user: false })
    }

    confirmDeleteUser = () => {
        var token = localStorage.getItem('token');
        var url = `http://localhost:8000/team/deleteuser/${localStorage.getItem('teamname')}/${this.state.d_email}`;
        const headers = {
            'content-type': 'multipart/form-data',
            // 'Accept': 'application/json',
            'Authorization': token
        };
        axios.post(url, {}, { headers: headers }).then((response) => {
            this.getUsers();
        }).catch((error) => {
            if (error.response) {
                console.log(error.response.data); // => the response payload
            }
            console.log(error);
        });
    }

    render() {
        let users = null;

        if (this.state.users) {
            users = (this.state.users.map((user, i) =>
            <tr key={user.email}>
            <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td><i className="fa fa-times text-danger" aria-hidden="true" onClick={(e) => this.deleteTeamUser(e, i)}></i></td>
                </tr>
            ));
        }

        return (
            <div>
                <Dialog open={this.state.d_user} onClose={this.handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">Remove {this.state.d_userName} from your team?</DialogTitle>
                    <DialogActions >
                        <Button onClick={this.confirmDeleteUser} color="primary" variant="contained">Yes</Button>
                        <Button onClick={this.handleClose} color="secondary" variant="contained">No</Button>
                    </DialogActions>
                </Dialog>
                <Table className="users_table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>E-mail Address</th>
                            <th>Role</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>{users}</tbody>
                </Table>
            </div>
        )
    }
}

export default Users;