import * as Mongoose from "mongoose";
import { IUserGroupModel } from "../interfaces/IUserGroupModel";

class UserGroupModel {
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
                reqId: String,
                users: [
                    {
                    ssoId: String,
                    userName: String
                }
            ]
            }, {collection: 'usergroup'}
        );    
    }

    public async createModel() {
        try {
            await Mongoose.connect(this.dbConnectionString, {useNewUrlParser: true, useUnifiedTopology: true});
            this.model = Mongoose.model<IUserGroupModel>("UserGroup", this.schema);
        }
        catch (e) {
            console.error(e);
        }
    }

    public async retrieveUserGroupById(response: any, value: string) {
        var query = this.model.findOne({reqId:value });
        try {
            const playerrequest = await query.exec();
            response.json(playerrequest);
        }
        catch (e) {
            console.error(e);
        }
    }

    public async deleteUserById(reqId: string, ssoId: string){
        try {
          await this.model.updateOne(
            { reqId: reqId },
            { $pull: { users: { ssoId: ssoId } } }
          ).exec();
        } catch (err) {
          throw new Error('Failed to delete user: ' + err.message);
        }
      }

      public async addUserToGroup(reqId: string, user: { ssoId: string, userName: string }){
        try {
          await this.model.updateOne(
            { reqId: reqId },
            { $push: { users: user } }
          ).exec();
        } catch (err) {
          throw new Error('Failed to add user: ' + err.message);
        }
      }

}
export {UserGroupModel};