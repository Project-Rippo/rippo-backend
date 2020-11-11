const Child = require("./lambdas/Childs");
const Parent = require("./lambdas/Parents");

exports.ChildHanlder = async (event, context, callback) => {
  console.log("event", event);
  console.log("callback:", callback);

  switch (event.field) {
    case "createChild": {
      Child.createChild(
        event.arguments.input.name,
        event.arguments.input.surname,
        event.arguments.input.parentId,
        event.arguments.input.weight,
        event.arguments.input.height,
        event.arguments.input.birthdate,
        callback
      );
    }
  }
};

exports.ParentHanlder = async (event, context, callback) => {
  console.log("event", event);
  console.log("context", context);

  switch (event.field) {
    case "createParent": {
      Parent.createParent(
        event.arguments.input.name,
        event.arguments.input.surname,
        event.arguments.input.birthdate,
        event.arguments.input.email,
        callback
      );
    }
  }
};
