import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
	selector: 'dp-waypoints-page',
	templateUrl: './waypoints.component.html',
	styleUrls: ['./waypoints.component.scss']
})

export class WaypointsComponent implements OnInit {
	zoom: number = 8;

	lat: number = 51.673858;
	lng: number = 7.815982;

	constructor(
		private navService: NavbarService,
	) { }

	ngOnInit(): void {
		setTimeout(() => {
			if (!this.navService.visible) {
				this.navService.show();
			}
		});
	}
	
	clickedMarker(label: string, index: number) {
		console.log(`clicked the marker: ${label || index}`)
	}
	
	markerDragEnd(m: marker, $event: MouseEvent) {
		console.log('dragEnd', m, $event);
	  }
	  
	markers: marker[] = [
		{
			lat: 51.673858,
			lng: 7.815982,
			label: 'A',
			draggable: true
		},
		{
			lat: 51.373858,
			lng: 7.215982,
			label: 'B',
			draggable: false
		},
		{
			lat: 51.723858,
			lng: 7.895982,
			label: 'C',
			draggable: true
		}
	]
}
	
// just an interface for type safety.
interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}
	