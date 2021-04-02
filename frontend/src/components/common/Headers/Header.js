import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Link
} from "react-router-dom";


const ZitationName = () => {
  return (
    <div class=" d-flex justify-content-center col-xl-10 pt-1 ml-auto">
      <div class="col-6"> </div>
      <div class="col-6 display-4 pl-4 ml-5" >Zitation</div>
    </div>
  )
}

const LoginButton = () => {
  return (
    <div class="d-flex col-xl-2 ml-auto pt-2 justify-content-end pl
        -2">
          <Link to="/login" >
            <button class="btn btn-md btn-lg btn-primary mr-5 mt-2" >Log In</button>
          </Link>
        </div>
  )
}

const Header = () => {
  return (
    <header class="blog-header pt-1">
      <div class="row d-flex flex-nowrap justify-content-between">
        <ZitationName />
        <LoginButton />
        {/* <div class=" d-flex justify-content-center col-xl-10 pt-1 ml-auto">
          <div class="col-6"> </div>
          <div class="col-6 display-4 pl-4 ml-5" >Zitation</div>
        </div> */}
        {/* <div class="d-flex col-xl-2 ml-auto pt-2 justify-content-end pl
        -2">
          <Link to="/login" >
            <button class="btn btn-md btn-lg btn-primary mr-5 mt-2" >Log In</button>
          </Link>
        </div> */}
      </div>
    </header>
  )
}

export default Header;
export { Header, ZitationName, LoginButton };