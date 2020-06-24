import React, { Component }  from 'react';
import { Tweet } from './Tweet'
import { getTweets } from '../../lookups';
import debounce from 'lodash.debounce';
import handleTweetButtonActions from './handleTweetButtonActions'

  
class TweetList extends Component {

    constructor(props) {
        super(props);
        this.state ={
          tweets:JSON.parse(sessionStorage.getItem('tweets')) || [],
          error: false,
          hasMore: sessionStorage.getItem('hasMore') === 'false' ? false : true,
          isLoading: false,
          page: parseInt(sessionStorage.getItem('page')) || 1,
        }

    window.onscroll = debounce(() => {
      // Bails early if:
      // * there's an error
      // * it's already loading
      // * there's nothing left to load
      // if (this.state.hasError || this.state.isLoading || this.state.hasMore===false) return;

      // Checks that the page has scrolled to the bottom
      if (
        window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.offsetHeight

      ) {
        if(this.state.hasMore){
          console.log('olokolokoloko', this.state.hasMore)
          console.log(sessionStorage.getItem('hasMore'),'hasMore sessionStoreages')
          this.setState({isLoading: true},() => getTweets(this.props.username, this.tweetLookup, this.state.page))
        }
      }   
    }, 1600);
  }

    setTweet = (response) => {
      console.log(response)
      let newTweets = [response, ...this.state.tweets]
      this.setState({isLoading:false})
      this.setState({tweets: newTweets})
      console.log(this.state.tweets)
    }

    //here, parent function is binded to the ActionBtn with required props passed as 'this'
    // we create this so as to re-use handleTweetButtonActions in the TweetList and pass it down to tweets while 
    // being able to pass a new callback parameter and set retweets
    // note: Two callbacks are made here 1. callback for setting the likes and unlikes count
    // on the basic ActionBtn level and 2. Retweet setting retweets on the parent level on both Tweetlist and TweetDetail
    parentHandleTweetButtonActions(foo, callback, setTweet, event){
      console.log(foo, setTweet, event)
       handleTweetButtonActions({...foo}, callback, setTweet, event)
    }

    tweetLookup = (resp) => {
      console.log(this.state.tweets, resp.results) 
       var initialTweets = [...this.state.tweets, ...resp.results]
       if(resp.next !== null){
        this.setState(prevState => ({
          page: prevState.page + 1,
        }))
       }else{
        this.setState(prevState => ({
          hasMore: false,          
        }))         
       }
       this.setState({tweets: initialTweets})
       sessionStorage.setItem('tweets', JSON.stringify(this.state.tweets))
       sessionStorage.setItem('page', JSON.stringify(this.state.page))
       sessionStorage.setItem('hasMore', this.state.hasMore)
    }

    componentDidMount(){
      if(this.state.hasMore && this.state.page===1){
      
      this.setState({isLoading: true},() => getTweets(this.props.username, this.tweetLookup, this.state.page))
      
      }
    }

    componentDidUpdate(prevState, prevProps) {
      if(this.props.tweet !== undefined){
        const newTweetsList = [this.props.tweet, ...this.state.tweets]
        if (newTweetsList.length > prevState.tweets.length){
              this.setState(newTweetsList)
        }
      }
    }

    render() {
      return (
        this.state.tweets.length > 0 ? 
        <React.Fragment>
        {this.state.tweets.map(tweet => {
          return <Tweet tweet={tweet} handleTweetBtnActions={this.parentHandleTweetButtonActions} setTweet={this.setTweet} action={{type: 'like'}} key={tweet.id}/>
          })}
        {this.state.isLoading === true && <div className='mb-4 mt-4'>Loading More tweets...</div>}
       </React.Fragment> 
      :
       (null)  
        ) 
    }
}

export default TweetList;


// const TweetList = ({tweet, username}) => {
//   const [tweets, setTweets] = useState([])
//   // const [error, setTweets] = useState([])
//   // const [hasMore, setTweets] = useState([])
//   // const [isLoading, setTweets] = useState([])
//   //       error: false,
//   //     hasMore: true,
//   //     isLoading: false,


//   const setTweet = (response) => {
//   	let newTweets = [response, ...tweets]
//   	setTweets(newTweets)
//   }
// 	//here, parent function is binded to the ActionBtn with required props passed as 'this'
// 	// we create this so as to re-use handleTweetButtonActions in the TweetList and pass it down to tweets while 
// 	// being able to pass a new callback parameter and set retweets
// 	// note: Two callbacks are made here 1. callback for setting the likes and unlikes count
// 	// on the basic ActionBtn level and 2. Retweet setting retweets on the parent level on both Tweetlist and TweetDetail
//   function parentHandleTweetButtonActions(callback, event){
// 	   handleTweetButtonActions({...this}, callback, setTweet, event)
//   }

//   useEffect(() => {
//   	if(tweet !== undefined){
//   		const newTweetsList = [tweet, ...tweets]
//     	if (newTweetsList.length > tweets.length){
//   			setTweets(newTweetsList)
//   	}
//     }
//   }, [tweet])

//   useEffect(() => {
//     const tweetLookup = (resp) => {	
//       console.log(resp)
//        setTweets(resp)
//   	}
//     getTweets(username, tweetLookup)

//   }, [username])
    
// 	return tweets.length > 0 ? (
// 		tweets.map(tweet => {
//     		return <Tweet tweet={tweet} handleTweetBtnActions={parentHandleTweetButtonActions} action={{type: 'like'}} key={tweet.id}/>
//     		}
//     	)):
//        (null)

// }

// export default TweetList;