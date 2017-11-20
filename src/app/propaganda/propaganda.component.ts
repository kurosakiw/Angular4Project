import { Component, OnInit ,Input,AfterViewInit} from '@angular/core';
import { NgStyle } from '@angular/common';
import {RouterModule, Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { port,name,sessionKey } from '../public/datas/portName';
import { NzMessageService ,NzNotificationService} from 'ng-zorro-antd';
@Component({
  selector: 'propaganda',
  templateUrl: './propaganda.component.html',
  styleUrls: ['./propaganda.component.css']
})
export class propagandaComponent {
	picurl = port.PIC_URL;
  userId:string = localStorage.getItem(sessionKey.USERID);
  changeKey:boolean = true;
  newadd:string = "";
  _isSpinning:boolean = true;
  selected:string;
  keyword:string;
  _value:string = "";
  id:Array<any> = [];
  result:Array<any> = [];
  arrs:Array<any> = [];
  arrd:Array<any> = [];
  allist:any = {};
  type:string = '0';
  totalResult:number = 0;
  showCount:number = 0;
  /*提示消息*/
  alertfn = (type, text) => {
    this._message.create(type, text);
  };

  constructor(
    private httpserver: HttpClient,
    private _message: NzMessageService,
    private router:Router
  ) {

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

  nums:number = 0;
  keys:number = 0;
  moveLeft(){
    if(this.cur > 0){
      this.cur--;
    }else{
      this.cur = this.result.length-1;
    }
    if(this.keys > 0){
      this.keys --;
      this.nums = -147 * this.keys;
    }else if(this.cur == this.result.length-1){
      this.keys = this.result.length - 7;
      this.nums = -147 * this.keys;
    }
  }
  moveRight(){
    if(this.cur<this.result.length-1){
      this.cur++;
    }else{
      this.cur = 0
    }
    if(this.keys < this.result.length - 7){
      this.keys ++;
      this.nums = -147 * this.keys;
    }else if(this.cur==0){
      this.keys = 0;
      this.nums = 0;
    }



  }



  //getlist
  getData(key){
    this.type = key;
    let url = port.BASE_URL+name.exhibition_list;
    let data = {
      type:this.type,
      userId:this.userId,
      currentPage:1
    }
    this.httpserver.post(url,data).subscribe(res => {
      let data = (res as any).detail;
      this.result = [];
      this.result = data.exhibitions;
      this.allist = data.exhibitions[0];
      this.totalResult = data.page.totalResult;
      this.showCount = data.page.showCount;
      this.cur = 0;
      this._isSpinning = false;
    });
  }


  content:string = '';
  searchtype:string = '0';
  atList:Array<any>=[];
  pageindex:number = 1;
  pagetotal:number = 0;
  pagesize:number = 0;

  getDatas(key){
    if(key=='null'){

    }else{
      this.searchtype = key;
    }
    let url = port.BASE_URL+name.course_list;
    let data = {
      type:this.searchtype,
      userId:this.userId,
      currentPage:1,
      search_content:this.content
    }
    this.httpserver.post(url,data).subscribe(res => {
      let data = (res as any).detail;
      this.atList = data.courses;
      this.pageindex = data.page.currentPage;
      this.pagetotal = data.page.totalResult;
      this.pagesize = data.page.showCount;
      //console.log(JSON.stringify(data))
    });
  }


  cur:number = 0;
  fn(key,i){
    this.cur = i;
    this.allist = key;
  }

  ngOnInit() {
    if(this.userId==null){
      this.userId = "";
      this.changeKey = true;
    }else{
      this.changeKey = false;
    }
    this.getData("0")


  }




}
