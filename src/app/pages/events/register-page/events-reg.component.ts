import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
	selector: 'dp-events-register-page',
	templateUrl: './events-reg.component.html',
	styleUrls: ['./events-reg.component.scss'],
})
export class EventsRegisterComponent implements OnInit {

	form: FormGroup;

	constructor(
		private router: Router,
		private toastr: ToastrService,
		private navService: NavbarService,
		readonly formBuilder: FormBuilder
	) {}

	ngOnInit(): void {
		setTimeout(() => {
			if (!this.navService.visible) {
				this.navService.show();
			}
		});
		this.initForm()
	}

	initForm(): void {
		this.form = this.formBuilder.group({
			active: [false, []],
			notifications: [false, []],
			anual: [false, []],
			focusOnActivities: [false, []],
			name: ['', [Validators.required]],
			price: [0.00, []],
			startDate: [new Date(), [Validators.required]],
			endDate: [new Date(), [Validators.required]],
			description: ['', [Validators.required]],
		})
	}

	public abc(): void {
		this.router.navigate(['/events']);
	}

	newEvent(): void {
		console.log(this.form.value);
		console.log(this.form.valid);
	}
}
