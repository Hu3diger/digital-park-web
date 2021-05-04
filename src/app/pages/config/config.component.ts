import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NavbarService } from 'src/app/services/navbar/navbar.service';

@Component({
	selector: 'dp-config-page',
	templateUrl: './config.component.html',
	styleUrls: ['./config.component.scss']
})

export class ConfigComponent implements OnInit {

	constructor(
		private router: Router,
		private toastr: ToastrService,
	) { }

	ngOnInit(): void {
	}
}
