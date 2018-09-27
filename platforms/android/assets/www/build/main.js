webpackJsonp([0],{

/***/ 110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HttpProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_firebase__);
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
  Generated class for the HttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var HttpProvider = /** @class */ (function () {
    function HttpProvider() {
    }
    HttpProvider.prototype.createAccount = function (user) {
        return __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.auth().createUserWithEmailAndPassword(user.email, user.password);
    };
    HttpProvider.prototype.login = function (user) {
        return __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.auth().signInWithEmailAndPassword(user.email, user.password);
    };
    HttpProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], HttpProvider);
    return HttpProvider;
}());

//# sourceMappingURL=http.js.map

/***/ }),

/***/ 119:
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
webpackEmptyAsyncContext.id = 119;

/***/ }),

/***/ 160:
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
webpackEmptyAsyncContext.id = 160;

/***/ }),

/***/ 328:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_in_app_purchase__ = __webpack_require__(329);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(330);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_load_load__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_stores_user__ = __webpack_require__(45);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};








/**
 * Generated class for the LoadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoadPage = /** @class */ (function () {
    function LoadPage(navCtrl, navParams, loader, iap, storage, user) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loader = loader;
        this.iap = iap;
        this.storage = storage;
        this.user = user;
        this.purchases = null;
    }
    LoadPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.loader.createLoader();
        this.loader.presentLoader();
        this.iap.restorePurchases()
            .then(function (result) {
            //set purchased flag here
            _this.purchases = result;
            _this.doInitialSetup();
        })
            .catch(function (err) {
            _this.doInitialSetup();
        });
    };
    LoadPage.prototype.ionViewDidLeave = function () {
        this.loader.dismissLoader();
    };
    LoadPage.prototype.doInitialSetup = function () {
        return __awaiter(this, void 0, void 0, function () {
            var value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.get('LoggedIn')];
                    case 1:
                        value = _a.sent();
                        if (!(value == true)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.user.load()];
                    case 2:
                        _a.sent();
                        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
                        return [3 /*break*/, 4];
                    case 3:
                        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */]);
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LoadPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-load',template:/*ion-inline-start:"/Users/austinhunter/Documents/GitHub/food-tracker/src/pages/load/load.html"*/'<!--\n  Generated template for the LoadPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-content padding style="background-color: gray">\n\n</ion-content>\n'/*ion-inline-end:"/Users/austinhunter/Documents/GitHub/food-tracker/src/pages/load/load.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_6__providers_load_load__["a" /* LoadProvider */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_in_app_purchase__["a" /* InAppPurchase */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_7__providers_stores_user__["a" /* UserProvider */]])
    ], LoadPage);
    return LoadPage;
}());

//# sourceMappingURL=load.js.map

/***/ }),

/***/ 330:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_http_http__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_load_load__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_stores_user__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__sign_up_sign_up__ = __webpack_require__(331);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__home_home__ = __webpack_require__(44);
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
var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, navParams, modalCtrl, http, loader, user) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.http = http;
        this.loader = loader;
        this.user = user;
        this.userData = {
            email: '',
            password: ''
        };
    }
    LoginPage.prototype.ionViewWillLeave = function () {
        this.user.store();
    };
    LoginPage.prototype.ionViewDidLeave = function () {
        console.log(this.user.user);
    };
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.showSignUpModal = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__sign_up_sign_up__["a" /* SignUpPage */]);
        modal.present();
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        this.loader.createLoader();
        this.loader.presentLoader();
        this.http.login(this.userData).then(function (data) {
            _this.loader.dismissLoader();
            _this.user.setLoginFlag(true);
            _this.user.set(data);
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__home_home__["a" /* HomePage */]);
        })
            .catch(function (e) {
            _this.loader.dismissLoader();
            alert(e.message);
        });
    };
    LoginPage.prototype.onKey = function (event, state) {
        if (state == 'user') {
            this.userData.email = event.target.value;
        }
        else if (state == 'pass') {
            this.userData.password = event.target.value;
        }
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/Users/austinhunter/Documents/GitHub/food-tracker/src/pages/login/login.html"*/'<!--\n  Generated template for the LoginPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n<ion-content padding>\n  <div class="div-padding">\n    <ion-row>\n      <ion-col>\n        <ion-list inset [@bounceInBottom]="formState">\n\n          <ion-item>\n            <ion-label>Email</ion-label>\n            <ion-input type="text" required [ngModel]="userData.email" (keyup)="onKey($event, \'user\')" autocapitalize="none"></ion-input>\n          </ion-item>\n\n          <ion-item>\n            <ion-label>Password</ion-label>\n            <ion-input type="password" required minlength="6" [ngModel]="userData.password" (keyup)="onKey($event, \'pass\')" ></ion-input>\n          </ion-item>\n\n        </ion-list>\n      </ion-col>\n    </ion-row>\n\n    <ion-row>\n      <ion-col>\n        <button ion-button class="login-button" [@fadeIn]="loginState" (click)="login()">Login</button>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>\n        <a class="sign-up-button" [@fadeIn]="loginState" (click)="showSignUpModal()">Sign Up</a>\n      </ion-col>\n    </ion-row>\n\n  </div>\n\n</ion-content>\n'/*ion-inline-end:"/Users/austinhunter/Documents/GitHub/food-tracker/src/pages/login/login.html"*/,
            animations: [
                //For the login form
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_24" /* trigger */])('bounceInBottom', [
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_21" /* state */])('in', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_22" /* style */])({
                        transform: 'translate3d(0,0,0)'
                    })),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_23" /* transition */])('void => *', [
                        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* animate */])('1500ms 200ms ease-in', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_18" /* keyframes */])([
                            Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_22" /* style */])({ transform: 'translate3d(0,1000px,0)', offset: 0 }),
                            Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_22" /* style */])({ transform: 'translate3d(0,-20px,0)', offset: 0.9 }),
                            Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_22" /* style */])({ transform: 'translate3d(0,0,0)', offset: 1 })
                        ]))
                    ])
                ]),
                //For login button
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_24" /* trigger */])('fadeIn', [
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_21" /* state */])('in', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_22" /* style */])({
                        opacity: 1
                    })),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_23" /* transition */])('void => *', [
                        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_22" /* style */])({ opacity: 0 }),
                        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* animate */])('1000ms 1500ms ease-in')
                    ])
                ])
            ]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* ModalController */], __WEBPACK_IMPORTED_MODULE_2__providers_http_http__["a" /* HttpProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_load_load__["a" /* LoadProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_stores_user__["a" /* UserProvider */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 331:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignUpPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_load_load__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_http_http__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(44);
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
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SignUpPage = /** @class */ (function () {
    function SignUpPage(navCtrl, navParams, viewCtrl, http, loader, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.http = http;
        this.loader = loader;
        this.storage = storage;
        this.user = {
            email: '',
            password: '',
            passwordConf: ''
        };
        this.disabled = false;
    }
    SignUpPage.prototype.ionViewDidLoad = function () {
    };
    SignUpPage.prototype.submit = function () {
        var _this = this;
        this.loader.createLoader();
        this.loader.presentLoader();
        this.http.createAccount(this.user).then(function (data) {
            _this.loader.dismissLoader();
            _this.storage.set('LoggedIn', true);
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */], {
                user: data
            });
        })
            .catch(function (e) {
            _this.loader.dismissLoader();
            alert(e.message);
        });
    };
    SignUpPage.prototype.cancelModal = function () {
        this.viewCtrl.dismiss();
    };
    SignUpPage.prototype.onKey = function (event, state) {
        if (state == 'pass') {
            this.user.password = event.target.value;
        }
        else if (state == 'email') {
            this.user.email = event.target.value;
        }
        else {
            this.user.passwordConf = event.target.value;
        }
        if ((this.user.email.length > 0) && (this.user.password.length >= 6) && (this.user.passwordConf === this.user.password)) {
            this.disabled = false;
        }
    };
    SignUpPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-sign-up',template:/*ion-inline-start:"/Users/austinhunter/Documents/GitHub/food-tracker/src/pages/sign-up/sign-up.html"*/'<!--\n  Generated template for the SignUpPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-content padding>\n  <div class="div-padding">\n    <ion-row>\n      <ion-col>\n        <ion-list inset [@bounceInBottom]="formState">\n\n          <ion-item>\n            <ion-label>Email</ion-label>\n            <ion-input type="text" required [ngModel]="user.email" (keyup)="onKey($event, \'email\')" autocapitalize="none"></ion-input>\n          </ion-item>\n\n          <ion-item>\n            <ion-label>Password</ion-label>\n            <ion-input type="password" required minlength="6" [ngModel]="user.password" (keyup)="onKey($event, \'pass\')"></ion-input>\n          </ion-item>\n          <small style="color: red;" [hidden]="user.password.length >= 6 || user.password == \'\'">\n            {{user.password.length}} of 6 Characters\n          </small>\n\n          <ion-item>\n            <ion-label>Confirm Password</ion-label>\n            <ion-input type="password" required [ngModel]="user.passwordConf" (keyup)="onKey($event, \'conf\')"></ion-input>\n          </ion-item>\n          <small style="color: red;" [hidden]="(user.password == user.passwordConf) || user.password == \'\'">\n            Passwords Do Not Match\n          </small>\n\n        </ion-list>\n      </ion-col>\n    </ion-row>\n\n    <ion-row>\n      <ion-col>\n        <button ion-button class="login-button" (click)="submit()" [@fadeIn]="loginState" [disabled]="disabled">Sign Up</button>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>\n        <a class="sign-up-button" [@fadeIn]="loginState" (click)="cancelModal()">Cancel</a>\n      </ion-col>\n    </ion-row>\n\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/austinhunter/Documents/GitHub/food-tracker/src/pages/sign-up/sign-up.html"*/,
            animations: [
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_24" /* trigger */])('bounceInBottom', [
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_21" /* state */])('in', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_22" /* style */])({
                        transform: 'translate3d(0,0,0)'
                    })),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_23" /* transition */])('void => *', [
                        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* animate */])('800ms 50ms ease-in', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_18" /* keyframes */])([
                            Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_22" /* style */])({ transform: 'translate3d(0,1000px,0)', offset: 0 }),
                            Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_22" /* style */])({ transform: 'translate3d(0,-20px,0)', offset: 0.9 }),
                            Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_22" /* style */])({ transform: 'translate3d(0,0,0)', offset: 1 })
                        ]))
                    ])
                ]),
                //For login button
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_24" /* trigger */])('fadeIn', [
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_21" /* state */])('in', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_22" /* style */])({
                        opacity: 1
                    })),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_23" /* transition */])('void => *', [
                        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_22" /* style */])({ opacity: 0 }),
                        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* animate */])('500ms 800ms ease-in')
                    ])
                ])
            ]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */], __WEBPACK_IMPORTED_MODULE_3__providers_http_http__["a" /* HttpProvider */], __WEBPACK_IMPORTED_MODULE_2__providers_load_load__["a" /* LoadProvider */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]])
    ], SignUpPage);
    return SignUpPage;
}());

//# sourceMappingURL=sign-up.js.map

/***/ }),

/***/ 334:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(335);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(357);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 357:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic3_calendar_en__ = __webpack_require__(400);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(406);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_add_form_add_form__ = __webpack_require__(429);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_load_load__ = __webpack_require__(328);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_sign_up_sign_up__ = __webpack_require__(331);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_login_login__ = __webpack_require__(330);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_status_bar__ = __webpack_require__(324);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_splash_screen__ = __webpack_require__(326);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_in_app_purchase__ = __webpack_require__(329);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_fcm__ = __webpack_require__(332);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_storage__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__angular_platform_browser_animations__ = __webpack_require__(430);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_http__ = __webpack_require__(432);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_google_plus__ = __webpack_require__(433);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__providers_load_load__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__providers_http_http__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__providers_stores_user__ = __webpack_require__(45);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_add_form_add_form__["a" /* AddFormPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_load_load__["a" /* LoadPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_sign_up_sign_up__["a" /* SignUpPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_login_login__["a" /* LoginPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_14__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_15__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_3_ionic3_calendar_en__["a" /* CalendarModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_add_form_add_form__["a" /* AddFormPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_load_load__["a" /* LoadPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_sign_up_sign_up__["a" /* SignUpPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_login_login__["a" /* LoginPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_in_app_purchase__["a" /* InAppPurchase */],
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_fcm__["a" /* FCM */],
                __WEBPACK_IMPORTED_MODULE_18__providers_load_load__["a" /* LoadProvider */],
                __WEBPACK_IMPORTED_MODULE_16__ionic_native_http__["a" /* HTTP */],
                __WEBPACK_IMPORTED_MODULE_19__providers_http_http__["a" /* HttpProvider */],
                __WEBPACK_IMPORTED_MODULE_17__ionic_native_google_plus__["a" /* GooglePlus */],
                __WEBPACK_IMPORTED_MODULE_20__providers_stores_user__["a" /* UserProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 403:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 201,
	"./af.js": 201,
	"./ar": 202,
	"./ar-dz": 203,
	"./ar-dz.js": 203,
	"./ar-kw": 204,
	"./ar-kw.js": 204,
	"./ar-ly": 205,
	"./ar-ly.js": 205,
	"./ar-ma": 206,
	"./ar-ma.js": 206,
	"./ar-sa": 207,
	"./ar-sa.js": 207,
	"./ar-tn": 208,
	"./ar-tn.js": 208,
	"./ar.js": 202,
	"./az": 209,
	"./az.js": 209,
	"./be": 210,
	"./be.js": 210,
	"./bg": 211,
	"./bg.js": 211,
	"./bm": 212,
	"./bm.js": 212,
	"./bn": 213,
	"./bn.js": 213,
	"./bo": 214,
	"./bo.js": 214,
	"./br": 215,
	"./br.js": 215,
	"./bs": 216,
	"./bs.js": 216,
	"./ca": 217,
	"./ca.js": 217,
	"./cs": 218,
	"./cs.js": 218,
	"./cv": 219,
	"./cv.js": 219,
	"./cy": 220,
	"./cy.js": 220,
	"./da": 221,
	"./da.js": 221,
	"./de": 222,
	"./de-at": 223,
	"./de-at.js": 223,
	"./de-ch": 224,
	"./de-ch.js": 224,
	"./de.js": 222,
	"./dv": 225,
	"./dv.js": 225,
	"./el": 226,
	"./el.js": 226,
	"./en-au": 227,
	"./en-au.js": 227,
	"./en-ca": 228,
	"./en-ca.js": 228,
	"./en-gb": 229,
	"./en-gb.js": 229,
	"./en-ie": 230,
	"./en-ie.js": 230,
	"./en-il": 231,
	"./en-il.js": 231,
	"./en-nz": 232,
	"./en-nz.js": 232,
	"./eo": 233,
	"./eo.js": 233,
	"./es": 234,
	"./es-do": 235,
	"./es-do.js": 235,
	"./es-us": 236,
	"./es-us.js": 236,
	"./es.js": 234,
	"./et": 237,
	"./et.js": 237,
	"./eu": 238,
	"./eu.js": 238,
	"./fa": 239,
	"./fa.js": 239,
	"./fi": 240,
	"./fi.js": 240,
	"./fo": 241,
	"./fo.js": 241,
	"./fr": 242,
	"./fr-ca": 243,
	"./fr-ca.js": 243,
	"./fr-ch": 244,
	"./fr-ch.js": 244,
	"./fr.js": 242,
	"./fy": 245,
	"./fy.js": 245,
	"./gd": 246,
	"./gd.js": 246,
	"./gl": 247,
	"./gl.js": 247,
	"./gom-latn": 248,
	"./gom-latn.js": 248,
	"./gu": 249,
	"./gu.js": 249,
	"./he": 250,
	"./he.js": 250,
	"./hi": 251,
	"./hi.js": 251,
	"./hr": 252,
	"./hr.js": 252,
	"./hu": 253,
	"./hu.js": 253,
	"./hy-am": 254,
	"./hy-am.js": 254,
	"./id": 255,
	"./id.js": 255,
	"./is": 256,
	"./is.js": 256,
	"./it": 257,
	"./it.js": 257,
	"./ja": 258,
	"./ja.js": 258,
	"./jv": 259,
	"./jv.js": 259,
	"./ka": 260,
	"./ka.js": 260,
	"./kk": 261,
	"./kk.js": 261,
	"./km": 262,
	"./km.js": 262,
	"./kn": 263,
	"./kn.js": 263,
	"./ko": 264,
	"./ko.js": 264,
	"./ky": 265,
	"./ky.js": 265,
	"./lb": 266,
	"./lb.js": 266,
	"./lo": 267,
	"./lo.js": 267,
	"./lt": 268,
	"./lt.js": 268,
	"./lv": 269,
	"./lv.js": 269,
	"./me": 270,
	"./me.js": 270,
	"./mi": 271,
	"./mi.js": 271,
	"./mk": 272,
	"./mk.js": 272,
	"./ml": 273,
	"./ml.js": 273,
	"./mn": 274,
	"./mn.js": 274,
	"./mr": 275,
	"./mr.js": 275,
	"./ms": 276,
	"./ms-my": 277,
	"./ms-my.js": 277,
	"./ms.js": 276,
	"./mt": 278,
	"./mt.js": 278,
	"./my": 279,
	"./my.js": 279,
	"./nb": 280,
	"./nb.js": 280,
	"./ne": 281,
	"./ne.js": 281,
	"./nl": 282,
	"./nl-be": 283,
	"./nl-be.js": 283,
	"./nl.js": 282,
	"./nn": 284,
	"./nn.js": 284,
	"./pa-in": 285,
	"./pa-in.js": 285,
	"./pl": 286,
	"./pl.js": 286,
	"./pt": 287,
	"./pt-br": 288,
	"./pt-br.js": 288,
	"./pt.js": 287,
	"./ro": 289,
	"./ro.js": 289,
	"./ru": 290,
	"./ru.js": 290,
	"./sd": 291,
	"./sd.js": 291,
	"./se": 292,
	"./se.js": 292,
	"./si": 293,
	"./si.js": 293,
	"./sk": 294,
	"./sk.js": 294,
	"./sl": 295,
	"./sl.js": 295,
	"./sq": 296,
	"./sq.js": 296,
	"./sr": 297,
	"./sr-cyrl": 298,
	"./sr-cyrl.js": 298,
	"./sr.js": 297,
	"./ss": 299,
	"./ss.js": 299,
	"./sv": 300,
	"./sv.js": 300,
	"./sw": 301,
	"./sw.js": 301,
	"./ta": 302,
	"./ta.js": 302,
	"./te": 303,
	"./te.js": 303,
	"./tet": 304,
	"./tet.js": 304,
	"./tg": 305,
	"./tg.js": 305,
	"./th": 306,
	"./th.js": 306,
	"./tl-ph": 307,
	"./tl-ph.js": 307,
	"./tlh": 308,
	"./tlh.js": 308,
	"./tr": 309,
	"./tr.js": 309,
	"./tzl": 310,
	"./tzl.js": 310,
	"./tzm": 311,
	"./tzm-latn": 312,
	"./tzm-latn.js": 312,
	"./tzm.js": 311,
	"./ug-cn": 313,
	"./ug-cn.js": 313,
	"./uk": 314,
	"./uk.js": 314,
	"./ur": 315,
	"./ur.js": 315,
	"./uz": 316,
	"./uz-latn": 317,
	"./uz-latn.js": 317,
	"./uz.js": 316,
	"./vi": 318,
	"./vi.js": 318,
	"./x-pseudo": 319,
	"./x-pseudo.js": 319,
	"./yo": 320,
	"./yo.js": 320,
	"./zh-cn": 321,
	"./zh-cn.js": 321,
	"./zh-hk": 322,
	"./zh-hk.js": 322,
	"./zh-tw": 323,
	"./zh-tw.js": 323
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 403;

/***/ }),

/***/ 406:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(324);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(326);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_load_load__ = __webpack_require__(328);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_stores_user__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_fcm__ = __webpack_require__(332);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_storage__ = __webpack_require__(46);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, fcm, events, storage, userData) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.fcm = fcm;
        this.events = events;
        this.storage = storage;
        this.userData = userData;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_load_load__["a" /* LoadPage */];
        this.user = {
            email: null
        };
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */], icon: 'home' }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.splashScreen.hide();
            __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.initializeApp({
                apiKey: "AIzaSyCLOlz7uQrEC-HutG9MILNsgMtFE5CyOyU",
                authDomain: "foodtracker-8cd65.firebaseapp.com",
                databaseURL: "https://foodtracker-8cd65.firebaseio.com/",
                projectId: "foodtracker-8cd65",
                storageBucket: "gs://foodtracker-8cd65.appspot.com",
                messagingSenderId: "1074520532115"
            });
            _this.fcm.getToken().then(function (token) {
            });
            _this.fcm.onNotification().subscribe(function (data) {
                if (data.wasTapped) {
                    console.log("Received in background");
                }
                else {
                    console.log("Received in foreground");
                }
                ;
            });
            _this.events.subscribe('user:created', function (email) {
                _this.user.email = email;
            });
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/austinhunter/Documents/GitHub/food-tracker/src/app/app.html"*/'<ion-menu [content]="content" id="menu-avatar">\n  <ion-content>\n    <div #header>\n      <ion-row style="align-items:center;">\n        <ion-col col-3>\n          <img src="" />\n          <span class="icon-badge"></span>\n        </ion-col>\n        <ion-col col-6>\n          <img class="user-avatar round" [src]="" onerror="this.src=\'assets/img/avatar/girl-avatar.png\'"/>\n        </ion-col>\n        <ion-col col-3>\n          <img src="" />\n        </ion-col>\n      </ion-row>\n      <ion-row style="justify-content: center;">\n        <h3>{{user.email}}</h3>\n      </ion-row>\n    </div>\n    <ion-list no-lines>\n      <button menuClose ion-item detail-none *ngFor="let p of pages" (click)="openPage(p)">\n        <ion-icon [name]="p.icon" item-left></ion-icon>\n        {{p.title}}\n      </button>\n      <button menuClose ion-item detail-none (click)="upgrade()">\n        <ion-icon name="pricetag" item-left></ion-icon>\n        Upgrade Account\n      </button>\n    </ion-list>\n  </ion-content>\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n'/*ion-inline-end:"/Users/austinhunter/Documents/GitHub/food-tracker/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_fcm__["a" /* FCM */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* Events */], __WEBPACK_IMPORTED_MODULE_9__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_7__providers_stores_user__["a" /* UserProvider */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 429:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddFormPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AddFormPage = /** @class */ (function () {
    function AddFormPage(navCtrl, navParams, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
    }
    AddFormPage.prototype.cancelModal = function () {
        this.viewCtrl.dismiss();
    };
    AddFormPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-add-form',template:/*ion-inline-start:"/Users/austinhunter/Documents/GitHub/food-tracker/src/pages/add-form/add-form.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Add Entry</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n  \n</ion-content>\n'/*ion-inline-end:"/Users/austinhunter/Documents/GitHub/food-tracker/src/pages/add-form/add-form.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */]])
    ], AddFormPage);
    return AddFormPage;
}());

//# sourceMappingURL=add-form.js.map

/***/ }),

/***/ 44:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_firebase__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_stores_user__ = __webpack_require__(45);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, navParams, events, modalCtrl, userData) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.events = events;
        this.modalCtrl = modalCtrl;
        this.userData = userData;
        this.user = null;
        this.eventsList = null;
        this.ref = __WEBPACK_IMPORTED_MODULE_0_firebase___default.a.database().ref('user-accounts/');
    }
    HomePage.prototype.ionViewWillLoad = function () {
        this.user = this.userData.user;
        this.events.publish('user:created', this.user.user.email);
    };
    HomePage.prototype.onDaySelect = function (event) {
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/austinhunter/Documents/GitHub/food-tracker/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon color="white" name="menu"></ion-icon>\n    </button>\n  </ion-navbar>\n</ion-header>\n<ion-content padding>\n  <ion-calendar #calendar lang="en" (onDaySelect)="onDaySelect($event)"></ion-calendar>\n</ion-content>\n'/*ion-inline-end:"/Users/austinhunter/Documents/GitHub/food-tracker/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* Events */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* ModalController */], __WEBPACK_IMPORTED_MODULE_3__providers_stores_user__["a" /* UserProvider */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 45:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_storage__ = __webpack_require__(46);
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};


var UserProvider = /** @class */ (function () {
    function UserProvider(storage) {
        this.storage = storage;
    }
    UserProvider.prototype.set = function (user) {
        this.user = user;
    };
    UserProvider.prototype.get = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.get('User')];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserProvider.prototype.setLoginFlag = function (flag) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loggedIn = flag;
                        return [4 /*yield*/, this.storage.set('LoggedIn', this.loggedIn)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserProvider.prototype.store = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.set('User', JSON.stringify(this.user))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserProvider.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.get()];
                    case 1:
                        _a.user = _b.sent();
                        this.user = JSON.parse(this.user);
                        return [2 /*return*/];
                }
            });
        });
    };
    UserProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__ionic_storage__["b" /* Storage */]])
    ], UserProvider);
    return UserProvider;
}());

//# sourceMappingURL=user.js.map

/***/ }),

/***/ 57:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
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
  Generated class for the LoadProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var LoadProvider = /** @class */ (function () {
    function LoadProvider(loadingCtrl) {
        this.loadingCtrl = loadingCtrl;
        this.loader = null;
    }
    LoadProvider.prototype.createLoader = function () {
        this.loader = this.loadingCtrl.create({
            spinner: 'hide',
            content: "<div class=\"cssload-container\">\n                    <div class=\"cssload-whirlpool\"></div>\n                </div>",
            cssClass: 'loader'
        });
    };
    LoadProvider.prototype.presentLoader = function () {
        this.loader.present();
    };
    LoadProvider.prototype.dismissLoader = function () {
        this.loader.dismiss();
    };
    LoadProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */]])
    ], LoadProvider);
    return LoadProvider;
}());

//# sourceMappingURL=load.js.map

/***/ })

},[334]);
//# sourceMappingURL=main.js.map