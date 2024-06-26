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
exports.HubModel = void 0;
const Mongoose = require("mongoose");
class HubModel {
    constructor(DB_CONNECTION_STRING) {
        this.dbConnectionString = DB_CONNECTION_STRING;
        this.createSchema();
        this.createModel();
    }
    createSchema() {
        this.schema = new Mongoose.Schema({
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
        }, { collection: 'hub' });
    }
    createModel() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Mongoose.connect(this.dbConnectionString, { useNewUrlParser: true, useUnifiedTopology: true });
                this.model = Mongoose.model("Hub", this.schema);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    retrieveHub(response, value) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = this.model.findOne({ sportName: value });
            try {
                const result = yield query.exec();
                response.json(result);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
}
exports.HubModel = HubModel;
//# sourceMappingURL=HubModel.js.map