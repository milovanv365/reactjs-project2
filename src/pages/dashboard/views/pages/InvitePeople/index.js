import React, { Component } from 'react';
import axios from "axios";
import validator from 'validator';

class InvitePeople extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inv_email: '',
			inv_role_id: '',
			alert_opacity: 0,
			alert_status: '',
			error_message: '',
			roles: [],
			email_error: ''
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
				roles: response.data.roles,
                inv_role_id: response.data.roles[0].id
            });
        }).catch((error) => {
            if (error.response) {
                console.log(error.response.data); // => the response payload
            }
            console.log(error);
        });
	}

	handleChangeRole = (e) => {
		this.setState({
			inv_role_id: e.target.value
		});
	}

	handleChangeEmail = (e) => {
		this.setState({
			inv_email: e.target.value
		});
	}

	btn_click = (e) => {
		if (this.handle_validate()) {
			var token = localStorage.getItem('token');
			// console.log(this.state);
			var teamname = localStorage.getItem("teamname");
			
			var body = {
				"email": this.state.inv_email,
				"role": this.state.inv_role_id
			};
			
			var url = `http://localhost:8000/team/invite-people/${teamname}`;
			const headers = {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': token
			};
			var data = JSON.stringify(body)
			axios.post(url, data, { headers: headers })
			.then((response) => {
				console.log(111, response)
				this.setState({ alert_opacity: 1 }, () => setTimeout(() => this.setState({ alert_opacity: 0 }), 2000));
				if (response.status == 201) {
					this.setState({ alert_status: "success" });
				}
			})
			.catch((error) => {
				if (error.response) {
                    console.log(error.response.data); // => the response payload
					this.setState({ alert_status: "info", error_message: error.response.data.message });
					this.setState({ alert_opacity: 1 }, () => setTimeout(() => this.setState({ alert_opacity: 0 }), 2000));
                    //this.setState({ error_opacity: 1 }, () => setTimeout(() => this.setState({ error_opacity: 0 }), 2000));
                }
                console.log(error);
				
			});
		}
	}

	handle_validate = () => {
		let formvalid = true;
  
		if (this.state.inv_email === '') {
		   this.setState({ email_error: 'Email is required' });
		   formvalid = false;
		}
		else {
		   if (validator.isEmail(this.state.inv_email)) this.setState({ email_error: '' });
		   else {
			  this.setState({ email_error: 'Email is not valid' });
			  formvalid = false;
		   }
		}
  
		return formvalid;
	}

	render() {
		const EmailValidation = this.state.email_error ? (<label className="text-danger">{this.state.email_error}</label>) : (<br />);

		const select_style = {
			width: "130px",
			height: "30px",
		};
		const hr_style = {
			border: "1px solid black",
		}
		const btn_style = {
			height: "33px",
			color: "white",
			marginLeft: "30px",
			border: "none",
			borderRadius: "4px",
			backgroundColor: "#1a97ff",
			marginTop:'30px'
		}

		let roles = null;
		
		if (this.state.roles) {
			roles = (this.state.roles.map((role, i)  =>
				<option value={role.id}>{role.name}</option>
			));
		}

		return (
			<div style={{padding:"15px"}}>
				<h3>Invite People</h3>
				<hr style={hr_style}></hr>
				<div className={"alert mr-5 ml-5 text-center fade-in alert-" + this.state.alert_status} style={{ opacity: this.state.alert_opacity, transition: "opacity 2s" }}>
					{this.state.alert_status === 'success' ? `Invitation to ${this.state.inv_email} has been sent successfully` : this.state.error_message }
				</div>
				<div style={{textAlign:"center"}}>
				<label>Email:</label>
					<input type="email" name="inv_email" id="inv_email" onChange={this.handleChangeEmail} />
					{EmailValidation}
					<label style={{ marginLeft: "30px" }} >Role:</label>
					<select id="inv_user_role" name="inv_user_role" style={select_style} onChange={this.handleChangeRole}>
						{roles}
					</select>
					<br />
					<input type="button" id="btn_invite" name="btn_invite" value="Invite Now" style={btn_style} onClick={this.btn_click} />
				</div>
			</div>
		);
	}
}

export default InvitePeople;