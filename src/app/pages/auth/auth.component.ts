import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'dp-auth-page',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit {

	form: FormGroup;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private navService: NavbarService,
		readonly formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.navService.hide();
  }

  login(): void {
    if (this.form.invalid){
      this.toastr.error('É necessário preencher todos os campos.', 'Erro ao iniciar sessão');
    } else {
      this.toastr.success('Sessão iniciada com sucesso!', 'Seja bem vindo!');
      this.router.navigate(['/home']);
    }
  }

	initForm(): void {
		this.form = this.formBuilder.group({
			username: ['', Validators.required, Validators.minLength(2)],
			password: ['', Validators.required, Validators.minLength(2)]
		});
	}

}
