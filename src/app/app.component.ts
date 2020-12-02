import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'dp-root',
  template: `
    <dp-components-navbar></dp-components-navbar>
    <div toastContainer></div>
    <router-outlet></router-outlet>
  `
})
export class AppComponent  implements OnInit {
  title = 'digital-park-web';

  @ViewChild(ToastContainerDirective) toastContainer: ToastContainerDirective;

  constructor(
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.toastrService.overlayContainer = this.toastContainer;
  }

}
