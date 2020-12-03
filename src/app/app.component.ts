import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { NavbarService } from './services/navbar.service';

@Component({
  selector: 'dp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  title = 'digital-park-web';

  @ViewChild(ToastContainerDirective) toastContainer: ToastContainerDirective;

  constructor(
    private toastrService: ToastrService,
    public nav: NavbarService
  ) {}

  ngOnInit(): void {
    this.toastrService.overlayContainer = this.toastContainer;
  }

}
