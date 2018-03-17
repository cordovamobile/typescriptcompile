
import { Component } from '@angular/core';
import { Nav, /* IonicPage ,*/ NavController, NavParams, ToastController, AlertController  } from 'ionic-angular';

import { Dataprovider } from '../../providers/dataprovider';
import { ApplicationService } from '../../providers/application-service';

import { LoginPage } from '../../pages/login/login';

/**
 * Generated class for the GstLawSinglePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
	selector: 'page-gst-law-single',
	templateUrl: 'gst-law-single.html',
})
export class GstLawSinglePage {
	
	logged_in: boolean;
	post: any;
	content: any;
	loading_post: boolean;
	comment: any;
	loading_comment_posting: boolean;
	display_view_more_comments_button: boolean;
	loading_more_comments: boolean;
	comment_pages_loaded: any;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public dataprovider: Dataprovider,			
		public toastCtrl: ToastController,
		public alertCtrl: AlertController ,
		public nav: Nav,
		public application_service: ApplicationService,
	) {
		
		this.logged_in = this.application_service.logged_in_or_not();
		
		this.loading_post = true;
		this.loading_comment_posting = false;
		this.display_view_more_comments_button = true;
		this.comment_pages_loaded = 0;
		this.loading_more_comments = false;
		
		this.comment = '';
		
		this.post = {"id":"","date":"","date_gmt":"","guid":{"rendered":""},"modified":"","modified_gmt":"","slug":"","status":"","type":"","link":"","title":{"rendered":""},"content":{"rendered":"","protected":false},"excerpt":{"rendered":"","protected":false},"author":"","featured_media":"","comment_status":"","ping_status":"","sticky":false,"template":"","format":"","meta":[],"categories":[],"tags":[],"better_featured_image":{"id":"","alt_text":"","caption":"","description":"","media_type":"","media_details":{"width":"","height":"","file":"","sizes":{"thumbnail":{"file":"","width":"","height":"","mime-type":"","source_url":""}},"image_meta":{"aperture":"","credit":"","camera":"","caption":"","created_timestamp":"","copyright":"","focal_length":"","iso":"0","shutter_speed":"","title":"","orientation":"","keywords":[]}},"post":3064,"source_url":""}};
		
		
		if (this.navParams.get('id')) {
			this.post.id = this.navParams.get('id');
		}
		
		
		var self = this;
		self.dataprovider.requestBlogAPI(
			'get',
			'wp-json/wp/v2/pages/' + self.post.id, 
			{},
			'',
			false, /* Token To Not Be Sent To API */
			function(response) {
				
				/* Logging 'Request Has Responded' event */
				console.log( 'requestAPI responded...' );
				console.log( 'requestAPI Response: ' + JSON.stringify( response ) );
				console.log( 'requestAPI Response Type' + response.type );
				
				response.date = new Date( response.date );
				
				self.post = response;
				self.loading_post = false;
				self.content = self.application_service.sanitize(response.content);
				
				/*
				if( response.post.comments.length < 10 ) {
					self.display_view_more_comments_button = false;
				}
				*/
				
				self.comment_pages_loaded = 1;

			}
		);
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad GstLawSinglePage');
	}
	
	
	
	
	show_more_comments() {
		
		this.loading_more_comments = true;
		
		var self = this;
		self.dataprovider.requestAPI(
			'post',
			'wp-json/delhideveloper/v1/comments', 
			{
				id: self.post.id,
				current_comment_page: ( this.comment_pages_loaded + 1 )
			},
			'',
			false, /* Token To Not Be Sent To API */
			function(response) {
				
				/* Logging 'Request Has Responded' event */
				console.log( 'requestAPI responded...' );
				console.log( 'requestAPI Response: ' + JSON.stringify( response ) );
				console.log( 'requestAPI Response Type' + response.type );
				
				
				
				if( response.code == 'Success' ) {
					
					self.post.comments.push.apply( self.post.comments , response.comments );
					self.loading_more_comments = false;
					
					if( response.comments.length < 10 ) {
						self.display_view_more_comments_button = false;
					}
					
					self.comment_pages_loaded += 1;
					
					
				} else {
					
					let toast = self.toastCtrl.create({
						message: 'Could not load any more comments from the server. Please, try again later!',
						duration: 5000,
						cssClass: "toast-success"
					});
					toast.present();
					
					self.loading_more_comments = false;
				}
				

			}
		);
		
		
		
		
		
	}
	
	
	
	
	
	submit_comment() {
		
		this.loading_comment_posting = true;
		
		var self = this;
		self.dataprovider.requestAPI(
			'post',
			'wp-json/delhideveloper/v1/comment_create', 
			{
				comment: self.comment,
				post_id: self.post.id
			},
			'',
			true, /* Token To Not Be Sent To API */
			function(response) {
				
				/* Logging 'Request Has Responded' event */
				console.log( 'requestAPI responded...' );
				console.log( 'requestAPI Response: ' + JSON.stringify( response ) );
				console.log( 'requestAPI Response Type' + response.type );
				
				
				
				if( response.code == 'Success' ) {
					
					self.post.comments.unshift( response.comment );
					self.comment = '';
					self.loading_comment_posting = false;
					
					let toast = self.toastCtrl.create({
						message: 'Comment Saved!',
						duration: 3000,
						cssClass: "toast-success"
					});
					toast.present();
					
				} else {
					
					let toast = self.toastCtrl.create({
						message: 'Your comment could not be posted. It could be that that you are commenting too fast. Our servers do not allow that!',
						duration: 10000,
						cssClass: "toast-success",
						showCloseButton: true,
						closeButtonText: 'OK'
					});
					toast.present();
					
					self.loading_comment_posting = false;
				}
				

			}
		);
		
		
		
	}
	
	go_to_login_page() {
		this.nav.push(LoginPage);
	}

}
