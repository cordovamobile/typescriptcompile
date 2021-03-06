
import { Component } from '@angular/core';
import { Nav, /*IonicPage,*/ NavController, NavParams, ToastController, AlertController  } from 'ionic-angular';

import { Dataprovider } from '../../providers/dataprovider';
import { ApplicationService } from '../../providers/application-service';

import { OcBusinessEditPage } from '../../pages/oc-business-edit/oc-business-edit';
import { OcBusinessGstinAddPage } from '../../pages/oc-business-gstin-add/oc-business-gstin-add';
import { OcBusinessGstinListPage } from '../../pages/oc-business-gstin-list/oc-business-gstin-list';
import { OcBusinessItemListPage } from '../../pages/oc-business-item-list/oc-business-item-list';
import { OcBusinessContactListPage } from '../../pages/oc-business-contact-list/oc-business-contact-list';
import { OcBusinessSaleinvoiceListPage } from '../../pages/oc-business-saleinvoice-list/oc-business-saleinvoice-list';
/*
import { BusinessAddPage } from '../../pages/business-add/business-add';
import { BusinessListPage } from '../../pages/business-list/business-list';
*/

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
	selector: 'page-oc-business-dashboard',
	templateUrl: 'oc-business-dashboard.html',
})
export class OcBusinessDashboardPage {
	
	business: any;
	
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public dataprovider: Dataprovider,
		public toastCtrl: ToastController,
		public alertCtrl: AlertController,
		public nav: Nav,
		public application_service: ApplicationService
	) {
		
		this.business = {};
		
		if (this.navParams.get('business')) {
			this.business = this.navParams.get('business');
		}
		console.log( JSON.stringify( this.business ) );
		
		this.business.gstins = [
			{
				"gstin" : "",
				"displayname" : "",
			}
		];
		
		
		var self = this;
		
		console.log('requestAPI being called...');
		self.dataprovider.requestAPI(
			'get',
			'programming/hbgstapi/trunk/api/getbusinessbybid/' + self.application_service.userdata.api_token + '/' + self.business.buid,
			{},
			'',
			true, /* Token To Not Be Sent To API */
			
			function(response) {
				
				/* Logging 'Request Has Responded' event */
				console.log( 'requestAPI responded...' );
				console.log( 'requestAPI Response: "' + JSON.stringify( response ) + '"' );
				console.log( 'requestAPI Response Type: ' + response.status );
				
				
				self.business = response[0];
				
				console.log( 'Business Details Retreived : ' + JSON.stringify( self.business ) );
				
				

			}
		);
		
		
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad OcBusinessDashboardPage');
	}
	
	openPage( page ) {
		var redirect;
		if( page == 'OcBusinessEditPage' ) {
			redirect = OcBusinessEditPage;
		}
		if( page == 'OcBusinessGstinAddPage' ) {
			redirect = OcBusinessGstinAddPage;
		}
		if( page == 'OcBusinessGstinListPage' ) {
			redirect = OcBusinessGstinListPage;
		}
		if( page == 'OcBusinessItemListPage' ) {
			redirect = OcBusinessItemListPage;
		}
		if( page == 'OcBusinessContactListPage' ) {
			redirect = OcBusinessContactListPage;
		}
		if( page == 'OcBusinessSaleinvoiceListPage' ) {
			redirect = OcBusinessSaleinvoiceListPage;
		}
		this.navCtrl.setRoot( redirect, { "business" : this.business } );
	}

}
