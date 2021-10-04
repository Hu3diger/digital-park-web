import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
	selector: 'dp-waypoints-page',
	templateUrl: './waypoints.component.html',
	styleUrls: ['./waypoints.component.scss']
})

export class WaypointsComponent implements OnInit {
	zoom: number = 15;

	lat: number = -26.508096;
	lng: number = -49.129354;
	center: google.maps.LatLngLiteral = {lat: this.lat, lng: this.lng}
	markers: google.maps.LatLngLiteral[] = [{ lat: this.lat, lng: this.lng }]

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
	
	addMarker(event: google.maps.MapMouseEvent) {
		this.markers.push(event.latLng.toJSON());

		console.log(this.markers);
	}
}