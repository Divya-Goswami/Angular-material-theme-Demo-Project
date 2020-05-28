import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { MastersRoutingModule } from './masters-routing.module';
import { MastersComponent } from './masters.component';
import { CityComponent } from './city/city.component';
import { StateComponent } from './state/state.component';
import { CountryComponent } from './country/country.component';
import { MasterHeaderComponent } from './master-header/master-header.component';
import { UnitsComponent } from './units/units.component';
import { UnitsFormComponent } from './units/units-form/units-form.component';

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		FormsModule,
		ReactiveFormsModule,
		MastersRoutingModule
	],
	declarations: [
		MastersComponent,
		CityComponent,
		StateComponent,
		CountryComponent,
		MasterHeaderComponent,
		UnitsComponent,
		UnitsFormComponent,
	]
})
export class MastersModule { }
