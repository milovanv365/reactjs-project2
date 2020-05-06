import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import classnames from 'classnames';
import Role_Modal from './Role_Modal';
import axios from "axios";

class Roles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role_modal: false,
            role: '',
            role_id: '',
            roles: []
        }
    }

    componentDidMount() {
        var token = localStorage.getItem('token');
        
        var url = `http://localhost:8000/team/getroles/${localStorage.getItem('teamname')}`;
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token
        };
        axios.get(url, { headers: headers }).then((response) => {
            console.log(response.data.roles);

            this.setState({
                roles: response.data.roles
            });
        }).catch((error) => {
            if (error.response) {
                console.log(error.response.data); // => the response payload
            }
            console.log(error);
        });
    }

    modal_handle = () => {
        console.log('modal handle');
        this.setState(prevState => ({
            role_modal: !prevState.role_modal
        }));
    }

    role_clicked = (role_id, role_name) => {
        this.setState(prevState => ({
            role_id, role_id,
            role: role_name,
            role_modal: !prevState.role_modal
        }));
    }

    render() {
        let roles = null;

        if (this.state.roles) {
            roles = (this.state.roles.map((role, i) =>
                <li onClick={() => this.role_clicked(role.id, role.name)} key={role.id}>{role.name}</li>
            ));
        }

        return (
            <div>
                <div className="roles_div">
                    <h5 className="text-dark">Roles</h5>
                    <ul>
                        {roles}
                    </ul>
                </div>
                {this.state.role_modal && <Role_Modal role_modal={this.state.role_modal} modal_handle={this.modal_handle} role={this.state.role} role_id={this.state.role_id} />}
            </div>
        )
    }
}

export default Roles;