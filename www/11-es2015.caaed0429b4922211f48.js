(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{F4UR:function(n,e,o){"use strict";o.r(e),o.d(e,"LoginPageModule",(function(){return p}));var t=o("ofXK"),i=o("3Pt+"),r=o("TEn/"),a=o("tyNb"),s=o("mrSG"),c=o("JZFu"),l=o("fXoL"),b=o("n90K");function d(n,e){1&n&&(l.Kb(0,"span"),l.ic(1,"Login"),l.Jb())}function u(n,e){1&n&&(l.Kb(0,"span"),l.Ib(1,"ion-spinner",7),l.Jb())}const g=function(){return["/register"]},f=[{path:"",component:(()=>{class n{constructor(n,e){this.router=n,this.storage=e,this.loading=!1}ngOnInit(){}login(){return Object(s.a)(this,void 0,void 0,(function*(){if(!this.loading){this.loading=!0;try{c.a.auth().signInWithEmailAndPassword(this.email,this.password).then(n=>Object(s.a)(this,void 0,void 0,(function*(){if(!n.user.emailVerified)return alert("Please make sure your email is validated"),void(this.loading=!1);let e={key:"loggedInTracker",value:JSON.stringify(n.user)};yield this.storage.setItem(e),this.loading=!1,this.router.navigate(["/folder/Directory"],{replaceUrl:!0})}))).catch(n=>{this.loading=!1,alert(n)})}catch(n){alert("Please make sure both fields are correct"),this.loading=!1}}}))}}return n.\u0275fac=function(e){return new(e||n)(l.Hb(a.g),l.Hb(b.a))},n.\u0275cmp=l.Bb({type:n,selectors:[["app-login"]],decls:20,vars:6,consts:[["position","floating"],["placeholder","john.doe@domain.com","type","email",3,"ngModel","ngModelChange"],["placeholder","password12345","type","password",3,"ngModel","ngModelChange"],[2,"text-align","center"],[3,"routerLink"],["expand","block","color","dark",3,"click"],[4,"ngIf"],["color","secondary","name","bubbles"]],template:function(n,e){1&n&&(l.Kb(0,"ion-content"),l.Kb(1,"ion-card"),l.Kb(2,"ion-card-content"),l.Kb(3,"ion-item"),l.Kb(4,"ion-label",0),l.ic(5,"Email"),l.Jb(),l.Kb(6,"ion-input",1),l.Sb("ngModelChange",(function(n){return e.email=n})),l.Jb(),l.Jb(),l.Ib(7,"br"),l.Kb(8,"ion-item"),l.Kb(9,"ion-label",0),l.ic(10,"Password"),l.Jb(),l.Kb(11,"ion-input",2),l.Sb("ngModelChange",(function(n){return e.password=n})),l.Jb(),l.Jb(),l.Ib(12,"br"),l.Kb(13,"div",3),l.Kb(14,"a",4),l.ic(15,"Create an Account"),l.Jb(),l.Jb(),l.Ib(16,"br"),l.Kb(17,"ion-button",5),l.Sb("click",(function(){return e.login()})),l.hc(18,d,2,0,"span",6),l.hc(19,u,2,0,"span",6),l.Jb(),l.Jb(),l.Jb(),l.Jb()),2&n&&(l.xb(6),l.Zb("ngModel",e.email),l.xb(5),l.Zb("ngModel",e.password),l.xb(3),l.Zb("routerLink",l.bc(5,g)),l.xb(4),l.Zb("ngIf",!e.loading),l.xb(1),l.Zb("ngIf",e.loading))},directives:[r.l,r.g,r.h,r.s,r.w,r.r,r.W,i.e,i.f,a.i,r.U,r.e,t.j,r.K],styles:["ion-card[_ngcontent-%COMP%]{top:30%}ion-item[_ngcontent-%COMP%]{--highlight-color-focused:#fff;--color-focused:#fff}ion-item.item-has-focus[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]{color:#fff!important}"]}),n})()}];let h=(()=>{class n{}return n.\u0275mod=l.Fb({type:n}),n.\u0275inj=l.Eb({factory:function(e){return new(e||n)},imports:[[a.j.forChild(f)],a.j]}),n})(),p=(()=>{class n{}return n.\u0275mod=l.Fb({type:n}),n.\u0275inj=l.Eb({factory:function(e){return new(e||n)},imports:[[t.b,i.a,r.P,h]]}),n})()}}]);