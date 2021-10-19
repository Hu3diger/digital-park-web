import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
	selector: 'dp-waypoints-page',
	templateUrl: './waypoints.component.html',
	styleUrls: ['./waypoints.component.scss'],
})
export class WaypointsComponent implements OnInit {
	@ViewChild('nameField') nameField: ElementRef;
	@ViewChild('modalContent') modalElement: ElementRef;

	@BlockUI() blockUI: NgBlockUI;

	editEnabled: boolean = false;
	isEditingMode: boolean = false;
	toEditMarker: google.maps.Marker = null;

	newWaypointName: string = null;
	lat: number;
	lng: number;

	center: google.maps.LatLngLiteral = { lat: -26.505776, lng: -49.128354 };
	markers: google.maps.Marker[] = new Array<google.maps.Marker>();
	PARQUE_MALWEE_BOUNDS = {
		north: -26.5,
		south: -26.51,
		west: -49.14,
		east: -49.11,
	};
	mapOptions: google.maps.MapOptions = {
		disableDefaultUI: true,
		clickableIcons: true,
		zoom: 13,
		mapTypeId: google.maps.MapTypeId.SATELLITE,
		restriction: {
			latLngBounds: this.PARQUE_MALWEE_BOUNDS,
		}
	};

	constructor(
		private navService: NavbarService,
		private toastr: ToastrService,
		private modalService: NgbModal
	) {}

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
		defaultMarker.setPosition({ lat: -26.508094, lng: -49.129325 });
		defaultMarker.setLabel({
			text: 'Entrada',
			className: 'text-white font-weight-bold',
		});
		this.markers.push(defaultMarker);
	}

	addMarker(event: google.maps.MapMouseEvent) {
		if (this.editEnabled) {
			this.lat = parseFloat(event.latLng.lat().toString());
			this.lng = parseFloat(event.latLng.lng().toString());

			this.triggerModal();
		} else {
			this.toastr.warning('Edição do mapa não habilitada!');
		}
	}

	saveNewMarker(): void {
		if (this.isEditingMode) {
			var foundMarker = null;
			for (var index in this.markers) {
				var _marker: google.maps.Marker = this.markers[index];
				if (
					_marker.getPosition().lat() ===
						this.toEditMarker.getPosition().lat() &&
					_marker.getPosition().lng() === this.toEditMarker.getPosition().lng()
				) {
					foundMarker = _marker;
					break;
				}
			}
			if (foundMarker != null) {
				foundMarker.setLabel({
					text: this.newWaypointName,
					className: 'text-white font-weight-bold',
				});
				this.isEditingMode = false;
				this.toEditMarker = null;
			}
		} else if (this.lat != null && this.lng != null) {
			if (this.newWaypointName == '' || this.newWaypointName == null) {
				this.toastr.error('Obrigatório informar nome ao local');
				this.nameField.nativeElement.focus();
			} else {
				var marker = new google.maps.Marker();
				marker.setPosition(new google.maps.LatLng(this.lat, this.lng));
				marker.setTitle(this.newWaypointName);
				marker.setLabel({
					text: this.newWaypointName,
					className: 'text-white font-weight-bold',
				});
				this.markers.push(marker);
			}
		}

		this.toastr.success('Waypoint editado com sucesso');
		this.newWaypointName = null;
		this.lat = null;
		this.lng = null;
	}

	removeMarker(): void {
		var foundMarker = null;
		for (var index in this.markers) {
			var _marker: google.maps.Marker = this.markers[index];
			if (
				_marker.getPosition().lat() === this.toEditMarker.getPosition().lat() &&
				_marker.getPosition().lng() === this.toEditMarker.getPosition().lng()
			) {
				this.markers.splice(Number(index), 1);
				this.isEditingMode = false;
				this.toastr.success('Waypoint removido com sucesso');
				break;
			}
		}
	}

	getOption(marker: google.maps.Marker): google.maps.MarkerOptions {
		return {
			label: marker.getLabel(),
			title: marker.getTitle(),
			optimized: true,
		};
	}

	unlockNewWaypoints(): void {
		if (!this.editEnabled) {
			this.editEnabled = true;
			this.toastr.info('Selecione no mapa os novos locais');
		}
	}

	resetWaypoints(): void {
		this.markers = [];
		this.generateDefaultMarkers();
	}

	saveWaypoints(): void {
		this.editEnabled = false;
		this.blockUI.start();
		setTimeout(() => {
			this.toastr.success('Os locais marcados foram salvos!');
			this.blockUI.stop();
		}, 100);
	}

	editMarker(marker: google.maps.Marker): void {
		this.newWaypointName = marker.getLabel().text;
		this.isEditingMode = true;
		this.toEditMarker = marker;
		this.triggerModal();
	}

	triggerModal() {
		this.modalService
			.open(this.modalElement, { ariaLabelledBy: 'modal-basic-title' })
			.result.then(
				(res) => {
					if (res === 'save') {
						this.saveNewMarker();
					} else if (res === 'remove') {
						this.removeMarker();
					}
				},
				() => {
					this.isEditingMode = false;
					this.toEditMarker = null;
					this.newWaypointName = null;
				}
			);
	}
}
