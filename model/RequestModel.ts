import * as Mongoose from "mongoose";
import { IRequestModel } from '../interfaces/IRequestModel';
 
class RequestModel {
    public schema: any;
    public model: any;
    public dbConnectionString: string;
 
    public constructor(DB_CONNECTION_STRING: string) {
        this.dbConnectionString = DB_CONNECTION_STRING;
        this.createSchema();
        this.createModel();
    }
 
    public createSchema() {
        this.schema = new Mongoose.Schema(
            {
                userName: String,
                playerNeeded: String,
                joined :Number,
                preferedcourt:Number,
                date:String,
                time:String
               
            }, { collection: 'player_requests' }
        );
    }
 
    public async createModel() {
        try {
            await Mongoose.connect(this.dbConnectionString, { useNewUrlParser: true, useUnifiedTopology: true });
            this.model = Mongoose.model<IRequestModel>("Requests", this.schema);
        }
        catch (e) {
            console.error(e);
        }
    }
 
    public async retrieveAllRequests(response: any) {
        var query = this.model.find({});
        try {
            const requests = await query.exec();
            response.json(requests);
        }
        catch (e) {
            console.error(e);
        }
    }
 
    public async retrieveRequestByUsername(response: any, userName: string) {
        var query = this.model.findOne({ _id: userName });
        try {
            const request = await query.exec();
            response.json(request);
        }
        catch (e) {
            console.error(e);
        }
    }
 
    public async retrieveRequestsCount(response: any) {
        console.log("Retrieving request count...");
        var query = this.model.estimatedDocumentCount();
        try {
            const count = await query.exec();
            console.log("Number of requests: " + count);
            response.json(count);
        }
        catch (e) {
            console.error(e);
        }
    }
}
 
export { RequestModel };
 