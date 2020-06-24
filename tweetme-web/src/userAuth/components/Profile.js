import React,  {Component} from 'react';
import './profile.css'
import axios from 'axios'

class Profile extends Component {

    constructor(props) {
        super(props);
    	this.state = {
    		username:'',
    		email: '',
    		bio: '',
    	}

    }

    getOrUpdateProfile = (username, isEdit) => {
    			var token = sessionStorage.getItem('token')
		console.log(token)
    		var endpoint = isEdit ? 'shols3/edit' : 'shols3'
    		var method = isEdit ? 'POST' : 'GET'
    		var data = isEdit ? {bio: this.state.bio, username: this.state.username} : null
    		console.log(method, endpoint)
    	axios({method:method,
            url: `http://localhost:8000/api/account/profile/${endpoint}/`,
            headers: {
                "X-Requested-With":"XMLHttpRequest",
                "Content-Type": "Application/json",
                "Authorization": `Token ${token}`
            	},
            data: data 
            })
			.then((response) => {
				var data = response.data
				console.log(data)
				this.setState({
					username: data.username,
					bio: data.bio
				})
				console.log(this.state)
			},
			(error) => {
				console.log(error)
				if(error.response.status===401){
					console.log(error.response.status)
					}
				}
			)
    }


	componentDidMount() {
			this.getOrUpdateProfile('shols3', false )
    }

    onProfileUpdateFormSubmit = (event) => {
    	event.preventDefault()
		this.getOrUpdateProfile('shols3', true)

    } 

    handleInputChange = ({ target }) => {

      this.setState({[target.name]: [target.value][0]})

    } 

    render() {
	return (
    <div className="container">
       <div className="Back">
            <i className="fa fa-arrow-left" onClick={window.history.back}></i>
        </div>
        <p className="h2 text-center">Form</p>
        <form onSubmit={this.onProfileUpdateFormSubmit} action="" method="post">
            <div className="preview text-center">
                <img className="preview-img" src="http://simpleicon.com/wp-content/uploads/account.png" alt="Preview Image" width="200" height="200"/>
                <div className="browse-button">
                    <i className="fa fa-pencil-alt"></i>
                    <input onChange={this.handleInputChange} className="browse-input" type="file" name="UploadedFile" id="UploadedFile"/>
                </div>
                <span className="Error"></span>
            </div>
            <div className="form-group">
                <label>Username:</label>
                <input onChange={this.handleInputChange} className="form-control" type="text" name="username" value={this.state.username} required placeholder="Enter Your Full Name"/>
                <span className="Error"></span>
            </div>
            <div className="form-group">
                <label>Bio:</label>
                <input onChange={this.handleInputChange} className="form-control" type="text" name="bio" value={this.state.bio} placeholder="Your Bio"/>
                <span className="Error"></span>
            </div>
            <div className="form-group">
                <input className="btn btn-primary btn-block" type="submit" value="Submit"/>
            </div>
        </form>
    </div>   
    );
    }
}

export default Profile;


    