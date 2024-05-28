import * as Mongoose from "mongoose";
import { IClubModel } from "../interfaces/IClubModel";

class ClubModel {
    public schema:any;
    public model:any;
    public dbConnectionString:string;

    public constructor(DB_CONNECTION_STRING:string) {
        this.dbConnectionString = DB_CONNECTION_STRING;
        this.createSchema();
        this.createModel();
    }

    public createSchema() {
        this.schema = new Mongoose.Schema(
            {
                clubName: String,
                zipCode: Number,
                sportNames: [{
                    sport: String
                }],
                address: String
            }, {collection: 'club'}
        );    
    }

    public async createModel() {
        try {
            await Mongoose.connect(this.dbConnectionString, {useNewUrlParser: true, useUnifiedTopology: true});
            this.model = Mongoose.model<IClubModel>("Club", this.schema);
        }
        catch (e) {
            console.error(e);
        }
    }

    public async retrieveFilteredClubs(response:any, zipcode:number, sportName: string) {
        var query = this.model.find({
            $and: [
                { zipCode: zipcode },
                { sportNames: { $elemMatch: { sport: sportName } } }
            ]
        });
        try {
            const result = await query.exec();
            response.json(result) ;
        }
        catch (e) {
            console.error(e);
        }
    }
}
export {ClubModel};