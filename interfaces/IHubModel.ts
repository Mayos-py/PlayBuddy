import Mongoose = require("mongoose");


interface IHubModel extends Mongoose.Document {
    sportName: string;
    history: string;
    rules: [{
        description: string;
    }];
    gearInfo: [ {
        gearDescription: string;
        gearName: string
    }];
}
export {IHubModel};