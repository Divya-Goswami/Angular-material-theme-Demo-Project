import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-masters',
	template: `
	<app-master-header></app-master-header>
	<router-outlet></router-outlet>
	`,
})
export class MastersComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
