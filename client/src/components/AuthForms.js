import React, {useState} from 'react';
import axios from 'axios';

class AuthForm extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            user : null,
            password:null
        };
        //this.bind(this.onChange,this);

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
        console.log(e.target);

    }
    render(){
        //if(this.props.type == "login")
        //{
            return(

                <form name = "loginform" action = "./login" method = "POST">
                    <input type = "text" name = "user" onChange={this.onChange} />
                    <input type = "password" name = "password" onChange={this.onChange} />
                    <input type = "button" onClick={this.handleClick} />
                </form>

            );
        //}
    }

}

export default AuthForm;