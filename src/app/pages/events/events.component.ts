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
		setTimeout(() => {
			if (!this.navService.visible) {
				this.navService.show();
			}
		});

		this.eventService.fetchAll().then((result: Array<ParkEvent>) => {
			this.listEvents = result;
		});
	}

	public goToNew(): void {
		this.router.navigate(['/events/new']);
	}

	public edit(): void {
		this.toastr.show('Editing');
	}

	public delete(): void {
		this.toastr.show('Deleting');
	}

	public editEvent(event: ParkEvent): void {
		localStorage.setItem('EVENT', JSON.stringify(event));
		this.router.navigate(['events/new']).then(() => {});
	}
}
