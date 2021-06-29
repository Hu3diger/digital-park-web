import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { User } from 'src/app/model/auth/User';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { ParkEvent } from '../model/ParkEvent';
import { AngularFirestore } from '@angular/fire/firestore';
import {ParkActivity} from '../model/ParkActivity';

@Injectable()
export class ActivityService extends BaseService {

	constructor(
		readonly http: HttpClient,
		readonly storage: AngularFirestore
	){
		super();
	}

	public setFields(element: any): ParkActivity {
		let doc = element.data();
		doc = typeof(doc) === 'string' ? JSON.parse(doc as any) : doc;

		const activity = new ParkActivity();
		activity.uuid = element.id;
		activity.active = doc.active;
		activity.title = doc.title;
		activity.description = doc.description;
		activity.activeWeekDays = doc.activeWeekDays;
		activity.activityFocus = doc.activityFocus.enable || doc.activityFocus;
		activity.price = doc.price || 0.00;

		activity.roles = new Array<any>();
		if (doc.roles !== undefined){
			doc.roles.forEach(async (el) => {
				const ref = await el.get();
				const data = ref.data();
				if (data !== undefined) {
					activity.roles.push(data.name);
				}
			});
		}

		activity.tags = new Array<any>();
		if (doc.tags !== undefined){
			doc.tags.forEach(async (el) => {
				const ref = await el.get();
				const data = ref.data();
				if (data !== undefined) {
					activity.tags.push(data.name);
				}
			});
		}

		console.log(activity);
		return activity;
	}

	public async fetchAll(): Promise<Array<ParkActivity>> {
		const arrActivities = new Array<ParkActivity>();
		const dbRef = await this.storage.collection('activities').get().toPromise();
		dbRef.docs.forEach(element => {
			arrActivities.push(this.setFields(element));
		});
		return arrActivities;
	}

	public async getByDocId(uuid: string): Promise<ParkActivity> {
		const element = await this.storage.doc(uuid).get().toPromise();
		return this.setFields(element);
	}

	public async save(activity: any): Promise<any> {
		return new Promise((resolve) => {
			console.log(activity);
			if (activity.id != null && activity.id != undefined){
				this.storage.collection('activities').doc(activity.id).update(activity).then((result: any) => {
					resolve({ data: result, hasError: false });
				}).catch((err) => {
					resolve({ data: err, hasError: true });
				});
			} else {
				this.storage.collection('activities').doc().set(activity).then((result: any) => {
					resolve({ data: result, hasError: false });
				}).catch((err) => {
					resolve({ data: err, hasError: true });
				});
			}
		});
	}

	public async deleteDoc(uuid: string): Promise<any> {
		await this.storage.collection('activities').doc(uuid).delete().then((result: any) => {
			return result;
		});
	}
}
