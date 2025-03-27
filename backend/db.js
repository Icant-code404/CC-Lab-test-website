const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

AWS.config.update(require('../config/aws-config'));

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "Users";

// Fetch all users
async function getUsers() {
    const params = { TableName: TABLE_NAME };
    const data = await dynamoDB.scan(params).promise();
    return data.Items;
}

// Add a new user
async function createUser(username) {
    const params = {
        TableName: TABLE_NAME,
        Item: { UserID: uuidv4(), Username: username }
    };
    await dynamoDB.put(params).promise();
}

// Delete a user
async function deleteUser(userID) {
    const params = {
        TableName: TABLE_NAME,
        Key: { UserID: userID }
    };
    await dynamoDB.delete(params).promise();
}

module.exports = { getUsers, createUser, deleteUser };
