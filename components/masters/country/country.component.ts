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
  selector: 'app-country',
  templateUrl: './country.component.html',
  styles: []
})
export class CountryComponent implements OnInit {
	idexForm: FormGroup;
	id: number = 0;

	constructor(private route: ActivatedRoute,
		private fb: FormBuilder,
		private snackBar: MatSnackBar,
		public router: Router,
		private api: ApiService) {

		// To initialize FormGroup
		this.idexForm = fb.group({
			'code': [null, [Validators.required, Validators.maxLength(2)]],
			'name': [null, Validators.required],
		});

		this.route.params.subscribe((params) => {
			this.id = params.id || 0;

			if (this.id != 0) {
				this.api.getRowById('countries', this.id).subscribe((res) => {
					if (res['data'].data) {
						this.idexForm.setValue({
							code: res['data'].data.code,
							name: res['data'].data.name,
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
		//form.state_id = this.state.value;
		if (this.id != 0) {
			this.api.update('countries', form.value, this.id).subscribe((res) => {
				this.showToast(res.data['message'], 'success');
				this.router.navigate(['masters/countries']);
			}, (err) => {
				console.log(err);
				this.showToast('Server error occured!');
			});
		} else {
			this.api.save('countries', form.value).subscribe((res) => {
				this.showToast(res.data['message'], 'success');
				this.router.navigate(['masters/countries']);
			}, (err) => {
				console.log(err);
				this.showToast('Server error occured!');
			});
		}
	}

	onDelete() {
		if (confirm("Are you sure to delete ?")) {
			this.api.delete('countries', this.id).subscribe((res) => {
				this.showToast(res.data['message'], 'success');
				this.router.navigate(['masters/countries']);
			}, (err) => {
				console.log(err);
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
