const AWS = require("aws-sdk");
const utils = require("../../utils/index");

AWS.config.update({
  region: "us-east-1",
});

async function createChild(
  name,
  surname,
  parentId,
  weight,
  height,
  birthdate,
  asthmaClassification,
  callback
) {
  const db = new AWS.DynamoDB.DocumentClient();
  const timestamp = Date.now();

  const symptoms = {
    tosse: 0,
    chiado: 0,
    fluxoAr: 0,
    asthmaAttack: 0,
    createdAt: timestamp,
  };

  const child = {
    id: utils.craeteId(),
    name: name,
    surname: surname,
    parentId: parentId,
    weigh: weight,
    height: height,
    birthdate: birthdate,
    createdAt: timestamp,
    status: symptoms,
    history: [symptoms],
    asthmaClassification: asthmaClassification,
  };

  const createChildParams = {
    TableName: process.env.childsTable,
    Item: child,
  };

  try {
    await db.put(createChildParams).promise();
  } catch (err) {
    callback(err, null);
  }

  const updateParentsChilds = {
    TableName: process.env.parentsTable,
    Key: {
      id: parentId,
    },
    UpdateExpression:
      "set #childsId = list_append(if_not_exists(#childsId, :empty_list), :id)",
    ExpressionAttributeNames: {
      "#childsId": "childsId",
    },
    ExpressionAttributeValues: {
      ":id": [child.id],
      ":empty_list": [],
    },
  };

  try {
    await db.update(updateParentsChilds).promise();
  } catch (err) {
    callback(err, null);
  }

  callback(null, child);
}

async function updateChildStatus(childId, status, callback) {
  const db = new AWS.DynamoDB.DocumentClient();
  const timestamp = Date.now();

  status.createdAt = timestamp;

  var updateChildParams = {
    TableName: process.env.childsTable,
    Key: {
      id: childId,
    },
    UpdateExpression:
      "set #status = :status, #history = list_append(if_not_exists(#history, :empty_list), :status)",
    ExpressionAttributeNames: {
      "#status": "status",
      "#history": "history",
    },
    ExpressionAttributeValues: {
      ":status": [status],
      ":empty_list": [],
    },
    ConditionExpression: "attribute_exists(id)",
    ReturnValues: "ALL_NEW",
  };

  try {
    await db.update(updateChildParams).promise();
  } catch (err) {
    callback(
      {
        statusCode: 400,
        body: JSON.stringify(err),
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
      null
    );
  }
  callback(null, {
    statusCode: 200,
    body: JSON.stringify(status),
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
}

module.exports = { createChild, updateChildStatus };
