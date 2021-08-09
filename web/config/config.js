const fs = require('fs');
const mongoose = require("mongoose");

const env = 
        fs.existsSync('./config/config.prod.json')? "prod" : 
        fs.existsSync('./config/config.development.json')? "development" :
        fs.existsSync('./config/config.uat.json')? "uat" :
        "local";
var config 
var envConfig
var connection

try {
    if (env === 'production' || env === 'prod'){
        config = require('./config.prod.json');
    } else if (env === 'development'){
        config = require('./config.development.json');
    }  else if (env === 'uat'){
        config = require('./config.uat.json');
    } 
    else {
        config = {
    "local": {
        "HOST": "0.0.0.0",
        "PROTOCOL" : "http",
        "LOG_PATH": "logs/",
        "PORT": 5000,
        "DB": {
            "mongodb_url": "mongodb://128.199.10.133:27017/Genero"
        },
        "ADMIN_CRED" : {
            "username" : "username",
            "algorithm": "algorithm",
            "password" : "password",
            "token" : "token",
            "email": "email@email.com",
            "email_password": "P@$$w0rd"
        },
        "GOOGLE_OAUTH_CRED":{
            "ClientID":"560202600909-c94rsttjg9bcbjgn8a4h9nrgcbcl1gpf.apps.googleusercontent.com",
            "ClientSecret":"kF14KRzrmZqd87Ecj1wR1acf"
        },
        "SOCKET_CONFIG": {
            "pingInterval": 10000,
            "pingTimeout": 30000,
            "cors": {
            }
        }
    }
};
    }

    envConfig = config[env];
    Object.keys(envConfig).forEach((key) => {
        process.env[key] = ((typeof envConfig[key] === 'object')? JSON.stringify(envConfig[key]) : envConfig[key]);
    }); 
    mongoose.connect(JSON.parse(process.env.DB).mongodb_url, { useUnifiedTopology: true, useNewUrlParser: true });
    connection = mongoose.connection;
    connection.once("open", function() {
        console.log("MongoDB database connection established successfully");
    });

} catch(e) {
    console.log(e);   
    console.log('Error: Could not find configuration file. Please create config.json file, base it from config.json.example');
    //process.exit(1);
    
}

module.exports = { config };
