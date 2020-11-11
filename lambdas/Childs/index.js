const AWS = require("aws-sdk");
const utils = require("../../utils/index");

AWS.config.update({
  region: "us-east-1",
});

async function createChild(name, surname, parentId, weight, height, birthdate, callback) {
  const db = new AWS.DynamoDB.DocumentClient();
  const child = {
    id: utils.craeteId(),
    name: name,
    surname: surname,
    parentId: parentId,
    weigh: weight,
    height: height,
    birthdate: birthdate,
    createdAt: Date.now(),
    symptoms: []
  };

  console.log("child: ", child)
  console.log("callback: ", callback)

  
  const params = {
    TableName: process.env.childsTable,
    Item: child,
  };

  db.put(params, function (err, data, callback) {
    if (err) {
      callback(err, null);
    }
  }, callback);

  callback(null, child);
}

module.exports = { createChild };
