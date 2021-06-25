import React from 'react';
import { GoogleLogin } from 'react-google-login';
import './Login.css';
import handleGoogleLogin from '../../services/LoginService';

function Login() {
  return (
    <GoogleLogin
        clientId={"560202600909-c94rsttjg9bcbjgn8a4h9nrgcbcl1gpf.apps.googleusercontent.com"}
        buttonText=""
        className="ct-button ct-button--secondary"
        onSuccess={handleGoogleLogin}
        onFailure={handleGoogleLogin}
        cookiePolicy="single_host_origin"
    />
  );
}

export default Login;