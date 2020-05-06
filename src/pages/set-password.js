import React from 'react';
import axios from "axios";
// import validator from 'validator';
const queryString = require('query-string');

class SetNewPassword extends React.Component {
   constructor(props) {
      super(props);

      const parsed = queryString.parse(props.location.search);

      this.state = {
         email: '',
         password: '',
         confirm_password: '',
         team: '',
         password_error: '',
         confirm_password_error: '',
         resonse_error: '',
         token: parsed.token
      };
   }

   handle_password = (event) => {
      this.setState({ password: event.target.value });
   }

   handle_confirmPassword = (event) => {
      this.setState({ confirm_password: event.target.value });
   }

   handle_validation = () => {
      let formvalid = true;

      if (this.state.password === '') {
         this.setState({ password_error: 'Password is required' });
         formvalid = false;
      }
      else this.setState({ password_error: '' });

      if (this.state.confirm_password === '') {
         this.setState({ confirm_password_error: 'Confirm Password is required' });
         formvalid = false;
      }
      else {
         if (this.state.confirm_password !== this.state.password) {
            this.setState({ confirm_password_error: "Don't match with Password" });
            formvalid = false;
         }
         else this.setState({ confirm_password_error: '' });
      }

      return formvalid;
   }

   submit = () => {
      this.setState({ resonse_error: '' });

      if (this.handle_validation()) {
         var body = {
            "password": this.state.password
         };
         var url = `http://localhost:8000/users/set-password/${this.state.token}`;
         const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         };
         var data = JSON.stringify(body)
         axios.post(url, data, { headers: headers })
            .then((response) => {
               console.log(response);

               this.setState({ response_status: 'Password set successfully' });
               let team = response.data.team;
               localStorage.setItem('teamname', team);
               localStorage.setItem('user', response.data.user);
               localStorage.setItem('token', response.data.token);

               setTimeout(function () {
                  console.log(response);
               }, 1000);

               console.log("redirect");
               this.props.history.push('/sign-in');
            })
            .catch((error) => {
               console.log(error.message);
               if (error.response) {
                  console.log(error.response.data); // => the response payload
                  if (error.response.data.code) this.setState({ resonse_error: 'This Email already exist' });
                  else this.setState({ resonse_error: '' });
               }
            });
      }

   }

   render() {
      document.body.classList.remove('inner-page');
      const PasswordValidation = this.state.password_error ? (<label className="text-danger">{this.state.password_error}</label>) : (<br />);
      const ConfirmPasswordValidation = this.state.confirm_password_error ? (<label className="text-danger">{this.state.confirm_password_error}</label>) : (<br />);
      const ResponseValdiation = this.state.resonse_error ? (<label className="text-danger text-center">{this.state.resonse_error}</label>) : (<br />);
      return (
         <section className="auth-page">
            <div className="animation-circle-inverse">
               <i></i>
               <i></i>
               <i></i>
            </div>
            <div className="animation-circle">
               <i></i>
               <i></i>
               <i></i>
            </div>
            <div className="auth-card">
               <div className="text-center">
                  <h2>Set Password</h2>
                  <img src="assets/images/title-line.png" alt="title-line" className="img-fluid line" />
                  <p>Set a password for you account.</p>
                  {ResponseValdiation}
               </div>
               <div className="main">
                  <form className="auth-form">
                     <div className="form-group mb-0">
                        <label htmlFor="InputPassword">Password</label>
                        <i className="fa fa-lock"></i>
                        <input id="InputPassword" name="password" type="password" className="form-control" onChange={this.handle_password} placeholder="Password" required />
                     </div>
                     {PasswordValidation}
                     <div className="form-group mb-0">
                        <label htmlFor="ConfirmPassword">Confirm Password</label>
                        <i className="fa fa-lock"></i>
                        <input id="ConfirmPassword" name="confirm_password" type="password" className="form-control" onChange={this.handle_confirmPassword} placeholder="Confirm Password" required />
                     </div>
                     {ConfirmPasswordValidation}
                     <div className="form-group">
                        <button className="btn submit" type="button" onClick={this.submit}>Set Password</button>
                     </div>
                  </form>
               </div>
            </div>
         </section>
      );
   }
}


export default SetNewPassword;