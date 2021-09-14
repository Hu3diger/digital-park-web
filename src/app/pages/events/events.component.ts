import { TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { ParkEvent } from 'src/app/model/ParkEvent';
import { EventService } from 'src/app/services/event.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { Utils } from 'src/app/shared/utils';

@Component({
	selector: 'dp-events-page',
	templateUrl: './events.component.html',
	styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
	@BlockUI() blockUI: NgBlockUI;
	listEvents: Array<ParkEvent>;

	constructor(
		private router: Router,
		private toastr: ToastrService,
		private navService: NavbarService,
		readonly eventService: EventService,
		readonly pipe: TitleCasePipe,
		readonly utils: Utils
	) {}

	ngOnInit(): void {
		setTimeout(() => {
			if (!this.navService.visible) {
				this.navService.show();
			}
		});
		this.loadAllEvents();
	}

	public loadAllEvents(): void {
		this.blockUI.start("Carregando...");
		this.eventService.fetchAll().then((result: Array<ParkEvent>) => {
			this.blockUI.stop();
			this.listEvents = result;
		});
	}

	public delete(event: ParkEvent): void {
		this.blockUI.start("Deletando...");
		this.eventService.deleteDoc(event.uuid).then(() => {
			this.blockUI.stop();
			this.toastr.success('Evento apagado com sucesso!');
			this.loadAllEvents();
		});
	}

	public editEvent(event: ParkEvent, toEdit: boolean): void {
		if (toEdit) {
			sessionStorage.setItem('EVENT', JSON.stringify(event));
		}
		this.router.navigate(['events/new']).then(() => {});
	}
}
