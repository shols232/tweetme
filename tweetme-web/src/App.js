

import React, { Component }  from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import {TweetDetail} from './tweets'
import TweetComponent   from './tweets'
import Register from './userAuth/components/Register'
import Profile from './userAuth/components/Profile'
import Login from './userAuth/components/Login'


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {

          loggedIn:sessionStorage.getItem('token') || false,
          username: '',
        }
    }



    Pages = () => {
        console.log('loggedInState', this.state.loggedIn)
      return (
    <Router>
      <Switch> 
         <Route path='/login' ><Login /></Route>
         <Route path='/register' ><Register /></Route>
          {this.state.loggedIn ? 
              <React.Fragment >
                <Route path='/tweet/:id' >
                  <TweetDetail />
                </Route>
                <Route exact path='/' >
                    <TweetComponent />
                  </Route>
                <Route path='/profiles/:username' >
                  <Profile />
                  </Route>
                </React.Fragment>          
                :
             <Redirect to={{pathname:'/login', state:'Please log in to view that page'}} />
          }
      </Switch>  
    </Router>
        )
  }

    render() {
        return (
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-9 col-8 mx-auto'>
            {this.Pages()
            }
            </div>
          </div>
       </div> 
        );
    }
}

export default App;

