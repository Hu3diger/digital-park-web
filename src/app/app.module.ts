import { BrowserModule } from '@angular/platform-browser';
import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from "@angular/common";
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ToastrModule } from 'ngx-toastr';
import { AuthComponent } from './pages/auth/auth.component';
import { NavbarService } from './services/navbar.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { SugestionsComponent } from './pages/sugestions/sugestions.component';
import { EventsComponent } from './pages/events/events.component';
import { ActivitiesComponent } from './pages/activities/activities.component';
import { RulesComponent } from './pages/rules/rules.component';
import { UsersComponent } from './pages/users/users.component';
import { QuestionsComponent } from './pages/questions/questions.component';
import { ConfigComponent } from './pages/config/config.component';
import { AuthService } from './services/auth.service';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HttpConfigInterceptor } from './httpconfig.interceptor';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FloatingButtonComponent } from './components/floating-button/floating-button.component';
import { EventsRegisterComponent } from './pages/events/register-page/events-reg.component';
import { EventService } from './services/event.service';
import { QuestionService } from './services/question.service';
import { ActivitiesRegisterComponent } from './pages/activities/register-page/activities-reg.component';
import { ActivityService } from './services/activity.service';
import { TagInputModule } from 'ngx-chips';
import { ConfigService } from './services/config.service';
import { QuestionRegisterComponent } from './pages/questions/register-page/questions-reg.component';
import { TitleCasePipe } from '@angular/common';
import { BlockUIModule } from 'ng-block-ui';
import { UserService } from './services/user.service';
import { UsersRegisterComponent } from './pages/users/register-page/users-reg.component';
import { Utils } from './shared/utils';
import { GoogleMapsModule } from '@angular/google-maps'
import { WaypointsComponent } from './pages/waypoints/waypoints.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LocationService } from './services/location.service';

@NgModule({
	declarations: [
		AppComponent,
		AuthComponent,
		HomeComponent,
		NavbarComponent,
		SidebarComponent,
		SugestionsComponent,
		EventsComponent,
		ActivitiesComponent,
		RulesComponent,
		UsersComponent,
		UsersRegisterComponent,
		QuestionsComponent,
		ConfigComponent,
		FloatingButtonComponent,
		EventsRegisterComponent,
		QuestionsComponent,
		QuestionRegisterComponent,
		ActivitiesRegisterComponent,
		WaypointsComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		BrowserModule,
		FormsModule,
		HttpClientModule,
		ReactiveFormsModule,
		CommonModule,
		ToastrModule.forRoot({
			positionClass: 'toast-bottom-left',
			preventDuplicates: true,
			countDuplicates: true
		}),
		AngularFireModule.initializeApp(environment.firebase),
		AngularFirestoreModule,
		AngularFireDatabaseModule,
		AngularFireStorageModule,
		TagInputModule,
		BlockUIModule.forRoot({
			message: 'Carregando...'
		}),
		GoogleMapsModule,
		NgbModule
	],
	providers: [
		AuthService,
		EventService,
		NavbarService,
		ActivityService,
		ConfigService,
		QuestionService,
		UserService,
		TitleCasePipe,
		Utils,
		LocationService,
		{ provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
		{provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
