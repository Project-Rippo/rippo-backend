const Child = require("./lambdas/Childs");
const Parent = require("./lambdas/Parents");

exports.ChildHanlder = async (event, context, callback) => {
  switch (event.field) {
    case "createChild": {
      await Child.createChild(
        event.arguments.input.name,
        event.arguments.input.surname,
        event.arguments.input.parentId,
        event.arguments.input.weight,
        event.arguments.input.height,
        event.arguments.input.birthdate,
        callback
      );

      break;
    }

    case "updateChildStatus": {
      await Child.updateChildStatus(event.arguments.input.childId, event.arguments.input.status, callback);
    }
  }
};

exports.ParentHanlder = async (event, context, callback) => {
  switch (event.field) {
    case "createParent": {
      await Parent.createParent(
        event.arguments.input.name,
        event.arguments.input.surname,
        event.arguments.input.birthdate,
        event.arguments.input.email,
        callback
      );
    }
  }
};
