import Mongoose = require("mongoose");


interface IUserModel extends Mongoose.Document {
    ssoID: {type: String, required: true, unique: true},
    username: string,
    address: string
}
export {IUserModel};
