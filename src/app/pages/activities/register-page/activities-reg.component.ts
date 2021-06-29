import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EventService } from 'src/app/services/event.service';
import { NavbarService } from 'src/app/services/navbar.service';
import {ParkEvent} from '../../../model/ParkEvent';
import {ParkActivity} from '../../../model/ParkActivity';
import {ActivityService} from '../../../services/activity.service';
import {ConfigService} from '../../../services/config.service';

@Component({
	selector: 'dp-activties-register-page',
	templateUrl: './activities-reg.component.html',
	styleUrls: ['./activities-reg.component.scss'],
})
export class ActivitiesRegisterComponent implements OnInit {

	form: FormGroup;
	editableActivity: ParkActivity;
	perfis: Array<any>;
	listOptPerfis: Array<any>;
	listOptTags: Array<any>;

	constructor(
		private router: Router,
		private toastr: ToastrService,
		private navService: NavbarService,
		readonly formBuilder: FormBuilder,
		readonly activityService: ActivityService,
		readonly cfgService: ConfigService
	) {}

	ngOnInit(): void{
		setTimeout(() => {
			if (!this.navService.visible) {
				this.navService.show();
			}
		});

		const tmp = localStorage.getItem('ACTIVITY') as any;
		if (tmp != null && tmp !== 'null'){
			this.editableActivity = this.activityService.setFields({ data: () => tmp});
		} else {
			this.editableActivity = new ParkActivity();
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
				this.listOptTags.push(obj.name);
			});
		});

		this.initForm();
	}

	initForm(): void {
		this.form = this.formBuilder.group({
			active: [this.editableActivity.active, []],
			activityFocus: [this.editableActivity.activityFocus, []],
			name: [this.editableActivity.title, [Validators.required]],
			description: [this.editableActivity.description, [Validators.required]],
			price: [this.editableActivity.price],
			roles: [],
			tags: []
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
