import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { User } from 'src/app/model/auth/User';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';

@Injectable()
export class AuthService extends BaseService {

	restUrl: string;

	constructor(
		readonly http: HttpClient
	){
		super();
		this.restUrl = this.baseUrl + '/Users'
	}

	autheticate(user: User): Promise<User>  {
		return this.http.post<User>(this.restUrl + '/auth', user).toPromise();
	}

	save(user: User): Promise<User> {
		return this.http.post<User>(this.restUrl + '/register', user).toPromise()
	}

}
