import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { of } from 'rxjs/observable/of';

@Injectable()
export class ApiService {
	apiUrl = 'http://swayam.idex14.ph/api/';
	arr    = [];

	constructor(private http: HttpClient) { }

	//For Common ListView Component to show any model data
	getList(model, page, search = '') {
		let url = this.apiUrl + model;

		return this.http.get(url + '?page=' + page + '&search=' + encodeURI(search))
			.pipe(catchError(this.handleError));
	}

	getRowById(model, id) {
		let url = this.apiUrl + model;

		return this.http.get(url + '/' + id)
	}

	save(model, data) {
		let url = this.apiUrl + model;

		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
			})
		};

		return this.http.post(url, data, httpOptions)
			.pipe(catchError(this.handleError));
	}

	update(model, data, id) {
		let url = this.apiUrl + model + '/' + id;

		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
			})
		};

		return this.http.put(url, data, httpOptions)
			.pipe(catchError(this.handleError));
	}

	delete(model, id) {
		let url = this.apiUrl + model + '/' + id;

		return this.http.delete(url)
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
