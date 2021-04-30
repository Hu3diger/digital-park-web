import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NavbarService } from 'src/app/services/navbar/navbar.service';

@Component({
	selector: 'dp-home-page',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

	constructor(
		private router: Router,
		private toastr: ToastrService,
		private navService: NavbarService
	) { }

	ngOnInit(): void {
		this.navService.show();
	}

}
