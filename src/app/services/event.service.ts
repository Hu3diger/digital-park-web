import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { ParkEvent } from '../model/ParkEvent';
import { AngularFirestore } from '@angular/fire/firestore';
import * as moment from 'moment';
import { AngularFireStorage } from '@angular/fire/storage';
import { ImageSnippet } from '../model/ImageSnippet';

@Injectable()
export class EventService extends BaseService {

	constructor(
		readonly http: HttpClient,
		readonly storage: AngularFirestore,
		readonly bucket: AngularFireStorage
	){
		super();
	}

	public setFields(element: any): ParkEvent {
		let doc = element.data();
		doc = typeof(doc) === 'string' ? JSON.parse(doc as any) : doc;
		
		const event = new ParkEvent();

		event.uuid = element.id || doc.uuid;
		event.active = doc.active;
		event.title = doc.title;
		event.startDate = typeof(doc.startDate) === 'string' ? moment(doc.startDate).startOf('day').toDate() : new Date(doc.startDate?.seconds * 1000);
		event.endDate = typeof(doc.endDate) === 'string' ? moment(doc.endDate).startOf('day').toDate() : new Date(doc.endDate?.seconds * 1000);
		event.price = doc.price;
		event.notifications = doc.notifications || {active: true};
		event.description = doc.description;
		event.image = doc.image;
		if (doc.confirmedAttendance != null){
			event.confirmedAttendance = doc.confirmedAttendance.length;
		}
		
		if (doc.location !== undefined) {
			event.location = doc.location.id ? doc.location.id : doc.location;
		}

		event.roles = new Array<any>();
		if (doc.roles !== undefined){
			doc.roles.forEach(async (el) => {
				let data = {
					id: el.id,
					path: el.path
				}
				event.roles.push(data);
			});
		}

		event.tags = new Array<any>();
		if (doc.tags !== undefined){
			doc.tags.forEach(async (el) => {
				let data = {
					id: el.id,
					path: el.path
				}
				event.tags.push(data);
			});
		}

		console.log(event);
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

	public async saveImage(uuid: string, image: ImageSnippet): Promise<any> {
		if (!image.file){
			return new Promise((resolve) => resolve(image.src));
		} else {
			this.bucket.ref("images/events/" + uuid + ".jpg");
			var teste = await this.bucket.upload("images/events/" + uuid + ".jpg", image.file);
			return (await teste.task).ref.getDownloadURL();
		}
	}

	public async save(event: any, image: ImageSnippet): Promise<any> {
		return new Promise((resolve) => {
			let referencedTags = []
			let referencedRoles = []

			event.tags.forEach(t => {
				referencedTags.push(this.storage.collection('tags').doc(t).ref);
			});
			event.roles.forEach(r => {
				referencedRoles.push(this.storage.collection('roles').doc(r).ref);
			});

			event.location = this.storage.collection("locations").doc(event.location).ref;
			
			event.tags = referencedTags;
			event.roles = referencedRoles;
			
			if (event.uuid != null && event.uuid != undefined){
				this.saveImage(event.uuid, image).then((imagaRef: any) => {
					event.image = imagaRef;
					this.storage.collection('events').doc(event.uuid).update(event).then((result: any) => {
						resolve({ data: result, hasError: false });
					}).catch((err) => {
						resolve({ data: err, hasError: true });
					});
				});
			} else {
				this.saveImage(event.uuid, image).then((imagaRef: any) => {
					event.image = imagaRef;
					this.storage.collection('events').doc().set(event).then((result: any) => {
						resolve({ data: result, hasError: false });
					}).catch((err) => {
						resolve({ data: err, hasError: true });
					});
				});
			}
		});
	}

	public async deleteDoc(uuid: string): Promise<any> {
		await this.storage.collection('events').doc(uuid).delete().then((result: any) => {
			return result;
		});
	}
}
