
import { Component } from '@angular/core';
import { Nav, /*IonicPage,*/ NavController, NavParams, ToastController, AlertController  } from 'ionic-angular';

import { Dataprovider } from '../../providers/dataprovider';
import { ApplicationService } from '../../providers/application-service';
import { DashboardPage } from '../../pages/dashboard/dashboard';

/**
 * Generated class for the UserDetailsSavePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-details-save',
  templateUrl: 'user-details-save.html',
})
export class UserDetailsSavePage {
	
	current_ui: string;
	ca_firm_details: any;
	non_ca_firm_details: any;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public dataprovider: Dataprovider,			
		public toastCtrl: ToastController,
		public alertCtrl: AlertController ,
		public nav: Nav,
		public application_service: ApplicationService
	) {
		
		this.current_ui = 'question';
		
		this.ca_firm_details = {
			practice_name : '',
			pan : '',
			name : '',
			mobileno : ''
		};
		this.non_ca_firm_details = {
			business_name : '',
			pan : '',
			name : '',
			mobileno : ''
		};
		
		
		
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad UserDetailsSavePage');
	}
	
	
	
	
	
	change_ui(ui) {
		
		var self = this;
		
		if( ui == 'question' ) {
			self.ca_firm_details.practice_name = '';
			self.ca_firm_details.pan = '';
			self.ca_firm_details.name = '';
			self.ca_firm_details.mobileno = '';
			self.non_ca_firm_details.business_name = '';
			self.non_ca_firm_details.pan = '';
			self.non_ca_firm_details.name = '';
			self.non_ca_firm_details.mobileno = '';
		}
		
		this.current_ui = ui;
		
	}
	
	
	
	
	
	save_details(business_type) {
		
		var self = this;
		
		var error_message = self.validate_form(business_type);
		if( error_message != '' ) {
			let toast = self.toastCtrl.create({
				message: error_message,
				duration: 5000,
				cssClass: "toast-success"
			});
			toast.present();
			return;
		}
		
		
		
		
		
		var data;
		
		if( business_type == 'CA Firm' ) {
			data = {
				business_name : self.ca_firm_details.practice_name,
				pan : self.ca_firm_details.pan,
				primary_contact_person : self.ca_firm_details.name,
				primary_contact_personph : self.ca_firm_details.mobileno,
				bu_type : 'ca'
			};
		}
		
		
		if( business_type == 'Non CA Firm' ) {
			data = {
				business_name : self.non_ca_firm_details.business_name,
				pan : self.non_ca_firm_details.pan,
				primary_contact_person : self.non_ca_firm_details.name,
				primary_contact_personph : self.non_ca_firm_details.mobileno,
				bu_type : 'oc'
			};
		}
		
		
		
		

		console.log('requestAPI being called...');
		self.dataprovider.requestAPI(
			'post',
			'programming/hbgstapi/api/addbusiness',
			data,
			'Saving businesses details...',
			false, /* Token To Not Be Sent To API */
			
			function(response) {
				
				/* Logging 'Request Has Responded' event */
				console.log( 'requestAPI responded...' );
				console.log( 'requestAPI Response: "' + JSON.stringify( response ) + '"' );
				console.log( 'requestAPI Response Type: ' + response.status );
				
				
				if( response.status == 'success' ) {
					
					
					self.nav.setRoot( DashboardPage );
					
					let toast = self.toastCtrl.create({
						message:	response.message,
						duration:	10000,
						cssClass:	"toast-success"
					});
					toast.present();
					
					
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
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		var user_details;
		var bu_type;
		
		if( business_type == 'CA Firm' ) {
			
			user_details = this.ca_firm_details;
			user_details.business_type = business_type;
			
			bu_type = 'CA';
			
		}
		
		if( business_type == 'Non CA Firm' ) {
			
			user_details = this.non_ca_firm_details;
			user_details.business_type = business_type;
			
			bu_type = 'OC';
			
		}
		
		
		
		//alert('You have logged in successfully.');
		localStorage.setItem("user_details", JSON.stringify( user_details ));
		
		var userdata = JSON.parse(localStorage.getItem("userdata"));
		userdata.bu_type = bu_type;
		localStorage.setItem("userdata", JSON.stringify( userdata ));
		
		this.nav.setRoot( DashboardPage );
		
	}
	
	
	
	
	
	
	validate_form(business_type) {
		
		var self = this;
		
		if( business_type == 'CA Firm' ) {
			
			if( self.validatePhone(self.ca_firm_details.mobileno) == '' ) {
				return 'Enter a valid 10 digit mobile number.';
			}
			if( self.ca_firm_details.practice_name == '' ) {
				return 'Enter a valid practice name.';
			}
			if( self.ca_firm_details.name == '' ) {
				return 'Enter a valid name.';
			}
			if( self.validatePAN( self.ca_firm_details.pan ) == '' ) {
				return 'Enter a valid PAN number.';
			}
		}
		
		
		if( business_type == 'Non CA Firm' ) {
			
			if( self.validatePhone(self.non_ca_firm_details.mobileno) == '' ) {
				return 'Enter a valid 10 digit mobile number.';
			}
			if( self.non_ca_firm_details.business_name == '' ) {
				return 'Enter a valid business name.';
			}
			if( self.non_ca_firm_details.name == '' ) {
				return 'Enter a valid name.';
			}
			if( self.validatePAN( self.non_ca_firm_details.pan ) == '' ) {
				return 'Enter a valid PAN number.';
			}
		}
		
		return '';
		
	}
	
	
	
	
	
	
	
	validatePhone(field) {
		if (field.match(/^\d{10}/)) {
			 return true;
		} 
		return false;
	}
	
	
	
	// Source of code : https://stackoverflow.com/questions/37251151/pancard-structure-validation-in-javascript-and-php-also
	validatePAN(field) {
		if (field.match(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/)) {
			 return true;
		} 
		return false;
	}
	
	
	
	
	
	
	
	
	
	
	
	
}
