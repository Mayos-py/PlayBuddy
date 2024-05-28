import * as Mongoose from "mongoose";
import { IHubModel } from "../interfaces/IHubModel";

class HubModel {
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
                sportName: String,
                history: String,
                rules: [
                    {
                    description: String
                    }
                ],
                gearInfo: [
                    {
                    gearDescription: String,
                    gearName: String
                }
            ]
            }, {collection: 'hub'}
        );    
    }

    public async createModel() {
        try {
            await Mongoose.connect(this.dbConnectionString, {useNewUrlParser: true, useUnifiedTopology: true});
            this.model = Mongoose.model<IHubModel>("Hub", this.schema);
        }
        catch (e) {
            console.error(e);
        }
    }

    public async retrieveHub(response:any, value:string) {
        var query = this.model.findOne({sportName: value});
        try {
            const result = await query.exec();
            response.json(result) ;
        }
        catch (e) {
            console.error(e);
        }
    }
}
export {HubModel};