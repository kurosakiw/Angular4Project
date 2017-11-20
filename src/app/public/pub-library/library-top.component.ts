import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { port,name,sessionKey } from '../datas/portName';

@Component({
  selector: 'library-top',
  template: `
    <nz-modal
    [nzWidth] = "'500px'"
    [nzVisible]="isVisible"
    [nzTitle]="modalTitle"
    [nzContent]="modalContent"
    [nzFooter]="modalFooter"
    (nzOnCancel)="handleCancel()">
    <ng-template #modalTitle>
      {{title}}
    </ng-template>
    <ng-template #modalContent>
      <app-regist-compent *ngIf = "key=='1'" [(issucess)]="key" (succeed)="showModal('0','登陆')" ></app-regist-compent>
      <app-login-compent *ngIf = "key=='0'" [(issucess)]="key" (succeed)="showModal('1','注册')" (landOver)="handleCancel('success')" (fogotpwd)="showModal('2','找回密码')"></app-login-compent>
      <app-fogot-pwd-component *ngIf = "key=='2'"  [(issucess)]="key" (succeed)="showModal('0','登陆')" ></app-fogot-pwd-component>


    </ng-template>
  </nz-modal>
    <div class="showTop">
			<div class="mainBox">
				<a routerLink="/public"  ><img [src]="picurl+'logo5.png'"></a>
				<div class="topBtn">
					 <a routerLink="/timeLine" class="timeLine">时间线</a>
           <a routerLink="/worship" class="worship">网络祭拜</a>
           <a  *ngIf="changeKey==false" routerLink="/admin" class="admin">个人中心</a>
           <a  *ngIf="changeKey==true" class="go" (click)="showModal('0','登陆')">登录</a>
           <a  *ngIf="changeKey==true" class="reg" (click)="showModal('1','注册')">注册</a>
				</div>
			</div>
		</div>
		<div class="libraryBan showBanner"></div>
  `,
  styles: [`
.mainBox .topBtn {
  position: absolute;
  right: 0;
  top: 77px;
}

.mainBox .topBtn a {
  height: 28px;
  line-height: 28px;
  font-size: 14px;
  color: #303030;
  background: url("../../assets/images/3.png") no-repeat;
  width: 111px;
  text-indent: 36px;
  display: inline-block;
  border: 1px solid #898989;
  border-radius: 15px;
  -webkit-border-radius: 15px;
  -moz-border-radius: 15px;
  -ms-border-radius: 15px;
  -o-border-radius: 15px;
  background-position: 19px 4px;
  margin-left: 10px;
}

.mainBox .topBtn a.timeLine {
  text-indent: 40px;
}

.mainBox .topBtn a.worship {
  background-position: 19px -26px;
}

.mainBox .topBtn a.admin {
  background-position: 14px -85px;
  border: 0;
}
.mainBox .topBtn a.go{
  border: none;
  background: url("../../assets/images/2.png") no-repeat left center;
  width: 60px;
  text-indent: 22px;
  display: inline-block;
}
.mainBox .topBtn a.reg {
  border: none;
  background: url("../../assets/images/2.png") no-repeat left center;
  background-position: -60px 4px;
  text-indent:28px;
  width: 62px;
  margin-left: 0;
}
.showTop {
  background: url("../../assets/images/15.jpg") no-repeat center center;
  width: 100%;
  height: 88px;
}

.showTop .mainBox {
  position: relative;
}

.showTop .mainBox .topBtn {
  top: 30px
}

.showBanner {
  width: 100%;
  background: url("../../assets/images/35.jpg") no-repeat center center;
  height: 207px
}
  `],

})
export class Library_topComponent {
  picurl = port.PIC_URL;

  changeKey:boolean = true;
  userId:string = localStorage.getItem(sessionKey.USERID);

  key:string = '';
  title:string = '';
  isVisible = false;
  showModal = (key,str) => {
    this.key = key;
    this.title = str;
    this.isVisible = true;
  }
  handleCancel = (str) => {
    if(str=="success"){
      this.changeKey = false;
    }
    this.isVisible = false;
  }

  ngOnInit() {
    if(this.userId==null){
      this.userId = "";
      this.changeKey = true;
    }else{
      this.changeKey = false;
    }
  }

}
