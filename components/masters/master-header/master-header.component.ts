import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";

@Component({
	selector: 'app-master-header',
	templateUrl: './master-header.component.html',
	styles: ['.breadcrumb { padding: 10px; } .breadcrumb a { text-decoration: none; }']
})
export class MasterHeaderComponent implements OnInit {

	items: Array<string> = [];
	breadcrumbs: Array<Object>;

	constructor(
		private route: ActivatedRoute,
		private router: Router
	) { }

	ngOnInit() {
		// this.router.events
		// 	.filter(e => e instanceof NavigationEnd)
		// 	.subscribe(v => {
		// 		this.items = [];
		// 		this.extract(this.router.routerState.root)
		// 	});
		this.generateBreadcrumsWithUrl();
	}

	generateBreadcrumsWithUrl() {
		this.router.events
			.filter(event => event instanceof NavigationEnd)
			.subscribe(event => {
				this.breadcrumbs = [];
				let currentRoute = this.route.root,
					url = '';
				do {
					let childrenRoutes = currentRoute.children;
					currentRoute = null;
					childrenRoutes.forEach(route => {
						if (route.outlet === 'primary') {
							let routeSnapshot = route.snapshot;

							url += '/' + routeSnapshot.url.map(segment => segment.path).join('/');
							if (route.snapshot.data.pageTitle) {
								this.breadcrumbs.push({
									label: route.snapshot.data.pageTitle,
									url: url
								});
							}
							currentRoute = route;
						}
					})
				} while (currentRoute);
			});
	}

	extract(route) {
		let pageTitle = route.data.value['pageTitle'];
		if (pageTitle && this.items.indexOf(pageTitle) == -1) {
			this.items.push(route.data.value['pageTitle'])
		}

		if (route.children) {
			route.children.forEach(it => {
				this.extract(it)
			})
		}
	}

	navigateTo() {
		//let current = this.breadcrumbs.pop();
		//console.log(current);
		//this.router.navigate([current['url'] + '/add']);
		let url = this.router.url;
		this.router.navigate([url + '/add']);
	}

}
