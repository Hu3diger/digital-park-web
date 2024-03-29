import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivitiesComponent } from './pages/activities/activities.component';
import { AuthComponent } from './pages/auth/auth.component';
import { ConfigComponent } from './pages/config/config.component';
import { EventsComponent } from './pages/events/events.component';
import { EventsRegisterComponent } from './pages/events/register-page/events-reg.component';
import { HomeComponent } from './pages/home/home.component';
import { QuestionsComponent } from './pages/questions/questions.component';
import { RulesComponent } from './pages/rules/rules.component';
import { SugestionsComponent } from './pages/sugestions/sugestions.component';
import { UsersComponent } from './pages/users/users.component';
import {ActivitiesRegisterComponent} from './pages/activities/register-page/activities-reg.component';
import { QuestionRegisterComponent } from './pages/questions/register-page/questions-reg.component';
import { UsersRegisterComponent } from './pages/users/register-page/users-reg.component';
import { WaypointsComponent } from './pages/waypoints/waypoints.component';

const routes: Routes = [
	{
		path: 'auth',
		component: AuthComponent
	},
	{
		path: 'home',
		component: HomeComponent
	},
	{
		path: 'sugestions',
		component: SugestionsComponent
	},
	{
		path: 'events',
		children: [
			{
				path: '',
				component: EventsComponent,
			},
			{
				path: 'new',
				component: EventsRegisterComponent
			},
		]
	},
	{
		path: 'activities',
		children: [
			{
				path: '',
				component: ActivitiesComponent,
			},
			{
				path: 'new',
				component: ActivitiesRegisterComponent
			},
		]
	},
	{
		path: 'rules',
		component: RulesComponent
	},
	{
		path: 'questions',
		children: [
			{
				path: '',
				component: QuestionsComponent,
			},
			{
				path: 'new',
				component: QuestionRegisterComponent
			},
		]
	},
	{
		path: 'users',
		children: [
			{
				path: '',
				component: UsersComponent
			},
			{
				path: 'new',
				component: UsersRegisterComponent
			}
		]
	},
	{
		path: 'waypoints',
		component: WaypointsComponent
	},
	{
		path: 'config',
		component: ConfigComponent
	},
	// {
	// 	path: 'main',
	// 	canActivate: [RouteGuard],
	// 	component: MainComponent
	// },
	{
		path: '',
		redirectTo: '/auth',
		pathMatch: 'full',

	},
	{
		path: '**',
		redirectTo: 'auth',
		pathMatch: 'full'
	},
];


@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
