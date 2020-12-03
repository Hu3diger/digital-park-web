import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'dp-auth-page',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit {

  user: string;
  passwd: string;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private navService: NavbarService
  ) { }

  ngOnInit(): void {
    this.navService.hide();
  }

  login(): void {
    if (this.user === undefined || this.passwd === undefined){
      this.toastr.error('É necessário preencher todos os campos.', 'Erro ao iniciar sessão');
    } else {
      this.toastr.success('Sessão iniciada com sucesso!', 'Seja bem vindo!');
      this.router.navigate(['/home']);
    }
  }
}
