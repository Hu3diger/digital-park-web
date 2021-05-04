import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NavbarService } from 'src/app/services/navbar/navbar.service';

@Component({
	selector: 'dp-questions-page',
	templateUrl: './questions.component.html',
	styleUrls: ['./questions.component.scss']
})

export class QuestionsComponent implements OnInit {

	constructor(
		private router: Router,
		private toastr: ToastrService,
	) { }

	ngOnInit(): void {
		// this.navService.show();
	}
}
