/*
intent: getEpisode
need: Axios 
Input human: location name - ${location} as parameter
get to api https://rickandmortyapi.com/api/location/?name=${location}
don't forget to use .catch(err)
Tried to use different API, didn't work that well for me with the dates. 
In the end I chose to keep it simple so it will work.
*/

import axios, { AxiosError, AxiosResponse } from 'axios';

export const getLocation = async (agent: any) => {
	const locationInput: string | undefined = agent.parameters['location'];

	// Safetycheck on parameter
	if (!locationInput)
		return agent.add(["I think I'm missing a location. Could you double check?"]);

	return await location(agent);
};

async function location(agent: any): Promise<void> {
	// Get the name parameter to make us of in the CHARACTER_ENDPOINT
	const locationInput: string = agent.parameters!['location'];

	const LOCATION_ENDPOINT = `https://rickandmortyapi.com/api/location/?name=${locationInput}`;

	await axios
		.get(LOCATION_ENDPOINT)
		.then((result: AxiosResponse<any>) => {
			// Getting the data I need for the output to user
			console.log(result.data.results);
			const name: string = result.data.results[0].name;
			const type: string = result.data.results[0].type;
			const dimension: string = result.data.results[0].dimension;

			// Textresponses and the data output for the enduser
			const textResponse1: string = 'Location identified.';
			const locationFound: string = `This is what I could find about ${locationInput}:`;
			const informationFound: string = `Full location name: ${name}, type: ${type}, dimension: ${dimension}.`;
			const textResponse2: string = 'Anything else I can help you with?';

			// Return successfull response
			return agent.add([
				textResponse1,
				locationFound,
				informationFound,
				textResponse2,
			]);
		})
		.catch((err: AxiosError<any>) => {
			// In case of error or misunderstanding
			console.log(err);
			return agent.add('Input of location name incorrect. Please try again.');
		});
}
