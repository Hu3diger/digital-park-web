import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { ParkLocation } from 'src/app/model/ParkLocation';
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

	toEditLocation: ParkLocation = new ParkLocation();
	listLocations: Array<ParkLocation> = new Array<ParkLocation>();
	listMarkers: Array<google.maps.Marker> = new Array<google.maps.Marker>();

	form: FormGroup;
	editEnabled: boolean = false;
	isEditingMode: boolean = false;

	lat: number;
	lng: number;

	center: google.maps.LatLngLiteral = { lat: -26.505776, lng: -49.128354 };
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
		private modalService: NgbModal,
		readonly formBuilder: FormBuilder
	) {}

	ngOnInit(): void {
		setTimeout(() => {
			if (!this.navService.visible) {
				this.navService.show();
			}
		});
		this.generateDefaultMarkers();
		this.initForm();
	}

	initForm(): void {
		this.form = this.formBuilder.group({
			name: [this.toEditLocation.name, [Validators.required]],
			description: [this.toEditLocation.description, [Validators.required]],
			wayPoint: [],
		});
	}

	generateDefaultMarkers(): void {
		var defaultMarker = new google.maps.Marker();
		defaultMarker.setPosition({ lat: -26.508094, lng: -49.129325 });
		defaultMarker.setLabel({
			text: 'Entrada',
			className: 'text-white font-weight-bold',
		});
		this.listMarkers.push(defaultMarker);
	}

	addMarker(event: google.maps.MapMouseEvent) {
		if (this.editEnabled) {
			let lat = parseFloat(event.latLng.lat().toString());
			let lng = parseFloat(event.latLng.lng().toString());

			this.toEditLocation.wayPoint.push(lat, lng);
			this.triggerModal();
		} else {
			this.toastr.warning('Edição do mapa não habilitada!');
		}
	}

	saveNewMarker(): void {
		const formLocation = this.form.value as ParkLocation;
		debugger
		if (this.isEditingMode) {
			var foundMarker = null;
			for (var index in this.listMarkers) {
				var _marker: google.maps.Marker = this.listMarkers[index];
				if (
					_marker.getPosition().lat() === this.toEditLocation.wayPoint[0] &&
					_marker.getPosition().lng() === this.toEditLocation.wayPoint[1]
				) {
					foundMarker = _marker;
					break;
				}
			}
			if (foundMarker != null) {
				foundMarker.setLabel({
					text: formLocation.name,
					className: 'text-white font-weight-bold',
				});

				this.toEditLocation.name = formLocation.name;
				this.toEditLocation.description = formLocation.description;
				if (!this.listLocations.includes(this.toEditLocation)){
					this.listLocations.push(this.toEditLocation);
				}
				this.isEditingMode = false;
			}
		} else if (this.lat != null && this.lng != null) {
			if (this.form.invalid) {
				this.toastr.error('Obrigatório informar os campos obrigatórios!');
				this.nameField.nativeElement.focus();
			} else {
				var marker = new google.maps.Marker();
				marker.setPosition(new google.maps.LatLng(this.toEditLocation.wayPoint[0], this.toEditLocation.wayPoint[1]));
				marker.setTitle(formLocation.name);
				marker.setLabel({
					text: formLocation.name,
					className: 'text-white font-weight-bold',
				});
				this.listMarkers.push(marker);
				this.listLocations.push(this.toEditLocation);
			}
		}

		this.toastr.success('Waypoint editado com sucesso');
		this.lat = null;
		this.lng = null;
	}

	removeMarker(): void {
		for (var index in this.listMarkers) {
			var _marker: google.maps.Marker = this.listMarkers[index];
			if (
				_marker.getPosition().lat() === this.toEditLocation.wayPoint[0] &&
				_marker.getPosition().lng() === this.toEditLocation.wayPoint[1]
			) {
				this.listMarkers.splice(Number(index), 1);
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
		this.listMarkers = [];
		this.generateDefaultMarkers();
	}

	saveWaypoints(): void {
		this.editEnabled = false;
		this.blockUI.start();
		setTimeout(() => {
			console.log(this.listMarkers);
			console.log(this.listLocations);
			this.toastr.success('Os locais marcados foram salvos!');
			this.blockUI.stop();
		}, 100);
	}

	editMarker(marker: google.maps.Marker): void {
		this.toEditLocation.wayPoint = [];
		this.toEditLocation.name = marker.getLabel().text;
		var lat = marker.getPosition().lat();
		var lng = marker.getPosition().lng()

		var indexExistingLocation = this.listLocations.findIndex((location) => location.wayPoint[0] === lat && location.wayPoint[1] === lng)
		if (indexExistingLocation !== -1){
			this.toEditLocation = this.listLocations[indexExistingLocation];
		} else {
			this.toEditLocation.wayPoint.push(lat);
			this.toEditLocation.wayPoint.push(lng);
		}

		this.isEditingMode = true;
		this.triggerModal();
	}

	triggerModal() {
		this.initForm();
		this.modalService
			.open(this.modalElement, { ariaLabelledBy: 'modal-basic-title' })
			.result.then(
				(res) => {
					if (res === 'remove') {
						this.removeMarker();
					}
				},
				() => {
					this.isEditingMode = false;
				}
			);
	}
}
