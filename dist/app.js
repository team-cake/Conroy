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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dialogflow_fulfillment_1 = require("dialogflow-fulfillment");
// intent method imports
const fallback_1 = require("./intents/fallback");
const welcome_1 = require("./intents/welcome");
const getCharacter_1 = require("./intents/getCharacter");
// import { getEpisode } from './intents/getEpisode'
// import { getLocation } from './intents/getLocation';
const app = express_1.default();
const PORT = 8080;
app.use(cors_1.default({ origin: '*' }), express_1.default.json());
// Map of intent-name to their respective method
const intents = new Map();
// Set specific intent-name to it's respective method
intents.set('Default Fallback Intent', fallback_1.fallback);
intents.set('Default Welcome Intent', welcome_1.welcome);
intents.set('Character', getCharacter_1.getCharacter);
// intents.set('Episode', getEpisode);
// intents.set('Location', getLocation);
app.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const agent = new dialogflow_fulfillment_1.WebhookClient({ request: req, response: res });
    yield agent.handleRequest(intents);
}));
app.listen(PORT, () => console.log(`Server started on port: ${PORT}!`));
