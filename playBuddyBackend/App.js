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
// Creates and configures an ExpressJS web server.
class App {
    //Run configuration methods on the Express instance.
    constructor(mongoDBConnection) {
        this.expressApp = express();
        this.middleware();
        this.routes();
        this.Hub = new HubModel_1.HubModel(mongoDBConnection);
        this.Requests = new RequestModel_1.RequestModel(mongoDBConnection);
        this.Club = new ClubModel_1.ClubModel(mongoDBConnection);
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
    }
    // Configure API endpoints.
    routes() {
        let router = express.Router();
        // http get request for getting hub details based on sport name
        router.get('/app/hub/:sportName', (req, res) => __awaiter(this, void 0, void 0, function* () {
            var name = req.params.sportName;
            console.log('Query single hub data with sportsName: ' + name);
            yield this.Hub.retrieveHub(res, name);
        }));
        //GET All Requests API endpoint
        router.get('/app/request/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log('Query list of requests from db');
            yield this.Requests.retrieveAllRequests(res);
        }));
        //POST Adding a Request API endpoint
        router.post('/app/request/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = crypto.randomBytes(16).toString("hex");
            console.log(req.body);
            var jsonObj = req.body;
            try {
                yield this.Requests.model.create([jsonObj]);
                res.send('Player Request Created for ' + jsonObj.userName);
            }
            catch (e) {
                console.error(e);
                console.log('object creation failed');
            }
        }));
        //   Get Request to get all the club list based on zip code and sport
        router.get('/app/club/:zipCode/:sportName', (req, res) => __awaiter(this, void 0, void 0, function* () {
            var zipCode = req.params.zipCode;
            var sportName = req.params.sportName;
            console.log('Query single hub data with sportsName: ' + sportName);
            yield this.Club.retrieveAllClubs(res, zipCode, sportName);
        }));
        this.expressApp.use('/', router);
        this.expressApp.use('/app/json/', express.static(__dirname + '/app/json'));
        this.expressApp.use('/images', express.static(__dirname + '/img'));
        this.expressApp.use('/', express.static(__dirname + '/pages'));
    }
}
exports.App = App;
//# sourceMappingURL=App.js.map