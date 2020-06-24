import React, { useState } from 'react';
import axios from 'axios';
export function getTweets(username, callback,page){
 
    var token = sessionStorage.getItem('token')
    var endpoint = `api/tweets/?page=${page}`
    console.log(username)
    if(username){
        endpoint = `api/tweets/?username=${username}&page=${page}`
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
        console.log(response)
        callback(response.data)

    },
    (error) => {
            console.log(error)
    })
  }


