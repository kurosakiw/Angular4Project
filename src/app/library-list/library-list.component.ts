import { Component,OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { NzMessageService } from 'ng-zorro-antd';
import { port,name,sessionKey } from '../public/datas/portName';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'library-list',
  templateUrl: './library-list.component.html',
  styleUrls: ['./library-list.component.css']
})
export class LibrarylistComponent {
  ifadd:string = '0';
  _isSpinning:boolean = true;
  pageindex:number = 1;
  pagetotal:number = 0;
  pagesize:number = 0;
  userId:string = localStorage.getItem(sessionKey.USERID);
  keyword:string = "";
  result:Array<any>=[];
  key:string='0';



  gais(item){
    this.key = item;
  }
  notify() {
    console.log('notify');
  }
  alertfn = (type, text) => {
    this._message.create(type, text);
  };

  getSelected(){
    let url = port.BASE_URL+name.book_list,datas;
    if(this.ifadd == "0"){
      datas = {
        userId:this.userId,
        whole:this.keyword,
        newadd:'',
        selected:'0',
        currentPage:this.pageindex

      };
    }else if(this.ifadd == "1"){
      datas = {
        userId:this.userId,
        whole:this.keyword,
        newadd:'0',
        selected:'',
        currentPage:this.pageindex
      };
    }else{
      datas = {
        userId:this.userId,
        whole:this.keyword,
        newadd:'0',
        selected:'0',
        currentPage:this.pageindex
      };
    }

    this.httpserver.post(url,datas).subscribe(res => {
      // this.createMessage("success","mmp");
      let data = (res as any);
      this.result = data.detail.books;
      this.pageindex = data.detail.page.currentPage;
      this.pagetotal = data.detail.page.totalResult;
      this.pagesize = data.detail.page.showCount;
      this._isSpinning = false;
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
      this.ifadd=data['id'];
      this.keyword = data['key'];
    });
    //this.getSelected();
  }
}
