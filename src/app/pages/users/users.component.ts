import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { ParkUser } from 'src/app/model/ParkUser';
import { NavbarService } from 'src/app/services/navbar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'dp-users-page',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit {
	@BlockUI() blockUI: NgBlockUI
	listUsers: Array<ParkUser>;;

	constructor(
		private router: Router,
		private toastr: ToastrService,
		private navService: NavbarService,
		private readonly userService: UserService
	) { }

	ngOnInit(): void {
		setTimeout(() => {
			if (!this.navService.visible) {
				this.navService.show();
			}
		});

		this.loadUsers();
	}

	public loadUsers(): void {
		this.blockUI.start();
		this.userService.fetchAll().then((result: Array<ParkUser>) => {
			this.blockUI.stop();
			this.listUsers = result;
		});
	}

	public delete(user: ParkUser): void {
		this.blockUI.start("Deletando...")
		this.userService.deleteDoc(user.email).then(() => {
			this.blockUI.stop();
			this.toastr.success('Usuário apagado com sucesso!');
			this.loadUsers();
		});
	}

	public editUser(user: ParkUser, toEdit: boolean): void {
		if (toEdit) {
			sessionStorage.setItem('USER', JSON.stringify(user));
		}
		this.router.navigate(['users/new']).then(() => {});
	}

}
