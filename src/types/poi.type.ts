/**
 * @name POI
 * @description
 * A POI is a Person Of Interest. POIs will be filtered in Web Pages
 */
export type POI = {
	id: string;
	name: string;
	nameVariations: string[];
	descriptionVariations: string[];
};
