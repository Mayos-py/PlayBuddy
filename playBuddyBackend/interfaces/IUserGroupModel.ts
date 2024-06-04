import Mongoose = require("mongoose");


interface IUserGroupModel extends Mongoose.Document {
    reqID: string;
    users: [{
        ssoId: string;
        userName: string;
    }];
}
export {IUserGroupModel};