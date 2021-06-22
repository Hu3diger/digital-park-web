import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EventService } from 'src/app/services/event.service';
import { NavbarService } from 'src/app/services/navbar.service';
import {ParkEvent} from '../../../model/ParkEvent';
import {ParkActivity} from '../../../model/ParkActivity';

@Component({
	selector: 'dp-activties-register-page',
	templateUrl: './activities-reg.component.html',
	styleUrls: ['./activities-reg.component.scss'],
})
export class ActivitiesRegisterComponent implements OnInit {

	form: FormGroup;
	editableAcitivy: ParkActivity;

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

		const tmp = localStorage.getItem('ACTIVITY') as any;
		if (tmp != null && tmp !== 'null'){
			this.editableAcitivy = JSON.parse(tmp) as ParkActivity;
		} else {
			this.editableAcitivy = new ParkActivity();
		}

		this.initForm();
	}

	initForm(): void {
		this.form = this.formBuilder.group({
			active: [this.editableAcitivy.active, []],
			notifications: [true, []],
			anual: [false, []],
			focusOnActivities: [false, []],
			name: [this.editableAcitivy.title, [Validators.required]],
			price: [0, []],
			startDate: [new Date(), [Validators.required]],
			endDate: [new Date(), [Validators.required]],
			description: [this.editableAcitivy.description, [Validators.required]],
		});
	}

	public goToListActivities(): void {
		localStorage.setItem('ACTIVITY', null);
		this.router.navigate(['/activities']).then(() => {});
	}

	newActivity(): void {
		// if (this.form.valid){
		// 	const values = this.form.value;
		// 	const event = {
		// 		active: values.active,
		// 		description: values.description,
		// 		endDate: new Date(values.endDate),
		// 		notifications: {
		// 			active: values.notifications
		// 		},
		// 		price: values.price,
		// 		startDate: new Date(values.startDate),
		// 		title: values.name
		// 	};
		// 	this.eventService.save(event).then(() => {
		// 		this.toastr.success('Event successfully saved!');
		// 		this.router.navigate(['/events']).then(() => {});
		// 	});
		// } else {
		this.toastr.error('Necessário preencher todos os campos obrigatórios', 'Erro ao salvar entidade');
		// }
	}
}
