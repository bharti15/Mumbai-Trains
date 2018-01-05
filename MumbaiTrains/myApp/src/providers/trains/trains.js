var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
/*
  Generated class for the TrainsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var TrainsProvider = /** @class */ (function () {
    function TrainsProvider(http) {
        this.http = http;
        this.apiKey = 'sv08df0w5c';
        console.log('Hello TrainsProvider Provider');
        this.url = 'http://api.railwayapi.com/v2/code-to-name/code/';
        //http://api.railwayapi.com/v2/live/train/12046/date/13-12-2017/apikey/sv08df0w5c/
        //https://api.railwayapi.com/v2/code-to-name/code/gkp/apikey/myapikey/
    }
    TrainsProvider.prototype.getStations = function () {
        return this.http.get(this.url);
    };
    TrainsProvider.prototype.getTrainStatus = function (trainNo, stnfrom, stnto) {
        return this.http.get(this.url + 'BCT/apikey/' + this.apiKey + '/');
    };
    TrainsProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http])
    ], TrainsProvider);
    return TrainsProvider;
}());
export { TrainsProvider };
//# sourceMappingURL=trains.js.map