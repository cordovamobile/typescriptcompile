
import { Component } from '@angular/core';
import { Nav, /*IonicPage,*/ NavController, NavParams, ToastController, AlertController  } from 'ionic-angular';

import { Dataprovider } from '../../providers/dataprovider';
import { ApplicationService } from '../../providers/application-service';

//import { BusinessListPage } from '../../pages/client-list/client-list';
import { CaClientGstinEditPage } from '../../pages/ca-client-gstin-edit/ca-client-gstin-edit';

//@IonicPage()
@Component({
	selector: 'page-ca-client-gstin-list',
	templateUrl: 'ca-client-gstin-list.html',
})
export class CaClientGstinListPage {
	
	client: any;
	statelist: any;
	gstins: any;

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
		
		this.client.gstins = [
			{
				"gstin" : "",
				"gstin_name" : "",
			}
		];
		
		
		
		
		var self = this;

		console.log('requestAPI being called...');
		self.dataprovider.requestAPI(
			'get',
			'programming/hbgstapi/trunk/api/getgstinbybid/' + self.client.buid,
			self.client,
			'',
			true, /* Token To Not Be Sent To API */
			
			function(response) {
				
				/* Logging 'Request Has Responded' event */
				console.log( 'requestAPI responded...' );
				console.log( 'requestAPI Response: "' + JSON.stringify( response ) + '"' );
				console.log( 'requestAPI Response Type: ' + response.status );
				
				
				self.gstins = response.data;
				
				console.log( 'Business Details Retreived : ' + JSON.stringify( self.client ) );
				
				

			}
		);
		
		
		

		console.log('requestAPI being called...');
		self.dataprovider.requestAPI(
			'get',
			'programming/hbgstapi/trunk/api/getstatelist',
			{},
			'',
			true, /* Token To Not Be Sent To API */
			
			function(response) {
				
				/* Logging 'Request Has Responded' event */
				console.log( 'requestAPI responded...' );
				console.log( 'requestAPI Response: "' + JSON.stringify( response ) + '"' );
				console.log( 'requestAPI Response Type: ' + response.status );
				
				
				if( response.status == 'success' ) {
					
					
					self.statelist = response.statelist;
					
					
				} else {
					
					let toast = self.toastCtrl.create({
						message:	response.message,
						duration:	10000,
						cssClass:	"toast-success"
					});
					toast.present();
					
				}
				
				

			}
		);
		
		
		
		
		
		
		
	}
	
	ionViewDidLoad() {
		console.log('ionViewDidLoad CaClientGstinListPage');
	}
	
	
	
	edit_gstin(g) {
		
		this.nav.push( CaClientGstinEditPage , { 'client' : this.client , 'gstin' : g } );
		
	}
	
	
	
	
	
}
