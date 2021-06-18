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
    process.exit(1);
    
}

module.exports = { config };
