import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { ParkLocation } from 'src/app/model/ParkLocation';
import { LocationService } from 'src/app/services/location.service';
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

	center: google.maps.LatLngLiteral = { lat: -26.505776, lng: -49.128354 };
	PARQUE_MALWEE_BOUNDS = {
		north: -26.5,
		south: -26.51,
		west: -49.14,
		east: -49.11,
	};
	mapOptions: google.maps.MapOptions = {
		disableDefaultUI: false,
		clickableIcons: true,
		zoom: 13,
		mapTypeId: google.maps.MapTypeId.SATELLITE,
		restriction: {
			latLngBounds: this.PARQUE_MALWEE_BOUNDS,
		}
	};

	constructor(
		private readonly navService: NavbarService,
		private readonly locationService: LocationService,
		private readonly toastr: ToastrService,
		private readonly modalService: NgbModal,
		private readonly formBuilder: FormBuilder
	) {}

	ngOnInit(): void {
		setTimeout(() => {
			if (!this.navService.visible) {
				this.navService.show();
			}
		});

		this.loadLocations();
	}

	initForm(): void {
		this.form = this.formBuilder.group({
			name: [this.toEditLocation.name, [Validators.required]],
			description: [this.toEditLocation.description, [Validators.required]],
			wayPoint: [],
			visible: [this.toEditLocation.visible]
		});
	}

	loadLocations(): Promise<void> {
		this.blockUI.start();
		return this.locationService.fetchAll().then((result) => {
			this.listLocations = result;

			this.listLocations.forEach((loc) => {
				var marker = new google.maps.Marker();
				marker.setPosition({ lat: parseFloat(loc.wayPoint[0].toString()), lng: parseFloat(loc.wayPoint[1].toString()) });
				marker.setLabel({
					text: loc.name,
					className: 'text-white font-weight-bold',
				});
				this.listMarkers.push(marker);
			});
			this.initForm();
		}).catch((error) => {
			this.toastr.error(error.message, "Error");
			console.error(error);
		}).finally(() => {
			this.blockUI.stop();
		});
	}

	addMarker(event: google.maps.MapMouseEvent) {
		if (this.editEnabled) {
			this.toEditLocation = new ParkLocation();

			this.toEditLocation.wayPoint.push(parseFloat(event.latLng.lat().toString()));
			this.toEditLocation.wayPoint.push(parseFloat(event.latLng.lng().toString()))
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
				this.toEditLocation.visible = formLocation.visible;
				this.isEditingMode = false;
			}
		} else if (this.toEditLocation.wayPoint.length > 1 && this.toEditLocation.wayPoint[0] != null && this.toEditLocation.wayPoint[1] != null) {
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

				this.toEditLocation.name = formLocation.name;
				this.toEditLocation.description = formLocation.description;
				this.toEditLocation.visible = formLocation.visible;
				this.listLocations.push(this.toEditLocation);
			}
		}

		this.toastr.success('Waypoint salvo com sucesso');
	}

	removeMarker(): void {
		let lat = this.toEditLocation.wayPoint[0];
		let lng = this.toEditLocation.wayPoint[1];

		let indexExistentgMarker = this.listMarkers.findIndex((marker) => marker.getPosition().lat() === lat && marker.getPosition().lng() === lng)
		let indexExistentLocation = this.listLocations.findIndex((location) => location.wayPoint[0] === lat && location.wayPoint[1] === lng)
		
		if (indexExistentgMarker !== -1) {
			this.listMarkers.splice(Number(indexExistentgMarker), 1);
		}

		let prom = [];
		if (indexExistentLocation !== -1) {
			let location = this.listLocations[indexExistentLocation];
			if (location.uuid !== null) {
				prom.push(this.locationService.deleteDoc(location.uuid));
			}

			this.listLocations.splice(Number(indexExistentLocation), 1);
		}

		Promise.all(prom).then(() => {
			this.isEditingMode = false;
			this.toastr.success('Waypoint removido com sucesso');
		}).catch((error) => {
			this.toastr.error(error, "Error!");
		});
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
		this.loadLocations();
	}

	saveWaypoints(): void {
		this.editEnabled = false;
		this.blockUI.start();
		var prom = [];
		this.listLocations.forEach(toSaveLocation => {
			prom.push(this.locationService.save(toSaveLocation));
		});

		Promise.all(prom).then (() => {
			this.loadLocations().then(() => {
				this.toastr.success('Os locais marcados foram salvos!');
			}).catch((error) => {
				this.toastr.error(error.message, "Error!");
				console.error(error);
			}).finally(() => {
				this.blockUI.stop();
			});
		}).catch((error) => {
			this.toastr.error(error.message, "Error!");
			console.error(error);
		}).finally(() => {
			if (this.blockUI.isActive) {
				this.blockUI.stop();
			}
		});
	}

	editMarker(marker: google.maps.Marker): void {
		if (this.editEnabled){
			this.toEditLocation = new ParkLocation();
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
		} else {
			this.toastr.warning('Edição do mapa não habilitada!');
		}
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
