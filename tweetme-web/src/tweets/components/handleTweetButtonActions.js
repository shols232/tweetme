import React, {useState, useEffect }  from 'react';
import axios from "axios";
import {Redirect} from "react-router-dom";


// here we destructure the passed value of 'this' into its components 'tweet' and 'action'
export default function handleTweetButtonActions({tweet, action}={}, callback, retweet, event){
	console.log('call', callback,'retweet', retweet,'event', event)
	event.preventDefault()
	console.log('call', callback,'retweet', retweet,'event', event)
    var token = sessionStorage.getItem('token')
	axios({
		method:'POST',
		url: 'http://127.0.0.1:8000/api/tweets/action/',
		headers: {
        	"X-Requested-With":"XMLHttpRequest",
            "Content-Type": "Application/json",
            "Authorization": `Token ${token}`
		},
 		data: {id:tweet.id, action:action.type}
	})
	.then((response) => {
		if (action.type==='like-action'){
				callback(response.data)
			}else 
		if (action.type==='like-action'){
				callback(response.data)
			}else 
		if(retweet){
			if (action.type==='retweet'){
				retweet(response.data)
			}
		}			
	},
	(error) => {
		console.log(error)
		if(error.response.status===401){
			console.log(error.response.status)
			return <Redirect to={{pathname:'/login', state:'You Need To Log In To Perform That Action'}} />
		}
		}
	)
}