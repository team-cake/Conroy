// Intent name: Default Fallback Intent
export const fallback = (conv: any) => {
	return conv.add(`Sorry, I didn't get that.`);
};
