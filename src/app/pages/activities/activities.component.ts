import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NavbarService } from 'src/app/services/navbar/navbar.service';

@Component({
	selector: 'dp-activities-page',
	templateUrl: './activities.component.html',
	styleUrls: ['./activities.component.scss']
})

export class ActivitiesComponent implements OnInit {

	constructor(
		private router: Router,
		private toastr: ToastrService,
	) { }

	ngOnInit(): void {
	}

}
