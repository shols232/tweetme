import React, { useState, useEffect } from 'react';
import {Tweet} from './Tweet'
import { useParams, Redirect  } from "react-router-dom"
import handleTweetButtonActions from './handleTweetButtonActions'
import axios from "axios";

const TweetDetail = ({ tweetId }) => {
	let { id } = useParams()
	const [tweet, setTweet] = useState(undefined)
	const [hasRetweeted, setHasRetweeted] = useState(false)
	const [isAuthorized, setIsAuthorized] = useState(true)
    var token = sessionStorage.getItem('token')


  const Retweet = (response) => {
  	setTweet(response)
  	setHasRetweeted(true)
}
	//here, parent function is binded to the ActionBtn with required props passed as 'this'
	// we create this so as to re-use handleTweetButtonActions in the TweetList and pass it down to tweets while 
	// being able to pass a new callback parameter and set retweets
	// note: Two callbacks are made here 1. callback for setting the likes and unlikes count
	// on the basic ActionBtn level and 2. Retweet setting retweets on the parent level on both Tweetlist and TweetDetail 
  function parentHandleTweetButtonActions(callback, event){
	handleTweetButtonActions({...this}, callback, Retweet, event)

  }
  	// runs once, value of tweet is false, tweet is eventually set, DOM re-renders and tweet is instantiated
	useEffect(() => {
		axios({method:'GET',
            url: `http://localhost:8000/api/tweets/${id}/`,
            headers: {
                "X-Requested-With":"XMLHttpRequest",
                "Content-Type": "Application/json",
                "Authorization": `Token ${token}`
            	}
            })
			.then((response) => {
				console.log(response)
				setTweet(response.data)	
			},
			(error) => {
				console.log(error)
				if(error.response.status===401){
					console.log(error.response.status)
					setIsAuthorized(false)
					console.log(isAuthorized)
					}
				}
			)
	}, [id, isAuthorized])


	if (!isAuthorized){
		console.log('1')
		return <Redirect to={{pathname:'/login', state:'You Need To Log In To Perform That Action'}} />
	}
	//if no tweet yet due to fetching, return false, when fetch is done, useEffect is re-rendered
	// if tweet exists(which it should'nt ...backend issue) check if the dict is empty,
	// if it is, return false meaning nothing
	else if (!tweet || Object.keys(tweet).length ===0) return false
  	else if (hasRetweeted){
  		console.log('2')
  		return <Redirect to={{pathname: '/'}} />
  	}
  	else{
  		console.log('2')
	  	return <div className='mt-3'><Tweet tweet={tweet} isDetail={true} handleTweetBtnActions={parentHandleTweetButtonActions} /></div>
	}
};


export default TweetDetail;
