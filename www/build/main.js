webpackJsonp([0],{

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_chat_chat__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_stores_user__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_native_audio__ = __webpack_require__(118);
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
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ChatPage = /** @class */ (function () {
    function ChatPage(navCtrl, navParams, chatService, user, viewCtrl, nativeAudio, keyboard) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.chatService = chatService;
        this.user = user;
        this.viewCtrl = viewCtrl;
        this.nativeAudio = nativeAudio;
        this.keyboard = keyboard;
        this.chats = [];
        this.chatpartner = this.chatService.currentChatPartner;
        this.chatuser = this.user;
        this.invertedChatPairId = this.chatuser.email + '|' + this.chatpartner.email;
    }
    ChatPage.prototype.ionViewDidEnter = function () {
        this.content.scrollToBottom(100);
    };
    ChatPage.prototype.ionViewWillLoad = function () {
        this.updateChats();
    };
    ChatPage.prototype.updateChats = function () {
        var self = this;
        __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.firestore().collection('chats').where("pair", "==", this.chatService.currentChatPairId).onSnapshot(function (querySnapshot) {
            self.chats = [];
            querySnapshot.forEach(function (doc) {
                self.chats.push(doc.data());
            });
            console.log(self.chats);
            self.content.scrollToBottom(300);
        });
    };
    ChatPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    ChatPage.prototype.addChat = function () {
        var _this = this;
        var receiver = this.chatpartner;
        var sender = {
            fullName: this.chatuser.fullName,
            avatar_image: this.chatuser.avatar_image,
            email: this.chatuser.email,
            token: this.chatuser.token,
            uid: this.chatuser.user.uid
        };
        if (this.message && this.message !== "") {
            this.chatPayload = {
                message: this.message,
                sender: sender,
                receiver: receiver,
                pair: this.chatService.currentChatPairId,
                time: new Date().getTime()
            };
            this.message = "";
            this.chatService
                .addChat(this.chatPayload)
                .then(function () {
                _this.nativeAudio.play('message', function () { return console.log('uniqueId1 is done playing'); });
            })
                .catch(function (err) {
                //Clear message box
                _this.message = _this.chatPayload.message;
                console.log(err);
            });
        }
    }; //addChat
    ChatPage.prototype.isChatPartner = function (senderEmail) {
        return senderEmail == this.chatpartner.email;
    };
    ChatPage.prototype.checkKeyboard = function () {
        if (this.keyboard.isOpen()) {
            this.content.scrollToBottom(300);
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])("content"),
        __metadata("design:type", Object)
    ], ChatPage.prototype, "content", void 0);
    ChatPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-chat',template:/*ion-inline-start:"/Users/austinhunter/Documents/GitHub/food-tracker/src/pages/chat/chat.html"*/'<ion-header>\n    <ion-navbar>\n      <ion-title>{{chatpartner.fullName}}</ion-title>\n      <ion-buttons>\n          <button ion-button icon-only (click)="dismiss()">\n              <ion-icon color="white" name="arrow-back"></ion-icon>\n            </button>\n      </ion-buttons>\n    </ion-navbar>\n  </ion-header>\n  \n  <ion-content #content padding id="chatPage">\n        <ion-list>\n            <ion-item no-lines text-wrap *ngFor="let chat of chats | sort:\'time\'">\n              <ion-avatar item-end *ngIf="!isChatPartner(chat.sender.email)">\n                  <img src="{{chatuser.avatar_image}}">\n              </ion-avatar>\n              <p class="chatbox" *ngIf="!isChatPartner(chat.sender.email)">{{chat.message}}</p>\n              <ion-avatar item-start *ngIf="isChatPartner(chat.sender.email)">\n                  <img src="{{chatpartner.avatar_image}}">\n              </ion-avatar>\n              <p class="chatbox chatbox-right" *ngIf="isChatPartner(chat.sender.email)">{{chat.message}}</p> \n            </ion-item>\n          </ion-list>\n  </ion-content>\n  \n  <ion-footer class="message-footer">\n      <ion-toolbar class="message-toolbar" color="light">\n        <ion-item>\n            <ion-textarea [(ngModel)]="message" class="message-input" placeholder="Enter Message" text-start autocomplete="on" autocorrect="on" (keydown)="checkKeyboard()"></ion-textarea>\n        </ion-item>\n        <ion-buttons end>\n            <button ion-button icon-only (click)="addChat()">\n              <ion-icon name="ios-send"></ion-icon>\n            </button>\n          </ion-buttons>\n      </ion-toolbar>\n    </ion-footer>'/*ion-inline-end:"/Users/austinhunter/Documents/GitHub/food-tracker/src/pages/chat/chat.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_chat_chat__["a" /* ChatProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_stores_user__["a" /* UserProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_native_audio__["a" /* NativeAudio */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Keyboard */]])
    ], ChatPage);
    return ChatPage;
}());

//# sourceMappingURL=chat.js.map

/***/ }),

/***/ 119:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommentsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_stores_user__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_http_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_load_load__ = __webpack_require__(24);
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
 * Generated class for the CommentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CommentsPage = /** @class */ (function () {
    function CommentsPage(navCtrl, navParams, user, http, viewCtrl, loader) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.user = user;
        this.http = http;
        this.viewCtrl = viewCtrl;
        this.loader = loader;
        this.post = null;
        this.comment = {
            avatar_image: this.user.avatar_image,
            user_name: this.user.fullName,
            posted: null,
            text: ''
        };
        this.post = navParams.get('post');
        console.log(this.post);
        if (this.post.comments === undefined)
            this.post.comments = [];
        for (var i = 0; i < this.post.comments.length; i++) {
            this.post.comments[i].time_since = __WEBPACK_IMPORTED_MODULE_3_moment___default()(this.post.comments[i].posted, 'MMMM Do YYYY, h:mm:ss a').fromNow();
        }
    }
    CommentsPage.prototype.updatePostComments = function (refresher) {
        return __awaiter(this, void 0, void 0, function () {
            var key, data, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        key = this.post.key;
                        return [4 /*yield*/, this.http.getPostData(this.post)];
                    case 1:
                        data = _a.sent();
                        this.post = data.val();
                        this.post.key = key;
                        if (this.post.comments === undefined)
                            this.post.comments = [];
                        for (i = 0; i < this.post.comments.length; i++) {
                            this.post.comments[i].time_since = __WEBPACK_IMPORTED_MODULE_3_moment___default()(this.post.comments[i].posted, 'MMMM Do YYYY, h:mm:ss a').fromNow();
                        }
                        if (refresher !== null)
                            refresher.complete();
                        return [2 /*return*/];
                }
            });
        });
    };
    CommentsPage.prototype.ionViewDidLoad = function () {
    };
    CommentsPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    CommentsPage.prototype.postComment = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loader.createLoader();
                        this.loader.presentLoader();
                        this.comment.posted = __WEBPACK_IMPORTED_MODULE_3_moment___default()().format('MMMM Do YYYY, h:mm:ss a');
                        this.post.comments.push(this.comment);
                        for (i = 0; i < this.post.comments.length; i++) {
                            if (this.post.comments[i].time_since !== undefined)
                                this.post.comments[i].time_since = null;
                        }
                        return [4 /*yield*/, this.http.updatePostComments(this.post)];
                    case 1:
                        _a.sent();
                        this.updatePostComments(null);
                        this.comment = {
                            avatar_image: this.user.avatar_image,
                            user_name: this.user.fullName,
                            posted: null,
                            text: ''
                        };
                        this.loader.dismissLoader();
                        return [2 /*return*/];
                }
            });
        });
    };
    CommentsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-comments',template:/*ion-inline-start:"/Users/austinhunter/Documents/GitHub/food-tracker/src/pages/comments/comments.html"*/'<!--\n  Generated template for the CommentsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-buttons>\n        <button ion-button icon-only (click)="dismiss()">\n            <ion-icon color="white" name="arrow-back"></ion-icon>\n          </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n<ion-content padding>\n    <ion-refresher (ionRefresh)="updatePostComments($event)">\n        <ion-refresher-content></ion-refresher-content>\n      </ion-refresher>\n    <ion-list>\n        <ion-item *ngFor="let comment of post.comments">\n            <ion-card>\n              <ion-item>\n                <ion-avatar item-start>\n                  <img src="{{comment.avatar_image}}" onerror="this.src=\'./assets/imgs/default-avatar.jpg\'"/>\n                </ion-avatar>\n                <h2>{{comment.user_name}}</h2>\n                <p>{{comment.posted}}</p>\n              </ion-item>\n              <ion-card-content text-wrap>\n                {{comment.text}}\n              </ion-card-content>\n              <ion-row>\n                  <ion-col center text-center>\n                    <ion-note>\n                        {{comment.time_since}}\n                    </ion-note>\n                  </ion-col>\n                </ion-row>\n            </ion-card>\n          </ion-item>\n    </ion-list>\n</ion-content>\n<ion-footer class="message-footer">\n  <ion-toolbar class="message-toolbar" color="light">\n    <ion-item>\n        <ion-textarea [(ngModel)]="comment.text" class="message-input" placeholder="Enter Comment Here" text-start autocomplete="on" autocorrect="on"></ion-textarea>\n    </ion-item>\n    <ion-buttons end>\n        <button ion-button icon-only (click)="postComment()">\n          <ion-icon name="ios-send"></ion-icon>\n        </button>\n      </ion-buttons>\n  </ion-toolbar>\n</ion-footer>'/*ion-inline-end:"/Users/austinhunter/Documents/GitHub/food-tracker/src/pages/comments/comments.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_stores_user__["a" /* UserProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_http_http__["a" /* HttpProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */], __WEBPACK_IMPORTED_MODULE_5__providers_load_load__["a" /* LoadProvider */]])
    ], CommentsPage);
    return CommentsPage;
}());

//# sourceMappingURL=comments.js.map

/***/ }),

/***/ 120:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_http_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_stores_forum__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_load_load__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_stores_user__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__chat_chat__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_chat_chat__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__comments_comments__ = __webpack_require__(119);
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
 * Generated class for the UserProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var UserProfilePage = /** @class */ (function () {
    function UserProfilePage(navCtrl, viewCtrl, navParams, http, forum, loader, userData, modalCtrl, chatService) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.http = http;
        this.forum = forum;
        this.loader = loader;
        this.userData = userData;
        this.modalCtrl = modalCtrl;
        this.chatService = chatService;
        this.uid = null;
        this.user = {
            fullName: '',
            myStory: '',
            avatar_image: null,
            token: null
        };
        this.posts = [];
        this.chosenPicture = null;
        this.connected = false;
        this.connectionCount = 0;
        this.connectionKey = null;
        this.toggled = false;
        this.searchbarValue = null;
        this.uid = navParams.get('uid');
    }
    UserProfilePage.prototype.ionViewWillLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, i, avatar;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loader.createLoader();
                        this.loader.presentLoader();
                        return [4 /*yield*/, this.http.getOtherUserData(this.uid)];
                    case 1:
                        data = _a.sent();
                        this.user = data.val();
                        for (i = 0; i < this.userData.connections.length; i++) {
                            if (this.userData.connections[i].connectionUID === this.uid) {
                                if (this.userData.connections[i].accepted === true || this.userData.connections[i].accepted === undefined) {
                                    this.connected = true;
                                }
                                this.connectionKey;
                            }
                        }
                        return [4 /*yield*/, this.http.getUserAvatar(this.uid)];
                    case 2:
                        avatar = _a.sent();
                        this.chosenPicture = (avatar.val() !== null ? avatar.val().avatar_image : 'https://firebasestorage.googleapis.com/v0/b/foodtracker-8cd65.appspot.com/o/default-avatar.jpg?alt=media&token=e0eb897f-23d7-496d-8a8f-9b158f92655b');
                        this.getPosts();
                        this.loadConnectionData();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserProfilePage.prototype.loadConnectionData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var connection, key;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.connectionCount = 0;
                        return [4 /*yield*/, this.http.getOtherUserConnectionData(this.uid)];
                    case 1:
                        connection = _a.sent();
                        for (key in connection.val()) {
                            if (connection.val()[key].accepted)
                                this.connectionCount++;
                            if ((connection.val()[key].accepted || connection.val()[key].accepted === undefined) && connection.val()[key].connectionUID === this.userData.user.uid) {
                                this.connectionKey = key;
                                this.connected = true;
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UserProfilePage.prototype.getPosts = function () {
        this.posts = [];
        for (var i = 0; i < this.forum.posts.length; i++) {
            if (this.forum.posts[i].uid === this.uid) {
                this.posts.push(this.forum.posts[i]);
            }
        }
        this.loader.dismissLoader();
    };
    UserProfilePage.prototype.sendMessage = function () {
        this.chatService.currentChatPairId = this.chatService.createPairId(this.user, this.userData);
        this.chatService.currentChatPartner = this.user;
        var chatModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__chat_chat__["a" /* ChatPage */]);
        chatModal.present();
        chatModal.onDidDismiss(function (data) {
        });
    };
    UserProfilePage.prototype.addAsConnection = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loader.createLoader();
                        this.loader.presentLoader();
                        if (!!this.connected) return [3 /*break*/, 2];
                        //this.http.sendConnectionNotification(this.userData.token);
                        return [4 /*yield*/, this.http.addConnectionRequest(this.uid, this.userData)];
                    case 1:
                        //this.http.sendConnectionNotification(this.userData.token);
                        _a.sent();
                        this.connected = true;
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.http.removeConnectionRequest(this.uid, this.connectionKey)];
                    case 3:
                        _a.sent();
                        this.connected = false;
                        _a.label = 4;
                    case 4:
                        this.loadConnectionData();
                        this.loader.dismissLoader();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserProfilePage.prototype.likePost = function (post) {
        return __awaiter(this, void 0, void 0, function () {
            var likes, liked, i, postKey;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loader.createLoader();
                        this.loader.presentLoader();
                        return [4 /*yield*/, this.forum.getPostLikes()];
                    case 1:
                        likes = _a.sent();
                        if (!(likes === null)) return [3 /*break*/, 3];
                        post.likes++;
                        return [4 /*yield*/, this.http.updatePostLikes(post, this.userData.user.uid, false)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        liked = false;
                        for (i = 0; i < likes.length; i++) {
                            for (postKey in likes[i]) {
                                if (postKey === post.key) {
                                    liked = likes[i][postKey].liked;
                                    if (liked) {
                                        post.likes--;
                                    }
                                    else {
                                        post.likes++;
                                    }
                                    break;
                                }
                            }
                        }
                        return [4 /*yield*/, this.http.updatePostLikes(post, this.userData.user.uid, liked)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [4 /*yield*/, this.getPosts()];
                    case 6:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserProfilePage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    UserProfilePage.prototype.seeComments = function (post) {
        var commentsModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_8__comments_comments__["a" /* CommentsPage */], { post: post });
        commentsModal.present();
        commentsModal.onDidDismiss(function (data) {
        });
    };
    UserProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-user-profile',template:/*ion-inline-start:"/Users/austinhunter/Documents/GitHub/food-tracker/src/pages/user-profile/user-profile.html"*/'<!--\n  Generated template for the ProfilePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-buttons>\n      <button ion-button icon-only (click)="dismiss()">\n          <ion-icon color="white" name="arrow-back"></ion-icon>\n        </button>\n  </ion-buttons>\n  </ion-navbar>\n</ion-header>\n  <ion-content>\n      <ion-row padding>\n          <!-- Avatar -->\n          <ion-col col-3>\n            <img [src]="chosenPicture" class="avatar" alt="" onerror="this.src=\'./assets/imgs/default-avatar.jpg\'">\n          </ion-col>\n          <!-- Information about user -->\n          <ion-col col-6 text-center >\n            <h6>{{posts.length}}</h6>\n            <p no-padding no-margin>Posts</p>\n          </ion-col>\n          <ion-col col-3 text-center>\n            <h6>{{connectionCount}}</h6>\n            <p no-paddin no-margin>Connections</p>\n          </ion-col>\n        </ion-row>\n\n        <ion-row no-padding no-margin>\n            <ion-col no-padding no-margin col-4>\n            </ion-col>\n              <ion-col no-padding no-margin text-center col-8>\n              <button (click)="addAsConnection()" ion-button outline small>\n                  <div *ngIf="connected; else showNotConnected">\n                      Remove Connection\n                    </div>\n                    <ng-template #showNotConnected><div>Add Connection</div></ng-template>\n              </button>\n              <button ion-button outline small (click)="sendMessage()" *ngIf="connected;">\n                  <ion-icon name="ios-chatbubbles"></ion-icon>\n                </button>\n            </ion-col>\n          </ion-row>\n\n          <div padding>\n              <p no-margin no-padding><b>{{user.fullName}}</b></p>\n              <p no-padding no-margin class="info">{{user.myStory}}</p>\n            </div>\n          <ion-card no-padding padding-bottom no-margin class="card" *ngFor="let post of forum.posts | myposts:false">\n              <ion-item>\n                <ion-avatar item-left >\n                  <img src="{{post.avatar_image}}" onerror="this.src=\'./assets/imgs/default-avatar.jpg\'" class="avatar-image" />\n                </ion-avatar>\n                <h2 style="font-weight: bold">{{post.user_name}}</h2>\n                <p>{{post.posted}}</p>\n              </ion-item>\n      \n              <img *ngIf="post.image !== undefined" src="{{post.image}}">\n              \n              <p no-margin no-padding *ngIf="post.image !== undefined">\n                  <button clear ion-button icon-only (click)="likePost(post);" class="like-btn">\n                    <ion-icon no-padding isActive="false" name="ios-thumbs-up-outline" class="icon-space"></ion-icon>\n                  </button>\n                  <button clear ion-button icon-only (click)="seeComments(post)">\n                    <ion-icon no-padding isActive="false" color="black" name="ios-text-outline" class="icon-space" style="font-weight: bold"></ion-icon>\n                  </button>\n              </p>\n      \n              <hr>\n      \n              <ion-card-content *ngIf="post.image !== undefined">\n                <p class="like-content"><ion-icon name="heart"></ion-icon> {{post.likes}} likes</p>\n                <p>{{post.text}}</p>\n                <ion-note style="font-size: 12px">\n                    {{post.time_since}}\n                </ion-note>\n              </ion-card-content>\n              <ion-card-content text-wrap *ngIf="post.image === undefined"> \n                  {{post.text}}\n                </ion-card-content>\n                <ion-row *ngIf="post.image === undefined">\n                    <ion-col>\n                      <button ion-button icon-start clear small (click)="likePost(post);">\n                        <ion-icon name="ios-thumbs-up-outline"></ion-icon>\n                        <div>{{post.likes}} Likes</div>\n                      </button>\n                    </ion-col>\n                    <ion-col>\n                      <button ion-button icon-start clear small (click)="seeComments(post)">\n                        <ion-icon name="ios-text-outline"></ion-icon>\n                        <div *ngIf="post.comments !== undefined; else showNone">{{post.comments.length}} Comments</div>\n                        <ng-template #showNone>0 Comments</ng-template>\n                      </button>\n                    </ion-col>\n                    <ion-col center text-center>\n                        <ion-note>\n                            {{post.time_since}}\n                        </ion-note>\n                      </ion-col>\n                  </ion-row>\n            </ion-card>\n          <!--\n<ion-card>\n          <ion-card-header style="align-items: center; text-align: center">\n              {{user.fullName}}\n          </ion-card-header>\n          <ion-card-content>\n            <div class="card-body">\n                {{user.myStory}}\n            </div>\n            <div class="break"></div>\n            <div class="post-header">\n              Posts\n            </div>\n            <div class="post-body">\n              <div *ngIf="posts.length === 0; else showNotEmpty">\n                <p style="opacity: 0.5; text-align: center; padding-top: 15px; padding-bottom: 5px;">They have not posted anything yet</p>\n              </div>\n              <ng-template #showNotEmpty>\n                <div>\n                    <ion-item *ngFor="let post of posts">\n                        <ion-card>\n                          <ion-item>\n                            <ion-avatar item-start>\n                              <img src="{{post.avatar_image}}" onerror="this.src=\'./assets/imgs/default-avatar.jpg\'"/>\n                            </ion-avatar>\n                            <h2>{{post.user_name}}</h2>\n                            <p>{{post.posted}}</p>\n                          </ion-item>\n                          <ion-card-content text-wrap>\n                            {{post.text}}\n                          </ion-card-content>\n                          <ion-row>\n                              <ion-col>\n                                <button ion-button icon-start clear small (click)="likePost(post)">\n                                  <ion-icon name="ios-thumbs-up"></ion-icon>\n                                  <div>{{post.likes}} Likes</div>\n                                </button>\n                              </ion-col>\n                              <ion-col>\n                                <button ion-button icon-start clear small (click)="seeComments(post)">\n                                  <ion-icon name="ios-text"></ion-icon>\n                                  <div >{{post.comment_amount}} Comments</div>\n                                </button>\n                              </ion-col>\n                            </ion-row>\n                        </ion-card>\n                      </ion-item>\n                </div>\n              </ng-template>\n            </div>\n          </ion-card-content>\n        </ion-card>\n          -->\n  </ion-content>\n  \n'/*ion-inline-end:"/Users/austinhunter/Documents/GitHub/food-tracker/src/pages/user-profile/user-profile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_http_http__["a" /* HttpProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_stores_forum__["a" /* ForumProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_load_load__["a" /* LoadProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_stores_user__["a" /* UserProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */], __WEBPACK_IMPORTED_MODULE_7__providers_chat_chat__["a" /* ChatProvider */]])
    ], UserProfilePage);
    return UserProfilePage;
}());

//# sourceMappingURL=user-profile.js.map

/***/ }),

/***/ 17:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_storage__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase__);
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
        this.user = null;
        this.items = [];
        this.entries = [];
        this.token = null;
        this.notifications = {
            clicked: false,
            content: null
        };
        this.chats = [];
        this.chatUsers = [];
        this.freeWeekend = false;
    }
    UserProvider.prototype.set = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.user = __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().currentUser;
                this.setLoginFlag(true);
                this.storage.set('User', this.user);
                return [2 /*return*/];
            });
        });
    };
    UserProvider.prototype.get = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.user];
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
                        return [2 /*return*/];
                }
            });
        });
    };
    UserProvider.prototype.clear = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.user = null;
                this.loggedIn = null;
                return [2 /*return*/];
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

/***/ 18:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HttpProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stores_user__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_http__ = __webpack_require__(461);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angular2_uuid__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angular2_uuid___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_angular2_uuid__);
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







var HttpProvider = /** @class */ (function () {
    function HttpProvider(user, httpClient, events) {
        this.user = user;
        this.httpClient = httpClient;
        this.events = events;
        this.databaseRef = null;
    }
    HttpProvider.prototype.createAccount = function (user) {
        return __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.auth().createUserWithEmailAndPassword(user.email, user.password);
    };
    HttpProvider.prototype.sendEmailValidation = function () {
        var user = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.auth().currentUser;
        user.sendEmailVerification();
    };
    HttpProvider.prototype.login = function (user) {
        return __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.auth().signInWithEmailAndPassword(user.email, user.password);
    };
    HttpProvider.prototype.createUser = function (email, uid) {
        this.databaseRef.ref('user-accounts/' + uid).set({
            email: email,
            fullName: 'Enter your name here',
            myStory: 'This is the place to tell your story',
            entries: [],
            items: [],
            role: 1,
            token: this.user.token
        });
    };
    HttpProvider.prototype.getUserData = function () {
        var uid = null;
        if (this.user.user !== null)
            uid = this.user.user.uid;
        else
            return false;
        var database = this.databaseRef.ref('user-accounts/' + uid);
        return database.once('value');
    };
    HttpProvider.prototype.getUserEntries = function () {
    };
    HttpProvider.prototype.getUserItems = function () {
    };
    HttpProvider.prototype.getFreeWeekend = function () {
        var self = this;
        var database = this.databaseRef.ref('free-weekend');
        database.on('value', function (snapshot) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    console.log("HERE");
                    self.events.publish('free:weekend', snapshot);
                    return [2 /*return*/];
                });
            });
        });
    };
    HttpProvider.prototype.getOtherUserData = function (uid) {
        var database = this.databaseRef.ref('user-accounts/' + uid);
        return database.once('value');
    };
    HttpProvider.prototype.getForumData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self, database;
            return __generator(this, function (_a) {
                self = this;
                database = this.databaseRef.ref('posts');
                database.on('value', function (snapshot) {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            self.events.publish('forum:load', snapshot);
                            return [2 /*return*/];
                        });
                    });
                });
                return [2 /*return*/];
            });
        });
    };
    HttpProvider.prototype.getUserAccounts = function () {
        var database = this.databaseRef.ref('user-accounts');
        return database.once('value');
    };
    HttpProvider.prototype.getUserAvatar = function (uid) {
        var database = this.databaseRef.ref('user-avatars/' + uid);
        return database.once('value');
    };
    HttpProvider.prototype.getPostData = function (post) {
        return __awaiter(this, void 0, void 0, function () {
            var dbRef;
            return __generator(this, function (_a) {
                dbRef = this.databaseRef.ref('posts/' + post.key);
                return [2 /*return*/, dbRef.once('value')];
            });
        });
    };
    HttpProvider.prototype.getPostLikes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var database;
            return __generator(this, function (_a) {
                database = this.databaseRef.ref('postLikes');
                return [2 /*return*/, database.once('value')];
            });
        });
    };
    HttpProvider.prototype.uploadImage = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var today, storageRef, avatarImageRef, uploadTask;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        today = __WEBPACK_IMPORTED_MODULE_2_moment___default()().format('YYYYMMDD');
                        storageRef = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.storage().ref();
                        avatarImageRef = storageRef.child('avatar-images/' + this.user.user.uid + '/' + this.user.user.uid + '_' + today + '_avatar.jpg');
                        return [4 /*yield*/, avatarImageRef.putString(file, 'base64')];
                    case 1:
                        uploadTask = _a.sent();
                        return [2 /*return*/, uploadTask];
                }
            });
        });
    };
    HttpProvider.prototype.uploadPostImage = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var uuid, storageRef, avatarImageRef, uploadTask;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uuid = __WEBPACK_IMPORTED_MODULE_6_angular2_uuid__["UUID"].UUID();
                        storageRef = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.storage().ref();
                        avatarImageRef = storageRef.child('post-images/' + this.user.user.uid + '/' + this.user.user.uid + '_' + uuid + '_post.jpg');
                        return [4 /*yield*/, avatarImageRef.putString(file, 'base64')];
                    case 1:
                        uploadTask = _a.sent();
                        return [2 /*return*/, uploadTask];
                }
            });
        });
    };
    HttpProvider.prototype.removeImage = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var storageRef;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        storageRef = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.storage().refFromURL(file);
                        return [4 /*yield*/, storageRef.delete()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HttpProvider.prototype.getUserConnections = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self, database;
            return __generator(this, function (_a) {
                self = this;
                database = this.databaseRef.ref('connections/' + this.user.user.uid);
                database.on('value', function (snapshot) {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            self.events.publish('connections:load', snapshot);
                            return [2 /*return*/];
                        });
                    });
                });
                return [2 /*return*/];
            });
        });
    };
    HttpProvider.prototype.getUserChats = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sentChats, receivedChats, sentRef, _i, _a, sentDoc, receivedRef, _b, _c, receivedDoc, allArray, unique_array, i;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        sentChats = [];
                        receivedChats = [];
                        return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.firestore().collection('chats').where('sender.uid', '==', this.user.user.uid).get()];
                    case 1:
                        sentRef = _d.sent();
                        for (_i = 0, _a = sentRef.docs; _i < _a.length; _i++) {
                            sentDoc = _a[_i];
                            sentChats.push(sentDoc.data());
                        }
                        return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.firestore().collection('chats').where('receiver.uid', '==', this.user.user.uid).get()];
                    case 2:
                        receivedRef = _d.sent();
                        for (_b = 0, _c = receivedRef.docs; _b < _c.length; _b++) {
                            receivedDoc = _c[_b];
                            receivedChats.push(receivedDoc.data());
                        }
                        allArray = sentChats.concat(receivedChats);
                        unique_array = [];
                        for (i = 0; i < allArray.length; i++) {
                            if (unique_array.indexOf(allArray[i]) == -1) {
                                unique_array.push(allArray[i]);
                            }
                        }
                        this.events.publish('chats:data', unique_array);
                        return [2 /*return*/];
                }
            });
        });
    };
    HttpProvider.prototype.getOtherUserConnectionData = function (requestedUID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.databaseRef.ref('connections/' + requestedUID).once('value')];
            });
        });
    };
    HttpProvider.prototype.postForumPost = function (post) {
        return __awaiter(this, void 0, void 0, function () {
            var dbRef, newRef;
            return __generator(this, function (_a) {
                dbRef = this.databaseRef.ref('posts/');
                newRef = dbRef.push(post);
                return [2 /*return*/];
            });
        });
    };
    HttpProvider.prototype.updatePostLikes = function (post, uid, liked) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.databaseRef.ref('posts/' + post.key).update({
                    likes: post.likes
                });
                this.databaseRef.ref('postLikes/' + uid + '/' + post.key).update({
                    liked: !liked
                });
                return [2 /*return*/];
            });
        });
    };
    HttpProvider.prototype.setUserAvatar = function (uid, avatar_image) {
        this.databaseRef.ref('user-avatars/' + uid).update({
            avatar_image: avatar_image
        });
    };
    HttpProvider.prototype.updateUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var uid;
            return __generator(this, function (_a) {
                uid = null;
                if (this.user.user !== null)
                    uid = this.user.user.uid;
                else
                    return [2 /*return*/, false];
                this.databaseRef.ref('user-accounts/' + uid).update({
                    email: this.user.email,
                    entries: this.user.entries,
                    items: this.user.items,
                    myStory: this.user.myStory,
                    fullName: this.user.fullName,
                    role: this.user.role,
                    token: this.user.token
                });
                return [2 /*return*/];
            });
        });
    };
    HttpProvider.prototype.updatePostComments = function (post) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.databaseRef.ref('posts/' + post.key).update({
                    comments: post.comments
                });
                return [2 /*return*/];
            });
        });
    };
    HttpProvider.prototype.deletePost = function (post) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.databaseRef.ref('posts/' + post.key).remove()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HttpProvider.prototype.sendConnectionNotification = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    HttpProvider.prototype.addConnectionRequest = function (requestedUID, user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.databaseRef.ref('connections/' + requestedUID).push({
                    connectionUID: user.user.uid,
                    fullName: user.fullName,
                    posted: __WEBPACK_IMPORTED_MODULE_2_moment___default()().format('MMMM Do YYYY, h:mm a')
                });
                return [2 /*return*/];
            });
        });
    };
    HttpProvider.prototype.removeConnectionRequest = function (requestedUID, key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.databaseRef.ref('connections/' + requestedUID + '/' + key).update({
                    accepted: false
                });
                this.databaseRef.ref('connections/' + this.user.user.uid + '/' + key).update({
                    accepted: false
                });
                return [2 /*return*/];
            });
        });
    };
    HttpProvider.prototype.replyToConnectionRequest = function (connection) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.databaseRef.ref('connections/' + this.user.user.uid + '/' + connection.key).update({
                    accepted: connection.accepted
                });
                this.databaseRef.ref('connections/' + connection.connectionUID + '/' + connection.key).update({
                    accepted: connection.accepted,
                    connectionUID: this.user.user.uid,
                    fullName: this.user.fullName,
                    posted: __WEBPACK_IMPORTED_MODULE_2_moment___default()().format('MMMM Do YYYY, h:mm a')
                });
                return [2 /*return*/];
            });
        });
    };
    HttpProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__stores_user__["a" /* UserProvider */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_http__["a" /* HTTP */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["c" /* Events */]])
    ], HttpProvider);
    return HttpProvider;
}());

//# sourceMappingURL=http.js.map

/***/ }),

/***/ 183:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RateServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_app_rate__ = __webpack_require__(184);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(52);
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
  Generated class for the RateServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var RateServiceProvider = /** @class */ (function () {
    function RateServiceProvider(platform, appRate, storage) {
        var _this = this;
        this.platform = platform;
        this.appRate = appRate;
        this.storage = storage;
        appRate.preferences.usesUntilPrompt = 4;
        appRate.preferences.callbacks.onRateDialogShow = function (buttonIndex) {
            _this.storage.set('user-reviewed', true);
        };
    }
    RateServiceProvider.prototype.ionViewWillLoad = function () {
    };
    RateServiceProvider.prototype.promptForRating = function (rate) {
        this.appRate.preferences.storeAppURL = {
            android: 'market://details?id=com.ionicframework.tracker210235'
        };
        this.appRate.promptForRating(rate);
    };
    RateServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["o" /* Platform */], __WEBPACK_IMPORTED_MODULE_1__ionic_native_app_rate__["a" /* AppRate */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
    ], RateServiceProvider);
    return RateServiceProvider;
}());

//# sourceMappingURL=rate-service.js.map

/***/ }),

/***/ 185:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_in_app_purchase__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(187);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_load_load__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_http_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_stores_user__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_stores_forum__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__home_home__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__chat_chat__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_chat_chat__ = __webpack_require__(85);
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











var LoadPage = /** @class */ (function () {
    function LoadPage(navCtrl, navParams, loader, iap, events, viewCtrl, http, user, forum, modalCtrl, chatService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loader = loader;
        this.iap = iap;
        this.events = events;
        this.viewCtrl = viewCtrl;
        this.http = http;
        this.user = user;
        this.forum = forum;
        this.modalCtrl = modalCtrl;
        this.chatService = chatService;
        this.purchases = null;
        this.loadProgress = 0;
    }
    LoadPage.prototype.ionViewWillLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    LoadPage.prototype.ionViewDidLoad = function () {
        this.doInitialSetup();
    };
    LoadPage.prototype.loadForum = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.events.subscribe('forum:load', function (forum) { return __awaiter(_this, void 0, void 0, function () {
                    var dataArray;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.forum.convertDataToArray(forum)];
                            case 1:
                                dataArray = _a.sent();
                                return [4 /*yield*/, this.forum.setPosts(dataArray)];
                            case 2:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    LoadPage.prototype.getUserConnections = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.events.subscribe('connections:load', function (connections) { return __awaiter(_this, void 0, void 0, function () {
                    var keys;
                    return __generator(this, function (_a) {
                        keys = [];
                        connections.forEach(function (item) {
                            var itemVal = item.val();
                            itemVal.key = item.key;
                            keys.push(itemVal);
                        });
                        this.user.connections = (keys.length === 0 ? [] : keys);
                        return [2 /*return*/];
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    LoadPage.prototype.freeWeekend = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.events.subscribe('free:weekend', function (flag) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        this.user.freeWeekend = flag.val();
                        return [2 /*return*/];
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    LoadPage.prototype.chatData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.events.subscribe('chats:data', function (chatsID) { return __awaiter(_this, void 0, void 0, function () {
                    var i, userInfo, userAvatar, chat;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                i = 0;
                                _a.label = 1;
                            case 1:
                                if (!(i < chatsID.length)) return [3 /*break*/, 5];
                                return [4 /*yield*/, this.http.getOtherUserData((chatsID[i].receiver.uid !== this.user.user.uid ? chatsID[i].receiver.uid : chatsID[i].sender.uid))];
                            case 2:
                                userInfo = _a.sent();
                                return [4 /*yield*/, this.http.getUserAvatar((chatsID[i].receiver.uid !== this.user.user.uid ? chatsID[i].receiver.uid : chatsID[i].sender.uid))];
                            case 3:
                                userAvatar = _a.sent();
                                chat = {
                                    fullName: userInfo.val().fullName,
                                    avatar_image: userAvatar.val().avatar_image,
                                    uid: ((chatsID[i].receiver.uid !== this.user.user.uid ? chatsID[i].receiver.uid : chatsID[i].sender.uid)),
                                    token: userInfo.val().token,
                                    email: userInfo.val().email,
                                    message: chatsID[i].message,
                                    pair: chatsID[i].pair,
                                    time: chatsID[i].time
                                };
                                this.user.chats.push(chat);
                                if (this.user.chatUsers.indexOf(chat.uid) === -1)
                                    this.user.chatUsers.push(chat.uid);
                                _a.label = 4;
                            case 4:
                                i++;
                                return [3 /*break*/, 1];
                            case 5: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    LoadPage.prototype.loadUserData = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var avatar, temp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.user.user = user;
                        this.http.getForumData();
                        this.loadForum();
                        this.loadProgress += 20;
                        this.http.getFreeWeekend();
                        this.freeWeekend();
                        this.http.getUserConnections();
                        this.getUserConnections();
                        this.loadProgress += 20;
                        return [4 /*yield*/, this.http.getUserAvatar(this.user.user.uid)];
                    case 1:
                        avatar = _a.sent();
                        this.loadProgress += 20;
                        this.user.avatar_image = (avatar.val() !== null ? avatar.val().avatar_image : "https://firebasestorage.googleapis.com/v0/b/foodtracker-8cd65.appspot.com/o/default-avatar.jpg?alt=media&token=e0eb897f-23d7-496d-8a8f-9b158f92655b");
                        this.events.publish('user:avatar', this.user.avatar_image);
                        this.events.publish('user:created', this.user.user.email);
                        return [4 /*yield*/, this.http.getUserData()];
                    case 2:
                        temp = _a.sent();
                        this.loadProgress += 20;
                        this.user.items = (temp.val().items === undefined ? [] : temp.val().items);
                        this.user.entries = (temp.val().entries === undefined ? [] : temp.val().entries);
                        this.user.fullName = temp.val().fullName;
                        this.user.myStory = temp.val().myStory;
                        this.user.role = temp.val().role;
                        this.user.email = this.user.user.email;
                        this.chatData();
                        this.http.getUserChats();
                        this.loadProgress += 20;
                        return [2 /*return*/];
                }
            });
        });
    };
    LoadPage.prototype.doInitialSetup = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.events.subscribe('user:set', function (user) { return __awaiter(_this, void 0, void 0, function () {
                    var percentLeft, chatModal;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.loadUserData(user)];
                            case 1:
                                _a.sent();
                                console.log("User Found");
                                percentLeft = 100 - this.loadProgress;
                                if (this.loadProgress < 100)
                                    this.loadProgress += percentLeft;
                                if (user.emailVerified) {
                                    if (this.user.notifications.clicked && this.user.notifications.content.uid) {
                                        this.chatService.currentChatPairId = this.chatService.createPairId(this.user, this.user.notifications.content);
                                        console.log(this.chatService.currentChatPairId);
                                        this.chatService.currentChatPartner = this.user.notifications.content;
                                        chatModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_9__chat_chat__["a" /* ChatPage */]);
                                        chatModal.present();
                                        chatModal.onDidDismiss(function (data) {
                                        });
                                    }
                                    else {
                                        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__home_home__["c" /* HomePage */]);
                                    }
                                }
                                else
                                    this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
                                return [2 /*return*/];
                        }
                    });
                }); });
                this.events.subscribe('user:not-set', function (user) {
                    console.log("User NOT Found");
                    _this.loadProgress = 100;
                    _this.user.user = user;
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
                });
                return [2 /*return*/];
            });
        });
    };
    LoadPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-load',template:/*ion-inline-start:"/Users/austinhunter/Documents/GitHub/food-tracker/src/pages/load/load.html"*/'<!--\n  Generated template for the LoadPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-content padding style="background-color: gray">\n    <progress-bar [progress]="loadProgress"></progress-bar>\n</ion-content>\n'/*ion-inline-end:"/Users/austinhunter/Documents/GitHub/food-tracker/src/pages/load/load.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__providers_load_load__["a" /* LoadProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__providers_load_load__["a" /* LoadProvider */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_native_in_app_purchase__["a" /* InAppPurchase */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_native_in_app_purchase__["a" /* InAppPurchase */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_5__providers_http_http__["a" /* HttpProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__providers_http_http__["a" /* HttpProvider */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_6__providers_stores_user__["a" /* UserProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__providers_stores_user__["a" /* UserProvider */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_7__providers_stores_forum__["a" /* ForumProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__providers_stores_forum__["a" /* ForumProvider */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */]) === "function" && _k || Object, typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_10__providers_chat_chat__["a" /* ChatProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_10__providers_chat_chat__["a" /* ChatProvider */]) === "function" && _l || Object])
    ], LoadPage);
    return LoadPage;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
}());

//# sourceMappingURL=load.js.map

/***/ }),

/***/ 187:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ResetPassword; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_http_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_load_load__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_stores_user__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__sign_up_sign_up__ = __webpack_require__(462);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_stores_forum__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_fabric__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__load_load__ = __webpack_require__(185);
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
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, storage, navParams, modalCtrl, http, loader, user, loadingCtrl, forum, answers) {
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.http = http;
        this.loader = loader;
        this.user = user;
        this.loadingCtrl = loadingCtrl;
        this.forum = forum;
        this.answers = answers;
        this.userData = {
            email: '',
            password: ''
        };
        this.emailVerified = true;
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        if (this.loader.isLoading)
            this.loader.dismissLoader();
    };
    LoginPage.prototype.showSignUpModal = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_7__sign_up_sign_up__["a" /* SignUpPage */]);
        modal.present();
        modal.onDidDismiss(function (data) {
            if (data)
                alert("Email verification sent");
        });
    };
    LoginPage.prototype.showForgotPasswordModal = function () {
        var resetModal = this.modalCtrl.create(ResetPassword);
        resetModal.present();
        resetModal.onDidDismiss(function (data) {
        });
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            spinner: 'bubbles'
        });
        loading.present();
        this.http.login(this.userData).then(function (data) {
            if (data.emailVerified) {
                _this.user.set();
                loading.dismiss();
                _this.answers.sendLogIn();
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_10__load_load__["a" /* LoadPage */]);
            }
            else {
                alert("Please verify email before logging in");
                loading.dismiss();
            }
        })
            .catch(function (e) {
            loading.dismiss();
            alert(e.message);
        });
    };
    LoginPage.prototype.loginWithGoogle = function () {
        var loading = this.loadingCtrl.create({
            spinner: 'bubbles'
        });
        loading.present();
        var provider = new __WEBPACK_IMPORTED_MODULE_6_firebase___default.a.auth.GoogleAuthProvider();
        __WEBPACK_IMPORTED_MODULE_6_firebase___default.a.auth().signInWithPopup(provider).then(function (result) {
            var token = result.credential.accessToken;
            this.user.set();
            loading.dismiss();
            alert(JSON.stringify(this.user.user));
        }).catch(function (error) {
            alert(JSON.stringify(error));
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
            selector: 'page-login',template:/*ion-inline-start:"/Users/austinhunter/Documents/GitHub/food-tracker/src/pages/login/login.html"*/'<!--\n  Generated template for the LoginPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n<ion-content padding>\n  <div class="div-padding">\n    <ion-row>\n      <ion-col>\n        <ion-list inset>\n\n          <ion-item>\n            <ion-label floating>Email</ion-label>\n            <ion-input type="text" required [ngModel]="userData.email" (keyup)="onKey($event, \'user\')" autocapitalize="none"></ion-input>\n          </ion-item>\n\n          <ion-item>\n            <ion-label floating>Password</ion-label>\n            <ion-input type="password" required minlength="6" [ngModel]="userData.password" (keyup)="onKey($event, \'pass\')" autocapitalize="none"></ion-input>\n          </ion-item>\n\n        </ion-list>\n      </ion-col>\n    </ion-row>\n\n    <ion-row>\n      <ion-col>\n        <button ion-button round class="login-button" (click)="login()">Login</button>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>\n        <a class="sign-up-button" (click)="showSignUpModal()">Sign Up</a>\n      </ion-col>\n    </ion-row>\n    <ion-row style="padding-top: 25px">\n        <ion-col>\n          <a class="sign-up-button" (click)="showForgotPasswordModal()">Forgot Password?</a>\n        </ion-col>\n      </ion-row>\n    <ion-row>\n      <ion-col>\n          <small style="color: red; text-align: center" [hidden]="emailVerified">\n              Please verify your email before logging in\n          </small>\n      </ion-col>\n    </ion-row>\n\n  </div>\n\n</ion-content>\n'/*ion-inline-end:"/Users/austinhunter/Documents/GitHub/food-tracker/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */], __WEBPACK_IMPORTED_MODULE_3__providers_http_http__["a" /* HttpProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_load_load__["a" /* LoadProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_stores_user__["a" /* UserProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_8__providers_stores_forum__["a" /* ForumProvider */], __WEBPACK_IMPORTED_MODULE_9__ionic_native_fabric__["a" /* Answers */]])
    ], LoginPage);
    return LoginPage;
}());

var ResetPassword = /** @class */ (function () {
    function ResetPassword(viewCtrl, params) {
        this.viewCtrl = viewCtrl;
        this.userData = {
            email: ''
        };
    }
    ResetPassword.prototype.submit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_6_firebase___default.a.auth().sendPasswordResetEmail(this.userData.email)];
                    case 1:
                        _a.sent();
                        alert("Please check email to reset password");
                        this.dismiss();
                        return [2 /*return*/];
                }
            });
        });
    };
    ResetPassword.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    ResetPassword.prototype.onKey = function (event, state) {
        if (state == 'user') {
            this.userData.email = event.target.value;
        }
    };
    ResetPassword = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'reset-password',template:/*ion-inline-start:"/Users/austinhunter/Documents/GitHub/food-tracker/src/pages/login/resetPassword.html"*/'<!--\n  Generated template for the LoginPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n<ion-content padding>\n        <div class="div-padding">\n          <ion-row>\n            <ion-col>\n              <ion-list inset>\n      \n                <ion-item>\n                  <ion-label floating>Email</ion-label>\n                  <ion-input type="text" required [ngModel]="userData.email" (keyup)="onKey($event, \'user\')" autocapitalize="none"></ion-input>\n                </ion-item>\n      \n              </ion-list>\n            </ion-col>\n          </ion-row>\n      \n          <ion-row>\n            <ion-col>\n              <button ion-button round class="login-button" (click)="submit()">Submit</button>\n            </ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col>\n              <a class="sign-up-button" (click)="dismiss()">Cancel</a>\n            </ion-col>\n        </ion-row>\n      \n        </div>\n      \n      </ion-content>\n      '/*ion-inline-end:"/Users/austinhunter/Documents/GitHub/food-tracker/src/pages/login/resetPassword.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */]])
    ], ResetPassword);
    return ResetPassword;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ItemsPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddItems; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_stores_user__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_http_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_uuid__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_uuid___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_angular2_uuid__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_load_load__ = __webpack_require__(24);
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
 * Generated class for the ItemsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ItemsPage = /** @class */ (function () {
    function ItemsPage(navCtrl, navParams, userData, modalCtrl, http, loader) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userData = userData;
        this.modalCtrl = modalCtrl;
        this.http = http;
        this.loader = loader;
        this.showDelete = false;
        this.itemList = [];
    }
    ItemsPage.prototype.loadItems = function () {
        this.itemList = this.userData.items;
    };
    ItemsPage.prototype.clearItems = function () {
        this.itemList = [];
    };
    ItemsPage.prototype.ionViewWillLoad = function () {
        this.loadItems();
    };
    ItemsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ItemsPage');
    };
    ItemsPage.prototype.addItem = function () {
        var _this = this;
        var addItemModal = this.modalCtrl.create(AddItems);
        addItemModal.present();
        addItemModal.onDidDismiss(function (data) {
            _this.clearItems();
            _this.loadItems();
            if (_this.loader.isLoading)
                _this.loader.dismissLoader();
        });
    };
    ItemsPage.prototype.removeItem = function (item) {
        this.loader.createLoader();
        this.loader.presentLoader();
        for (var i = 0; i < this.userData.items.length; i++) {
            if (this.userData.items[i].id === item.id) {
                this.userData.items.splice(i, 1);
                this.http.updateUser();
                this.clearItems();
                this.loadItems();
                break;
            }
        }
        if (this.loader.isLoading)
            this.loader.dismissLoader();
    };
    ItemsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-items',template:/*ion-inline-start:"/Users/austinhunter/Documents/GitHub/food-tracker/src/pages/items/items.html"*/'<!--\n  Generated template for the ItemsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon color="white" name="menu"></ion-icon>\n    </button>\n    <ion-buttons end>\n        <button ion-button icon-only (click)="showDelete = !showDelete">\n          <ion-icon color="white" name="ios-hammer"></ion-icon>\n        </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n<ion-content padding>\n  <ion-list>\n    <ion-item-sliding >\n        <ion-item *ngFor="let item of itemList" text-wrap>\n            <ion-icon name=\'{{item.icon}}\' item-start></ion-icon>\n            {{item.name}}\n            <ion-note item-end>\n            <div *ngIf="!showDelete; else delete">{{item.feeling}}</div>\n            <ng-template #delete><ion-icon name="ios-remove-circle" color="danger" (click)="removeItem(item)"></ion-icon></ng-template>\n            </ion-note>\n          </ion-item>\n    </ion-item-sliding>\n  </ion-list>\n  <ion-fab right bottom>\n      <button ion-fab mini class="fab-button" (click)="addItem();"><ion-icon name="add"></ion-icon></button>\n  </ion-fab>\n</ion-content>\n'/*ion-inline-end:"/Users/austinhunter/Documents/GitHub/food-tracker/src/pages/items/items.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_stores_user__["a" /* UserProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */], __WEBPACK_IMPORTED_MODULE_3__providers_http_http__["a" /* HttpProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_load_load__["a" /* LoadProvider */]])
    ], ItemsPage);
    return ItemsPage;
}());

var AddItems = /** @class */ (function () {
    function AddItems(viewCtrl, userData, http, loader) {
        this.viewCtrl = viewCtrl;
        this.userData = userData;
        this.http = http;
        this.loader = loader;
        this.item = {
            id: '',
            name: '',
            feeling: '',
            icon: ''
        };
        this.text = '';
        this.feeling = 0;
    }
    AddItems.prototype.submit = function () {
        this.loader.createLoader();
        this.loader.presentLoader();
        if (this.feeling === 0) {
            this.item.feeling = 'Awful';
            this.item.icon = 'alert';
        }
        else if (this.feeling === 1) {
            this.item.feeling = 'Okay';
            this.item.icon = 'thumbs-up';
        }
        else {
            this.item.feeling = 'Great';
            this.item.icon = 'happy';
        }
        this.item.id = __WEBPACK_IMPORTED_MODULE_4_angular2_uuid__["UUID"].UUID();
        this.userData.items.push(this.item);
        this.http.updateUser();
        this.viewCtrl.dismiss();
    };
    AddItems.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    AddItems = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'add-items',template:/*ion-inline-start:"/Users/austinhunter/Documents/GitHub/food-tracker/src/pages/items/addItems.html"*/'<ion-content padding>\n  <ion-list>\n\n  <ion-item style="padding-bottom: 15px">\n    <ion-label style="color: black" stacked>Food Title</ion-label>\n    <ion-input type="text" [(ngModel)]="item.name" style="height: 50px;" autocomplete="on" autocorrect="on"></ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-label style="color: black" >\n      <div *ngIf="(feeling === 0); else showOkay">Awful</div>\n      <ng-template #showOkay><div *ngIf="(feeling === 1); else showGreat">Okay</div></ng-template>\n      <ng-template #showGreat><div *ngIf="(feeling === 2);">Great</div></ng-template>\n    </ion-label>\n    <ion-range min="0" max="2" step="1" snaps="true" color="secondary" [(ngModel)]="feeling"></ion-range>\n  </ion-item>\n\n</ion-list>\n  <button ion-button block style="color: white" (click)="submit()">Submit</button>\n  <div style="text-align:center"><button ion-button small outline (click)="dismiss()">Cancel</button></div>\n</ion-content>\n'/*ion-inline-end:"/Users/austinhunter/Documents/GitHub/food-tracker/src/pages/items/addItems.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__providers_stores_user__["a" /* UserProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_http_http__["a" /* HttpProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_load_load__["a" /* LoadProvider */]])
    ], AddItems);
    return AddItems;
}());

//# sourceMappingURL=items.js.map

/***/ }),

/***/ 201:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return PublicForumPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddPost; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_stores_forum__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_http_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_load_load__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_stores_user__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angular2_uuid__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angular2_uuid___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_angular2_uuid__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__comments_comments__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__user_profile_user_profile__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_native_audio__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_image_picker__ = __webpack_require__(478);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_file__ = __webpack_require__(200);
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













var PublicForumPage = /** @class */ (function () {
    function PublicForumPage(navCtrl, navParams, forum, modalCtrl, http, loader, user, nativeAudio) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.forum = forum;
        this.modalCtrl = modalCtrl;
        this.http = http;
        this.loader = loader;
        this.user = user;
        this.nativeAudio = nativeAudio;
        this.entry = {
            id: '',
            avatar_image: (this.user.avatar_image ? this.user.avatar_image : 'https://firebasestorage.googleapis.com/v0/b/foodtracker-8cd65.appspot.com/o/default-avatar.jpg?alt=media&token=e0eb897f-23d7-496d-8a8f-9b158f92655b'),
            user_name: this.user.fullName,
            uid: '',
            text: '',
            comments: [],
            likes: 0,
            image: null,
            posted: __WEBPACK_IMPORTED_MODULE_7_moment___default()().format('MMMM Do YYYY, h:mm:ss a')
        };
        this.liked = false;
        this.uploadedImage = null;
    }
    PublicForumPage.prototype.likePost = function (post) {
        return __awaiter(this, void 0, void 0, function () {
            var likes, liked, i, postKey;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loader.createLoader();
                        this.loader.presentLoader();
                        return [4 /*yield*/, this.forum.getPostLikes()];
                    case 1:
                        likes = _a.sent();
                        if (!(likes === null)) return [3 /*break*/, 3];
                        post.likes++;
                        return [4 /*yield*/, this.http.updatePostLikes(post, this.user.user.uid, false)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        liked = false;
                        for (i = 0; i < likes.length; i++) {
                            for (postKey in likes[i]) {
                                if (postKey === post.key && likes[i].key === this.user.user.uid) {
                                    liked = likes[i][postKey].liked;
                                    break;
                                }
                            }
                        }
                        console.log(liked);
                        if (liked) {
                            post.likes--;
                            post.liked = false;
                        }
                        else {
                            post.likes++;
                            post.liked = true;
                        }
                        return [4 /*yield*/, this.http.updatePostLikes(post, this.user.user.uid, liked)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        this.loader.dismissLoader();
                        return [2 /*return*/];
                }
            });
        });
    };
    PublicForumPage.prototype.addComment = function (post) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var commentsModal;
            return __generator(this, function (_a) {
                commentsModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_8__comments_comments__["a" /* CommentsPage */], { post: post });
                commentsModal.present();
                commentsModal.onDidDismiss(function (data) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/];
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    PublicForumPage.prototype.doRefresh = function (refresher) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                refresher.complete();
                return [2 /*return*/];
            });
        });
    };
    PublicForumPage.prototype.showUserProfile = function (post) {
        if (post.uid !== this.user.user.uid) {
            var userProfileModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_9__user_profile_user_profile__["a" /* UserProfilePage */], { uid: post.uid });
            userProfileModal.present();
            userProfileModal.onDidDismiss(function (data) { });
        }
        else {
            this.navCtrl.parent.select(1);
        }
    };
    PublicForumPage.prototype.submit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.nativeAudio.play('post', function () { return console.log('uniqueId1 is done playing'); });
                        this.entry.id = __WEBPACK_IMPORTED_MODULE_6_angular2_uuid__["UUID"].UUID();
                        this.entry.uid = this.user.user.uid;
                        this.loader.createLoader();
                        this.loader.presentLoader();
                        return [4 /*yield*/, this.http.postForumPost(this.entry)];
                    case 1:
                        _a.sent();
                        this.entry = {
                            id: '',
                            avatar_image: (this.user.avatar_image ? this.user.avatar_image : 'https://firebasestorage.googleapis.com/v0/b/foodtracker-8cd65.appspot.com/o/default-avatar.jpg?alt=media&token=e0eb897f-23d7-496d-8a8f-9b158f92655b'),
                            user_name: this.user.fullName,
                            uid: '',
                            text: '',
                            comments: [],
                            likes: 0,
                            image: null,
                            posted: __WEBPACK_IMPORTED_MODULE_7_moment___default()().format('MMMM Do YYYY, h:mm:ss a')
                        };
                        this.loader.dismissLoader();
                        return [2 /*return*/];
                }
            });
        });
    };
    PublicForumPage.prototype.addImage = function () {
        var _this = this;
        var addPostModal = this.modalCtrl.create(AddPost);
        addPostModal.present();
        addPostModal.onDidDismiss(function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (data)
                    this.entry.image = data;
                return [2 /*return*/];
            });
        }); });
    };
    PublicForumPage.prototype.removePhoto = function () {
        this.http.removeImage(this.entry.image);
        this.entry.image = null;
    };
    PublicForumPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-public-forum',template:/*ion-inline-start:"/Users/austinhunter/Documents/GitHub/food-tracker/src/pages/public-forum/public-forum.html"*/'<!--\n  Generated template for the PublicForumPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n    <ion-navbar>\n      <button ion-button menuToggle>\n        <ion-icon color="white" name="menu"></ion-icon>\n      </button>\n    </ion-navbar>\n  </ion-header>\n<ion-content>\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n      <ion-refresher-content></ion-refresher-content>\n    </ion-refresher>\n    <ion-card no-padding padding-bottom no-margin class="card" *ngFor="let post of forum.posts">\n\n        <ion-item (click)="showUserProfile(post)">\n          <ion-avatar item-left>\n            <img src="{{post.avatar_image}}" onerror="this.src=\'./assets/imgs/default-avatar.jpg\'" class="avatar-image" />\n          </ion-avatar>\n          <h2 style="font-weight: bold">{{post.user_name}}</h2>\n          <p>{{post.posted}}</p>\n        </ion-item>\n\n        <img *ngIf="post.image !== undefined" src="{{post.image}}">\n        \n        <p no-margin no-padding *ngIf="post.image !== undefined">\n            <button clear ion-button icon-only (click)="likePost(post)" class="like-btn">\n              <ion-icon no-padding isActive="false" name="ios-thumbs-up-outline" class="icon-space"></ion-icon>\n            </button>\n            <button clear ion-button icon-only (click)="addComment(post)">\n              <ion-icon no-padding isActive="false" color="black" name="ios-text-outline" class="icon-space" style="font-weight: bold"></ion-icon>\n            </button>\n        </p>\n\n        <hr>\n\n        <ion-card-content *ngIf="post.image !== undefined">\n          <p class="like-content"><ion-icon name="heart"></ion-icon> {{post.likes}} likes</p>\n          <p>{{post.text}}</p>\n          <ion-note style="font-size: 12px">\n              {{post.time_since}}\n          </ion-note>\n        </ion-card-content>\n        <ion-card-content text-wrap *ngIf="post.image === undefined"> \n            {{post.text}}\n          </ion-card-content>\n          <ion-row *ngIf="post.image === undefined">\n              <ion-col>\n                <button ion-button icon-start clear small (click)="likePost(post)">\n                  <ion-icon name="ios-thumbs-up-outline"></ion-icon>\n                  <div>{{post.likes}} Likes</div>\n                </button>\n              </ion-col>\n              <ion-col>\n                <button ion-button icon-start clear small (click)="addComment(post)">\n                  <ion-icon name="ios-text-outline"></ion-icon>\n                  <div *ngIf="post.comments !== undefined; else showNone">{{post.comments.length}} Comments</div>\n                  <ng-template #showNone>0 Comments</ng-template>\n                </button>\n              </ion-col>\n              <ion-col center text-center>\n                <ion-note>\n                    {{post.time_since}}\n                </ion-note>\n              </ion-col>\n            </ion-row>\n\n  \n      </ion-card>\n</ion-content>\n<ion-footer class="message-footer">\n   <div class="image-div" *ngIf="entry.image !== null">\n      <ion-icon name="close" class="close-icon" (click)="removePhoto();"></ion-icon>\n      <img class="image" [src]="entry.image" />\n   </div>\n    <ion-toolbar class="message-toolbar" color="light">\n      <ion-buttons start>\n        <button ion-button icon-only (click)="addImage()">\n          <ion-icon name="ios-add"></ion-icon>\n        </button>\n      </ion-buttons>\n      <ion-item>\n          <ion-textarea [(ngModel)]="entry.text" class="message-input" placeholder="Enter Post Text" text-start autocomplete="on" autocorrect="on"></ion-textarea>\n      </ion-item>\n      <ion-buttons end>\n          <button ion-button icon-only (click)="submit()">\n            <ion-icon name="ios-send"></ion-icon>\n          </button>\n        </ion-buttons>\n    </ion-toolbar>\n  </ion-footer>\n'/*ion-inline-end:"/Users/austinhunter/Documents/GitHub/food-tracker/src/pages/public-forum/public-forum.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_stores_forum__["a" /* ForumProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */], __WEBPACK_IMPORTED_MODULE_3__providers_http_http__["a" /* HttpProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_load_load__["a" /* LoadProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_stores_user__["a" /* UserProvider */], __WEBPACK_IMPORTED_MODULE_10__ionic_native_native_audio__["a" /* NativeAudio */]])
    ], PublicForumPage);
    return PublicForumPage;
}());

var AddPost = /** @class */ (function () {
    function AddPost(viewCtrl, imagePicker, file, http, loader) {
        this.viewCtrl = viewCtrl;
        this.imagePicker = imagePicker;
        this.file = file;
        this.http = http;
        this.loader = loader;
        this.loadProgress = 0;
    }
    AddPost.prototype.ionViewDidLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var permission, options, permission_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loader.createLoader();
                        this.loader.presentLoader();
                        return [4 /*yield*/, this.imagePicker.hasReadPermission()];
                    case 1:
                        permission = _a.sent();
                        console.log(permission);
                        if (permission) {
                            options = {
                                maximumImagesCount: 1,
                                width: 1080,
                                height: 1080,
                                quality: 100
                            };
                            this.imagePicker.getPictures(options).then(function (results) { return __awaiter(_this, void 0, void 0, function () {
                                var base64string, data;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            this.loadProgress += 33;
                                            return [4 /*yield*/, this.encodeImageUri(results[0])];
                                        case 1:
                                            base64string = _a.sent();
                                            this.loadProgress += 33;
                                            return [4 /*yield*/, this.http.uploadPostImage(base64string)];
                                        case 2:
                                            data = _a.sent();
                                            this.loadProgress = 100;
                                            this.loader.dismissLoader();
                                            this.viewCtrl.dismiss(data.downloadURL);
                                            return [2 /*return*/];
                                    }
                                });
                            }); }, function (err) { });
                        }
                        else {
                            permission_1 = this.imagePicker.requestReadPermission();
                            this.loader.dismissLoader();
                            this.viewCtrl.dismiss();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AddPost.prototype.encodeImageUri = function (filePath) {
        return __awaiter(this, void 0, void 0, function () {
            var fileName, path, base64string;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fileName = filePath.split('/').pop();
                        path = filePath.substring(0, filePath.lastIndexOf("/") + 1);
                        fileName = fileName.split('?');
                        return [4 /*yield*/, this.file.readAsDataURL(path, fileName[0])];
                    case 1:
                        base64string = _a.sent();
                        base64string = base64string.split(',').pop();
                        return [2 /*return*/, base64string];
                }
            });
        });
    };
    ;
    AddPost = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'add-post',template:/*ion-inline-start:"/Users/austinhunter/Documents/GitHub/food-tracker/src/pages/public-forum/addPost.html"*/'<ion-content padding>\n    <progress-bar [progress]="loadProgress"></progress-bar>\n</ion-content>\n      '/*ion-inline-end:"/Users/austinhunter/Documents/GitHub/food-tracker/src/pages/public-forum/addPost.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_image_picker__["a" /* ImagePicker */],
            __WEBPACK_IMPORTED_MODULE_12__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_3__providers_http_http__["a" /* HttpProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_load_load__["a" /* LoadProvider */]])
    ], AddPost);
    return AddPost;
}());

//# sourceMappingURL=public-forum.js.map

/***/ }),

/***/ 210:
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
webpackEmptyAsyncContext.id = 210;

/***/ }),

/***/ 24:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
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
        this.isLoading = false;
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
        this.isLoading = true;
    };
    LoadProvider.prototype.dismissLoader = function () {
        this.loader.dismiss();
        this.isLoading = false;
    };
    LoadProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */]])
    ], LoadProvider);
    return LoadProvider;
}());

//# sourceMappingURL=load.js.map

/***/ }),

/***/ 251:
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
webpackEmptyAsyncContext.id = 251;

/***/ }),

/***/ 462:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignUpPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_load_load__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_http_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(52);
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
    SignUpPage.prototype.submit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.loader.createLoader();
                this.loader.presentLoader();
                this.http.createAccount(this.user).then(function (data) {
                    _this.http.createUser(_this.user.email, data.uid);
                    _this.http.sendEmailValidation();
                    _this.loader.dismissLoader();
                    _this.viewCtrl.dismiss(data);
                })
                    .catch(function (e) {
                    _this.loader.dismissLoader();
                    alert(e.message);
                });
                return [2 /*return*/];
            });
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
            selector: 'page-sign-up',template:/*ion-inline-start:"/Users/austinhunter/Documents/GitHub/food-tracker/src/pages/sign-up/sign-up.html"*/'<!--\n  Generated template for the SignUpPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-content padding>\n  <div class="div-padding">\n    <ion-row>\n      <ion-col>\n        <ion-list inset>\n\n          <ion-item>\n            <ion-label style="color: black">Email</ion-label>\n            <ion-input type="text" required [ngModel]="user.email" (keyup)="onKey($event, \'email\')" autocapitalize="none"></ion-input>\n          </ion-item>\n\n          <ion-item>\n            <ion-label>Password</ion-label>\n            <ion-input type="password" required minlength="6" [ngModel]="user.password" (keyup)="onKey($event, \'pass\')"></ion-input>\n          </ion-item>\n          <small style="color: red;" [hidden]="user.password.length >= 6 || user.password == \'\'">\n            {{user.password.length}} of 6 Characters\n          </small>\n\n          <ion-item>\n            <ion-label>Confirm Password</ion-label>\n            <ion-input type="password" required [ngModel]="user.passwordConf" (keyup)="onKey($event, \'conf\')"></ion-input>\n          </ion-item>\n          <small style="color: red;" [hidden]="(user.password == user.passwordConf) || user.password == \'\'">\n            Passwords Do Not Match\n          </small>\n\n        </ion-list>\n      </ion-col>\n    </ion-row>\n\n    <ion-row>\n      <ion-col>\n        <button ion-button round class="login-button" (click)="submit()"  [disabled]="disabled">Sign Up</button>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>\n        <a class="sign-up-button" (click)="cancelModal()">Cancel</a>\n      </ion-col>\n    </ion-row>\n\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/austinhunter/Documents/GitHub/food-tracker/src/pages/sign-up/sign-up.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */], __WEBPACK_IMPORTED_MODULE_3__providers_http_http__["a" /* HttpProvider */], __WEBPACK_IMPORTED_MODULE_2__providers_load_load__["a" /* LoadProvider */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]])
    ], SignUpPage);
    return SignUpPage;
}());

//# sourceMappingURL=sign-up.js.map

/***/ }),

/***/ 471:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SocialPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__profile_profile__ = __webpack_require__(472);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__public_forum_public_forum__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_stores_forum__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_http_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_load_load__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_rate_service_rate_service__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__chatlist_chatlist__ = __webpack_require__(479);
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
 * Generated class for the SocialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SocialPage = /** @class */ (function () {
    function SocialPage(navCtrl, navParams, forum, http, loader, storage, rateService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.forum = forum;
        this.http = http;
        this.loader = loader;
        this.storage = storage;
        this.rateService = rateService;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_2__profile_profile__["a" /* ProfilePage */];
        this.chatPage = __WEBPACK_IMPORTED_MODULE_3__public_forum_public_forum__["b" /* PublicForumPage */];
        this.chatsPage = __WEBPACK_IMPORTED_MODULE_9__chatlist_chatlist__["a" /* ChatlistPage */];
    }
    SocialPage.prototype.ionViewWillLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.loader.isLoading)
                    this.loader.dismissLoader();
                return [2 /*return*/];
            });
        });
    };
    SocialPage.prototype.ionViewDidLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.get('user-reviewed')];
                    case 1:
                        data = _a.sent();
                        if (!data || data === null) {
                            this.rateService.promptForRating(false);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    SocialPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-social',
            template: "\n    <ion-tabs class=\"tabs-basic\" selectedIndex=\"1\">\n      <ion-tab tabIcon=\"ios-chatbubbles\" [root]=\"chatPage\"></ion-tab>\n      <ion-tab tabIcon=\"ios-person\" [root]=\"rootPage\"></ion-tab>\n      <ion-tab tabIcon=\"ios-contacts\" [root]=\"chatsPage\"></ion-tab>\n    </ion-tabs>\n"
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__providers_stores_forum__["a" /* ForumProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_http_http__["a" /* HttpProvider */], __WEBPACK_IMPORTED_MODULE_6__providers_load_load__["a" /* LoadProvider */], __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_8__providers_rate_service_rate_service__["a" /* RateServiceProvider */]])
    ], SocialPage);
    return SocialPage;
}());

//# sourceMappingURL=social.js.map

/***/ }),

/***/ 472:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_stores_user__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_http_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_load_load__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_stores_forum__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__comments_comments__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__search_search__ = __webpack_require__(473);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__connections_connections__ = __webpack_require__(474);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__edit_profile_edit_profile__ = __webpack_require__(475);
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
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ProfilePage = /** @class */ (function () {
    function ProfilePage(navCtrl, navParams, menuCtrl, userData, http, actionSheetCtrl, loader, forum, alertCtrl, modalCtrl, events) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menuCtrl = menuCtrl;
        this.userData = userData;
        this.http = http;
        this.actionSheetCtrl = actionSheetCtrl;
        this.loader = loader;
        this.forum = forum;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.events = events;
        this.user = null;
        this.postsCount = 0;
        this.showEdit = false;
        this.profile = {
            fullName: '',
            myStory: ''
        };
        this.connections = 0;
        this.placeholder = './assets/imgs/default-avatar.jpg';
        this.chosenPicture = null;
        this.toggled = false;
    }
    ProfilePage.prototype.ionViewWillLoad = function () {
        this.updateUser();
        this.chosenPicture = (this.userData.avatar_image !== null ? this.userData.avatar_image : null);
    };
    ProfilePage.prototype.ionViewDidEnter = function () {
        this.updateUser();
    };
    ProfilePage.prototype.updateUser = function () {
        this.connections = 0;
        this.user = this.userData;
        this.postsCount = this.forum.usersPostCount;
        for (var i = 0; i < this.user.connections.length; i++) {
            if (this.user.connections[i].accepted) {
                this.connections++;
            }
        }
    };
    ProfilePage.prototype.seeComments = function (post) {
        var commentsModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__comments_comments__["a" /* CommentsPage */], { post: post });
        commentsModal.present();
        commentsModal.onDidDismiss(function (data) {
        });
    };
    ProfilePage.prototype.deletePost = function (post) {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Delete Post?',
            message: 'Are you sure you would like to delete your forum post?',
            buttons: [
                {
                    text: 'No',
                    handler: function () { }
                },
                {
                    text: 'Yes',
                    handler: function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    this.loader.createLoader();
                                    this.loader.presentLoader();
                                    return [4 /*yield*/, this.http.deletePost(post)];
                                case 1:
                                    _a.sent();
                                    this.postsCount--;
                                    this.loader.dismissLoader();
                                    return [2 /*return*/];
                            }
                        });
                    }); }
                }
            ]
        });
        confirm.present();
    };
    ProfilePage.prototype.showSearch = function () {
        var searchModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_7__search_search__["a" /* SearchPage */]);
        searchModal.present();
        searchModal.onDidDismiss(function (data) {
        });
    };
    ProfilePage.prototype.showConnections = function () {
        var connectionModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_8__connections_connections__["a" /* ConnectionsPage */]);
        connectionModal.present();
        connectionModal.onDidDismiss(function (data) {
        });
    };
    ProfilePage.prototype.showEditModal = function () {
        var _this = this;
        var editModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_9__edit_profile_edit_profile__["a" /* EditProfile */], { user: this.user });
        editModal.present();
        editModal.onDidDismiss(function (data) {
            _this.chosenPicture = _this.userData.avatar_image;
            _this.events.publish('user:avatar', _this.chosenPicture);
        });
    };
    ProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-profile',template:/*ion-inline-start:"/Users/austinhunter/Documents/GitHub/food-tracker/src/pages/profile/profile.html"*/'<!--\n  Generated template for the ProfilePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-buttons>\n      <button ion-button menuToggle>\n        <ion-icon color="white" name="menu"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="showSearch()" end>\n        <ion-icon color="white" name="ios-search"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n  </ion-header>\n    <ion-content>\n        <ion-row padding>\n          <!-- Avatar -->\n          <ion-col col-3>\n            <img [src]="chosenPicture" class="avatar" alt="" onerror="this.src=\'./assets/imgs/default-avatar.jpg\'">\n          </ion-col>\n          <!-- Information about user -->\n          <ion-col col-6 text-center >\n            <h6>{{postsCount}}</h6>\n            <p no-padding no-margin>Posts</p>\n          </ion-col>\n          <ion-col col-3 text-center (click)="showConnections()">\n            <h6>{{connections}}</h6>\n            <p no-paddin no-margin>Connections</p>\n          </ion-col>\n        </ion-row>\n\n        <!-- Edit/follow button -->\n        <ion-row no-padding no-margin>\n            <ion-col no-padding no-margin col-4></ion-col>\n              <ion-col no-padding no-margin text-center col-8>\n              <button (click)="showEditModal()" ion-button outline small>Edit your profile</button>\n            </ion-col>\n            <ion-col col-3></ion-col>\n          </ion-row>\n\n        <div padding>\n            <p no-margin no-padding><b>{{user.fullName}}</b></p>\n            <p no-padding no-margin class="info">{{user.myStory}}</p>\n          </div>\n            \n            <ion-card no-padding padding-bottom no-margin class="card" *ngFor="let post of forum.posts | myposts:true">\n                <ion-item>\n                  <ion-avatar item-left>\n                    <img src="{{post.avatar_image}}" onerror="this.src=\'./assets/imgs/default-avatar.jpg\'" class="avatar-image" />\n                  </ion-avatar>\n                  <h2 style="font-weight: bold">{{post.user_name}}</h2>\n                  <p>{{post.posted}}</p>\n                </ion-item>\n        \n                <img *ngIf="post.image !== undefined" src="{{post.image}}">\n                \n                <p no-margin no-padding *ngIf="post.image !== undefined">\n                    <button clear ion-button icon-only disabled class="like-btn">\n                      <ion-icon no-padding isActive="false" name="ios-thumbs-up-outline" class="icon-space"></ion-icon>\n                    </button>\n                    <button clear ion-button icon-only (click)="seeComments(post)">\n                      <ion-icon no-padding isActive="false" color="black" name="ios-text-outline" class="icon-space" style="font-weight: bold"></ion-icon>\n                    </button>\n                    <button ion-button icon-start clear small color="danger" (click)="deletePost(post)">\n                        <ion-icon name="ios-trash"></ion-icon>\n                    </button>\n                </p>\n        \n                <hr>\n        \n                <ion-card-content *ngIf="post.image !== undefined">\n                  <p class="like-content"><ion-icon name="heart"></ion-icon> {{post.likes}} likes</p>\n                  <p>{{post.text}}</p>\n                  <ion-note style="font-size: 12px">\n                      {{post.time_since}}\n                  </ion-note>\n                </ion-card-content>\n                <ion-card-content text-wrap *ngIf="post.image === undefined"> \n                    {{post.text}}\n                  </ion-card-content>\n                  <ion-row *ngIf="post.image === undefined">\n                      <ion-col>\n                        <button ion-button icon-start clear small disabled>\n                          <ion-icon name="ios-thumbs-up-outline"></ion-icon>\n                          <div>{{post.likes}} Likes</div>\n                        </button>\n                      </ion-col>\n                      <ion-col>\n                        <button ion-button icon-start clear small (click)="seeComments(post)">\n                          <ion-icon name="ios-text-outline"></ion-icon>\n                          <div *ngIf="post.comments !== undefined; else showNone">{{post.comments.length}} Comments</div>\n                          <ng-template #showNone>0 Comments</ng-template>\n                        </button>\n                      </ion-col>\n                      <ion-col center text-center>\n                          <button ion-button icon-start clear small color="danger" (click)="deletePost(post)">\n                            <ion-icon name="ios-trash"></ion-icon>\n                          </button>\n                        </ion-col>\n                    </ion-row>\n              </ion-card>\n      \n    </ion-content>\n    \n'/*ion-inline-end:"/Users/austinhunter/Documents/GitHub/food-tracker/src/pages/profile/profile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_stores_user__["a" /* UserProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_http_http__["a" /* HttpProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_load_load__["a" /* LoadProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_stores_forum__["a" /* ForumProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */]])
    ], ProfilePage);
    return ProfilePage;
}());

//# sourceMappingURL=profile.js.map

/***/ }),

/***/ 473:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_http_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_stores_user__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__user_profile_user_profile__ = __webpack_require__(120);
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
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SearchPage = /** @class */ (function () {
    function SearchPage(navCtrl, viewCtrl, navParams, http, userData, modalCtrl) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.http = http;
        this.userData = userData;
        this.modalCtrl = modalCtrl;
        this.users = [];
    }
    SearchPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SearchPage');
        this.initializeUsers();
    };
    SearchPage.prototype.initializeUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var temp, keys, i, avatar;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.users = [];
                        return [4 /*yield*/, this.http.getUserAccounts()];
                    case 1:
                        temp = _a.sent();
                        keys = [];
                        temp.forEach(function (item) {
                            var itemVal = item.val();
                            itemVal.uid = item.key;
                            keys.push(itemVal);
                        });
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < keys.length)) return [3 /*break*/, 5];
                        if (!(keys[i].fullName !== 'Enter your name here' && keys[i].uid !== this.userData.user.uid)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.http.getUserAvatar(keys[i].uid)];
                    case 3:
                        avatar = _a.sent();
                        keys[i].avatar_image = (avatar.val() !== null ? avatar.val().avatar_image : 'https://firebasestorage.googleapis.com/v0/b/foodtracker-8cd65.appspot.com/o/default-avatar.jpg?alt=media&token=e0eb897f-23d7-496d-8a8f-9b158f92655b');
                        this.users.push(keys[i]);
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    SearchPage.prototype.getItems = function (ev) {
        return __awaiter(this, void 0, void 0, function () {
            var val;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.initializeUsers()];
                    case 1:
                        _a.sent();
                        val = ev.target.value;
                        // if the value is an empty string don't filter the items
                        if (val && val.trim() != '') {
                            this.users = this.users.filter(function (item) {
                                return (item.fullName.toLowerCase().indexOf(val.toLowerCase()) > -1);
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    SearchPage.prototype.showUserProfile = function (user) {
        var userProfileModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__user_profile_user_profile__["a" /* UserProfilePage */], { uid: user.uid });
        userProfileModal.present();
        userProfileModal.onDidDismiss(function (data) {
        });
    };
    SearchPage.prototype.onCancel = function () {
        console.log("HERE");
        this.viewCtrl.dismiss();
    };
    SearchPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-search',template:/*ion-inline-start:"/Users/austinhunter/Documents/GitHub/food-tracker/src/pages/search/search.html"*/'<ion-header>\n  <ion-searchbar [showCancelButton]="true" (ionCancel)="onCancel()" class="searchbar" [(ngModel)]="searchdata" (input)="getItems($event)"></ion-searchbar>\n</ion-header>\n<ion-content>\n  <ion-list *ngIf="searchdata">\n    <ion-item *ngFor="let user of users" (click)="showUserProfile(user);">\n      <ion-avatar item-start>\n        <img src="{{user.avatar_image}}">\n      </ion-avatar>\n      <h2>{{user.fullName}}</h2>\n      <p>{{user.myStory}}</p>\n    </ion-item>\n  </ion-list>\n</ion-content>'/*ion-inline-end:"/Users/austinhunter/Documents/GitHub/food-tracker/src/pages/search/search.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_http_http__["a" /* HttpProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_stores_user__["a" /* UserProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */]])
    ], SearchPage);
    return SearchPage;
}());

//# sourceMappingURL=search.js.map

/***/ }),

/***/ 474:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConnectionsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_stores_user__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_http_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_load_load__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__user_profile_user_profile__ = __webpack_require__(120);
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
 * Generated class for the ConnectionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ConnectionsPage = /** @class */ (function () {
    function ConnectionsPage(navCtrl, viewCtrl, navParams, user, http, loader, modalCtrl) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.user = user;
        this.http = http;
        this.loader = loader;
        this.modalCtrl = modalCtrl;
        this.connections = [];
    }
    ConnectionsPage.prototype.ionViewWillEnter = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i, avatar;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.connections = [];
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < this.user.connections.length)) return [3 /*break*/, 4];
                        if (!(this.user.connections[i].accepted || this.user.connections[i].accepted === undefined)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.http.getUserAvatar(this.user.connections[i].connectionUID)];
                    case 2:
                        avatar = _a.sent();
                        this.user.connections[i].avatar_image = (avatar.val() !== null ? avatar.val().avatar_image : 'https://firebasestorage.googleapis.com/v0/b/foodtracker-8cd65.appspot.com/o/default-avatar.jpg?alt=media&token=e0eb897f-23d7-496d-8a8f-9b158f92655b');
                        this.connections.push(this.user.connections[i]);
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ConnectionsPage.prototype.acceptConnectionRequest = function (connection) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loader.createLoader();
                        this.loader.presentLoader();
                        connection.accepted = true;
                        delete connection.avatar_image;
                        return [4 /*yield*/, this.http.replyToConnectionRequest(connection)];
                    case 1:
                        _a.sent();
                        this.loader.dismissLoader();
                        return [2 /*return*/];
                }
            });
        });
    };
    ConnectionsPage.prototype.denyConnectionRequest = function (connection) {
        return __awaiter(this, void 0, void 0, function () {
            var index;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loader.createLoader();
                        this.loader.presentLoader();
                        connection.accepted = false;
                        delete connection.avatar_image;
                        return [4 /*yield*/, this.http.replyToConnectionRequest(connection)];
                    case 1:
                        _a.sent();
                        index = this.connections.indexOf(connection);
                        this.connections.splice(index, 1);
                        this.loader.dismissLoader();
                        return [2 /*return*/];
                }
            });
        });
    };
    ConnectionsPage.prototype.showUserProfile = function (connection) {
        if (connection.connectionUID !== this.user.user.uid) {
            var userProfileModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__user_profile_user_profile__["a" /* UserProfilePage */], { uid: connection.connectionUID });
            userProfileModal.present();
            userProfileModal.onDidDismiss(function (data) { });
        }
        else {
            this.navCtrl.parent.select(1);
        }
    };
    ConnectionsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-connections',template:/*ion-inline-start:"/Users/austinhunter/Documents/GitHub/food-tracker/src/pages/connections/connections.html"*/'<!--\n  Generated template for the ConnectionsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n    <ion-navbar>\n      <ion-buttons>\n        <button ion-button icon-only (click)="viewCtrl.dismiss()">\n          <ion-icon color="white" name="arrow-back"></ion-icon>\n        </button>\n      </ion-buttons>\n    </ion-navbar>\n  </ion-header>\n<ion-content padding>\n    <ion-list>\n      <ion-list-header>Connections</ion-list-header>\n        <ion-item *ngFor="let connection of connections" (click)="showUserProfile(connection)">\n                <ion-thumbnail item-start>\n                    <img src="{{connection.avatar_image}}">\n                </ion-thumbnail>\n                <h2>{{connection.fullName}}</h2>\n              <ion-col *ngIf="connection.accepted === undefined;">\n                <button ion-button icon-only color="secondary" small (click)="acceptConnectionRequest(connection)">\n                    <ion-icon name="ios-checkmark" ></ion-icon>\n                </button>\n              </ion-col>\n              <ion-col *ngIf="connection.accepted === undefined;">\n                <button ion-button icon-only color="danger" small (click)="denyConnectionRequest(connection)">\n                    <ion-icon name="ios-close" ></ion-icon>\n                </button>\n              </ion-col>\n        </ion-item>\n      </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/austinhunter/Documents/GitHub/food-tracker/src/pages/connections/connections.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_stores_user__["a" /* UserProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_http_http__["a" /* HttpProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_load_load__["a" /* LoadProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */]])
    ], ConnectionsPage);
    return ConnectionsPage;
}());

//# sourceMappingURL=connections.js.map

/***/ }),

/***/ 475:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditProfile; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__ = __webpack_require__(476);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_file__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_load_load__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_crop__ = __webpack_require__(477);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_stores_user__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_http_http__ = __webpack_require__(18);
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








var EditProfile = /** @class */ (function () {
    function EditProfile(navCtrl, navParams, viewCtrl, loadingCtrl, camera, file, loader, crop, userData, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.loadingCtrl = loadingCtrl;
        this.camera = camera;
        this.file = file;
        this.loader = loader;
        this.crop = crop;
        this.userData = userData;
        this.http = http;
        // You can get this data from your API. This is a dumb data for being an example.
        this.user_data = {
            profile_img: "https://firebasestorage.googleapis.com/v0/b/foodtracker-8cd65.appspot.com/o/default-avatar.jpg?alt=media&token=e0eb897f-23d7-496d-8a8f-9b158f92655b",
            name_surname: '',
            username: '',
            website: '',
            description: '',
            email: '',
            phone: '',
            gender: ''
        };
    }
    EditProfile.prototype.ionViewDidLoad = function () {
        var user = this.navParams.get('user');
        this.user_data.profile_img = user.avatar_image;
        this.user_data.name_surname = user.fullName;
        this.user_data.description = user.myStory;
        this.user_data.email = user.email;
    };
    EditProfile.prototype.selectAvatar = function () {
        var options = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            sourceType: 1,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            cameraDirection: 0,
            correctOrientation: false
        };
        this.showCamera(options);
    };
    EditProfile.prototype.showCamera = function (options) {
        var _this = this;
        this.camera.getPicture(options).then(function (imageData) { return __awaiter(_this, void 0, void 0, function () {
            var newImage, newImageURL, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loader.createLoader();
                        this.loader.presentLoader();
                        console.log(imageData);
                        return [4 /*yield*/, this.crop.crop(imageData, { quality: 100 })];
                    case 1:
                        newImage = _a.sent();
                        return [4 /*yield*/, this.encodeImageUri(newImage)];
                    case 2:
                        newImageURL = _a.sent();
                        return [4 /*yield*/, this.http.uploadImage(newImageURL)];
                    case 3:
                        data = _a.sent();
                        this.user_data.profile_img = data.downloadURL;
                        this.loader.dismissLoader();
                        return [2 /*return*/];
                }
            });
        }); }).catch(function (err) {
            console.log(err);
        });
    };
    EditProfile.prototype.encodeImageUri = function (filePath) {
        return __awaiter(this, void 0, void 0, function () {
            var fileName, path, base64string;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fileName = filePath.split('/').pop();
                        path = filePath.substring(0, filePath.lastIndexOf("/") + 1);
                        fileName = fileName.split('?');
                        return [4 /*yield*/, this.file.readAsDataURL(path, fileName[0])];
                    case 1:
                        base64string = _a.sent();
                        base64string = base64string.split(',').pop();
                        return [2 /*return*/, base64string];
                }
            });
        });
    };
    ;
    EditProfile.prototype.saveProfile = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loader.createLoader();
                        this.loader.presentLoader();
                        console.log(this.user_data);
                        this.userData.fullName = this.user_data.name_surname;
                        this.userData.myStory = this.user_data.description;
                        this.userData.avatar_image = this.user_data.profile_img;
                        return [4 /*yield*/, this.http.updateUser()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.http.setUserAvatar(this.userData.user.uid, this.userData.avatar_image)];
                    case 2:
                        _a.sent();
                        this.loader.dismissLoader();
                        this.viewCtrl.dismiss();
                        return [2 /*return*/];
                }
            });
        });
    };
    EditProfile.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    EditProfile = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-edit-profile',template:/*ion-inline-start:"/Users/austinhunter/Documents/GitHub/food-tracker/src/pages/edit-profile/edit-profile.html"*/'<ion-header>\n\n    <ion-navbar>\n\n      <ion-buttons>\n\n        <button ion-button (click)="viewCtrl.dismiss();">\n\n          <ion-icon color="white" name="close"></ion-icon>\n\n        </button>\n\n      </ion-buttons>\n\n      <ion-buttons end>\n\n        <button ion-button icon-only (click)="saveProfile()" end>\n\n          <ion-icon color="white" name="ios-checkmark"></ion-icon>\n\n        </button>\n\n      </ion-buttons>\n\n    </ion-navbar>\n\n    </ion-header>\n\n\n\n<ion-content padding>\n\n\n\n  <!-- Profile picture -->\n\n  <div text-center>\n\n    <img [src]="user_data.profile_img" class="edit-avatar" alt="">\n\n    <p class="change-text" (click)="selectAvatar();">Change Photo</p>\n\n  </div>\n\n\n\n  <!-- Form -->\n\n  <ion-item>\n\n    <ion-icon name="ios-clipboard-outline" item-start></ion-icon>\n\n    <ion-input type="text" [(ngModel)]="user_data.name_surname" [value]="user_data.name_surname"></ion-input>\n\n  </ion-item>\n\n\n\n  <ion-item>\n\n    <ion-icon name="ios-quote-outline" color="gray" item-start></ion-icon>\n\n    <ion-textarea placeholder="" [(ngModel)]="user_data.description" [value]="user_data.description"></ion-textarea>\n\n  </ion-item>\n\n\n\n  <!-- Private information form -->\n\n  <div margin-top padding-top>\n\n    <h4 no-margin no-padding class="info-text">Private Information</h4>\n\n    <hr class="custom-hr" color="gray">\n\n  </div>\n\n  \n\n  <ion-item>\n\n    <ion-icon name="ios-mail-outline" item-start></ion-icon>\n\n    <ion-input type="text" [value]="user_data.email" disabled></ion-input>\n\n  </ion-item>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"/Users/austinhunter/Documents/GitHub/food-tracker/src/pages/edit-profile/edit-profile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_4__providers_load_load__["a" /* LoadProvider */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_crop__["a" /* Crop */],
            __WEBPACK_IMPORTED_MODULE_6__providers_stores_user__["a" /* UserProvider */],
            __WEBPACK_IMPORTED_MODULE_7__providers_http_http__["a" /* HttpProvider */]])
    ], EditProfile);
    return EditProfile;
}());

//# sourceMappingURL=edit-profile.js.map

/***/ }),

/***/ 479:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatlistPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_http_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_chat_chat__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_stores_user__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__chat_chat__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_load_load__ = __webpack_require__(24);
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
 * Generated class for the ChatlistpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ChatlistPage = /** @class */ (function () {
    function ChatlistPage(navCtrl, navParams, http, chatService, modalCtrl, user, loader) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.chatService = chatService;
        this.modalCtrl = modalCtrl;
        this.user = user;
        this.loader = loader;
    }
    ChatlistPage.prototype.ionViewWillEnter = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i, j;
            return __generator(this, function (_a) {
                this.chats = [];
                for (i = 0; i < this.user.chatUsers.length; i++) {
                    for (j = 0; j < this.user.chats.length; j++) {
                        if (this.user.chats[j].uid === this.user.chatUsers[i]) {
                            this.user.chats[j].time = new Date(this.user.chats[j].time).toLocaleTimeString();
                            this.chats.push(this.user.chats[j]);
                            break;
                        }
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    ChatlistPage.prototype.sendMessage = function (chat) {
        console.log(chat);
        this.chatService.currentChatPairId = this.chatService.createPairId(this.user, chat);
        this.chatService.currentChatPartner = chat;
        var chatModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__chat_chat__["a" /* ChatPage */]);
        chatModal.present();
        chatModal.onDidDismiss(function (data) {
        });
    };
    ChatlistPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-chatlist',template:/*ion-inline-start:"/Users/austinhunter/Documents/GitHub/food-tracker/src/pages/chatlist/chatlist.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Chats</ion-title>\n    <ion-buttons>\n      <button ion-button menuToggle>\n        <ion-icon color="white" name="menu"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n\n  <ion-list>\n    <ion-list-header>\n      USERS\n    </ion-list-header>\n    <ion-item *ngFor="let user of chats" (click)="sendMessage(user)">\n      <ion-thumbnail item-start>\n        <img src="{{user.avatar_image}}">\n      </ion-thumbnail>\n      <h2>{{user.fullName}}</h2>\n      <p></p>\n      <p item-end>{{user.time}}</p>\n    </ion-item>\n  </ion-list>\n  \n</ion-content>'/*ion-inline-end:"/Users/austinhunter/Documents/GitHub/food-tracker/src/pages/chatlist/chatlist.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_http_http__["a" /* HttpProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_chat_chat__["a" /* ChatProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */], __WEBPACK_IMPORTED_MODULE_4__providers_stores_user__["a" /* UserProvider */], __WEBPACK_IMPORTED_MODULE_6__providers_load_load__["a" /* LoadProvider */]])
    ], ChatlistPage);
    return ChatlistPage;
}());

//# sourceMappingURL=chatlist.js.map

/***/ }),

/***/ 483:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(484);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_module__ = __webpack_require__(506);



Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_14" /* enableProdMode */])();
Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 506:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__calendar_calendar_module__ = __webpack_require__(549);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(554);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_items_items__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_load_load__ = __webpack_require__(185);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_sign_up_sign_up__ = __webpack_require__(462);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_login_login__ = __webpack_require__(187);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_profile_profile__ = __webpack_require__(472);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_social_social__ = __webpack_require__(471);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_public_forum_public_forum__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_connections_connections__ = __webpack_require__(474);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_status_bar__ = __webpack_require__(457);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_splash_screen__ = __webpack_require__(459);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_comments_comments__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_app_rate__ = __webpack_require__(184);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_user_profile_user_profile__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_in_app_purchase__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_fcm__ = __webpack_require__(480);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ionic_storage__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__angular_platform_browser_animations__ = __webpack_require__(685);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ionic_native_http__ = __webpack_require__(461);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__ionic_native_fabric__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__providers_load_load__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__providers_http_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__providers_stores_user__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__providers_stores_forum__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__providers_rate_service_rate_service__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__ionic_native_camera__ = __webpack_require__(476);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_chat_chat__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__providers_chat_chat__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__pipes_pipes_module__ = __webpack_require__(687);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__pages_search_search__ = __webpack_require__(473);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__ionic_native_native_audio__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__ionic_native_firebase_config__ = __webpack_require__(481);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__pages_chatlist_chatlist__ = __webpack_require__(479);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__components_progress_bar_progress_bar__ = __webpack_require__(690);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__ionic_native_crop__ = __webpack_require__(477);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__ionic_native_file__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__pages_edit_profile_edit_profile__ = __webpack_require__(475);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__ionic_native_image_picker__ = __webpack_require__(478);
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
                __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["c" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_load_load__["a" /* LoadPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_sign_up_sign_up__["a" /* SignUpPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* AddEntry */],
                __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["b" /* EditEntry */],
                __WEBPACK_IMPORTED_MODULE_9__pages_login_login__["b" /* ResetPassword */],
                __WEBPACK_IMPORTED_MODULE_11__pages_social_social__["a" /* SocialPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_public_forum_public_forum__["b" /* PublicForumPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_connections_connections__["a" /* ConnectionsPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_items_items__["a" /* AddItems */],
                __WEBPACK_IMPORTED_MODULE_16__pages_comments_comments__["a" /* CommentsPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_user_profile_user_profile__["a" /* UserProfilePage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_public_forum_public_forum__["a" /* AddPost */],
                __WEBPACK_IMPORTED_MODULE_6__pages_items_items__["b" /* ItemsPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_profile_profile__["a" /* ProfilePage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_chat_chat__["a" /* ChatPage */],
                __WEBPACK_IMPORTED_MODULE_34__pages_search_search__["a" /* SearchPage */],
                __WEBPACK_IMPORTED_MODULE_37__pages_chatlist_chatlist__["a" /* ChatlistPage */],
                __WEBPACK_IMPORTED_MODULE_38__components_progress_bar_progress_bar__["a" /* ProgressBarComponent */],
                __WEBPACK_IMPORTED_MODULE_41__pages_edit_profile_edit_profile__["a" /* EditProfile */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_5__pages_home_home__["c" /* HomePage */]),
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_21__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_22__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_3__calendar_calendar_module__["a" /* CalendarModule */],
                __WEBPACK_IMPORTED_MODULE_33__pipes_pipes_module__["a" /* PipesModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["c" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_load_load__["a" /* LoadPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_sign_up_sign_up__["a" /* SignUpPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* AddEntry */],
                __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["b" /* EditEntry */],
                __WEBPACK_IMPORTED_MODULE_11__pages_social_social__["a" /* SocialPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_login_login__["b" /* ResetPassword */],
                __WEBPACK_IMPORTED_MODULE_12__pages_public_forum_public_forum__["b" /* PublicForumPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_connections_connections__["a" /* ConnectionsPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_comments_comments__["a" /* CommentsPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_items_items__["a" /* AddItems */],
                __WEBPACK_IMPORTED_MODULE_12__pages_public_forum_public_forum__["a" /* AddPost */],
                __WEBPACK_IMPORTED_MODULE_6__pages_items_items__["b" /* ItemsPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_user_profile_user_profile__["a" /* UserProfilePage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_profile_profile__["a" /* ProfilePage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_chat_chat__["a" /* ChatPage */],
                __WEBPACK_IMPORTED_MODULE_34__pages_search_search__["a" /* SearchPage */],
                __WEBPACK_IMPORTED_MODULE_37__pages_chatlist_chatlist__["a" /* ChatlistPage */],
                __WEBPACK_IMPORTED_MODULE_41__pages_edit_profile_edit_profile__["a" /* EditProfile */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_14__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_15__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_19__ionic_native_in_app_purchase__["a" /* InAppPurchase */],
                __WEBPACK_IMPORTED_MODULE_20__ionic_native_fcm__["a" /* FCM */],
                __WEBPACK_IMPORTED_MODULE_25__providers_load_load__["a" /* LoadProvider */],
                __WEBPACK_IMPORTED_MODULE_23__ionic_native_http__["a" /* HTTP */],
                __WEBPACK_IMPORTED_MODULE_26__providers_http_http__["a" /* HttpProvider */],
                __WEBPACK_IMPORTED_MODULE_27__providers_stores_user__["a" /* UserProvider */],
                __WEBPACK_IMPORTED_MODULE_29__providers_rate_service_rate_service__["a" /* RateServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_28__providers_stores_forum__["a" /* ForumProvider */],
                __WEBPACK_IMPORTED_MODULE_30__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_17__ionic_native_app_rate__["a" /* AppRate */],
                __WEBPACK_IMPORTED_MODULE_24__ionic_native_fabric__["b" /* Crashlytics */],
                __WEBPACK_IMPORTED_MODULE_24__ionic_native_fabric__["a" /* Answers */],
                __WEBPACK_IMPORTED_MODULE_32__providers_chat_chat__["a" /* ChatProvider */],
                __WEBPACK_IMPORTED_MODULE_35__ionic_native_native_audio__["a" /* NativeAudio */],
                __WEBPACK_IMPORTED_MODULE_36__ionic_native_firebase_config__["a" /* FirebaseConfig */],
                __WEBPACK_IMPORTED_MODULE_39__ionic_native_crop__["a" /* Crop */],
                __WEBPACK_IMPORTED_MODULE_40__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_42__ionic_native_image_picker__["a" /* ImagePicker */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 549:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalendarModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__calendar__ = __webpack_require__(550);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pipes_month_name__ = __webpack_require__(553);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var CalendarModule = /** @class */ (function () {
    function CalendarModule() {
    }
    CalendarModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__calendar__["a" /* Calendar */],
                __WEBPACK_IMPORTED_MODULE_3__pipes_month_name__["a" /* monthName */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicModule */],
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__calendar__["a" /* Calendar */],
                __WEBPACK_IMPORTED_MODULE_3__pipes_month_name__["a" /* monthName */]
            ]
        })
    ], CalendarModule);
    return CalendarModule;
}());

//# sourceMappingURL=calendar.module.js.map

/***/ }),

/***/ 550:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Calendar; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash__ = __webpack_require__(552);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_lodash__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var Calendar = /** @class */ (function () {
    function Calendar() {
        this.onDaySelect = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
        this.onMonthSelect = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
        this.events = [];
        this.currentYear = __WEBPACK_IMPORTED_MODULE_1_moment__().year();
        this.currentMonth = __WEBPACK_IMPORTED_MODULE_1_moment__().month();
        this.currentDate = __WEBPACK_IMPORTED_MODULE_1_moment__().date();
        this.currentDay = __WEBPACK_IMPORTED_MODULE_1_moment__().day();
        this.displayYear = __WEBPACK_IMPORTED_MODULE_1_moment__().year();
        this.displayMonth = __WEBPACK_IMPORTED_MODULE_1_moment__().month();
        this.dateArray = []; // Array for all the days of the month
        this.weekArray = []; // Array for each row of the calendar
        this.lastSelect = 0; // Record the last clicked location
        this.weekHead = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        this.today();
        this.createMonth(this.displayYear, this.displayMonth);
    }
    Calendar.prototype.ngOnChanges = function () {
        this.createMonth(this.displayYear, this.displayMonth);
    };
    Calendar.prototype.ngAfterContentInit = function () {
        if (!this.lang) {
            this.lang = 'en';
        }
        if (this.lang === 'es') {
            this.weekHead = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
        }
    };
    // Jump to today
    Calendar.prototype.today = function () {
        this.displayYear = this.currentYear;
        this.displayMonth = this.currentMonth;
        this.createMonth(this.currentYear, this.currentMonth);
        // Mark today as a selection
        var todayIndex = __WEBPACK_IMPORTED_MODULE_2_lodash__["findIndex"](this.dateArray, {
            year: this.currentYear,
            month: this.currentMonth,
            date: this.currentDate,
            isThisMonth: true
        });
        this.lastSelect = todayIndex;
        this.dateArray[todayIndex].isSelect = true;
        this.onDaySelect.emit(this.dateArray[todayIndex]);
    };
    Calendar.prototype.isInEvents = function (year, month, date) {
        var i = 0, len = this.events.length;
        for (; i < len; i++) {
            if (this.events[i].year == year && this.events[i].month == month && this.events[i].date == date) {
                return true;
            }
        }
        return false;
    };
    Calendar.prototype.createMonth = function (year, month) {
        this.dateArray = []; // Clear last month's data
        this.weekArray = []; // Clear week data
        var firstDay;
        // The day of the week on the first day of the current month of
        // selection determines how many days to take out last month. Sunday
        // does not show last month, Monday shows the previous month, Tuesday
        // shows the last two days
        var preMonthDays; // The number of days for the previous month
        var monthDays; // The number of days for the month
        var weekDays = [];
        firstDay = __WEBPACK_IMPORTED_MODULE_1_moment__({ year: year, month: month, date: 1 }).day();
        // The number of days last month
        if (month === 0) {
            preMonthDays = __WEBPACK_IMPORTED_MODULE_1_moment__({ year: year - 1, month: 11 }).daysInMonth();
        }
        else {
            preMonthDays = __WEBPACK_IMPORTED_MODULE_1_moment__({ year: year, month: month - 1 }).daysInMonth();
        }
        // The number of days this month
        monthDays = __WEBPACK_IMPORTED_MODULE_1_moment__({ year: year, month: month }).daysInMonth();
        // PREVIOUS MONTH
        // Add the last few days of the previous month to the array
        if (firstDay !== 7) {
            var lastMonthStart = preMonthDays - firstDay + 1; // From the last few months start
            for (var i = 0; i < firstDay; i++) {
                if (month === 0) {
                    this.dateArray.push({
                        year: year,
                        month: 11,
                        date: lastMonthStart + i,
                        isThisMonth: false,
                        isToday: false,
                        isSelect: false,
                        hasEvent: (this.isInEvents(year, 11, lastMonthStart + i)) ? true : false,
                    });
                }
                else {
                    this.dateArray.push({
                        year: year,
                        month: month - 1,
                        date: lastMonthStart + i,
                        isThisMonth: false,
                        isToday: false,
                        isSelect: false,
                        hasEvent: (this.isInEvents(year, month - 1, lastMonthStart + i)) ? true : false,
                    });
                }
            }
        }
        // Add the numeral for this month to the array
        for (var i = 0; i < monthDays; i++) {
            this.dateArray.push({
                year: year,
                month: month,
                date: i + 1,
                isThisMonth: true,
                isToday: false,
                isSelect: false,
                hasEvent: (this.isInEvents(year, month, i + 1)) ? true : false,
            });
        }
        if (this.currentYear === year && this.currentMonth === month) {
            var todayIndex = __WEBPACK_IMPORTED_MODULE_2_lodash__["findIndex"](this.dateArray, {
                year: this.currentYear,
                month: this.currentMonth,
                date: this.currentDate,
                isThisMonth: true
            });
            this.dateArray[todayIndex].isToday = true;
        }
        // Add the number of days next month to the array, with some months showing 6 weeks and some months showing 5 weeks
        if (this.dateArray.length % 7 !== 0) {
            var nextMonthAdd = 7 - this.dateArray.length % 7;
            for (var i = 0; i < nextMonthAdd; i++) {
                if (month === 11) {
                    this.dateArray.push({
                        year: year,
                        month: 0,
                        date: i + 1,
                        isThisMonth: false,
                        isToday: false,
                        isSelect: false,
                        hasEvent: (this.isInEvents(year, 0, i + 1)) ? true : false,
                    });
                }
                else {
                    this.dateArray.push({
                        year: year,
                        month: month + 1,
                        date: i + 1,
                        isThisMonth: false,
                        isToday: false,
                        isSelect: false,
                        hasEvent: (this.isInEvents(year, month + 1, i + 1)) ? true : false,
                    });
                }
            }
        }
        // All date data is now added to the dateArray array
        // Insert the date data into the new array every seven days
        for (var i = 0; i < this.dateArray.length / 7; i++) {
            for (var j = 0; j < 7; j++) {
                weekDays.push(this.dateArray[i * 7 + j]);
            }
            this.weekArray.push(weekDays);
            weekDays = [];
        }
    };
    Calendar.prototype.back = function () {
        // Decrementing the year if necessary
        if (this.displayMonth === 0) {
            this.displayYear--;
            this.displayMonth = 11;
        }
        else {
            this.displayMonth--;
        }
        this.onMonthSelect.emit({
            'year': this.displayYear,
            'month': this.displayMonth
        });
        this.createMonth(this.displayYear, this.displayMonth);
    };
    Calendar.prototype.forward = function () {
        // Incrementing the year if necessary
        if (this.displayMonth === 11) {
            this.displayYear++;
            this.displayMonth = 0;
        }
        else {
            this.displayMonth++;
        }
        this.onMonthSelect.emit({
            'year': this.displayYear,
            'month': this.displayMonth
        });
        this.createMonth(this.displayYear, this.displayMonth);
    };
    // Select a day, click event
    Calendar.prototype.daySelect = function (day, i, j) {
        // First clear the last click status
        this.dateArray[this.lastSelect].isSelect = false;
        // Store this clicked status
        this.lastSelect = i * 7 + j;
        this.dateArray[i * 7 + j].isSelect = true;
        this.onDaySelect.emit(day);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Output */])(),
        __metadata("design:type", Object)
    ], Calendar.prototype, "onDaySelect", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Output */])(),
        __metadata("design:type", Object)
    ], Calendar.prototype, "onMonthSelect", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Array)
    ], Calendar.prototype, "events", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], Calendar.prototype, "lang", void 0);
    Calendar = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'ion-calendar',
            template: "\n    <ion-grid>\n        <ion-row justify-content-center>\n            <ion-col col-auto (click)=\"back()\">\n                <ion-icon ios=\"ios-arrow-back\" md=\"md-arrow-back\"></ion-icon>\n            </ion-col>\n            <ion-col col-auto>\n                <div>{{displayYear}} - {{displayMonth + 1 | monthName:lang}}</div>\n            </ion-col>\n            <ion-col col-auto (click)=\"forward()\">\n                <ion-icon ios=\"ios-arrow-forward\" md=\"md-arrow-forward\"></ion-icon>\n            </ion-col>\n        </ion-row>\n\n        <ion-row>\n            <ion-col class=\"center calendar-header-col\" *ngFor=\"let head of weekHead\">{{head}}</ion-col>\n        </ion-row>\n\n        <ion-row class=\"calendar-row\" *ngFor=\"let week of weekArray;let i = index\">\n            <ion-col class=\"center calendar-col\" (click)=\"daySelect(day,i,j)\"\n            *ngFor=\"let day of week;let j = index\"\n            [ngClass]=\"[day.isThisMonth?'this-month':'not-this-month',day.isToday?'today':'',day.isSelect?'select':'']\">\n                {{day.date}}\n                <span class=\"eventBlip\" *ngIf=\"day.hasEvent\"></span>\n            </ion-col>\n        </ion-row>\n\n    </ion-grid>\n"
        }),
        __metadata("design:paramtypes", [])
    ], Calendar);
    return Calendar;
}());

//# sourceMappingURL=calendar.js.map

/***/ }),

/***/ 551:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 292,
	"./af.js": 292,
	"./ar": 293,
	"./ar-dz": 294,
	"./ar-dz.js": 294,
	"./ar-kw": 295,
	"./ar-kw.js": 295,
	"./ar-ly": 296,
	"./ar-ly.js": 296,
	"./ar-ma": 297,
	"./ar-ma.js": 297,
	"./ar-sa": 298,
	"./ar-sa.js": 298,
	"./ar-tn": 299,
	"./ar-tn.js": 299,
	"./ar.js": 293,
	"./az": 300,
	"./az.js": 300,
	"./be": 301,
	"./be.js": 301,
	"./bg": 302,
	"./bg.js": 302,
	"./bm": 303,
	"./bm.js": 303,
	"./bn": 304,
	"./bn.js": 304,
	"./bo": 305,
	"./bo.js": 305,
	"./br": 306,
	"./br.js": 306,
	"./bs": 307,
	"./bs.js": 307,
	"./ca": 308,
	"./ca.js": 308,
	"./cs": 309,
	"./cs.js": 309,
	"./cv": 310,
	"./cv.js": 310,
	"./cy": 311,
	"./cy.js": 311,
	"./da": 312,
	"./da.js": 312,
	"./de": 313,
	"./de-at": 314,
	"./de-at.js": 314,
	"./de-ch": 315,
	"./de-ch.js": 315,
	"./de.js": 313,
	"./dv": 316,
	"./dv.js": 316,
	"./el": 317,
	"./el.js": 317,
	"./en-au": 318,
	"./en-au.js": 318,
	"./en-ca": 319,
	"./en-ca.js": 319,
	"./en-gb": 320,
	"./en-gb.js": 320,
	"./en-ie": 321,
	"./en-ie.js": 321,
	"./en-il": 322,
	"./en-il.js": 322,
	"./en-nz": 323,
	"./en-nz.js": 323,
	"./eo": 324,
	"./eo.js": 324,
	"./es": 325,
	"./es-do": 326,
	"./es-do.js": 326,
	"./es-us": 327,
	"./es-us.js": 327,
	"./es.js": 325,
	"./et": 328,
	"./et.js": 328,
	"./eu": 329,
	"./eu.js": 329,
	"./fa": 330,
	"./fa.js": 330,
	"./fi": 331,
	"./fi.js": 331,
	"./fo": 332,
	"./fo.js": 332,
	"./fr": 333,
	"./fr-ca": 334,
	"./fr-ca.js": 334,
	"./fr-ch": 335,
	"./fr-ch.js": 335,
	"./fr.js": 333,
	"./fy": 336,
	"./fy.js": 336,
	"./gd": 337,
	"./gd.js": 337,
	"./gl": 338,
	"./gl.js": 338,
	"./gom-latn": 339,
	"./gom-latn.js": 339,
	"./gu": 340,
	"./gu.js": 340,
	"./he": 341,
	"./he.js": 341,
	"./hi": 342,
	"./hi.js": 342,
	"./hr": 343,
	"./hr.js": 343,
	"./hu": 344,
	"./hu.js": 344,
	"./hy-am": 345,
	"./hy-am.js": 345,
	"./id": 346,
	"./id.js": 346,
	"./is": 347,
	"./is.js": 347,
	"./it": 348,
	"./it.js": 348,
	"./ja": 349,
	"./ja.js": 349,
	"./jv": 350,
	"./jv.js": 350,
	"./ka": 351,
	"./ka.js": 351,
	"./kk": 352,
	"./kk.js": 352,
	"./km": 353,
	"./km.js": 353,
	"./kn": 354,
	"./kn.js": 354,
	"./ko": 355,
	"./ko.js": 355,
	"./ky": 356,
	"./ky.js": 356,
	"./lb": 357,
	"./lb.js": 357,
	"./lo": 358,
	"./lo.js": 358,
	"./lt": 359,
	"./lt.js": 359,
	"./lv": 360,
	"./lv.js": 360,
	"./me": 361,
	"./me.js": 361,
	"./mi": 362,
	"./mi.js": 362,
	"./mk": 363,
	"./mk.js": 363,
	"./ml": 364,
	"./ml.js": 364,
	"./mn": 365,
	"./mn.js": 365,
	"./mr": 366,
	"./mr.js": 366,
	"./ms": 367,
	"./ms-my": 368,
	"./ms-my.js": 368,
	"./ms.js": 367,
	"./mt": 369,
	"./mt.js": 369,
	"./my": 370,
	"./my.js": 370,
	"./nb": 371,
	"./nb.js": 371,
	"./ne": 372,
	"./ne.js": 372,
	"./nl": 373,
	"./nl-be": 374,
	"./nl-be.js": 374,
	"./nl.js": 373,
	"./nn": 375,
	"./nn.js": 375,
	"./pa-in": 376,
	"./pa-in.js": 376,
	"./pl": 377,
	"./pl.js": 377,
	"./pt": 378,
	"./pt-br": 379,
	"./pt-br.js": 379,
	"./pt.js": 378,
	"./ro": 380,
	"./ro.js": 380,
	"./ru": 381,
	"./ru.js": 381,
	"./sd": 382,
	"./sd.js": 382,
	"./se": 383,
	"./se.js": 383,
	"./si": 384,
	"./si.js": 384,
	"./sk": 385,
	"./sk.js": 385,
	"./sl": 386,
	"./sl.js": 386,
	"./sq": 387,
	"./sq.js": 387,
	"./sr": 388,
	"./sr-cyrl": 389,
	"./sr-cyrl.js": 389,
	"./sr.js": 388,
	"./ss": 390,
	"./ss.js": 390,
	"./sv": 391,
	"./sv.js": 391,
	"./sw": 392,
	"./sw.js": 392,
	"./ta": 393,
	"./ta.js": 393,
	"./te": 394,
	"./te.js": 394,
	"./tet": 395,
	"./tet.js": 395,
	"./tg": 396,
	"./tg.js": 396,
	"./th": 397,
	"./th.js": 397,
	"./tl-ph": 398,
	"./tl-ph.js": 398,
	"./tlh": 399,
	"./tlh.js": 399,
	"./tr": 400,
	"./tr.js": 400,
	"./tzl": 401,
	"./tzl.js": 401,
	"./tzm": 402,
	"./tzm-latn": 403,
	"./tzm-latn.js": 403,
	"./tzm.js": 402,
	"./ug-cn": 404,
	"./ug-cn.js": 404,
	"./uk": 405,
	"./uk.js": 405,
	"./ur": 406,
	"./ur.js": 406,
	"./uz": 407,
	"./uz-latn": 408,
	"./uz-latn.js": 408,
	"./uz.js": 407,
	"./vi": 409,
	"./vi.js": 409,
	"./x-pseudo": 410,
	"./x-pseudo.js": 410,
	"./yo": 411,
	"./yo.js": 411,
	"./zh-cn": 412,
	"./zh-cn.js": 412,
	"./zh-hk": 413,
	"./zh-hk.js": 413,
	"./zh-tw": 414,
	"./zh-tw.js": 414
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
webpackContext.id = 551;

/***/ }),

/***/ 553:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return monthName; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var monthName = /** @class */ (function () {
    function monthName() {
    }
    monthName.prototype.transform = function (value, args) {
        if (args === 'es') {
            this.lang = 'es';
        }
        var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        if (this.lang === 'es') {
            monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        }
        return monthNames[value - 1];
    };
    monthName = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
            name: 'monthName'
        })
    ], monthName);
    return monthName;
}());

//# sourceMappingURL=month-name.js.map

/***/ }),

/***/ 554:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_firebase__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__ = __webpack_require__(457);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(459);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_load_load__ = __webpack_require__(185);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_items_items__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_social_social__ = __webpack_require__(471);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_in_app_purchase__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_fabric__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_stores_user__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_fcm__ = __webpack_require__(480);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_storage__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_http_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__providers_load_load__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_native_audio__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_firebase_config__ = __webpack_require__(481);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_app_rate__ = __webpack_require__(184);
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




















var MyApp = /** @class */ (function () {
    function MyApp(platform, appRate, statusBar, splashScreen, fcm, events, storage, userData, iap, http, loader, alertCtrl, crashlytics, answers, nativeAudio, firebaseConfig) {
        this.platform = platform;
        this.appRate = appRate;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.fcm = fcm;
        this.events = events;
        this.storage = storage;
        this.userData = userData;
        this.iap = iap;
        this.http = http;
        this.loader = loader;
        this.alertCtrl = alertCtrl;
        this.crashlytics = crashlytics;
        this.answers = answers;
        this.nativeAudio = nativeAudio;
        this.firebaseConfig = firebaseConfig;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_load_load__["a" /* LoadPage */];
        this.user = {
            email: null,
            purchased: null
        };
        this.freeSub = false;
        this.chosenPicture = null;
        __WEBPACK_IMPORTED_MODULE_0_firebase___default.a.initializeApp({
            apiKey: "AIzaSyCLOlz7uQrEC-HutG9MILNsgMtFE5CyOyU",
            authDomain: "foodtracker-8cd65.firebaseapp.com",
            databaseURL: "https://foodtracker-8cd65.firebaseio.com/",
            projectId: "foodtracker-8cd65",
            storageBucket: "gs://foodtracker-8cd65.appspot.com",
            messagingSenderId: "1074520532115"
        });
        http.databaseRef = __WEBPACK_IMPORTED_MODULE_0_firebase___default.a.database();
        __WEBPACK_IMPORTED_MODULE_0_firebase___default.a.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                crashlytics.setUserIdentifier(user.uid);
                events.publish('user:set', user);
            }
            else {
                // No user is signed in.
                events.publish('user:not-set', null);
            }
        });
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["c" /* HomePage */], icon: 'ios-home' },
            { title: 'Food Items', component: __WEBPACK_IMPORTED_MODULE_7__pages_items_items__["b" /* ItemsPage */], icon: 'ios-pizza' }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need      
            _this.fcm.getToken().then(function (token) {
                _this.userData.token = token;
            });
            _this.fcm.onNotification().subscribe(function (data) {
                if (data.wasTapped) {
                    _this.userData.notifications.clicked = true;
                    _this.userData.notifications.content = JSON.parse(data.content);
                }
                else {
                    console.log("Received in foreground");
                }
                ;
            });
            _this.nativeAudio.preloadSimple('message', 'assets/sounds/message.mp3').catch(function (err) { return console.log(); });
            _this.nativeAudio.preloadSimple('post', 'assets/sounds/message.mp3').catch(function (err) { return console.log; });
            _this.events.subscribe('user:created', function (email) {
                _this.user.email = email;
            });
            _this.events.subscribe('user:purchased', function (flag) {
                _this.user.purchased = flag;
            });
            _this.events.subscribe('user:avatar', function (avatar) {
                _this.chosenPicture = avatar;
            });
            /*
            this.firebaseConfig.getBoolean('free_subscription')
            .then((res: any) => {
              if (res) this.freeSub = true;
            })
            .catch((error: any) => console.error(error));
      */
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    MyApp.prototype.goToSocial = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var alert, iap, purchased, subscribed;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.answers.sendCustomEvent("Subscription Clicked");
                        this.loader.createLoader();
                        this.loader.presentLoader();
                        alert = this.alertCtrl.create({
                            title: 'Social Subscription',
                            subTitle: 'The social side of Chronic Badass allows you to make a profile and post to the message board. You can like and comment on other people\'s posts and will be the main focus of Chronic Badass! There is a 7 day free trial to get your feet wet, but we know you\'ll love it!',
                            buttons: [{
                                    text: 'Got It',
                                    handler: function () {
                                        _this.offerPurchase(iap, purchased, _this.loader);
                                    }
                                }]
                        });
                        iap = new __WEBPACK_IMPORTED_MODULE_9__ionic_native_in_app_purchase__["a" /* InAppPurchase */];
                        purchased = false;
                        subscribed = false;
                        if (!(this.userData.role === 1 && !this.userData.freeWeekend)) return [3 /*break*/, 2];
                        return [4 /*yield*/, iap.restorePurchases()
                                .then(function (data) {
                                for (var i = 0; i < data.length; i++) {
                                    if (data[i].productId === 'com.ionicframework.tracker210235.upgrade') {
                                        purchased = true;
                                        break;
                                    }
                                    if (data[i].productId === 'com.ionicframework.tracker210235.social_subscription' || data[i].productId === 'com.ionicframework.tracker210235.social_subscription_2') {
                                        var receipt = JSON.parse(data[i].receipt);
                                        if (receipt.purchaseState === 0) {
                                            subscribed = true;
                                        }
                                    }
                                }
                            }).catch(function (err) {
                                console.log(err);
                                this.loader.dismissLoader();
                            })];
                    case 1:
                        _a.sent();
                        if (!subscribed)
                            alert.present();
                        else
                            this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_8__pages_social_social__["a" /* SocialPage */]);
                        return [3 /*break*/, 3];
                    case 2:
                        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_8__pages_social_social__["a" /* SocialPage */]);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MyApp.prototype.offerPurchase = function (iap, purchased, loader) {
        return __awaiter(this, void 0, void 0, function () {
            var failed;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        failed = false;
                        return [4 /*yield*/, iap.getProducts(['com.ionicframework.tracker210235.social_subscription', 'com.ionicframework.tracker210235.social_subscription_2'])
                                .then(function (products) {
                                return __awaiter(this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                if (!purchased) return [3 /*break*/, 2];
                                                return [4 /*yield*/, iap.subscribe('com.ionicframework.tracker210235.social_subscription')
                                                        .then(function () {
                                                        this.answers.sendPurchase({
                                                            itemPrice: products[0].price,
                                                            currency: products[0].currency,
                                                            itemName: products[0].title,
                                                            itemId: products[0].productId
                                                        });
                                                    })
                                                        .catch(function (err) {
                                                        console.log(err);
                                                        failed = true;
                                                        loader.dismissLoader();
                                                    })];
                                            case 1:
                                                _a.sent();
                                                return [3 /*break*/, 4];
                                            case 2: return [4 /*yield*/, iap.subscribe('com.ionicframework.tracker210235.social_subscription_2')
                                                    .then(function () {
                                                    this.answers.sendPurchase({
                                                        itemPrice: products[1].price,
                                                        currency: products[1].currency,
                                                        itemName: products[1].title,
                                                        itemId: products[1].productId
                                                    });
                                                })
                                                    .catch(function (err) {
                                                    console.log(err);
                                                    failed = true;
                                                    loader.dismissLoader();
                                                })];
                                            case 3:
                                                _a.sent();
                                                _a.label = 4;
                                            case 4: return [2 /*return*/];
                                        }
                                    });
                                });
                            })
                                .catch(function (err) {
                                console.log(err);
                                failed = true;
                                loader.dismissLoader();
                            })];
                    case 1:
                        _a.sent();
                        if (!failed) {
                            this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_8__pages_social_social__["a" /* SocialPage */]);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    MyApp.prototype.logout = function () {
        __WEBPACK_IMPORTED_MODULE_0_firebase___default.a.auth().signOut().then(function () {
        }).catch(function (error) {
        });
    };
    MyApp.prototype.leaveReview = function () {
        this.appRate.preferences.storeAppURL = {
            android: 'market://details?id=com.ionicframework.tracker210235'
        };
        this.appRate.navigateToAppStore();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/austinhunter/Documents/GitHub/food-tracker/src/app/app.html"*/'<ion-menu [content]="content" id="menu-avatar">\n  <ion-content>\n    <div #header>\n      <ion-row style="align-items:center;">\n        <ion-col col-3>\n        </ion-col>\n        <ion-col col-6>\n          <img class="user-avatar round" [src]="chosenPicture" onerror="this.src=\'./assets/imgs/default-avatar.jpg\'" />\n        </ion-col>\n        <ion-col col-3>\n        </ion-col>\n      </ion-row>\n      <ion-row style="justify-content: center;">\n        <h3>{{user.email}}</h3>\n      </ion-row>\n    </div>\n    <ion-list>\n      <button menuClose ion-item detail-none *ngFor="let p of pages" (click)="openPage(p)">\n        <ion-icon [name]="p.icon" item-left></ion-icon>\n        {{p.title}}\n      </button>\n\n      <button menuClose ion-item detail-none (click)="goToSocial()">\n        <ion-icon name="ios-chatbubbles" item-left></ion-icon>\n        Social\n      </button>\n\n      <button menuClose ion-item detail-none (click)="logout()">\n          <ion-icon name="ios-lock" item-left></ion-icon>\n          Logout\n        </button>\n    </ion-list>\n  </ion-content>\n  <ion-footer>\n      <button menuClose ion-item detail-none (click)="leaveReview()">\n          <ion-icon name="share-alt" item-left></ion-icon>\n          Leave A Review\n      </button>\n  </ion-footer>\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n'/*ion-inline-end:"/Users/austinhunter/Documents/GitHub/food-tracker/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["o" /* Platform */], __WEBPACK_IMPORTED_MODULE_18__ionic_native_app_rate__["a" /* AppRate */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_12__ionic_native_fcm__["a" /* FCM */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_13__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_11__providers_stores_user__["a" /* UserProvider */], __WEBPACK_IMPORTED_MODULE_9__ionic_native_in_app_purchase__["a" /* InAppPurchase */], __WEBPACK_IMPORTED_MODULE_14__providers_http_http__["a" /* HttpProvider */], __WEBPACK_IMPORTED_MODULE_15__providers_load_load__["a" /* LoadProvider */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_10__ionic_native_fabric__["b" /* Crashlytics */], __WEBPACK_IMPORTED_MODULE_10__ionic_native_fabric__["a" /* Answers */], __WEBPACK_IMPORTED_MODULE_16__ionic_native_native_audio__["a" /* NativeAudio */], __WEBPACK_IMPORTED_MODULE_17__ionic_native_firebase_config__["a" /* FirebaseConfig */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 61:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForumProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__http_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__user__ = __webpack_require__(17);
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




var ForumProvider = /** @class */ (function () {
    function ForumProvider(http, user) {
        this.http = http;
        this.user = user;
        this.posts = [];
        this.postLikes = null;
        this.usersPostCount = 0;
    }
    ForumProvider.prototype.setPosts = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (data !== null)
                            this.posts = data;
                        this.posts.reverse();
                        return [4 /*yield*/, this.getUserPostsCount()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ForumProvider.prototype.getPostLikes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.getPostLikes()];
                    case 1:
                        data = _a.sent();
                        this.postLikes = this.convertDataToArray(data);
                        return [2 /*return*/, this.postLikes];
                }
            });
        });
    };
    ForumProvider.prototype.getUserPostsCount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i;
            return __generator(this, function (_a) {
                this.usersPostCount = 0;
                for (i = 0; i < this.posts.length; i++) {
                    if (this.posts[i].uid === this.user.user.uid) {
                        this.usersPostCount++;
                    }
                }
                return [2 /*return*/, this.usersPostCount];
            });
        });
    };
    ForumProvider.prototype.convertDataToArray = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var keys, arr, i, avatar;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        keys = [];
                        arr = [];
                        data.forEach(function (item) {
                            var itemVal = item.val();
                            itemVal.key = item.key;
                            keys.push(itemVal);
                        });
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < keys.length)) return [3 /*break*/, 4];
                        keys[i].time_since = __WEBPACK_IMPORTED_MODULE_1_moment___default()(keys[i].posted, 'MMMM Do YYYY, h:mm:ss a').fromNow();
                        return [4 /*yield*/, this.http.getUserAvatar(keys[i].uid)];
                    case 2:
                        avatar = _a.sent();
                        keys[i].avatar_image = (avatar.val() !== null ? avatar.val().avatar_image : 'https://firebasestorage.googleapis.com/v0/b/foodtracker-8cd65.appspot.com/o/default-avatar.jpg?alt=media&token=e0eb897f-23d7-496d-8a8f-9b158f92655b');
                        arr.push(keys[i]);
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, arr];
                }
            });
        });
    };
    ForumProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__http_http__["a" /* HttpProvider */], __WEBPACK_IMPORTED_MODULE_3__user__["a" /* UserProvider */]])
    ], ForumProvider);
    return ForumProvider;
}());

//# sourceMappingURL=forum.js.map

/***/ }),

/***/ 687:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PipesModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sort_sort__ = __webpack_require__(688);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__myposts_myposts__ = __webpack_require__(689);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PipesModule = /** @class */ (function () {
    function PipesModule() {
    }
    PipesModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_1__sort_sort__["a" /* SortPipe */],
                __WEBPACK_IMPORTED_MODULE_2__myposts_myposts__["a" /* MypostsPipe */]],
            imports: [],
            exports: [__WEBPACK_IMPORTED_MODULE_1__sort_sort__["a" /* SortPipe */],
                __WEBPACK_IMPORTED_MODULE_2__myposts_myposts__["a" /* MypostsPipe */]]
        })
    ], PipesModule);
    return PipesModule;
}());

//# sourceMappingURL=pipes.module.js.map

/***/ }),

/***/ 688:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SortPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var SortPipe = /** @class */ (function () {
    function SortPipe() {
    }
    SortPipe.prototype.transform = function (array, field) {
        array.sort(function (a, b) {
            if (a[field] < b[field]) {
                return -1;
            }
            else if (a[field] > b[field]) {
                return 1;
            }
            else {
                return 0;
            }
        });
        return array;
    };
    SortPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
            name: 'sort',
        })
    ], SortPipe);
    return SortPipe;
}());

//# sourceMappingURL=sort.js.map

/***/ }),

/***/ 689:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MypostsPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_stores_user__ = __webpack_require__(17);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MypostsPipe = /** @class */ (function () {
    function MypostsPipe(user) {
        this.user = user;
    }
    MypostsPipe.prototype.transform = function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var postArr = [];
        var flag = args[0];
        for (var i = 0; i < value.length; i++) {
            if (flag) {
                if (value[i].uid === this.user.user.uid) {
                    postArr.push(value[i]);
                }
            }
            else {
                if (value[i].uid !== this.user.user.uid) {
                    postArr.push(value[i]);
                }
            }
        }
        return postArr;
    };
    MypostsPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
            name: 'myposts',
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_stores_user__["a" /* UserProvider */]])
    ], MypostsPipe);
    return MypostsPipe;
}());

//# sourceMappingURL=myposts.js.map

/***/ }),

/***/ 690:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProgressBarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
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
 * Generated class for the ProgressBarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var ProgressBarComponent = /** @class */ (function () {
    function ProgressBarComponent() {
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('progress'),
        __metadata("design:type", Object)
    ], ProgressBarComponent.prototype, "progress", void 0);
    ProgressBarComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'progress-bar',template:/*ion-inline-start:"/Users/austinhunter/Documents/GitHub/food-tracker/src/components/progress-bar/progress-bar.html"*/'<div class="progress-outer">\n    <div class="progress-inner" [style.width]="progress + \'%\'">\n        {{progress}}%\n    </div>\n</div>\n'/*ion-inline-end:"/Users/austinhunter/Documents/GitHub/food-tracker/src/components/progress-bar/progress-bar.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], ProgressBarComponent);
    return ProgressBarComponent;
}());

//# sourceMappingURL=progress-bar.js.map

/***/ }),

/***/ 84:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return HomePage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddEntry; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return EditEntry; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_stores_user__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_http_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_load_load__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angular2_uuid__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angular2_uuid___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_angular2_uuid__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_rate_service_rate_service__ = __webpack_require__(183);
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








var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, navParams, events, modalCtrl, userData, http, loader, rateService, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.events = events;
        this.modalCtrl = modalCtrl;
        this.userData = userData;
        this.http = http;
        this.loader = loader;
        this.rateService = rateService;
        this.storage = storage;
        this.user = null;
        this.data = null;
        this.isLoading = true;
        this.entriesDateArray = [];
        this.entryList = [];
        this.today = {
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
            date: new Date().getDate()
        };
        this.selectedDate = this.today;
    }
    HomePage.prototype.ionViewWillLoad = function () {
        this.user = this.userData;
    };
    HomePage.prototype.ionViewDidLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.loadEntries();
                return [2 /*return*/];
            });
        });
    };
    HomePage.prototype.loadEntries = function () {
        this.isLoading = false;
        for (var i = 0; i < this.user.entries.length; i++) {
            this.entriesDateArray.push(this.user.entries[i].date);
            if (this.compareDates(this.user.entries[i].date, this.today))
                this.entryList.push(this.user.entries[i]);
        }
        if (this.loader.isLoading)
            this.loader.dismissLoader();
    };
    HomePage.prototype.clearEntries = function () {
        this.entryList = [];
        this.entriesDateArray = [];
    };
    HomePage.prototype.onDaySelect = function (event) {
        this.entryList = [];
        for (var i = 0; i < this.user.entries.length; i++) {
            if (this.compareDates(this.user.entries[i].date, event))
                this.entryList.push(this.user.entries[i]);
        }
        this.selectedDate = event;
    };
    HomePage.prototype.compareDates = function (list1, list2) {
        return (list1.year === list2.year && list1.month === list2.month && list1.date === list2.date);
    };
    HomePage.prototype.addItem = function () {
        var _this = this;
        var addItemModal = this.modalCtrl.create(AddEntry, { today: this.selectedDate });
        addItemModal.present();
        addItemModal.onDidDismiss(function (data) {
            _this.clearEntries();
            _this.loadEntries();
            if (_this.loader.isLoading)
                _this.loader.dismissLoader();
        });
    };
    HomePage.prototype.editItem = function (entry) {
        var _this = this;
        var editItemModal = this.modalCtrl.create(EditEntry, { entry: entry });
        editItemModal.present();
        editItemModal.onDidDismiss(function (data) {
            _this.clearEntries();
            _this.loadEntries();
            if (_this.loader.isLoading)
                _this.loader.dismissLoader();
        });
    };
    HomePage.prototype.deleteItem = function (entry) {
        for (var i = 0; i < this.user.entries.length; i++) {
            if (this.user.entries[i].id === entry.id) {
                this.user.entries.splice(i, 1);
                this.http.updateUser();
                this.clearEntries();
                this.loadEntries();
                break;
            }
        }
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/austinhunter/Documents/GitHub/food-tracker/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon color="white" name="menu"></ion-icon>\n    </button>\n  </ion-navbar>\n</ion-header>\n<ion-content padding>\n  <div *ngIf="!isLoading">\n    <ion-calendar #calendar lang="en" [events]="entriesDateArray" (onDaySelect)="onDaySelect($event)"></ion-calendar>\n    <ion-list>\n      <ion-list-header>\n        <div *ngIf="(entryList.length > 0); else showDefault">Entries</div>\n        <ng-template #showDefault>Entries you add will be shown here</ng-template>\n      </ion-list-header>\n      <ion-item *ngFor="let entry of entryList">\n        <ion-card>\n          <ion-card-header>\n            {{entry.bms}} BM\'s\n          </ion-card-header>\n          <ion-card-content text-wrap>\n            {{entry.text}}\n          </ion-card-content>\n          <ion-row>\n              <ion-col>\n                <button ion-button icon-start clear small style="color: #7700f7" (click)="editItem(entry)">\n                  <ion-icon name="ios-hammer"></ion-icon>\n                  <div>Edit</div>\n                </button>\n              </ion-col>\n              <ion-col>\n                <button ion-button icon-start clear small color="danger" (click)="deleteItem(entry)">\n                  <ion-icon name="ios-trash"></ion-icon>\n                  <div>Delete</div>\n                </button>\n              </ion-col>\n            </ion-row>\n        </ion-card>\n      </ion-item>\n    </ion-list>\n  </div>\n  <ion-fab right bottom>\n    <button ion-fab mini class="fab-button" (click)="addItem();"><ion-icon name="add"></ion-icon></button>\n  </ion-fab>\n</ion-content>\n<ion-footer>\n</ion-footer>\n'/*ion-inline-end:"/Users/austinhunter/Documents/GitHub/food-tracker/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */], __WEBPACK_IMPORTED_MODULE_3__providers_stores_user__["a" /* UserProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_http_http__["a" /* HttpProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_load_load__["a" /* LoadProvider */], __WEBPACK_IMPORTED_MODULE_7__providers_rate_service_rate_service__["a" /* RateServiceProvider */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
    ], HomePage);
    return HomePage;
}());

var AddEntry = /** @class */ (function () {
    function AddEntry(viewCtrl, params, userData, http, loader) {
        this.viewCtrl = viewCtrl;
        this.userData = userData;
        this.http = http;
        this.loader = loader;
        this.entry = {
            id: '',
            text: '',
            bms: 0,
            date: {}
        };
        this.entry.date = {
            date: params.get('today').date,
            month: params.get('today').month,
            year: params.get('today').year
        };
    }
    AddEntry.prototype.submit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.loader.createLoader();
                this.loader.presentLoader();
                this.entry.id = __WEBPACK_IMPORTED_MODULE_6_angular2_uuid__["UUID"].UUID();
                this.userData.entries.push(this.entry);
                this.http.updateUser();
                this.viewCtrl.dismiss();
                return [2 /*return*/];
            });
        });
    };
    AddEntry.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    AddEntry = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'add-item',template:/*ion-inline-start:"/Users/austinhunter/Documents/GitHub/food-tracker/src/pages/home/addItem.html"*/'<ion-content padding>\n  <ion-list>\n\n  <ion-item style="padding-bottom: 15px">\n    <ion-label style="color: black" stacked>Entry Text</ion-label>\n    <ion-textarea rows="10" [(ngModel)]="entry.text" type="text" style="opacity: 0.5; border: 1px solid #eaeff5;" autocomplete="on" autocorrect="on"></ion-textarea>\n  </ion-item>\n\n  <ion-item style="padding-bottom: 15px">\n    <ion-label style="color: black" >BMs</ion-label>\n    <ion-select [(ngModel)]="entry.bms" interface="popover">\n      <ion-option value="0">0</ion-option>\n      <ion-option value="1">1</ion-option>\n      <ion-option value="2">2</ion-option>\n      <ion-option value="3">3</ion-option>\n      <ion-option value="4">4</ion-option>\n      <ion-option value="5">5</ion-option>\n      <ion-option value="6">6</ion-option>\n      <ion-option value="7">7</ion-option>\n      <ion-option value="8">8</ion-option>\n      <ion-option value="9">9</ion-option>\n      <ion-option value="10">10</ion-option>\n      <ion-option value="11">11</ion-option>\n      <ion-option value="12">12</ion-option>\n      <ion-option value="13">13</ion-option>\n      <ion-option value="14">14</ion-option>\n      <ion-option value="15">15</ion-option>\n      <ion-option value="16">16</ion-option>\n      <ion-option value="17">17</ion-option>\n      <ion-option value="18">18</ion-option>\n      <ion-option value="19">19</ion-option>\n      <ion-option value="20">20</ion-option>\n    </ion-select>\n  </ion-item>\n\n</ion-list>\n  <button ion-button block style="color: white" (click)="submit()">Submit</button>\n  <div style="text-align:center"><button ion-button small outline (click)="dismiss()">Cancel</button></div>\n</ion-content>\n'/*ion-inline-end:"/Users/austinhunter/Documents/GitHub/food-tracker/src/pages/home/addItem.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_stores_user__["a" /* UserProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_http_http__["a" /* HttpProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_load_load__["a" /* LoadProvider */]])
    ], AddEntry);
    return AddEntry;
}());

var EditEntry = /** @class */ (function () {
    function EditEntry(viewCtrl, params, userData, http, loader) {
        this.viewCtrl = viewCtrl;
        this.userData = userData;
        this.http = http;
        this.loader = loader;
        this.entry = {
            id: '',
            text: '',
            bms: 0,
            date: {}
        };
        this.entry = params.get('entry');
    }
    EditEntry.prototype.submit = function () {
        this.loader.createLoader();
        this.loader.presentLoader();
        for (var i = 0; i < this.userData.entries.length; i++) {
            if (this.userData.entries[i].id === this.entry.id) {
                this.userData.entries[i] = this.entry;
                this.http.updateUser();
                this.viewCtrl.dismiss();
                break;
            }
        }
    };
    EditEntry.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    EditEntry = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'edit-item',template:/*ion-inline-start:"/Users/austinhunter/Documents/GitHub/food-tracker/src/pages/home/editItem.html"*/'<ion-content padding>\n  <ion-list>\n\n  <ion-item style="padding-bottom: 15px">\n    <ion-label style="color: black" stacked>Entry Text</ion-label>\n    <ion-textarea [(ngModel)]="entry.text" type="text" style="height: 50px;" style="opacity: 0.5; border: 1px solid #eaeff5;" autocomplete="on" autocorrect="on"></ion-textarea>\n  </ion-item>\n\n  <ion-item style="padding-bottom: 15px">\n    <ion-label style="color: black" >BMs</ion-label>\n    <ion-select [(ngModel)]="entry.bms" interface="popover">\n      <ion-option value="0">0</ion-option>\n      <ion-option value="1">1</ion-option>\n      <ion-option value="2">2</ion-option>\n      <ion-option value="3">3</ion-option>\n      <ion-option value="4">4</ion-option>\n      <ion-option value="5">5</ion-option>\n      <ion-option value="6">6</ion-option>\n      <ion-option value="7">7</ion-option>\n      <ion-option value="8">8</ion-option>\n      <ion-option value="9">9</ion-option>\n      <ion-option value="10">10</ion-option>\n    </ion-select>\n  </ion-item>\n\n</ion-list>\n  <button ion-button block style="color: white" (click)="submit()">Submit</button>\n  <div style="text-align:center"><button ion-button small outline (click)="dismiss()">Cancel</button></div>\n</ion-content>\n'/*ion-inline-end:"/Users/austinhunter/Documents/GitHub/food-tracker/src/pages/home/editItem.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_stores_user__["a" /* UserProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_http_http__["a" /* HttpProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_load_load__["a" /* LoadProvider */]])
    ], EditEntry);
    return EditEntry;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 85:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase_firestore__ = __webpack_require__(646);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase_firestore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase_firestore__);
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
  Generated class for the ChatProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var ChatProvider = /** @class */ (function () {
    function ChatProvider() {
        this.db = null;
        this.users = null;
        this.chats = null;
        this.db = __WEBPACK_IMPORTED_MODULE_1_firebase__["firestore"]();
        this.users = this.db.collection('users');
        this.chats = this.db.collection('chats');
    }
    ChatProvider.prototype.addUser = function (payload) {
        return this.users.add(payload);
    };
    ChatProvider.prototype.addChat = function (chat) {
        console.log(chat);
        return this.chats.add(chat);
    };
    ChatProvider.prototype.createPairId = function (user1, user2) {
        var pairId;
        if (user1.fullName < user2.fullName) {
            pairId = user1.email + "|" + user2.email;
        }
        else {
            pairId = user2.email + "|" + user1.email;
        }
        return pairId;
    };
    ChatProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], ChatProvider);
    return ChatProvider;
}());

//# sourceMappingURL=chat.js.map

/***/ })

},[483]);
//# sourceMappingURL=main.js.map