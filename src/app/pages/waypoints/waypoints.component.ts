import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
	selector: 'dp-waypoints-page',
	templateUrl: './waypoints.component.html',
	styleUrls: ['./waypoints.component.scss']
})

export class WaypointsComponent implements OnInit {
	@ViewChild("nameField") nameField : ElementRef;

	@BlockUI() blockUI: NgBlockUI;

	editEnabled: boolean = false;
	showNameFields: boolean = false;
	newWaypointName: string = null;
	lat: number;
	lng: number;

	center: google.maps.LatLngLiteral = { lat: -26.505776, lng: -49.128354 }
	markers: google.maps.Marker[] = new Array<google.maps.Marker>();
	PARQUE_MALWEE_BOUNDS = {
		north: -26.50,
		south: -26.51,
		west: -49.140,
		east: -49.110,
	};
	restriction: google.maps.MapRestriction = {latLngBounds: this.PARQUE_MALWEE_BOUNDS };
	mapOptions: google.maps.MapOptions = {disableDefaultUI: true, clickableIcons: true, zoom: 13, mapTypeId: google.maps.MapTypeId.SATELLITE, restriction: this.restriction}

	constructor(
		private navService: NavbarService,
		private toastr: ToastrService,
	) { }

	ngOnInit(): void {
		setTimeout(() => {
			if (!this.navService.visible) {
				this.navService.show();
			}
		});
		this.generateDefaultMarkers();
	}
	
	generateDefaultMarkers(): void {
		var defaultMarker = new google.maps.Marker();
		defaultMarker.setPosition({lat: -26.508094, lng: -49.129325});
		defaultMarker.setLabel({text: "Entrada", className: 'text-white font-weight-bold'});
		this.markers.push(defaultMarker);
	}

	addMarker(event: google.maps.MapMouseEvent) {
		if (this.editEnabled) {
			this.lat = parseFloat(event.latLng.lat().toString());
			this.lng = parseFloat(event.latLng.lng().toString());
			
			this.showNameFields = true;
			this.toastr.info("Agora defina o nome do local...");
			this.nameField.nativeElement.focus();
		} else {
			this.toastr.warning("Edição do mapa não habilitada!")
		}
	}

	saveNewMarker(): void {
		if (this.lat != null && this.lng != null) {
			if (this.newWaypointName == "" || this.newWaypointName == null) {
				this.toastr.error('Obrigatório informar nome ao local');
				this.nameField.nativeElement.focus();
			} else {
				var marker = new google.maps.Marker();
				marker.setPosition(new google.maps.LatLng(this.lat, this.lng));
				marker.setTitle(this.newWaypointName);
				marker.setLabel({text: this.newWaypointName, className: 'text-white font-weight-bold'});
				this.markers.push(marker);
		
				this.newWaypointName = null;
				this.lat = null;
				this.lng = null;
			}
		}
	}

	getOption(marker: google.maps.Marker): google.maps.MarkerOptions {
		return { label: marker.getLabel(), title: marker.getTitle(), optimized: true };
	}

	unlockNewWaypoints(): void {
		if (!this.editEnabled) {
			this.editEnabled = true;
			this.toastr.info('Selecione no mapa os novos locais');
		}
	}

	resetWaypoints(): void {
		this.markers = [];
		this.showNameFields = false;
		this.generateDefaultMarkers();
	}

	saveWaypoints(): void {
		this.editEnabled = false;
		this.showNameFields = false;
		this.blockUI.start();
		setTimeout(() => {
			this.toastr.success('Os locais marcados foram salvos!');
			this.blockUI.stop();
		}, 100);
	}
}