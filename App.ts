import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as crypto from 'crypto';
import { HubModel } from './model/HubModel';
import { RequestModel } from './model/RequestModel';
import { ClubModel } from './model/ClubModel';
// Creates and configures an ExpressJS web server.
class App {
  // ref to Express instance
  public expressApp: express.Application;
  public Hub:HubModel;
  public Requests:RequestModel;
  public Club:ClubModel;
  //Run configuration methods on the Express instance.
  constructor(mongoDBConnection:string)
  {
    this.expressApp = express();
    this.middleware();
    this.routes();
    this.Hub = new HubModel(mongoDBConnection)
    this.Requests = new RequestModel(mongoDBConnection);
    this.Club = new ClubModel(mongoDBConnection);
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
    //GET All Requests API endpoint
    router.get('/app/request/', async (req, res) =>{
      console.log('Query list of requests from db');
      await this.Requests.retrieveAllRequests(res);
    });

    //POST Adding a Request API endpoint
    router.post('/app/request/', async (req, res) => {
      const id = crypto.randomBytes(16).toString("hex");
      console.log(req.body);
        var jsonObj = req.body;
        jsonObj.listId = id;
        try {
          await this.Requests.model.create([jsonObj]);
          res.send('{"id":"' + id + '"}');
        }
        catch (e) {
          console.error(e);
          console.log('object creation failed');
        }
    });

  //   Get Request to get all the club list based on zip code and sport
    router.get('/app/club/:zipCode/:sportName', async (req, res) =>{
      var zipCode = req.params.zipCode
      var sportName = req.params.sportName
      console.log('Query single hub data with sportsName: ' + sportName);
      await this.Club.retrieveAllClubs(res, zipCode, sportName)
  });

    this.expressApp.use('/', router);
    this.expressApp.use('/app/json/', express.static(__dirname+'/app/json'));
    this.expressApp.use('/images', express.static(__dirname+'/img'));
    this.expressApp.use('/', express.static(__dirname+'/pages'));
  }
}
export {App};