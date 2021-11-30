import { Injectable } from '@angular/core';
import { Auth } from 'src/app/model/auth/Auth';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ParkUser } from '../model/ParkUser';

@Injectable()
export class AuthService extends BaseService {

	isAuthenticated = false;

	constructor(
		readonly http: HttpClient,
		readonly storage: AngularFirestore
	){
		super();
	}

	setFields(object: any): ParkUser {
		if (object == null || object == undefined){
			return null;
		}

		var user = new ParkUser();
		user.email = object.email;
		user.password = object.password;
		user.fullName = object.fullName;
		user.username = object.username;
		user.active = true;

		user.roles = new Array<any>();
		if (object.roles !== undefined){
			object.roles.forEach(async (el) => {
				let data = {
					id: el.id,
					path: el.path
				}
				user.roles.push(data);
			});
		}

		return user;
	}

	async autheticate(user: Auth): Promise<ParkUser>  {
		debugger
		var userRef = await this.storage.collection('users').doc(user.username).get().toPromise();
		var parkUser = this.setFields(userRef.data());

		if (parkUser != null){
			if (parkUser.password != user.password) {
				throw 'Senha incorreta!';
			} else {
				this.isAuthenticated = true;
				return parkUser;
			}
		} else {
			throw 'Usuário inválido!';
		}

		
	}

	save(user: Auth): void {
	}

}
