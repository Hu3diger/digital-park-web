import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ParkQuestion } from 'src/app/model/ParkQuestion';
import { QuestionService } from 'src/app/services/question.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
	selector: 'dp-questions-page',
	templateUrl: './questions.component.html',
	styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
	@BlockUI() blockUI: NgBlockUI;
	listQuestions: Array<ParkQuestion>;

	constructor(
		private router: Router,
		private toastr: ToastrService,
		private navService: NavbarService,
		readonly questionService: QuestionService
	) {}

	ngOnInit(): void {
		setTimeout(() => {
			if (!this.navService.visible) {
				this.navService.show();
			}
		});
		this.loadAllQuestions();
	}

	public loadAllQuestions(): void {
		this.blockUI.start();
		this.questionService.fetchAll().then((result: Array<ParkQuestion>) => {
			this.blockUI.stop();
			this.listQuestions = result;
		});
	}

	public delete(event: ParkQuestion): void {
		this.blockUI.start("Deletando...")
		this.questionService.deleteDoc(event.uuid).then((result) => {
			this.blockUI.stop();
			this.toastr.success('Pergunta apagada com sucesso!');
			this.loadAllQuestions();
		});
	}

	public editQuestion(question: ParkQuestion, toEdit: boolean): void {
		if (toEdit) {
			localStorage.setItem('QUESTION', JSON.stringify(question));
		}
		this.router.navigate(['questions/new']).then(() => {});
	}
}
