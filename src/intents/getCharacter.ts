/*
intent: getCharacter
need: Axios 
Input human: character name - ${character} as parameter
get to api https://rickandmortyapi.com/api/episode/${character}
don't forget to use .catch(err)
Tried to use different API, didn't work that well for me with the dates. 
In the end I chose to keep it simple so it will work.
*/

import axios, { AxiosError, AxiosResponse } from 'axios';

export const getCharacter = async (agent: any) => {
	const name: string | undefined = agent.parameters['sys.person'];

	// Safetycheck on parameter
	if (!name)
		return agent.add(["I think I'm missing a name. Could you double check?"]);

	return await character(agent);
};

async function character(agent: any): Promise<void> {
	// Get the name parameter to make us of in the CHARACTER_ENDPOINT
	const name: string = agent.parameters!['sys.person'];

	const CHARACTER_ENDPOINT = `https://rickandmortyapi.com/api/character/?name=${name}`;

	await axios
		.get(CHARACTER_ENDPOINT)
		.then((result: AxiosResponse<any>) => {
			// Getting the data I need for the output to user
			const image: string = result.data.results[2].image;
			const status: string = result.data.results[0].status;
			const species: string = result.data.results[0].species;
			const gender: string = result.data.results[0].gender;
			const origin: string = result.data.results[0].origin.name;
			const location: string = result.data.results[1].location.name;

			// Textresponses and the data output for the enduser
			const textResponse1: string = 'Target identified.';
			const nameFound: string = `This is what I could find about ${name}:`;
			const imageFound: string = `${image}`;
			const informationFound: string = `Status: ${status} - Species: ${species} - Gender: ${gender} - Origin: ${origin} - Current location: ${location}`;
			const textResponse2: string = 'Anything else I can help you with?';

			// Return successfull response
			return agent.add([
				textResponse1,
				nameFound,
				imageFound,
				informationFound,
				textResponse2,
			]);
		})
		.catch((err: AxiosError<any>) => {
			// In case of error or misunderstanding
			console.log(err);
			return agent.add('Input of character name incorrect. Please try again.');
		});
}
