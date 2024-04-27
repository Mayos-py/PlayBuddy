import * as express from 'express';
import * as bodyParser from 'body-parser';
import {TaskModel} from './model/TaskModel';
import * as crypto from 'crypto';
import { HubModel } from './model/HubModel';
// Creates and configures an ExpressJS web server.
class App {
  // ref to Express instance
  public expressApp: express.Application;
  public Hub:HubModel
  public Tasks:TaskModel;
  //Run configuration methods on the Express instance.
  constructor(mongoDBConnection:string)
  {
    this.expressApp = express();
    this.middleware();
    this.routes();
    this.Tasks = new TaskModel(mongoDBConnection);
    this.Hub = new HubModel(mongoDBConnection)
  }
  // Configure Express middleware.
  private middleware(): void {
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(bodyParser.urlencoded({ extended: false }));
    this.expressApp.use( (req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
  }
  // Configure API endpoints.
  private routes(): void {
    let router = express.Router();
    // http get request for getting hub details based on sport name
    router.get('/app/hub/:sportName', async (req, res) =>{
        var name = req.params.sportName
        console.log('Query single hub data with sportsName: ' + name);
        await this.Hub.retrieveHub(res, name)
    });
    router.get('/app/list/:listId/count', async (req, res) =>  {
        var id = req.params.listId;
        console.log('Query single list with id: ' + id);
        await this.Tasks.retrieveTasksCount(res, {listId: id});
    });
    router.get('/app/list/:listId/tasks', async (req, res) => {
        var id = req.params.listId;
        console.log('Query single list with id: ' + id);
        await this.Tasks.retrieveTasksDetails(res, {listId: id});
    });
    this.expressApp.use('/', router);
    this.expressApp.use('/app/json/', express.static(__dirname+'/app/json'));
    this.expressApp.use('/images', express.static(__dirname+'/img'));
    this.expressApp.use('/', express.static(__dirname+'/pages'));
    
  }
}
export {App};
