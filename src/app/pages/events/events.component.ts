import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NavbarService } from 'src/app/services/navbar/navbar.service';

@Component({
	selector: 'dp-events-page',
	templateUrl: './events.component.html',
	styleUrls: ['./events.component.scss']
	})

	export class EventsComponent implements OnInit {

	constructor(
		private router: Router,
		private toastr: ToastrService,
	) { }

	ngOnInit(): void {
		this.toastr.success('Aoba');
	}
}
