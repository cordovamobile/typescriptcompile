import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
//import { HTTP } from '@ionic-native/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

import { LoadingController, ToastController } from 'ionic-angular';

/*
  Generated class for the Dataprovider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Dataprovider {
	
	/* Some Global Constants */
	readonly WEBSITE_NAME					= 'HBGST';
	readonly WEBSITE_URL					= 'localhost/host_books_gst';
	readonly WEBSITE_SECURE_URL				= 'http://localhost/host_books_gst'; // This one is most important
	readonly WEBSITE_UNSECURE_URL			= 'http://localhost/host_books_gst';
	readonly WEBSITE_SECURE_URL_CANONICAL	= 'http://localhost/host_books_gst/';
	readonly WEBSITE_UNSECURE_URL_CANONICAL	= 'http://localhost/host_books_gst/';

	api_url: string;
	request_url: string;
	response: any;


	constructor(
		public http: Http,
		public loading: LoadingController,
		public toastCtrl: ToastController
	) {
		console.log('Hello Dataprovider Provider');

		this.response = '';
		
		this.api_url = this.WEBSITE_SECURE_URL_CANONICAL;
		console.log('request_url: ' + this.request_url);
	}

	
	
	
	
	
	
	requestAPI( request_type , request_api, request_data , loader_caption , send_token = false , callback ) {

		console.log('request_api: ' + request_api); // Error getting the data
		
		/* Adding Request Type To The Request JSON */
		//request_data.request_api = request_api;
		this.request_url = this.api_url + request_api;
		
		
		
		/* Checking If Token Is To Be Added To The Request */
		if( send_token == true ) {
			//request_data.token = '';
			/**********************************************************************************************
			***********************************************************************************************
							COMPLETE THIS PART
			***********************************************************************************************
			**********************************************************************************************/
			
			var userdata = JSON.parse( localStorage.getItem("userdata") );
			
			request_data.userid = userdata.api_token;
			
			
			
			
		}
		
		var data = JSON.stringify(request_data);
		//var data = request_data;
		console.log(data);
		
		if( loader_caption != '' ) {
			var loader = this.loading.create({
				content: loader_caption
			});
			loader.present();
		}		
		
		
		var headers = new Headers();
		headers.append("Content-Type", "application/json");
		headers.append("Http-X-Auth", "developer-tool");
		/*
		headers.append("Access-Control-Allow-Origin", "*");
		headers.append("Access-Control-Allow-Credentials", "true");
		headers.append("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
		headers.append("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
		*/
		let options = new RequestOptions({ headers: headers });

		//alert(data);
		//alert(request_data);
		
		/*
		alert(this.request_url);
		alert(data);
		return;
		*/
		
		
		/* STARTING THE REQUEST */
		console.log('Starting http request...');
		var self = this;
		
		if( request_type == 'post' ) {
			this.http[request_type]( self.request_url , data , options )
			.timeout( 30000 )
			/* If request was SUCCESSFUL */
			.subscribe(data => {
				/* Disable The Loader */	
				if( loader_caption != '' ) {
					loader.dismiss();
				}
				self.handle_data( data , callback );
			/* If some ERROR OCCOURED */
			}, error => {
				/* Disable The Loader */	
				if( loader_caption != '' ) {
					loader.dismiss();
				}
				self.handle_error( error , callback );
			});			
		}
		
		if( request_type == 'get' ) {
			this.http[request_type]( self.request_url , options )
			.timeout( 30000 )
			/* If request was SUCCESSFUL */
			.subscribe(data => {
				/* Disable The Loader */	
				if( loader_caption != '' ) {
					loader.dismiss();
				}
				self.handle_data( data , callback );
			/* If some ERROR OCCOURED */
			}, error => {
				/* Disable The Loader */	
				if( loader_caption != '' ) {
					loader.dismiss();
				}
				self.handle_error( error , callback );
			});			
		}
		



	}
	
	
	
	
	
	
	
	handle_data( data , callback ) {
		
		var self = this;
		
		/* Alert & Log Response or Error Generated */
		//alert( JSON.stringify(data) );
		console.log( JSON.stringify(data) );
		
		
		/* If a NON-JSON Response has been received */
		if( ! self.isJSON( data['_body'] ) ) {
			
			let toast = self.toastCtrl.create({
				message: 'WHOOPS! You have probably cought us in the middle of some server maintainance work in progress. The service you are trying to access is not currently available for your mobile app. You can always try again later!',
				duration: 10000,
				cssClass: "toast-success",
				showCloseButton: true,
				closeButtonText: 'OK'
			});
			toast.present();
			
			
			
		/* If the response if PEERFECT-JSON */
		} else {
			
			/* Setting Response */
			self.response = JSON.parse( data['_body'] );
			
			/* Logging the end of request */
			console.log('Ending http request...');
			
			/* RETURN the response to the CALLBACK */
			callback( self.response );
			return;
			
		}
			
		/* Logging the end of request */
		console.log('Ending http request...');
		
	}
	
	
	handle_error( error , callback ) {
		
		var self = this;
		
		/* Alert & Log Response or Error Generated */
		//alert( JSON.stringify(error) );
		console.log( JSON.stringify(error) );
		
		// If DNS Not Resolved (No Internet)
		if ( 
					error.hasOwnProperty('status')
				&&	error.status == 0
		) {	
			
			let toast = self.toastCtrl.create({
				message: 'WARNING! Could not contact '+ self.WEBSITE_NAME +' server. Your internet is either disconnected or has some network issues. Check your internet connection and try again.',
				duration: 10000,
				cssClass: "toast-success",
				showCloseButton: true,
				closeButtonText: 'OK'
			});
			toast.present();
		
		
		// If server took longer than 30 seconds to respond
		} else if ( 
					error.hasOwnProperty('name')
				&&	error.name == "TimeoutError"
		) {	
			
			let toast = self.toastCtrl.create({
				message: 'WHOOPS! Servers for '+ self.WEBSITE_NAME +' could not respond to your request within 30 seconds. You have probably cought us in the middle of some server maintainance work in progress. You can also check if your internet is disconnected (or slow). Or else, you can always try again!',
				duration: 10000,
				cssClass: "toast-success",
				showCloseButton: true,
				closeButtonText: 'OK'
			});
			toast.present();

			
		/* For in case the SERVER RESPONDED but 'NO SUCH ROUTE' ERROR occoured */
		} else if(
					error.hasOwnProperty('status')
				&&	error.status == 404
				&&	error.hasOwnProperty('statusText')
				&&	error.statusText == "Not Found"
		) {
			
			let toast = self.toastCtrl.create({
				message: 'WHOOPS! You have probably cought us in the middle of some server maintainance work in progress. The service you are trying to access is not currently available. You can always try again later!',
				duration: 10000,
				cssClass: "toast-success",
				showCloseButton: true,
				closeButtonText: 'OK'
			});
			toast.present();
			
			
			
			
		/* For in case the SERVER RESPONDED + ROUTE WAS FOUND But Some Other ERROR occoured */
		/* Just do the same thing as done in SUCCESSFUL RESPONSE when response if PERFECT-JSON */
		/* If a NON-JSON Response has been received */
		} else if( ! self.isJSON( error['_body'] ) ) {
			
			
			let toast = self.toastCtrl.create({
				message: 'WHOOPS! You have probably cought us in the middle of some server maintainance work in progress. The service you are trying to access is not currently available for your mobile app. You can always try again later!',
				duration: 10000,
				cssClass: "toast-success",
				showCloseButton: true,
				closeButtonText: 'OK'
			});
			toast.present();
			
			
			
			
			
		/* For in case the SERVER RESPONDED + ROUTE WAS FOUND But Some Other ERROR occoured */
		/* Just do the same thing as done in SUCCESSFUL RESPONSE when response if PERFECT-JSON */
		/* If the response if PEERFECT-JSON */
		} else {
			
			
			/* Setting Response */
			self.response = JSON.parse( error['_body'] );
			
			/* Setting Response Type */
			self.response.type = 'Error';
			
			/* Logging the end of request */
			console.log('Ending http request...');
			
			/* RETURN the response to the CALLBACK */
			callback( self.response );
			return;
			
			
		}
		
		/* Logging the end of request */
		console.log('Ending http request...');
		
	}
	
	
	
	
	
	
	
	
	
	/* A function to check if a string is a PERFECT-JSON */
	isJSON( str ) {
		try {
			JSON.parse(str);
		} catch (e) {
			return false;
		}
		return true;
	}
	
	
	

}