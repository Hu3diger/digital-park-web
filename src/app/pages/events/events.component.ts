import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ParkEvent } from 'src/app/model/ParkEvent';
import { EventService } from 'src/app/services/event.service';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
	selector: 'dp-events-page',
	templateUrl: './events.component.html',
	styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {

	listEvents: Array<ParkEvent>;

	constructor(
		private router: Router,
		private toastr: ToastrService,
		private navService: NavbarService,
		readonly eventService: EventService
	) {}

	ngOnInit(): void {
		if (!this.navService.visible) {
			this.navService.show();
		}
		this.eventService.fetchAll().then((result: Array<ParkEvent>) => {
			this.listEvents = result;
		});
	}

	public abc(): void {
		this.router.navigate(['/events/new']);
	}
}
