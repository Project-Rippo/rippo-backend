const ChildHanlder = require("./lambdas/Childs");
const ParentHanlder = require("./lambdas/Parents");

exports.graphqlHandler = async (event, context, callback) => {
  console.log("event", event);
  console.log("context", context);

  switch (event.field) {
    case "createChild": {
      ChildHanlder.createChild(context, callback);
    }
    case "createParent": {
      ParentHanlder.createParent(
        event.arguments.input.name,
        event.arguments.input.email,
        callback
      );
    }
  }
};
