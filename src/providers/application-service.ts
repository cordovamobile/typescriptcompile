import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
//import { HTTP } from '@ionic-native/http';
import 'rxjs/add/operator/map';

import { Events , ActionSheetController , Platform , ToastController , Loading , LoadingController } from 'ionic-angular';


import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

/* Providers */
import { Dataprovider } from './dataprovider';


/* Used for the file upload Functions */
/*
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
declare var cordova: any;
*/



/*
  Generated class for the ApplicationService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ApplicationService {
	
	/* Some Global Constants */
	readonly WEBSITE_NAME					= 'Wordpress Blogger Ionic App Demo';
	readonly WEBSITE_TAGLINE				= 'Works on Both Android & iOS';
	readonly WEBSITE_URL					= 'wba.demo.delhideveloper.com';
	readonly WEBSITE_SECURE_URL				= 'https://wba.demo.delhideveloper.com';
	readonly WEBSITE_UNSECURE_URL			= 'http://wba.demo.delhideveloper.com';
	readonly WEBSITE_SECURE_URL_CANONICAL	= 'https://wba.demo.delhideveloper.com/';
	readonly WEBSITE_UNSECURE_URL_CANONICAL	= 'http://wba.demo.delhideveloper.com/';
	readonly WEBSITE_PRIMARY_EMAIL			= 'wordpress_blogger_app_demo@delhideveloper.com';

	
	
	lastImage: string = null;
	loading: Loading;
	
	userdata: any;
	clients_or_businesses: any;
	current_client_or_business: any;
	
	constructor(
		public http: Http,
		public events: Events,
		public dataprovider: Dataprovider,
		public actionSheetCtrl: ActionSheetController,
		public platform: Platform,
		public toastCtrl: ToastController,
		
		/*
		public camera: Camera,
		public file: File,
		public filePath: FilePath,
		public fileTransfer: FileTransfer,
		public fileUploadOptions: FileUploadOptions,
		public fileTransferObject: FileTransferObject,
		*/
		
		public loadingCtrl: LoadingController,
		
		protected _sanitizer: DomSanitizer, // For allowing iframes in innerhtml tags binding

	) {
		console.log('Hello ApplicationService Provider');
		
		this.userdata = {};
		
		this.current_client_or_business = {
			"buid": "",
			"business_name": "",
			"data": [
				{
					"gstin": "",
					"gstin_name": ""
				}
			]
		};
		
	}
	
	
	
	// For allowing iframes in innerhtml tags binding
	public sanitize(value: string, type: string = 'html'): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
		switch (type) {
			case 'html': return this._sanitizer.bypassSecurityTrustHtml(value);
			case 'style': return this._sanitizer.bypassSecurityTrustStyle(value);
			case 'script': return this._sanitizer.bypassSecurityTrustScript(value);
			case 'url': return this._sanitizer.bypassSecurityTrustUrl(value);
			case 'resourceUrl': return this._sanitizer.bypassSecurityTrustResourceUrl(value);
			default: throw new Error(`Invalid safe type specified: ${type}`);
		}
	}



	logged_in_or_not() {

		//alert('This Is Logged In Or Not Inside AplicationService Provider...');
		var logged_in;
		if (localStorage.getItem("userdata") !== null) {
			//alert(localStorage.getItem("userdata"));
			this.userdata = JSON.parse(localStorage.getItem("userdata"));
			if (
				typeof(this.userdata.logged_in) != "undefined" &&
				typeof(this.userdata.token) != "undefined" &&
				this.userdata.logged_in == true
			) {
				logged_in = true;
				/* setTimeout(function(){ $j('.logged_out_menu_item').hide(); }, 500); */
			} else {
				logged_in = false;
			}
		} else {
			logged_in = false;
			/* setTimeout(function(){ $j('.logged_in_menu_item').hide(); }, 500); */
		}

		this.events.publish('set_logged_in', logged_in);
		return logged_in;

	}



	get_user_info( key ) {

		//alert('This Is Logged In Or Not Inside AplicationService Provider...');
		if (localStorage.getItem("userdata") !== null) {
			//alert(localStorage.getItem("userdata"));
			var userdata = JSON.parse(localStorage.getItem("userdata"));
			if ( typeof(userdata[ key ]) != "undefined" ) {
				return userdata[ key ];
			} else {
				return false;
			}
		}

	}



	get_clients_or_businesses() {
		
		var self = this;
		
		if( ! self.logged_in_or_not() ) {
			return;
		}

		console.log('requestAPI being called...');
		self.dataprovider.requestAPI(
			'get',
			'programming/hbgstapi/trunk/api/getbusinessbyid/' + self.userdata.api_token, 
			{},
			'',
			true, /* Token To Not Be Sent To API */
			
			function(response) {
				
				/* Logging 'Request Has Responded' event */
				console.log( 'requestAPI responded...' );
				console.log( 'requestAPI Response: "' + JSON.stringify( response ) + '"' );
				console.log( 'requestAPI Response Type: ' + response.status );
				
				
				if( response.status != 'failed' ) { // If success
					
					self.clients_or_businesses = response;
					
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
	
	current_client_or_business_set(c) {
		
		console.log('application_services:');
		console.log(c);
		console.log(this.clients_or_businesses);
		
		for( var i=0; i<this.clients_or_businesses.length; i++ ) {
			if( c.buid == this.clients_or_businesses[i].buid ) {
				this.current_client_or_business = this.clients_or_businesses[i];
			}
		}
		
		console.log(this.current_client_or_business);
		
	}
	
	
	
	
	
	
	
	
	
	
	
	/********************************************************************************************
	*********************************************************************************************
							Camera Image Upload Code
							FROM HERE:-
							https://devdactic.com/ionic-2-images/
	*********************************************************************************************
	********************************************************************************************/
	
	
	/*
	
	upload_image_and_get_file_no(callback) {
		
		var self = this;
		
		self.get_image_url_from_camera_or_library(function(image_name){
			
			// Destination URL
			var url = "http://prachyakarma.com/file-upload/";
			
			// File for Upload
			var targetPath = self.pathForImage(image_name);
			
			// File name only
			var filename = image_name;
			
			
			var options = {
				
				fileKey: "file",
				fileName: filename,
				chunkedMode: false,
				//mimeType: "multipart/form-data",
				//mimeType: "text/plain",
				mimeType: "image/jpeg"
				
			};
			
			const fileTransferObject: FileTransferObject = self.fileTransfer.create();
			
			self.loading = self.loadingCtrl.create({
				content: 'Uploading Image To Server...',
			});
			self.loading.present();
			
			// Use the FileTransferObject to upload the image
			fileTransferObject.upload(targetPath, url, options).then(data => {
				self.loading.dismissAll()
				self.presentToast('Image succesful uploaded.');
				callback( self.pathForImage(image_name) , data.response );
			}, err => {
				self.loading.dismissAll();
				self.presentToast('Error while uploading file.');
			});
			
			
			
		});
		
		
	}
	
	
	

	get_image_url_from_camera_or_library(callback) {



		let actionSheet = this.actionSheetCtrl.create({
			title: 'Select Image Source',
			buttons: [{
					text: 'Use Camera',
					icon: 'camera',
					handler: () => {
						this.takePicture( 
							this.camera.PictureSourceType.CAMERA, 
							function(image_name){
								callback(image_name);
							}
						);
					}
				},
				{
					text: 'Load from Library',
					icon: 'images',
					handler: () => {
						this.takePicture( 
							this.camera.PictureSourceType.PHOTOLIBRARY, 
							function(image_name){
								callback(image_name);
							}
						);
					}
				},
				{
					text: 'Cancel',
					role: 'cancel'
				}
			]
		});
		actionSheet.present();
	}




	public takePicture( sourceType , callback ) {
		
		// Create options for the Camera Dialog
		var options = {
			quality: 100,
			sourceType: sourceType,
			saveToPhotoAlbum: false,
			correctOrientation: true
		};

		// Get the data of an image
		this.camera.getPicture(options).then((imagePath) => {
			// Special handling for Android library
			if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
				this.filePath.resolveNativePath(imagePath)
					.then(filePath => {
						let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
						let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
						this.copyFileToLocalDir(
							correctPath, 
							currentName, 
							this.createFileName(), 
							function(image_name){
								callback(image_name);
							}
						);
					}, err => {
						alert(JSON.stringify(err));
					}
				);
			} else {
				var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
				var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
				this.copyFileToLocalDir(
					correctPath, 
					currentName, 
					this.createFileName(), 
					function(image_name){
						callback(image_name);
					}
				);
			}
		}, (err) => {
			this.presentToast('Error while selecting image.');
		});
	}




	// Create a new name for the image
	private createFileName() {
		var d = new Date(),
			n = d.getTime(),
			newFileName = n + ".jpg";
		return newFileName;
	}

	// Copy the image to a local folder
	private copyFileToLocalDir(namePath, currentName, newFileName , callback) {
		
		this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
			this.lastImage = newFileName;
			callback(newFileName);
		}, error => {
			this.presentToast('Error while storing file.');
		});
	}

	public presentToast( message , duration = 10000 , position = 'top' ) {
		let toast = this.toastCtrl.create({
			message: message,
			duration: duration,
			position: position
		});
		toast.present();
	}

	// Always get the accurate path to your apps folder
	public pathForImage(img) {
		if (img === null) {
			return '';
		} else {
			return cordova.file.dataDirectory + img;
		}
	}
	
	
	
	*/
	
	
	/********************************************************************************************
	*********************************************************************************************
							/Camera Image Upload Code
	*********************************************************************************************
	********************************************************************************************/
	
	
	
	




}