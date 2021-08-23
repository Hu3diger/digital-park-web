import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ParkQuestion } from '../model/ParkQuestion';

@Injectable()
export class QuestionService extends BaseService {

	constructor(
		readonly http: HttpClient,
		readonly storage: AngularFirestore
	){
		super();
	}

	public setFields(element: any): ParkQuestion {
		let doc = element.data();
		doc = typeof(doc) === 'string' ? JSON.parse(doc as any) : doc;
		
		const question = new ParkQuestion();
		question.uuid = element.id == null ? doc.uuid : element.id;
		question.active = doc.active;
		question.title = doc.title;
		question.description = doc.description;
		question.created = { timestemp: doc.created.timestemp }
		
		return question;
	}

	public async fetchAll(): Promise<Array<ParkQuestion>> {
		const arrActivities = new Array<ParkQuestion>();
		const dbRef = await this.storage.collection('questions').get().toPromise();
		dbRef.docs.forEach(element => {
			arrActivities.push(this.setFields(element));
		});
		return arrActivities;
	}

	public async getByDocId(uuid: string): Promise<ParkQuestion> {
		const element = await this.storage.doc(uuid).get().toPromise();
		return this.setFields(element);
	}

	public async save(question: any): Promise<any> {
		return new Promise((resolve) => {
			if (question.id != null && question.id != undefined){
				this.storage.collection('questions').doc(question.id).update(question).then((result: any) => {
					resolve({ data: result, hasError: false });
				}).catch((err) => {
					resolve({ data: err, hasError: true });
				});
			} else {
				this.storage.collection('questions').doc().set(question).then((result: any) => {
					resolve({ data: result, hasError: false });
				}).catch((err) => {
					resolve({ data: err, hasError: true });
				});
			}
		});
	}

	public async deleteDoc(uuid: string): Promise<any> {
		await this.storage.collection('questions').doc(uuid).delete().then((result: any) => {
			return result;
		});
	}
}
