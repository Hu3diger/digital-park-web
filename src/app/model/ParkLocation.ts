export class ParkLocation {
	name: string;
	description: string;
	wayPoint: Array<number>;

	constructor() {
		this.name = "";
		this.description = "";
		this.wayPoint = new Array<number>(2);
	}
}

