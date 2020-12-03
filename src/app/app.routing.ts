import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivitiesComponent } from './pages/activities/activities.component';
import { AuthComponent } from './pages/auth/auth.component';
import { ConfigComponent } from './pages/config/config.component';
import { EventsComponent } from './pages/events/events.component';
import { HomeComponent } from './pages/home/home.component';
import { QuestionsComponent } from './pages/questions/questions.component';
import { RulesComponent } from './pages/rules/rules.component';
import { SugestionsComponent } from './pages/sugestions/sugestions.component';
import { UsersComponent } from './pages/users/users.component';

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
		component: EventsComponent
	},
	{
		path: 'activities',
		component: ActivitiesComponent
	},
	{
		path: 'rules',
		component: RulesComponent
	},
	{
		path: 'questions',
		component: QuestionsComponent
	},
	{
		path: 'users',
		component: UsersComponent
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
