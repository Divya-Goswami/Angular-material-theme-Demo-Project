import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import {
	FormBuilder,
	FormGroup,
	Validators,
	FormsModule,
	NgForm,
	FormControl
} from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

import { ApiService } from '../../../core/api.service';

@Component({
	selector: 'app-city',
	templateUrl: './city.component.html',
	styles: []
})
export class CityComponent implements OnInit {
	state: FormControl = new FormControl();
	searchStates = [];

	idexForm: FormGroup;
	id: number = 0;

	constructor(private route: ActivatedRoute,
		private fb: FormBuilder,
		private snackBar: MatSnackBar,
		public router: Router,
		private api: ApiService) {

		// To initialize FormGroup
		this.idexForm = fb.group({
			'name': [null, Validators.required],
			'pincode': [null, Validators.required],
			'state_id': [0]
		});

		this.state.valueChanges
			.debounceTime(400)
			.subscribe(data => {
				this.api.getList('states', 1, data).subscribe(response => {
					this.searchStates = response.data.data;
				})
			});

		this.route.params.subscribe((params) => {
			this.id = params.id || 0;

			if (this.id != 0) {
				this.api.getRowById('cities', this.id).subscribe((res) => {
					if (res['data'].data) {
						this.idexForm.setValue({
							name: res['data'].data.name,
							pincode: res['data'].data.pincode,
							state_id: res['data'].data.state_id,
						});
					} else {
						this.id = 0;
						this.showToast('Record not found !');
					}
				}, (err) => {
					console.log(err);
				});
			}
		});

	}

	ngOnInit() {
	}

	onFormSubmit(form) {
		form.value.state_id = this.state.value;

		//form.state_id = this.state.value;
		if (this.id != 0) {
			this.api.update('cities', form.value, this.id).subscribe((res) => {
				this.showToast(res.data['message'], 'success');
				this.router.navigate(['masters/cities']);
			}, (err) => {
				console.log(err);
				this.showToast('Server error occured!');
			});
		} else {
			this.api.save('cities', form.value).subscribe((res) => {
				this.showToast(res.data['message'], 'success');
				this.router.navigate(['masters/cities']);
			}, (err) => {
				console.log(err);
				this.showToast('Server error occured!');
			});
		}
	}

	showToast(msg, type = 'error') {
		this.snackBar.open(msg, type, {
			duration: 3000,
			verticalPosition: 'top',
			horizontalPosition: 'end',
			panelClass: ['toast-' + type],
		});
	}

}
