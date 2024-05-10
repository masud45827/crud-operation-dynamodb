const AWS = require('aws-sdk');
const dotenv = require('dotenv');
dotenv.config();
AWS.config.update({
    region: process.env.REGION, 
    endpoint: process.env.HTTP
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports = dynamodb;