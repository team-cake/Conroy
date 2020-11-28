/*
intent: getEpisode
need: Axios 
Input human: episode name - ${episodeName} as parameter
get to api https://rickandmortyapi.com/api/episode/?name=${episodeName}
don't forget to use .catch(err)
*/

import axios, { AxiosError, AxiosResponse } from 'axios';

export const getEpisode = async (agent: any) => {
	const episodeName: string | undefined = agent.parameters['episodeName'];

	// Safetycheck on parameter
	if (!episodeName)
		return agent.add([
			"I think I'm missing an episode name. Could you double check?",
		]);

	return await episode(agent);
};

async function episode(agent: any): Promise<void> {
	// Get the name parameter to make us of in the EPISODE_ENDPOINT
	const episodeName: string = agent.parameters!['episodeName'];
	console.log('name', episodeName);

	const EPISODE_ENDPOINT = `https://rickandmortyapi.com/api/episode/?name=${episodeName}`;

	await axios
		.get(EPISODE_ENDPOINT)
		.then((result: AxiosResponse<any>) => {
			// Getting the data I need for the output to user
			console.log('result', result);
			const air_date: string = result.data.results.air_date;
			const episode: string = result.data.results.episode;
			const characters: string[] = result.data.results.characters;

			// Textresponses and the data output for the enduser
			const textResponse1: string = 'Target identified.';
			const nameFound: string = `This is what I could find about episode ${episodeName}:`;
			const informationFound: string = `Air date: ${air_date} - Episode #: ${episode} - Characters: ${characters}`;
			const textResponse2: string = 'Anything else I can help you with?';

			// Return successfull response
			return agent.add([
				textResponse1,
				nameFound,
				informationFound,
				textResponse2,
			]);
		})
		.catch((err: AxiosError<any>) => {
			// In case of error or misunderstanding
			console.log(err);
			return agent.add('Input of episode name incorrect. Please try again.');
		});
}
