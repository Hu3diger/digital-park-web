import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/model/auth/User';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NavbarService } from 'src/app/services/navbar/navbar.service';

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
		private navService: NavbarService,
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

			this.authService.autheticate(authUser).then((response: User) => {
					console.log(response)
					this.toastr.success('Sessão iniciada com sucesso!', 'Seja bem vindo!');
					this.router.navigate(['/home']);
			}).catch((error) =>{
				console.log(error);
				this.toastr.error(error.message);
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
