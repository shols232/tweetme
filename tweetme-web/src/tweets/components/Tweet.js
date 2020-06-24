import React, {useState, useEffect }  from 'react';
import ActionBtn  from './TweetActionButton'
import { Link } from "react-router-dom";


export const ParentTweet = ({tweet}) => {
	let className = 'tweet parentTweet'

	{
		return tweet.og_tweet ? 
		 (<div className = 'rounded border mb-4 col-12 col-md-10 mx-auto p-3 '>
		 	<small className='text-primary' >Retweet</small>
	    		<Tweet isRetweet={true} component={Link} to={`/tweet/${tweet.og_tweet.id}`} className = {className} tweet = {tweet.og_tweet} />
		</div> 
		): null
    }
}

export const Tweet = ({tweet, className, isRetweet, handleTweetBtnActions, isDetail, setTweet}) => {
    return  (
    	<div className={className ? className : 'tweet mb-4 col-12 col-md-10 mx-auto rounded border p-4'}>
    	<span className='blue-text'>{tweet.user.username}</span>
    	<p>{tweet.id}-{tweet.content}</p>
    	<ParentTweet tweet = {tweet} />
    	{isRetweet !== true ?
			(
				<div className='align-items-center' >
		    	<ActionBtn tweet={tweet} handleTweetBtnActions={handleTweetBtnActions} action={{type:'like-action', display:'Like'}}/> 
    			<ActionBtn tweet={tweet} isDetail = {isDetail ? isDetail : false} action={{type:'viewTweet', display:'View'}}/> 
		    	<ActionBtn tweet={tweet} setTweet={setTweet} handleTweetBtnActions={handleTweetBtnActions} action={{type:'retweet', display:'Retweet'}}/>
		    	</div>
    			):null
    	 }
    	</div>
    )

};