import { Component,OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { NzMessageService } from 'ng-zorro-antd';
import { port,name,sessionKey } from '../public/datas/portName';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'special-list',
  templateUrl: './special-list.component.html',
  styleUrls: ['./special-list.component.css']
})

export class LibraryspecialComponent implements OnInit {
  result:Array<any> = [];
  userId:string = localStorage.getItem(sessionKey.USERID);
  _isSpinning:boolean = true;
  pageindex:number = 1;
  pagetotal:number = 0;
  pagesize:number = 0;

  alertfn = (type, text) => {
    this._message.create(type, text);
  };
  getDatas(){
    let url = port.BASE_URL+name.special_list;
    let datas = {
      userId:this.userId,
      currentPage:this.pageindex,
    };
    this.httpserver.post(url,datas).subscribe(res => {
      // this.createMessage("success","mmp");
      let data = (res as any).detail;
      this.result = data.specials;
      this.pageindex = data.page.currentPage;
      this.pagetotal = data.page.totalResult;
      this.pagesize = data.page.showCount;
      this._isSpinning = false;
      //console.log(JSON.stringify(data))
    });
  }
  constructor(
    private route:ActivatedRoute,
    public httpserver:HttpClient,
    public _message:NzMessageService
  ) {

  }

  ngOnInit() {
    this.route.params.subscribe(data => {
      //this.ifadd=data['id'];
      //this.keyword = data['key'];
    });
  }
}
