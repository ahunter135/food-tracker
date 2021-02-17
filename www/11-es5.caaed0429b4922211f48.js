!function(){function n(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}function e(n,e){for(var t=0;t<e.length;t++){var o=e[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(n,o.key,o)}}(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{F4UR:function(t,o,i){"use strict";i.r(o),i.d(o,"LoginPageModule",(function(){return k}));var r=i("ofXK"),a=i("3Pt+"),c=i("TEn/"),s=i("tyNb"),l=i("mrSG"),u=i("JZFu"),b=i("fXoL"),f=i("n90K");function d(n,e){1&n&&(b.Kb(0,"span"),b.ic(1,"Login"),b.Jb())}function g(n,e){1&n&&(b.Kb(0,"span"),b.Ib(1,"ion-spinner",7),b.Jb())}var p,h,m,w=function(){return["/register"]},v=[{path:"",component:(p=function(){function t(e,o){n(this,t),this.router=e,this.storage=o,this.loading=!1}var o,i,r;return o=t,(i=[{key:"ngOnInit",value:function(){}},{key:"login",value:function(){return Object(l.a)(this,void 0,void 0,regeneratorRuntime.mark((function n(){var e=this;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(!this.loading){this.loading=!0;try{u.a.auth().signInWithEmailAndPassword(this.email,this.password).then((function(n){return Object(l.a)(e,void 0,void 0,regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n.user.emailVerified){e.next=2;break}return e.abrupt("return",(alert("Please make sure your email is validated"),void(this.loading=!1)));case 2:return t={key:"loggedInTracker",value:JSON.stringify(n.user)},e.next=5,this.storage.setItem(t);case 5:this.loading=!1,this.router.navigate(["/folder/Directory"],{replaceUrl:!0});case 7:case"end":return e.stop()}}),e,this)})))})).catch((function(n){e.loading=!1,alert(n)}))}catch(t){alert("Please make sure both fields are correct"),this.loading=!1}}case 1:case"end":return n.stop()}}),n,this)})))}}])&&e(o.prototype,i),r&&e(o,r),t}(),p.\u0275fac=function(n){return new(n||p)(b.Hb(s.g),b.Hb(f.a))},p.\u0275cmp=b.Bb({type:p,selectors:[["app-login"]],decls:20,vars:6,consts:[["position","floating"],["placeholder","john.doe@domain.com","type","email",3,"ngModel","ngModelChange"],["placeholder","password12345","type","password",3,"ngModel","ngModelChange"],[2,"text-align","center"],[3,"routerLink"],["expand","block","color","dark",3,"click"],[4,"ngIf"],["color","secondary","name","bubbles"]],template:function(n,e){1&n&&(b.Kb(0,"ion-content"),b.Kb(1,"ion-card"),b.Kb(2,"ion-card-content"),b.Kb(3,"ion-item"),b.Kb(4,"ion-label",0),b.ic(5,"Email"),b.Jb(),b.Kb(6,"ion-input",1),b.Sb("ngModelChange",(function(n){return e.email=n})),b.Jb(),b.Jb(),b.Ib(7,"br"),b.Kb(8,"ion-item"),b.Kb(9,"ion-label",0),b.ic(10,"Password"),b.Jb(),b.Kb(11,"ion-input",2),b.Sb("ngModelChange",(function(n){return e.password=n})),b.Jb(),b.Jb(),b.Ib(12,"br"),b.Kb(13,"div",3),b.Kb(14,"a",4),b.ic(15,"Create an Account"),b.Jb(),b.Jb(),b.Ib(16,"br"),b.Kb(17,"ion-button",5),b.Sb("click",(function(){return e.login()})),b.hc(18,d,2,0,"span",6),b.hc(19,g,2,0,"span",6),b.Jb(),b.Jb(),b.Jb(),b.Jb()),2&n&&(b.xb(6),b.Zb("ngModel",e.email),b.xb(5),b.Zb("ngModel",e.password),b.xb(3),b.Zb("routerLink",b.bc(5,w)),b.xb(4),b.Zb("ngIf",!e.loading),b.xb(1),b.Zb("ngIf",e.loading))},directives:[c.l,c.g,c.h,c.s,c.w,c.r,c.W,a.e,a.f,s.i,c.U,c.e,r.j,c.K],styles:["ion-card[_ngcontent-%COMP%]{top:30%}ion-item[_ngcontent-%COMP%]{--highlight-color-focused:#fff;--color-focused:#fff}ion-item.item-has-focus[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]{color:#fff!important}"]}),p)}],y=((m=function e(){n(this,e)}).\u0275mod=b.Fb({type:m}),m.\u0275inj=b.Eb({factory:function(n){return new(n||m)},imports:[[s.j.forChild(v)],s.j]}),m),k=((h=function e(){n(this,e)}).\u0275mod=b.Fb({type:h}),h.\u0275inj=b.Eb({factory:function(n){return new(n||h)},imports:[[r.b,a.a,c.P,y]]}),h)}}])}();