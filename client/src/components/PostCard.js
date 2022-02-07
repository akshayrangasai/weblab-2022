import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {Button} from 'react-bootstrap';

class PostCard extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            votes : this.props.upvotes - this.props.downvotes,
        }
        this.handleUpvote = this.handleUpvote.bind(this);
        this.handleDownvote = this.handleDownvote.bind(this);
        axios.defaults.withCredentials = true;
    }

    handleUpvote(e)
    {
        e.preventDefault();
        const url = 'http://localhost:3000/posts/upvote/'+this.props._id;
        console.log(url);
        axios.get(url).then((resp,err) =>{

            if(!err)
            this.setState({
                votes : this.state.votes +1
            })

        });
    }

    handleDownvote(e)
    {
        e.preventDefault();
        const url = 'http://localhost:3000/posts/downvote/'+this.props._id;
        console.log(url);
        axios.get(url).then((resp,err) =>{

            if(!err)
            this.setState({
                votes : this.state.votes -1
            })

        });
    }

    render(){
    const postPath = '/post/' + this.props._id;
    console.log(postPath);
    return(
        <div class = 'PostCard'>
           
            <span className='PostTitle'>
                {this.props.postTitle}
            </span>
           
            <div class = 'PostDescription'>
                {this.props.postDescription}
            </div>
            <Button size="sm" variant="link" onClick={this.handleUpvote}>Upvote</Button><span className='votes'>{this.state.votes}</span><Button variant="link" size="sm" onClick={this.handleDownvote}>Downvote</Button>
        </div>
    );
}

}

export default PostCard