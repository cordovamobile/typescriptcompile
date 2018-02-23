
import { Component } from '@angular/core';
import { Nav, /*IonicPage,*/ NavController, NavParams, ToastController, AlertController  } from 'ionic-angular';

import { Dataprovider } from '../../providers/dataprovider';
import { ApplicationService } from '../../providers/application-service';

//import { BusinessListPage } from '../../pages/client-list/client-list';
import { CaClientSaleinvoiceAddPage } from '../../pages/ca-client-saleinvoice-add/ca-client-saleinvoice-add';
import { CaClientSaleinvoiceEditPage } from '../../pages/ca-client-saleinvoice-edit/ca-client-saleinvoice-edit';
import { CaClientItemListPage } from '../../pages/ca-client-item-list/ca-client-item-list';
import { CaClientContactListPage } from '../../pages/ca-client-contact-list/ca-client-contact-list';
import { CaClientSaleinvoiceListPage } from '../../pages/ca-client-saleinvoice-list/ca-client-saleinvoice-list';

//@IonicPage()
@Component({
  selector: 'page-ca-client-saleinvoice-list',
  templateUrl: 'ca-client-saleinvoice-list.html',
})
export class CaClientSaleinvoiceListPage {
	
	client: any;
	statelist: any;
	saleinvoices: any;

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
		
		this.client.saleinvoices = [
			{
				"saleinvoice" : "",
				"saleinvoice_name" : "",
			}
		];
		
		
		
		
		var self = this;

		console.log('requestAPI being called...');
		self.dataprovider.requestAPI(
			'get',
			'programming/hbgstapi/trunk/api/getsaleinvoicebybuid/' + self.client.buid,
			self.client,
			'',
			true, /* Token To Not Be Sent To API */
			
			function(response) {
				
				/* Logging 'Request Has Responded' event */
				console.log( 'requestAPI responded...' );
				console.log( 'requestAPI Response: "' + JSON.stringify( response ) + '"' );
				console.log( 'requestAPI Response Type: ' + response.status );
				
				
				self.saleinvoices = response.saleinvoicelist;
				
				console.log( 'Business Details Retreived : ' + JSON.stringify( self.client ) );
				
				

			}
		);
		
		
		
		
		
		
		
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad CaClientSaleinvoiceListPage');
	}
	
	open_saleinvoice_add_page() {
		this.nav.push( CaClientSaleinvoiceAddPage , { 'client' : this.client } );
	}
	
	
	
	edit_saleinvoice(i) {
		
		this.nav.push( CaClientSaleinvoiceEditPage , { 'client' : this.client , 'saleinvoice' : i } );
		
	}
	
	openPage( page ) {
		var redirect;
		if( page == 'CaClientEditPage' ) {
			redirect = CaClientEditPage;
		}
		if( page == 'CaClientGstinAddPage' ) {
			redirect = CaClientGstinAddPage;
		}
		if( page == 'CaClientGstinListPage' ) {
			redirect = CaClientGstinListPage;
		}
		if( page == 'CaClientItemListPage' ) {
			redirect = CaClientItemListPage;
		}
		if( page == 'CaClientContactListPage' ) {
			redirect = CaClientContactListPage;
		}
		if( page == 'CaClientSaleinvoiceListPage' ) {
			redirect = CaClientSaleinvoiceListPage;
		}
		this.navCtrl.setRoot( redirect, { "client" : this.client } );
	}
	
	

}
