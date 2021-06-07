import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
	selector: 'dp-events-register-page',
	templateUrl: './events-reg.component.html',
	styleUrls: ['./events-reg.component.scss'],
})
export class EventsRegisterComponent implements OnInit {
	constructor(
		private router: Router,
		private toastr: ToastrService,
		private navService: NavbarService
	) {}

	ngOnInit(): void {
		if (!this.navService.visible) {
			this.navService.show();
		}
	}

	public abc(): void {
		this.router.navigate(['/events']);
	}
}
