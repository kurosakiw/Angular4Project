import { Component, OnInit ,Input,AfterViewInit} from '@angular/core';
import { NgStyle } from '@angular/common';
import {RouterModule, Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { port,name,sessionKey } from '../public/datas/portName';
import { NzMessageService ,NzNotificationService} from 'ng-zorro-antd';

@Component({
  selector: 'archives',
  templateUrl: './archives.component.html',
  styleUrls: ['./archives.component.css']
})

export class ArchivesComponent implements OnInit {
	picurl = port.PIC_URL;
  result:any;
  newadd:string = "";
  _isSpinning:boolean = true;
  selected:string;
  keyword:string;
  _value:string = "";
  id:Array<any> = [];
  records:Array<any> = [];
  firstId:Array<any> = [];
  results:Array<any> = [];
  rec:Object = {};
  rec1:Object = {};
  rec2:Object = {};
  rec3:Object = {};
  rec4:Object = {};
  rec5:Object = {};
  currentPage:number = 1;

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
/**/
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


  jump(){
    this.router.navigate(['/archives-list',{id:'',item:'7',ifs:'0',keyword:this._value}])
  }
  ngOnInit() {
    if(this.userId==null){
      this.userId = "";
      this.changeKey = true;
    }else{
      this.changeKey = false;
    }

    let url = port.BASE_URL+name.archive_list;
    let data = { userId :this.userId};
    this.httpserver.post(url,data).subscribe(res => {
      let data = (res as any);
      if(data.code == 200){
        this.id = data.detail;
        this.firstId = data.detail[0].id;
        this.getdatas()
      }else {
        this.alertfn("error",data.desc)
      }
    });
    this.getList();




  }

  tap(item){
    if(!item){

    }else{
      this.firstId = item
    }
    this.getdatas()
  }

  getdatas(){
    let url = port.BASE_URL+name.record_list;
    if(this.userId==null){
      this.userId = ""
    };
    let data = { userId:1,newadd:this.newadd,selected:0,keyword:this.keyword,currentPage:1,archive:this.firstId};
    this.httpserver.post(url,data).subscribe(res => {
      let data = (res as any);
      this.rec = data.detail.records[0];
      this.rec1 = data.detail.records[1];
      this.rec2 = data.detail.records[2];
      this.rec3 = data.detail.records[3];
      this.rec4 = data.detail.records[4];
      this.rec5 = data.detail.records[5];
    });
    this._isSpinning = false;
  }

  getList(){
    let url = port.BASE_URL+name.record_allList;
    if(this.userId==null){
      this.userId = ""
    };
    let data = { userId:1,keyword:this.keyword,currentPage:1};
    this.httpserver.post(url,data).subscribe(res => {
      let data = (res as any);
      if(data.code == 200){
        for(var i = 0;i < data.detail.length;i+=4){
          this.results.push(data.detail.slice(i,i+4));
        }
        this._isSpinning = false;
      }
    });
  }






}
