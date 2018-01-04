import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserDetailsSavePage } from './user-details-save';

@NgModule({
  declarations: [
    UserDetailsSavePage,
  ],
  imports: [
    IonicPageModule.forChild(UserDetailsSavePage),
  ],
})
export class UserDetailsSavePageModule {}
