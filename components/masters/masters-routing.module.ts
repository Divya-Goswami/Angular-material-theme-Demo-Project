import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MastersComponent } from './masters.component';
import { CityComponent } from './city/city.component';
import { ListViewComponent } from '../../shared/components/list-view/list-view.component';
import { StateComponent } from './state/state.component';
import { CountryComponent } from './country/country.component';
import { UnitsComponent } from './units/units.component';
import { UnitsFormComponent } from './units/units-form/units-form.component';

const mastersRoutes: Routes = [
	{
		path: '',
		component: MastersComponent,
		children: [
			{
				path: 'cities',
				component: ListViewComponent,
				data: { pageTitle: 'Cities' },
			},
			{
				path: 'cities/add',
				component: CityComponent,
				data: { pageTitle: 'Add city' },
			},
			{
				path: 'cities/:id',
				component: CityComponent,
				data: { pageTitle: 'Edit city' },
			},
			{
				path: 'states',
				component: ListViewComponent,
				data: { pageTitle: 'States' },
			},
			{
				path: 'states/add',
				component: StateComponent,
				data: { pageTitle: 'Add State' },
			},
			{
				path: 'states/:id',
				component: StateComponent,
				data: { pageTitle: 'Edit state' },
			},
			{
				path: 'countries',
				component: ListViewComponent,
				data: { pageTitle: 'Countries' },
			},
			{
				path: 'countries/add',
				component: CountryComponent,
				data: { pageTitle: 'Add Country' },
			},
			{
				path: 'countries/:id',
				component: CountryComponent,
				data: { pageTitle: 'Edit Country' },
			},
			{
				path: 'units',
				component: UnitsComponent,
				data: { pageTitle: 'Units' },
				children: [
					{
						path: '',
						component: ListViewComponent,
						data: { pageTitle: 'Units', model: 'units' }
					},
					{
						path: 'add',
						component: UnitsFormComponent,
						data: { pageTitle: 'Add Unit' },
					},
					{
						path: ':id',
						component: UnitsFormComponent,
						data: { pageTitle: 'Edit Unit' },
					},
				]
			},
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(mastersRoutes)],
	exports: [RouterModule]
})
export class MastersRoutingModule { }
