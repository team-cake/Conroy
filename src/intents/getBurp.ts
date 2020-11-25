/*
intent: getBurp
need: Axios ?
Input human: burp - ${burp} as parameter
get to api https://rickandmortyapi.com/api/episode/${character}
don't forget to use .catch(err)
Tried to use different API, didn't work that well for me with the dates. 
In the end I chose to keep it simple so it will work.
*/

export const getBurp = (conv: any) => {
	return conv.add(
		`Ahh I see you're a person of culture. https://www.youtube.com/watch?v=xBZAoAhbaXs`
	);
};
