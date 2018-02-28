
import { Component } from '@angular/core';
import { Nav, /*IonicPage,*/ NavController, NavParams, ToastController, AlertController  } from 'ionic-angular';

import { Dataprovider } from '../../providers/dataprovider';
import { ApplicationService } from '../../providers/application-service';

import { PostSinglePage } from '../../pages/post-single/post-single';

/**
 * Generated class for the PostListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

//@IonicPage()

@Component({
	selector: 'page-post-list',
	templateUrl: 'post-list.html',
})
export class PostListPage {
	
	initial_loading: boolean;
	loading_more_posts: boolean;
	posts: any;
	pages_loaded: any;
	
	display_view_more_posts_button: boolean;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public dataprovider: Dataprovider,			
		public toastCtrl: ToastController,
		public alertCtrl: AlertController ,
		public nav: Nav,
		public application_service: ApplicationService
	) {
		
		this.initial_loading = true;
		this.loading_more_posts = false;
		this.display_view_more_posts_button = true;
		this.pages_loaded = 0;
		
		this.posts = [{"id":"","date":"","date_gmt":"","guid":{"rendered":""},"modified":"","modified_gmt":"","slug":"","status":"","type":"","link":"","title":{"rendered":""},"content":{"rendered":"","protected":false},"excerpt":{"rendered":"","protected":false},"author":"","featured_media":"","comment_status":"","ping_status":"","sticky":false,"template":"","format":"","meta":[],"categories":[],"tags":[],"better_featured_image":{"id":"","alt_text":"","caption":"","description":"","media_type":"","media_details":{"width":"","height":"","file":"","sizes":{"thumbnail":{"file":"","width":"","height":"","mime-type":"","source_url":""}},"image_meta":{"aperture":"","credit":"","camera":"","caption":"","created_timestamp":"","copyright":"","focal_length":"","iso":"0","shutter_speed":"","title":"","orientation":"","keywords":[]}},"post":3064,"source_url":""}}];
		
		
		if (localStorage.getItem("top_ten_posts") !== null) {
			var top_ten_posts = JSON.parse(localStorage.getItem("top_ten_posts"));
			this.posts = top_ten_posts;
		}
		
		
		var self = this;
		self.dataprovider.requestBlogAPI(
			'get',
			'wp-json/wp/v2/posts?per_page=10&page=1', 
			{},
			'',
			false, /* Token To Not Be Sent To API */
			function(response) {
				
				/* Logging 'Request Has Responded' event */
				console.log( 'requestAPI responded...' );
				console.log( 'requestAPI Response: ' + JSON.stringify( response ) );
					
				if( ! (response instanceof Array) ) {
					response = [];
				}
					
					
				self.posts = response;
				self.pages_loaded = 1;
				self.initial_loading = false;
				
				/* Storing Into The top_ten_posts Array in LOcal Storage */
				localStorage.setItem("top_ten_posts", JSON.stringify( response ));
				
				if( response.length < 10 ) {
					self.display_view_more_posts_button = false;
				}
				

			}
		);
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad PostListPage');
	}
	
	
	openPost( p ) {
		
		this.navCtrl.push(
			PostSinglePage, 
			{
				"id"		: p.id,
				"thumbnail"	: p.better_featured_image.media_details.sizes.thumbnail.source_url,
				"title"		: p.title.rendered,
				"content"	: p.content.rendered,
				
			} 
		);
		
	}
	
	
	show_more_posts() {
		
		
		this.loading_more_posts = true;


		
		
		var self = this;
		self.dataprovider.requestBlogAPI(
			'get',
			'wp-json/wp/v2/posts?per_page=10&page=' + (self.pages_loaded + 1), 
			{},
			'',
			false, /* Token To Not Be Sent To API */
			function(response) {
				
				/* Logging 'Request Has Responded' event */
				console.log( 'requestAPI responded...' );
				console.log( 'requestAPI Response: ' + JSON.stringify( response ) );
					
				if( ! (response instanceof Array) ) {
					response = [];
				}

				self.posts.push.apply(
					self.posts, 
					response
				);
				if( response.length > 0 ) {
					self.pages_loaded += 1;
				} else {
					let toast = self.toastCtrl.create({
						message: 'No more posts could not be retreived from the server.',
						duration: 5000,
						cssClass: "toast-success",
						showCloseButton: true,
						closeButtonText: 'OK'
					});
					toast.present();						
				}
				self.loading_more_posts = false;
				
				if( response.length < 10 ) {
					self.display_view_more_posts_button = false;
				}
				

			}
		);
		

		
		
	}
	
	
	json(p) {
		return JSON.stringify(p);
	}
	
	
	
	
	
	
	

}
