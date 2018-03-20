
import { Component } from '@angular/core';
import { Nav, /*IonicPage,*/ NavController, NavParams, ToastController, AlertController  } from 'ionic-angular';

import { Dataprovider } from '../../providers/dataprovider';
import { ApplicationService } from '../../providers/application-service';

//import { BusinessListPage } from '../../pages/business-list/business-list';
import { OcBusinessDashboardPage } from '../../pages/oc-business-dashboard/oc-business-dashboard';
import { OcBusinessContactListPage } from '../../pages/oc-business-contact-list/oc-business-contact-list';

//@IonicPage()
@Component({
  selector: 'page-oc-business-contact-add',
  templateUrl: 'oc-business-contact-add.html',
})
export class OcBusinessContactAddPage {
	
	business: any;
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
		
		if (this.navParams.get('business')) {
			this.business = this.navParams.get('business');
		}
		console.log( JSON.stringify( this.business ) );
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad OcBusinessContactAddPage');
	}
	
	save_contact() {
		
		
		console.log( JSON.stringify(this.business) );
		
		
		var self = this;
		
		/* Adding two extra attributes */
		self.contact.buid = self.business.buid;
		self.contact.lastmodifiyby = self.application_service.userdata.api_token;

		console.log('requestAPI being called...');
		self.dataprovider.requestAPI(
			'post',
			'programming/hbgstapi/trunk/api/addcontact',
			self.contact,
			'Saving businesses details...',
			true, /* Token To Not Be Sent To API */
			
			function(response) {
				
				/* Logging 'Request Has Responded' event */
				console.log( 'requestAPI responded...' );
				console.log( 'requestAPI Response: "' + JSON.stringify( response ) + '"' );
				console.log( 'requestAPI Response Type: ' + response.status );
				
				
				if( response.status == 'success' ) {
					
					
					self.nav.push( OcBusinessContactListPage , { "business" : self.business } );
					
					
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
