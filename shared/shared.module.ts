import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

import { MaterialModule } from '../core/material.module';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { ListViewComponent } from './components/list-view/list-view.component';
import { BreadcrumsComponent } from './components/breadcrums/breadcrums.component';

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		MaterialModule,
	],
	declarations: [
		MainLayoutComponent,
		ListViewComponent,
		BreadcrumsComponent
	],
	exports: [
		MaterialModule,
		ListViewComponent
	],
})
export class SharedModule { }
