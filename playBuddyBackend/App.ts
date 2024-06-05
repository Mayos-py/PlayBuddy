import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as crypto from 'crypto';
import { HubModel } from './model/HubModel';
import { RequestModel } from './model/RequestModel';
import { ClubModel } from './model/ClubModel';
import { UserModel } from './model/UserModel';
import { UserGroupModel } from './model/UserGroupModel';
import GooglePassportObj from './GooglePassport';
import * as passport from 'passport';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';

declare global {
  namespace Express {
    interface User {
      id: string,
      displayName: string,
      email: string
    }
  }
}

class App {
  public expressApp: express.Application;
  public Hub:HubModel;
  public Requests:RequestModel;
  public Club:ClubModel;
  public User:UserModel;
  public UserGroup:UserGroupModel;
  public googlePassportObj:GooglePassportObj;
  
  constructor(mongoDBConnection:string)
  {
    this.googlePassportObj = new GooglePassportObj();
    this.expressApp = express();
    this.middleware();
    this.routes();
    this.Hub = new HubModel(mongoDBConnection)
    this.Requests = new RequestModel(mongoDBConnection);
    this.Club = new ClubModel(mongoDBConnection);
    this.User = new UserModel(mongoDBConnection);
    this.UserGroup = new UserGroupModel(mongoDBConnection);
  }

  private middleware(): void {
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(bodyParser.urlencoded({ extended: false }));
    this.expressApp.use( (req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
    this.expressApp.use(session({ secret: 'keyboard cat' }));
    this.expressApp.use(cookieParser());
    this.expressApp.use(passport.initialize());
    this.expressApp.use(passport.session());

  }

  private validateAuth(req, res, next):void {
    if (process.env.NODE_ENV === 'test') {
      req.isAuthenticated = () => true;
    }
    if (req.isAuthenticated()) { 
      console.log("user is authenticated"); 
      console.log(JSON.stringify(req.user));
      return next(); }
    console.log("user is not authenticated");
    res.redirect('/');
  }

  private routes(): void {
    let router = express.Router();
    let response ;

    router.get('/auth/google', 
    passport.authenticate('google', {scope: ['profile', 'email']}));
    console.log("api hit");

    router.get('/auth/google/callback', 
      passport.authenticate('google', 
        { failureRedirect: '/' }
      ),
      async (req, res) => {
        try {
          const found = await this.User.checkUserExists(req.user.id);
          if(!found){
            var jsonObj = {
              ssoID: req.user.id,
              username: req.user.displayName,
              email: req.user.emails[0].value
            };
            console.log("User not found, creating user with email: ",req.user.emails[0].value);
            await this.User.model.create([jsonObj]);
          }
          res.redirect('/#/popup');
        }
        catch (e) {
          console.error(e);
          console.log('object creation failed');
        }
        console.log("successfully authenticated user and returned to callback page.");
        console.log("redirecting to /#/");
        console.log("Response", res.json);
        
      }
    );

    router.get('/app/user/info', (req, res) => {
      if(req.user){
        res.json({"username" : req.user.displayName, "id" : req.user.id, "email": req.user.emails[0].value});
      }else{
        res.json({ "error": "No user information available" });
      }
    });

    // http get request for getting hub details based on sport name
    router.get('/app/hub/sport/:sportName', async (req, res) =>{
        var name = req.params.sportName
        console.log('Query single hub data with sportsName: ' + name);
        await this.Hub.retrieveHub(res, name)
    });
    //GET All Requests API endpoint
    router.get('/app/playerrequest/', this.validateAuth, async (req, res) =>{
      console.log('Query list of player requests from db');
      await this.Requests.retrieveAllRequests(res);
    });
    //GET Request with ReqId API endpoint
    router.get('/app/playerrequest/:reqId',this.validateAuth, async (req, res) =>{
      var id = req.params.reqId;
      console.log('Query single playerrequest with id: ' + id);
      await this.Requests.retrieveRequestById(res, id);
    });

    router.get('/app/usergroup/:reqId', this.validateAuth, async (req, res) =>{
      var id = req.params.reqId
      await this.UserGroup.retrieveUserGroupById(res, id)
      console.log('Query userGroup with id: ' + id);
      console.log('Query user group data');
    });

    router.delete('/app/usergroup/:reqId/user/:ssoId', this.validateAuth, async (req, res) => {
      const { reqId, ssoId } = req.params;
      console.log('Delete user with ssoId: ' + ssoId + ' from request group with reqId: ' + reqId);
      try {
        await this.UserGroup.deleteUserById(reqId, ssoId);
        res.status(200).send({ message: 'User deleted successfully' });
      } catch (e) {
        console.error(e);
        res.status(500).send({ message: 'Failed to delete user' });
      }
    });

    router.post('/app/usergroup/:reqId/user', this.validateAuth, async (req, res) => {
      const { reqId } = req.params;
      const user = req.body;
      console.log('Add user with ssoId: ' + user.ssoId + ' to request group with reqId: ' + reqId);
      try {
        await this.UserGroup.addUserToGroup(reqId, user);
        res.status(200).send({ message: 'User added successfully' });
      } catch (e) {
        console.error(e);
        res.status(500).send({ message: 'Failed to add user' });
      }
    });


    //POST Adding a Request API endpoint
    router.post('/app/playerrequest/', this.validateAuth, async (req, res) => {
      const id = crypto.randomBytes(16).toString("hex");
      console.log(req.body);
        var jsonObj = req.body;
        jsonObj.reqId = id;
        if(!jsonObj.ssoID){
          jsonObj.ssoID = req.user.id;
        }
        var userObject = {
          reqId: jsonObj.reqId,
          users: [{
              ssoId: jsonObj.ssoID,
              userName: jsonObj.userName
            }]
          }
        try {
          await this.Requests.model.create([jsonObj]);
          await this.UserGroup.model.create([userObject]);
          res.send(jsonObj);
        }
        catch (e) {
          console.error(e);
          console.log('object creation failed');
        }
    });
     // Get requests by zipcode and sportName API endpoint
  router.get('/app/playerrequest/zipcode/:zipcode/sport/:sportName', this.validateAuth, async (req, res) => {
    const { zipcode, sportName } = req.params;
    console.log(`Querying requests for zipcode: ${zipcode} and sportName: ${sportName}`);
    await this.Requests.retrieveRequestsByZipcodeAndSport(res, parseInt(zipcode), sportName);
  });
  //   Get Request to get all the club list based on zip code and sport
  router.get('/app/club/zipcode/:zipCode/sport/:sportName', async (req, res) =>{
      var zipCode = req.params.zipCode
      var sportName = req.params.sportName
      console.log('Query clubs with sportsName and zipcode: ' + sportName);
      console.log('validate', this.validateAuth);
      await this.Club.retrieveFilteredClubs(res, zipCode, sportName)
  });

  router.delete('/app/playerrequest/:reqId', this.validateAuth, async (req, res) => {
    const id = req.params.reqId;
    console.log('Delete player request with id: ' + id);
    try {
      await this.Requests.deleteRequestById(id);
      res.status(200).send({ message: 'Request deleted successfully' });
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: 'Failed to delete request' });
    }
  });

    this.expressApp.use('/', router);
    this.expressApp.use('/app/json/', express.static(__dirname+'/app/json'));
    this.expressApp.use('/images', express.static(__dirname+'/img'));
    this.expressApp.use('/', express.static(__dirname+'/dist/play-buddy-frontend/browser'));
  }
}
export {App};