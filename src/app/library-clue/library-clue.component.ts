import { Component,OnInit } from '@angular/core';
import { cityList }  from '../public/datas/citys.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { NzMessageService } from 'ng-zorro-antd';
import { port,name,sessionKey } from '../public/datas/portName';
import { NgStyle } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import * as moment from "moment";

@Component({
  selector: 'library-clue',
  templateUrl: './library-clue.component.html',
  styleUrls: ['./library-clue.component.css']
})


export class LibraryclueComponent implements OnInit {
  _options:Array<any> = [];
  userId:string = localStorage.getItem(sessionKey.USERID);
  _isSpinning:boolean = true;
  public description = "";
  id:string = '';
  fileList:Array<any> = [];
  names:string = "文件上传";
  seeurl:string = '';
  width:number = 900;

  //**upload--
  randomWord(randomFlag, min, max){
    var str = "",
      range = min,
      arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    // 随机产生
    if(randomFlag){
      range = Math.round(Math.random() * (max-min)) + min;
    }
    for(var i=0; i<range; i++){
      var pos = Math.round(Math.random() * (arr.length-1));
      str += arr[pos];
    }
    return str;
  }

  isVisible = false;
  radomstr:string = '';
  src:any;
  showModal = (str) => {
    if(str=="文件上传"){
      this.names = str;
      this.width = 900;
    }else{
      this.width = 500;
    }

    this.isVisible = true;
  }

  handleCancel = (e) => {
    if(this.names=="查看图片"){

    }else{
      this.getfiles();
    }
    this.isVisible = false;
  }
  toDos(key,url,id,size,limit){
    if(key=="0"){
      this.names = "查看图片";
      this.seeurl = url;
      this.showModal("0");
    }else if(key=="1"){
      if(parseInt(size)>parseInt(limit)){
        this.alertfn("warning","文件过大，暂不支持在线预览...")
        return;
      }
      this.alertfn("success","正在打开...")
      let url = port.BASE_URL+name.file_preview;
      let data = {
        userId:this.id,
        id:id
      }
      this.httpserver.post(url,data).subscribe(res=> {
        let data = (res as any).detail;
        window.open(data.url)
      })
    }else{
      this.alertfn("warning","该文件无法预览")
    }
  }

  getfiles(){
    let url = port.BASE_URL+name.file_list;
    let data = {
      userId:this.userId,
      rid:this.id,
      type:1,
      uploadkey:this.radomstr
    }
    this.httpserver.post(url,data).subscribe(res=> {
      let data = (res as any);
      this.fileList = data.detail;

    })
  }
  remove(ids){
    let url = port.BASE_URL+name.file_delete;
    let data = {
      userId:this.userId,
      rid:this.id,
      type:1,
      aid:ids
    }
    this.httpserver.post(url,data).subscribe(res=> {
      let data = (res as any);
      if(data.code==200){
        this.alertfn("success","删除成功")
        this.getfiles()
      }
    })
  }
  //**--upload




  onContentChanged({ html, text }) {
   // console.log(html, text);
  }
  alertfn = (type, text) => {
    this._message.create(type, text);
  };
  innertext:string = '';

  //form//
  validateForm: FormGroup;
  submitForm = ($event, value) => {
    $event.preventDefault();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[ key ].markAsDirty();
    }
    //console.log(value);
  };

  resetForm($event: MouseEvent) {
    $event.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[ key ].markAsPristine();
    }
  }

  getFormControl(name) {
    return this.validateForm.controls[ name ] ;
  }
  //**form check
  emailValidator = (control: FormControl): { [s: string]: boolean } => {
    const EMAIL_REGEXP = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    if (!control.value) {
      return { required: true }
    } else if (!EMAIL_REGEXP.test(control.value)) {
      return { error: true, email: true };
    }
  };

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    const mobieReg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    if (!control.value) {
      return { required: true };
    } else if (!mobieReg.test(control.value)) {
      return { confirm: true, error: true };
    }
  };

  isbnValidator = (control: FormControl): { [s: string]: boolean } => {
    const isbn = /^[0-9\-]+$/;
    if (!control.value) {
      return { required: true };
    } else if (!isbn.test(control.value)) {
      return { confirm: true, error: true };
    }
  };

  constructor(
    private sanitizer: DomSanitizer,
    private fb: FormBuilder,
    private route:ActivatedRoute,
    public httpserver:HttpClient,
    public _message:NzMessageService
  ) {
    this.validateForm = this.fb.group({
      name : [ '', [ Validators.required ] ],
      moblie: [ '', [ Validators.required ,this.confirmationValidator] ],
      email:[ '', [ this.emailValidator ] ],
      address: [ '', [ Validators.required ] ],
      book: [ '', [ Validators.required ] ],
      author: [ '', [ Validators.required ] ],
      publishcity: [ '', [ Validators.required ] ],
      publish: [ '', [ Validators.required ] ],
      publishtime:[ '', [ Validators.required ] ],
      publishno:[ '', [ Validators.required ] ],
      isbn:[ '', [ Validators.required ,this.isbnValidator] ],
      type:['',[ Validators.required ] ],
      description:[ '', [  ] ],
    });
  }

  upData(){
    let url = port.BASE_URL+name.lcollect_save,datas;
    datas = this.validateForm.value;
    let astr,bstr;
    for(var i=0;i<cityList.keys.length;i++){
      if(cityList.keys[i].value==datas.publishcity[0]){
        astr = cityList.keys[i].label;
        for(var j=0;j<cityList.keys[i].children.length;j++){
          let data = (cityList.keys[i].children[j] as any);
          if(data.value==datas.publishcity[1]){
            bstr = data.label;
          }
        }
      }
    }
    let str = astr+"/"+bstr;
    if(datas.publishcity.indexOf("/") >= 0 ){
      datas.publishcity = datas.publishcity;
    }else{
      datas.publishcity = str;
    }
    datas.publishtime = moment(datas.publishtime).format("YYYY-MM-DD");
    datas.userId = this.userId;
    datas.id = this.id;
    let filea = this.fileList.map((item)=>{
      return item.id;
    }),files;
    files = filea.join(",");
    datas.elecFile = files;
    //console.log(JSON.stringify(datas));

    this.httpserver.post(url,datas).subscribe(res => {
      let data = (res as any);
      if(data.code==200){
        this.alertfn("success","提交成功");
        history.go(-1);
      }
    });
  }

  ngOnInit(){
    let key;
    this.route.params.subscribe(data => {
      key = data['id'];
    })
    if(!key||key=="null"){

    }else{
      this.id = key;
      this.getfiles();
      let url = port.BASE_URL+name.lcollect_get,
          data = {
            userId:this.userId,
            id:key
          }
      this.httpserver.post(url,data).subscribe(res => {
        let data = (res as any).detail;
        //console.log(JSON.stringify(data));
        this.innertext = data.description;
        this.validateForm = this.fb.group({
          name : [ data.name, [ Validators.required ] ],
          moblie: [ data.moblie, [ Validators.required ,this.confirmationValidator] ],
          email:[ data.email, [ this.emailValidator ] ],
          address: [ data.address, [ Validators.required ] ],
          book: [ data.book, [ Validators.required ] ],
          author: [ data.author, [ Validators.required ] ],
          publishcity: [ data.publishcity, [ Validators.required ] ],
          publish: [data.publish, [ Validators.required ] ],
          publishtime:[ data.publishtime, [ Validators.required ] ],
          publishno:[ data.publishno, [ Validators.required ] ],
          isbn:[ data.isbn, [ Validators.required ,this.isbnValidator] ],
          type:[data.type,[ Validators.required ] ],
          description:['', [  ] ]
        });
      })
      }
     cityList.keys.map((item)=>{
       item.isLeaf = false;
    });
    this._options = cityList.keys;
    this.radomstr = this.randomWord(false,43,0);
    this.src = this.sanitizer.bypassSecurityTrustResourceUrl("http://192.168.11.25:1655?userId="+this.id+"&source=0&rid="+this.id+"&type=1&uploadkey="+ this.radomstr);
    this._isSpinning = false;
  }

}
