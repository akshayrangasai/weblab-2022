import logo from './logo.svg';
//import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import React from 'react';
import AuthForm from './components/AuthForms';
import SignUpForm from './components/SignUp';
import NewPost from './components/NewPost';
import Posts from './components/Posts';
import NavBar from './components/NavBar';
import {Outlet} from "react-router-dom";
import './App.css'


class App extends React.Component {
  render(){
  return (
    <div id = "App">
    <link rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
  integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
  crossOrigin="anonymous"
/>
     <Routes>
        <Route path='login' element = {<AuthForm />} />
        <Route path='signup' element = {<SignUpForm />} />
        <Route path='posts' element = {<Posts />} />
        <Route path = 'newpost' element = {<NewPost />} />
      </Routes>
      
    </div>
  );
  }
}

export default App;
