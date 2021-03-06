
import { Component } from '@angular/core';
import { Nav, /*IonicPage,*/ NavController, NavParams, ToastController, AlertController  } from 'ionic-angular';

import { Dataprovider } from '../../providers/dataprovider';
import { ApplicationService } from '../../providers/application-service';

//import { BusinessListPage } from '../../pages/business-list/business-list';
import { CaClientDashboardPage } from '../../pages/ca-client-dashboard/ca-client-dashboard';
import { CaClientContactListPage } from '../../pages/ca-client-contact-list/ca-client-contact-list';

//@IonicPage()
@Component({
  selector: 'page-ca-client-contact-edit',
  templateUrl: 'ca-client-contact-edit.html',
})
export class CaClientContactEditPage {
	
	client: any;
	contact: any;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public dataprovider: Dataprovider,			
		public toastCtrl: ToastController,
		public alertCtrl: AlertController ,
		public nav: Nav,
		public application_service: ApplicationService
	) {
		
		this.contact = {};
		
		if (this.navParams.get('client')) {
			this.client = this.navParams.get('client');
		}
		console.log( JSON.stringify( this.client ) );
		
		if (this.navParams.get('contact')) {
			this.contact = this.navParams.get('contact');
		}
		console.log( JSON.stringify( this.contact ) );
		
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad CaClientContactEditPage');
	}
	
	update_contact() {
		
		
		console.log( JSON.stringify(this.client) );
		
		
		var self = this;
		
		/* Editing two extra attributes */
		self.contact.buid = self.client.buid;
		self.contact.lastmodifiyby = self.application_service.userdata.api_token;

		console.log('requestAPI being called...');
		self.dataprovider.requestAPI(
			'post',
			'programming/hbgstapi/trunk/api/updatecontact',
			self.contact,
			'Saving businesses details...',
			true, /* Token To Not Be Sent To API */
			
			function(response) {
				
				/* Logging 'Request Has Responded' event */
				console.log( 'requestAPI responded...' );
				console.log( 'requestAPI Response: "' + JSON.stringify( response ) + '"' );
				console.log( 'requestAPI Response Type: ' + response.status );
				
				
				if( response.status == 'success' ) {
					
					
					self.nav.push( CaClientContactListPage , { "client" : self.client } );
					
					
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
