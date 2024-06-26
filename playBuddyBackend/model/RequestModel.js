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
exports.RequestModel = void 0;
const Mongoose = require("mongoose");
class RequestModel {
    constructor(DB_CONNECTION_STRING) {
        this.dbConnectionString = DB_CONNECTION_STRING;
        this.createSchema();
        this.createModel();
    }
    createSchema() {
        this.schema = new Mongoose.Schema({
            reqId: String,
            ssoID: String,
            userName: String,
            playerNeeded: Number,
            joined: Number,
            preferredCourt: String,
            sportName: String,
            zipCode: Number,
            date: String,
            time: String
        }, { collection: 'requests', versionKey: false });
    }
    createModel() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Mongoose.connect(this.dbConnectionString, { useNewUrlParser: true, useUnifiedTopology: true });
                this.model = Mongoose.model("Requests", this.schema);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    retrieveAllRequests(response) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = this.model.find({});
            try {
                const requests = yield query.exec();
                response.json(requests);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    retrieveRequestByUsername(response, value) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = this.model.findOne({ userName: value });
            try {
                const request = yield query.exec();
                response.json(request);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    retrieveRequestById(response, value) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = this.model.findOne({ reqId: value });
            try {
                const playerrequest = yield query.exec();
                response.json(playerrequest);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    retrieveRequestofNewlyAddedRequests(response, value) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = this.model.find({ userName: value }).sort({ date: -1 });
            try {
                const requests = yield query.exec();
                response.json(requests);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    retrieveRequestsByZipcodeAndSport(response, zipcode, sportName) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = this.model.find({ zipCode: zipcode, sportName: sportName });
            try {
                const requests = yield query.exec();
                response.json(requests);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    deleteRequestById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.model.deleteOne({ reqId: id }).exec();
            }
            catch (err) {
                throw new Error('Failed to delete request: ' + err.message);
            }
        });
    }
}
exports.RequestModel = RequestModel;
//# sourceMappingURL=RequestModel.js.map