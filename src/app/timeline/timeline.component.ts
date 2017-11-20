import { Component,OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { port,name,sessionKey } from '../public/datas/portName';
import { NzMessageService,NzModalService } from 'ng-zorro-antd';
import * as moment from "moment";
@Component({
  selector: 'timeLine',
  templateUrl: './timeline.component.html',
  styleUrls: [ './timeline.component.css' ]
})

export class TimeComponent implements OnInit {
  ids:string = '0';
  pagesize:number;
  pageindex:number=1;
  nztotal:number;
  total:number;
  single:string = "";
  timeperiod:string = "2013";
  tabs:Array<any> = [];
  links:Array<any> = [];
  result:any;
  id:string = localStorage.getItem(sessionKey.USERID);
  nzTabPosition = 'top';
  selectedIndex = 0;
  _console(args) {
    this.timeperiod = args;
    this.pageindex = 1;
    this.getDatas();
  }
  _isSpinning:boolean = true;
  constructor(
    private httpServer:HttpClient,
    private route:ActivatedRoute,
    private router:Router
  ){

  }
  getDatas(){
    let urls = "";
    if(this.ids=="0"){
      urls = port.BASE_URL+name.book_timeline;
    }else if(this.ids=='1'){
      urls = port.BASE_URL+name.record_timeline;
    }else{
      urls = port.BASE_URL+name.exhibition_timeline;
    }

    let data = {
      userId:this.id,
      timeperiod:this.timeperiod,
      currentPage:this.pageindex
    }
    this.httpServer.post(urls,data).subscribe(res=> {
      console.log(JSON.stringify(res))
      let data = (res as any);
      if(data.code==200){
        if(this.ids=="0"){
          this.links = data.detail.books;
        }else if(this.ids=='1'){
          this.links = data.detail.records;
        }else{
          this.links = data.detail.exhibitions;
        }
        this.pagesize = data.detail.page.showCount;
        this.pageindex = data.detail.page.currentPage;
        this.nztotal = data.detail.page.totalResult;
      }
    });

  }

  changeState(str){
    this.ids = str;
    this.getDatas();
  }

  todetail(id){
    let str = "";
    if(this.ids=="0"){
      str = "library-detail"
    }else if(this.ids=='1'){
      str = "archives-detail"
    }else{
      str = "propaganda-detail"
    }
    this.router.navigate([str, id]);

  }

  botFn(){
    let url = port.BASE_URL+name.web_visit;
    let datas = { userId:this.id};
    this.httpServer.post(url,datas).subscribe(res=> {
      // this.createMessage("success","mmp");
      let data = (res as any);
      this.result = data.detail;
    });


  }


  ngOnInit(){
    let urls = port.BASE_URL+name.file_timeperiod;
    let data = { userId:this.id }
    this.httpServer.post(urls,data).subscribe(res=> {
      console.log(JSON.stringify(res))
      let data = (res as any);
      if(data.code==200){
        this.tabs = data.detail;
        this.timeperiod = data.detail[0];
        this._isSpinning = false;
        this.total = this.tabs.length;
      }
    });
    this.getDatas();
    this.botFn();




  }





}
