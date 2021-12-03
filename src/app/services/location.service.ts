import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ParkLocation } from '../model/ParkLocation';

@Injectable()
export class LocationService extends BaseService {

	constructor(
		readonly http: HttpClient,
		readonly storage: AngularFirestore
	){
		super();
	}

	public setFields(element: any): ParkLocation {
		let doc = element.data();
		doc = typeof(doc) === 'string' ? JSON.parse(doc as any) : doc;
		
		const location = new ParkLocation();
		location.uuid = element.id == null ? doc.uuid : element.id;
		location.description = doc.description;
		location.wayPoint.push(doc.wayPoint._lat);
		location.wayPoint.push(doc.wayPoint._long);
		location.name = doc.name;
		location.visible = doc.visible;

		return location;
	}

	public async fetchAll(): Promise<Array<ParkLocation>> {
		const arrLocations = new Array<ParkLocation>();
		const dbRef = await this.storage.collection('locations').get().toPromise();
		dbRef.docs.forEach(element => {
			arrLocations.push(this.setFields(element));
		});
		return arrLocations;
	}

	public async getByDocId(uuid: string): Promise<ParkLocation> {
		const element = await this.storage.doc(uuid).get().toPromise();
		return this.setFields(element);
	}

	public async save(location: any): Promise<any> {
		return new Promise((resolve) => {
			const wpArray = location.wayPoint;
			delete location.wayPoint;

			location.wayPoint = {
				_lat: wpArray[0],
				_long: wpArray[1]
			}

			if (location.uuid != null && location.uuid != undefined){
				this.storage.collection('locations').doc(location.uuid).update(Object.assign({}, location)).then((result: any) => {
					resolve({ data: result, hasError: false });
				}).catch((err) => {
					resolve({ data: err, hasError: true });
				});
			} else {
				this.storage.collection('locations').doc().set(Object.assign({}, location)).then((result: any) => {
					resolve({ data: result, hasError: false });
				}).catch((err) => {
					resolve({ data: err, hasError: true });
				});
			}
		});
	}

	public async deleteDoc(uuid: string): Promise<any> {
		await this.storage.collection('locations').doc(uuid).delete().then((result: any) => {
			return result;
		});
	}
}
