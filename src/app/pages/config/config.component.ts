import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NavbarService } from 'src/app/services/navbar.service';
import {ConfigService} from '../../services/config.service';

@Component({
	selector: 'dp-config-page',
	templateUrl: './config.component.html',
	styleUrls: ['./config.component.scss']
})

export class ConfigComponent implements OnInit {

	perfis: any[];
	tags: any[];

	constructor(
		private router: Router,
		private toastr: ToastrService,
		private navService: NavbarService,
		private configService: ConfigService
	) { }

	ngOnInit(): void {
		setTimeout(() => {
			if (!this.navService.visible) {
				this.navService.show();
			}
		});
		this.fetchAll();
	}

	public fetchAll(): any {
		this.configService.fetchAllTags().then((result) => {
			this.tags = [];
			result.forEach(el => {
				const obj = el.data();
				obj.uuid = el.id;
				console.log(obj);
				this.tags.push(obj);
			});
		});

		this.configService.fetchAllRoles().then((result) => {
			this.perfis = [];
			result.forEach(el => {
				const obj = el.data();
				obj.uuid = el.id;
				this.perfis.push(obj);
			});
		});
	}

	public saveTags(): void {
		this.tags.forEach((el) => {
			if (el.value !== undefined){
				el.custom = false;
				delete el.value;
			}
		});

		this.configService.saveTags(this.tags).then((result) => {
			this.toastr.success('Tags salvas com sucesso');
		});

		this.fetchAll();
	}

	public saveProfile(): void {
		this.perfis.forEach((el) => {
			if (el.value !== undefined){
				el.custom = false;
				delete el.value;
			}
		});

		this.configService.saveRoles(this.perfis).then((result) => {
			this.toastr.success('Perfis de usuário salvos com sucesso');
		});

		this.fetchAll();
	}

	public onRemoveRole($event: any): void {
		this.configService.removeRole($event).then((res) => {
			this.toastr.success('Perfil de usuário removido com sucesso!');
			this.fetchAll();
		});
	}

	public onRemoveTag($event: any): void {
		this.configService.removeTag($event).then((res) => {
			this.toastr.success('Tag removida com sucesso!');
			this.fetchAll();
		});
	}
}
