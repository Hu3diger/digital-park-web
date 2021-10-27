import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
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
		activity.uuid = element.id || doc.uuid;
		activity.active = doc.active;
		activity.title = doc.title;
		activity.description = doc.description;
		activity.activeWeekDays = doc.activeWeekDays;
		activity.activityFocus = doc.activityFocus.enable || doc.activityFocus;
		activity.price = doc.price || 0.00;
		
		activity.roles = new Array<any>();
		if (doc.roles !== undefined){
			doc.roles.forEach(async (el) => {
				let data = {
					id: el.id,
					path: el.path
				}
				activity.roles.push(data);
			});
		}

		activity.tags = new Array<any>();
		if (doc.tags !== undefined){
			doc.tags.forEach(async (el) => {
				let data = {
					id: el.id,
					path: el.path
				}
				activity.tags.push(data);
			});
		}

		if (doc.location !== undefined) {
			activity.location = doc.location.id ? doc.location.id : doc.location;
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
			let referencedTags = []
			let referencedRoles = []
			activity.tags.forEach(t => {
				referencedTags.push(this.storage.collection('tags').doc(t).ref);
			});
			activity.roles.forEach(r => {
				referencedRoles.push(this.storage.collection('roles').doc(r).ref);
			});
			activity.location = this.storage.collection("locations").doc(activity.location).ref;

			activity.tags = referencedTags;
			activity.roles = referencedRoles;
			
			if (activity.uuid != null && activity.uuid != undefined){
				this.storage.collection('activities').doc(activity.uuid).update(activity).then((result: any) => {
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
