import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
	selector: 'dp-waypoints-page',
	templateUrl: './waypoints.component.html',
	styleUrls: ['./waypoints.component.scss']
})

export class WaypointsComponent implements OnInit {
	editEnabled: boolean = false;
	center: google.maps.LatLngLiteral = { lat: -26.505776, lng: -49.128354 }
	markers: google.maps.Marker[] = new Array<google.maps.Marker>();
	mapOptions: google.maps.MapOptions = {disableDefaultUI: true, clickableIcons: false, zoom: 15, mapTypeId: google.maps.MapTypeId.SATELLITE}

	constructor(
		private navService: NavbarService,
		private toastr: ToastrService,
	) { 
		var defaultMarker = new google.maps.Marker();
		defaultMarker.setPosition({lat: -26.508094, lng: -49.129325});
		defaultMarker.setLabel("Parque Malwee");
		this.markers.push(defaultMarker);
	}

	ngOnInit(): void {
		setTimeout(() => {
			if (!this.navService.visible) {
				this.navService.show();
			}
		});
	}
	
	addMarker(event: google.maps.MapMouseEvent) {
		if (this.editEnabled) {
			var marker = new google.maps.Marker();
			var lat = parseFloat(event.latLng.lat().toString());
			var lng = parseFloat(event.latLng.lng().toString());
	
			marker.setPosition(new google.maps.LatLng(lat, lng));
			marker.setTitle("teste");
			marker.setLabel('teste' + Math.random());
			this.markers.push(marker);
		}
	}

	getOption(marker: google.maps.Marker): google.maps.MarkerOptions {
		return { label: marker.getLabel(), title: marker.getTitle() };
	}

	unlockNewWaypoints(): void {
		this.editEnabled = true;
		this.toastr.info('Selecione no mapa os novos locais')
	}
}