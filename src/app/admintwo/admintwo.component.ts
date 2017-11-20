import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { NzMessageService,NzModalService} from 'ng-zorro-antd';
import { port,name,sessionKey } from '../public/datas/portName';
import { NgStyle } from '@angular/common';
@Component({
  selector: 'admintwo',
  templateUrl: './admintwo.component.html',
  styleUrls: ['./admintwo.component.css']
})

export class AdmintwoComponent implements OnInit {
  _isSpinning:boolean = true;
  _isLoading:boolean = true;
  _isdisable:boolean = true;
  _string:string = "password";
  isLoadingOne:boolean = false;
  _sdk:boolean = false;
  dataList:any;
  new:string = "";
  surenew:string = "";
  text:string = "添加邮箱";
  bindname:string = '';
  type:string = '';

  style:string='default';
  userId = localStorage.getItem(sessionKey.USERID);
  num:any = 60;
  time:string = "获取验证码";
  /*定时器*/
  backTime = setInterval(()=>{
    if(this.num > 0){
      this.num --;
      this.time = " "+this.num+"s";
      sessionStorage.setItem("times",this.num.toString());
    }else{
      this.num = 60;
      this.time = "获取验证码";
      clearInterval(this.backTime);
      this.isLoadingOne = false;
    }
  },1000)


  comfirmfn(title,content,fn){
    this._modal.confirm({
      title  : title,
      content: '<b>'+content+'</b>',
      onOk() {
        fn()
      },
      onCancel() {
      }
    });
  }
  alertfn = (type, text) => {
    this._message.create(type, text);
  };
  constructor(
    private httpServer:HttpClient,
    private route:ActivatedRoute,
    public _message:NzMessageService,
    private _modal:NzModalService
  ){

  }

  getDatas(){
    let url = port.BASE_URL+name.user_get;
    let data = { userId:this.userId,id:this.userId };
    this.httpServer.post(url,data).subscribe(res=> {
      let data = (res as any).detail;
      console.log(data)
      this.dataList = data;
      let mobile = data.mobile,email = data.email;
      if(mobile && email){
        this.text = '';
      }else if(mobile){
        this.text = '绑定邮箱';
        this.bindname = '邮箱';
        this.type = "1";
      }else{
        this.text = '绑定手机号';
        this.bindname = '手机号';
        this.type = "0";
      }


      this._isSpinning = false;
      setTimeout(()=>{
        this._isLoading =false
      },100)
    })
  }

  loadOne(){
    let url = port.BASE_URL+name.user_binding_code,data;
    if(this.type=="0"){
      data = {
        userId:this.userId,
        type:this.type,
        mobile:this.new
        };
    }else{
      data = {
        userId:this.userId,
        type:this.type,
        email:this.new
      };
    }
    this.httpServer.post(url,data).subscribe(res=> {
      let data = (res as any);
      if(data.code==201){
        this.alertfn("error",data.desc);
      }else{
        this.isLoadingOne = true;
        this.time = " "+this.num+"s";
        var t = setInterval(()=>{
          if(this.num > 0){
            this.num --;
            this.time = " "+this.num+"s";
            sessionStorage.setItem("times",this.num.toString());
          }else{
            this.num = 60;
            this.time = "获取验证码";
            clearInterval(t);
            this.isLoadingOne = false;
          }
        },1000)
      }



    })

  }



  changeType(){
    if(this._sdk){
      this._string = "text";
    }else{
      this._string = "password"
    }
  }


  toChange(){
    if(this._isdisable == true){
      this.new = '';
      this.surenew = '';
      this._isdisable = false;
      this.text="提交";
      this.style = "danger";
    }else{
      if(!this.new||!this.surenew){
        this.alertfn("error","请填写"+this.bindname+"或验证码...");
        return;
      }
      let  CHECK;
      const EMAIL_REGEXP = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
      const PHONE_REGEXP = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$/i;
      if(this.type=="0"){
        CHECK = PHONE_REGEXP
      }else {
        CHECK = EMAIL_REGEXP
      }

      if (!CHECK.test(this.new)) {
        this.alertfn("error","请填写正确的"+this.bindname+"...");
        return;
      }


      let url = port.BASE_URL+name.user_binding,data;
      if(this.type=="0"){
        data = {
          userId:this.userId,
          type:this.type,
          mobile:this.new,
          code:this.surenew
        };
      }else{
        data = {
          userId:this.userId,
          type:this.type,
          email:this.new,
          code:this.surenew
        };
      }

      this.httpServer.post(url,data).subscribe(res=> {
        let data = (res as any);
        if(data.code=='200'){
          this.alertfn("success","绑定"+this.bindname+"成功...");
          this._isdisable = true;
          this.style = "default";
          this.getDatas();
        }else {
          this.alertfn("error",data.desc);
        }
      })

    }





  }

  ngOnInit(){
    this.getDatas();
    let ifloading = parseInt(sessionStorage.getItem("times"));
    if(ifloading==0||!ifloading){
      this.num = 60;
      clearInterval(this.backTime)
    }else{
      this.num = ifloading;
      this.isLoadingOne = true;
      this.backTime
    }
  }
}




