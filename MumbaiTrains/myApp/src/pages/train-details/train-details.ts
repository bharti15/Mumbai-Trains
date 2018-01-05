import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TrainsProvider } from '../../providers/trains/trains';

/**
 * Generated class for the TrainDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-train-details',
  templateUrl: 'train-details.html',
})
export class TrainDetailsPage {

	trains: any; 
	station: any;
  	train: any;
    trainList = [];
    trainDes = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,  private trainsProvider: TrainsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrainDetailsPage');
  }

  ionViewWillEnter(){
    this.trains = {
      trainNo: '93027',
      stnfrom: 'ABS', // Abohar
      stnto: 'JU'  // Jodhpur Junction
    }

  this.trainsProvider.getTrainStatus()
    .subscribe(station => {
      console.log(station);
      console.log(station.json());
      var len = station.json().stations.length;
      
      for(var i=0; i<len; i++){
         this.trainList[i] = station.json().stations[i].code;
      }
      console.log(this.trainList);
      this.station = this.trainList;
      for(var j=0; j<len; j++){
         this.trainsProvider.getStationsDetails(this.trainList[j],2).subscribe(trains1 => {
           console.log(trains1.json().trains);
           // this.trainDes[j]=(trains1.json().trains);
           this.trainDes.push(trains1.json().trains);
           // console.log(this.trainDes[j]["0"]["name"]);
           // console.log(this.trainDes.length);
           trains1.json().trains;
         });
         //this.trains = this.trainDes;
      }
      // console.log(this.trainDes.length);
      //console.log(this.trainDes[0]["0"]["name"]);
      this.trains = this.trainDes;
      
      
    });

}

}


/*
						<ion-list *ngIf="trainDes[i]">
  							<ion-item *ngFor = "let counter of trainDes[i]; let k = index">
  							{{trainDes[i]["k"]}} <br>
  							</ion-item>
  							<ul>
    							<li *ngFor="let item of train[i]">{{item.name}}<li>
   							</ul>
  						</ion-list>
*/