
import { Component } from '@angular/core';
import { Nav, /*IonicPage,*/ NavController, NavParams, ToastController, AlertController  } from 'ionic-angular';

import { Dataprovider } from '../../providers/dataprovider';
import { ApplicationService } from '../../providers/application-service';

//import { BusinessListPage } from '../../pages/business-list/business-list';
import { CaDashboardPage } from '../../pages/ca-dashboard/ca-dashboard';

@IonicPage()
@Component({
  selector: 'page-ca-client-add',
  templateUrl: 'ca-client-add.html',
})
export class CaClientAddPage {
	
	business: any;

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
		
		this.business.gstins = [
			{
				"gstin" : "",
				"displayname" : "",
			},

			{
				"gstin" : "",
				"displayname" : "",
			},
		];
		
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad CaClientAddPage');
	}
	
	save_business() {
		
		console.log( JSON.stringify(this.business) );
		
		
		var self = this;

		console.log('requestAPI being called...');
		self.dataprovider.requestAPI(
			'post',
			'programming/hbgstapi/api/addbusiness',
			self.business,
			'Saving businesses details...',
			true, /* Token To Not Be Sent To API */
			
			function(response) {
				
				/* Logging 'Request Has Responded' event */
				console.log( 'requestAPI responded...' );
				console.log( 'requestAPI Response: "' + JSON.stringify( response ) + '"' );
				console.log( 'requestAPI Response Type: ' + response.status );
				
				
				if( response.status == 'success' ) {
					
					
					self.nav.setRoot( CaDashboardPage );
					
					
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
	
	
	add_gstin() {
		
		this.business.gstins.push({
			"gstin" : "",
			"displayname" : "",
		});
		
	}
	
	remove_gstin(i) {
		this.business.gstins.splice(i, 1);
	}
	

}