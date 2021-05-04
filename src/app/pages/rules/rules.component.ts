import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NavbarService } from 'src/app/services/navbar/navbar.service';

@Component({
	selector: 'dp-rules-page',
	templateUrl: './rules.component.html',
	styleUrls: ['./rules.component.scss']
})

export class RulesComponent implements OnInit {

	constructor(
		private router: Router,
		private toastr: ToastrService,
	) { }

	ngOnInit(): void {
	}
}
