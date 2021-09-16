import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ParkUser } from '../model/ParkUser';

@Injectable()
export class UserService extends BaseService {

	constructor(
		readonly http: HttpClient,
		readonly storage: AngularFirestore
	){
		super();
	}

	public setFields(element: any): ParkUser {
		let doc = element.data();
		doc = typeof(doc) === 'string' ? JSON.parse(doc as any) : doc;
		
		const user = new ParkUser();
		user.active = doc.active;
		user.fullName = doc.fullName;
		user.username = doc.username;
		user.password = doc.password;
		user.email = doc.email || element.id;
		user.uuid = element.id;
		
		user.roles = new Array<any>();
		if (doc.roles !== undefined){
			doc.roles.forEach(async (el) => {
				let data = {
					id: el.id,
					path: el.path
				}
				user.roles.push(data);
			});
		}

		console.log(user);
		return user;
	}

	public async fetchAll(): Promise<Array<ParkUser>> {
		const arrUsers = new Array<ParkUser>();
		const dbRef = await this.storage.collection('users').get().toPromise();
		dbRef.docs.forEach(element => {
			arrUsers.push(this.setFields(element));
		});
		return arrUsers;
	}

	public async getByDocId(uuid: string): Promise<ParkUser> {
		const element = await this.storage.doc(uuid).get().toPromise();
		return this.setFields(element);
	}

	public async save(user: any): Promise<any> {
		return new Promise((resolve) => {
			let referencedRoles = []
			user.roles.forEach(r => {
				referencedRoles.push(this.storage.collection('roles').doc(r).ref);
			});
			user.roles = referencedRoles;
			
			if (user.uuid != null && user.uuid != undefined){
				this.storage.collection('users').doc(user.email).update(user).then((result: any) => {
					resolve({ data: result, hasError: false });
				}).catch((err) => {
					resolve({ data: err, hasError: true });
				});
			} else {
				this.storage.collection('users').doc(user.email).set(user).then((result: any) => {
					resolve({ data: result, hasError: false });
				}).catch((err) => {
					resolve({ data: err, hasError: true });
				});
			}
		});
	}

	public async deleteDoc(uuid: string): Promise<any> {
		await this.storage.collection('users').doc(uuid).delete().then((result: any) => {
			return result;
		});
	}
}
