import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NavbarService } from 'src/app/services/navbar.service';
import {ParkEvent} from '../../model/ParkEvent';
import {ParkActivity} from '../../model/ParkActivity';
import {ActivityService} from '../../services/activity.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Utils } from 'src/app/shared/utils';

@Component({
	selector: 'dp-activities-page',
	templateUrl: './activities.component.html',
	styleUrls: ['./activities.component.scss']
})

export class ActivitiesComponent implements OnInit {
	@BlockUI() blockUI: NgBlockUI;
	listActivities: Array<ParkActivity>;

	constructor(
		private router: Router,
		private toastr: ToastrService,
		private navService: NavbarService,
		private activityService: ActivityService,
		readonly utils: Utils
	) { }

	ngOnInit(): void {
		setTimeout(() => {
			if (!this.navService.visible) {
				this.navService.show();
			}
		});

		this.loadAllActivities();
	}

	public loadAllActivities(): void {
		this.blockUI.start();
		this.activityService.fetchAll().then((result: Array<ParkActivity>) => {
			this.blockUI.stop();
			this.listActivities = result;
		});
	}

	public editActivity(activity: ParkActivity, toEdit: boolean): void {
		console.log(activity);
		if (toEdit) {
			sessionStorage.setItem('ACTIVITY', JSON.stringify(activity));
		}

		this.router.navigate(['activities/new']).then(() => {});
	}

	public delete(activity: ParkActivity): void {
		this.blockUI.start("Deltando...");
		this.activityService.deleteDoc(activity.uuid).then((result) => {
			this.blockUI.stop();
			this.toastr.success('Atividade apagada com sucesso');
			this.loadAllActivities();
		});
	}

}
