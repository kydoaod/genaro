import React from 'react';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import LinkedIn  from 'react-linkedin-login-oauth2';
import linkedin from 'react-linkedin-login-oauth2/assets/linkedin.png'

import './Login.css';
import handleLogin from '../../services/LoginService';

function Login() {
  const responseFacebook = (response) => {
    console.log(response);
  }
  return (
    <div className="Authentication">
      <GoogleLogin
          clientId={"560202600909-c94rsttjg9bcbjgn8a4h9nrgcbcl1gpf.apps.googleusercontent.com"}
          buttonText=""
          className="ct-button ct-button--secondary"
          onSuccess={ handleLogin.googleLogin }
          onFailure={ handleLogin.googleLogin }
          cookiePolicy="single_host_origin"
      />
      <FacebookLogin
        appId="968042637284782"
        autoLoad={true}
        fields="name,email,picture"
        scope="public_profile,user_friends"
        callback={handleLogin.fBLogin}
        icon="fa-facebook" 
      />
      <LinkedIn
          clientId="865p81rgrlnw9r"
          scope="r_emailaddress"
          onFailure={handleLogin.linkedInLoginFail}
          onSuccess={responseFacebook}
          redirectUri={window.location.origin + "/linkedin"}
      >
          <img src={linkedin} alt="Log in with Linked In" style={{ maxWidth: '180px' }} />
      </LinkedIn>
    </div>
  );
}

export default Login;