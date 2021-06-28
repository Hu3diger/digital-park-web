import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NavbarService } from 'src/app/services/navbar.service';
import {ConfigService} from '../../services/config.service';

@Component({
	selector: 'dp-config-page',
	templateUrl: './config.component.html',
	styleUrls: ['./config.component.scss']
})

export class ConfigComponent implements OnInit {

	perfis: any[];
	tags: any[];

	constructor(
		private router: Router,
		private toastr: ToastrService,
		private navService: NavbarService,
		private configService: ConfigService
	) { }

	ngOnInit(): void {
		setTimeout(() => {
			if (!this.navService.visible) {
				this.navService.show();
			}
		});
		this.fetchAll();
	}

	public fetchAll(): any {
		this.configService.fetchAllTags().then((result) => {
			this.tags = [];
			result.forEach(el => {
				this.tags.push(el.data().name);
			});
		});

		this.configService.fetchAllRoles().then((result) => {
			this.perfis = [];
			result.forEach(el => {
				this.perfis.push(el.data().name);
			});
		});
	}

	public save(): void {
		// this.
	}
}
