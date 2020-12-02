import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NavbarService } from 'src/app/utils/navbar.service';

@Component({
  selector: 'dp-auth-page',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit {

  constructor(
    private toastr: ToastrService,
    private navService: NavbarService
  ) { }

  ngOnInit(): void {
    this.navService.hide();
  }
}
