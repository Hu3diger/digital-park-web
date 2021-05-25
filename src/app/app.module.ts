import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HttpConfigInterceptor } from './httpconfig.interceptor';

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
		QuestionsComponent,
		ConfigComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
		HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
		LoadingBarRouterModule
  ],
  providers: [
		AuthService,
    NavbarService,
		{ provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
