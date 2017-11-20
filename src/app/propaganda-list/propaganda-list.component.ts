import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { NzMessageService } from 'ng-zorro-antd';
import { port,name,sessionKey } from '../public/datas/portName';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'propaganda-list',
  templateUrl: './propaganda-list.component.html',
  styleUrls: ['./propaganda-list.component.css']
})
export class propagandalistComponent implements OnInit{
  userId:string = localStorage.getItem(sessionKey.USERID);

  type:string = '0';
  pageindex:number = 1;
  pagetotal:number = 0;
  pagesize:number = 0;
  search_content:string = "";
  result:Array<any> = [];

  getSelected(){
    let url = port.BASE_URL+name.exhibition_list;
    let data = {
      type:this.type,
      userId:this.userId,
      currentPage:this.pageindex,
      search_content:this.search_content
    }
    this.httpserver.post(url,data).subscribe(res => {
      let data = (res as any).detail;
      this.result = data.exhibitions;
      this.pageindex = data.page.currentPage;
      this.pagetotal = data.page.totalResult;
      this.pagesize = data.page.showCount;
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
      this.type=data['type'];
    });
  }

}
