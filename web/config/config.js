const fs = require('fs');

const env = 
        fs.existsSync('./config/config.prod.json')? "prod" : 
        fs.existsSync('./config/config.development.json')? "development" :
        fs.existsSync('./config/config.uat.json')? "uat" :
        "local";
var config 
var envConfig
var bearerStrategy

try {
    if (env === 'production' || env === 'prod'){
        config = require('./config.prod.json');
    } else if (env === 'development'){
        config = require('./config.development.json');
    }  else if (env === 'uat'){
        config = require('./config.uat.json');
    } 
    else {
        config = require('./config.json');
    }

    envConfig = config[env];
    Object.keys(envConfig).forEach((key) => {
         process.env[key] = ((typeof envConfig[key] === 'object')? JSON.stringify(envConfig[key]) : envConfig[key]);
    }); 

} catch(e) {
    console.log(e);   
    console.log('Error: Could not find configuration file. Please create config.json file, base it from config.json.example');
    /**TEMPORARY**/
    process.env["HOST"] = "localhost";
    process.env["PORT"] = 5000;
    process.env["DB"] = JSON.stringify({
        "user": "1XHs3O5D26",
        "host": "remotemysql.com",
        "database": "1XHs3O5D26",
        "password": "iImheZ6v1F",
        "port": 3306,
        "dialect": "mysql"
    });
    process.env["ADMIN_CRED"] = JSON.stringify({
        "username" : "username",
        "algorithm": "algorithm",
        "password" : "password",
        "token" : "token",
        "email": "email@email.com",
        "email_password": "P@$$w0rd"
    });
    process.env["GOOGLE_OAUTH_CRED"] = JSON.stringify({
        "ClientID":"560202600909-c94rsttjg9bcbjgn8a4h9nrgcbcl1gpf.apps.googleusercontent.com",
        "ClientSecret":"kF14KRzrmZqd87Ecj1wR1acf"
    });
    //process.exit(1);
    
}

module.exports = { config };
