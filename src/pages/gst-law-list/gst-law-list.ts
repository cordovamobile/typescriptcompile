
import { Component } from '@angular/core';
import { Nav, LoadingController, /*IonicPage,*/ NavController, NavParams, ToastController, AlertController  } from 'ionic-angular';

import { Dataprovider } from '../../providers/dataprovider';
import { ApplicationService } from '../../providers/application-service';

import { PostListByCategoryPage } from '../../pages/post-list-by-category/post-list-by-category';
import { GstLawSinglePage } from '../../pages/gst-law-single/gst-law-single';

/**
 * Generated class for the GstLawListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-gst-law-list',
  templateUrl: 'gst-law-list.html',
})
export class GstLawListPage {

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public dataprovider: Dataprovider,			
		public toastCtrl: ToastController,
		public alertCtrl: AlertController ,
		public nav: Nav,
		public application_service: ApplicationService,
	) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad GstLawListPage');
	}
	
	openBlogPage(id) {
		
		this.nav.setRoot(GstLawSinglePage,{id:id});
		
	}

}
