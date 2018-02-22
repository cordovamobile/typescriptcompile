
import { Component } from '@angular/core';
import { Nav, /*IonicPage,*/ NavController, NavParams, ToastController, AlertController  } from 'ionic-angular';

import { Dataprovider } from '../../providers/dataprovider';
import { ApplicationService } from '../../providers/application-service';

//import { BusinessListPage } from '../../pages/client-list/client-list';
import { CaClientItemAddPage } from '../../pages/ca-client-item-add/ca-client-item-add';
import { CaClientItemEditPage } from '../../pages/ca-client-item-edit/ca-client-item-edit';

//@IonicPage()
@Component({
	selector: 'page-ca-client-item-list',
	templateUrl: 'ca-client-item-list.html',
})
export class CaClientItemListPage {
	
	client: any;
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
		
		this.client = {};
		this.statelist = {};
		
		if (this.navParams.get('client')) {
			this.client = this.navParams.get('client');
		}
		console.log( JSON.stringify( this.client ) );
		
		this.client.items = [
			{
				"item" : "",
				"item_name" : "",
			}
		];
		
		
		
		
		var self = this;

		console.log('requestAPI being called...');
		self.dataprovider.requestAPI(
			'get',
			'programming/hbgstapi/trunk/api/getitembybuid/' + self.client.buid,
			self.client,
			'',
			true, /* Token To Not Be Sent To API */
			
			function(response) {
				
				/* Logging 'Request Has Responded' event */
				console.log( 'requestAPI responded...' );
				console.log( 'requestAPI Response: "' + JSON.stringify( response ) + '"' );
				console.log( 'requestAPI Response Type: ' + response.status );
				
				
				self.items = response.itemlist;
				
				console.log( 'Business Details Retreived : ' + JSON.stringify( self.client ) );
				
				

			}
		);
		
		
		
		
		
		
		
	}
	
	ionViewDidLoad() {
		console.log('ionViewDidLoad CaClientItemListPage');
	}
	
	open_item_add_page() {
		this.nav.push( CaClientItemAddPage , { 'client' : this.client } );
	}
	
	
	
	edit_item(i) {
		
		this.nav.push( CaClientItemEditPage , { 'client' : this.client , 'item' : i } );
		
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
				
				console.log( 'Business Details Retreived : ' + JSON.stringify( self.client ) );
				
				

			}
		);
		
	}
	
	
	
	
	
}
