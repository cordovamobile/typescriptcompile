
import { Component } from '@angular/core';
import { Nav, /*IonicPage,*/ NavController, NavParams, ToastController, AlertController  } from 'ionic-angular';

import { Dataprovider } from '../../providers/dataprovider';
import { ApplicationService } from '../../providers/application-service';

//import { BusinessListPage } from '../../pages/business-list/business-list';
import { CaDashboardPage } from '../../pages/ca-dashboard/ca-dashboard';

//@IonicPage()
@Component({
  selector: 'page-ca-client-edit',
  templateUrl: 'ca-client-edit.html',
})
export class CaClientEditPage {
	
	business: any;
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
		
		this.business = {};
		this.statelist = {};
		
		if (this.navParams.get('client')) {
			this.business = this.navParams.get('client');
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
			'programming/hbgstapi/api/getbusinessbybid/' + self.application_service.userdata.api_token + '/' + self.business.buid,
			self.business,
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
		
		
		

		console.log('requestAPI being called...');
		self.dataprovider.requestAPI(
			'get',
			'programming/hbgstapi/api/getstatelist',
			self.business,
			'Saving businesses details...',
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
		console.log('ionViewDidLoad CaClientAddPage');
	}
	
	save_business() {
		
		/*
		var business = {
			businessname : business.business_name,
			pannumber : business.pan,
			clienname : business.primary_contact_person,
			emailaddress : business.email_address,
			mobileno : business.primary_contact_personph,
			gstins : business.data
		};
		*/
		
		
		console.log( JSON.stringify(this.business) );
		
		
		var self = this;

		console.log('requestAPI being called...');
		self.dataprovider.requestAPI(
			'put',
			'programming/hbgstapi/api/editbusiness',
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
	
	change_gstin(g) {
		
		var State_Code = g.gstin.substring(0, 2);
		
		for( var i = 0; i < this.statelist.length; i++ ) {
			
			if( this.statelist[i].State_Code == State_Code ) {
				g.gstin_name = this.statelist[i].State_Name;
				g.gstinstatecode = this.statelist[i].gstinstatecode;
			}
			
		}
		
		console.log( g.gstin );
		console.log( g.gstin_name );
		console.log( g.gstinstatecode );
		
	}

}
