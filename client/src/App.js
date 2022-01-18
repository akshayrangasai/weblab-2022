import logo from './logo.svg';
//import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import AuthForm from './components/AuthForms';
import NavBar from './components/NavBar';
class App extends React.Component {
  render(){
  return (
    <div id = "App">
    <link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
  integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
  crossorigin="anonymous"
/>
      <NavBar />
      <AuthForm />
    </div>
  );
  }
}

export default App;
