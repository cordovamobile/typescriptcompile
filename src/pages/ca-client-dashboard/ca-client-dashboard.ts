
import { Component } from '@angular/core';
import { Nav, /*IonicPage,*/ NavController, NavParams, ToastController, AlertController  } from 'ionic-angular';

import { Dataprovider } from '../../providers/dataprovider';
import { ApplicationService } from '../../providers/application-service';

import { CaClientEditPage } from '../../pages/ca-client-edit/ca-client-edit';
import { CaClientGstinAddPage } from '../../pages/ca-client-gstin-add/ca-client-gstin-add';
import { CaClientGstinListPage } from '../../pages/ca-client-gstin-list/ca-client-gstin-list';
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
	selector: 'page-ca-client-dashboard',
	templateUrl: 'ca-client-dashboard.html',
})
export class CaClientDashboardPage {
	
	client: any;
	
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public dataprovider: Dataprovider,
		public toastCtrl: ToastController,
		public alertCtrl: AlertController,
		public nav: Nav,
		public application_service: ApplicationService
	) {
		
		this.client = {};
		
		if (this.navParams.get('client')) {
			this.client = this.navParams.get('client');
		}
		console.log( JSON.stringify( this.client ) );
		
		this.client.gstins = [
			{
				"gstin" : "",
				"displayname" : "",
			}
		];
		
		
		var self = this;
		
		console.log('requestAPI being called...');
		self.dataprovider.requestAPI(
			'get',
			'programming/hbgstapi/api/getbusinessbybid/' + self.application_service.userdata.api_token + '/' + self.client.buid,
			{},
			'',
			true, /* Token To Not Be Sent To API */
			
			function(response) {
				
				/* Logging 'Request Has Responded' event */
				console.log( 'requestAPI responded...' );
				console.log( 'requestAPI Response: "' + JSON.stringify( response ) + '"' );
				console.log( 'requestAPI Response Type: ' + response.status );
				
				
				self.client = response[0];
				
				console.log( 'Business Details Retreived : ' + JSON.stringify( self.client ) );
				
				

			}
		);
		
		
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad CaClientDashboardPage');
	}
	
	openPage( page , client ) {
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
		this.navCtrl.push( redirect, { "client" : client } );
	}

}
