import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Col, Row, Card, CardBody } from 'reactstrap';
import profile_temp_avatar from '../../../../../public/assets/images/profile_temp_avatar.png';
import axios from "axios";
import { Avatar } from '../../vibe';

export default class FormsPage extends Component {
    constructor() {
        super();
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            avatar: '',
            response_status: '',
            avatar_image: {},
        }
        this.change_avatar_pic = this.change_avatar_pic.bind(this)
    }

    async componentDidMount() {
        await this.set_profile();
        if (JSON.parse(localStorage.getItem('user')).avatar) {
            await this.setState({ avatar: "http://localhost:8000/public" + JSON.parse(localStorage.getItem('user')).avatar })
        }
    }

    set_profile = () => {
        this.setState({ firstname: JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).firstname ? JSON.parse(localStorage.getItem('user')).firstname : '' });
        this.setState({ lastname: JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).lastname ? JSON.parse(localStorage.getItem('user')).lastname : '' });
        this.setState({ email: JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).email });
        this.setState({ avatar: JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).avatar ? `${process.env.REACT_APP_API_HOST}${JSON.parse(localStorage.getItem('user')).avatar}` : profile_temp_avatar });
    }

    handle_firstname = (e) => {
        this.setState({ firstname: e.target.value });
    }

    handle_lastname = (e) => {
        this.setState({ lastname: e.target.value });
    }

    change_avatar_pic = async (event) => {
        this.setState({ avatar_image: event.target.files[0] });
        const [file] = event.target.files;
        if (file) {
            this.setState({ avatar: window.URL.createObjectURL(file) })
            // document.getElementById("profile_page_avatar").src = window.URL.createObjectURL(file);
        }
    }

    update_profile = () => {
        var data = new FormData();
        data.append('file', this.state.avatar_image);
        data.append('firstname', this.state.firstname);
        data.append('lastname', this.state.lastname);
        var token = localStorage.getItem('token');
        var url = "http://localhost:8000/users/update_profile";
        const headers = {
            'content-type': 'multipart/form-data',
            // 'Accept': 'application/json',
            'Authorization': token
        };
        axios.post(url, data, { headers: headers })
            .then((response) => {
                localStorage.setItem('user', JSON.stringify(response.data));
                this.setState({ response_status: 'Successfully updated' });
                window.location.reload(false);
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response.data);
                }
                console.log(error);
            });
    }
    getAvatarName() {

        let firstname = JSON.parse(localStorage.getItem('user')).firstname;
        let lastname = JSON.parse(localStorage.getItem('user')).lastname;
        let email = JSON.parse(localStorage.getItem('user')).email;
        if (firstname && lastname) {
            return firstname[0].toUpperCase() + lastname[0].toUpperCase()
        } else {
            return email.slice(0, 2).toUpperCase()

        }
    }

    render() {
        return (
            <Row>
                <Col md={{ size: 8, offset: 2 }}>
                    <Card>
                        <CardBody className="m-5">
                            <Form>
                                <div className="text-center mb-5">
                                    <h2>My Profile</h2>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <div>
                                        <input accept="image/*" className="d-none" id="contained-button-file" multiple type="file"
                                            onChange={this.change_avatar_pic} />
                                        <label htmlFor="contained-button-file">
                                            {this.state.avatar  ?
                                                <img className="profile_page_avatar" id="profile_page_avatar" src={this.state.avatar} alt="profile_avatar"></img>
                                                :
                                                <Avatar className="profile_page_avatar" size="medium" color="blue" initials={this.getAvatarName()} />
                                            }
                                        </label>
                                    </div>
                                </div>
                                <FormGroup row>
                                    <Label for="firstName" sm={2}>First Name</Label>
                                    <Col sm={4}>
                                        <Input type="text" name="firstname" id="firstName" placeholder="First Name" value={this.state.firstname} onChange={this.handle_firstname} />
                                    </Col>
                                    <Label for="lastName" sm={2}>Last Name</Label>
                                    <Col sm={4}>
                                        <Input type="text" name="lastname" id="lastName" placeholder="Last Name" value={this.state.lastname} onChange={this.handle_lastname} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row className="mb-5">
                                    <Label for="exampleEmail" sm={2}>Email</Label>
                                    <Col sm={10}>
                                        <Input type="email" name="email" id="exampleEmail" value={this.state.email} readOnly />
                                    </Col>
                                </FormGroup>
                                <div className="text-center">
                                    <Button color="primary" type="button" onClick={this.update_profile}>Submit</Button>
                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        )
    }
}