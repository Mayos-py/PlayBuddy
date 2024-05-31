import * as Mongoose from "mongoose";
import { IUserModel } from "../interfaces/IUserModel";

class UserModel {
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
                ssoID: {type: String, required: true, unique: true},
                username: String
            }, {collection: 'user'}
        );    
    }

    public async createModel() {
        try {
            await Mongoose.connect(this.dbConnectionString, {useNewUrlParser: true, useUnifiedTopology: true});
            this.model = Mongoose.model<IUserModel>("User", this.schema);
        }
        catch (e) {
            console.error(e);
        }
    }

    public async retrieveUser(ssoID: string): Promise<boolean> {
        try {
            const result = await this.model.findOne({ ssoID }).exec();
            if (result) {
                return true;
            } else {
                return false;
            }
        } catch (e) {
            console.error(e);
            return false; // Depending on your requirements, you might want to handle this differently.
        }
    }
    
}
export {UserModel};