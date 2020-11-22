"use strict";
/*
intent: getCharacter
need: Axios
Input human: character name - ${character} as parameter
get to api https://rickandmortyapi.com/api/episode/${character}
don't forget to use .catch(err)
Tried to use different API, didn't work that well for me with the dates.
In the end I chose to keep it simple so it will work.
*/
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
exports.getCharacter = void 0;
const axios_1 = __importDefault(require("axios"));
exports.getCharacter = (agent) => __awaiter(void 0, void 0, void 0, function* () {
    const name = agent.parameters['name'];
    // Safetycheck on parameter
    if (!name)
        return agent.add(["I think I'm missing a name. Could you double check?"]);
    return yield character(agent);
});
function character(agent) {
    return __awaiter(this, void 0, void 0, function* () {
        // Get the name parameter to make us of in the CHARACTER_ENDPOINT
        const name = agent.parameters['name'];
        const CHARACTER_ENDPOINT = `https://rickandmortyapi.com/api/character/?name=${name}`;
        yield axios_1.default
            .get(CHARACTER_ENDPOINT)
            .then((result) => {
            // Getting the data I need for the output to user
            const image = result.data.results[2].image;
            const status = result.data.results[0].status;
            const species = result.data.results[0].species;
            const gender = result.data.results[0].gender;
            const origin = result.data.results[0].origin.name;
            const location = result.data.results[1].location.name;
            // Textresponses and the data output for the enduser
            const textResponse1 = 'Target identified.';
            const nameFound = `This is what I could find about ${name}:`;
            const imageFound = `${image}`;
            const informationFound = `Status: ${status} - Species: ${species} - Gender: ${gender} - Origin: ${origin} - Current location: ${location}`;
            const textResponse2 = 'Anything else I can help you with?';
            // Return successfull response
            return agent.add([
                textResponse1,
                nameFound,
                imageFound,
                informationFound,
                textResponse2,
            ]);
        })
            .catch((err) => {
            // In case of error or misunderstanding
            console.log(err);
            return agent.add('Input of character name incorrect. Please try again.');
        });
    });
}
