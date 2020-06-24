import React from 'react';
import axios from 'axios'
export function getTweets(username, callback){
    var token = sessionStorage.getItem('token')
	var endpoint = 'api/tweets/'
	if(username){

		endpoint = `api/tweets/?username=${username}`
	}


    axios({
            method:'GET',
            url: `http://localhost:8000/${endpoint}`,
            headers: {
                "X-Requested-With":"XMLHttpRequest",
                "Content-Type": "Application/json",
                "Authorization": `Token ${token}`
            }
        })
        .then((response) => {

    	    callback(response.data)

        },
        (error) => {
                console.log(error)
            })
    }


