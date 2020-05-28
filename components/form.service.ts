import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable()
export class FormService {
	item = [];
	apiUrl = 'http://swayam.econ11.ph/api/';
	id: number = 1;

	constructor(private http:HttpClient) {}

	add(form): Observable<any> {
		form.value.id = this.id++;
		this.item.push(form.value);
		var i = form.value.id;
		return of(this.item[i-1]);//return row
	}

	save(data) {
		let url = this.apiUrl + 'demos';
		console.log(url);

		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
			})
		};
		console.log(httpOptions);

		return this.http.post(url, data, httpOptions)
			.pipe(catchError(this.handleError));
	}

	update(model, data, id) {
		let url = this.apiUrl +  '/editDemo/' + id;

		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
			})
		};

		return this.http.put(url, data, httpOptions)
			.pipe(catchError(this.handleError));
	}

	delete(id) {
		let url = this.apiUrl +  'deleteDemo/' + 15;

		return this.http.delete(url)
			.pipe(catchError(this.handleError));
	}

	getCountriesJson(search = '') {
		let url = this.apiUrl + 'getCountriesJson/';
		return this.http.get(url + search)
			.pipe(catchError(this.handleError));
	}
	
	handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		if (error instanceof Response) {
			return Promise.reject({ 'status': error.status, 'statusText': error.statusText })
		}
		return Promise.reject({ 'status': '', 'statusText': (error.message || error) });
	}
}