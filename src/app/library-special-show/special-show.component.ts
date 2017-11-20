import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { NzMessageService } from 'ng-zorro-antd';
import { port,name,sessionKey } from '../public/datas/portName';
import { NgStyle } from '@angular/common';


@Component({
  selector: 'special-show',
  templateUrl: './special-show.component.html',
  styleUrls: ['./special-show.component.css']
})

export class LibraryspecialshowComponent implements OnInit {
  result:Array<any> = [];
  userId:string = localStorage.getItem(sessionKey.USERID);
  id:string = "";
  prev:Object = {};
  next:Object ={};

  alertfn = (type, text) => {
    this._message.create(type, text);
  };
  getDatas(key){
    if(key&&key!="null"){
      this.id = key;
    }else{

    }
    let url = port.BASE_URL+name.special_get;
    let datas = {
      userId:this.userId,
      id:this.id,
    };
    this.httpserver.post(url,datas).subscribe(res => {
      // this.createMessage("success","mmp");
      let data = (res as any).detail;
      this.result = data;
      this.getaround();
    });
  }
  getaround(){
    let url = port.BASE_URL+name.special_around;
    let datas = {
      userId:this.userId,
      id:this.id,
    };
    this.httpserver.post(url,datas).subscribe(res => {
      // this.createMessage("success","mmp");
      let data = (res as any).detail;
      this.prev = data.previous;
      this.next = data.next;
      if(this.prev==null){
        this.prev = {}
      }
      if(this.next==null){
        this.next = {}
      }
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
      this.id=data['id'];
    });
    this.getDatas("null");
  }


}
