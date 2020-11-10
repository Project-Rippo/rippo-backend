const AWS = require("aws-sdk");
const utils = require("../../utils");

AWS.config.update({
  region: "us-east-1",
});

async function createParent(name, email, callback) {
  const db = new AWS.DynamoDB.DocumentClient();
  const parent = {
    id: utils.craeteId(),
    name: name,
    email: email,
    createdAt: Date.now(),
  };

  var params = {
    TableName: process.env.parentsTable,
    Item: parent,
  };

  db.put(params, function (err, data) {
    if (err) {
      callback(err, null);
    }
  });

  callback(null, parent);
}

module.exports = { createParent };
