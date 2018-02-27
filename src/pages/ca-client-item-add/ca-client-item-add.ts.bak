
import { Component } from '@angular/core';
import { Nav, /*IonicPage,*/ NavController, NavParams, ToastController, AlertController  } from 'ionic-angular';

import { Dataprovider } from '../../providers/dataprovider';
import { ApplicationService } from '../../providers/application-service';

//import { BusinessListPage } from '../../pages/business-list/business-list';
import { CaClientDashboardPage } from '../../pages/ca-client-dashboard/ca-client-dashboard';

//@IonicPage()
@Component({
	selector: 'page-ca-client-item-add',
	templateUrl: 'ca-client-item-add.html',
})
export class CaClientItemAddPage {
	
	client: any;
	item: any;
	hsncodes: any;
	saccodes: any;
	statelist: any;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public dataprovider: Dataprovider,			
		public toastCtrl: ToastController,
		public alertCtrl: AlertController ,
		public nav: Nav,
		public application_service: ApplicationService
	) {
		
		this.item = {};
		this.statelist = {};
		
		if (this.navParams.get('client')) {
			this.client = this.navParams.get('client');
		}
		console.log( JSON.stringify( this.client ) );
		
		
		
		
		var self = this;
		
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
		console.log('ionViewDidLoad CaClientItemAddPage');
	}
	
	change_hsn_sac() {
		
		
		console.log( JSON.stringify(this.item) );
		
		
		var self = this;
		
		/* Adding two extra attributes */
		self.item.buid = self.client.buid;
		self.item.lastmodifiyby = self.application_service.userdata.api_token;

		console.log('requestAPI being called...');
		self.dataprovider.requestAPI(
			'get',
			'programming/hbgstapi/trunk/api/gethsnlist/' + self.item.hsn_sac_code,
			{},
			'Saving businesses details...',
			true, /* Token To Not Be Sent To API */
			
			function(response) {
				
				/* Logging 'Request Has Responded' event */
				console.log( 'requestAPI responded...' );
				console.log( 'requestAPI Response: "' + JSON.stringify( response ) + '"' );
				console.log( 'requestAPI Response Type: ' + response.status );
				
				self.item.tax_rate = response[0].rate;
				self.item.cess_amount = response[0].cess;
				
			}
		);
		
		console.log( this.item.tax_rate );
		console.log( this.item.cess_amount );
		
	}
	
	save_item() {
		
		
		console.log( JSON.stringify(this.client) );
		
		
		var self = this;
		
		/* Adding two extra attributes */
		self.item.buid = self.client.buid;
		self.item.lastmodifiyby = self.application_service.userdata.api_token;

		console.log('requestAPI being called...');
		self.dataprovider.requestAPI(
			'post',
			'programming/hbgstapi/trunk/api/additem',
			self.item,
			'Saving businesses details...',
			true, /* Token To Not Be Sent To API */
			
			function(response) {
				
				/* Logging 'Request Has Responded' event */
				console.log( 'requestAPI responded...' );
				console.log( 'requestAPI Response: "' + JSON.stringify( response ) + '"' );
				console.log( 'requestAPI Response Type: ' + response.status );
				
				
				if( response.status == 'success' ) {
					
					
					self.nav.push( CaClientDashboardPage , { "client" : self.client } );
					
					
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

}
