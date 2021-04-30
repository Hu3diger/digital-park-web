import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

	constructor(
		private http: HttpClient
	){}

	autheticate(): any {

	}

	// save(plant: Plant): Promise<Plant> {
	// 	return this.http.post(this.apiUrl + this.baseUrl, plant).map(response => {
	// 		return Plant.parse(response);
	// 	}).toPromise();
	// }

	// delete(plantId: string): Promise<void> {
	// 	return this.http.delete(this.apiUrl + this.baseUrl + '/' + plantId).map(() => null).toPromise();
	// }

	// get(plantId: string): Promise<Plant> {
	// 	return this.http.get(this.apiUrl + this.baseUrl + '/' + plantId).map((response: any) => {
	// 		return Plant.parse(response);
	// 	}).toPromise();
	// }


}
