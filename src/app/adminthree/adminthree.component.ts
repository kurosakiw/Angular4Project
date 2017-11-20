import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { NzMessageService,NzModalService } from 'ng-zorro-antd';
import { port,name,sessionKey } from '../public/datas/portName';
import { NgStyle } from '@angular/common';
@Component({
  selector: 'adminthree',
  templateUrl: './adminthree.component.html',
  styleUrls: ['./adminthree.component.css']
})

export class AdminthreeComponent implements OnInit {
  _isSpinning:boolean = true;
  _isLoading:boolean = true;
  _isdisable:boolean = true;
  _string:string = "password";
  _sdk:boolean = false;
  dataList:any;
  new:string = "";
  surenew:string = "";
  text:string="修改密码";
  style:string='default';
  userId = localStorage.getItem(sessionKey.USERID);


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
      this._isSpinning = false;
      setTimeout(()=>{
        this._isLoading =false
      },100)
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
      if(this.new!=this.surenew || !this.new || !this.surenew){
        this.alertfn("error","密码为空或两次密码不一致...");
        return;
      }
      let url = port.BASE_URL+name.user_save;
      let data = { userId:this.userId,id:this.userId,password:this.surenew };
      this.httpServer.post(url,data).subscribe(res=> {
        let data = (res as any).code;
        if(data=='200'){
          this.alertfn("success","修改密码成功...");
          this._isdisable = true;
          this.text="修改密码";
          this.style = "default";
          this.getDatas();
        }
      })

    }





  }

  ngOnInit(){
    this.getDatas();
  }
}
