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
		const doc = element.data() as any;

		const activity = new ParkActivity();
		activity.uuid = element.id;
		activity.active = doc.active;
		activity.title = doc.title;
		activity.description = doc.description;
		activity.activeWeekDays = doc.activeWeekDays;
		activity.activityFocus = doc.activityFocus.enable;
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
		await this.storage.collection('activities').doc().set(activity).then((result: any) => {
			return result;
		});
	}
}
