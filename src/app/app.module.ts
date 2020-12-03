import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ToastrModule } from 'ngx-toastr';
import { AuthComponent } from './pages/auth/auth.component';
import { NavbarService } from './services/navbar.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { SugestionsComponent } from './pages/sugestions/sugestions.component';
import { EventsComponent } from './pages/events/events.component';
import { ActivitiesComponent } from './pages/activities/activities.component';
import { RulesComponent } from './pages/rules/rules.component';
import { UsersComponent } from './pages/users/users.component';
import { QuestionsComponent } from './pages/questions/questions.component';
import { ConfigComponent } from './pages/config/config.component';

@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
		AuthComponent,
		HomeComponent,
		SugestionsComponent,
		EventsComponent,
		ActivitiesComponent,
		RulesComponent,
		QuestionsComponent,
		UsersComponent,
		ConfigComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		FormsModule,
		ToastrModule.forRoot({
			positionClass: 'toast-bottom-left',
		})
	],
	providers: [
		NavbarService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
