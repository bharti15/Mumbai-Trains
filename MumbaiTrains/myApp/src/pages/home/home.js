var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TrainsProvider } from '../../providers/trains/trains';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, trainsProvider) {
        this.navCtrl = navCtrl;
        this.trainsProvider = trainsProvider;
    }
    HomePage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.trains = {
            trainNo: '93027',
            stnfrom: 'ABS',
            stnto: 'JU' // Jodhpur Junction
        };
        this.trainsProvider.getTrainStatus(this.trains.trainNo, this.trains.stnfrom, this.trains.stnto)
            .subscribe(function (trains) {
            console.log(trains);
            console.log(trains.json());
            var len = trains.json().stations.length;
            var trainList = [];
            for (var i = 0; i < len; i++) {
                trainList[i] = trains.json().stations[i].code;
            }
            console.log(trainList);
            for (var i = 0; i < len; i++) {
                trainList[i] = trains.json().stations[i].code;
            }
            console.log(trains.status);
            _this.train = trains.status;
        });
    };
    HomePage.prototype.signIn = function () {
        this.navCtrl.push(LoginPage);
    };
    HomePage.prototype.register = function () {
        this.navCtrl.push(RegisterPage);
    };
    HomePage = __decorate([
        Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        }),
        __metadata("design:paramtypes", [NavController, TrainsProvider])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map