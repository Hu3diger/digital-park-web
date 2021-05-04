import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { User } from 'src/app/model/auth/User';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {

	baseUrl: string;

	constructor(
		readonly http: HttpClient
	){
		this.baseUrl = 'https://localhost:5001/Users'
	}

	autheticate(user: User): Promise<User>  {
		return this.http.post<User>(this.baseUrl + '/auth', user).toPromise();
	}

	save(user: User): Promise<User> {
		return this.http.post<User>(this.baseUrl + '/register', user).toPromise()
	}

}
