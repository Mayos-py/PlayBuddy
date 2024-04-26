import Mongoose = require("mongoose");

interface IRequestModel extends Mongoose.Document {
    userName: string;
    playerNeeded: string;
    joined: string;
    preferredCourt: string;
    date: string;
    time: string;
}
export {IRequestModel};