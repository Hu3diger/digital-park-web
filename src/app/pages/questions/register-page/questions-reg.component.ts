import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfigService } from 'src/app/services/config.service';
import { QuestionService } from 'src/app/services/question.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { ParkQuestion } from '../../../model/ParkQuestion';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
	selector: 'dp-questions-register-page',
	templateUrl: './questions-reg.component.html',
	styleUrls: ['./questions-reg.component.scss'],
})
export class QuestionRegisterComponent implements OnInit {
	@BlockUI() blockUI: NgBlockUI;

	form: FormGroup;
	toEditUuid: string;
	editableQuestion: ParkQuestion;
	listOptPerfis: Array<any>;
	listOptTags: Array<any>;

	constructor(
		private router: Router,
		private toastr: ToastrService,
		private navService: NavbarService,
		readonly formBuilder: FormBuilder,
		readonly questionService: QuestionService,
	) {}

	ngOnInit(): void{
		setTimeout(() => {
			if (!this.navService.visible) {
				this.navService.show();
			}
		});

		const tmp = localStorage.getItem('QUESTION') as any;
		if (tmp != null && tmp !== 'null'){
			this.editableQuestion = this.questionService.setFields({ data: () => tmp});
		} else {
			this.editableQuestion = new ParkQuestion();
		}

		this.initForm();
	}

	initForm(): void {
		this.form = this.formBuilder.group({
			active: [this.editableQuestion.active, []],
			name: [this.editableQuestion.title, [Validators.required]],
			description: [this.editableQuestion.description, [Validators.required]],
		});
	}

	public goToListQuestions(): void {
		localStorage.setItem('QUESTION', null);
		this.router.navigate(['/questions']).then(() => {});
	}

	newEvent(): void {
		if (this.form.valid){
			const values = this.form.value;
			const question = {
				active: values.active,
				description: values.description,
				title: values.name,
				created: {
					timestemp: new Date()
				},
				id: null,
			};
			
			if (this.editableQuestion.uuid !== (null || undefined)){
				question.id = this.editableQuestion.uuid
			}
			this.blockUI.start("Salvando...");
			this.questionService.save(question).then(() => {
				this.blockUI.stop();	
				this.toastr.success('Pergunta cadastrada com sucesso!');
				this.router.navigate(['/questions']).then(() => {});
				localStorage.setItem('QUESTION', null);
			});
		} else {
			this.toastr.error('Necessário preencher todos os campos obrigatórios', 'Erro ao salvar entidade');
		}
	}
}
