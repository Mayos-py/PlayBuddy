"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const HubModel_1 = require("./model/HubModel");
const RequestModel_1 = require("./model/RequestModel");
const ClubModel_1 = require("./model/ClubModel");
const UserModel_1 = require("./model/UserModel");
const GooglePassport_1 = require("./GooglePassport");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
// Creates and configures an ExpressJS web server.
class App {
    //Run configuration methods on the Express instance.
    constructor(mongoDBConnection) {
        this.googlePassportObj = new GooglePassport_1.default();
        this.expressApp = express();
        this.middleware();
        this.routes();
        this.Hub = new HubModel_1.HubModel(mongoDBConnection);
        this.Requests = new RequestModel_1.RequestModel(mongoDBConnection);
        this.Club = new ClubModel_1.ClubModel(mongoDBConnection);
        this.User = new UserModel_1.UserModel(mongoDBConnection);
    }
    // Configure Express middleware.
    middleware() {
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
        this.expressApp.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        this.expressApp.use(session({ secret: 'keyboard cat' }));
        this.expressApp.use(cookieParser());
        this.expressApp.use(passport.initialize());
        this.expressApp.use(passport.session());
    }
    validateAuth(req, res, next) {
        if (req.isAuthenticated()) {
            console.log("user is authenticated");
            console.log(JSON.stringify(req.user));
            return next();
        }
        console.log("user is not authenticated");
        res.redirect('/');
    }
    // Configure API endpoints.
    routes() {
        let router = express.Router();
        let response;
        router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
        console.log("api hit");
        router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const found = yield this.User.checkUserExists(req.user.id);
                if (!found) {
                    var jsonObj = {
                        ssoID: req.user.id,
                        username: req.user.displayName,
                        email: req.user.emails[0].value
                    };
                    console.log("User not found, creating user with email: ", req.user.emails[0].value);
                    yield this.User.model.create([jsonObj]);
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
        }));
        router.get('/app/user/info', (req, res) => {
            if (req.user) {
                res.json({ "username": req.user.displayName, "id": req.user.id, "email": req.user.emails[0].value });
            }
            else {
                res.json({ "error": "No user information available" });
            }
        });
        // http get request for getting hub details based on sport name
        router.get('/app/hub/sport/:sportName', (req, res) => __awaiter(this, void 0, void 0, function* () {
            var name = req.params.sportName;
            console.log('Query single hub data with sportsName: ' + name);
            yield this.Hub.retrieveHub(res, name);
        }));
        //GET All Requests API endpoint
        router.get('/app/playerrequest/', this.validateAuth, (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log('Query list of player requests from db');
            yield this.Requests.retrieveAllRequests(res);
        }));
        //GET Request with ReqId API endpoint
        router.get('/app/playerrequest/:reqId', this.validateAuth, (req, res) => __awaiter(this, void 0, void 0, function* () {
            var id = req.params.reqId;
            console.log('Query single playerrequest with id: ' + id);
            yield this.Requests.retrieveRequestById(res, id);
        }));
        //POST Adding a Request API endpoint
        router.post('/app/playerrequest/', this.validateAuth, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = crypto.randomBytes(16).toString("hex");
            console.log(req.body);
            var jsonObj = req.body;
            jsonObj.reqId = id;
            jsonObj.ssoID = req.user.id;
            try {
                yield this.Requests.model.create([jsonObj]);
                //res.send('Player Request Created for ' +jsonObj.userName);
                res.send(jsonObj);
            }
            catch (e) {
                console.error(e);
                console.log('object creation failed');
            }
        }));
        // Get requests by zipcode and sportName API endpoint
        router.get('/app/playerrequest/zipcode/:zipcode/sport/:sportName', this.validateAuth, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { zipcode, sportName } = req.params;
            console.log(`Querying requests for zipcode: ${zipcode} and sportName: ${sportName}`);
            yield this.Requests.retrieveRequestsByZipcodeAndSport(res, parseInt(zipcode), sportName);
        }));
        //   Get Request to get all the club list based on zip code and sport
        router.get('/app/club/zipcode/:zipCode/sport/:sportName', (req, res) => __awaiter(this, void 0, void 0, function* () {
            var zipCode = req.params.zipCode;
            var sportName = req.params.sportName;
            console.log('Query clubs with sportsName and zipcode: ' + sportName);
            console.log('validate', this.validateAuth);
            yield this.Club.retrieveFilteredClubs(res, zipCode, sportName);
        }));
        this.expressApp.use('/', router);
        this.expressApp.use('/app/json/', express.static(__dirname + '/app/json'));
        this.expressApp.use('/images', express.static(__dirname + '/img'));
        this.expressApp.use('/', express.static(__dirname + '/dist/play-buddy-frontend/browser'));
    }
}
exports.App = App;
//# sourceMappingURL=App.js.map