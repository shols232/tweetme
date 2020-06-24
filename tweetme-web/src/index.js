import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import {TweetDetail} from './tweets'
import * as serviceWorker from './serviceWorker';
import TweetComponent   from './tweets'
import Register from './userAuth/components/Register'
import Login from './userAuth/components/Login'

const tweetEl = document.getElementById('tweet-me')
const rootEl = document.getElementById('root')

const E = React.createElement
const MyComponent = E(TweetComponent, tweetEl.dataset)

if (rootEl){
	ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

}

    // const hello = () => {
    // 	'use-strict';
    // 	window.addEventListener('load', function(){
    // 			console.log('hello')
    // 		 var forms = document.getElementsByClassName('needs-validation')
    // 		 var validation = Array.prototype.filter.call(forms, function(form){

    // 		 	form.addEventListener('submit', function(event){

    // 		 		if(form.checkValidity() === false){

    // 		 			event.preventDefault()
    // 		 			event.stopPropagation()
    // 		 		}
    // 		 		form.classList.add('was-validated')
    // 		 	}, false)
    // 		 })
    // 	}, false)
    // };
    // hello()

if(tweetEl){
	// const MyComponent = e(TweetCreateForm)

	const Pages = () => {
		return (
		<Router>
			<Switch>
			<Route path='/tweet/:id' >
				<TweetDetail tweetId={'77'}/>
			</Route>
				<Route exact path='/' >
					<TweetComponent />
				</Route>
			</Switch>
		</Router>
		)
	}
	
	ReactDOM.render(<App />,
  document.getElementById('tweet-me')
);

} 




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

