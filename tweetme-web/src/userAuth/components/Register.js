
import React, { Component, useState, useEffect } from 'react';
import axios from "axios";
import 'mdbreact/dist/css/mdb.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {Route} from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody} from 'mdbreact';
   
class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {username: '', email: '', password:'', password2: ''}
    }

    handleChange = ({ target }) => {

    	this.setState({[target.name]: [target.value][0]})
    	console.log(this.state)
    }

	handleRegistrationFormSubmit = (event) => {
		event.preventDefault()
		const {username, email, password, password2} = this.state
		axios({
			method:'POST',
			url: 'http://localhost:8000/api/account/register/',
			headers: {
	        	"X-Requested-With":"XMLHttpRequest",
	            "Content-Type": "Application/json"
			},
	 		data: {
	 			username:username,
	 			email:email,
	 			password:password,
	 			password2:password2,
	 		}
		})
		.then((response) => {
			console.log(response.data)
			sessionStorage.setItem("token", response.data.token)
			sessionStorage.setItem("username", username)
		},
		(error) => {
			console.log(error)
			console.log(this.state)
			}
		)
		console.log(this.state)
	}

    render() {
		return (
		<div style={{height: '100vh'}} >
			<div className='d-flex h-100 align-items-center'>
			    <MDBContainer >
			      <MDBRow>
			        <MDBCol className='col-md-8 col-12 mx-auto'>
			          <MDBCard>
			            <MDBCardBody>
			              <form className='needs-validation' onSubmit={this.handleRegistrationFormSubmit} novalidate>
			                <p className="h4 text-center py-4">Sign up</p>
			                <div className="grey-text">
			                  <MDBInput label="Type Your name" name='username' onChange={this.handleChange} value={this.state.username} icon="user" group type="text" validate error="wrong" success="right" required/>
			                  <MDBInput label="Type Your email" name='email' onChange={this.handleChange} icon="envelope" value={this.state.email} group type="email" validate error="wrong" success="right" required/>
			                  <MDBInput label="Password" icon="lock" name='password' onChange={this.handleChange} group value={this.state.password} type="password" validate error="wrong" required success="right" />
			                  <MDBInput label="Confirm Your password" icon="lock" name='password2' onChange={this.handleChange} value={this.state.password2} group type="password" validate required/>
			                </div>
			                <div className="text-center py-4 mt-3">
			                  <MDBBtn color="cyan" type="submit">
			                    Register
			                  </MDBBtn>
			                </div>
		                    <div className="text-center">
		                    	<p>Already Have an acoount? 
			                      <Route render={({history})=>(
			                        <span style={{color: 'cyan', cursor: 'pointer'}} onClick={() => {history.push('/login')}}> Login Now</span>
			                      )} />
		                    	</p>
			                </div>
			              </form>
			            </MDBCardBody>
			          </MDBCard>
			        </MDBCol>
			      </MDBRow>
			    </MDBContainer>
			</div>
		</div>
	  	);
    }
}

 
export default Register;
