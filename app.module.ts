import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

import { MaterialModule } from './core/material.module';
import { AppRoutingModule } from './core/app-routing.module';
//import { LayoutModule } from './shared/layout/layout.module';

import { ApiService } from './core/api.service';
import { FormService } from './components/form.service';

import { DashboardComponent } from './components/dashboard.component';
import { FormComponent } from './components/form/form.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
	declarations: [
		AppComponent,
		DashboardComponent,
		FormComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		MaterialModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		//LayoutModule,
		SharedModule,
	],
	providers: [
		ApiService,
		FormService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
