import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { User } from 'src/app/model/auth/User';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { ParkEvent } from '../model/ParkEvent';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class EventService extends BaseService {

	restUrl: string;

	constructor(
		readonly http: HttpClient,
		readonly storage: AngularFirestore
	){
		super();
	}

	public async fetchAll(): Promise<Array<ParkEvent>> {
		var arrEvents = new Array<ParkEvent>();
		var teste = await this.storage.collection('events').get().toPromise();
		teste.docs.forEach(element => {
			let doc = element.data() as any;

			var evnt = new ParkEvent();
			evnt.active = doc.active;
			evnt.title = doc.title;
			evnt.startDate = new Date(doc.startDate?.seconds * 1000);
			evnt.endDate = new Date(doc.endDate?.seconds * 1000);
			evnt.price = doc.price;
			evnt.notifications = doc.notifications;

			console.log(evnt);
			arrEvents.push(evnt);
		});
		return arrEvents;
	}
}
