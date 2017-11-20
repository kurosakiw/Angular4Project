import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { NzMessageService } from 'ng-zorro-antd';
import { port,name,sessionKey } from '../public/datas/portName';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css']
})
export class ClassroomComponent implements OnInit{
  _isSpinning:boolean = false;
  isVisible = false;
  userId:string = localStorage.getItem(sessionKey.USERID);
  id:string = '';
  result:Object = {};
  videourl:string = "";
  downList:Array<any> = [];
  thisImg:string = "";

  showModal = (src) => {
    this.thisImg=src;
    this.isVisible = true;
  }

  handleCancel = (e) => {
    console.log(e);
    this.isVisible = false;
  }
  downAll(){
    let idsArr = this.downList.map((item)=>{
      return  item.id;
    });
    if(idsArr.length==0){
      this.alertfn("warning","没有可下载的附件...")
      return;
    }

    let ids = JSON.stringify(idsArr);
    ids = ids.substring(1,ids.length-1);
    window.open( port.BASE_URL + "/file/download?ids="+ids+"&userId=" + this.id)

  }
  downLoad(key){
    window.open( port.BASE_URL + "/file/download?ids="+key+"&userId=" + this.id)
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
        userId:this.id,
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


  tabs = [
    {
      name   : '课程概述',
    },
    {
      name   : '课程目录',
    }
  ];
  chapters:Array<any> = [];
  getData(){
    let url = port.BASE_URL+name.course_get;
    let data = {
      userId:this.userId,
      id:this.id
    }
    this.httpserver.post(url,data).subscribe(res => {
      let data = (res as any).detail;
      this.result = data;
      this.videourl = data.chapters[0].trifles[0].videourl;
      this.downList = data.chapters[0].trifles[0].files;
      this.chapters = data.chapters;
    });
  }
  changeAll(data){
    this.downList = data.files;
    this.videourl = data.videourl;
  }
  alertfn = (type, text) => {
    this._message.create(type, text);
  };
  constructor(
    private httpserver: HttpClient,
    private route: ActivatedRoute,
    public _message:NzMessageService
  ) {

  }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.id=data['id'];
    });
    this.getData()

  }






}
