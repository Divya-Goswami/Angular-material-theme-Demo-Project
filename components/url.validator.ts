import { AbstractControl } from '@angular/forms';

export function ValidateUrl(control: AbstractControl) {
	if(control.value) {
		if ((!control.value.startsWith('https') && !control.value.startsWith('http')) || (!control.value.includes('.io') && !control.value.includes('.com'))) {
			return { validUrl: true };
		}
	}
	return null;
}

export function ValidateWebsite(control: AbstractControl) {
	if(control.value) {
		if (!control.value.includes('.in') && !control.value.includes('.com') && !control.value.includes('.org')) {
			return { validWebsite: true };
		}
	}
	return null;
}