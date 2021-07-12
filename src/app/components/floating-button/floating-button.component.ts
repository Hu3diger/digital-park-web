import { Component, Input } from '@angular/core';

@Component({
	selector: 'dp-floating-button',
	templateUrl: './floating-button.component.html',
	styleUrls: ['./floating-button.component.scss']
})
export class FloatingButtonComponent {

	@Input()
	icon = 'fa fa-plus';
}
