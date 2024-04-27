import Mongoose = require("mongoose");

interface IRequestModel extends Mongoose.Document {
    userName: string;
    playerNeeded: number;
    joined: number;
    preferredCourt: string;
    date: string;
    time: string;
}
export {IRequestModel};