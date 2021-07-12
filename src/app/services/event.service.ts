import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { User } from 'src/app/model/auth/User';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { ParkEvent } from '../model/ParkEvent';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class EventService extends BaseService {

	constructor(
		readonly http: HttpClient,
		readonly storage: AngularFirestore
	){
		super();
	}

	public setFields(element: any): ParkEvent {
		const doc = element.data() as any;

		const event = new ParkEvent();

		event.uuid = element.id;
		event.active = doc.active;
		event.title = doc.title;
		event.startDate = new Date(doc.startDate?.seconds * 1000);
		event.endDate = new Date(doc.endDate?.seconds * 1000);
		event.price = doc.price;
		event.notifications = doc.notifications;
		if (doc.confirmedAttendance != null){
			event.confirmedAttendance = doc.confirmedAttendance.length;
		}

		event.roles = new Array<any>();
		if (doc.roles !== undefined){
			doc.roles.forEach(async (el) => {
				const ref = await el.get();
				event.roles.push(ref.data().name);
			});
		}

		return event;
	}

	public async fetchAll(): Promise<Array<ParkEvent>> {
		const arrEvents = new Array<ParkEvent>();
		const dbRef = await this.storage.collection('events').get().toPromise();
		dbRef.docs.forEach(element => {
			arrEvents.push(this.setFields(element));
		});
		return arrEvents;
	}

	public async save(event: any): Promise<any> {
		await this.storage.collection('events').doc().set(event).then((result: any) =>{
			return result;
		});
	}

	public async deleteDoc(uuid: string): Promise<any> {
		await this.storage.collection('events').doc(uuid).delete().then((result: any) => {
			return result;
		});
	}
}
