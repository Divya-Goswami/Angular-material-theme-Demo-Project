import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ApiService } from '../../../core/api.service';

@Component({
	selector: 'app-list-view',
	templateUrl: './list-view.component.html',
	styles: []
})
export class ListViewComponent implements OnInit {
	displayedColumns: any;
	dataSource = new MatTableDataSource();
	resultsLength = 0;

	isLoadingResults = true;
	isRateLimitReached = false;

	page = 1;
	perPage = 15;

	@ViewChild(MatPaginator) paginator: MatPaginator;
	//@Input() model: string;
	model: string;

	constructor(private api: ApiService,
		private router: Router,
		private route: ActivatedRoute,
		private location: Location,
		public snackBar: MatSnackBar) {
			this.model = (this.route.snapshot.url[0] ? this.route.snapshot.url[0].path : this.route.snapshot.data.model);
			//console.log(this.route.snapshot.url[0].path);
			//console.log(this.router.url);
			//console.log(this.location.path());
	}

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
	}

	ngOnInit() {
		this.getList();
	}

	onRowClicked(row) {
		this.router.navigate([this.router.url, row['id']]);
	}

	showToast(msg, type = 'error') {
		this.snackBar.open(msg, type, {
			duration: 3000,
			verticalPosition: 'top',
			horizontalPosition: 'end',
			panelClass: ['toast-' + type],
		});
	}

	updatePage(event) {
		this.page = event.pageIndex + 1;
		this.getList();
	}

	getList() {
		this.api.getList(this.model, this.page).subscribe((res) => {
			this.dataSource       = res.data.data;
			this.resultsLength    = res.data.total;
			this.displayedColumns = res.data.displayedColumns;
			this.page             = res.data.page;
			this.perPage          = res.data.perPage;
		}, (err) => {
			this.showToast('Server error occured!');
		});
	}
}
