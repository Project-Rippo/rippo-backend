const Child = require("../lambdas/Childs");


exports.updateChildStatus = async (event, context, callback) => {
    const requestBody = JSON.parse(event.body)

    const {childId, status} = requestBody

    await Child.updateChildStatus(childId, status, callback);
}
