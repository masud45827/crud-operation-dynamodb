const dynamodb = require("../db/db");

//create user
exports.postController = async (ctx) => {
  let { id,name} = ctx.request.body;
  const params = {
    TableName: "users",
    Item: {
    name,
    id
    },
  };

  try {
    await dynamodb.put(params).promise();
    console.log("user added successfully");
    ctx.status = 200;
    ctx.body = { message: "user added successfully" };
  } catch (err) {
    console.error("Unable to add user", err);
    ctx.status = 500;
    ctx.body = { error: "Unable to add user" };
  }
};

//retrieve specific user

exports.getController = async (ctx) => {
    console.log("cumming")
    const { id } = ctx.params;
    const params = {
      TableName: "users",
      Key: {
        id
      },
    };
  
    try {
      const data = await dynamodb.get(params).promise();
      ctx.status = 200;
      ctx.body = data;
    } catch (err) {
      console.error("error:", err);
      ctx.status = 500;
      ctx.body = { error: "error" };
    }
  };


//update user

exports.updateController = async (ctx) => {
    const { id, name } = ctx.request.body;
    if (!id || !name) {
      ctx.status = 400;
      ctx.body = { error: "Both id and name are required for update" };
      return;
    }
  
    const params = {
      TableName: "users",
      Key: {
        id
      },
      UpdateExpression: "set #name = :name",
      ExpressionAttributeNames: {
        "#name": "name" 
      },
      ExpressionAttributeValues: {
        ":name": name
      },
      ReturnValues: "UPDATED_NEW" 
    };
  
    try {
      const data = await dynamodb.update(params).promise();
      console.log("User updated successfully");
      ctx.status = 200;
      ctx.body = { message: "User updated successfully", data };
    } catch (err) {
      console.error("Unable to update user", err);
      ctx.status = 500;
      ctx.body = { error: "Unable to update user" };
    }
  };

// delete user
  exports.deleteController = async (ctx) => {
    const { id } = ctx.params;
    if (!id) {
      ctx.status = 400;
      ctx.body = { error: "ID is required for deletion" };
      return;
    }
  
    const params = {
      TableName: "users",
      Key: {
        id
      }
    };
  
    try {
      await dynamodb.delete(params).promise();
      console.log("User deleted successfully");
      ctx.status = 200;
      ctx.body = { message: "User deleted successfully" };
    } catch (err) {
      console.error("Unable to delete user", err);
      ctx.status = 500;
      ctx.body = { error: "Unable to delete user" };
    }
  };