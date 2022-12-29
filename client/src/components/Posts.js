import React, {useState} from 'react';
import axios from 'axios';
import PostCard from './PostCard';



class Posts extends React.Component {
    
    constructor(props){
        super(props);

        this.state = {

            posts : []

        }
    }
    componentDidMount(){

        axios.get('http://localhost:3000/posts').then(

        (response) => {
            console.log(response.data);
            this.setState({posts: response.data});
        } 

        );
    }
    render(){

        const posts = this.state.posts.map(element => {return (<PostCard _id = {element['_id']} postTitle = {element['postTitle']} postDescription = {element['postDescription']} upvotes = {element['upvotes']} downvotes = {element['downvotes']} />)});

        return(

            <div>
                {posts}
            </div>

        );
    }
    
}

export default Posts