const AWS = require("aws-sdk");
const utils = require("../../utils/index");

AWS.config.update({
  region: "us-east-1",
});

function createChild(context, callback) {
  callback(null, {
    name: utils.craeteId(),
    email: "teste",
  });
}

module.exports = { createChild };
