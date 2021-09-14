import { TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfigService } from 'src/app/services/config.service';
import { NavbarService } from 'src/app/services/navbar.service';
import * as moment from 'moment';
import { ImageSnippet } from 'src/app/model/ImageSnippet';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { UserService } from 'src/app/services/user.service';
import { ParkUser } from 'src/app/model/ParkUser';

@Component({
	selector: 'dp-users-register-page',
	templateUrl: './users-reg.component.html',
	styleUrls: ['./users-reg.component.scss'],
})
export class UsersRegisterComponent implements OnInit {
	@BlockUI() blockUI: NgBlockUI;

	form: FormGroup;
	toEditUuid: string;
	editableUser: ParkUser;
	listOptPerfis: Array<any>;
	imagePreview: ImageSnippet;

	constructor(
		private router: Router,
		private toastr: ToastrService,
		private navService: NavbarService,
		readonly formBuilder: FormBuilder,
		readonly userService: UserService,
		readonly cfgService: ConfigService,
		readonly pipe: TitleCasePipe
	) {}

	ngOnInit(): void{
		setTimeout(() => {
			if (!this.navService.visible) {
				this.navService.show();
			}
		});

		const tmp = sessionStorage.getItem('USER') as any;
		if (tmp != null && tmp !== 'null'){
			this.editableUser = this.userService.setFields({ data: () => tmp});
		} else {
			this.editableUser = new ParkUser();
		}

		this.cfgService.fetchAllRoles().then((res) => {
			this.listOptPerfis = [];
			res.forEach(el => {
				const obj = el.data();
				this.listOptPerfis.push(obj.name);
			});
		});


		this.initForm();
	}

	initForm(): void {
		this.blockUI.start("Carregando...");
		let roles = [];
		if (this.editableUser.roles !== null && this.editableUser.roles !== undefined && this.editableUser.roles.length > 0) {
			this.editableUser.roles.forEach((t) => roles.push({ display: this.pipe.transform(t.id), value: this.pipe.transform(t.id)}));
		} else {
			this.editableUser.roles = [];
		}

		
		this.form = this.formBuilder.group({
			active: [this.editableUser.active, Validators.required],
			fullName: [this.editableUser.fullName, Validators.required],
			password: [this.editableUser.password, Validators.required],
			username: [this.editableUser.username, Validators.required],
			email: [this.editableUser.email, [Validators.email, Validators.required]],
			roles: [roles],
		});
		this.blockUI.stop();
	}

	public goToUserList(): void {
		sessionStorage.setItem('USER', null);
		this.router.navigate(['/users']).then(() => {});
	}

	newUser(): void {
		if (this.form.valid){
			const values = this.form.value;

			const user = {
				active: values.active,
				fullName: values.fullName,
				password: values.password,
				username: values.username,
				email: values.email,
				roles: [],
				uuid: '',
			}
			
			if (this.editableUser.uuid !== undefined && this.editableUser.uuid !== null){
				user.uuid = this.editableUser.uuid;
			} else {
				user.uuid = null;
			}

			values.roles.forEach(r => {
				user.roles.push(r.value.toLowerCase())
			});
			
			console.log(">> ", user.roles);
			this.blockUI.start("Salvando...")
			this.userService.save(user).then(() => {
				this.blockUI.stop();
				this.toastr.success('Evento salvo com sucesso!');
				this.goToUserList();
			});
		} else {
			this.toastr.error('Necessário preencher todos os campos obrigatórios', 'Erro ao salvar entidade');
		}
	}

	processFile(imageInput: any) {
		const file: File = imageInput.files[0];
		const reader = new FileReader();

		reader.onloadend = (e) => {
			this.imagePreview = new ImageSnippet(reader.result.toString(), file);
		};

		reader.readAsDataURL(file);
	}
}
