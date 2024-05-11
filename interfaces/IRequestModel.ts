import Mongoose = require("mongoose");

interface IRequestModel extends Mongoose.Document {
    id: number;
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