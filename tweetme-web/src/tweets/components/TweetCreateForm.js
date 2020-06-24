import React, {useState, useEffect }  from 'react';


export const TweetCreateForm = (props) => {
	const { handleDidTweet } = props;
	const [tweetContent, setTweetContent] = useState()
    var token = sessionStorage.getItem('token')
	const textAreaRef = React.createRef()

	let temporaryNewTweet;
	const onTweetFormSubmit = (event) => {
		event.preventDefault()
		temporaryNewTweet = textAreaRef.current.value
		setTweetContent(temporaryNewTweet)
		textAreaRef.current.value = ''

	}
	useEffect(() => {
		if(tweetContent !== undefined){
			let tweet_data = JSON.stringify({content:tweetContent})
	        let fetchData = {
	            method: 'POST',
	            body: tweet_data,
	            headers: {
	            	"X-Requested-With":"XMLHttpRequest",
	                "Content-Type": "Application/json",
                	"Authorization": `Token ${token}`
				}
    		}

			fetch('http://127.0.0.1:8000/api/tweets/create/', fetchData)
			.then(resp => resp.json())
			.then(response => {
				handleDidTweet(response)
			})
		}
		

	},[tweetContent])
	 return (<div className="col-md-8 mx-auto col-10">
	            <form onSubmit={onTweetFormSubmit} className="form" method="POST" id="create-tweet-form" action="/tweets/create/">
	                <input type="hidden" value="/" name="next" />
	                <textarea ref={textAreaRef} required={true} name="content" required='required' className="form-control mb-3 rounded" placeholder="Your Tweet..."></textarea>
	                <button  className="btn btn-primary mb-2">Tweet</button>
	            </form>
		        </div>
			)
		}