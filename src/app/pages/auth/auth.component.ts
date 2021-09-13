import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { Auth } from 'src/app/model/auth/Auth';
import { ResponseModel } from 'src/app/model/ResponseModel';
import { AuthService } from 'src/app/services/auth.service';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
	selector: 'dp-auth-page',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
	@BlockUI() blockUi: NgBlockUI;
	form: FormGroup;

	constructor(
		private router: Router,
		private toastr: ToastrService,
		readonly formBuilder: FormBuilder,
		readonly authService: AuthService
	) {}

	ngOnInit(): void {
		this.initForm()
	}

	login(): void {
		if (this.form.invalid){
			this.toastr.error(
				'É necessário preencher todos os campos.',
				'Erro ao iniciar sessão'
			);
		} else {
			var authUser = new Auth();
			authUser.username = this.form.get('userName').value;
			authUser.password = this.form.get('password').value;

			this.blockUi.start("Autenticando...");
			this.authService.autheticate(authUser).then((response: ResponseModel<Auth>) => {
				if (!response.hasError){
					sessionStorage.setItem("userToken", response.data.token);
					this.toastr.success('Sessão iniciada!', 'Seja bem vindo!');
					this.router.navigate(['/home']);
				}
			}).catch((err) => {
				this.toastr.error(err.error.data, 'Erro');
			}).finally(() => {
				this.blockUi.stop();
			})
		}
	}

	initForm(): void {
		this.form = this.formBuilder.group({
			userName: ['', [Validators.minLength(2), Validators.required]],
			password: ['', [Validators.minLength(2), Validators.required]],
		})
	}
}
