import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { port,name,sessionKey } from '../datas/portName';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'layout-side',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],

})
export class LayoutSideComponent{
  picurl = port.PIC_URL;
  result:any;
  changeKey:boolean = true;
  userId:string = localStorage.getItem(sessionKey.USERID);
  //全局消息提示
  createMessage = (type, text) => {
    this._message.create(type, text);
  };


  constructor(
    private httpserver: HttpClient,
    private _message: NzMessageService
  ) {

  }

  ngOnInit(): void {
    let url = port.BASE_URL+name.web_visit;
    if(this.userId==null){
      this.userId = "";
      this.changeKey = true;
    }else{
      this.changeKey = false;
    }
    let datas = { userId:this.userId};
    this.httpserver.post(url,datas).subscribe(res => {
     // this.createMessage("success","mmp");
      let data = (res as any);
      this.result = data.detail;
    });


  }

  //模态框
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

}
