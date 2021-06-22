import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NavbarService } from 'src/app/services/navbar.service';
import {ParkEvent} from '../../model/ParkEvent';
import {ParkActivity} from '../../model/ParkActivity';
import {ActivityService} from '../../services/activity.service';

@Component({
	selector: 'dp-activities-page',
	templateUrl: './activities.component.html',
	styleUrls: ['./activities.component.scss']
})

export class ActivitiesComponent implements OnInit {
	listActivities: Array<ParkActivity>;

	constructor(
		private router: Router,
		private toastr: ToastrService,
		private navService: NavbarService,
		private activityService: ActivityService
	) { }

	ngOnInit(): void {
		setTimeout(() => {
			if (!this.navService.visible) {
				this.navService.show();
			}
		});

		this.activityService.fetchAll().then((result: Array<ParkActivity>) => {
			this.listActivities = result;
		});
	}

	public goToNew(): void {
		this.router.navigate(['/activities/new']).then(() => {});
	}

	public editActivity(activity: ParkActivity, toEdit: boolean): void {
		if (toEdit) {
			localStorage.setItem('ACTIVITY', JSON.stringify(activity));
		}

		this.router.navigate(['activities/new']).then(() => {});
	}

}
