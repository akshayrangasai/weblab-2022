import React from 'react';
import {Link} from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';


function NavBar(){

        return (<div id = 'navBar'>
                <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem"
        }}
      >
              <BrowserRouter>
                <Link to="/posts">Posts</Link> | {" "}
                <Link to="/dashboard">Dashboard</Link>
        </BrowserRouter>
                </nav>

                </div>);

};

export default NavBar;