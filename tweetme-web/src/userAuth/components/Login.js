
import React, { Component } from "react";
import {Link, Route, useHistory, Redirect} from 'react-router-dom';
import axios from 'axios';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {

          username: '',
          password: '',
          isLoggedIn: false,
        }
    }

    handleInputChange = ({ target }) => {

      this.setState({[target.name]: [target.value][0]})

    } 

    handleLoginFormSubmit = (event) => {
      event.preventDefault()
      // window.history = useHistory()
      console.log('hi,', this.state)
      const {username, password} = this.state
      axios({
        method:'POST',
        url: 'http://localhost:8000/api/account/login/',
        headers: {
              "X-Requested-With":"XMLHttpRequest",
              "Content-Type": "Application/json"
        },
        data: {
          username:username,
          password:password,
        }
      })
      .then((response) => {
        console.log(response.data)
        sessionStorage.setItem("token", response.data.token)
        sessionStorage.setItem("username", username)
        this.setState(prevState => ({
            isLoggedIn: !prevState.isLoggedIn,
          }))
        // window.location.pathname = '/'

      },
      (error) => {
        console.log(error)
        console.log(this.state)
        }
      )
  }

    render() {
      return this.state.isLoggedIn ? <Redirect to={{pathname:'/', state:`Welcome back, ${this.state.username}`}} />
        :
          (<div style={{height: '100vh'}} >
            <div className='d-flex h-100 align-items-center' >
              <MDBContainer >
                <MDBRow>
                  <MDBCol className='col-md-8 col-12 mx-auto'>
                    <MDBCard style={{height: '70vh'}} className='pt-5'>
                      <MDBCardBody>
                        <form onSubmit={this.handleLoginFormSubmit} noValidate>
                          <p className="h5 text-center mb-4">Sign in</p>
                          <div className="grey-text">
                            <MDBInput label="Type your username" icon="envelope" group name='username' onChange={this.handleInputChange} type="text" validate error="wrong"
                              success="right" />
                              <div className='invalid-feedback'>
                              Please input a username
                              </div>
                            <MDBInput label="Type your password" icon="lock" group name='password' onChange={this.handleInputChange} type="password" validate />
                          </div>
                          <div className="text-center">
                            <MDBBtn type='submit'>Login</MDBBtn>
                          </div>
                          <div className="text-center">
                            <p>Don't have an account yet? 
                            <Route render={({history})=>(
                              <span style={{color: 'cyan', cursor: 'pointer'}} onClick={() => {history.push('/register')}}> Register Now</span>
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

export default Login;
