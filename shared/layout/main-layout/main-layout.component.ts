import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { MediaMatcher } from '@angular/cdk/layout';
import 'rxjs/add/operator/filter';

@Component({
	selector: 'app-main-layout',
	templateUrl: './main-layout.component.html',
	styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
	title: string = 'Home';
	mobileQuery: MediaQueryList;
	private _mobileQueryListener: () => void;

	menu = [
		{ "name": "Form ", "link": "/form" },
		{
			"name": "Dashboard",
			"link": "/dashboard",
			"icon": "dashboard",
			"items": [
				{ "name": "Default", "link": "/" },
				{ "name": "Import", "link": "/" },
				{ "name": "Export", "link": "/" },
				{ "name": "Transport", "link": "/" },
				{ "name": "Accounting", "link": "/" },
			]
		},
		{
			"name": "Master",
			"link": "/",
			"icon": "computer",
			"items": [
				{ "name": "City List", "link": "/masters/cities" },
				{ "name": "State List", "link": "/masters/states" },
				{ "name": "Country List", "link": "/masters/countries" },
				{ "name": "Port List", "link": "/masters/ports" },
				{ "name": "Indian Port List", "link": "/masters/indianports" },
				{ "name": "Unit List", "link": "/masters/units" },
				{ "name": "Package Types", "link": "/masters/packagetypes" },
				{ "name": "Product List", "link": "/masters/products" },
				{ "name": "Currency List", "link": "/masters/currencies" },
				{ "name": "Container Type List", "link": "/masters/containertypes" },
				{ "name": "Warehouse List", "link": "/masters/warehouses" },
				{ "name": "Bank List", "link": "/masters/banks" },
				{ "name": "Bank Branches", "link": "/masters/bankbranches" },
				{ "name": "Port Rents", "link": "/masters/portrents" },
				{ "name": "Terminal", "link": "/masters/terminals" },
				{ "name": "Godown List", "link": "/masters/godowns" },
				{ "name": "Pickup Location", "link": "/masters/pickuplocations" },
				{ "name": "Vehicle Master", "link": "/masters/vehicles" },
				{ "name": "Vehicle Data", "link": "/masters/vehicledatas" },
				{ "name": "Pilferages", "link": "/masters/pilferages" },
				{ "name": "Document Template", "link": "/masters/documenttemplates" },
				{ "name": "Job Document Types", "link": "/masters/documenttypes" },
				{ "name": "KYC Document Types", "link": "/masters/kycdocumenttypes" },
				{ "name": "KYC", "link": "/masters/kycs" },
				{ "name": "Bill Template", "link": "/masters/billtemplates" },
				{ "name": "Narration Master", "link": "/masters/narrations" },
				{ "name": "Resources List", "link": "/masters/resources" },
				{ "name": "Cheque Issue", "link": "/masters/issuedcheques" },
				{ "name": "PDC Pending List", "link": "/masters/pdcpendings" },
				{ "name": "CFS / Line Rate List", "link": "/masters/agentrates" },
				{ "name": "Party Master", "link": "/masters/parties" },
				{ "name": "Party Rate", "link": "/masters/partyrates" },
				{ "name": "Vessel Master", "link": "/masters/vessels" },
				{ "name": "Agent Master", "link": "/masters/agents" },
				{ "name": "Staff Master", "link": "/masters/staffs" },
				{ "name": "Staff Leaves", "link": "/masters/staffleaves" },
				{ "name": "Salary Register", "link": "/masters/salaryregisters" },
				{ "name": "Consignee Master (Export)", "link": "/masters/consignees" }
			]
		},
		{
			"name": "Accounting",
			"link": "/",
			"icon": "account_balance",
			"items": [
				{ "name": "Company List", "link": "accounting/Companies" },
				{ "name": "Account Groups", "link": "accounting/AccountGroups" },
				{ "name": "Bill Items", "link": "accounting/BillItems" },
				{ "name": "TDS", "link": "accounting/TdsClasses" },
				{ "name": "Goods & Services", "link": "accounting/GoodsServices" },
				{ "name": "Service Tax Category", "link": "accounting/StaxCategories" },
				{ "name": "Ledgers", "link": "accounting/Ledgers" },
				{ "name": "Voucher Books", "link": "accounting/VoucherBooks" },
				{ "name": "Voucher Re-Numbering", "link": "accounting/Renumbering" },
				{ "name": "Voucher Authorization", "link": "accounting/Authorization" },
				{ "name": "Voucher Documents", "link": "accounting/VoucherDocuments", "hide": true },
				{
					"name": "Reports",
					"link": "accounting/reports",
					"items":
						[
							{ "name": "TDS", "link": "accounting/reports/tds" },
							{ "name": "TDS Party List", "link": "accounting/reports/tds_party" },
							{ "name": "Transportation TDS Report", "link": "accounting/reports/tds_transport" },
							{ "name": "TDS Partywise", "link": "accounting/reports/tds_partywise" },
							{ "name": "IT Party List", "link": "accounting/reports/it_party" },
							{ "name": "CENVAT", "link": "accounting/reports/cenvat" },
							{ "name": "Service Tax", "link": "accounting/reports/stax" },
							{ "name": "Service Tax (Bulk/Container)", "link": "accounting/reports/stax_bulk_container" },
							{ "name": "Internal Reconciliation", "link": "accounting/reports/internal_reconciliation" },
							{ "name": "Ledger", "link": "accounting/reports/ledger", "email": true },
							{ "name": "Group Ledger", "link": "accounting/reports/group", "email": true },
							{ "name": "Account Group Ledgers", "link": "accounting/reports/account_group" },
							{ "name": "Parent Ledger", "link": "accounting/reports/parent_group" },
							{ "name": "Journal", "link": "accounting/reports/voucher_journal" },
							{ "name": "Invoice", "link": "accounting/reports/voucher_invoice" },
							{ "name": "Debit Note", "link": "accounting/reports/voucher_debit_note" },
							{ "name": "Credit Note", "link": "accounting/reports/voucher_credit_note" },
							{ "name": "Remittance Report", "link": "accounting/reports/remittance" },
							{ "name": "Reimbersment", "link": "accounting/reports/reimbursement" },
							{ "name": "Bills Pending", "link": "accounting/reports/bill/pending" },
							{ "name": "Debit Note / Invoice Pending", "link": "accounting/reports/bill/debit_invoice" },
							{ "name": "Billing Reconcilation", "link": "accounting/reports/reconcilation" },
							{ "name": "Vesselwise Billing", "link": "accounting/reports/vessel_billing" },
							{ "name": "Bill Item Service Tax", "link": "accounting/reports/bill_item_stax" },
							{ "name": "Bill Items Register", "link": "accounting/reports/bill_item" },
							{ "name": "Bill Expense Register", "link": "accounting/reports/bill_expense" },
							{ "name": "Bill Expense Summary", "link": "accounting/reports/bill_expense_summary" },
							{ "name": "Vessel Income / Expense Register", "link": "accounting/reports/vessel_income_expense" },
							{ "name": "Salary Register", "link": "accounting/reports/salary_register" },
							{ "name": "Trial Balance", "link": "accounting/reports/trial_balance" },
							{ "name": "Trial Balance (Closing)", "link": "accounting/reports/trial_balance_closing" },
							{ "name": "Profit & Loss (GST)", "link": "accounting/reports/profit_loss" },
							{ "name": "Balance Sheet", "link": "accounting/reports/balance_sheet" },
							{ "name": "GST (Inward Supply Old)", "link": "accounting/reports/inward_old" },
							{ "name": "GST (Inward Supply)", "link": "accounting/reports/inward" },
							{ "name": "GST (Outward Supply)", "link": "accounting/reports/outward" },
							{ "name": "GST Form-3B", "link": "accounting/reports/gst3b" },
							{ "name": "GST (Groupwise)", "link": "accounting/reports/gst3b_groupwise" },
							{ "name": "GST Return-1", "link": "accounting/reports/gstr1" },
							{ "name": "GST Auto Draft", "link": "accounting/reports/auto_draft" }
						]
				}
			]
		},
		{
			"name": "Import",
			"link": "/",
			"icon": "archive",
			"items": [
				{ "name": "Jobs Master", "link": "import/Jobs" },
				{ "name": "Container", "link": "import/Jobs/id/Containers", "hide": true },
				{ "name": "Delivery Factory", "link": "import/Jobs/id/Deliveries", "hide": true },
				{ "name": "Delivery Dock", "link": "import/Jobs/id/DeliveryDocks", "hide": true },
				{ "name": "Duties and Payments", "link": "import/Jobs/id/ImportDetails", "hide": true },
				{ "name": "Document", "link": "import/Jobs/id/Documents", "hide": true },
				{ "name": "Attached Document", "link": "import/Jobs/id/AttachedDocuments", "hide": true },
				{ "name": "Log List", "link": "import/Jobs/id/LogLists", "hide": true },
				{ "name": "Bill", "link": "import/Jobs/id/Bills", "hide": true },
				{ "name": "Covering Letter", "link": "import/Jobs/id/CoveringLetters", "hide": true },
				{ "name": "Attach Documents", "link": "import/Attach_document", },
				{ "name": "Bulk Pending List", "link": "import/Bulk_pending", },
				{ "name": "Wharfage List", "link": "import/Wharfage", },
				{ "name": "Demurrages", "link": "import/Demurrage", },
				{ "name": "Forest TP", "link": "import/ForestTp", },
				{ "name": "Container Duty List", "link": "import/Container_duty", },
				{ "name": "Container Pending List", "link": "import/ContainerPending", },
				{ "name": "Container Update", "link": "import/ContainerUpdate", },
				{ "name": "Factory Delivery", "link": "import/FactoryDelivery", },
				{ "name": "Docks Delivery", "link": "import/DockDelivery", },
				{ "name": "Logs Master List", "link": "import/LogLists", },
				{ "name": "Logs Deliveries", "link": "import/LogDeliveries", },
				{ "name": "Non Tally Allocation", "link": "import/LogNonTally", },
				{ "name": "Pine Logs Master List", "link": "import/PineLogLists", },
				{ "name": "Pine Logs Deliveries", "link": "import/PineLogDeliveries", },
				{
					"name": "Reports",
					"link": "import/reports",
					"items":
						[
							{ "name": "Import Job Register", "link": "import/reports/job_register" },
							{ "name": "Import Icegate Register (BE)", "link": "import/reports/icegate_be" },
							{ "name": "Import Icegate Register (OOC)", "link": "import/reports/icegate_be_ooc" },
							{ "name": "Import Icegate Group Register", "link": "import/reports/icegate_be_group" },
							{ "name": "Custom Duty", "link": "import/reports/custom_duty" },
							{ "name": "InBond / ExBond Report", "link": "import/reports/bond" },
							{ "name": "CBM Average Report", "link": "import/reports/cbm_average" },
						]
				},
				{
					"name": "Log Reports",
					"link": "import/log_reports",
					"items":
						[
							{ "name": "Logs Direct Delivery", "link": "import/log_reports/log_delivery_details_all" },
							{ "name": "Logs Delivery Report", "link": "import/log_reports/log_report_details_all" },
							{ "name": "Logs Vessel Report", "link": "import/log_reports/log_vessel" },
							{ "name": "Logs Vehicle Report", "link": "import/log_reports/log_vehicle" },
							{ "name": "Logs Daily Report", "link": "import/log_reports/log_report_daily_all" },
							{ "name": "Logs Daily Delivery (BL-wise)", "link": "import/log_reports/daily_delivery_blwise_daily_all" },
							{ "name": "Logs Pending Report", "link": "import/log_reports/log_pending" },
							{ "name": "Logs Shifting Report", "link": "import/log_reports/log_shifting" },
							{ "name": "Logs Shifting Summary", "link": "import/log_reports/log_shifting_transporter" },
							{ "name": "Logs Ground Rent Report", "link": "import/log_reports/log_gr" },
							{ "name": "By Road CHA-wise Report", "link": "import/log_reports/by_road_loading" },
							{ "name": "By Road Vessel-wise Report", "link": "import/log_reports/by_road_loading_vessel" },
							{ "name": "Pine Ground Rent Report", "link": "import/log_reports/pine_gr" },
							{ "name": "Pine Logs Delivery BL-wise", "link": "import/log_reports/pine_log_delivery" },
							{ "name": "Pine Logs Delivery Email", "link": "import/log_reports/pine_daily_delivery", "email": true },
							{ "name": "Pine Logs Daily Report", "link": "import/log_reports/pine_log_report_daily_all" },
							{ "name": "Pine Logs Vessel Report", "link": "import/log_reports/pine_log_vessel" },
							{ "name": "Vesselwise Report Email", "link": "import/log_reports/log_delivery_vesselwise", "email": true },
							{ "name": "Group wise", "link": "import/log_reports/log_delivery_groupwise" }
						]
				}
			]
		},
		{
			"name": "Export",
			"link": "/",
			"icon": "unarchive",
			"items": [
				{ "name": "Freight Rates", "link": "export/Rate" },
				{ "name": "Freight Quote", "link": "export/Quotation" },
				{ "name": "Booking Master", "link": "export/Booking" },
				{ "name": "Jobs Master", "link": "export/Jobs" },
				{ "name": "Export Detail", "link": "export/Jobs/id/ExportDetails" },
				{ "name": "Job Invoice", "link": "export/Jobs/id/JobInvoices" },
				{ "name": "Containers", "link": "export/Jobs/id/Containers" },
				{ "name": "Cargo Arrival", "link": "export/Jobs/id/CargoArrivals" },
				{ "name": "Stuffings", "link": "export/Jobs/id/Stuffings" },
				{ "name": "Gateins", "link": "export/Jobs/id/Gateins" },
				{ "name": "Docins", "link": "export/Jobs/id/Docins" },
				{ "name": "Onboards", "link": "export/Jobs/id/Onboards" },
				{ "name": "Dispatch Detail", "link": "export/Jobs/id/DispatchDetails" },
				{ "name": "Export Activity", "link": "export/Jobs/id/ExprotActivities" },
				{ "name": "Documents", "link": "export/Jobs/id/Documents" },
				{ "name": "Attached Documents", "link": "export/Jobs/id/AttachedDocuments" },
				{ "name": "Bills", "link": "export/Jobs/id/Bills" },
				{ "name": "Photos", "link": "export/Jobs/id/Photos" },
				{ "name": "Icegate SeaIGM", "link": "tracking/icegate_seaigm" },
				{ "name": "Attach Documents", "link": "export/AttachDocuments" },
				{ "name": "Booking Pending List", "link": "export/PendingBookings" },
				{ "name": "Custom Pending List", "link": "export/PendingCustoms" },
				{ "name": "Shipment Pending List", "link": "export/PendingShipments" },
				{ "name": "Pending EP/MR/ARE1", "link": "export/PendingEma" },
				{ "name": "Stuffing Permissions", "link": "export/StuffingPermissions" },
				{ "name": "Services List", "link": "export/Services" },
				{
					"name": "Reports",
					"link": "export/reports",
					"items": [
						{ "name": "Export Icegate Register (SB)", "link": "export/reports/icegate_sb" },
						{ "name": "Pickup Program", "link": "export/reports/pickup" },
						{ "name": "Vessel Planning", "link": "export/reports/vessel_planning" },
						{ "name": "EP Pending List", "link": "export/reports/ep_pending" },
						{ "name": "MR Pending List", "link": "export/reports/mr_pending" },
						{ "name": "ARE1 Pending List", "link": "export/reports/are1_pending" },
						{ "name": "Short Shipment List", "link": "export/reports/short_shipment" },
						{ "name": "Consignment Report", "link": "export/reports/consignment_report" },
						{ "name": "Container Report", "link": "export/reports/container_report" },
						{ "name": "Volume Report", "link": "export/reports/volume_report" },
						{ "name": "Drawback Report", "link": "export/reports/drawback_report" },
						{ "name": "Job Register Report", "link": "export/reports/export_job_register" }
					]
				}
			]
		},
		{
			"name": "Transport",
			"link": "/",
			"icon": "airport_shuttle",
			"items": [
				{ "name": "Transporter Container Rate", "link": "transport/transporter_container_rates" },
				{ "name": "Fuel Pumps", "link": "transport/fuel_pumps" },
				{ "name": "Fuel Rates", "link": "transport/fuel_rates" },
				{ "name": "Locations", "link": "transport/locations" },
				{ "name": "Driverss", "link": "transport/drivers" },
				{ "name": "Rates", "link": "transport/transport_rates" },
				{ "name": "Trip Masters", "link": "transport/trip_masters" },
				{ "name": "Trips", "link": "transport/trips" },
				{ "name": "Happays", "link": "transport/happays" },
				{ "name": "Trip Advances", "link": "transport/trip_advances" },
				{ "name": "Fuel Challans", "link": "transport/fuel_challans" },
				{ "name": "Fuel Payment", "link": "transport/fuel_payments" },
				{ "name": "Staff Fuel Challans", "link": "transport/staff_fuel_challans" },
				{
					"name": "Reports",
					"link": "transport/reports",
					"items": [
						{ "name": "Trips Report", "link": "transport/reports/trip" },
						{ "name": "Vehicle Performance", "link": "transport/reports/vehicle_performance" },
						{ "name": "Fuel Misc Report", "link": "transport/reports/fuel_misc" },
						{ "name": "Vehicle Station Summary", "link": "transport/reports/vehicle_station_summary" },
						{ "name": "Party Station Summary", "link": "transport/reports/ledger_station_summary" },
						{ "name": "Vessel Station Summary", "link": "transport/reports/vessel_station_summary" },
						{ "name": "Product Station Summary", "link": "transport/reports/product_station_summary" },
						{ "name": "Cargo Station Summary", "link": "transport/reports/cargo_station_summary" },
						{ "name": "Trips Duplicate Report", "link": "transport/reports/trip_duplicate" },
						{ "name": "Vesselwise Trips Report", "link": "transport/reports/vessel_trip" },
						{ "name": "Staff Fuel Challan Report", "link": "transport/reports/staff_fuel_challan" },
						{ "name": "Vehicle Fuel Challan Report", "link": "transport/reports/vehicle_fuel_challan" },
						{ "name": "Fuel Payment Report", "link": "transport/reports/fuel_payment" },
						{ "name": "Vehicle Data Report", "link": "transport/reports/vehicle_data" },
						{ "name": "Happay Report", "link": "transport/reports/happay" }
					]
				}]
		},
		{
			"name": "Inventory",
			"link": "/",
			"icon": "storage",
			"items":
				[
					{ "name": "Product List", "link": "inventory/inventory_product" },
					{ "name": "Purchase Order", "link": "inventory/purchase_order" },
					{ "name": "Purchase Order Report", "link": "inventory/purchase_order_report" },
					{ "name": "Stock Register", "link": "inventory/stock_register" },
					{ "name": "Job Order", "link": "inventory/job_order" },
					{ "name": "Job Order Report", "link": "inventory/job_order_report" },
				]
		},
		{
			"name": "Igm",
			"link": "/",
			"icon": "computer",
			"items": [
				{ "name": "Package Types", "link": "igm/packagetypes" },
				{ "name": "Unit Types", "link": "igm/unittypes" },
				{ "name": "Container ISO Codes", "link": "igm/containeriso" },
				{ "name": "Container", "link": "igm/container" },
				{ "name": "Terminal / CFS", "link": "igm/terminalcfs" },
				{ "name": "Vessels", "link": "igm/vessels" },
				{ "name": "Cargos", "link": "igm/cargos" },
				{ "name": "DO Desk", "link": "igm/deliveryorders" },
				{
					"name": "Reports",
					"link": "igm/reports",
					"items": [
						{ "name": "IGM Register", "link": "igm/reports/igm_register" },
						{ "name": "IGM Email", "link": "igm/reports/igm_email" }
					]
				}]
		},
		{
			"name": "Reports",
			"link": "/",
			"icon": "receipt",
			"items": [
				{ "name": "Sms Logs", "link": "reports/sms_logs" },
				{ "name": "CHA Register", "link": "reports/cha" },
				{ "name": "Container Register (CFS)", "link": "reports/container_cfs" },
				{ "name": "Container Register (Invoice)", "link": "reports/container_invoice" },
				{ "name": "Vessel Register (Hardwood)", "link": "reports/vessel" },
				{ "name": "Vessel Register (Pine)", "link": "reports/vessel_pine" },
				{ "name": "Party Pending List", "link": "reports/party" },
				{ "name": "KYC Pending List", "link": "reports/kyc" },
				{ "name": "Vessel Pending List", "link": "reports/vessel_pending" },
				{ "name": "Pending Scanned Voucher", "link": "reports/scanned_pending" },
				{ "name": "Vessel Master Report", "link": "reports/vessel_master" }
			]
		},
		{
			"name": "Utilities",
			"link": "/",
			"icon": "settings_applications",
			"items": [
				{ "name": "Import from VisualImpex", "link": "utilities/vi" },
				{ "name": "Export to Tally", "link": "utilities/tallyexport" },
				{ "name": "Email Report", "link": "utilities/email_report" }
			]
		},
	];

	constructor(changeDetectorRef: ChangeDetectorRef,
		media: MediaMatcher,
		private route: ActivatedRoute,
		private router: Router) {

		this.mobileQuery = media.matchMedia('(max-width: 600px)');
		this._mobileQueryListener = () => changeDetectorRef.detectChanges();

		this.mobileQuery.addListener(this._mobileQueryListener);
	}

	ngOnInit() {
		this.router.events
			.filter(e => e instanceof NavigationEnd)
			.forEach(e => {
				this.title = this.route.root.firstChild.snapshot.data['title'];
			});

			//console.log('configured routes: ', this.router.config);
	}

	ngOnDestroy(): void {
		this.mobileQuery.removeListener(this._mobileQueryListener);
	}
}
