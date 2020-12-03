import { Injectable } from '@angular/core';

@Injectable()
export class NavbarService {
  visible: boolean;

  constructor() { this.visible = true; }

  hide(): void { this.visible = false; }

  show(): void { this.visible = true; }

  toggle(): void { this.visible = !this.visible; }

}
