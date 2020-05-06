import React, { Component } from 'react';
import axios from "axios";
import { withRouter, Link } from 'react-router-dom';

const queryString = require('query-string');

class AcceptInvitation extends Component {
    constructor(props) {
        super(props);
        const parsed = queryString.parse(props.location.search);
        this.state = {
            team: parsed.team,
            email: parsed.email,
            invid: parsed.invid
        };
    }

    componentDidMount() {
        console.log(this.props)
        var url = `http://localhost:8000/team/accept-inv/${this.state.team}?email=${this.state.email}&invid=${this.state.invid}`;
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
        axios.get(url, { headers: headers })
            .then((response) => {
                // this.setState({ team_data: response.data });
                let token = response.data.token;
                // user is not activated, set password
                if (token) {
                    setTimeout(function () {
                        window.location.href = `/set-password?token=${token}`
                    }, 2000)
                }
                else {
                    // user is activated and signed in
                    let team = response.data.team;
                    if (team) {
                        this.props.history.push(`/${team}`);
                    }
                    else {
                        // user is activated but not signed in
                        this.props.history.push('/sign-in');
                    }
                }
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response.data); // => the response payload
                }
                console.log(error);
            });
    }

    render() {
        document.body.classList.remove('landing-page');
        return (
            <section className="p-0">
                <div className="auth-page error-main">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="text-center">
                                    <h2 className="f-bold">Accepting invitation...</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="animation-circle-inverse">
                        <i></i>
                        <i></i>
                        <i></i>
                    </div>
                    <div className="animation-circle absolute">
                        <i></i>
                        <i></i>
                        <i></i>
                    </div>
                </div>
            </section>
        );
    }
}

export default withRouter(AcceptInvitation);