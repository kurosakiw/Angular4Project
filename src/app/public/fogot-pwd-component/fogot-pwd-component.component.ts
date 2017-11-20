import { Component,OnInit,EventEmitter,Input, Output } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { port,name,sessionKey } from '../datas/portName';

@Component({
  selector: 'app-fogot-pwd-component',
  templateUrl: './fogot-pwd-component.component.html',
  styleUrls: ['./fogot-pwd-component.component.css']
})
export class FogotPwdComponentComponent implements OnInit {
  @Input() issucess:string = "1";
  @Output() succeed: EventEmitter<string> = new EventEmitter();
  item = 0;

  tabs = [
    {
      name   : '手机找回'
    },
    {
      name   : '邮箱找回',
    }
  ];
  num:any = 60;
  isLoadingOne:boolean=false;
  time:string = "获取验证码";
  /*定时器*/
  backTime = setInterval(()=>{
    if(this.num > 0){
      this.num --;
      this.time = " "+this.num+"s";
      sessionStorage.setItem("time",this.num.toString());
    }else{
      this.num = 60;
      this.time = "获取验证码";
      clearInterval(this.backTime);
      this.isLoadingOne = false;
    }
  },1000)

  alertfn = (type, text) => {
    this._message.create(type, text);
  };
  constructor(
    public httpServer:HttpClient,
    private fb: FormBuilder,
    public _message:NzMessageService
  ) {
  }


  //*****//
  validateForm: FormGroup;

  _submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
    }
  }

  updateConfirmValidator() {
    /** wait for refresh value */
    setTimeout(_ => {
      this.validateForm.controls[ 'checkPassword' ].updateValueAndValidity();
    });
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls[ 'password' ].value) {
      return { confirm: true, error: true };
    }
  };

  getFormControl(name) {
    return this.validateForm.controls[ name ];
  }
  //*****//
  changeForm(){
    if(this.item==0){
      this.validateForm = this.fb.group({
        password         : [ null, [ Validators.required ] ],
        checkPassword    : [ null, [ Validators.required, this.confirmationValidator ] ],
        phoneNumber      : [ null, [ Validators.required ] ],
        captcha          : [ null, [ Validators.required ] ],
        agree            : [ false ]
      });
    }else{
      this.validateForm = this.fb.group({
        email            : [ null, [ Validators.email ] ],
        password         : [ null, [ Validators.required ] ],
        checkPassword    : [ null, [ Validators.required, this.confirmationValidator ] ],
        captcha          : [ null, [ Validators.required ] ],
        agree            : [ false ]
      });
    }
  }
  //**get code**//
  getCaptcha(e: MouseEvent) {
    let url= port.BASE_URL+name.user_retrieve_code,keys;
    if(!this.validateForm.value.phoneNumber&&this.item == 0){
      this.alertfn('error',"请输入手机号...")
      return;
    }
    if(!this.validateForm.value.email&&this.item == 1){
      this.alertfn('error',"请输入邮箱...")
      return;
    }
    if(this.item == 0){
      keys = {
        type:0,
        mobile:this.validateForm.value.phoneNumber,
        userId:""
      }
    }else{
      keys = {
        type:1,
        email:this.validateForm.value.email,
        userId:""
      }
    }
    this.httpServer.post(url, keys).subscribe(res=> {
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
            sessionStorage.setItem("time",this.num.toString());
          }else{
            this.num = 60;
            this.time = "获取验证码";
            clearInterval(t);
            this.isLoadingOne = false;
          }
        },1000)
      }
    });
    e.preventDefault();
  }

  toAdd(){
    let url= port.BASE_URL+name.user_retrieve,keys;
    if(this.item == 0){
      keys = {
        type:0,
        mobile:this.validateForm.value.phoneNumber,
        password:this.validateForm.value.password,
        code:this.validateForm.value.captcha,
        userId:""
      }
    }else{
      keys = {
        type:1,
        email:this.validateForm.value.email,
        password:this.validateForm.value.password,
        code:this.validateForm.value.captcha,
        userId:""
      }
    }
    this.httpServer.post(url, keys).subscribe(res=> {
      let data = (res as any);
      if(data.code==201){
        this.alertfn("error",data.desc);
      }else{
        this.issucess = '0';
        this.alertfn("success","修改成功,请登录...");
        if(this.item == 0){
          localStorage.setItem(sessionKey.MOBILE,this.validateForm.value.phoneNumber);
        }else{
          localStorage.setItem(sessionKey.EMAIL,this.validateForm.value.email);
        }
        localStorage.setItem(sessionKey.PASSWORD,this.validateForm.value.password);
        setTimeout(()=>{
          this.succeed.emit(this.issucess);
        },1000)


      }
    });
  }

  toLand(){
    this.succeed.emit(this.issucess);
  }
  ngOnInit() {
    this.validateForm = this.fb.group({
      password         : [ null, [ Validators.required ] ],
      checkPassword    : [ null, [ Validators.required, this.confirmationValidator ] ],
      phoneNumber      : [ null, [ Validators.required ] ],
      captcha          : [ null, [ Validators.required ] ],
      agree            : [ false ]
    });
    // alert(JSON.stringify(this.validateForm.value))
    let ifloading = parseInt(sessionStorage.getItem("time"));
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








