

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

          loggedIn:true,
          username: '',
        }
    }



    Pages = () => {
    //   return (
    // <Router>
    //   <Switch> 
    //      <Route path='/login' ><Login /></Route>
    //      <Route path='/register' ><Register /></Route>
    //       {this.state.loggedIn ? 
    //           <React.Fragment >
    //             <Route path='/tweet/:id' >
    //               <TweetDetail />
    //             </Route>
    //               <Route exact path='/' >
    //                 <TweetComponent />
    //               </Route>
    //             </React.Fragment>          
    //             :
    //          <Redirect to={{pathname:'/login', state:'Please log in to view that page'}} />
    //       }
    //   </Switch>  
    // </Router>
        // )
  }

    render() {
        return (
          <div className='row'>
            <div className='col-8 mx-auto'>
            {//this.Pages()
            }
            <Profile />
            </div>
          </div>
        );
    }
}

export default App;

