
import { Component } from '@angular/core';
import { Nav, /*IonicPage,*/ NavController, NavParams, ToastController, AlertController  } from 'ionic-angular';

import { Dataprovider } from '../../providers/dataprovider';
import { ApplicationService } from '../../providers/application-service';

//import { BusinessListPage } from '../../pages/business-list/business-list';
import { CaDashboardPage } from '../../pages/ca-dashboard/ca-dashboard';
import { CaClientGstinListPage } from '../../pages/ca-client-gstin-list/ca-client-gstin-list';

//@IonicPage()
@Component({
	selector: 'page-ca-client-gstin-add',
	templateUrl: 'ca-client-gstin-add.html',
})
export class CaClientGstinAddPage {
	
	client: any;
	gstin: any;
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
		
		this.gstin = {};
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
		console.log('ionViewDidLoad CaClientGstinAddPage');
	}
	
	change_gstin() {
		
		var State_Code = this.gstin.gstin.substring(0, 2);
		
		for( var i = 0; i < this.statelist.length; i++ ) {
			
			if( this.statelist[i].State_Code == State_Code ) {
				this.gstin.gstin_name = this.statelist[i].State_Name;
				this.gstin.gstinstatecode = this.statelist[i].State_Code;
			}
			
		}
		
		console.log( this.gstin.gstin );
		console.log( this.gstin.gstin_name );
		console.log( this.gstin.gstinstatecode );
		
	}
	
	save_gstin() {
		
		
		console.log( JSON.stringify(this.client) );
		
		
		var self = this;
		
		/* Adding two extra attributes */
		self.gstin.buid = self.client.buid;
		self.gstin.createdby = self.application_service.userdata.api_token;

		console.log('requestAPI being called...');
		self.dataprovider.requestAPI(
			'post',
			'programming/hbgstapi/trunk/api/addgstin',
			self.gstin,
			'Saving businesses details...',
			true, /* Token To Not Be Sent To API */
			
			function(response) {
				
				/* Logging 'Request Has Responded' event */
				console.log( 'requestAPI responded...' );
				console.log( 'requestAPI Response: "' + JSON.stringify( response ) + '"' );
				console.log( 'requestAPI Response Type: ' + response.status );
				
				
				if( response.status == 'success' ) {
					
					
					self.nav.setRoot( CaClientGstinListPage , { "client" : self.client } );
					
					
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
