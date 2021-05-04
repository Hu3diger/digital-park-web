import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NavbarService } from 'src/app/services/navbar/navbar.service';

@Component({
	selector: 'dp-sugestions-page',
	templateUrl: './sugestions.component.html',
	styleUrls: ['./sugestions.component.scss']
})

export class SugestionsComponent implements OnInit {

	constructor(
		private router: Router,
		private toastr: ToastrService,
	) { }

	ngOnInit(): void {
	}

}
