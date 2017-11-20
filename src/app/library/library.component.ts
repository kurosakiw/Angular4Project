import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { HttpClient } from "@angular/common/http";
import { NzMessageService } from 'ng-zorro-antd';
import { port,name,sessionKey } from '../public/datas/portName';
import { Router } from '@angular/router';

@Component({
  selector: 'library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent {
	picurl = port.PIC_URL;
  changeKey:boolean = true;
  result:Array<any> = [];
  toadd:Array<any> = [];
  topic:Array<any>=[];
  userId:string = localStorage.getItem(sessionKey.USERID);
  _isSpinning:boolean = true;
  keyword:string = '';
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
  alertfn = (type, text) => {
    this._message.create(type, text);
  };
  jumpList(){
    this.router.navigate(['/library-list',{id:'',key:this.keyword}])
  }
  getSelected(){
    let url = port.BASE_URL+name.book_allList;
    let datas = {
      userId:this.userId,
      keyword:'',
      selected:"0"
    };
    this.httpserver.post(url,datas).subscribe(res => {
      let data = (res as any);
      for(var i = 0;i<data.detail.length;i+=4){
        this.result.push(data.detail.slice(i,i+4));
      }
      this._isSpinning = false;
    });
  }
  getAdd(){
    let url = port.BASE_URL+name.book_allList;
    let datas = {
      userId:this.userId,
      keyword:'',
      newadd:"0"
    };
    this.httpserver.post(url,datas).subscribe(res => {
      let data = (res as any).detail.slice(0,4);
      this.toadd = data;
      this._isSpinning = false;
    });
  }
  getList(){
    let url = port.BASE_URL+name.special_list;
    let datas = {
      userId:this.userId,
      currentPage:1,
    };
    this.httpserver.post(url,datas).subscribe(res => {
      let data = (res as any).detail.specials.slice(0,5);
      this.topic = data;
      this._isSpinning = false;
    });
  }



  constructor(
    public httpserver:HttpClient,
    public _message:NzMessageService,
    public router:Router
  ) {
  }

  ifactive(item){
    return item == 0;
  }


  ngOnInit() {
    if(this.userId==null){
      this.userId = "";
      this.changeKey = true;
    }else{
      this.changeKey = false;
    }
    this.getSelected();
    this.getAdd();
    this.getList();
  }


}
