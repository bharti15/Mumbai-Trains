import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrainDetailsPage } from './train-details';

@NgModule({
  declarations: [
    TrainDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(TrainDetailsPage),
  ],
})
export class TrainDetailsPageModule {}
