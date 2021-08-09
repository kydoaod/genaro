import React from 'react';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import LinkedIn  from 'react-linkedin-login-oauth2';
import linkedin from 'react-linkedin-login-oauth2/assets/linkedin.png';
import './Login.css';
import handleLogin from '../../services/LoginService';
import { config } from '../../config/config';


function Login() {

  return (
    <div className="Authentication">
      <GoogleLogin
          clientId={config.google.clientId}
          buttonText=""
          className="ct-button ct-button--secondary"
          onSuccess={ handleLogin.googleLogin }
          onFailure={ handleLogin.googleLogin }
          cookiePolicy="single_host_origin"
      />
      <FacebookLogin
        appId={config.facebook.appId}
        autoLoad={true}
        fields="name,email,picture"
        scope="public_profile,user_friends"
        callback={handleLogin.fBLogin}
        icon="fa-facebook" 
      />
      <LinkedIn
          clientId={config.linkedIn.clientId}
          scope="r_emailaddress"
          onFailure={handleLogin.linkedInLoginFail}
          onSuccess={handleLogin.linkedInLogin}
          redirectUri={window.location.origin + "/linkedin"}
      >
          <img src={linkedin} alt="Log in with Linked In" style={{ maxWidth: '180px' }} />
      </LinkedIn>
    </div>
  );
}

export default Login;