import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EventService } from 'src/app/services/event.service';
import { NavbarService } from 'src/app/services/navbar.service';
import {ParkEvent} from '../../../model/ParkEvent';

@Component({
	selector: 'dp-events-register-page',
	templateUrl: './events-reg.component.html',
	styleUrls: ['./events-reg.component.scss'],
})
export class EventsRegisterComponent implements OnInit {

	form: FormGroup;
	toEditUuid: string;
	editableEvent: ParkEvent;

	constructor(
		private router: Router,
		private toastr: ToastrService,
		private navService: NavbarService,
		readonly formBuilder: FormBuilder,
		readonly eventService: EventService
	) {}

	ngOnInit(): void{
		setTimeout(() => {
			if (!this.navService.visible) {
				this.navService.show();
			}
		});

		const tmp = localStorage.getItem('EVENT') as any;
		if (tmp != null && tmp !== 'null'){
			this.editableEvent = JSON.parse(tmp) as ParkEvent;
		} else {
			this.editableEvent = new ParkEvent();
		}

		this.initForm();
	}

	initForm(): void {
		this.form = this.formBuilder.group({
			active: [this.editableEvent.active, []],
			notifications: [this.editableEvent.notifications, []],
			anual: [false, []],
			focusOnActivities: [false, []],
			name: [this.editableEvent.title, [Validators.required]],
			price: [this.editableEvent.price, []],
			startDate: [new Date(this.editableEvent.startDate), [Validators.required]],
			endDate: [new Date(this.editableEvent.endDate), [Validators.required]],
			description: [this.editableEvent.description, [Validators.required]],
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
				title: values.name
			};
			this.eventService.save(event).then(() => {
				this.toastr.success('Event successfully saved!');
				this.router.navigate(['/events']).then(() => {});
			});
		} else {
			this.toastr.error('Necessário preencher todos os campos obrigatórios', 'Erro ao salvar entidade');
		}
	}
}
