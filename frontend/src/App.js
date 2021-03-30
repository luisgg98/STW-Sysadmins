import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


import elemento1 from "./components/elemento1.component"

class App extends Component {
  render() {
    return (
      <Router>
        <header class="blog-header pt-1">
          <div class="row d-flex flex-nowrap justify-content-between">
            <div class=" d-flex justify-content-center col-xl-10 pt-1 ml-auto">
              <div class="col-6"> </div>
              <a class="col-5 display-4" href="#">Zitation</a>
            </div>
            <div class=" d-flex col-xl-2 ml-auto pt-2 justify-content-end pr-2">
              <div class="col-4"></div>
              <button class="col-6 mr-auto btn btn-lg btn-primary">Log In</button>
            </div>
          </div>
        </header>


      </Router >
    );
  }
}


export default App;