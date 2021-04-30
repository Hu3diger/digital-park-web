import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NavbarService } from 'src/app/services/navbar/navbar.service';

@Component({
	selector: 'dp-auth-page',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
	user: string;
	passwd: string;

	form: FormGroup;

	constructor(
		private router: Router,
		private toastr: ToastrService,
		private navService: NavbarService,
		readonly formBuilder: FormBuilder
	) {}

	ngOnInit(): void {
		this.navService.hide();
		this.initForm()
	}

	login(): void {
		if (this.form.invalid){
			this.toastr.error(
				'É necessário preencher todos os campos.',
				'Erro ao iniciar sessão'
			);
		} else {
			this.toastr.success('Sessão iniciada com sucesso!', 'Seja bem vindo!');
			this.router.navigate(['/home']);
		}
	}

	initForm(): void {
		this.form = this.formBuilder.group({
			userName: ['', [Validators.minLength(2), Validators.required]],
			password: ['', [Validators.minLength(2), Validators.required]],
		})
	}
}
