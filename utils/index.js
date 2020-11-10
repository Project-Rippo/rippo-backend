const { v4: uuidv4 } = require("uuid");

function craeteId() {
  return uuidv4();
}

module.exports = { craeteId };
