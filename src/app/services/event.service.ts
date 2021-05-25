import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { User } from 'src/app/model/auth/User';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { ResponseModel } from '../model/ResponseModel';

@Injectable()
export class EventService extends BaseService {

	restUrl: string;

	constructor(
		readonly http: HttpClient
	){
		super();
		this.restUrl = this.baseUrl + '/Events'
	}

	// autheticate(user: User): Promise<ResponseModel<User>>  {
	// 	return this.http.post<ResponseModel<User>>(this.restUrl + '/auth', user).toPromise();
	// }

	// save(user: User): Promise<ResponseModel<User>> {
	// 	return this.http.post<ResponseModel<User>>(this.restUrl + '/register', user).toPromise()
	// }

}
