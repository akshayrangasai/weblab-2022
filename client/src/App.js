import logo from './logo.svg';
import './App.css';
import React from 'react';
import AuthForm from './components/AuthForms';
import NavBar from './components/NavBar';
class App extends React.Component {
  render(){
  return (
    <div id = "App">
      <NavBar />
      <AuthForm />
    </div>
  );
  }
}

export default App;
