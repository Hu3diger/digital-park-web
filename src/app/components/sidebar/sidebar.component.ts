import { Component } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
	selector: 'dp-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
	constructor(public nav: NavbarService) {}
}
