
import { Component } from '@angular/core';
import { Nav, /*IonicPage,*/ NavController, NavParams, ToastController, AlertController  } from 'ionic-angular';

import { Dataprovider } from '../../providers/dataprovider';
import { ApplicationService } from '../../providers/application-service';

//import { BusinessListPage } from '../../pages/business-list/business-list';
import { OcBusinessSaleinvoiceAddPage } from '../../pages/oc-business-saleinvoice-add/oc-business-saleinvoice-add';
import { OcBusinessSaleinvoiceEditPage } from '../../pages/oc-business-saleinvoice-edit/oc-business-saleinvoice-edit';
import { OcBusinessItemListPage } from '../../pages/oc-business-item-list/oc-business-item-list';
import { OcBusinessContactListPage } from '../../pages/oc-business-contact-list/oc-business-contact-list';

//@IonicPage()
@Component({
  selector: 'page-oc-business-saleinvoice-list',
  templateUrl: 'oc-business-saleinvoice-list.html',
})
export class OcBusinessSaleinvoiceListPage {
	
	business: any;
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
		
		this.business = {};
		this.statelist = {};
		
		if (this.navParams.get('business')) {
			this.business = this.navParams.get('business');
		}
		console.log( JSON.stringify( this.business ) );
		
		this.business.saleinvoices = [
			{
				"saleinvoice" : "",
				"saleinvoice_name" : "",
			}
		];
		
		
		
		
		var self = this;

		console.log('requestAPI being called...');
		self.dataprovider.requestAPI(
			'get',
			'programming/hbgstapi/trunk/api/getsaleinvoicebybuid/' + self.business.buid,
			self.business,
			'',
			true, /* Token To Not Be Sent To API */
			
			function(response) {
				
				/* Logging 'Request Has Responded' event */
				console.log( 'requestAPI responded...' );
				console.log( 'requestAPI Response: "' + JSON.stringify( response ) + '"' );
				console.log( 'requestAPI Response Type: ' + response.status );
				
				
				self.saleinvoices = response.saleinvoicelist;
				
				console.log( 'Business Details Retreived : ' + JSON.stringify( self.business ) );
				
				

			}
		);
		
		
		
		
		
		
		
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad OcBusinessSaleinvoiceListPage');
	}
	
	open_saleinvoice_add_page() {
		this.nav.push( OcBusinessSaleinvoiceAddPage , { 'business' : this.business } );
	}
	
	
	
	edit_saleinvoice(i) {
		
		this.nav.push( OcBusinessSaleinvoiceEditPage , { 'business' : this.business , 'saleinvoice' : i } );
		
	}
	
	openPage( page ) {
		var redirect;
		if( page == 'OcBusinessItemListPage' ) {
			redirect = OcBusinessItemListPage;
		}
		if( page == 'OcBusinessContactListPage' ) {
			redirect = OcBusinessContactListPage;
		}
		this.navCtrl.setRoot( redirect, { "business" : this.business } );
	}
	
	

}
