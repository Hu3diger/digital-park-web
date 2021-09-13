import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class ConfigService extends BaseService {

	constructor(
		readonly http: HttpClient,
		readonly storage: AngularFirestore
	){
		super();
	}

	public async fetchAllTags(): Promise<any> {
		const arrTags = new Array<any>();
		const dbRef = await this.storage.collection('tags').get().toPromise();
		dbRef.docs.forEach(element => {
			arrTags.push(element);
		});
		return arrTags;
	}

	public async fetchAllRoles(): Promise<any> {
		const arrRoles = new Array<any>();
		const dbRef = await this.storage.collection('roles').get().toPromise();
		dbRef.docs.forEach(element => {
			arrRoles.push(element);
		});
		return arrRoles;
	}

	public async saveRoles(arrData: Array<any>): Promise<any> {
		arrData.forEach((el) => {
			const docId = el.uuid !== undefined ? el.uuid : el.name.toLowerCase();
			delete el.uuid;
			this.storage.collection('roles').doc(docId).set(el).then((result) => {});
		});
	}

	public async saveTags(arrData: Array<any>): Promise<any> {
		arrData.forEach((el) => {
			const docId = el.uuid !== undefined ? el.uuid : el.label.toLowerCase();
			delete el.uuid;
			this.storage.collection('tags').doc(docId).set(el).then((result) => {});
		});
	}

	public async removeRole(role: any): Promise<any> {
		return this.storage.collection('roles').doc(role.uuid).delete().then((res) => {});
	}

	public async removeTag(tag: any): Promise<any> {
		return this.storage.collection('tags').doc(tag.uuid).delete().then((res) => {});
	}
}
