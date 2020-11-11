const AWS = require("aws-sdk");
const utils = require("../../utils");

AWS.config.update({
  region: "us-east-1",
});

async function createParent(name, surname, birthdate, email, callback) {
  const db = new AWS.DynamoDB.DocumentClient();
  const parent = {
    id: utils.craeteId(),
    name: name,
    surname: surname,
    birthdate: birthdate,
    email: email,
    createdAt: Date.now(),
    childsId: [],
  };

  const createParentParams = {
    TableName: process.env.parentsTable,
    Item: parent,
  };

  try {
    await db.put(createParentParams).promise();
  } catch (err) {
    callback(err, null);
  }

  callback(null, parent);
}

module.exports = { createParent };
