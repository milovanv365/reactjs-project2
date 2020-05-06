import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setTeamData } from '../../../../../../services/action';
import BaseAccessLevel from './BaseAccessLevel';
import axios from 'axios';

class Role_Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: '1',
            access_levels: [],
            role_users: []
            // team_data: null,
        }
    }

    toggle = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab,
            });
        }
    }

    componentDidMount() {
        console.log('getting access levels');

        var token = localStorage.getItem('token');
        
        var url = `http://localhost:8000/team/getaccesslevels/${localStorage.getItem('teamname')}/${this.props.role_id}`;
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token
        };

        axios.get(url, { headers: headers }).then((response) => {
            console.log(response.data.access_levels);
            //console.log(response.data.users);

            this.setState({
                access_levels: response.data.access_levels
            });
        }).catch((error) => {
            if (error.response) {
                console.log(error.response.data); // => the response payload
            }
            console.log(error);
        });

        
        // get role users
        url = `http://localhost:8000/team/getroleusers/${localStorage.getItem('teamname')}/${this.props.role_id}`;
        
        // same headers as above
        /*const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token
        };*/

        axios.get(url, { headers: headers }).then((response) => {
            console.log(response.data.role_users);
            
            this.setState({
                role_users: response.data.role_users
            });
        }).catch((error) => {
            if (error.response) {
                console.log(error.response.data); // => the response payload
            }
            console.log(error);
        });
    }

    render() {
        let access_levels = null, role_users = null;

        if (this.state.access_levels) {
            access_levels = (this.state.access_levels.map((access_level, index) =>
                <BaseAccessLevel access_level={access_level.access_level} base_name={access_level.base_name} role={this.props.role_id} ></BaseAccessLevel>
            ));
        }

        if (this.state.role_users) {
            role_users = (this.state.role_users.map((role_user, i) =>
                <tr key={i}>
                    <td>{role_user.username}</td>
                    <td>{role_user.email}</td>
                </tr>
            ));
        }

        return (
            <Modal isOpen={this.props.role_modal} toggle={() => this.props.modal_handle()} style={{ minWidth: '800px' }}>
                <ModalHeader toggle={() => this.props.modal_handle()} className="role_modal_header">Role: {this.props.role}</ModalHeader>
                <ModalBody>
                    <div className="role_modal_body">
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    href="#"
                                    className={classnames({ active: this.state.activeTab === '1' })}
                                    onClick={() => {
                                        this.toggle('1');
                                    }}
                                >
                                    Access Levels
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    href="#"
                                    className={classnames({ active: this.state.activeTab === '2' })}
                                    onClick={() => {
                                        this.toggle('2');
                                    }}
                                >
                                    Users
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                                <Row>
                                    <Col sm="12">
                                        <p>Here you can assign access level for each base.</p>
                                        <p>Users assigned to this role are subject to below access levels.</p>
                                    </Col>
                                </Row>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Base</th>
                                            <th>Access Level</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {access_levels}
                                    </tbody>
                                </Table>
                            </TabPane>
                            <TabPane tabId="2">
                                <Row>
                                    <Col sm="12">
                                        <p>Here you can find users who belong to this role.</p>
                                    </Col>
                                </Row>
                                <Table className="users_table">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>E-mail Address</th>
                                        </tr>
                                    </thead>
                                    <tbody>{role_users}</tbody>
                                </Table>
                            </TabPane>
                        </TabContent>
                    </div>
                </ModalBody>
                <ModalFooter>
                    {/* <Button color="primary" onClick={this.props.modal_handle}>Do Something</Button>{' '}
                        <Button color="secondary" onClick={this.props.modal_handle}>Cancel</Button> */}
                </ModalFooter>
            </Modal>
        )
    }
}

const mapStateToProps = ({ team_data }) => ({
    team_data
});

const mapDispatchToProps = (dispatch) => ({
    setTeamData: bindActionCreators(setTeamData, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Role_Modal);
