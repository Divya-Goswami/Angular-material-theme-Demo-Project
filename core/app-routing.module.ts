import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MastersModule } from '../components/masters/masters.module';
import { MainLayoutComponent } from '../shared/layout/main-layout/main-layout.component';
import { DashboardComponent } from '../components/dashboard.component';
import { FormComponent } from '../components/form/form.component';

const routes: Routes = [
	{
		path: '',
		component: MainLayoutComponent,
		data: { pageTitle: 'Home' },
		children: [
			{
				path: 'dashboard',
				component: DashboardComponent,
			},
			{
				path: 'form',
				component: FormComponent,
			},
			{
				path: 'masters',
				loadChildren: () => MastersModule
				//loadChildren: '../components/masters/masters.module#MastersModule'
			},
			{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
		]
	},
	//{ path: '', redirectTo: 'main', pathMatch: 'full', data: { title: 'Home' } },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule { }
