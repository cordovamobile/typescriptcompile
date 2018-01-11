
import { Component } from '@angular/core';
import { Nav, /*IonicPage,*/ NavController, NavParams, ToastController, AlertController  } from 'ionic-angular';

import { Dataprovider } from '../../providers/dataprovider';
import { ApplicationService } from '../../providers/application-service';

import { CaClientEditPage } from '../../pages/ca-client-edit/ca-client-edit';
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
	selector: 'page-ca-client-dashboard',
	templateUrl: 'ca-client-dashboard.html',
})
export class CaClientDashboardPage {
	
	client: any;
	
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public dataprovider: Dataprovider,
		public toastCtrl: ToastController,
		public alertCtrl: AlertController,
		public nav: Nav,
		public application_service: ApplicationService
	) {
		
		this.client = {};
		
		if (this.navParams.get('client')) {
			this.client = this.navParams.get('client');
		}
		console.log( JSON.stringify( this.client ) );
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad CaClientDashboardPage');
	}
	
	openPage( page , client ) {
		var redirect;
		if( page == 'CaClientEditPage' ) {
			redirect = CaClientEditPage;
		}
		this.navCtrl.push( redirect, { "client" : client } );
	}

}