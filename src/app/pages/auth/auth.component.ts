import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/model/auth/User';
import { ResponseModel } from 'src/app/model/ResponseModel';
import { AuthService } from 'src/app/services/auth.service';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
	selector: 'dp-auth-page',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {

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
			var authUser = new User();
			authUser.username = this.form.get('userName').value;
			authUser.password = this.form.get('password').value;

			this.authService.autheticate(authUser).then((response: ResponseModel<User>) => {
					if (!response.hasError){
						localStorage.setItem("userToken", response.data.token);
						this.toastr.success('Session started!', 'Welcome!');
						this.router.navigate(['/home']);
					}
			}).catch((err) =>{
				console.log(err);
				this.toastr.error(err.error.data, "Error");
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
