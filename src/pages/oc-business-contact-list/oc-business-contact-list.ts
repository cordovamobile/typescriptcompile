
import { Component } from '@angular/core';
import { Nav, /*IonicPage,*/ NavController, NavParams, ToastController, AlertController  } from 'ionic-angular';

import { Dataprovider } from '../../providers/dataprovider';
import { ApplicationService } from '../../providers/application-service';

//import { BusinessListPage } from '../../pages/business-list/business-list';
import { OcBusinessContactAddPage } from '../../pages/oc-business-contact-add/oc-business-contact-add';
import { OcBusinessContactEditPage } from '../../pages/oc-business-contact-edit/oc-business-contact-edit';
import { OcBusinessItemListPage } from '../../pages/oc-business-item-list/oc-business-item-list';
import { OcBusinessSaleinvoiceListPage } from '../../pages/oc-business-saleinvoice-list/oc-business-saleinvoice-list';

//@IonicPage()
@Component({
  selector: 'page-oc-business-contact-list',
  templateUrl: 'oc-business-contact-list.html',
})
export class OcBusinessContactListPage {
	
	business: any;
	statelist: any;
	contacts: any;

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
		
		this.business.contacts = [
			{
				"contact" : "",
				"contact_name" : "",
			}
		];
		
		
		
		
		var self = this;

		console.log('requestAPI being called...');
		self.dataprovider.requestAPI(
			'get',
			'programming/hbgstapi/trunk/api/getcustomerlistbybid/' + self.business.buid,
			self.business,
			'',
			true, /* Token To Not Be Sent To API */
			
			function(response) {
				
				/* Logging 'Request Has Responded' event */
				console.log( 'requestAPI responded...' );
				console.log( 'requestAPI Response: "' + JSON.stringify( response ) + '"' );
				console.log( 'requestAPI Response Type: ' + response.status );
				
				
				self.contacts = response.contactlist;
				
				console.log( 'Business Details Retreived : ' + JSON.stringify( self.business ) );
				
				

			}
		);
		
		
		
		
		
		
		
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad OcBusinessContactListPage');
	}
	
	open_contact_add_page() {
		this.nav.push( OcBusinessContactAddPage , { 'business' : this.business } );
	}
	
	
	
	edit_contact(i) {
		
		this.nav.push( OcBusinessContactEditPage , { 'business' : this.business , 'contact' : i } );
		
	}
	
	openPage( page ) {
		var redirect;
		if( page == 'OcBusinessItemListPage' ) {
			redirect = OcBusinessItemListPage;
		}
		if( page == 'OcBusinessSaleinvoiceListPage' ) {
			redirect = OcBusinessSaleinvoiceListPage;
		}
		this.navCtrl.setRoot( redirect, { "business" : this.business } );
	}
	
	

}
