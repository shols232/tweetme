import React, {useState, useEffect }  from 'react';
import { Tweet } from './Tweet'
import { getTweets } from '../../lookups'
import handleTweetButtonActions from './handleTweetButtonActions'

const TweetList = ({tweet, username}) => {
	const [tweets, setTweets] = useState([])

  const setTweet = (response) => {
  	let newTweets = [response, ...tweets]
  	setTweets(newTweets)
  }
	//here, parent function is binded to the ActionBtn with required props passed as 'this'
	// we create this so as to re-use handleTweetButtonActions in the TweetList and pass it down to tweets while 
	// being able to pass a new callback parameter and set retweets
	// note: Two callbacks are made here 1. callback for setting the likes and unlikes count
	// on the basic ActionBtn level and 2. Retweet setting retweets on the parent level on both Tweetlist and TweetDetail
  function parentHandleTweetButtonActions(callback, event){
	handleTweetButtonActions({...this}, callback, setTweet, event)

  }

    useEffect(() => {
    	if(tweet !== undefined){
    		const newTweetsList = [tweet, ...tweets]
	    	if (newTweetsList.length > tweets.length){
    			setTweets(newTweetsList)
    	}
	}

    }, [tweet])

    useEffect(() => {

	    const tweetLookup = (resp) => {	
	       setTweets(resp)
    	}
	    getTweets(username, tweetLookup)

    }, [username])
    
	return (
		tweets.map(tweet => {
    		return <Tweet tweet={tweet} handleTweetBtnActions={parentHandleTweetButtonActions} action={{type: 'like'}} key={tweet.id}/>
    		}
    	)
	)

}

export default TweetList;