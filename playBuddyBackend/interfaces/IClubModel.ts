import Mongoose = require("mongoose");


interface IClubModel extends Mongoose.Document {
    clubName: string,
    zipCode: number,
    sportNames: [{
        sport: string
    }],
    address: string
}
export {IClubModel};
