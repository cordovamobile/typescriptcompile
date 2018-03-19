
import { Component } from '@angular/core';
import { Nav, /*IonicPage,*/ NavController, NavParams, ToastController, AlertController  } from 'ionic-angular';

import { Dataprovider } from '../../providers/dataprovider';
import { ApplicationService } from '../../providers/application-service';

//import { BusinessListPage } from '../../pages/business-list/business-list';
import { OcBusinessItemAddPage } from '../../pages/oc-business-item-add/oc-business-item-add';
import { OcBusinessItemEditPage } from '../../pages/oc-business-item-edit/oc-business-item-edit';
import { OcBusinessContactListPage } from '../../pages/oc-business-contact-list/oc-business-contact-list';
import { OcBusinessSaleinvoiceListPage } from '../../pages/oc-business-saleinvoice-list/oc-business-saleinvoice-list';

//@IonicPage()
@Component({
	selector: 'page-oc-business-item-list',
	templateUrl: 'oc-business-item-list.html',
})
export class OcBusinessItemListPage {
	
	business: any;
	statelist: any;
	items: any;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public dataprovider: Dataprovider,			
		public toastCtrl: ToastController,
		public alertCtrl: AlertController ,
		public nav: Nav,
		public application_service: ApplicationService
	) {
		
		this.business = {};
		this.statelist = {};
		
		if (this.navParams.get('business')) {
			this.business = this.navParams.get('business');
		}
		console.log( JSON.stringify( this.business ) );
		
		this.business.items = [
			{
				"item" : "",
				"item_name" : "",
			}
		];
		
		
		
		
		var self = this;

		console.log('requestAPI being called...');
		self.dataprovider.requestAPI(
			'get',
			'programming/hbgstapi/trunk/api/getitembybuid/' + self.business.buid,
			self.business,
			'',
			true, /* Token To Not Be Sent To API */
			
			function(response) {
				
				/* Logging 'Request Has Responded' event */
				console.log( 'requestAPI responded...' );
				console.log( 'requestAPI Response: "' + JSON.stringify( response ) + '"' );
				console.log( 'requestAPI Response Type: ' + response.status );
				
				
				self.items = response.itemlist;
				
				console.log( 'Business Details Retreived : ' + JSON.stringify( self.business ) );
				
				

			}
		);
		
		
		
		
		
		
		
	}
	
	ionViewDidLoad() {
		console.log('ionViewDidLoad OcBusinessItemListPage');
	}
	
	open_item_add_page() {
		this.nav.push( OcBusinessItemAddPage , { 'business' : this.business } );
	}
	
	
	
	edit_item(i) {
		
		this.nav.push( OcBusinessItemEditPage , { 'business' : this.business , 'item' : i } );
		
	}
	
	
	
	delete_item(i,n) {
		
		var self = this;

		console.log('requestAPI being called...');
		self.dataprovider.requestAPI(
			'delete',
			'programming/hbgstapi/trunk/api/deleteitem/' + i.itemid,
			{},
			'Deleting Item...',
			true, /* Token To Not Be Sent To API */
			
			function(response) {
				
				/* Logging 'Request Has Responded' event */
				console.log( 'requestAPI responded...' );
				console.log( 'requestAPI Response: "' + JSON.stringify( response ) + '"' );
				console.log( 'requestAPI Response Type: ' + response.status );
				
				if( response.status == 'success' ) {
					self.items.splice(n, 1);
				}
				
				console.log( 'Business Details Retreived : ' + JSON.stringify( self.business ) );
				
				

			}
		);
		
	}
	
	openPage( page ) {
		var redirect;
		if( page == 'OcBusinessContactListPage' ) {
			redirect = OcBusinessContactListPage;
		}
		if( page == 'OcBusinessSaleinvoiceListPage' ) {
			redirect = OcBusinessSaleinvoiceListPage;
		}
		this.navCtrl.setRoot( redirect, { "business" : this.business } );
	}
	
	
	
	
	
}
