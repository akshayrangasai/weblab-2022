import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {render} from "react-dom";
import {BrowserRouter,Routes,Route} from "react-router-dom";

const rootElement = document.getElementById("root");

render(

<BrowserRouter>
<div id = 'navBar'>
                <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem"
        }}
      >
                <Link to="/posts">Posts</Link> | {" "}
                <Link to="/dashboard">Dashboard</Link> | {" "}
                <Link to = "/login">Login</Link>
       
                </nav>

                </div>
  <Routes>

    <Route path="*" element={<App />} />

  </Routes>

</BrowserRouter>,

rootElement
);

/*
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
*/
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
