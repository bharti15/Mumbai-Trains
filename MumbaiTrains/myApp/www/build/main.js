webpackJsonp([4],{

/***/ 100:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DatabasePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(77);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the DatabasePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var DatabasePage = (function () {
    function DatabasePage(navCtrl, http, NP, fb, toastCtrl) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.NP = NP;
        this.fb = fb;
        this.toastCtrl = toastCtrl;
        /**
         *      Flag to be used for checking whether we are adding/editing an entry
         */
        this.isEdited = false;
        /**
         *    Flag to hide the form upon successful completion of remote operation
         */
        this.hideForm = false;
        /**
         *     Property to store the recordID for when an existing entry is being edited
         */
        //public recordID               : any      = null;
        /**
         *      Remote URI for retrieving data from and sending data to
         */
        this.baseURI = "http://localhost:81/ionic-php-mysql/";
        // Create form builder validation rules
        this.form = fb.group({
            "userName": ["", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            "password": ["", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]
        });
    }
    /**
      * Triggered when template view is about to be entered
      * Determine whether we adding or editing a record
      * based on any supplied navigation parameters
      *
      */
    DatabasePage.prototype.ionViewWillEnter = function () {
        this.resetFields();
        if (this.NP.get("record")) {
            this.isEdited = true;
            this.selectEntry(this.NP.get("record"));
            this.pageTitle = 'Amend entry';
        }
        else {
            this.isEdited = false;
            this.pageTitle = 'Sign Up';
        }
    };
    /**
     * Assign the navigation retrieved data to properties
     * used as models on the page's HTML form
     *
     */
    DatabasePage.prototype.selectEntry = function (item) {
        this.userName = item.userName;
        this.password = item.password;
        //this.recordID     = item.id;
    };
    /**
     * Save a new record that has been added to the page's HTML form
     * Use angular's http post method to submit the record data
     *
     */
    DatabasePage.prototype.createEntry = function (userName, password) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json' }), options = { "key": "create", "userName": userName, "password": password }, url = this.baseURI + "manage-data.php";
        this.http.post(url, JSON.stringify(options), headers)
            .subscribe(function (data) {
            // If the request was successful notify the user
            _this.hideForm = true;
            _this.sendNotification("Congratulations: " + userName + " was successfully added");
        }, function (error) {
            _this.sendNotification('Something went wrong!');
        });
    };
    /**
     * Update an existing record that has been edited in the page's HTML form
     * Use angular's http post method to submit the record data
     * to our remote PHP script
     *
     */
    DatabasePage.prototype.updateEntry = function (userName, password) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json' }), options = { "key": "update", "userName": userName, "password": password /*, "recordID" : this.recordID*/ }, url = this.baseURI + "manage-data.php";
        this.http
            .post(url, JSON.stringify(options), headers)
            .subscribe(function (data) {
            // If the request was successful notify the user
            _this.hideForm = true;
            _this.sendNotification("Congratulations: " + userName + " was successfully updated");
        }, function (error) {
            _this.sendNotification('Something went wrong!');
        });
    };
    /**
     * Remove an existing record that has been selected in the page's HTML form
     * Use angular's http post method to submit the record data
     * to our remote PHP script
     *
     */
    DatabasePage.prototype.deleteEntry = function () {
        var _this = this;
        var userName = this.form.controls["userName"].value, headers = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json' }), options = { "key": "delete" /*, "recordID" : this.recordID*/ }, url = this.baseURI + "manage-data.php";
        this.http
            .post(url, JSON.stringify(options), headers)
            .subscribe(function (data) {
            _this.hideForm = true;
            _this.sendNotification("Congratulations: " + userName + " was successfully deleted");
        }, function (error) {
            _this.sendNotification('Something went wrong!');
        });
    };
    /**
     * Handle data submitted from the page's HTML form
     * Determine whether we are adding a new record or amending an
     * existing record
     *
     */
    DatabasePage.prototype.saveEntry = function () {
        var userName = this.form.controls["userName"].value, password = this.form.controls["password"].value;
        if (this.isEdited) {
            this.updateEntry(userName, password);
        }
        else {
            this.createEntry(userName, password);
        }
    };
    /**
     * Clear values in the page's HTML form fields
     *
     */
    DatabasePage.prototype.resetFields = function () {
        this.userName = "";
        this.password = "";
    };
    /**
     * Manage notifying the user of the outcome of remote operations
     *
     */
    DatabasePage.prototype.sendNotification = function (message) {
        var notification = this.toastCtrl.create({
            message: message,
            duration: 3000
        });
        notification.present();
    };
    DatabasePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DatabasePage');
    };
    DatabasePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-database',template:/*ion-inline-start:"/media/bharti/New Volume1/fullstack/ionic/myApp/src/pages/database/database.html"*/'<!--\n  Generated template for the DatabasePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n   <ion-navbar>\n      <ion-title>{{ pageTitle }}</ion-title>\n   </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n\n   <div>\n      \n\n\n      <div *ngIf="!hideForm">\n         <form [formGroup]="form" (ngSubmit)="saveEntry()">\n\n            <ion-list>\n               <ion-item-group>\n                  <ion-item-divider color="light">User Name *</ion-item-divider>\n                  <ion-item>\n                     <ion-input\n                        type="text"\n                        placeholder="Enter a name..."\n                        formControlName="userName"\n                        [(ngModel)]="userName"></ion-input>\n                  </ion-item>\n               </ion-item-group>\n\n\n               <ion-item-group>\n                  <ion-item-divider color="light">Password *</ion-item-divider>\n                  <ion-item>\n                     <ion-textarea\n                        placeholder="Password..."\n                        formControlName="password"\n                        rows="6"\n                        [(ngModel)]="password"></ion-textarea>\n                  </ion-item>\n               </ion-item-group>\n\n\n               <ion-item>\n                  <button\n                     ion-button\n                     color="primary"\n                     text-center\n                     block\n                     [disabled]="!form.valid">Register</button>\n               </ion-item>\n\n            </ion-list>\n\n         </form>\n      </div>\n   </div>\n\n\n</ion-content>'/*ion-inline-end:"/media/bharti/New Volume1/fullstack/ionic/myApp/src/pages/database/database.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ToastController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ToastController */]) === "function" && _e || Object])
    ], DatabasePage);
    return DatabasePage;
    var _a, _b, _c, _d, _e;
}());

/**
 
 <ion-item *ngIf="isEdited && !hideForm">
         <button
            ion-button
            item-right
            color="secondary"
            text-center
            block
            (click)="deleteEntry()">Remove this Entry?</button>
      </ion-item>


      <div *ngIf="hideForm">
         <ion-item class="post-entry-message" text-wrap>
            <h2>Success!</h2>
            <p>Maybe you'd like to edit an existing entry or add a new record?</p>
            <p>Simply go back to the home page and select the option you want to pursue.</p>
         </ion-item>
      </div>

*/ 
//# sourceMappingURL=database.js.map

/***/ }),

/***/ 101:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__train_details_train_details__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(77);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = (function () {
    function LoginPage(navCtrl, navParams, alertCtrl, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.http = http;
        /**
          *     Used to store returned PHP data
          */
        this.items = [];
    }
    /**
      * Triggered when template view is about to be entered
      * Returns and parses the PHP data through the load() method
      *
     ionViewWillEnter() : void
     {
        this.load();
     }
  
     /**
      * Retrieve the JSON encoded data from the remote server
      * Using Angular's Http class and an Observable - then
      * assign this to the items array for rendering to the HTML template
      *
      */
    LoginPage.prototype.load = function () {
        var _this = this;
        this.http
            .get('http://www.localhost:81/ionic-php-mysql/retrieve-data.php')
            .subscribe(function (data) {
            console.dir(data);
            _this.items = data;
        }, function (error) {
            console.dir(error);
        });
    };
    /**
     * Assign the navigation retrieved data to properties
     * used as models on the page's HTML form
     *
     */
    LoginPage.prototype.selectEntry = function (item) {
        this.userName = item.userName;
        this.password = item.password;
        //this.recordID     = item.id;
    };
    /**
     * Allow navigation to the AddTechnologyPage for creating a new entry
     *
     
    addEntry() : void
    {
       this.navCtrl.push('DatabasePage');
    }
    */
    /**
     * Allow navigation to the AddTechnologyPage for amending an existing entry
     * (We supply the actual record to be amended, as this method's parameter,
     * to the AddTechnologyPage
     *
     */
    LoginPage.prototype.viewEntry = function (param) {
        this.navCtrl.push('DatabasePage', param);
    };
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.signIn = function () {
        if (this.userName.value == "admin" && this.password.value == "admin") {
            var alert_1 = this.alertCtrl.create({
                title: 'New Friend!',
                subTitle: 'You are logged in!',
                buttons: ['OK']
            });
            alert_1.present();
            // this.navCtrl.push(DatabasePage);
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__train_details_train_details__["a" /* TrainDetailsPage */]);
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('username'),
        __metadata("design:type", Object)
    ], LoginPage.prototype, "userName", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('password'),
        __metadata("design:type", Object)
    ], LoginPage.prototype, "password", void 0);
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/media/bharti/New Volume1/fullstack/ionic/myApp/src/pages/login/login.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Sign In\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n<ion-list>\n\n  <ion-item>\n    <ion-label floating>Username</ion-label>\n    <ion-input type="text" #username></ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-label floating>Password</ion-label>\n    <ion-input type="password" #password></ion-input>\n  </ion-item>\n\n</ion-list>\n\n  <button ion-button block color="secondary" (click) = "signIn()" >Sign In</button>\n</ion-content>\n'/*ion-inline-end:"/media/bharti/New Volume1/fullstack/ionic/myApp/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 102:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TrainDetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_trains_trains__ = __webpack_require__(158);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the TrainDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TrainDetailsPage = (function () {
    function TrainDetailsPage(navCtrl, navParams, trainsProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.trainsProvider = trainsProvider;
        this.trainList = [];
        this.trainDes = [];
    }
    TrainDetailsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TrainDetailsPage');
    };
    TrainDetailsPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.trains = {
            trainNo: '93027',
            stnfrom: 'ABS',
            stnto: 'JU' // Jodhpur Junction
        };
        this.trainsProvider.getTrainStatus()
            .subscribe(function (station) {
            console.log(station);
            console.log(station.json());
            var len = station.json().stations.length;
            for (var i = 0; i < len; i++) {
                _this.trainList[i] = station.json().stations[i].code;
            }
            console.log(_this.trainList);
            _this.station = _this.trainList;
            for (var j = 0; j < len; j++) {
                _this.trainsProvider.getStationsDetails(_this.trainList[j], 2).subscribe(function (trains1) {
                    console.log(trains1.json().trains);
                    // this.trainDes[j]=(trains1.json().trains);
                    _this.trainDes.push(trains1.json().trains);
                    // console.log(this.trainDes[j]["0"]["name"]);
                    // console.log(this.trainDes.length);
                    trains1.json().trains;
                });
                //this.trains = this.trainDes;
            }
            // console.log(this.trainDes.length);
            //console.log(this.trainDes[0]["0"]["name"]);
            _this.trains = _this.trainDes;
        });
    };
    TrainDetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-train-details',template:/*ion-inline-start:"/media/bharti/New Volume1/fullstack/ionic/myApp/src/pages/train-details/train-details.html"*/'<!--\n  Generated template for the TrainDetailsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>trainDetails</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding class="trainDetails">\n\n	<ion-grid *ngIf="station">\n		<ion-row id="stn">\n			<ion-col width-50 offset-25>\n				<ion-list>\n					<ion-item *ngFor = "let counter of station; let i = index">\n  						{{station[i]}} <br>\n  						\n					</ion-item>\n				</ion-list>\n			</ion-col>\n		</ion-row>\n		\n	</ion-grid>\n\n</ion-content>\n\n'/*ion-inline-end:"/media/bharti/New Volume1/fullstack/ionic/myApp/src/pages/train-details/train-details.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_trains_trains__["a" /* TrainsProvider */]])
    ], TrainDetailsPage);
    return TrainDetailsPage;
}());

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
//# sourceMappingURL=train-details.js.map

/***/ }),

/***/ 115:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 115;

/***/ }),

/***/ 157:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/database/database.module": [
		283,
		3
	],
	"../pages/login/login.module": [
		284,
		2
	],
	"../pages/register/register.module": [
		285,
		1
	],
	"../pages/train-details/train-details.module": [
		286,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 157;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 158:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TrainsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the TrainsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var TrainsProvider = (function () {
    function TrainsProvider(http) {
        this.http = http;
        this.apiKey = 'sv08df0w5c';
        console.log('Hello TrainsProvider Provider');
        this.url1 = 'http://api.railwayapi.com/v2/code-to-name/code/';
        this.url2 = 'https://api.railwayapi.com/v2/arrivals/station/';
        //http://api.railwayapi.com/v2/live/train/12046/date/13-12-2017/apikey/sv08df0w5c/
        //https://api.railwayapi.com/v2/code-to-name/code/gkp/apikey/myapikey/
        //https://api.railwayapi.com/v2/arrivals/station/<stn code>/hours/<window period in hours>/apikey/<apikey>/
    }
    TrainsProvider.prototype.getStationsDetails = function (stnCode, windowPeriod) {
        return this.http.get(this.url2 + stnCode + '/hours/' + windowPeriod + '/apikey/' + this.apiKey + '/');
    };
    TrainsProvider.prototype.getTrainStatus = function () {
        return this.http.get(this.url1 + 'BCT/apikey/' + this.apiKey + '/');
    };
    TrainsProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Http */]])
    ], TrainsProvider);
    return TrainsProvider;
}());

//# sourceMappingURL=trains.js.map

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__database_database__ = __webpack_require__(100);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import { TrainsProvider } from '../../providers/trains/trains';

// import { RegisterPage } from '../register/register';

var HomePage = (function () {
    function HomePage(navCtrl /*, private trainsProvider: TrainsProvider*/) {
        this.navCtrl = navCtrl; /*, private trainsProvider: TrainsProvider*/
    }
    HomePage.prototype.ionViewWillEnter = function () {
        //this.trains = {
        //trainNo: '93027',
        //stnfrom: 'ABS', // Abohar
        //stnto: 'JU'  // Jodhpur Junction
    };
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
    HomePage.prototype.signIn = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
    };
    HomePage.prototype.register = function () {
        // this.navCtrl.push(RegisterPage);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__database_database__["a" /* DatabasePage */]);
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/media/bharti/New Volume1/fullstack/ionic/myApp/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Bombay Railway\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n<h2><u> Get Bombay Railway Trains Details </u></h2>\n<br><br>\n\n  <button ion-button color="secondary" (click) = "signIn()" >Sign In</button>\n  <br>\n\n  <button ion-button color="secondary" (click) = "register()" >Sign UP</button>\n\n  \n\n</ion-content>\n'/*ion-inline-end:"/media/bharti/New Volume1/fullstack/ionic/myApp/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */] /*, private trainsProvider: TrainsProvider*/])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 204:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RegisterPage = (function () {
    function RegisterPage(navCtrl, navParams, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
    }
    RegisterPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RegisterPage');
    };
    RegisterPage.prototype.register = function () {
        var alert = this.alertCtrl.create({
            title: this.uname.value + ' is registered now!',
            subTitle: 'You are logged in!',
            buttons: ['OK']
        });
        alert.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('username'),
        __metadata("design:type", Object)
    ], RegisterPage.prototype, "uname", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('password'),
        __metadata("design:type", Object)
    ], RegisterPage.prototype, "pass", void 0);
    RegisterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-register',template:/*ion-inline-start:"/media/bharti/New Volume1/fullstack/ionic/myApp/src/pages/register/register.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Sign Up\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n<ion-list>\n\n  <ion-item>\n    <ion-label floating>Username</ion-label>\n    <ion-input type="text" #username></ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-label floating>Password</ion-label>\n    <ion-input type="password" #password></ion-input>\n  </ion-item>\n\n</ion-list>\n\n  <button ion-button block color="secondary" (click) = "register()" >Sign Up</button>\n</ion-content>\n'/*ion-inline-end:"/media/bharti/New Volume1/fullstack/ionic/myApp/src/pages/register/register.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], RegisterPage);
    return RegisterPage;
}());

//# sourceMappingURL=register.js.map

/***/ }),

/***/ 205:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(227);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 227:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common_http__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_home_home__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_login_login__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_register_register__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_trains_trains__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_train_details_train_details__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_database_database__ = __webpack_require__(100);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_register_register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_train_details_train_details__["a" /* TrainDetailsPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_database_database__["a" /* DatabasePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/database/database.module#DatabasePageModule', name: 'DatabasePage', segment: 'database', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/register/register.module#RegisterPageModule', name: 'RegisterPage', segment: 'register', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/train-details/train-details.module#TrainDetailsPageModule', name: 'TrainDetailsPage', segment: 'train-details', priority: 'low', defaultHistory: [] }
                    ]
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_register_register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_train_details_train_details__["a" /* TrainDetailsPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_database_database__["a" /* DatabasePage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_11__providers_trains_trains__["a" /* TrainsProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 282:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(203);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/media/bharti/New Volume1/fullstack/ionic/myApp/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/media/bharti/New Volume1/fullstack/ionic/myApp/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[205]);
//# sourceMappingURL=main.js.map