import React, {useState} from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

class AuthForm extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            user : null,
            password:null
        };
        //bind(this.onChange,this);
        this.handleClick = this.handleClick.bind(this);
        axios.defaults.withCredentials = true;

    }


    onChange = e =>
    {
        console.log(e.target.value)
        this.setState( { [e.target.name] : e.target.value});
        //console.log(e.target.value);
    }

    handleClick(e)
    {
        e.preventDefault();
        console.log(this.state);
        axios.post('http://localhost:3000/login',{user:this.state.user, password:this.state.password}).then(message => console.log(message));
        console.log(e.target);

    }
    render(){
        //if(this.props.type == "login")
        //{
            return(
                <Container fluid>
                    <row>
                        <Form>
                            <Form.Group controlID = 'basicLogin' className = 'mb-3'>
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>
                
                    <input type = "text" name = "user" onChange={this.onChange} />
                    <input type = "password" name = "password" onChange={this.onChange} />
                    <Button onClick={this.handleClick}> Submit </Button>
                        </Form>
                    </row>
                </Container>

            );
        //}
    }

}

export default AuthForm;