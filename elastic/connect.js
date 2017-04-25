const env = process.env.NODE_ENV || "development";
const config = require("./config/config.json")[env];
const elasticsearch = require('elasticsearch');

// configure
const conf = {
    "protocol"      : config['protocol'],
    "auth"          : config['auth'],
    "host"          : config['host'],
    "port"          : config['port']
}

// connect
const client = new elasticsearch.Client( {  
    hosts: [conf]
});

module.exports = client;