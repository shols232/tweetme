import React from 'react';
import { Link } from 'react-router-dom'

class ActionBtn extends React.Component {

    constructor(props) {
        super(props);
		
        this.state = {

        	likes:this.props.tweet.likes,
        	isLiked: false,
        	display: 'Like',
        	displayIcon: "far fa-thumbs-up blue-text ml-3 fa-2x"
        }
        let className;
    }

    // this is call back function which will handle functionality from the
    // data passed down from TweetList.
    // this passes data needed by binding necessary data to the handleTweetBtnActions
    // passed down from TweetList
	handleEvent = (response) => {
		if (this.props.action.type==='like-action' && this.state.isLiked===false){
			this.setState(prevState => ({
				likes: prevState.likes + 1,
				isLiked: !prevState.isLiked,
				'display': "UnLike",
				'displayIcon' :"fas fa-thumbs-up blue-text ml-3 fa-2x"

			}))
			console.log(response.status,response, 'status')
		}
		else if (this.props.action.type==='like-action'  && this.state.isLiked===true){
			this.setState(prevState => ({
				likes: prevState.likes - 1,
				isLiked: !prevState.isLiked,
				'display': "Like",
				'displayIcon': "far fa-thumbs-up blue-text ml-3 fa-2x"
			}))
			console.log(response.status,response.statusText, 'status')
		}	
	}


    render() {
    	const {tweet, action} = this.props;
    	var icon = this.state.displayIcon
    	let foo ={'tweet':tweet, 'action': action}
    	// const once =() =>{}
    	return action.type === 'like-action' ? 
    			(
		        <span className='like-count'><span style={{position:'relative', top: '2px'}}>{this.state.likes}</span>
	       	       <i style={{fontSize: '23px', cursor: 'pointer'}} onClick={this.props.handleTweetBtnActions.bind(foo, this.handleEvent)} id={`tweet-${tweet.id}`} className={icon}></i></span>
		    	) : action.type === 'retweet' ?

				(
				<span >	
		      	<i style={{fontSize: '25px', position:'relative', top: '12.5px', cursor: 'pointer'}} className='fas  blue-text fa-retweet float-md-right'
		      	 onClick={(event)=> {this.props.handleTweetBtnActions(foo, this.handleEvent,this.props.setTweet, event)}}
		      	 id={`tweet-${tweet.id}`}>
		       	 </i>
		       	 </span>
		       	) :this.props.isDetail ? 
		       	(null) :
		       	(
	       		<Link className='mx-2 h6 float-md-right' to={`/tweet/${tweet.id}`} style={{display: 'inline-block', position:'relative', color: '#9667ed', top: '15px', cursor:'pointer'}} id={`tweet-${tweet.id}`}>View</Link>
	       		)

			}
		}


export default ActionBtn;


