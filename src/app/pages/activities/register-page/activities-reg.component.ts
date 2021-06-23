import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EventService } from 'src/app/services/event.service';
import { NavbarService } from 'src/app/services/navbar.service';
import {ParkEvent} from '../../../model/ParkEvent';
import {ParkActivity} from '../../../model/ParkActivity';
import {ActivityService} from '../../../services/activity.service';

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
		readonly activityService: ActivityService
	) {}

	ngOnInit(): void{
		setTimeout(() => {
			if (!this.navService.visible) {
				this.navService.show();
			}
		});

		const tmp = localStorage.getItem('ACTIVITY') as any;
		if (tmp != null && tmp !== 'null'){
			this.editableAcitivy = this.activityService.setFields({ data: () => tmp});
		} else {
			this.editableAcitivy = new ParkActivity();
		}

		this.initForm();
	}

	initForm(): void {
		this.form = this.formBuilder.group({
			active: [this.editableAcitivy.active, []],
			activityFocus: [this.editableAcitivy.activityFocus, []],
			name: [this.editableAcitivy.title, [Validators.required]],
			description: [this.editableAcitivy.description, [Validators.required]],
			price: [this.editableAcitivy.price]
		});
	}

	public goToListActivities(): void {
		localStorage.setItem('ACTIVITY', null);
		this.router.navigate(['/activities']).then(() => {});
	}

	newActivity(): void {
		if (this.form.valid){
			const values = this.form.value;

			const activity = {
				active: values.active,
				activityFocus: values.activityFocus,
				description: values.description,
				price: values.price,
				title: values.name
			};
			this.activityService.save(activity).then((res) => {
				if (res.hasError) {
					this.toastr.error('Erro ao salvar a Atividade', res.data);
				} else {
					this.toastr.success('Atividade salva com sucesso!');
					this.router.navigate(['/activities']).then(() => {});
				}
			});
		} else {
			this.toastr.error('Necessário preencher todos os campos obrigatórios', 'Erro ao salvar entidade');
		}
	}
}
