import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Auth } from 'src/app/model/auth/Auth';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { ResponseModel } from '../model/ResponseModel';

@Injectable()
export class AuthService extends BaseService {

	restUrl: string;

	constructor(
		readonly http: HttpClient
	){
		super();
		this.restUrl = this.baseUrl + '/Users'
	}

	autheticate(user: Auth): Promise<ResponseModel<Auth>>  {
		return this.http.post<ResponseModel<Auth>>(this.restUrl + '/auth', user).toPromise();
	}

	save(user: Auth): Promise<ResponseModel<Auth>> {
		return this.http.post<ResponseModel<Auth>>(this.restUrl + '/register', user).toPromise()
	}

}
