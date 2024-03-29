import { ParkLocation } from "./ParkLocation";

export class ParkActivity {
	active: boolean;
	uuid: string;
	activeWeekDays: any;
	activityFocus: boolean;
	description: string;
	tags: Array<any>;
	roles: Array<any>;
	location: string;
	title: string;
	price: number;
}
