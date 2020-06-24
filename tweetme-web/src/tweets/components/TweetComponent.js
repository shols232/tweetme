import React, {useState}  from 'react';
import ActionBtn  from './TweetActionButton'
import { TweetCreateForm } from './TweetCreateForm'
import Register from '../../userAuth/components/Register'
// import { isLogin } from ''
import Login from '../../userAuth/components/Login'
import TweetList  from './TweetList'

const TweetComponent = (props) => {

	const canTweet = props.canTweet === 'false' ? false : true
	const [newTweet, setNewTweet] = useState()


	const handleDidTweet = (response) => {

		setNewTweet(response)
	}

	 return (<React.Fragment>
	    	{canTweet === true && <TweetCreateForm handleDidTweet={handleDidTweet} /> }
        		<TweetList tweet={newTweet} username={props.username}/> 
    	</React.Fragment>
		)
	}

export default TweetComponent