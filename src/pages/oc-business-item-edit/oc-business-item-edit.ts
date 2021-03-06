
import { Component } from '@angular/core';
import { Nav, /*IonicPage,*/ NavController, NavParams, ToastController, AlertController  } from 'ionic-angular';

import { Dataprovider } from '../../providers/dataprovider';
import { ApplicationService } from '../../providers/application-service';

//import { BusinessListPage } from '../../pages/business-list/business-list';
import { OcBusinessDashboardPage } from '../../pages/oc-business-dashboard/oc-business-dashboard';
import { OcBusinessItemListPage } from '../../pages/oc-business-item-list/oc-business-item-list';

//@IonicPage()
@Component({
	selector: 'page-oc-business-item-edit',
	templateUrl: 'oc-business-item-edit.html',
})
export class OcBusinessItemEditPage {
	
	business: any;
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
		
		if (this.navParams.get('business')) {
			this.business = this.navParams.get('business');
		}
		console.log( JSON.stringify( this.business ) );
		
		if (this.navParams.get('item')) {
			this.item = this.navParams.get('item');
		}
		console.log( JSON.stringify( this.item ) );
		
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad OcBusinessItemEditPage');
	}
	
	change_item() {
		
		var State_Code = this.item.item.substring(0, 2);
		
		for( var i = 0; i < this.statelist.length; i++ ) {
			
			if( this.statelist[i].State_Code == State_Code ) {
				this.item.item_name = this.statelist[i].State_Name;
				this.item.itemstatecode = this.statelist[i].State_Code;
			}
			
		}
		
		console.log( this.item.item );
		console.log( this.item.item_name );
		console.log( this.item.itemstatecode );
		
	}
	
	update_item() {
		
		
		console.log( JSON.stringify(this.business) );
		
		
		var self = this;
		
		/* Editing two extra attributes */
		self.item.buid = self.business.buid;
		self.item.lastmodifiyby = self.application_service.userdata.api_token;

		console.log('requestAPI being called...');
		self.dataprovider.requestAPI(
			'put',
			'programming/hbgstapi/trunk/api/updateitem',
			self.item,
			'Saving businesses details...',
			true, /* Token To Not Be Sent To API */
			
			function(response) {
				
				/* Logging 'Request Has Responded' event */
				console.log( 'requestAPI responded...' );
				console.log( 'requestAPI Response: "' + JSON.stringify( response ) + '"' );
				console.log( 'requestAPI Response Type: ' + response.status );
				
				
				if( response.status == 'success' ) {
					
					
					self.nav.push( OcBusinessItemListPage , { "business" : self.business } );
					
					
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
	
	
	
	delete_item() {
		
		var self = this;

		console.log('requestAPI being called...');
		self.dataprovider.requestAPI(
			'delete',
			'programming/hbgstapi/trunk/api/deleteitem/' + self.item.itemid,
			{},
			'Deleting Item...',
			true, /* Token To Not Be Sent To API */
			
			function(response) {
				
				/* Logging 'Request Has Responded' event */
				console.log( 'requestAPI responded...' );
				console.log( 'requestAPI Response: "' + JSON.stringify( response ) + '"' );
				console.log( 'requestAPI Response Type: ' + response.status );
				
				if( response.status == 'success' ) {
					self.nav.push( OcBusinessDashboardPage , { "business" : self.business } );
				}
				
				console.log( 'Business Details Retreived : ' + JSON.stringify( self.business ) );
				
				

			}
		);
		
	}

}
