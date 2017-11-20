import { Component, OnInit,EventEmitter,Input, Output } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { NzMessageService } from 'ng-zorro-antd';
import {port,name,sessionKey} from '../datas/portName';

import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
@Component({
  selector: 'app-login-compent',
  templateUrl: './login-compent.component.html',
  styleUrls: ['./login-compent.component.css']
})
export class LoginCompentComponent implements OnInit {
  @Input() issucess;
  @Output() succeed: EventEmitter<string> = new EventEmitter();
  @Output() landOver: EventEmitter<string> = new EventEmitter();
  @Output() fogotpwd: EventEmitter<string> = new EventEmitter();

  validateForm: FormGroup;
  password = '';
  username = ''
  _submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
    }
  }
  alertfn = (type, text) => {
    this._message.create(type, text);
  };

  constructor(
    private fb: FormBuilder,
    public httpServer:HttpClient,
    public _message:NzMessageService
  ) {

  }
  toRegister(){
    this.succeed.emit(this.issucess);
  }
  fogot(){
    this.fogotpwd.emit(this.issucess);
  }
  signIn(){
    let url= port.BASE_URL+name.user_login,keys;
    if(this.validateForm.value.userName.indexOf("@")>0){
      keys = {
        type:1,
        email:this.validateForm.value.userName,
        password:this.validateForm.value.password,
        userId:""
      }
    }else{
      keys = {
        type:0,
        mobile:this.validateForm.value.userName,
        password:this.validateForm.value.password,
        userId:""
      }
    }
    this.httpServer.post(url, keys).subscribe(res=> {
      let data = (res as any);
      if(data.code==201){
        this.alertfn("error",data.desc);
      }else{
        this.issucess = '0';
        this.alertfn("success","登陆成功...");
        if(this.validateForm.value.userName.indexOf("@")>0){
          localStorage.setItem(sessionKey.EMAIL,this.validateForm.value.userName);
        }else{
          localStorage.setItem(sessionKey.MOBILE,this.validateForm.value.userName);
        }
        localStorage.setItem(sessionKey.PASSWORD,this.validateForm.value.password);
        localStorage.setItem(sessionKey.USERID,data.detail.id);
        if(this.validateForm.value.remember==true){
          localStorage.setItem(sessionKey.IFCLEAR,'0')
        }else{
          localStorage.setItem(sessionKey.IFCLEAR,'1')
        }
        setTimeout(()=>{
          this.landOver.emit(this.issucess);
        },1000)
      }
    });

  }




  ngOnInit() {
    this.validateForm = this.fb.group({
      userName: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ],
      remember: [ true ],
    });
    let mobile = localStorage.getItem(sessionKey.MOBILE),username = '';
    let email = localStorage.getItem(sessionKey.EMAIL);
    let pwd = localStorage.getItem(sessionKey.PASSWORD);

    if(mobile){
      username = mobile;
    }
    if(email){
      username = email;
    }
    this.password = pwd;
    this.username = username;

  }

}
