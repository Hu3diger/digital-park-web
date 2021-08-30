import { TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfigService } from 'src/app/services/config.service';
import { EventService } from 'src/app/services/event.service';
import { NavbarService } from 'src/app/services/navbar.service';
import {ParkEvent} from '../../../model/ParkEvent';
import * as moment from 'moment';

@Component({
	selector: 'dp-events-register-page',
	templateUrl: './events-reg.component.html',
	styleUrls: ['./events-reg.component.scss'],
})
export class EventsRegisterComponent implements OnInit {

	form: FormGroup;
	toEditUuid: string;
	editableEvent: ParkEvent;
	listOptPerfis: Array<any>;
	listOptTags: Array<any>;
	imagePreview: String;

	constructor(
		private router: Router,
		private toastr: ToastrService,
		private navService: NavbarService,
		readonly formBuilder: FormBuilder,
		readonly eventService: EventService,
		readonly cfgService: ConfigService,
		readonly pipe: TitleCasePipe
	) {}

	ngOnInit(): void{
		setTimeout(() => {
			if (!this.navService.visible) {
				this.navService.show();
			}
		});

		const tmp = localStorage.getItem('EVENT') as any;
		if (tmp != null && tmp !== 'null'){
			this.editableEvent = this.eventService.setFields({ data: () => tmp});
		} else {
			this.editableEvent = new ParkEvent();
		}

		this.cfgService.fetchAllRoles().then((res) => {
			this.listOptPerfis = [];
			res.forEach(el => {
				const obj = el.data();
				this.listOptPerfis.push(obj.name);
			});
		});

		this.cfgService.fetchAllTags().then((res) => {
			this.listOptTags = [];
			res.forEach(el => {
				const obj = el.data();
				this.listOptTags.push(obj.label);
			});
		});


		this.initForm();
	}

	initForm(): void {
		let tags = [];
		let roles = [];
		if (this.editableEvent.tags !== null && this.editableEvent.tags !== undefined && this.editableEvent.tags.length > 0) {
			this.editableEvent.tags.forEach((t) => tags.push({ display: this.pipe.transform(t.id), value: this.pipe.transform(t.id)}));
		} else {
			this.editableEvent.tags = [];
		}

		if (this.editableEvent.roles !== null && this.editableEvent.roles !== undefined && this.editableEvent.roles.length > 0) {
			this.editableEvent.roles.forEach((t) => roles.push({ display: this.pipe.transform(t.id), value: this.pipe.transform(t.id)}));
		} else {
			this.editableEvent.roles = [];
		}
		
		this.form = this.formBuilder.group({
			active: [this.editableEvent.active, []],
			notifications: [this.editableEvent.notifications, []],
			anual: [false, []],
			focusOnActivities: [false, []],
			name: [this.editableEvent.title, [Validators.required]],
			price: [this.editableEvent.price, []],
			startDate: [moment(this.editableEvent.startDate).format('yyyy-MM-DD'), [Validators.required]],
			endDate: [moment(this.editableEvent.endDate).format('yyyy-MM-DD'), [Validators.required]],
			description: [this.editableEvent.description, [Validators.required]],
			roles: [roles],
			tags: [tags]
		});
	}

	public goToListEvents(): void {
		localStorage.setItem('EVENT', null);
		this.router.navigate(['/events']).then(() => {});
	}

	newEvent(): void {
		if (this.form.valid){
			const values = this.form.value;
			const event = {
				active: values.active,
				description: values.description,
				endDate: new Date(values.endDate),
				notifications: {
					active: values.notifications
				},
				price: values.price,
				startDate: new Date(values.startDate),
				title: values.name,
				tags: [],
				roles: [],
				uuid: '',
			};
			
			console.log(this.editableEvent.uuid);
			if (this.editableEvent.uuid !== undefined && this.editableEvent.uuid !== null){
				event.uuid = this.editableEvent.uuid;
			} else {
				event.uuid = null;
			}
			values.tags.forEach(t => {
				event.tags.push(t.value.toLowerCase())
			});
			values.roles.forEach(r => {
				event.roles.push(r.value.toLowerCase())
			});
			
			this.eventService.save(event).then(() => {
				this.toastr.success('Evento salvo com sucesso!');
				this.goToListEvents();
			});
		} else {
			this.toastr.error('Necessário preencher todos os campos obrigatórios', 'Erro ao salvar entidade');
		}
	}

	processFile(imageInput: any) {
		const file: File = imageInput.files[0];
		const reader = new FileReader();

		reader.onloadend = (e) => {
			this.imagePreview = reader.result.toString();
		};

		reader.readAsDataURL(file);
	}
}
