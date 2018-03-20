
import { Component } from '@angular/core';
import { Nav, /*IonicPage,*/ NavController, NavParams, ToastController, AlertController  } from 'ionic-angular';

import { Dataprovider } from '../../providers/dataprovider';
import { ApplicationService } from '../../providers/application-service';

//import { BusinessListPage } from '../../pages/business-list/business-list';
import { CaClientDashboardPage } from '../../pages/ca-client-dashboard/ca-client-dashboard';
import { CaClientSaleinvoiceListPage } from '../../pages/ca-client-saleinvoice-list/ca-client-saleinvoice-list';

//@IonicPage()
@Component({
  selector: 'page-ca-client-saleinvoice-add',
  templateUrl: 'ca-client-saleinvoice-add.html',
})
export class CaClientSaleinvoiceAddPage {
	
	client: any;
	saleinvoice: any;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public dataprovider: Dataprovider,			
		public toastCtrl: ToastController,
		public alertCtrl: AlertController ,
		public nav: Nav,
		public application_service: ApplicationService
	) {
		
		this.saleinvoice = {};
		
		if (this.navParams.get('client')) {
			this.client = this.navParams.get('client');
		}
		console.log( JSON.stringify( this.client ) );
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad CaClientSaleinvoiceAddPage');
	}
	
	save_saleinvoice() {
		
		
		console.log( JSON.stringify(this.client) );
		
		
		var self = this;
		
		/* Adding two extra attributes */
		self.saleinvoice.buid = self.client.buid;
		self.saleinvoice.lastmodifiyby = self.application_service.userdata.api_token;

		console.log('requestAPI being called...');
		self.dataprovider.requestAPI(
			'post',
			'programming/hbgstapi/trunk/api/addsaleinvoice',
			self.saleinvoice,
			'Saving businesses details...',
			true, /* Token To Not Be Sent To API */
			
			function(response) {
				
				/* Logging 'Request Has Responded' event */
				console.log( 'requestAPI responded...' );
				console.log( 'requestAPI Response: "' + JSON.stringify( response ) + '"' );
				console.log( 'requestAPI Response Type: ' + response.status );
				
				
				if( response.status == 'success' ) {
					
					
					self.nav.push( CaClientSaleinvoiceListPage , { "client" : self.client } );
					
					
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
