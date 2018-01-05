import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the TrainsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TrainsProvider {

	apiKey = 'sv08df0w5c';
	url1; 
  url2;

  constructor(public http: Http) {
    console.log('Hello TrainsProvider Provider');
    this.url1 = 'http://api.railwayapi.com/v2/code-to-name/code/';
    this.url2 = 'https://api.railwayapi.com/v2/arrivals/station/';
    //http://api.railwayapi.com/v2/live/train/12046/date/13-12-2017/apikey/sv08df0w5c/
    //https://api.railwayapi.com/v2/code-to-name/code/gkp/apikey/myapikey/
    //https://api.railwayapi.com/v2/arrivals/station/<stn code>/hours/<window period in hours>/apikey/<apikey>/
  }

  getStationsDetails(stnCode, windowPeriod){
  	return this.http.get(this.url2+stnCode+'/hours/'+windowPeriod+'/apikey/'+this.apiKey+'/');
  }

  getTrainStatus(){
  	return this.http.get(this.url1+'BCT/apikey/'+this.apiKey+'/');
  }
//this.url+trainNo+'/date/13-12-2017/apikey/'+this.apiKey+'/'
}
