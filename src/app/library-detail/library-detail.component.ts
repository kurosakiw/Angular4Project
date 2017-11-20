import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { NzMessageService } from 'ng-zorro-antd';
import { port,name,sessionKey } from '../public/datas/portName';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'library-detail',
  templateUrl: './library-detail.component.html',
  styleUrls: ['./library-detail.component.css']
})
export class LibrarydetailComponent implements OnInit{
  userId:string = localStorage.getItem(sessionKey.USERID);
  uid:string = '';
  result:Array<any> = [];
  files:Array<any> = [];
  told:Array<any> = [];
  keyword:string = "";
  isVisible = false;
  thisImg:string = "";

  showModal = (src) => {
    this.thisImg = src;
    this.isVisible = true;
  }

  handleCancel = (e) => {
    this.isVisible = false;
  }

  alertfn = (type, text) => {
    this._message.create(type, text);
  };

  getSelected(key){
    if(key&&key!='null'){
      this.uid = key;
    }

    let url = port.BASE_URL+name.book_get;
    let datas = {
      userId:this.userId,
      id:this.uid
    };
    this.httpserver.post(url,datas).subscribe(res => {
      // this.createMessage("success","mmp");
      let data = (res as any);
      this.result = data.detail;
      this.files = data.detail.files;
      this.keyword = data.detail.keyword;
    });
  }
  getDatas(){
    let url = port.BASE_URL+name.book_list;
    let datas = {
      userId:this.userId,
      keyword:this.keyword
    };
    this.httpserver.post(url,datas).subscribe(res => {
      // this.createMessage("success","mmp");
      let data = (res as any).detail.books;
      this.told = data.slice(0,4);
      //console.log(JSON.stringify(data))
    });
  }

  iftis(str){
    if(this.files.length==0){
      this.alertfn("warning","暂无可"+str+"条目...")
    }else{

    }
  }

  download(key){
    if(key){
      window.open( port.BASE_URL + "/file/download?ids="+key+"&userId=" + this.userId)
    }else{
      let idsArr = this.files.map((item)=>{
        return  item.id;
      });
      if(this.files.length==0){
        this.alertfn("warning","暂无可下载条目...")
        return;
      }
      let ids = JSON.stringify(idsArr);
      ids = ids.substring(1,ids.length-1);
      window.open( port.BASE_URL + "/file/download?ids="+ids+"&userId=" + this.userId)

    }
  }
  toSee(key,url,id,size,limit){
    if(key=="0"){
      this.showModal(url);
    }else if(key=='1'){
      if(parseInt(size)>parseInt(limit)){
        this.alertfn("error","文件过大，暂不支持在线预览...")
        return;
      }
      this.alertfn("success","正在打开...")
      let url = port.BASE_URL+name.file_preview;
      let data = {
        userId:this.userId,
        id:id
      }
      this.httpserver.post(url,data).subscribe(res=> {
        let data = (res as any).detail;
        window.open(data.url)
      })
    }else{
      this.alertfn("warning","该文件无法在线预览...")
    }
  }


  constructor(
    private route:ActivatedRoute,
    public httpserver:HttpClient,
    public _message:NzMessageService
  ) {

  }
  ngOnInit() {
    this.route.params.subscribe(data => {
      this.uid=data['id'];
    });
    this.getSelected('null');
    setTimeout(()=>{
      this.getDatas()
    },400)
  }

}
