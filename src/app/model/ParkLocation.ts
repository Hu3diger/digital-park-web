export class ParkLocation {
	name: string;
	description: string;
	wayPoint: Array<number>;
	uuid: string;

	constructor() {
		this.name = "";
		this.description = "";
		this.uuid = null;
		this.wayPoint = new Array<number>();
	}
}

