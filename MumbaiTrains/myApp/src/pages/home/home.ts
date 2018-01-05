import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//import { TrainsProvider } from '../../providers/trains/trains';

import { LoginPage } from '../login/login';
// import { RegisterPage } from '../register/register';
import { DatabasePage } from '../database/database'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  trains:{
    trainNo: string,
    stnfrom: string,
    stnto: string
  }
  station:any;
  train:any;


  constructor(public navCtrl: NavController/*, private trainsProvider: TrainsProvider*/) {

  }

  ionViewWillEnter(){
    //this.trains = {
      //trainNo: '93027',
      //stnfrom: 'ABS', // Abohar
      //stnto: 'JU'  // Jodhpur Junction
    }

/*
    this.trainsProvider.getTrainStatus()
    .subscribe(station => {
      console.log(station);
      console.log(station.json());
      var len = station.json().stations.length;
      var trainList = [];
      var trainDes = [];
      for(var i=0; i<len; i++){
         trainList[i] = station.json().stations[i].code;
      }
      console.log(trainList);
      this.station = trainList;
      for(var j=0; j<len; j++){
         this.trainsProvider.getStationsDetails(trainList[j],2).subscribe(trains => {
           console.log(trains.json());
           trainDes[j] = trains.json();
         });
      }
      this.train = trainDes;
      console.log(station.status);
    });

    
  }
  */

  signIn(){
  	this.navCtrl.push(LoginPage);
  }

  register(){
    // this.navCtrl.push(RegisterPage);
    this.navCtrl.push(DatabasePage);
  }

}
