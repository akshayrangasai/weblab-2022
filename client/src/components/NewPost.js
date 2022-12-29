import React, {useState} from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

class NewPost extends React.Component{

    constructor(props)
    {
        super(props);
        this.state = {

            postDescription: null,
            postTitle: null,
            playlistURL: null
        };
        this.handleClick = this.handleClick.bind(this);
        this.onChange = this.onChange.bind(this);
        axios.defaults.withCredentials = true;
    }

    handleClick(e)
    {
        //axios.post
        e.preventDefault();
        console.log(this.state);
        axios.post('http://localhost:3000/posts/new/add',this.state).then(message => console.log(message));
        //console.log(e.target);
    }

    onChange(e)
    {
        
        console.log(this.state);
        this.setState({
            [e.target.name] : e.target.value,
        });

    }
    render(){
        return(
            <Form>
                            <Form.Group controlID = 'basicLogin' className = 'mb-3'>
                                <Form.Label>Post Title</Form.Label>
                                <Form.Control type="text" name = 'postTitle' placeholder="Enter Post Title" onChange={this.onChange} />
                                <Form.Label>Post Description</Form.Label>
                                <Form.Control type="text" name = 'postDescription' placeholder="Enter Post Description" onChange={this.onChange} />
                                <Form.Label>Playlist Link</Form.Label>
                                <Form.Control type="text" name = 'playlistURL' placeholder="Enter Playlist URL" onChange={this.onChange} />
                                <br />
                                <Button onClick={this.handleClick}> Submit </Button>
                            </Form.Group>
                    
            </Form>
        )
    }
}

export default NewPost

    /*
    user: 'akshay',
    postTitle: 'This is test data',
    postDescription: 'Sucks to be working with mongodb man',
    upvotes: 10,
    downvotes: 10,
    playlistURL: 'lol',
    playlistName: 'lol',
    playlistID: 'lol',
    whichApp: 'spotify',
    playlistItems: ['lol'],
    playlistItrmIDs: ['lol'],
    timestamp: new Date()
*/