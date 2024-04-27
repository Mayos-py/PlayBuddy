import Mongoose = require("mongoose");

interface IRequestModel extends Mongoose.Document {
    userName: string;
    playerNeeded: number;
    joined: number;
    preferredCourt: string;
    sportName: string;
    zipCode: number;
    date: string;
    time: string;
}
export {IRequestModel};