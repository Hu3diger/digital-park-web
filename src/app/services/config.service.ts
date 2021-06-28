import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { User } from 'src/app/model/auth/User';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { ParkEvent } from '../model/ParkEvent';
import { AngularFirestore } from '@angular/fire/firestore';
import {ParkActivity} from '../model/ParkActivity';

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
}
