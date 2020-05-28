import { Component, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	Validators
} from '@angular/forms';

import { MatSnackBar } from '@angular/material';

import * as moment from 'moment';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import { ValidateUrl, ValidateWebsite } from '../../components/url.validator';
import { FormService } from '../../components/form.service';

const moment_date =  moment;

export const MY_FORMATS = {
	parse: {
		dateInput: 'DD-MM-YYYY',
	},
	display: {
		dateInput: 'DD-MM-YYYY',
		monthYearLabel: 'MMMM YYYY',
		dateA11yLabel: 'DD-MM-YYYY',
		monthYearA11yLabel: 'MMMM YYYY',
	},
}

@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styles: ['.form > * { width:100%; }'],
	providers: [{provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
		{provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
	]
})
export class FormComponent implements OnInit {
	demoForm: FormGroup;
	state_values = [
		{code: "AP", name:"Andhra Pradesh"},
		{code: "AR", name: "Arunachal Pradesh"},
		{code: "AS", name: "Assam"},
		{code: "BR", name: "Bihar"},
		{code: "CG", name: "Chhattisgarh"},
		{code: "CH", name: "Chandigarh"},
		{code: "DN", name: "Dadra and Nagar Haveli"},
		{code: "DD", name: "Daman and Diu"},
		{code: "DL", name: "Delhi"},
		{code: "GA", name: "Goa"},
		{code: "GJ", name: "Gujarat"},
		{code: "HR", name: "Haryana"},
		{code: "HP", name: "Himachal Pradesh"},
		{code: "JK", name: "Jammu and Kashmir"},
		{code: "JH", name: "Jharkhand"},
		{code: "KA", name: "Karnataka"},
		{code: "KL", name: "Kerala"},
		{code: "MP", name: "Madhya Pradesh"},
		{code: "MH", name: "Maharashtra"},
		{code: "MN", name: "Manipur"},
		{code: "ML", name: "Meghalaya"},
		{code: "MZ", name: "Mizoram"},
		{code: "NL", name: "Nagaland"},
		{code: "OR", name: "Orissa"},
		{code: "PB", name: "Punjab"},
		{code: "PY", name: "Pondicherry"},
		{code: "RJ", name: "Rajasthan"},
		{code: "SK", name: "Sikkim"},
		{code: "TN", name: "Tamil Nadu"},
		{code: "TR", name: "Tripura"},
		{code: "UP", name: "Uttar Pradesh"},
		{code: "UK", name: "Uttarakhand"},
		{code: "WB", name: "West Bengal"}
	];

	university_group = [
		{
			state_name: "Andhra Pradesh",
			university: [
				{ name: 'Andhra Pradesh University' }
			]
		},
		{
			state_name: "Arunachal Pradesh",
			university: [
				{ name:'Arunachal Pradesh University' }
			]
		},
		{
			state_name: "Assam",
			university: [
				{ name: 'Assam University' }
			]
		},
		{
			state_name: "Bihar",
			university: [
				{ name: 'Bihar University' }
			]
		},
		{
			state_name: "Chhattisgarh",
			university: [
				{ name: 'Chhattisgarh University' }
			]
		},
		{
			state_name: "Chandigarh",
			university: [
				{ name: 'Chandigarh University' }
			]
		},
		{
			state_name: "Delhi",
			university: [
				{ name: 'Delhi University' }
			]
		},
		{
			state_name: "Goa",
			university: [
				{ name: 'Goa University' }
			]
		},
		{
			state_name: "Gujarat",
			university: [
				{ name: 'Gujarat University' },
				{ name: 'Gujarat Technological University' },
				{ name: 'Kutch University' },
			]
		},
	];

	radio_castes     = ['SC', 'ST', 'OBC', 'SEBC', 'General'];

	minDate     = moment("2015-01-01");
	maxDate     = moment("2020-12-31");
	start_date  = moment("2018-08-07");
	display_date: any;

	countries_values = [];
	status:boolean = false;

	dayFilter = (date):boolean => {
		var day = moment(date).day();
		return (day != 0 && day != 6);
	};

	constructor(private formBuilder: FormBuilder,
		private formService : FormService,
		public snackBar: MatSnackBar) {
	this.demoForm = formBuilder.group({
			'id': [1], 
			'name': ['Diya', [Validators.required,
				Validators.pattern('[a-zA-Z]+')]
			],
			'amount': [50000, [Validators.required,
				Validators.pattern('[0-9]+')]
			],
			'email': ['divya.goswami@gmail.com', [Validators.required,
				Validators.email]
			],
			'password': ['divyagoswami', [Validators.required,
				Validators.minLength(8),
				Validators.maxLength(16)]
			],
			'telephone_no': ['123456'],
			'address': ['Bhuj', Validators.required],
			'url': ['https://www.example.io', [Validators.required, 
				ValidateUrl]
			],
			'website': ['www.example.com', [Validators.required,
				ValidateWebsite]
			],
			'city': ['Bhuj'],
			'state': [null, Validators.required],
			'university': ['Gujarat University', Validators.required],
			'gender': ['Female'],
			'caste': ['OBC'],
			'playing': [null],
			'visiting': [true],
			'reading': [null],
			'date': [moment_date(), [Validators.required]],
			'joining_date': [moment_date(), [Validators.required]],
			'release_date': [null],
			'last_date': [this.start_date],
			'transfer_date': [moment_date()],
			'country_id': 0,
			'country': ['', Validators.required],
		});
	}

	ngOnInit() {}

	onSubmit() {
		if(this.demoForm.valid) {
			this.demoForm.value.date          = moment(this.demoForm.value.date).format('YYYY-MM-DD');
			this.demoForm.value.joining_date  = moment(this.demoForm.value.joining_date).format('YYYY-MM-DD');
			this.demoForm.value.release_date  = moment(this.demoForm.value.release_date).format('YYYY-MM-DD');
			this.demoForm.value.last_date     = moment(this.demoForm.value.last_date).format('YYYY-MM-DD');
			this.demoForm.value.transfer_date = moment(this.demoForm.value.transfer_date).format('YYYY-MM-DD');
			
			this.demoForm.value.state         = this.demoForm.value.state.length > 0 ? this.demoForm.value.state.join(", ") : this.demoForm.value.state;

			this.formService.add(this.demoForm).subscribe((result) => {
				console.log(result);
				this.status = true;
				if(result.id) {
					this.status = false;
					this.showToast('Record Inserted Successfully........! From Submit','Success');
					this.demoForm.reset();
				}
			},(error) => {
				console.log("Error :: " + error);
					this.showToast('Server Error........! From Submit');
			});
		}
		else
			this.showToast('Pls Enter Valid Values of Fields..!');
	}

	DbSave() {
		if(this.demoForm.valid) {
			this.formService.save(this.demoForm.value).subscribe((res) => {
				if(res) {
					this.showToast(res.data['message']+'...! From DbSave', 'success');
					this.demoForm.reset();
				}
			}, (err) => {
				console.log(err);
				this.showToast('Server Error........! From DbSave!');
			});
		}
		else
			this.showToast('Pls Enter Valid Values of Fields..!');
	}

	DbDelete() {
		this.formService.delete(this.demoForm.value.id).subscribe((res) => {
			if(res) {
				this.showToast(res.data['message']+'...! From DbDelete', 'success');
				this.demoForm.reset();
			}
		}, (err) => {
			console.log(err);
			this.showToast('Record Already Deleted........! From DbDelete!');
		});
	}

	List() {
		console.log("in List");
	}

	addEvent(event: MatDatepickerInputEvent<Date>) {
		this.display_date =  moment(event.value).format('DD-MM-YYYY');
	}

	showToast(msg, type = 'error') {
		this.snackBar.open(msg, type, {
			duration: 3000,
			verticalPosition: 'top',
			horizontalPosition: 'end',
			panelClass: ['toast-' + type],
		});
	}

	getCountriesJson() {
		this.countries_values = [];
		if (this.demoForm.value.country != '') {
			this.formService.getCountriesJson(this.demoForm.value.country).subscribe((res) => {
				if(res.data.data.length > 0) {
					for(let d of res.data.data){
						this.countries_values.push(d.name + ' - ' + d.code);
						this.demoForm.get('country_id').setValue(d.id);
					}
				}
				else {
					this.countries_values.push("No Country Found");
				}
			}, (err) => {
				this.showToast('Server error occured!'+ err);
			});
		}
	}
}
