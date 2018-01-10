
import { Component } from '@angular/core';
import { Nav, /*IonicPage,*/ NavController, NavParams, ToastController, AlertController  } from 'ionic-angular';

import { Dataprovider } from '../../providers/dataprovider';
import { ApplicationService } from '../../providers/application-service';

/*
import { BusinessAddPage } from '../../pages/business-add/business-add';
import { BusinessListPage } from '../../pages/business-list/business-list';
*/

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
	selector: 'page-oc-business-dashboard',
	templateUrl: 'oc-business-dashboard.html',
})
export class OcBusinessDashboardPage {
	
	business: any;
	
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public dataprovider: Dataprovider,
		public toastCtrl: ToastController,
		public alertCtrl: AlertController,
		public nav: Nav,
		public application_service: ApplicationService
	) {
		
		this.business = {};
		
		if (this.navParams.get('business')) {
			this.business = this.navParams.get('business');
		}
		console.log( JSON.stringify( this.business ) );
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad OcBusinessDashboardPage');
	}
	
	openPage( page , business ) {
		this.navCtrl.push( page, { "business" : business } );
	}

}
