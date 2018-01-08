
import { Component } from '@angular/core';
import { Nav, /*IonicPage,*/ NavController, NavParams, ToastController, AlertController  } from 'ionic-angular';

import { Dataprovider } from '../../providers/dataprovider';
import { ApplicationService } from '../../providers/application-service';

import { UserDetailsSavePage } from '../../pages/user-details-save/user-details-save';
import { CaDashboardPage } from '../../pages/ca-dashboard/ca-dashboard';
import { OcDashboardPage } from '../../pages/oc-dashboard/oc-dashboard';


/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
 
//@IonicPage()

@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {
	
	login_form: any;
	signup_form: any;
	reset_password_form: any;
	password_field_type: string;
	view_password: boolean;
	current_form: string;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public dataprovider: Dataprovider,			
		public toastCtrl: ToastController,
		public alertCtrl: AlertController ,
		public nav: Nav,
		public application_service: ApplicationService
	) {
		
		
		this.current_form = 'login';
		
		this.login_form = {
			email: '',
			password: '',
			message: ''
		};
		
		this.signup_form = {
			first_name: '',
			last_name: '',
			email: '',
			password: '',
			message: ''
		};
		
		this.reset_password_form = {
			email: '',
			message: ''
		};
		
		this.password_field_type = 'password';
		
		this.view_password = false;
		
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad LoginPage');
	}


	toggle_show_password() {
		if( this.view_password == false ) {
			this.password_field_type = 'password';
		} else {
			this.password_field_type = 'text';
		}
	}
	
	
	
	
	
	show_sign_up_form() {
		this.current_form = 'signup';
	}
	
	show_log_in_form() {
		this.current_form = 'login';
	}
	
	show_reset_password_form() {
		this.current_form = 'reset_password';
	}
	
	
	
	
	
	login() {
		
		
		if(	! this.validateEmail( this.login_form.email ) ) {
			let toast = this.toastCtrl.create({
				message: 'Please enter a valid email address.',
				duration: 5000,
				cssClass: "toast-success"
			});
			toast.present();
			return;
		}
		
		
		if(	this.login_form.password == '' ) {
			let toast = this.toastCtrl.create({
				message: 'Please enter a valid password.',
				duration: 5000,
				cssClass: "toast-success"
			});
			toast.present();
			return;
		}
		
		
		
		var self = this;

		console.log('requestAPI being called...');
		self.dataprovider.requestAPI(
			'post',
			'programming/hbapi/api/login', 
			{
				email:	self.login_form.email,
				password:	self.login_form.password
			},
			'Checking login details...',
			false, /* Token To Not Be Sent To API */
			
			function(response) {
				
				/* Logging 'Request Has Responded' event */
				console.log( 'requestAPI responded...' );
				console.log( 'requestAPI Response: "' + JSON.stringify( response ) + '"' );
				console.log( 'requestAPI Response Type: ' + response.type );
				
				
				if( response.status == 'success' ) {
					
					var userdata = {
						"logged_in" : true,
						"user_id" : response.user_id,
						"full_name" : response.full_name,
						"token" : response.token,
						"pkey" : response.pkey
					};
					
					//alert('You have logged in successfully.');
					localStorage.setItem("userdata", JSON.stringify( userdata ));
					//self.navCtrl.push( UserDetailsSavePage );
					self.application_service.logged_in_or_not();
					
					
					self.login_validate();
					
					
					
					
				} else {
					
					self.login_form.email = '';
					self.login_form.password = '';
					self.login_form.view_password = false;
					let toast = self.toastCtrl.create({
						message:	response.message,
						duration:	10000,
						cssClass:	"toast-success"
					});
					toast.present();
					
					
					
					// Logout if logged in
					localStorage.removeItem("userdata");
					self.application_service.logged_in_or_not();
					
				}
				
				

			}
		);

	}
	
	
	
	
	
	login_validate() {
		
		var token = false;
		if (localStorage.getItem("userdata") !== null) {
			//alert(localStorage.getItem("userdata"));
			var userdata = JSON.parse( localStorage.getItem("userdata") );
			if (
					typeof(userdata.token) != "undefined"
			) {
				token = userdata.token;
			}
		}
		
		var self = this;

		console.log('requestAPI being called...');
		self.dataprovider.requestAPI(
			'post',
			'programming/hbgstapi/api/loginvalidate', 
			{
				user_account_no:	token
			},
			'Getting Authorization.',
			false, /* Token To Not Be Sent To API */
			
			function(response) {
				
				/* Logging 'Request Has Responded' event */
				console.log( 'requestAPI responded...' );
				console.log( 'requestAPI Response: "' + JSON.stringify( response ) + '"' );
				console.log( 'requestAPI Response Type: ' + response.type );
				
				
				if( response.status == 'success' ) {
					
					
					/* Deciding Where To Redirect */
					var redirect_page;
					var userdata;
					
					if( typeof response.login_count == 'undefined' ) { // If login_count does not exist
						return;
					} else if( parseInt(response.login_count) == 0 ) { // If first time login
						redirect_page = UserDetailsSavePage;
					} else if( parseInt(response.login_count) > 0 ) { // If NOT the first time login
					
						userdata = JSON.parse( localStorage.getItem("userdata") );
						userdata.bu_type = response.bu_type;
						localStorage.setItem("userdata", JSON.stringify( userdata ));
					
						if( response.bu_type == 'CA' ) {
							redirect_page = CaDashboardPage;
						} else if( response.bu_type == 'OC' ) {
							redirect_page = OcDashboardPage;
						}
						
					}
					
					if( typeof response.token !== 'undefined' ) { // If login_count does not exist
						userdata = JSON.parse( localStorage.getItem("userdata") );
						userdata.api_token = response.token;
						alert(response.token);
						localStorage.setItem("userdata", JSON.stringify( userdata ));
					}					
					
					
					self.login_form.email = '';
					self.login_form.password = '';
					self.login_form.view_password = false;
					let toast = self.toastCtrl.create({
						message:	response.message,
						duration:	3000,
						cssClass:	"toast-success"
					});
					toast.present();
					
					
					
					/* Redirecting */
					self.nav.setRoot(redirect_page);
					
					
					
					
				} else {
					
					self.login_form.email = '';
					self.login_form.password = '';
					self.login_form.view_password = false;
					let toast = self.toastCtrl.create({
						message:	response.message,
						duration:	10000,
						cssClass:	"toast-success"
					});
					toast.present();
					
					// Logout if logged in
					localStorage.removeItem("userdata");
					self.application_service.logged_in_or_not();
					
				}
				
				

			}
		);
		
	}
	
	
	
	
	
	signup() {
		
		
		if(	this.signup_form.first_name == '' ) {
			let toast = this.toastCtrl.create({
				message: 'Please enter a valid first name.',
				duration: 5000,
				cssClass: "toast-success"
			});
			toast.present();
			return;
		}
		
		
		if(	this.signup_form.last_name == '' ) {
			let toast = this.toastCtrl.create({
				message: 'Please enter a valid last name.',
				duration: 5000,
				cssClass: "toast-success"
			});
			toast.present();
			return;
		}
		
		
		if(	! this.validateEmail( this.signup_form.email ) ) {
			let toast = this.toastCtrl.create({
				message: 'Please enter a valid email address.',
				duration: 5000,
				cssClass: "toast-success"
			});
			toast.present();
			return;
		}
		
		
		if(	this.signup_form.password == '' ) {
			let toast = this.toastCtrl.create({
				message: 'Please enter a valid password.',
				duration: 5000,
				cssClass: "toast-success"
			});
			toast.present();
			return;
		}
		
		
		if(
				this.signup_form.first_name == ''
			||	this.signup_form.last_name == ''
			||	this.signup_form.email == ''
			||	this.signup_form.password == ''
		) {
			let toast = this.toastCtrl.create({
				message: 'Please fill all the fields.',
				duration: 3000,
				cssClass: "toast-success"
			});
			toast.present();
			return;
		}
		
		
		var self = this;

		console.log('requestAPI being called...');

		self.dataprovider.requestAPI(
			'post',
			'programming/hbapi/api/signup', 
			{
				first_name:	self.signup_form.first_name,
				last_name:	self.signup_form.last_name,
				email:		self.signup_form.email,
				password:	self.signup_form.password
			},
			'Creating new account...',
			false, /* Token To Not Be Sent To API */
			function(response) {
				
				/* Logging 'Request Has Responded' event */
				console.log( 'requestAPI responded...' );
				console.log( 'requestAPI Response: ' + JSON.stringify( response ) );
				console.log( 'requestAPI Response Type' + response.type );
				
				
				if( response.status == 'success' ) {
					
					
					let alert = self.alertCtrl.create({
						title: 'Account Created!',
						subTitle: 'A link has been sent to your email address "'+ self.signup_form.email +'". Visit that link to complete registration. Do check your SPAM FOLDER if you do not find it in your inbox.',
						buttons: ['OK']
					});
					alert.present();
					
					self.login_form.message = '<span style="color: #4AE435;">'
						+	'A link has been sent to your email address "'+ self.signup_form.email +'". Visit that link to complete registration. <b>Do check your SPAM FOLDER</b> if you do not find it in your inbox.'
						+	'</span>';
					
					self.current_form = 'login';
					
					
					self.signup_form.email = '';
					self.login_form.password = '';
					self.signup_form.first_name = '';
					self.signup_form.last_name = '';
					self.signup_form.email = '';
					self.signup_form.password = '';
					self.reset_password_form.email = '';
					self.login_form.view_password = false;
					
				} else {
					
					self.login_form.username_email = '';
					self.login_form.password = '';
					self.signup_form.email = '';
					self.signup_form.username = '';
					self.signup_form.password = '';
					self.reset_password_form.username_email = '';
					self.login_form.view_password = false;
					
					let toast = self.toastCtrl.create({
						message: response.message,
						duration: 10000,
						cssClass: "toast-success"
					});
					toast.present();
					//self.events.publish( 'set_logged_in' , false );
					
				}
				

			}
		);
		
	}
	
	
	
	
	
	reset_password() {
		
		var self = this;

		console.log('requestAPI being called...');

		self.dataprovider.requestAPI(
			'post',
			'wp-json/delhideveloper/v1/reset_password', 
			{
				username_email:		self.reset_password_form.username_email
			},
			'Checking Username/Email...',
			false, /* Token To Not Be Sent To API */
			function(response) {
				
				/* Logging 'Request Has Responded' event */
				console.log( 'requestAPI responded...' );
				console.log( 'requestAPI Response: ' + JSON.stringify( response ) );
				console.log( 'requestAPI Response Type' + response.type );
				
				
				if( response.code == 'Success' ) {
					
					let toast = self.toastCtrl.create({
						message:	response.message,
						duration:	10000,
						cssClass:	"toast-success",
						showCloseButton: true,
						closeButtonText: 'OK'
					});
					toast.present();
					
					self.reset_password_form.message = response.message;
					
					self.current_form = 'login';
					
					
					self.login_form.username_email = '';
					self.login_form.password = '';
					self.signup_form.username_email = '';
					self.signup_form.password = '';
					self.reset_password_form.username_email = '';
					self.login_form.view_password = false;
					
				} else {
					
					self.reset_password_form.username_email = '';
					self.login_form.view_password = false;
					let toast = self.toastCtrl.create({
						message: response.message,
						duration: 10000,
						cssClass: "toast-success",
						showCloseButton: true,
						closeButtonText: 'OK'
					});
					toast.present();
					
					self.reset_password_form.message = response.message;
					
					//self.events.publish( 'set_logged_in' , false );
					
				}
				

			}
		);
		
		
		
		
		
		
		
		
		
	}

	
	
	
	
	
	
	
	
	
	
	
	
	validateEmail(email) {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}
	
	
	
	
	
	
	
	
	
}









